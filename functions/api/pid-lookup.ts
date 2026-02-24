// ═══════════════════════════════════════════════════════════════════
// PID Lookup — Local dataset + CRD zoning + ALR + spatial DPA analysis
//
// DPA detection strategy:
// - We fetch the FULL parcel polygon from BC WFS (not just centroid)
// - We sample boundary vertices and query CRD zoning at each —
//   if any vertex returns zero results, it's in the water → shoreline
// - We query BC Freshwater Atlas for streams/lakes near the parcel
// - We query CRD environmental layers using the parcel polygon
// - We combine all evidence to assign DPAs with confidence levels
// ═══════════════════════════════════════════════════════════════════

interface Env {
  ASSETS?: { fetch: (req: Request | string) => Promise<Response> };
}

// ─── PID normalization ────────────────────────────────────────────

function normalizePID(raw: string): { dashed: string; digits: string; number: number } | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 9) return null;
  return {
    dashed: `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 9)}`,
    digits,
    number: parseInt(digits, 10),
  };
}

// ─── CRD zone code → LUB 355 zone mapping ──────────────────────

interface ZoneInfo {
  lub_code: string;
  lub_name: string;
  category: "residential" | "rural" | "agricultural" | "commercial" | "accommodation"
    | "forestry" | "employment" | "parks" | "shoreline" | "watershed" | "upland" | "other";
  is_village: boolean;
}

const ZONE_MAP: Record<string, ZoneInfo> = {
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
  "A1":   { lub_code: "A1",  lub_name: "Agricultural 1",  category: "agricultural", is_village: false },
  "A2":   { lub_code: "A2",  lub_name: "Agricultural 2",  category: "agricultural", is_village: false },
  "C1":   { lub_code: "C1",  lub_name: "Commercial 1",  category: "commercial", is_village: true },
  "C2":   { lub_code: "C2",  lub_name: "Commercial 2",  category: "commercial", is_village: false },
  "C3":   { lub_code: "C3",  lub_name: "Commercial 3",  category: "commercial", is_village: true },
  "C4":   { lub_code: "C4",  lub_name: "Commercial 4",  category: "commercial", is_village: true },
  "CA1":  { lub_code: "CA1", lub_name: "Commercial Accommodation 1",  category: "accommodation", is_village: false },
  "CA2":  { lub_code: "CA2", lub_name: "Commercial Accommodation 2",  category: "accommodation", is_village: false },
  "F1":   { lub_code: "F1",  lub_name: "Forestry 1",  category: "forestry", is_village: false },
  "F2":   { lub_code: "F2",  lub_name: "Forestry 2",  category: "forestry", is_village: false },
  "GE1":  { lub_code: "GE1", lub_name: "General Employment 1",  category: "employment", is_village: false },
  "GE2":  { lub_code: "GE2", lub_name: "General Employment 2",  category: "employment", is_village: false },
  "GE3":  { lub_code: "GE3", lub_name: "General Employment 3 (Marine)",  category: "employment", is_village: false },
  "PR1":  { lub_code: "PR1", lub_name: "Parks & Reserves 1 (Active)",  category: "parks", is_village: false },
  "PR2":  { lub_code: "PR2", lub_name: "Parks & Reserves 2 (Nature)",  category: "parks", is_village: false },
  "P":    { lub_code: "P",   lub_name: "Park",  category: "parks", is_village: false },
  "RU1":  { lub_code: "RU1", lub_name: "Rural 1",  category: "rural", is_village: false },
  "RR1":  { lub_code: "RU1", lub_name: "Rural 1",  category: "rural", is_village: false },
  "U1":   { lub_code: "U1",  lub_name: "Upland 1",  category: "upland", is_village: false },
  "UP1":  { lub_code: "U1",  lub_name: "Upland 1",  category: "upland", is_village: false },
  "W1":   { lub_code: "W1",  lub_name: "Watershed 1",  category: "watershed", is_village: false },
  "RW1":  { lub_code: "W1",  lub_name: "Watershed 1 (Rural Watershed)",  category: "watershed", is_village: false },
  "W2":   { lub_code: "W2",  lub_name: "Watershed 2",  category: "watershed", is_village: false },
  "RW2":  { lub_code: "W2",  lub_name: "Watershed 2 (Rural Watershed)",  category: "watershed", is_village: false },
  "S1":   { lub_code: "S1",  lub_name: "Shoreline 1",  category: "shoreline", is_village: false },
  "S2":   { lub_code: "S2",  lub_name: "Shoreline 2",  category: "shoreline", is_village: false },
  "S3":   { lub_code: "S3",  lub_name: "Shoreline 3",  category: "shoreline", is_village: false },
};

function lookupZoneInfo(crdCode: string): ZoneInfo | null {
  if (!crdCode) return null;
  const upper = crdCode.toUpperCase().trim();
  if (ZONE_MAP[upper]) return ZONE_MAP[upper];
  const base = upper.replace(/\(.*\)$/, "").trim();
  if (ZONE_MAP[base]) return { ...ZONE_MAP[base], lub_code: upper };
  for (const [key, info] of Object.entries(ZONE_MAP)) {
    if (upper.startsWith(key) && upper.length <= key.length + 3) {
      return { ...info, lub_code: upper };
    }
  }
  return null;
}

// ─── Local parcel dataset ─────────────────────────────────────────

let cachedParcels: Record<string, any> | null = null;
let localLoadFailed = false;

async function lookupLocal(
  pidDigits: string,
  env: Env,
  requestUrl: string
): Promise<any | null> {
  if (localLoadFailed) return null;
  try {
    if (!cachedParcels) {
      let resp: Response | null = null;
      if (env.ASSETS) {
        try {
          resp = await env.ASSETS.fetch(new Request("http://placeholder/ssi-parcels.json"));
        } catch (e) { console.log("ASSETS.fetch failed:", e); }
      }
      if (!resp || !resp.ok) {
        try {
          const origin = new URL(requestUrl).origin;
          resp = await fetch(`${origin}/ssi-parcels.json`, { signal: AbortSignal.timeout(5000) });
        } catch (e) { console.log("Origin fetch failed:", e); }
      }
      if (!resp || !resp.ok) {
        console.log("Local dataset not available — will use WFS only");
        localLoadFailed = true;
        return null;
      }
      const data = await resp.json() as any;
      cachedParcels = {};
      if (data.parcels && Array.isArray(data.parcels)) {
        for (const p of data.parcels) {
          const key = (p.pid || "").replace(/\D/g, "");
          if (key) cachedParcels[key] = p;
          if (p.pid_number) cachedParcels[String(p.pid_number)] = p;
        }
        console.log(`Local dataset loaded: ${data.parcels.length} parcels`);
      } else { localLoadFailed = true; return null; }
    }
    return cachedParcels[pidDigits] || null;
  } catch (err) {
    console.error("Error loading local dataset:", err);
    localLoadFailed = true;
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════════
// PARCEL GEOMETRY — Fetch full polygon, compute centroid + boundary
// ═══════════════════════════════════════════════════════════════════

interface ParcelGeometry {
  centroid: { lon: number; lat: number };
  boundaryPoints: { lon: number; lat: number }[];  // sampled vertices
  bbox: { minLon: number; minLat: number; maxLon: number; maxLat: number };
  rings: number[][][];  // for polygon-based CRD queries
}

function buildWfsUrl(cqlFilter: string, includeGeometry: boolean): string {
  const base = "https://openmaps.gov.bc.ca/geo/pub/ows";
  const params: Record<string, string> = {
    service: "WFS",
    version: "1.1.0",          // Use 1.1.0 to avoid WFS 2.0.0 axis ordering ambiguity
    request: "GetFeature",
    typeName: "pub:WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW",
    outputFormat: "json",
    srsName: "EPSG:4326",     // Request WGS84 lon/lat coordinates
    CQL_FILTER: cqlFilter,
  };
  if (!includeGeometry) {
    params.propertyName =
      "PID,PID_NUMBER,PARCEL_NAME,PLAN_NUMBER,PARCEL_STATUS,PARCEL_CLASS,OWNER_TYPE,MUNICIPALITY,REGIONAL_DISTRICT,FEATURE_AREA_SQM";
  }
  return `${base}?${new URLSearchParams(params).toString()}`;
}

async function tryWfsQuery(cqlFilter: string, includeGeometry = false): Promise<any[]> {
  const url = buildWfsUrl(cqlFilter, includeGeometry);
  console.log("WFS query:", cqlFilter, includeGeometry ? "(with geometry)" : "");
  const resp = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(15000),
  });
  if (!resp.ok) { console.error("WFS HTTP error:", resp.status); return []; }
  const body = await resp.json() as any;
  if (body.type === "FeatureCollection" && Array.isArray(body.features)) {
    return body.features;
  }
  return [];
}

function extractFromWfs(feature: any) {
  const p = feature.properties || {};
  return {
    pid: p.PID || null,
    pid_number: p.PID_NUMBER || null,
    parcel_name: p.PARCEL_NAME || null,
    plan_number: p.PLAN_NUMBER || null,
    parcel_status: p.PARCEL_STATUS || null,
    parcel_class: p.PARCEL_CLASS || null,
    owner_type: p.OWNER_TYPE || null,
    municipality: p.MUNICIPALITY || null,
    regional_district: p.REGIONAL_DISTRICT || null,
    area_sqm: p.FEATURE_AREA_SQM ? Math.round(p.FEATURE_AREA_SQM) : null,
  };
}

// Detect and fix WFS axis ordering issues
// WFS 2.0.0 with EPSG:4326 may return coordinates as (lat, lon) instead of (lon, lat)
// For Salt Spring Island: lon ≈ -123.5 (negative), lat ≈ 48.85 (positive)
// If first coordinate is positive ~48 and second is negative ~-123, axes are swapped
function fixAxisOrder(coordinates: number[][]): number[][] {
  if (!coordinates || coordinates.length === 0) return coordinates;

  // Sample the first vertex to detect axis order
  const [c0, c1] = coordinates[0];

  // Salt Spring Island is at approximately lon=-123.5, lat=48.85
  // Check if axes appear swapped: c0 should be lon (negative ~-123), c1 should be lat (positive ~48)
  const looksSwapped = (
    c0 > 0 && c0 < 90 &&          // c0 looks like a latitude (positive, small)
    c1 < 0 && c1 > -180            // c1 looks like a longitude (negative, large)
  );

  if (looksSwapped) {
    console.log(`  ⚠️ Axis order swapped detected: first vertex [${c0}, ${c1}] → swapping to [${c1}, ${c0}]`);
    return coordinates.map(([a, b]) => [b, a]);
  }

  // Also check: if both coordinates are positive but c0 is in lat range and c1 in lon range
  // (shouldn't happen for SSI since lon is negative, but handle edge cases)
  const looksCorrect = (
    c0 < 0 && c0 > -180 &&         // c0 is a negative longitude
    c1 > 0 && c1 < 90              // c1 is a positive latitude
  );

  if (looksCorrect) {
    console.log(`  ✅ Axis order correct: first vertex [${c0.toFixed(4)}, ${c1.toFixed(4)}] (lon, lat)`);
  } else {
    console.log(`  ⚠️ Unexpected coordinate range: first vertex [${c0}, ${c1}] — cannot auto-fix`);
  }

  return coordinates;
}

// Extract full parcel geometry from a WFS feature
function extractParcelGeometry(geometry: any): ParcelGeometry | null {
  if (!geometry) return null;
  try {
    let outerRing: number[][] = [];
    if (geometry.type === "Polygon") {
      outerRing = fixAxisOrder(geometry.coordinates[0]);
    } else if (geometry.type === "MultiPolygon") {
      outerRing = fixAxisOrder(geometry.coordinates[0][0]);
    } else {
      return null;
    }

    // Compute centroid
    let sumLon = 0, sumLat = 0;
    let minLon = Infinity, maxLon = -Infinity, minLat = Infinity, maxLat = -Infinity;
    for (const [lon, lat] of outerRing) {
      sumLon += lon;
      sumLat += lat;
      if (lon < minLon) minLon = lon;
      if (lon > maxLon) maxLon = lon;
      if (lat < minLat) minLat = lat;
      if (lat > maxLat) maxLat = lat;
    }
    const centroid = {
      lon: sumLon / outerRing.length,
      lat: sumLat / outerRing.length,
    };

    // Sample boundary points — pick the N/S/E/W extremes plus
    // evenly-spaced vertices along the boundary for good coverage
    const boundaryPoints: { lon: number; lat: number }[] = [];

    // Add the 4 extreme vertices (N, S, E, W)
    let northPt = outerRing[0], southPt = outerRing[0], eastPt = outerRing[0], westPt = outerRing[0];
    for (const coord of outerRing) {
      if (coord[1] > northPt[1]) northPt = coord;
      if (coord[1] < southPt[1]) southPt = coord;
      if (coord[0] > eastPt[0]) eastPt = coord;
      if (coord[0] < westPt[0]) westPt = coord;
    }
    boundaryPoints.push({ lon: northPt[0], lat: northPt[1] });
    boundaryPoints.push({ lon: southPt[0], lat: southPt[1] });
    boundaryPoints.push({ lon: eastPt[0], lat: eastPt[1] });
    boundaryPoints.push({ lon: westPt[0], lat: westPt[1] });

    // Add 4 more evenly spaced along the ring (for better coverage)
    const step = Math.max(1, Math.floor(outerRing.length / 6));
    for (let i = step; i < outerRing.length - 1; i += step) {
      if (boundaryPoints.length >= 8) break;
      const coord = outerRing[i];
      // Skip if too close to an existing point (< ~20m)
      const tooClose = boundaryPoints.some(
        bp => Math.abs(bp.lon - coord[0]) < 0.0002 && Math.abs(bp.lat - coord[1]) < 0.0002
      );
      if (!tooClose) {
        boundaryPoints.push({ lon: coord[0], lat: coord[1] });
      }
    }

    return {
      centroid,
      boundaryPoints,
      bbox: { minLon, minLat, maxLon, maxLat },
      rings: [outerRing.map(c => [c[0], c[1]])],
    };
  } catch {
    return null;
  }
}

// ═══════════════════════════════════════════════════════════════════
// SPATIAL QUERIES — CRD + BC Freshwater Atlas
// ═══════════════════════════════════════════════════════════════════

// ─── CRD zoning (point query) ─────────────────────────────────────

async function queryZoningAtPoint(lon: number, lat: number): Promise<{
  zone_code: string | null;
  zone_desc: string | null;
  zoning_area: string | null;
  featureCount: number;
} | null> {
  try {
    const url = `https://mapservices.crd.bc.ca/arcgis/rest/services/Root/EaZoning/MapServer/0/query?` +
      `geometry=${lon},${lat}&geometryType=esriGeometryPoint&inSR=4326` +
      `&spatialRel=esriSpatialRelIntersects&outFields=ZoneCode,ZoneDesc,ZoningArea` +
      `&returnGeometry=false&f=pjson`;

    const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!resp.ok) return null;
    const data = await resp.json() as any;
    const count = data.features?.length || 0;
    if (count > 0) {
      const a = data.features[0].attributes;
      return {
        zone_code: a.ZoneCode || null,
        zone_desc: a.ZoneDesc || null,
        zoning_area: a.ZoningArea || null,
        featureCount: count,
      };
    }
    return { zone_code: null, zone_desc: null, zoning_area: null, featureCount: 0 };
  } catch {
    return null;
  }
}

// ─── Shoreline detection via "extend beyond boundary" ─────────────
//
// Strategy: For each boundary vertex, we compute a point ~50m BEYOND
// the vertex (extending the line from centroid through the vertex).
// Then we query CRD zoning at that extended point.
//
// - If the extended point has NO zoning → it's in the water/ocean,
//   meaning the property boundary faces open water → shoreline.
// - CRD zoning covers all land on SSI. Anything unzoned is water.
//
// This works because:
// - Zoning polygons extend right up to the natural boundary (shore)
// - 50m beyond the boundary is definitively in the ocean
// - We're testing the space OUTSIDE the property, not at its edge

interface ShorelineResult {
  isAdjacentToWater: boolean;
  waterVertexCount: number;
  totalVerticesTested: number;
  waterVertices: { lon: number; lat: number }[];
}

function extendBeyondVertex(
  centroid: { lon: number; lat: number },
  vertex: { lon: number; lat: number },
  distMeters: number = 50
): { lon: number; lat: number } {
  // Direction from centroid to vertex
  const dLon = vertex.lon - centroid.lon;
  const dLat = vertex.lat - centroid.lat;
  const len = Math.sqrt(dLon * dLon + dLat * dLat);
  if (len === 0) return vertex;

  // Normalize and extend by distMeters
  // At ~48.8°N latitude: 1° lat ≈ 111,000m, 1° lon ≈ 73,000m
  const mPerDegLat = 111000;
  const mPerDegLon = 73000;

  // Convert direction to meters, normalize, scale, convert back
  const dxm = dLon * mPerDegLon;
  const dym = dLat * mPerDegLat;
  const lenm = Math.sqrt(dxm * dxm + dym * dym);
  if (lenm === 0) return vertex;

  const scale = distMeters / lenm;
  return {
    lon: vertex.lon + dLon * scale,
    lat: vertex.lat + dLat * scale,
  };
}

async function checkShorelineAdjacency(
  boundaryPoints: { lon: number; lat: number }[],
  centroid: { lon: number; lat: number }
): Promise<ShorelineResult> {
  console.log(`Shoreline check: probing ${boundaryPoints.length} points ~50m beyond boundary`);

  // For each boundary vertex, extend ~50m beyond and check for zoning
  const results = await Promise.all(
    boundaryPoints.map(async (vertex, i) => {
      const probe = extendBeyondVertex(centroid, vertex, 50);
      const result = await queryZoningAtPoint(probe.lon, probe.lat);
      const inWater = result !== null && result.featureCount === 0;
      const zone = result?.zone_code || "NONE";
      console.log(`  Probe[${i}] vertex(${vertex.lon.toFixed(5)},${vertex.lat.toFixed(5)}) → beyond(${probe.lon.toFixed(5)},${probe.lat.toFixed(5)}): ${result?.featureCount ?? '?'} features, zone=${zone} ${inWater ? '← WATER!' : ''}`);
      return { vertex, probe, featureCount: result?.featureCount ?? -1, inWater };
    })
  );

  const waterVertices: { lon: number; lat: number }[] = [];
  let totalTested = 0;
  for (const r of results) {
    if (r.featureCount >= 0) {
      totalTested++;
      if (r.inWater) {
        waterVertices.push(r.vertex);
      }
    }
  }

  console.log(`Shoreline result: ${waterVertices.length}/${totalTested} probes hit water`);
  return {
    isAdjacentToWater: waterVertices.length > 0,
    waterVertexCount: waterVertices.length,
    totalVerticesTested: totalTested,
    waterVertices,
  };
}

// ─── CRD ALR query ───────────────────────────────────────────────

async function queryALR(lon: number, lat: number): Promise<boolean> {
  try {
    const url = `https://mapservices.crd.bc.ca/arcgis/rest/services/LandManagement/MapServer/8/query?` +
      `geometry=${lon},${lat}&geometryType=esriGeometryPoint&inSR=4326` +
      `&spatialRel=esriSpatialRelIntersects&outFields=STATUS` +
      `&returnGeometry=false&f=pjson`;
    const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!resp.ok) return false;
    const data = await resp.json() as any;
    return (data.features?.length || 0) > 0;
  } catch { return false; }
}

// ─── CRD Sensitive Ecosystems (polygon query) ─────────────────────
// Use the full parcel polygon to catch ecosystems that touch any
// part of the property, not just the centroid.

async function querySensitiveEcosystems(
  rings: number[][][],
  centroid: { lon: number; lat: number }
): Promise<string[]> {
  const results: string[] = [];

  // Try polygon query first
  try {
    const geomJson = JSON.stringify({ rings, spatialReference: { wkid: 4326 } });
    const url = `https://mapservices.crd.bc.ca/arcgis/rest/services/Environmental/MapServer/6/query?` +
      `geometry=${encodeURIComponent(geomJson)}&geometryType=esriGeometryPolygon&inSR=4326` +
      `&spatialRel=esriSpatialRelIntersects&outFields=ECOSYSTEM1,ECOSYSTEM2` +
      `&returnGeometry=false&f=pjson`;

    console.log("CRD ecosystem polygon query");
    const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (resp.ok) {
      const data = await resp.json() as any;
      if (data.features && data.features.length > 0) {
        for (const f of data.features) {
          const a = f.attributes;
          if (a.ECOSYSTEM1) results.push(a.ECOSYSTEM1);
          if (a.ECOSYSTEM2 && !results.includes(a.ECOSYSTEM2)) results.push(a.ECOSYSTEM2);
        }
        console.log("Ecosystems (polygon):", results.join(", "));
        return results;
      }
    }
  } catch (e) {
    console.log("Polygon ecosystem query failed, falling back to centroid:", e);
  }

  // Fallback: point query at centroid
  try {
    const url = `https://mapservices.crd.bc.ca/arcgis/rest/services/Environmental/MapServer/6/query?` +
      `geometry=${centroid.lon},${centroid.lat}&geometryType=esriGeometryPoint&inSR=4326` +
      `&spatialRel=esriSpatialRelIntersects&outFields=ECOSYSTEM1,ECOSYSTEM2` +
      `&returnGeometry=false&f=pjson`;
    const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (resp.ok) {
      const data = await resp.json() as any;
      if (data.features?.length > 0) {
        const a = data.features[0].attributes;
        if (a.ECOSYSTEM1) results.push(a.ECOSYSTEM1);
        if (a.ECOSYSTEM2) results.push(a.ECOSYSTEM2);
      }
    }
  } catch {}
  console.log("Ecosystems (centroid):", results.join(", ") || "none");
  return results;
}

// ─── BC Freshwater Atlas — streams near parcel ────────────────────

interface NearbyWaterFeatures {
  streams: { name: string; distance_approx: string }[];
  lakes: { name: string; distance_approx: string }[];
  hasMaxwellLake: boolean;
}

async function queryNearbyWater(
  bbox: { minLon: number; minLat: number; maxLon: number; maxLat: number }
): Promise<NearbyWaterFeatures> {
  const result: NearbyWaterFeatures = { streams: [], lakes: [], hasMaxwellLake: false };

  // Expand bbox by ~100m (~0.001 degrees) to catch nearby features
  const buffer = 0.001;
  const bboxStr = `${bbox.minLat - buffer},${bbox.minLon - buffer},${bbox.maxLat + buffer},${bbox.maxLon + buffer}`;

  // Query streams
  try {
    const streamUrl = `https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&version=1.1.0` +
      `&request=GetFeature&typeName=pub:WHSE_BASEMAPPING.FWA_STREAM_NETWORKS_SP` +
      `&outputFormat=json&BBOX=${bboxStr},urn:ogc:def:crs:EPSG::4326&count=10` +
      `&propertyName=GNIS_NAME,STREAM_ORDER,BLUE_LINE_KEY`;

    console.log("FWA stream query near parcel");
    const resp = await fetch(streamUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
    });
    if (resp.ok) {
      const data = await resp.json() as any;
      if (data.features?.length > 0) {
        const seen = new Set<string>();
        for (const f of data.features) {
          const name = f.properties?.GNIS_NAME || "Unnamed stream";
          if (!seen.has(name)) {
            seen.add(name);
            result.streams.push({ name, distance_approx: "within ~100m" });
          }
        }
        console.log(`Found ${result.streams.length} nearby streams`);
      }
    }
  } catch (e) {
    console.log("Stream query failed:", e);
  }

  // Query lakes — expand bbox more (~500m ≈ 0.005 degrees) for lake proximity
  try {
    const lakeBuffer = 0.006;  // ~600m for DPA 4 (61m for lakes, 300m for Maxwell)
    const lakeBbox = `${bbox.minLat - lakeBuffer},${bbox.minLon - lakeBuffer},${bbox.maxLat + lakeBuffer},${bbox.maxLon + lakeBuffer}`;
    const lakeUrl = `https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&version=1.1.0` +
      `&request=GetFeature&typeName=pub:WHSE_BASEMAPPING.FWA_LAKES_POLY` +
      `&outputFormat=json&BBOX=${lakeBbox},urn:ogc:def:crs:EPSG::4326&count=10` +
      `&propertyName=GNIS_NAME_1,AREA_HA`;

    console.log("FWA lake query near parcel");
    const resp = await fetch(lakeUrl, {
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(10000),
    });
    if (resp.ok) {
      const data = await resp.json() as any;
      if (data.features?.length > 0) {
        for (const f of data.features) {
          const name = f.properties?.GNIS_NAME_1 || "Unnamed lake";
          result.lakes.push({ name, distance_approx: "within ~600m" });
          if (name.toUpperCase().includes("MAXWELL")) {
            result.hasMaxwellLake = true;
          }
        }
        console.log(`Found ${result.lakes.length} nearby lakes`);
      }
    }
  } catch (e) {
    console.log("Lake query failed:", e);
  }

  return result;
}

// ═══════════════════════════════════════════════════════════════════
// DPA INFERENCE — Uses real spatial data
//
// DPA 1 — Island Villages (form/character)
// DPA 2 — Non-Village Commercial & GE (form/character)
// DPA 3 — Shoreline (marine environmental protection)
// DPA 4 — Lakes, Streams & Wetlands (freshwater protection)
// DPA 5 — Community Well Capture Zones (drinking water)
// DPA 6 — Unstable Slopes & Soil Erosion (geotechnical)
// DPA 7 — Riparian Areas (fish habitat per RAR)
// ═══════════════════════════════════════════════════════════════════

interface DPAResult {
  dpa: string;
  number: number;
  confidence: "confirmed" | "likely" | "possible" | "check";
  reason: string;
}

function inferDPAs(
  zoneInfo: ZoneInfo | null,
  crdZoneCode: string | null,
  shoreline: ShorelineResult,
  inALR: boolean,
  ecosystems: string[],
  water: NearbyWaterFeatures,
): DPAResult[] {
  const results: DPAResult[] = [];
  const code = (crdZoneCode || "").toUpperCase();
  const category = zoneInfo?.category || "";
  const isVillage = zoneInfo?.is_village || false;
  const ecoUpper = ecosystems.map(e => e.toUpperCase());

  // ── DPA 1 — Island Villages ──────────────────────────────────
  if (isVillage && (category === "commercial" || category === "employment" || category === "residential")) {
    results.push({
      dpa: "DPA 1 — Island Villages",
      number: 1,
      confidence: "likely",
      reason: `Zone ${zoneInfo?.lub_code || code} is within a village designation`,
    });
  }

  // ── DPA 2 — Non-Village Commercial & GE ──────────────────────
  if (!isVillage && (category === "commercial" || category === "employment" || category === "accommodation")) {
    results.push({
      dpa: "DPA 2 — Non-Village Commercial & Industrial",
      number: 2,
      confidence: "likely",
      reason: `Zone ${zoneInfo?.lub_code || code} is commercial/employment outside village areas`,
    });
  }

  // ── DPA 3 — Shoreline ────────────────────────────────────────
  // SPATIAL EVIDENCE: boundary vertices that fall in water
  if (category === "shoreline") {
    results.push({
      dpa: "DPA 3 — Shoreline",
      number: 3,
      confidence: "confirmed",
      reason: `Property is zoned ${zoneInfo?.lub_code || code} (${zoneInfo?.lub_name || "Shoreline"})`,
    });
  } else if (shoreline.isAdjacentToWater) {
    results.push({
      dpa: "DPA 3 — Shoreline",
      number: 3,
      confidence: "confirmed",
      reason: `Property boundary extends to water — ${shoreline.waterVertexCount} of ${shoreline.totalVerticesTested} boundary vertices are in water/unzoned area`,
    });
  } else if (ecoUpper.some(e => /COASTAL|MARINE|BEACH|SPIT|ESTUAR/.test(e))) {
    results.push({
      dpa: "DPA 3 — Shoreline",
      number: 3,
      confidence: "likely",
      reason: `Coastal/marine ecosystem detected: ${ecosystems.join(", ")}`,
    });
  }

  // ── DPA 4 — Lakes, Streams & Wetlands ────────────────────────
  // SPATIAL EVIDENCE: Freshwater Atlas streams/lakes near parcel
  if (water.streams.length > 0) {
    const streamNames = water.streams.map(s => s.name).join(", ");
    results.push({
      dpa: "DPA 4 — Lakes, Streams & Wetlands",
      number: 4,
      confidence: "likely",
      reason: `Nearby streams detected: ${streamNames}. DPA 4 applies within 10m of stream boundary`,
    });
  } else if (water.lakes.length > 0) {
    const lakeNames = water.lakes.map(l => l.name).join(", ");
    const dist = water.hasMaxwellLake ? "300m of Maxwell Lake" : "61m of lakes";
    results.push({
      dpa: "DPA 4 — Lakes, Streams & Wetlands",
      number: 4,
      confidence: "likely",
      reason: `Nearby lakes detected: ${lakeNames}. DPA 4 applies within ${dist}`,
    });
  } else if (ecoUpper.some(e => /WETLAND|RIPARIAN|STREAM|LAKE|MARSH|BOG|FEN|SWAMP/.test(e))) {
    results.push({
      dpa: "DPA 4 — Lakes, Streams & Wetlands",
      number: 4,
      confidence: "likely",
      reason: `Freshwater ecosystem detected: ${ecosystems.join(", ")}`,
    });
  } else if (category === "watershed") {
    results.push({
      dpa: "DPA 4 — Lakes, Streams & Wetlands",
      number: 4,
      confidence: "possible",
      reason: "Watershed zone — property may be near streams or lakes",
    });
  }

  // ── DPA 5 — Community Well Capture Zones ─────────────────────
  // Cannot determine from available data. Always flag for check.
  results.push({
    dpa: "DPA 5 — Community Well Capture Zones",
    number: 5,
    confidence: "check",
    reason: "Verify with Islands Trust — check OCP Map 22",
  });

  // ── DPA 6 — Unstable Slopes & Soil Erosion ───────────────────
  if (category === "upland" || category === "watershed" || category === "forestry") {
    results.push({
      dpa: "DPA 6 — Unstable Slopes & Soil Erosion",
      number: 6,
      confidence: "possible",
      reason: `${zoneInfo?.lub_name || code} zone — elevated terrain. Check OCP Maps 23-24`,
    });
  } else {
    results.push({
      dpa: "DPA 6 — Unstable Slopes & Soil Erosion",
      number: 6,
      confidence: "check",
      reason: "Verify with Islands Trust — check OCP Maps 23-24",
    });
  }

  // ── DPA 7 — Riparian Areas ───────────────────────────────────
  // SPATIAL EVIDENCE: streams nearby + riparian ecosystems
  if (ecoUpper.some(e => /RIPARIAN/.test(e))) {
    results.push({
      dpa: "DPA 7 — Riparian Areas",
      number: 7,
      confidence: "confirmed",
      reason: `Riparian ecosystem detected: ${ecosystems.filter(e => /riparian/i.test(e)).join(", ")}`,
    });
  } else if (water.streams.length > 0) {
    results.push({
      dpa: "DPA 7 — Riparian Areas",
      number: 7,
      confidence: "likely",
      reason: `Streams detected nearby — riparian areas likely per RAR (OCP Map 28)`,
    });
  } else if (category === "watershed") {
    results.push({
      dpa: "DPA 7 — Riparian Areas",
      number: 7,
      confidence: "possible",
      reason: "Watershed zone — may include riparian areas per RAR mapping",
    });
  }

  // Sort: confirmed → likely → possible → check, then by DPA number
  const order = { confirmed: 0, likely: 1, possible: 2, check: 3 };
  results.sort((a, b) => order[a.confidence] - order[b.confidence] || a.number - b.number);

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
    // ── Step 1: Get parcel attributes (local or WFS) ─────────────
    let parcelData: any = null;
    let source = "local";

    const local = await lookupLocal(pid.digits, env, request.url);
    if (local) {
      console.log("PID found in local dataset:", pid.dashed);
      parcelData = { ...local };
    } else {
      console.log("PID not in local dataset, trying WFS:", pid.dashed);
      source = "wfs";
      let features = await tryWfsQuery(`PID='${pid.digits}'`, false);
      if (features.length === 0) {
        features = await tryWfsQuery(`PID_NUMBER=${pid.number}`, false);
      }
      if (features.length > 0) {
        parcelData = extractFromWfs(features[0]);
      }
    }

    if (!parcelData) {
      return Response.json(
        { success: false, error: `No property found for PID ${pid.dashed}. Please verify the number and try again.` },
        { status: 404, headers: corsHeaders() }
      );
    }

    if (parcelData.pid && !parcelData.pid.includes("-")) {
      parcelData.pid = pid.dashed;
    }

    // ── Step 2: Get FULL parcel geometry from WFS ────────────────
    console.log("Fetching full geometry for PID:", pid.number);
    const geoFeatures = await tryWfsQuery(`PID_NUMBER=${pid.number}`, true);
    const geom = geoFeatures.length > 0 ? extractParcelGeometry(geoFeatures[0].geometry) : null;

    let zoning: any = null;
    let zoneInfo: ZoneInfo | null = null;
    let inALR = false;
    let ecosystems: string[] = [];
    let water: NearbyWaterFeatures = { streams: [], lakes: [], hasMaxwellLake: false };
    let shoreline: ShorelineResult = {
      isAdjacentToWater: false, waterVertexCount: 0,
      totalVerticesTested: 0, waterVertices: [],
    };
    let dpas: DPAResult[] = [];

    if (geom) {
      console.log(`Parcel geometry: centroid lon=${geom.centroid.lon.toFixed(6)}, lat=${geom.centroid.lat.toFixed(6)}`);
      console.log(`  BBOX: lon [${geom.bbox.minLon.toFixed(6)} to ${geom.bbox.maxLon.toFixed(6)}], lat [${geom.bbox.minLat.toFixed(6)} to ${geom.bbox.maxLat.toFixed(6)}]`);
      console.log(`  ${geom.boundaryPoints.length} boundary pts, ${geom.rings[0].length} ring vertices`);
      console.log(`  Google Maps verify: https://www.google.com/maps?q=${geom.centroid.lat.toFixed(6)},${geom.centroid.lon.toFixed(6)}`);

      // ── Step 3: Run ALL spatial queries in parallel ─────────
      const [zoningResult, alrResult, ecoResult, waterResult, shorelineResult] = await Promise.all([
        queryZoningAtPoint(geom.centroid.lon, geom.centroid.lat),
        queryALR(geom.centroid.lon, geom.centroid.lat),
        querySensitiveEcosystems(geom.rings, geom.centroid),
        queryNearbyWater(geom.bbox),
        checkShorelineAdjacency(geom.boundaryPoints, geom.centroid),
      ]);

      if (zoningResult) {
        zoning = zoningResult;
        console.log("Zoning:", zoningResult.zone_code, "-", zoningResult.zone_desc);
      }
      inALR = alrResult;
      ecosystems = ecoResult;
      water = waterResult;
      shoreline = shorelineResult;

      // ── Step 4: Map CRD zone to LUB 355 ────────────────────
      if (zoning?.zone_code) {
        zoneInfo = lookupZoneInfo(zoning.zone_code);
        if (zoneInfo) {
          console.log("LUB 355 zone:", zoneInfo.lub_code, "-", zoneInfo.lub_name);
        }
      }

      // ── Step 5: Determine DPAs from spatial evidence ───────
      dpas = inferDPAs(zoneInfo, zoning?.zone_code || null, shoreline, inALR, ecosystems, water);

      console.log("DPA results:", dpas.filter(d => d.confidence !== "check").map(d => `${d.dpa} (${d.confidence})`).join(", ") || "none confirmed/likely");
    } else {
      console.log("Could not get parcel geometry — skipping spatial analysis");
    }

    // ── Build response ───────────────────────────────────────────
    return Response.json(
      {
        success: true,
        data: {
          ...parcelData,
          crd_zone_code: zoning?.zone_code || null,
          crd_zone_desc: zoning?.zone_desc || null,
          lub_zone_code: zoneInfo?.lub_code || zoning?.zone_code || null,
          lub_zone_name: zoneInfo?.lub_name || zoning?.zone_desc || null,
          zone_category: zoneInfo?.category || null,
          zone_code: zoneInfo?.lub_code || zoning?.zone_code || null,
          zone_desc: zoneInfo?.lub_name || zoning?.zone_desc || null,
          in_alr: inALR,
          sensitive_ecosystem: ecosystems.length > 0 ? ecosystems.join(", ") : null,
          nearby_streams: water.streams,
          nearby_lakes: water.lakes,
          shoreline_adjacent: shoreline.isAdjacentToWater,
          dpas: dpas.map(d => ({
            name: d.dpa,
            number: d.number,
            confidence: d.confidence,
            reason: d.reason,
          })),
          centroid: geom?.centroid || null,
          debug_map_link: geom?.centroid
            ? `https://www.google.com/maps?q=${geom.centroid.lat.toFixed(6)},${geom.centroid.lon.toFixed(6)}`
            : null,
        },
        source,
      },
      { headers: corsHeaders() }
    );
  } catch (err: any) {
    if (err?.name === "TimeoutError" || err?.name === "AbortError") {
      return Response.json(
        { success: false, error: "Property lookup timed out. Please try again." },
        { status: 504, headers: corsHeaders() }
      );
    }
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
