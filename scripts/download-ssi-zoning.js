#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// Download all Salt Spring Island zoning polygons from CRD ArcGIS
// and save as a static JSON file for local point-in-polygon lookups.
//
// This eliminates the runtime dependency on CRD (which blocks cloud IPs).
// Run this locally — CRD works from regular IPs, just not Cloudflare.
//
// Usage:  node scripts/download-ssi-zoning.js
// Output: public/ssi-zoning.json
// ═══════════════════════════════════════════════════════════════════

const fs = require("fs");
const path = require("path");

// CRD ArcGIS endpoint for SSI/SGI Zoning (Layer 0)
const CRD_BASE = "https://mapservices.crd.bc.ca/arcgis/rest/services/Root/EaZoning/MapServer/0/query";

// Salt Spring Island approximate extent (Web Mercator / UTM Zone 10N won't matter
// since we're requesting output in EPSG:4326)
// We use a generous bounding box in WGS84
const SSI_ENVELOPE = {
  xmin: -123.65,
  ymin: 48.73,
  xmax: -123.30,
  ymax: 48.95,
};

async function fetchJson(url) {
  const resp = await fetch(url, {
    headers: {
      "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      "Accept": "application/json",
    },
  });
  if (!resp.ok) {
    const errText = await resp.text().catch(() => "");
    throw new Error(`HTTP ${resp.status}: ${errText.slice(0, 500)}`);
  }
  return resp.json();
}

async function fetchZoningPage(offset) {
  // ArcGIS REST API supports pagination via resultOffset/resultRecordCount
  // Request geometry in WGS84 (outSR=4326) for easy point-in-polygon
  const params = new URLSearchParams({
    where: "1=1",                           // All features
    outFields: "ZoneCode,ZoneDesc,ZoningArea",
    returnGeometry: "true",
    outSR: "4326",                          // WGS84 lon/lat
    geometryType: "esriGeometryEnvelope",
    geometry: JSON.stringify(SSI_ENVELOPE),
    inSR: "4326",
    spatialRel: "esriSpatialRelIntersects",
    resultOffset: String(offset),
    resultRecordCount: "1000",
    f: "json",
  });

  const url = `${CRD_BASE}?${params.toString()}`;
  console.log(`  Fetching offset=${offset} ...`);
  return fetchJson(url);
}

// Simplify a polygon ring by reducing vertices
// Keep every Nth point to reduce file size while maintaining shape accuracy
function simplifyRing(ring, maxPoints = 50) {
  if (ring.length <= maxPoints) return ring;
  const step = ring.length / maxPoints;
  const result = [];
  for (let i = 0; i < maxPoints; i++) {
    const idx = Math.min(Math.floor(i * step), ring.length - 1);
    result.push(ring[idx]);
  }
  // Ensure the ring closes
  if (result[0][0] !== result[result.length - 1][0] || result[0][1] !== result[result.length - 1][1]) {
    result.push(result[0]);
  }
  return result;
}

async function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║  Downloading SSI Zoning Polygons from CRD       ║");
  console.log("║  Source: mapservices.crd.bc.ca (EaZoning)        ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  const zones = [];
  const zoneCodes = new Map(); // code → count
  let offset = 0;
  let totalFetched = 0;

  while (true) {
    let data;
    try {
      data = await fetchZoningPage(offset);
    } catch (err) {
      console.error(`\n  ⚠️  Error: ${err.message}`);
      if (zones.length > 0) {
        console.log(`  Continuing with ${zones.length} zones fetched so far...\n`);
        break;
      }
      throw err;
    }

    if (!data.features || data.features.length === 0) break;

    for (const feature of data.features) {
      const a = feature.attributes || {};
      const geom = feature.geometry;
      if (!geom || !geom.rings || geom.rings.length === 0) continue;

      const code = a.ZoneCode || "";
      const desc = a.ZoneDesc || "";
      const area = a.ZoningArea || "";

      // Simplify geometry to reduce file size
      const rings = geom.rings.map(ring => simplifyRing(ring, 60));

      zones.push({
        code,
        desc,
        area,
        rings,
      });

      zoneCodes.set(code, (zoneCodes.get(code) || 0) + 1);
    }

    totalFetched += data.features.length;
    console.log(`    → Got ${data.features.length} features (total: ${totalFetched})`);

    // Check if there are more results
    if (!data.exceededTransferLimit && data.features.length < 1000) break;
    offset += 1000;

    // Brief pause
    await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\n  Total zone polygons: ${zones.length}`);
  console.log(`\n  Zone codes found:`);
  for (const [code, count] of [...zoneCodes.entries()].sort()) {
    console.log(`    ${code}: ${count} polygons`);
  }

  if (zones.length === 0) {
    console.error("\n❌ No zoning polygons found!");
    process.exit(1);
  }

  // Save
  const output = {
    _meta: {
      source: "CRD ArcGIS — Root/EaZoning/MapServer/0 (SSI SGI Zoning)",
      downloaded: new Date().toISOString(),
      total_polygons: zones.length,
      unique_zone_codes: zoneCodes.size,
      crs: "EPSG:4326 (WGS84)",
      note: "Polygons simplified to max 60 vertices per ring to reduce file size",
    },
    zones,
  };

  const outPath = path.join(__dirname, "..", "public", "ssi-zoning.json");
  fs.writeFileSync(outPath, JSON.stringify(output));
  const sizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
  console.log(`\n  ✅ Saved to ${outPath}`);
  console.log(`     File size: ${sizeMB} MB`);
  console.log(`     Polygons: ${zones.length}\n`);
}

main().catch(err => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
