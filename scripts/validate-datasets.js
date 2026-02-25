#!/usr/bin/env node

/**
 * Salt Spring Island Bylaw Compliance Checker — Dataset Validation
 *
 * Validates the three core JSON datasets used by the pid-lookup backend:
 *   - ssi-parcels.json: 2,270 PMBC parcels with geometry
 *   - ssi-zones.json: 629 Islands Trust zoning polygons
 *   - ssi-dpas.json: 440 Islands Trust DPA polygons
 *
 * Checks data integrity, coordinate validity, and consistency with
 * the reference maps defined in pid-lookup.ts
 */

const fs = require('fs');
const path = require('path');

// ═══════════════════════════════════════════════════════════════════
// Constants and Reference Maps (from pid-lookup.ts)
// ═══════════════════════════════════════════════════════════════════

const ZONE_MAP = {
  // Residential
  "R1":   "Residential 1",
  "R2":   "Residential 2",
  "R3":   "Residential 3 (Mobile Home Park)",
  "R4":   "Residential 4",
  "R5":   "Residential 5 (Multi-Unit)",
  "R6":   "Residential 6",
  "R7":   "Residential 7",
  "R8":   "Residential 8",
  "R9":   "Residential 9",
  "R10":  "Residential 10 (Conservation)",
  "R11":  "Residential 11 (Cluster)",
  "R12":  "Residential 12 (Compact)",
  "Ri":   "Rural Island",
  // Agriculture
  "A1":   "Agriculture 1",
  "A2":   "Agriculture 2",
  // Commercial
  "C1":   "Commercial 1",
  "C2":   "Commercial 2",
  "C3":   "Commercial 3",
  "C4":   "Commercial 4",
  // Commercial Accommodation
  "CA1":  "Commercial Accommodation 1",
  "CA2":  "Commercial Accommodation 2",
  // Forestry
  "F1":   "Forestry 1",
  "F2":   "Forestry 2",
  // General Employment
  "GE1":  "General Employment 1",
  "GE2":  "General Employment 2",
  "GE3":  "General Employment 3 (Marine)",
  // Parks & Reserves
  "PR1":  "Parks & Reserves 1 (Active)",
  "PR2":  "Parks & Reserves 2 (Nature)",
  "PR3":  "Parks & Reserves 3",
  "PR4":  "Parks & Reserves 4",
  "PR5":  "Parks & Reserves 5",
  "PR6":  "Parks & Reserves 6",
  "P":    "Park",
  // Rural
  "R":    "Rural",
  "RU1":  "Rural Uplands 1",
  // Shoreline
  "S1":   "Shoreline 1",
  "S2":   "Shoreline 2",
  "S3":   "Shoreline 3",
  "S4":   "Shoreline 4",
  "S5":   "Shoreline 5",
  "S6":   "Shoreline 6",
  "S7":   "Shoreline 7",
  "S8":   "Shoreline 8",
  // Watershed
  "RW1":  "Rural Watershed 1",
  "RW2":  "Rural Watershed 2",
  "W1":   "Watershed 1",
  "W2":   "Watershed 2",
  // Upland
  "U1":   "Upland 1",
};

const DPA_NAMES = {
  1: "DPA 1 — Island Villages",
  2: "DPA 2 — Non-Village Commercial & General Employment",
  3: "DPA 3 — Shoreline",
  4: "DPA 4 — Lakes, Streams & Wetlands",
  5: "DPA 5 — Community Well Capture Zones",
  6: "DPA 6 — Unstable Slopes & Soil Erosion",
  7: "DPA 7 — Riparian Areas",
};

// SSI geographic bounds (approximate)
const SSI_BOUNDS = {
  minLon: -123.7,
  maxLon: -123.3,
  minLat: 48.7,
  maxLat: 48.9,
};

// ═══════════════════════════════════════════════════════════════════
// Utility Functions
// ═══════════════════════════════════════════════════════════════════

function formatBytes(bytes) {
  const sizes = ['B', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 B';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round((bytes / Math.pow(1024, i)) * 100) / 100 + ' ' + sizes[i];
}

function loadJSON(filePath) {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (e) {
    console.error(`Error loading ${filePath}: ${e.message}`);
    return null;
  }
}

function bboxValid(bbox) {
  if (!Array.isArray(bbox) || bbox.length !== 4) return false;
  const [minLon, minLat, maxLon, maxLat] = bbox;
  return minLon < maxLon && minLat < maxLat;
}

function pointInBBox(lon, lat, bbox) {
  return lon >= bbox[0] && lat >= bbox[1] && lon <= bbox[2] && lat <= bbox[3];
}

function centroidInBBox(centroid, bbox) {
  return pointInBBox(centroid[0], centroid[1], bbox);
}

function coordInSSI(lon, lat) {
  return lon >= SSI_BOUNDS.minLon && lon <= SSI_BOUNDS.maxLon &&
         lat >= SSI_BOUNDS.minLat && lat <= SSI_BOUNDS.maxLat;
}

// ═══════════════════════════════════════════════════════════════════
// Validation Functions
// ═══════════════════════════════════════════════════════════════════

function validateParcels(data) {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║                  PARCELS VALIDATION                          ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  if (!data || !data.parcels || !Array.isArray(data.parcels)) {
    console.error('ERROR: Invalid parcels structure');
    return;
  }

  const parcels = data.parcels;
  const count = data.count;

  console.log(`Total parcels reported: ${count}`);
  console.log(`Actual parcels in array: ${parcels.length}`);
  if (count !== parcels.length) {
    console.warn(`⚠ MISMATCH: count=${count} but array.length=${parcels.length}`);
  }

  // ─── PID Uniqueness & Sorting ────────────────────────────────────
  const pids = new Set();
  const pidList = [];
  let duplicatePIDs = 0;
  let nullPIDs = 0;
  let sortOrderViolations = 0;

  for (let i = 0; i < parcels.length; i++) {
    const p = parcels[i];
    if (!p.pid) {
      nullPIDs++;
    } else {
      pidList.push(p.pid);
      if (pids.has(p.pid)) {
        duplicatePIDs++;
      }
      pids.add(p.pid);
    }

    // Check sorting (for binary search)
    if (i > 0 && p.pid && parcels[i - 1].pid) {
      if (p.pid.localeCompare(parcels[i - 1].pid) < 0) {
        sortOrderViolations++;
      }
    }
  }

  console.log(`✓ Unique PIDs: ${pids.size}`);
  if (nullPIDs > 0) {
    console.warn(`⚠ NULL/empty PIDs: ${nullPIDs}`);
  }
  if (duplicatePIDs > 0) {
    console.warn(`⚠ Duplicate PIDs: ${duplicatePIDs}`);
  }

  console.log(`Sorted for binary search: ${sortOrderViolations === 0 ? '✓ Yes' : `✗ No (${sortOrderViolations} violations)`}`);

  // ─── Geometry Integrity ──────────────────────────────────────────
  let missingCentroids = 0;
  let missingRings = 0;
  let invalidBBoxes = 0;
  let centroidNotInBBox = 0;
  let coordOutsideSSI = 0;
  let zeroArea = 0;
  let suspiciouslyLargeArea = 0;

  const areaSqmValues = [];

  for (const p of parcels) {
    // Centroid
    if (!p.centroid || !Array.isArray(p.centroid) || p.centroid.length !== 2) {
      missingCentroids++;
    } else {
      const [lon, lat] = p.centroid;
      if (!coordInSSI(lon, lat)) {
        coordOutsideSSI++;
      }
    }

    // Rings
    if (!p.rings || !Array.isArray(p.rings) || p.rings.length === 0) {
      missingRings++;
    }

    // BBox
    if (!bboxValid(p.bbox)) {
      invalidBBoxes++;
    } else if (p.centroid && !centroidInBBox(p.centroid, p.bbox)) {
      centroidNotInBBox++;
    }

    // Area
    if (p.area_sqm !== null && p.area_sqm !== undefined) {
      areaSqmValues.push(p.area_sqm);
      if (p.area_sqm === 0) {
        zeroArea++;
      }
      if (p.area_sqm > 1000000) { // > 1 sq km
        suspiciouslyLargeArea++;
      }
    }
  }

  console.log(`\nGeometry Checks:`);
  if (missingCentroids > 0) {
    console.warn(`⚠ Missing centroids: ${missingCentroids}`);
  } else {
    console.log(`✓ All parcels have centroids`);
  }

  if (missingRings > 0) {
    console.warn(`⚠ Missing rings: ${missingRings}`);
  } else {
    console.log(`✓ All parcels have rings`);
  }

  if (invalidBBoxes > 0) {
    console.warn(`⚠ Invalid bboxes: ${invalidBBoxes}`);
  } else {
    console.log(`✓ All bboxes valid (min < max)`);
  }

  if (centroidNotInBBox > 0) {
    console.warn(`⚠ Centroids outside bbox: ${centroidNotInBBox}`);
  } else {
    console.log(`✓ All centroids within their bboxes`);
  }

  if (coordOutsideSSI > 0) {
    console.warn(`⚠ Coordinates outside SSI bounds: ${coordOutsideSSI}`);
  } else {
    console.log(`✓ All coordinates within SSI geographic bounds`);
  }

  // ─── Area Statistics ────────────────────────────────────────────
  console.log(`\nArea Statistics (area_sqm):`);
  if (areaSqmValues.length > 0) {
    const minArea = Math.min(...areaSqmValues);
    const maxArea = Math.max(...areaSqmValues);
    const avgArea = areaSqmValues.reduce((a, b) => a + b, 0) / areaSqmValues.length;
    const medianArea = areaSqmValues.sort((a, b) => a - b)[Math.floor(areaSqmValues.length / 2)];

    console.log(`  Min: ${minArea.toFixed(0)} sqm (${(minArea / 4047).toFixed(2)} acres)`);
    console.log(`  Max: ${maxArea.toFixed(0)} sqm (${(maxArea / 4047).toFixed(2)} acres)`);
    console.log(`  Avg: ${avgArea.toFixed(0)} sqm (${(avgArea / 4047).toFixed(2)} acres)`);
    console.log(`  Median: ${medianArea.toFixed(0)} sqm (${(medianArea / 4047).toFixed(2)} acres)`);

    if (zeroArea > 0) {
      console.warn(`⚠ Parcels with zero area: ${zeroArea}`);
    }
    if (suspiciouslyLargeArea > 0) {
      console.warn(`⚠ Parcels > 1 sq km: ${suspiciouslyLargeArea}`);
    }
  } else {
    console.log(`  No area data found`);
  }
}

function validateZones(data) {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║                   ZONES VALIDATION                           ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  if (!data || !data.zones || !Array.isArray(data.zones)) {
    console.error('ERROR: Invalid zones structure');
    return;
  }

  const zones = data.zones;
  const count = data.count;

  console.log(`Total zones reported: ${count}`);
  console.log(`Actual zones in array: ${zones.length}`);
  if (count !== zones.length) {
    console.warn(`⚠ MISMATCH: count=${count} but array.length=${zones.length}`);
  }

  // ─── Zone Codes ──────────────────────────────────────────────────
  const zoneCodes = new Set();
  let nullCodes = 0;
  let unmappedCodes = [];

  for (const z of zones) {
    if (!z.code || z.code.trim() === '') {
      nullCodes++;
    } else {
      zoneCodes.add(z.code);
      if (!ZONE_MAP[z.code]) {
        unmappedCodes.push(z.code);
      }
    }
  }

  console.log(`\nUnique zone codes: ${zoneCodes.size}`);
  if (nullCodes > 0) {
    console.warn(`⚠ NULL/empty zone codes: ${nullCodes}`);
  }

  const uniqueUnmapped = [...new Set(unmappedCodes)];
  if (uniqueUnmapped.length > 0) {
    console.warn(`⚠ Zone codes NOT in ZONE_MAP (${uniqueUnmapped.length}):`);
    uniqueUnmapped.slice(0, 20).forEach(code => console.log(`    ${code}`));
    if (uniqueUnmapped.length > 20) {
      console.log(`    ... and ${uniqueUnmapped.length - 20} more`);
    }
  } else {
    console.log(`✓ All zone codes match ZONE_MAP`);
  }

  // ─── Ring Geometry ──────────────────────────────────────────────
  let insufficientRings = 0;
  let invalidBBoxes = 0;

  for (const z of zones) {
    if (!z.rings || !Array.isArray(z.rings) || z.rings.length === 0 ||
        !z.rings[0] || z.rings[0].length < 3) {
      insufficientRings++;
    }
    if (!bboxValid(z.bbox)) {
      invalidBBoxes++;
    }
  }

  console.log(`\nGeometry Checks:`);
  if (insufficientRings > 0) {
    console.warn(`⚠ Zones with fewer than 3 points in outer ring: ${insufficientRings}`);
  } else {
    console.log(`✓ All zones have valid ring geometry (≥3 points)`);
  }

  if (invalidBBoxes > 0) {
    console.warn(`⚠ Invalid bboxes: ${invalidBBoxes}`);
  } else {
    console.log(`✓ All bboxes valid`);
  }

  console.log(`\nZone Code Distribution:`);
  const codeCounts = {};
  for (const code of zoneCodes) {
    codeCounts[code] = zones.filter(z => z.code === code).length;
  }
  const sortedCodes = Object.entries(codeCounts).sort((a, b) => b[1] - a[1]);
  sortedCodes.slice(0, 15).forEach(([code, cnt]) => {
    const inMap = ZONE_MAP[code] ? '✓' : '✗';
    console.log(`  ${inMap} ${code}: ${cnt}`);
  });
  if (sortedCodes.length > 15) {
    console.log(`  ... and ${sortedCodes.length - 15} more`);
  }
}

function validateDPAs(data) {
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║                    DPAS VALIDATION                           ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  if (!data || !data.dpas || !Array.isArray(data.dpas)) {
    console.error('ERROR: Invalid dpas structure');
    return;
  }

  const dpas = data.dpas;
  const count = data.count;

  console.log(`Total DPAs reported: ${count}`);
  console.log(`Actual DPAs in array: ${dpas.length}`);
  if (count !== dpas.length) {
    console.warn(`⚠ MISMATCH: count=${count} but array.length=${dpas.length}`);
  }

  // ─── DPA Numbers ────────────────────────────────────────────────
  const dpaNumbers = new Set();
  let missingNum = 0;
  let missingDesc = 0;
  let missingRings = 0;
  let unmappedNumbers = [];

  for (const d of dpas) {
    if (d.num === undefined || d.num === null) {
      missingNum++;
    } else {
      dpaNumbers.add(d.num);
      if (!DPA_NAMES[d.num]) {
        unmappedNumbers.push(d.num);
      }
    }

    if (!d.desc || d.desc.trim() === '') {
      missingDesc++;
    }

    if (!d.rings || !Array.isArray(d.rings) || d.rings.length === 0) {
      missingRings++;
    }
  }

  console.log(`\nDPA Numbers Found: ${Array.from(dpaNumbers).sort((a, b) => a - b).join(', ')}`);
  if (missingNum > 0) {
    console.warn(`⚠ DPAs with missing num: ${missingNum}`);
  }
  if (missingDesc > 0) {
    console.warn(`⚠ DPAs with missing/empty desc: ${missingDesc}`);
  }
  if (missingRings > 0) {
    console.warn(`⚠ DPAs with missing rings: ${missingRings}`);
  }

  const uniqueUnmappedNums = [...new Set(unmappedNumbers)];
  if (uniqueUnmappedNums.length > 0) {
    console.warn(`⚠ DPA numbers NOT in DPA_NAMES map: ${uniqueUnmappedNums.join(', ')}`);
  } else {
    console.log(`✓ All DPA numbers (${Array.from(dpaNumbers).join(', ')}) are in DPA_NAMES`);
  }

  // ─── DPA Details ────────────────────────────────────────────────
  console.log(`\nDPA Distribution:`);
  for (const num of Array.from(dpaNumbers).sort((a, b) => a - b)) {
    const count = dpas.filter(d => d.num === num).length;
    const name = DPA_NAMES[num] || 'UNKNOWN';
    console.log(`  DPA ${num}: ${count} polygon(s) — ${name}`);
  }

  // ─── Geometry ────────────────────────────────────────────────────
  let invalidBBoxes = 0;
  for (const d of dpas) {
    if (!bboxValid(d.bbox)) {
      invalidBBoxes++;
    }
  }

  console.log(`\nGeometry Checks:`);
  if (invalidBBoxes > 0) {
    console.warn(`⚠ Invalid bboxes: ${invalidBBoxes}`);
  } else {
    console.log(`✓ All bboxes valid`);
  }
}

// ═══════════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════════

function main() {
  const dataDir = path.join(__dirname, '..', 'public', 'data');

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('  Salt Spring Island Bylaw Compliance Checker');
  console.log('  Dataset Validation Report');
  console.log('═══════════════════════════════════════════════════════════════\n');

  // Load datasets
  console.log('Loading datasets...\n');

  const parcelFile = path.join(dataDir, 'ssi-parcels.json');
  const zoneFile = path.join(dataDir, 'ssi-zones.json');
  const dpaFile = path.join(dataDir, 'ssi-dpas.json');

  const parcelsStat = fs.statSync(parcelFile);
  const zonesStat = fs.statSync(zoneFile);
  const dpasStat = fs.statSync(dpaFile);

  console.log(`ssi-parcels.json: ${formatBytes(parcelsStat.size)}`);
  console.log(`ssi-zones.json: ${formatBytes(zonesStat.size)}`);
  console.log(`ssi-dpas.json: ${formatBytes(dpasStat.size)}`);

  const parcelsData = loadJSON(parcelFile);
  const zonesData = loadJSON(zoneFile);
  const dpasData = loadJSON(dpaFile);

  if (!parcelsData || !zonesData || !dpasData) {
    console.error('\nFATAL: Could not load all datasets');
    process.exit(1);
  }

  // Validate each dataset
  validateParcels(parcelsData);
  validateZones(zonesData);
  validateDPAs(dpasData);

  // Summary
  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║                      VALIDATION COMPLETE                     ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  console.log(`Dataset Integrity Summary:`);
  console.log(`  Parcels: ${parcelsData.parcels.length} features`);
  console.log(`  Zones: ${zonesData.zones.length} features`);
  console.log(`  DPAs: ${dpasData.dpas.length} features`);
  console.log(`\nSSI Geographic Bounds Used:`);
  console.log(`  Longitude: ${SSI_BOUNDS.minLon} to ${SSI_BOUNDS.maxLon}`);
  console.log(`  Latitude: ${SSI_BOUNDS.minLat} to ${SSI_BOUNDS.maxLat}\n`);
}

main();
