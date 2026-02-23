#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// Download all Salt Spring Island parcels from BC ParcelMap WFS
// and save as a local JSON lookup file.
//
// Strategy: Use a bounding box around Salt Spring Island to capture
// all parcels, regardless of municipality name variations.
//
// Usage:  node scripts/download-ssi-parcels.js
// Output: public/ssi-parcels.json, public/ssi-pid-lookup.json
// ═══════════════════════════════════════════════════════════════════

const fs = require("fs");
const path = require("path");

const WFS_BASE = "https://openmaps.gov.bc.ca/geo/pub/ows";
const TYPE_NAME = "pub:WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW";

// Salt Spring Island bounding box (WGS84 / EPSG:4326)
// Generous enough to cover all of SSI including small surrounding islets
const SSI_BBOX = {
  west: -123.65,
  south: 48.73,
  east: -123.30,
  north: 48.95,
};

// Use BBOX CQL filter — widely supported by GeoServer WFS
const CQL_FILTER = `BBOX(SHAPE,${SSI_BBOX.west},${SSI_BBOX.south},${SSI_BBOX.east},${SSI_BBOX.north},'EPSG:4326')`;

const PROPERTIES = [
  "PID",
  "PID_NUMBER",
  "PARCEL_NAME",
  "PLAN_NUMBER",
  "PARCEL_STATUS",
  "PARCEL_CLASS",
  "OWNER_TYPE",
  "MUNICIPALITY",
  "REGIONAL_DISTRICT",
  "FEATURE_AREA_SQM",
  "FEATURE_LENGTH_M",
  "PARCEL_START_DATE",
  "WHEN_UPDATED",
].join(",");

const PAGE_SIZE = 1000;

async function fetchJson(url) {
  const resp = await fetch(url);
  if (!resp.ok) {
    const errText = await resp.text();
    throw new Error(`HTTP ${resp.status}: ${errText.slice(0, 500)}`);
  }
  return resp.json();
}

async function fetchPage(startIndex) {
  const params = new URLSearchParams({
    service: "WFS",
    version: "2.0.0",
    request: "GetFeature",
    typeName: TYPE_NAME,
    outputFormat: "json",
    CQL_FILTER: CQL_FILTER,
    propertyName: PROPERTIES,
    count: String(PAGE_SIZE),
    startIndex: String(startIndex),
    sortBy: "PID_NUMBER",
  });

  const url = `${WFS_BASE}?${params.toString()}`;
  console.log(`  Fetching startIndex=${startIndex} ...`);

  const data = await fetchJson(url);
  if (data.type !== "FeatureCollection" || !Array.isArray(data.features)) {
    // Log first bit of response for debugging
    const preview = JSON.stringify(data).slice(0, 500);
    throw new Error("Unexpected WFS response: " + preview);
  }

  return data.features;
}

function extractRecord(feature) {
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
    perimeter_m: p.FEATURE_LENGTH_M ? Math.round(p.FEATURE_LENGTH_M) : null,
    parcel_start_date: p.PARCEL_START_DATE || null,
    when_updated: p.WHEN_UPDATED || null,
  };
}

// Filter: keep parcels that are likely on Salt Spring Island
// The MUNICIPALITY field uses "rural" for SSI parcels (not "Salt Spring Island")
// so we keep all parcels from the bounding box except those clearly from other islands
const EXCLUDE_MUNICIPALITIES = new Set([
  // Add any non-SSI municipalities that appear in the BBOX if needed
]);
function isSaltSpring(rec) {
  const m = (rec.municipality || "").toLowerCase().trim();
  if (EXCLUDE_MUNICIPALITIES.has(m)) return false;
  return true; // keep all parcels within the SSI bounding box
}

async function main() {
  console.log("╔══════════════════════════════════════════════════╗");
  console.log("║  Downloading Salt Spring Island Parcel Data     ║");
  console.log("║  Source: BC ParcelMap WFS (openmaps.gov.bc.ca)  ║");
  console.log("╚══════════════════════════════════════════════════╝\n");

  console.log(`  Strategy: Bounding box query around SSI`);
  console.log(`  BBOX: ${SSI_BBOX.west}, ${SSI_BBOX.south} → ${SSI_BBOX.east}, ${SSI_BBOX.north}\n`);

  // Fetch all pages
  const allRecords = [];
  const municipalityVariants = new Map(); // name → count
  let startIndex = 0;

  while (true) {
    let features;
    try {
      features = await fetchPage(startIndex);
    } catch (err) {
      console.error(`\n  ⚠️  Error on page fetch: ${err.message}`);
      if (allRecords.length > 0) {
        console.log(`  Continuing with ${allRecords.length} parcels fetched so far...\n`);
        break;
      }
      throw err;
    }

    if (features.length === 0) break;

    for (const f of features) {
      const rec = extractRecord(f);
      allRecords.push(rec);
      const m = rec.municipality || "(null)";
      municipalityVariants.set(m, (municipalityVariants.get(m) || 0) + 1);
    }

    console.log(`    → Got ${features.length} parcels (total so far: ${allRecords.length})`);

    if (features.length < PAGE_SIZE) break;
    startIndex += PAGE_SIZE;

    // Brief pause to be polite to the server
    await new Promise((r) => setTimeout(r, 500));
  }

  // Show all municipality variants found in the bounding box
  console.log(`\n  All municipality values found in bounding box:`);
  for (const [name, count] of [...municipalityVariants.entries()].sort((a, b) => b[1] - a[1])) {
    const tag = isSaltSpring({ municipality: name }) ? " ✓ SSI" : "   ---";
    console.log(`   ${tag}  "${name}" (${count} parcels)`);
  }

  // Filter to Salt Spring parcels only
  const ssiRecords = allRecords.filter(isSaltSpring);
  const active = ssiRecords.filter((r) => r.parcel_status === "Active");
  const parcelsToSave = active.length > 0 ? active : ssiRecords;

  console.log(`\n  Bounding box total: ${allRecords.length}`);
  console.log(`  Salt Spring parcels: ${ssiRecords.length}`);
  console.log(`  Active Salt Spring parcels: ${active.length}`);

  if (parcelsToSave.length === 0) {
    console.error("\n❌ No Salt Spring parcels found. This is unexpected.");
    process.exit(1);
  }

  // Build the output
  const output = {
    _meta: {
      source: "BC ParcelMap WFS — WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW",
      method: "BBOX query around Salt Spring Island",
      downloaded: new Date().toISOString(),
      total_records: parcelsToSave.length,
      municipality_variants: [...new Set(parcelsToSave.map((r) => r.municipality).filter(Boolean))],
      license: "Open Government Licence — British Columbia (OGL-BC)",
    },
    parcels: parcelsToSave,
  };

  const outPath = path.join(__dirname, "..", "public", "ssi-parcels.json");
  fs.writeFileSync(outPath, JSON.stringify(output, null, 2));
  const sizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
  console.log(`\n  ✅ Saved to ${outPath}`);
  console.log(`     File size: ${sizeMB} MB`);
  console.log(`     Records: ${parcelsToSave.length} parcels\n`);

  // Build compact lookup (PID → basic info)
  const lookup = {};
  for (const r of parcelsToSave) {
    if (r.pid) {
      lookup[r.pid] = {
        pn: r.plan_number,
        pc: r.parcel_class,
        ot: r.owner_type,
        a: r.area_sqm,
      };
    }
  }

  const lookupPath = path.join(__dirname, "..", "public", "ssi-pid-lookup.json");
  fs.writeFileSync(lookupPath, JSON.stringify(lookup));
  const lookupSizeMB = (fs.statSync(lookupPath).size / 1024 / 1024).toFixed(2);
  console.log(`  ✅ Saved compact lookup to ${lookupPath}`);
  console.log(`     File size: ${lookupSizeMB} MB`);
  console.log(`     Unique PIDs: ${Object.keys(lookup).length}\n`);
}

main().catch((err) => {
  console.error("❌ Error:", err.message);
  process.exit(1);
});
