// ═══════════════════════════════════════════════════════════════════
// Address Lookup — Civic address → parcel/zone/DPA via BC Geocoder
//
// 1. Accepts { address: string }
// 2. Calls BC Address Geocoder API to get coordinates
// 3. Point-in-polygon against local datasets (same as pid-lookup)
// 4. Returns zone, DPAs, adjacent parcels
// ═══════════════════════════════════════════════════════════════════

import {
  Parcel,
  ZonePolygon,
  DPAPolygon,
  lookupZoneInfo,
  findZoneForParcel,
  findDPAsForParcel,
  findAdjacentParcels,
  aggregateNeighbouringDPAs,
  filterSliverZones,
  filterSliverDPAs,
  inBBox,
  pointInPolygon,
} from "../lib/geo";

interface Env {
  ASSETS?: { fetch: (req: Request | string) => Promise<Response> };
}

// ─── Dataset loading with caching (shared with pid-lookup via isolate) ──

let cachedParcels: { count: number; parcels: Parcel[] } | null = null;
let cachedZones: { count: number; zones: ZonePolygon[] } | null = null;
let cachedDPAs: { count: number; dpas: any[] } | null = null;

let loadingParcels: Promise<Parcel[]> | null = null;
let loadingZones: Promise<ZonePolygon[]> | null = null;
let loadingDPAs: Promise<any[]> | null = null;

async function loadJSON(env: Env, requestUrl: string, filename: string): Promise<any | null> {
  try {
    let resp: Response | null = null;
    if (env.ASSETS) {
      try {
        resp = await env.ASSETS.fetch(new Request(`http://placeholder/${filename}`));
      } catch (e) {
        console.log(`ASSETS.fetch failed for ${filename}:`, e);
      }
    }
    if (!resp || !resp.ok) {
      const origin = new URL(requestUrl).origin;
      resp = await fetch(`${origin}/${filename}`, { signal: AbortSignal.timeout(10000) });
    }
    if (!resp || !resp.ok) return null;
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
    if (data?.parcels) { cachedParcels = data; return data.parcels; }
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
      const { filtered } = filterSliverZones(data.zones);
      cachedZones = { count: filtered.length, zones: filtered };
      return filtered;
    }
    return [];
  })();
  try { return await loadingZones; } finally { loadingZones = null; }
}

async function loadDPAs(env: Env, url: string): Promise<any[]> {
  if (cachedDPAs) return cachedDPAs.dpas;
  if (loadingDPAs) return loadingDPAs;
  loadingDPAs = (async () => {
    const data = await loadJSON(env, url, "data/ssi-dpas.json");
    if (data?.dpas) {
      const { filtered } = filterSliverDPAs(data.dpas);
      cachedDPAs = { count: filtered.length, dpas: filtered };
      return filtered;
    }
    return [];
  })();
  try { return await loadingDPAs; } finally { loadingDPAs = null; }
}

// ─── Find parcel containing a coordinate ─────────────────────────

function findParcelByCoords(lon: number, lat: number, parcels: Parcel[]): Parcel | null {
  for (const parcel of parcels) {
    if (inBBox(lon, lat, parcel.bbox) && pointInPolygon(lon, lat, parcel.rings)) {
      return parcel;
    }
  }
  return null;
}

// ─── BC Geocoder API call ────────────────────────────────────────

interface GeocoderResult {
  fullAddress: string;
  score: number;
  lon: number;
  lat: number;
  localityName: string;
  matchPrecision: string;
}

async function geocodeAddress(address: string): Promise<GeocoderResult[]> {
  const params = new URLSearchParams({
    addressString: address,
    localityName: "Salt Spring Island",
    maxResults: "5",
    outputSRS: "4326",
  });

  const url = `https://geocoder.api.gov.bc.ca/addresses.json?${params}`;
  const resp = await fetch(url, { signal: AbortSignal.timeout(8000) });

  if (!resp.ok) {
    throw new Error(`BC Geocoder returned ${resp.status}`);
  }

  const data = await resp.json() as any;
  const features = data?.features || [];

  return features.map((f: any) => ({
    fullAddress: f.properties?.fullAddress || "",
    score: f.properties?.score || 0,
    lon: f.geometry?.coordinates?.[0] || 0,
    lat: f.geometry?.coordinates?.[1] || 0,
    localityName: f.properties?.localityName || "",
    matchPrecision: f.properties?.matchPrecision || "",
  }));
}

// ═══════════════════════════════════════════════════════════════════
// Request handler
// ═══════════════════════════════════════════════════════════════════

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;
  const cors = corsHeaders(request);

  let body: { address: string };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body" },
      { status: 400, headers: cors }
    );
  }

  const address = (body.address || "").trim();
  if (!address || address.length < 3) {
    return Response.json(
      { success: false, error: "Please enter a street address (e.g. 123 Rainbow Road)" },
      { status: 400, headers: cors }
    );
  }

  try {
    // ── Step 1: Geocode the address ──────────────────────────────
    const results = await geocodeAddress(address);

    if (results.length === 0) {
      return Response.json(
        { success: false, error: "No matching addresses found on Salt Spring Island. Please check the address and try again." },
        { status: 404, headers: cors }
      );
    }

    // Filter to Salt Spring Island results only
    const ssiResults = results.filter(r =>
      r.localityName.toLowerCase().includes("salt spring") ||
      r.localityName.toLowerCase().includes("saltspring")
    );

    const bestMatch = ssiResults.length > 0 ? ssiResults[0] : results[0];

    if (!bestMatch.lon || !bestMatch.lat) {
      return Response.json(
        { success: false, error: "Could not determine coordinates for that address." },
        { status: 404, headers: cors }
      );
    }

    // ── Step 2: Load datasets ────────────────────────────────────
    const [parcels, zones, dpas] = await Promise.all([
      loadParcels(env, request.url),
      loadZones(env, request.url),
      loadDPAs(env, request.url),
    ]);

    // ── Step 3: Find the parcel at the geocoded coordinates ──────
    const parcel = findParcelByCoords(bestMatch.lon, bestMatch.lat, parcels);

    if (!parcel) {
      return Response.json(
        {
          success: false,
          error: `Address found (${bestMatch.fullAddress}) but no matching parcel in our database. The address may be outside our parcel coverage area.`,
          geocoded_address: bestMatch.fullAddress,
          coordinates: { lon: bestMatch.lon, lat: bestMatch.lat },
        },
        { status: 404, headers: cors }
      );
    }

    // ── Step 4: Zone lookup ──────────────────────────────────────
    const matchedZone = zones.length > 0 ? findZoneForParcel(parcel, zones) : null;
    const zoneInfo = matchedZone ? lookupZoneInfo(matchedZone.code) : null;

    // ── Step 5: DPA lookup ───────────────────────────────────────
    const dpaResults = dpas.length > 0 ? findDPAsForParcel(parcel, dpas) : [];

    // ── Step 6: Adjacent parcels & neighbouring DPAs ─────────────
    const adjacentParcels = findAdjacentParcels(parcel, parcels, zones, dpas);
    const neighbouringDPAs = aggregateNeighbouringDPAs(dpaResults, adjacentParcels);

    // ── Step 7: Build response ───────────────────────────────────
    const [cLon, cLat] = parcel.centroid;

    return Response.json(
      {
        success: true,
        data: {
          // Address info
          matched_address: bestMatch.fullAddress,
          geocoder_score: bestMatch.score,
          match_precision: bestMatch.matchPrecision,

          // Parcel info (same shape as pid-lookup)
          pid: parcel.pid_formatted,
          area_sqm: parcel.area_sqm,
          area_ha: parcel.area_sqm ? Math.round(parcel.area_sqm / 100) / 100 : null,
          plan_number: parcel.plan,
          owner_type: parcel.owner,

          // Zoning
          zone_code: matchedZone?.code || null,
          zone_desc: matchedZone?.desc || null,
          lub_zone_code: zoneInfo?.lub_code || matchedZone?.code || null,
          lub_zone_name: zoneInfo?.lub_name || matchedZone?.desc || null,
          zone_category: zoneInfo?.category || null,
          is_village: zoneInfo?.is_village || false,

          // DPAs
          dpas: dpaResults,
          neighbouring_dpas: neighbouringDPAs,

          // Adjacent parcels
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
        },
        // Also return other geocoder suggestions if any
        other_matches: ssiResults.slice(1, 4).map(r => ({
          address: r.fullAddress,
          score: r.score,
        })),
        source: "bc_geocoder + local_datasets",
      },
      { headers: cors }
    );
  } catch (err: any) {
    console.error("Address lookup error:", err);

    const isGeocoderError = err.message?.includes("Geocoder") || err.message?.includes("fetch");
    return Response.json(
      {
        success: false,
        error: isGeocoderError
          ? "Could not reach the BC Address Geocoder service. Please try again in a moment."
          : "Something went wrong looking up that address. Please try again.",
      },
      { status: 500, headers: cors }
    );
  }
};

export const onRequestOptions: PagesFunction = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

const ALLOWED_ORIGINS = [
  "https://bylaws.saltspring.info",
  "http://localhost:8788",
  "http://127.0.0.1:8788",
];

function corsHeaders(request?: Request): Record<string, string> {
  const origin = request?.headers?.get("Origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}
