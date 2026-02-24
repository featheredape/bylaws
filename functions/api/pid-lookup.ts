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

interface Env {
  ASSETS?: { fetch: (req: Request | string) => Promise<Response> };
}

// ─── Types ──────────────────────────────────────────────────────

interface Parcel {
  pid: string;
  pid_formatted: string;
  plan: string | null;
  owner: string | null;
  area_sqm: number | null;
  centroid: [number, number]; // [lon, lat]
  bbox: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
  rings: number[][][]; // outer boundary rings
}

interface ZonePolygon {
  code: string;
  desc: string;
  bbox: [number, number, number, number];
  rings: number[][][];
}

interface DPAPolygon {
  num: number;
  desc: string;
  bylaw: string;
  bbox: [number, number, number, number];
  rings: number[][][];
}

interface DPAResult {
  name: string;
  number: number;
  description: string;
  bylaw: string;
  source: "authoritative"; // Always from Islands Trust dataset
}

// ─── PID normalization ──────────────────────────────────────────

function normalizePID(raw: string): { dashed: string; digits: string; number: number } | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 9) return null;
  return {
    dashed: `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 9)}`,
    digits,
    number: parseInt(digits, 10),
  };
}

// ─── Zone code → LUB 355 zone info mapping ─────────────────────

interface ZoneInfo {
  lub_code: string;
  lub_name: string;
  category: "residential" | "rural" | "agricultural" | "commercial" | "accommodation"
    | "forestry" | "employment" | "parks" | "shoreline" | "watershed" | "upland" | "other";
  is_village: boolean;
}

const ZONE_MAP: Record<string, ZoneInfo> = {
  // Residential
  "R1":   { lub_code: "R1",  lub_name: "Residential 1",  category: "residential", is_village: true },
  "R2":   { lub_code: "R2",  lub_name: "Residential 2",  category: "residential", is_village: true },
  "R3":   { lub_code: "R3",  lub_name: "Residential 3 (Mobile Home Park)",  category: "residential", is_village: false },
  "R4":   { lub_code: "R4",  lub_name: "Residential 4",  category: "residential", is_village: false },
  "R5":   { lub_code: "R5",  lub_name: "Residential 5 (Multi-Unit)",  category: "residential", is_village: true },
  "R6":   { lub_code: "R6",  lub_name: "Residential 6",  category: "residential", is_village: false },
  "R7":   { lub_code: "R7",  lub_name: "Residential 7",  category: "residential", is_village: false },
  "R8":   { lub_code: "R8",  lub_name: "Residential 8",  category: "residential", is_village: false },
  "R9":   { lub_code: "R9",  lub_name: "Residential 9",  category: "residential", is_village: false },
  "R10":  { lub_code: "R10", lub_name: "Residential 10 (Conservation)",  category: "residential", is_village: false },
  "R11":  { lub_code: "R11", lub_name: "Residential 11 (Cluster)",  category: "residential", is_village: false },
  "R12":  { lub_code: "R12", lub_name: "Residential 12 (Compact)",  category: "residential", is_village: true },
  "Ri":   { lub_code: "Ri",  lub_name: "Rural Island",  category: "residential", is_village: false },
  // Agriculture
  "A1":   { lub_code: "A1",  lub_name: "Agriculture 1",  category: "agricultural", is_village: false },
  "A2":   { lub_code: "A2",  lub_name: "Agriculture 2",  category: "agricultural", is_village: false },
  // Commercial
  "C1":   { lub_code: "C1",  lub_name: "Commercial 1",  category: "commercial", is_village: true },
  "C2":   { lub_code: "C2",  lub_name: "Commercial 2",  category: "commercial", is_village: false },
  "C3":   { lub_code: "C3",  lub_name: "Commercial 3",  category: "commercial", is_village: true },
  "C4":   { lub_code: "C4",  lub_name: "Commercial 4",  category: "commercial", is_village: true },
  // Commercial Accommodation
  "CA1":  { lub_code: "CA1", lub_name: "Commercial Accommodation 1",  category: "accommodation", is_village: false },
  "CA2":  { lub_code: "CA2", lub_name: "Commercial Accommodation 2",  category: "accommodation", is_village: false },
  // Forestry
  "F1":   { lub_code: "F1",  lub_name: "Forestry 1",  category: "forestry", is_village: false },
  "F2":   { lub_code: "F2",  lub_name: "Forestry 2",  category: "forestry", is_village: false },
  // General Employment
  "GE1":  { lub_code: "GE1", lub_name: "General Employment 1",  category: "employment", is_village: false },
  "GE2":  { lub_code: "GE2", lub_name: "General Employment 2",  category: "employment", is_village: false },
  "GE3":  { lub_code: "GE3", lub_name: "General Employment 3 (Marine)",  category: "employment", is_village: false },
  // Parks & Reserves
  "PR1":  { lub_code: "PR1", lub_name: "Parks & Reserves 1 (Active)",  category: "parks", is_village: false },
  "PR2":  { lub_code: "PR2", lub_name: "Parks & Reserves 2 (Nature)",  category: "parks", is_village: false },
  "PR3":  { lub_code: "PR3", lub_name: "Parks & Reserves 3",  category: "parks", is_village: false },
  "PR4":  { lub_code: "PR4", lub_name: "Parks & Reserves 4",  category: "parks", is_village: false },
  "PR5":  { lub_code: "PR5", lub_name: "Parks & Reserves 5",  category: "parks", is_village: false },
  "PR6":  { lub_code: "PR6", lub_name: "Parks & Reserves 6",  category: "parks", is_village: false },
  "P":    { lub_code: "P",   lub_name: "Park",  category: "parks", is_village: false },
  // Rural
  "R":    { lub_code: "R",   lub_name: "Rural",  category: "rural", is_village: false },
  "RU1":  { lub_code: "RU1", lub_name: "Rural Uplands 1",  category: "upland", is_village: false },
  // Shoreline
  "S1":   { lub_code: "S1",  lub_name: "Shoreline 1",  category: "shoreline", is_village: false },
  "S2":   { lub_code: "S2",  lub_name: "Shoreline 2",  category: "shoreline", is_village: false },
  "S3":   { lub_code: "S3",  lub_name: "Shoreline 3",  category: "shoreline", is_village: false },
  "S4":   { lub_code: "S4",  lub_name: "Shoreline 4",  category: "shoreline", is_village: false },
  "S5":   { lub_code: "S5",  lub_name: "Shoreline 5",  category: "shoreline", is_village: false },
  "S6":   { lub_code: "S6",  lub_name: "Shoreline 6",  category: "shoreline", is_village: false },
  "S7":   { lub_code: "S7",  lub_name: "Shoreline 7",  category: "shoreline", is_village: false },
  "S8":   { lub_code: "S8",  lub_name: "Shoreline 8",  category: "shoreline", is_village: false },
  // Watershed
  "RW1":  { lub_code: "RW1", lub_name: "Rural Watershed 1",  category: "watershed", is_village: false },
  "RW2":  { lub_code: "RW2", lub_name: "Rural Watershed 2",  category: "watershed", is_village: false },
  "W1":   { lub_code: "W1",  lub_name: "Watershed 1",  category: "watershed", is_village: false },
  "W2":   { lub_code: "W2",  lub_name: "Watershed 2",  category: "watershed", is_village: false },
  // Upland
  "U1":   { lub_code: "U1",  lub_name: "Upland 1",  category: "upland", is_village: false },
};

/** Look up zone info — try exact match, then base code (strip variant suffix) */
function lookupZoneInfo(code: string): ZoneInfo | null {
  if (!code) return null;
  const trimmed = code.trim();

  // Exact match (case-sensitive — Islands Trust codes are already correct)
  if (ZONE_MAP[trimmed]) return ZONE_MAP[trimmed];

  // Try uppercase
  const upper = trimmed.toUpperCase();
  if (ZONE_MAP[upper]) return ZONE_MAP[upper];

  // Strip variant suffix: "R(f)" → "R", "R2(a)" → "R2"
  const base = trimmed.replace(/\(.*\)$/, "").trim();
  if (ZONE_MAP[base]) return { ...ZONE_MAP[base], lub_code: trimmed };

  // Return a generic entry for any valid-looking code
  return {
    lub_code: trimmed,
    lub_name: trimmed,
    category: "other",
    is_village: false,
  };
}

// ─── DPA name mapping ───────────────────────────────────────────

const DPA_NAMES: Record<number, string> = {
  1: "DPA 1 — Island Villages",
  2: "DPA 2 — Non-Village Commercial & General Employment",
  3: "DPA 3 — Shoreline",
  4: "DPA 4 — Lakes, Streams & Wetlands",
  5: "DPA 5 — Community Well Capture Zones",
  6: "DPA 6 — Unstable Slopes & Soil Erosion",
  7: "DPA 7 — Riparian Areas",
};

// ─── Ray-casting point-in-polygon ───────────────────────────────

function pointInPolygon(lon: number, lat: number, rings: number[][][]): boolean {
  const ring = rings[0];
  if (!ring || ring.length < 3) return false;

  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const xi = ring[i][0], yi = ring[i][1];
    const xj = ring[j][0], yj = ring[j][1];

    if (((yi > lat) !== (yj > lat)) &&
        (lon < (xj - xi) * (lat - yi) / (yj - yi) + xi)) {
      inside = !inside;
    }
  }
  return inside;
}

/** Check if a point is inside a polygon's bounding box (fast pre-filter) */
function inBBox(lon: number, lat: number, bbox: number[]): boolean {
  return lon >= bbox[0] && lat >= bbox[1] && lon <= bbox[2] && lat <= bbox[3];
}

/** Check if two bounding boxes overlap (for parcel-polygon intersection) */
function bboxOverlap(a: number[], b: number[]): boolean {
  return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
}

// ─── Dataset loading with caching ───────────────────────────────

let cachedParcels: { count: number; parcels: Parcel[] } | null = null;
let cachedZones: { count: number; zones: ZonePolygon[] } | null = null;
let cachedDPAs: { count: number; dpas: DPAPolygon[] } | null = null;

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
  const data = await loadJSON(env, url, "data/ssi-parcels.json");
  if (data?.parcels) {
    cachedParcels = data;
    console.log(`Loaded ${data.parcels.length} parcels`);
    return data.parcels;
  }
  return [];
}

async function loadZones(env: Env, url: string): Promise<ZonePolygon[]> {
  if (cachedZones) return cachedZones.zones;
  const data = await loadJSON(env, url, "data/ssi-zones.json");
  if (data?.zones) {
    cachedZones = data;
    console.log(`Loaded ${data.zones.length} zone polygons`);
    return data.zones;
  }
  return [];
}

async function loadDPAs(env: Env, url: string): Promise<DPAPolygon[]> {
  if (cachedDPAs) return cachedDPAs.dpas;
  const data = await loadJSON(env, url, "data/ssi-dpas.json");
  if (data?.dpas) {
    cachedDPAs = data;
    console.log(`Loaded ${data.dpas.length} DPA polygons`);
    return data.dpas;
  }
  return [];
}

// ─── Core lookup functions ──────────────────────────────────────

/** Find a parcel by PID (binary search — parcels are sorted) */
function findParcel(parcels: Parcel[], pidDigits: string): Parcel | null {
  let lo = 0, hi = parcels.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >>> 1;
    const cmp = parcels[mid].pid.localeCompare(pidDigits);
    if (cmp === 0) return parcels[mid];
    if (cmp < 0) lo = mid + 1;
    else hi = mid - 1;
  }
  return null;
}

/** Find zone at a point — uses bbox pre-filter for speed */
function findZone(lon: number, lat: number, zones: ZonePolygon[]): ZonePolygon | null {
  for (const zone of zones) {
    if (inBBox(lon, lat, zone.bbox) && pointInPolygon(lon, lat, zone.rings)) {
      return zone;
    }
  }
  return null;
}

/** Find zone for a parcel — try centroid, then sample boundary points */
function findZoneForParcel(parcel: Parcel, zones: ZonePolygon[]): ZonePolygon | null {
  const [cLon, cLat] = parcel.centroid;

  // Try centroid first
  const centroidHit = findZone(cLon, cLat, zones);
  if (centroidHit) return centroidHit;

  // Fallback: try boundary points (e.g. for L-shaped or waterfront parcels)
  const ring = parcel.rings[0];
  if (ring) {
    const step = Math.max(1, Math.floor(ring.length / 8)); // sample ~8 points
    for (let i = 0; i < ring.length; i += step) {
      const hit = findZone(ring[i][0], ring[i][1], zones);
      if (hit) return hit;
    }
  }
  return null;
}

/** Find all DPAs that overlap a parcel — check centroid + boundary points against all DPA polygons */
function findDPAsForParcel(parcel: Parcel, dpas: DPAPolygon[]): DPAResult[] {
  const found = new Map<number, DPAPolygon>(); // num → first matching polygon
  const [cLon, cLat] = parcel.centroid;

  // Sample points from the parcel: centroid + boundary vertices
  const testPoints: [number, number][] = [[cLon, cLat]];
  const ring = parcel.rings[0];
  if (ring) {
    const step = Math.max(1, Math.floor(ring.length / 12)); // sample ~12 boundary points
    for (let i = 0; i < ring.length; i += step) {
      testPoints.push([ring[i][0], ring[i][1]]);
    }
  }

  for (const dpa of dpas) {
    if (found.has(dpa.num)) continue; // Already found this DPA type

    // Quick bbox pre-filter: does the parcel bbox overlap the DPA bbox?
    if (!bboxOverlap(parcel.bbox, dpa.bbox)) continue;

    // Test each sample point
    for (const [lon, lat] of testPoints) {
      if (inBBox(lon, lat, dpa.bbox) && pointInPolygon(lon, lat, dpa.rings)) {
        found.set(dpa.num, dpa);
        break;
      }
    }
  }

  // Convert to results, sorted by DPA number
  const results: DPAResult[] = [];
  for (const [num, dpa] of [...found.entries()].sort((a, b) => a[0] - b[0])) {
    results.push({
      name: DPA_NAMES[num] || `DPA ${num}`,
      number: num,
      description: dpa.desc,
      bylaw: dpa.bylaw ? `Bylaw ${dpa.bylaw}` : "OCP 434",
      source: "authoritative",
    });
  }

  return results;
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

    // ── Step 5: Build response ────────────────────────────────────
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
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}
