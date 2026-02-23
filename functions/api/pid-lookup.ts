// ═══════════════════════════════════════════════════════════════════
// PID Lookup — Local dataset + CRD zoning + ALR + DPA inference
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
        } catch (e) {
          console.log("ASSETS.fetch failed:", e);
        }
      }
      if (!resp || !resp.ok) {
        try {
          const origin = new URL(requestUrl).origin;
          resp = await fetch(`${origin}/ssi-parcels.json`, { signal: AbortSignal.timeout(5000) });
        } catch (e) {
          console.log("Origin fetch failed:", e);
        }
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
      } else {
        localLoadFailed = true;
        return null;
      }
    }
    return cachedParcels[pidDigits] || null;
  } catch (err) {
    console.error("Error loading local dataset:", err);
    localLoadFailed = true;
    return null;
  }
}

// ─── WFS: parcel lookup + centroid ────────────────────────────────

function buildWfsUrl(cqlFilter: string, includeGeometry: boolean): string {
  const base = "https://openmaps.gov.bc.ca/geo/pub/ows";
  const params: Record<string, string> = {
    service: "WFS",
    version: "2.0.0",
    request: "GetFeature",
    typeName: "pub:WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW",
    outputFormat: "json",
    CQL_FILTER: cqlFilter,
  };
  if (!includeGeometry) {
    params.propertyName =
      "PID,PID_NUMBER,PARCEL_NAME,PLAN_NUMBER,PARCEL_STATUS,PARCEL_CLASS,OWNER_TYPE,MUNICIPALITY,REGIONAL_DISTRICT,FEATURE_AREA_SQM";
  }
  // When includeGeometry is true, we omit propertyName to get the geometry
  return `${base}?${new URLSearchParams(params).toString()}`;
}

async function tryWfsQuery(cqlFilter: string, includeGeometry = false): Promise<any[]> {
  const url = buildWfsUrl(cqlFilter, includeGeometry);
  console.log("WFS query:", cqlFilter, includeGeometry ? "(with geometry)" : "");

  const resp = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(15000),
  });
  if (!resp.ok) {
    console.error("WFS HTTP error:", resp.status);
    return [];
  }
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

// Compute centroid from GeoJSON polygon geometry
function computeCentroid(geometry: any): { lon: number; lat: number } | null {
  if (!geometry) return null;
  try {
    let coords: number[][] = [];
    if (geometry.type === "Polygon") {
      coords = geometry.coordinates[0]; // outer ring
    } else if (geometry.type === "MultiPolygon") {
      // Use the largest polygon (first one usually)
      coords = geometry.coordinates[0][0];
    } else {
      return null;
    }
    let sumLon = 0, sumLat = 0;
    for (const [lon, lat] of coords) {
      sumLon += lon;
      sumLat += lat;
    }
    return {
      lon: sumLon / coords.length,
      lat: sumLat / coords.length,
    };
  } catch {
    return null;
  }
}

// ─── CRD zoning query ────────────────────────────────────────────

async function queryZoning(lon: number, lat: number): Promise<{
  zone_code: string | null;
  zone_desc: string | null;
  zoning_area: string | null;
} | null> {
  try {
    const url = `https://mapservices.crd.bc.ca/arcgis/rest/services/Root/EaZoning/MapServer/0/query?` +
      `geometry=${lon},${lat}&geometryType=esriGeometryPoint&inSR=4326` +
      `&spatialRel=esriSpatialRelIntersects&outFields=ZoneCode,ZoneDesc,ZoningArea` +
      `&returnGeometry=false&f=pjson`;

    console.log("CRD zoning query at:", lon.toFixed(4), lat.toFixed(4));
    const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!resp.ok) return null;

    const data = await resp.json() as any;
    if (data.features && data.features.length > 0) {
      const a = data.features[0].attributes;
      console.log("Zoning result:", a.ZoneCode, "-", a.ZoneDesc);
      return {
        zone_code: a.ZoneCode || null,
        zone_desc: a.ZoneDesc || null,
        zoning_area: a.ZoningArea || null,
      };
    }
    return null;
  } catch (err) {
    console.error("Zoning query error:", err);
    return null;
  }
}

// ─── CRD ALR (Agricultural Land Reserve) query ────────────────────

async function queryALR(lon: number, lat: number): Promise<boolean> {
  try {
    const url = `https://mapservices.crd.bc.ca/arcgis/rest/services/LandManagement/MapServer/8/query?` +
      `geometry=${lon},${lat}&geometryType=esriGeometryPoint&inSR=4326` +
      `&spatialRel=esriSpatialRelIntersects&outFields=STATUS` +
      `&returnGeometry=false&f=pjson`;

    const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!resp.ok) return false;

    const data = await resp.json() as any;
    const inALR = data.features && data.features.length > 0;
    console.log("ALR result:", inALR ? "IN ALR" : "not in ALR");
    return inALR;
  } catch {
    return false;
  }
}

// ─── CRD Sensitive Ecosystems query ───────────────────────────────

async function querySensitiveEcosystem(lon: number, lat: number): Promise<string | null> {
  try {
    const url = `https://mapservices.crd.bc.ca/arcgis/rest/services/Environmental/MapServer/6/query?` +
      `geometry=${lon},${lat}&geometryType=esriGeometryPoint&inSR=4326` +
      `&spatialRel=esriSpatialRelIntersects&outFields=ECOSYSTEM1,ECOSYSTEM2` +
      `&returnGeometry=false&f=pjson`;

    const resp = await fetch(url, { signal: AbortSignal.timeout(10000) });
    if (!resp.ok) return null;

    const data = await resp.json() as any;
    if (data.features && data.features.length > 0) {
      const a = data.features[0].attributes;
      const eco = [a.ECOSYSTEM1, a.ECOSYSTEM2].filter(Boolean).join(", ");
      console.log("Sensitive ecosystem:", eco || "none");
      return eco || null;
    }
    return null;
  } catch {
    return null;
  }
}

// ─── DPA inference from zone code + spatial data ──────────────────

function inferDPAs(zoneCode: string | null, inALR: boolean, sensitiveEco: string | null): string[] {
  const dpas: string[] = [];
  const code = (zoneCode || "").toUpperCase();

  // DPA 1 — Shoreline: zones starting with SH, W, or marine-related
  if (/^(SH|W[12]|WP|WA|MA)/.test(code)) {
    dpas.push("DPA 1 — Shoreline");
  }

  // DPA 2 — Streams, Wetlands, Lake: if sensitive ecosystem detected
  if (sensitiveEco) {
    const eco = sensitiveEco.toUpperCase();
    if (/WETLAND|RIPARIAN|STREAM|LAKE|MARSH|BOG|FEN|SWAMP/.test(eco)) {
      dpas.push("DPA 2 — Streams, Wetlands & Lakes");
    }
  }

  // DPA 4 — Island Villages: commercial/village zones
  if (/^(C[1-9]|CV|GC|CFR)/.test(code)) {
    dpas.push("DPA 4 — Island Villages");
  }

  // DPA 5 — Agricultural: ALR or agricultural zones
  if (inALR || /^(A[1-3]|AF)/.test(code)) {
    dpas.push("DPA 5 — Agricultural");
  }

  // DPA 9 — Commercial & Industrial: commercial/industrial zones
  if (/^(C[1-9]|GC|GE|IN)/.test(code)) {
    dpas.push("DPA 9 — Commercial & Industrial");
  }

  // DPA 6/7 — Steep slope: can't determine without elevation data, note it
  // These apply to specific mapped areas; we'll note as possible
  if (dpas.length === 0 && !/^(P[1-9]|PA|PR)/.test(code)) {
    dpas.push("DPA 6/7 — Steep Slope (check site-specific mapping)");
  }

  return dpas;
}

// ─── Get centroid for a PID from WFS ──────────────────────────────

async function getCentroidForPID(pidNumber: number): Promise<{ lon: number; lat: number } | null> {
  const features = await tryWfsQuery(`PID_NUMBER=${pidNumber}`, true);
  if (features.length === 0) return null;
  return computeCentroid(features[0].geometry);
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

    // Ensure PID is in dashed format
    if (parcelData.pid && !parcelData.pid.includes("-")) {
      parcelData.pid = pid.dashed;
    }

    // ── Step 2: Get centroid from WFS (need geometry) ────────────
    console.log("Fetching centroid for PID:", pid.number);
    const centroid = await getCentroidForPID(pid.number);

    let zoning: any = null;
    let inALR = false;
    let sensitiveEco: string | null = null;
    let dpas: string[] = [];

    if (centroid) {
      console.log("Centroid:", centroid.lon.toFixed(4), centroid.lat.toFixed(4));

      // ── Step 3: Query CRD zoning + ALR + ecosystems in parallel
      const [zoningResult, alrResult, ecoResult] = await Promise.all([
        queryZoning(centroid.lon, centroid.lat),
        queryALR(centroid.lon, centroid.lat),
        querySensitiveEcosystem(centroid.lon, centroid.lat),
      ]);

      zoning = zoningResult;
      inALR = alrResult;
      sensitiveEco = ecoResult;

      // ── Step 4: Infer DPAs from zone + spatial data ────────────
      dpas = inferDPAs(zoning?.zone_code || null, inALR, sensitiveEco);
    } else {
      console.log("Could not determine centroid — skipping zoning/DPA lookup");
    }

    // ── Build response ───────────────────────────────────────────
    return Response.json(
      {
        success: true,
        data: {
          ...parcelData,
          // Zoning info
          zone_code: zoning?.zone_code || null,
          zone_desc: zoning?.zone_desc || null,
          // ALR status
          in_alr: inALR,
          // Sensitive ecosystem
          sensitive_ecosystem: sensitiveEco,
          // Inferred DPAs
          dpas,
          // Centroid (useful for map display later)
          centroid: centroid || null,
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
