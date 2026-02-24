#!/usr/bin/env node
// Debug script: trace exactly what happens for a PID lookup
// Usage: node scripts/debug-pid.js 009-555-781

const PID_INPUT = process.argv[2] || "009-555-781";
const digits = PID_INPUT.replace(/\D/g, "");
const pidNumber = parseInt(digits, 10);

console.log(`\n════════════════════════════════════════`);
console.log(`DEBUGGING PID: ${PID_INPUT}`);
console.log(`  Digits: ${digits}`);
console.log(`  PID_NUMBER: ${pidNumber}`);
console.log(`════════════════════════════════════════\n`);

async function fetchJson(url, label) {
  try {
    const resp = await fetch(url, { signal: AbortSignal.timeout(15000) });
    if (!resp.ok) {
      console.log(`  ❌ ${label}: HTTP ${resp.status}`);
      return null;
    }
    return await resp.json();
  } catch (e) {
    console.log(`  ❌ ${label}: ${e.message}`);
    return null;
  }
}

async function main() {
  // ── Step 1: Fetch parcel from WFS WITH geometry ────────────────
  console.log("STEP 1: Fetch parcel from BC WFS");
  const wfsUrl = `https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=pub:WHSE_CADASTRE.PMBC_PARCEL_FABRIC_POLY_SVW&outputFormat=json&srsName=EPSG:4326&CQL_FILTER=PID_NUMBER=${pidNumber}`;

  const wfsData = await fetchJson(wfsUrl, "WFS");
  if (!wfsData || !wfsData.features || wfsData.features.length === 0) {
    console.log("  ❌ No features returned from WFS!");
    return;
  }

  const feature = wfsData.features[0];
  const props = feature.properties;
  console.log(`  ✅ Found parcel`);
  console.log(`     PID: ${props.PID}`);
  console.log(`     PID_NUMBER: ${props.PID_NUMBER}`);
  console.log(`     PARCEL_NAME: ${props.PARCEL_NAME}`);
  console.log(`     PLAN_NUMBER: ${props.PLAN_NUMBER}`);
  console.log(`     MUNICIPALITY: ${props.MUNICIPALITY}`);
  console.log(`     OWNER_TYPE: ${props.OWNER_TYPE}`);
  console.log(`     AREA_SQM: ${props.FEATURE_AREA_SQM}`);

  // ── Step 2: Examine geometry ──────────────────────────────────
  console.log("\nSTEP 2: Examine parcel geometry");
  const geom = feature.geometry;
  console.log(`  Geometry type: ${geom.type}`);

  let outerRing;
  if (geom.type === "Polygon") {
    outerRing = geom.coordinates[0];
  } else if (geom.type === "MultiPolygon") {
    outerRing = geom.coordinates[0][0];
    console.log(`  MultiPolygon: ${geom.coordinates.length} polygons`);
  } else {
    console.log(`  ❌ Unexpected geometry type: ${geom.type}`);
    return;
  }

  // ── Axis order detection ──────────────────────────────────────
  // WFS 2.0.0 + EPSG:4326 may return (lat, lon) instead of (lon, lat)
  // SSI: lon ≈ -123.5 (negative), lat ≈ 48.85 (positive)
  const [c0, c1] = outerRing[0];
  console.log(`\n  RAW first vertex: [${c0}, ${c1}]`);
  const looksSwapped = (c0 > 0 && c0 < 90 && c1 < 0 && c1 > -180);
  if (looksSwapped) {
    console.log(`  ⚠️ AXIS ORDER SWAPPED! Coordinates appear to be (lat, lon) — fixing...`);
    outerRing = outerRing.map(([a, b]) => [b, a]);
    console.log(`  Fixed first vertex: [${outerRing[0][0]}, ${outerRing[0][1]}]`);
  } else {
    console.log(`  ✅ Axis order looks correct (lon, lat)`);
  }

  console.log(`  Outer ring: ${outerRing.length} vertices`);

  // Compute centroid and bbox
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
  const centroid = { lon: sumLon / outerRing.length, lat: sumLat / outerRing.length };

  console.log(`  Centroid: ${centroid.lon.toFixed(6)}, ${centroid.lat.toFixed(6)}`);
  console.log(`  BBOX: [${minLon.toFixed(6)}, ${minLat.toFixed(6)}] to [${maxLon.toFixed(6)}, ${maxLat.toFixed(6)}]`);
  console.log(`  Width: ${((maxLon - minLon) * 73000).toFixed(0)}m, Height: ${((maxLat - minLat) * 111000).toFixed(0)}m`);

  // Show first/last few vertices
  console.log(`  First 3 vertices:`);
  for (let i = 0; i < Math.min(3, outerRing.length); i++) {
    console.log(`    [${i}] ${outerRing[i][0].toFixed(6)}, ${outerRing[i][1].toFixed(6)}`);
  }
  console.log(`  Last 3 vertices:`);
  for (let i = Math.max(0, outerRing.length - 3); i < outerRing.length; i++) {
    console.log(`    [${i}] ${outerRing[i][0].toFixed(6)}, ${outerRing[i][1].toFixed(6)}`);
  }

  // Find N/S/E/W extreme vertices
  let northPt = outerRing[0], southPt = outerRing[0], eastPt = outerRing[0], westPt = outerRing[0];
  for (const coord of outerRing) {
    if (coord[1] > northPt[1]) northPt = coord;
    if (coord[1] < southPt[1]) southPt = coord;
    if (coord[0] > eastPt[0]) eastPt = coord;
    if (coord[0] < westPt[0]) westPt = coord;
  }
  console.log(`\n  Extreme vertices:`);
  console.log(`    North: ${northPt[0].toFixed(6)}, ${northPt[1].toFixed(6)}`);
  console.log(`    South: ${southPt[0].toFixed(6)}, ${southPt[1].toFixed(6)}`);
  console.log(`    East:  ${eastPt[0].toFixed(6)}, ${eastPt[1].toFixed(6)}`);
  console.log(`    West:  ${westPt[0].toFixed(6)}, ${westPt[1].toFixed(6)}`);

  // ── Step 3: Google Maps link for visual verification ──────────
  console.log(`\n  📍 VERIFY ON MAP:`);
  console.log(`  Centroid: https://www.google.com/maps?q=${centroid.lat.toFixed(6)},${centroid.lon.toFixed(6)}`);
  console.log(`  North:    https://www.google.com/maps?q=${northPt[1].toFixed(6)},${northPt[0].toFixed(6)}`);
  console.log(`  South:    https://www.google.com/maps?q=${southPt[1].toFixed(6)},${southPt[0].toFixed(6)}`);
  console.log(`  East:     https://www.google.com/maps?q=${eastPt[1].toFixed(6)},${eastPt[0].toFixed(6)}`);
  console.log(`  West:     https://www.google.com/maps?q=${westPt[1].toFixed(6)},${westPt[0].toFixed(6)}`);

  // ── Step 4: Query CRD zoning at centroid ──────────────────────
  console.log("\nSTEP 3: CRD zoning at CENTROID");
  const zoningUrl = `https://mapservices.crd.bc.ca/arcgis/rest/services/Root/EaZoning/MapServer/0/query?geometry=${centroid.lon},${centroid.lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=ZoneCode,ZoneDesc,ZoningArea&returnGeometry=false&f=pjson`;
  const zoning = await fetchJson(zoningUrl, "CRD Zoning (centroid)");
  if (zoning && zoning.features) {
    console.log(`  Features returned: ${zoning.features.length}`);
    for (const f of zoning.features) {
      const code = f.attributes.ZoneCode || "NULL";
      const desc = f.attributes.ZoneDesc || "NULL";
      const area = f.attributes.ZoningArea || "NULL";
      console.log(`  ✅ CRD Zone Code: "${code}"`);
      console.log(`     Description:   "${desc}"`);
      console.log(`     Area:          "${area}"`);
      console.log(`     Raw attributes: ${JSON.stringify(f.attributes)}`);
    }
  }

  // ── Step 5: Query CRD zoning at each extreme vertex ───────────
  console.log("\nSTEP 4: CRD zoning at BOUNDARY EXTREMES");
  const extremes = [
    { label: "North", pt: northPt },
    { label: "South", pt: southPt },
    { label: "East",  pt: eastPt },
    { label: "West",  pt: westPt },
  ];
  for (const { label, pt } of extremes) {
    const url = `https://mapservices.crd.bc.ca/arcgis/rest/services/Root/EaZoning/MapServer/0/query?geometry=${pt[0]},${pt[1]}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=ZoneCode,ZoneDesc&returnGeometry=false&f=pjson`;
    const result = await fetchJson(url, `Zoning (${label})`);
    const count = result?.features?.length || 0;
    const zone = count > 0 ? result.features[0].attributes.ZoneCode : "NONE (water?)";
    console.log(`  ${label} vertex: ${count} features → ${zone}`);
  }

  // ── Step 6: Probe at MULTIPLE DISTANCES beyond each extreme vertex ──────────────
  // Test at 50m, 100m, and 200m to handle cases where CRD zoning may extend further
  console.log("\nSTEP 5: Probe at 50m, 100m, and 200m BEYOND each boundary extreme");
  for (const { label, pt } of extremes) {
    console.log(`  ${label} vertex:`);
    for (const dist of [50, 100, 200]) {
      const dLon = pt[0] - centroid.lon;
      const dLat = pt[1] - centroid.lat;
      const dxm = dLon * 73000;
      const dym = dLat * 111000;
      const lenm = Math.sqrt(dxm * dxm + dym * dym);
      const scale = lenm > 0 ? dist / lenm : 0;
      const probe = {
        lon: pt[0] + dLon * scale,
        lat: pt[1] + dLat * scale,
      };

      const url = `https://mapservices.crd.bc.ca/arcgis/rest/services/Root/EaZoning/MapServer/0/query?geometry=${probe.lon},${probe.lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=ZoneCode&returnGeometry=false&f=pjson`;
      const result = await fetchJson(url, `Probe ${label} ${dist}m`);
      const count = result?.features?.length || 0;
      const zone = count > 0 ? result.features[0].attributes.ZoneCode : "NONE ← WATER!";
      console.log(`    ${dist}m probe (${probe.lon.toFixed(6)}, ${probe.lat.toFixed(6)}): ${count} features → ${zone}`);
    }
  }

  // ── Step 7: Check FWA streams/lakes near parcel ───────────────
  console.log("\nSTEP 6: BC Freshwater Atlas — streams near parcel");
  const streamBbox = `${minLat - 0.001},${minLon - 0.001},${maxLat + 0.001},${maxLon + 0.001}`;
  const streamUrl = `https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=pub:WHSE_BASEMAPPING.FWA_STREAM_NETWORKS_SP&outputFormat=json&BBOX=${streamBbox},urn:ogc:def:crs:EPSG::4326&count=5&propertyName=GNIS_NAME,STREAM_ORDER,BLUE_LINE_KEY`;
  const streams = await fetchJson(streamUrl, "FWA Streams");
  if (streams && streams.features) {
    console.log(`  Stream features returned: ${streams.features.length}`);
    for (const f of streams.features) {
      console.log(`    Stream: ${f.properties.GNIS_NAME || "(unnamed)"}, order: ${f.properties.STREAM_ORDER}`);
    }
  }

  console.log("\n  BC Freshwater Atlas — lakes near parcel");
  const lakeBbox = `${minLat - 0.006},${minLon - 0.006},${maxLat + 0.006},${maxLon + 0.006}`;
  const lakeUrl = `https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=pub:WHSE_BASEMAPPING.FWA_LAKES_POLY&outputFormat=json&BBOX=${lakeBbox},urn:ogc:def:crs:EPSG::4326&count=5&propertyName=GNIS_NAME_1,AREA_HA`;
  const lakes = await fetchJson(lakeUrl, "FWA Lakes");
  if (lakes && lakes.features) {
    console.log(`  Lake features returned: ${lakes.features.length}`);
    for (const f of lakes.features) {
      console.log(`    Lake: ${f.properties.GNIS_NAME_1 || "(unnamed)"}, area: ${f.properties.AREA_HA} ha`);
    }
  }

  // ── Step 8: Check for coastlines near parcel ──────────────────
  console.log("\nSTEP 7: BC Freshwater Atlas — coastlines near parcel");
  const coastlineBbox = `${minLat - 0.001},${minLon - 0.001},${maxLat + 0.001},${maxLon + 0.001}`;
  const coastlineUrl = `https://openmaps.gov.bc.ca/geo/pub/ows?service=WFS&version=1.1.0&request=GetFeature&typeName=pub:WHSE_BASEMAPPING.FWA_COASTLINES_SP&outputFormat=json&BBOX=${coastlineBbox},urn:ogc:def:crs:EPSG::4326&count=5&propertyName=GNIS_NAME`;
  const coastlines = await fetchJson(coastlineUrl, "FWA Coastlines");
  if (coastlines && coastlines.features) {
    console.log(`  Coastline features returned: ${coastlines.features.length}`);
    if (coastlines.features.length > 0) {
      console.log(`  ✓ MARINE BOUNDARY CONFIRMED — This is a shoreline property!`);
    }
  }

  // ── Step 9: CRD Sensitive Ecosystems at centroid ───────────────
  console.log("\nSTEP 8: CRD Sensitive Ecosystems at centroid");
  const ecoUrl = `https://mapservices.crd.bc.ca/arcgis/rest/services/Environmental/MapServer/6/query?geometry=${centroid.lon},${centroid.lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=ECOSYSTEM1,ECOSYSTEM2&returnGeometry=false&f=pjson`;
  const eco = await fetchJson(ecoUrl, "Sensitive Ecosystems");
  if (eco && eco.features) {
    console.log(`  Features returned: ${eco.features.length}`);
    for (const f of eco.features) {
      console.log(`    Ecosystem: ${f.attributes.ECOSYSTEM1}, ${f.attributes.ECOSYSTEM2}`);
    }
  }

  // ── Step 9: CRD ALR at centroid ────────────────────────────────
  console.log("\nSTEP 8: ALR status at centroid");
  const alrUrl = `https://mapservices.crd.bc.ca/arcgis/rest/services/LandManagement/MapServer/8/query?geometry=${centroid.lon},${centroid.lat}&geometryType=esriGeometryPoint&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=STATUS&returnGeometry=false&f=pjson`;
  const alr = await fetchJson(alrUrl, "ALR");
  if (alr && alr.features) {
    console.log(`  In ALR: ${alr.features.length > 0 ? "YES" : "NO"}`);
  }

  console.log("\n════════════════════════════════════════");
  console.log("DONE. Check the Google Maps links above");
  console.log("to verify coordinates match the property.");
  console.log("════════════════════════════════════════\n");
}

main().catch(console.error);
