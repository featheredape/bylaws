// ═══════════════════════════════════════════════════════════════════
// PID Lookup v2 — Pure local datasets, zero runtime API dependencies
//
// Uses pre-converted static JSON from Islands Trust + PMBC data:
//   /data/ssi-parcels.json  — 2,270 PMBC parcels with polygon geometry
//   /data/ssi-zones.json    — 629 Islands Trust zoning polygons
//   /data/ssi-dpas.json     — 440 Islands Trust DPA polygons
//
// All lookups are point-in-polygon tests against local data.
// No WFS, no CRD, no FWA queries. Fast, reliable, accurate.
// ═══════════════════════════════════════════════════════════════════

import {
  Parcel,
  ZonePolygon,
  DPAPolygon,
  DPAResult,
  ZoneInfo,
  ZONE_MAP,
  DPA_NAMES,
  normalizePID,
  lookupZoneInfo,
  findParcel,
  findZone,
  findZoneForParcel,
  findDPAsForParcel,
  findAdjacentParcels,
  aggregateNeighbouringDPAs,
  filterSliverZones,
  filterSliverDPAs,
} from "../lib/geo";

interface Env {
  ASSETS?: { fetch: (req: Request | string) => Promise<Response> };
}

// ─── Dataset loading with caching ───────────────────────────────

let cachedParcels: { count: number; parcels: Parcel[] } | null = null;
let cachedZones: { count: number; zones: ZonePolygon[] } | null = null;
let cachedDPAs: { count: number; dpas: DPAPolygon[] } | null = null;

// Loading guards to prevent concurrent fetches (race condition fix)
let loadingParcels: Promise<Parcel[]> | null = null;
let loadingZones: Promise<ZonePolygon[]> | null = null;
let loadingDPAs: Promise<DPAPolygon[]> | null = null;

async function loadJSON(env: Env, requestUrl: string, filename: string): Promise<any | null> {
  try {
    let resp: Response | null = null;

    // Try Cloudflare ASSETS binding first
    if (env.ASSETS) {
      try {
        resp = await env.ASSETS.fetch(new Request(`http://placeholder/${filename}`));
      } catch (e) {
        console.log(`ASSETS.fetch failed for ${filename}:`, e);
      }
    }

    // Fallback: fetch from origin
    if (!resp || !resp.ok) {
      const origin = new URL(requestUrl).origin;
      resp = await fetch(`${origin}/${filename}`, { signal: AbortSignal.timeout(10000) });
    }

    if (!resp || !resp.ok) {
      console.log(`Failed to load ${filename}: ${resp?.status}`);
      return null;
    }

    return await resp.json();
  } catch (err) {
    console.error(`Error loading ${filename}:`, err);
    return null;
  }
}

async function loadParcels(env: Env, url: string): Promise<Parcel[]> {
  if (cachedParcels) return cachedParcels.parcels;
  if (loadingParcels) return loadingParcels;
  loadingParcels = (async () => {
    const data = await loadJSON(env, url, "data/ssi-parcels.json");
    if (data?.parcels) {
      cachedParcels = data;
      console.log(`Loaded ${data.parcels.length} parcels`);
      return data.parcels;
    }
    return [];
  })();
  try { return await loadingParcels; } finally { loadingParcels = null; }
}

async function loadZones(env: Env, url: string): Promise<ZonePolygon[]> {
  if (cachedZones) return cachedZones.zones;
  if (loadingZones) return loadingZones;
  loadingZones = (async () => {
    const data = await loadJSON(env, url, "data/ssi-zones.json");
    if (data?.zones) {
      const { filtered, count } = filterSliverZones(data.zones);
      cachedZones = { count: filtered.length, zones: filtered };
      console.log(`Loaded ${filtered.length} zone polygons`);
      if (count > 0) {
        console.log(`Filtered ${count} sliver zone(s) (<100 m²)`);
      }
      return filtered;
    }
    return [];
  })();
  try { return await loadingZones; } finally { loadingZones = null; }
}

async function loadDPAs(env: Env, url: string): Promise<DPAPolygon[]> {
  if (cachedDPAs) return cachedDPAs.dpas;
  if (loadingDPAs) return loadingDPAs;
  loadingDPAs = (async () => {
    const data = await loadJSON(env, url, "data/ssi-dpas.json");
    if (data?.dpas) {
      const { filtered, count } = filterSliverDPAs(data.dpas);
      cachedDPAs = { count: filtered.length, dpas: filtered };
      console.log(`Loaded ${filtered.length} DPA polygons`);
      if (count > 0) {
        console.log(`Filtered ${count} sliver DPA(s) (<100 m²)`);
      }
      return filtered;
    }
    return [];
  })();
  try { return await loadingDPAs; } finally { loadingDPAs = null; }
}

// ═══════════════════════════════════════════════════════════════════
// Request handler
// ═══════════════════════════════════════════════════════════════════

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  let body: { pid: string };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body" },
      { status: 400, headers: corsHeaders() }
    );
  }

  if (!body.pid || body.pid.trim().length < 3) {
    return Response.json(
      { success: false, error: "Please provide a PID (9-digit parcel identification number)" },
      { status: 400, headers: corsHeaders() }
    );
  }

  const pid = normalizePID(body.pid.trim());
  if (!pid) {
    return Response.json(
      { success: false, error: "Invalid PID format. Please enter a 9-digit number (e.g. 009-123-456)" },
      { status: 400, headers: corsHeaders() }
    );
  }

  try {
    // ── Step 1: Load all datasets in parallel ─────────────────────
    const [parcels, zones, dpas] = await Promise.all([
      loadParcels(env, request.url),
      loadZones(env, request.url),
      loadDPAs(env, request.url),
    ]);

    // ── Step 2: Find the parcel ───────────────────────────────────
    const parcel = findParcel(parcels, pid.digits);

    if (!parcel) {
      return Response.json(
        { success: false, error: `No property found for PID ${pid.dashed}. Please verify the number and try again.` },
        { status: 404, headers: corsHeaders() }
      );
    }

    // ── Step 3: Zone lookup ───────────────────────────────────────
    const matchedZone = zones.length > 0 ? findZoneForParcel(parcel, zones) : null;
    const zoneInfo = matchedZone ? lookupZoneInfo(matchedZone.code) : null;

    // ── Step 4: DPA lookup (authoritative) ────────────────────────
    const dpaResults = dpas.length > 0 ? findDPAsForParcel(parcel, dpas) : [];

    // ── Step 5: Adjacent parcels & neighbouring DPAs ────────────
    const adjacentParcels = findAdjacentParcels(parcel, parcels, zones, dpas);
    const neighbouringDPAs = aggregateNeighbouringDPAs(dpaResults, adjacentParcels);

    // ── Step 6: Build response ────────────────────────────────────
    const [cLon, cLat] = parcel.centroid;

    return Response.json(
      {
        success: true,
        data: {
          pid: parcel.pid_formatted,
          area_sqm: parcel.area_sqm,
          area_ha: parcel.area_sqm ? Math.round(parcel.area_sqm / 100) / 100 : null,
          plan_number: parcel.plan,
          owner_type: parcel.owner,

          // Zoning (from Islands Trust authoritative data)
          zone_code: matchedZone?.code || null,
          zone_desc: matchedZone?.desc || null,
          lub_zone_code: zoneInfo?.lub_code || matchedZone?.code || null,
          lub_zone_name: zoneInfo?.lub_name || matchedZone?.desc || null,
          zone_category: zoneInfo?.category || null,
          is_village: zoneInfo?.is_village || false,

          // DPAs (from Islands Trust authoritative polygons)
          dpas: dpaResults,

          // Neighbouring DPAs (from adjacent parcels, for consideration)
          neighbouring_dpas: neighbouringDPAs,

          // Adjacent parcels (full details for frontend display)
          adjacent_parcels: adjacentParcels.map(p => ({
            pid: p.pid_formatted,
            zone_code: p.zone?.lub_code || null,
            zone_name: p.zone?.lub_name || null,
            zone_category: p.zone?.category || null,
            dpas: p.dpas.map(d => ({
              number: d.number,
              name: d.name,
              description: d.description,
            })),
          })),

          // Location
          centroid: { lon: cLon, lat: cLat },
          debug_map_link: `https://www.google.com/maps?q=${cLat},${cLon}`,

          // Debug info
          _debug: {
            parcels_loaded: parcels.length,
            zones_loaded: zones.length,
            dpas_loaded: dpas.length,
            zone_match: matchedZone ? { code: matchedZone.code, desc: matchedZone.desc } : null,
            dpa_count: dpaResults.length,
            adjacent_parcel_count: adjacentParcels.length,
            adjacent_parcels: adjacentParcels.map(p => p.pid_formatted),
            neighbouring_dpa_count: neighbouringDPAs.length,
          },
        },
        source: "local_datasets",
      },
      { headers: corsHeaders() }
    );
  } catch (err: any) {
    console.error("PID lookup error:", err);
    return Response.json(
      { success: false, error: "Something went wrong looking up that property. Please try again." },
      { status: 500, headers: corsHeaders() }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: corsHeaders() });
};

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "https://bylaws.saltspring.info",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}
