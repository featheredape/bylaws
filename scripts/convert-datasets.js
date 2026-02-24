#!/usr/bin/env node
// ═══════════════════════════════════════════════════════════════════
// Convert authoritative datasets → static JSON for PID/Zone/DPA lookup
//
// Inputs:
//   datasets/PMBC_PARCEL_POLY_SV.geojson  (BC PMBC parcels)
//   datasets/extracted/SS_ZONING/doc.kml   (Islands Trust zoning)
//   datasets/extracted/SS_DPA/doc.kml      (Islands Trust DPAs)
//
// Outputs:
//   public/data/ssi-parcels.json   (PID → polygon lookup)
//   public/data/ssi-zones.json     (zoning polygons)
//   public/data/ssi-dpas.json      (DPA polygons)
// ═══════════════════════════════════════════════════════════════════

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const OUT = path.join(ROOT, "public", "data");

// ─── Polygon Simplification (Douglas-Peucker) ───────────────────

/** Perpendicular distance from point to line segment */
function perpDist(pt, lineStart, lineEnd) {
  const dx = lineEnd[0] - lineStart[0];
  const dy = lineEnd[1] - lineStart[1];
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) {
    const ex = pt[0] - lineStart[0], ey = pt[1] - lineStart[1];
    return Math.sqrt(ex * ex + ey * ey);
  }
  let t = ((pt[0] - lineStart[0]) * dx + (pt[1] - lineStart[1]) * dy) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const px = lineStart[0] + t * dx - pt[0];
  const py = lineStart[1] + t * dy - pt[1];
  return Math.sqrt(px * px + py * py);
}

/** Douglas-Peucker line simplification */
function simplify(ring, epsilon) {
  if (ring.length <= 4) return ring; // triangle is minimum polygon

  let maxDist = 0, maxIdx = 0;
  for (let i = 1; i < ring.length - 1; i++) {
    const d = perpDist(ring[i], ring[0], ring[ring.length - 1]);
    if (d > maxDist) { maxDist = d; maxIdx = i; }
  }

  if (maxDist > epsilon) {
    const left = simplify(ring.slice(0, maxIdx + 1), epsilon);
    const right = simplify(ring.slice(maxIdx), epsilon);
    return left.slice(0, -1).concat(right);
  }
  return [ring[0], ring[ring.length - 1]];
}

/** Simplify a ring, ensuring it stays a valid polygon (≥4 points including closure) */
function simplifyRing(ring, epsilon) {
  const result = simplify(ring, epsilon);
  // Ensure ring is closed
  if (result.length >= 2) {
    const first = result[0], last = result[result.length - 1];
    if (first[0] !== last[0] || first[1] !== last[1]) {
      result.push([...first]);
    }
  }
  return result.length >= 4 ? result : ring; // fallback to original if too simplified
}

// ─── Helpers ────────────────────────────────────────────────────

/** Parse KML HTML description table → { key: value } */
function parseKmlDescription(html) {
  const attrs = {};
  // Match <td>KEY</td>\n<td>VALUE</td> pairs
  const re = /<td>([\w_]+)<\/td>\s*\n?\s*<td>([^<]*)<\/td>/g;
  let m;
  while ((m = re.exec(html)) !== null) {
    attrs[m[1]] = m[2].replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
  }
  return attrs;
}

/** Parse KML coordinate string → [[lon, lat], ...] */
function parseKmlCoords(coordStr) {
  return coordStr
    .trim()
    .split(/\s+/)
    .map((s) => {
      const [lon, lat] = s.split(",").map(Number);
      return [lon, lat];
    })
    .filter(([lon, lat]) => !isNaN(lon) && !isNaN(lat));
}

/** Extract coordinates from a boundary element */
function extractBoundaryCoords(boundaryBlock) {
  const m = boundaryBlock.match(/<coordinates>\s*([\s\S]*?)\s*<\/coordinates>/);
  return m ? parseKmlCoords(m[1]) : [];
}

/**
 * Extract all Placemarks from a KML file.
 *
 * Each Placemark can contain one or more <Polygon> elements (inside <MultiGeometry>).
 * Each Polygon has one <outerBoundaryIs> and zero or more <innerBoundaryIs> (holes).
 *
 * Returns: [{ attrs, polygons: [{ outer: [[lon,lat],...], holes: [[[lon,lat],...], ...] }] }]
 */
function parseKmlPlacemarks(kmlPath) {
  const kml = fs.readFileSync(kmlPath, "utf8");
  const placemarks = [];

  const parts = kml.split(/<Placemark[\s>]/);
  for (let i = 1; i < parts.length; i++) {
    const block = parts[i].split("</Placemark>")[0];

    // Extract description (attributes)
    const descMatch = block.match(/<description><!\[CDATA\[([\s\S]*?)\]\]><\/description>/);
    const attrs = descMatch ? parseKmlDescription(descMatch[1]) : {};

    // Extract each <Polygon> with its outer boundary and holes
    const polygons = [];
    const polyParts = block.split(/<Polygon>/);
    for (let p = 1; p < polyParts.length; p++) {
      const polyBlock = polyParts[p].split("</Polygon>")[0];

      // Outer boundary
      const outerMatch = polyBlock.match(/<outerBoundaryIs>([\s\S]*?)<\/outerBoundaryIs>/);
      if (!outerMatch) continue;
      const outer = extractBoundaryCoords(outerMatch[1]);
      if (outer.length < 3) continue;

      // Inner boundaries (holes)
      const holes = [];
      const innerMatches = polyBlock.matchAll(/<innerBoundaryIs>([\s\S]*?)<\/innerBoundaryIs>/g);
      for (const im of innerMatches) {
        const hole = extractBoundaryCoords(im[1]);
        if (hole.length >= 3) holes.push(hole);
      }

      polygons.push({ outer, holes });
    }

    if (polygons.length > 0) {
      placemarks.push({ attrs, polygons });
    }
  }
  return placemarks;
}

/** Compute centroid of a polygon ring */
function centroid(ring) {
  let sumLon = 0, sumLat = 0;
  for (const [lon, lat] of ring) {
    sumLon += lon;
    sumLat += lat;
  }
  return [sumLon / ring.length, sumLat / ring.length];
}

/** Compute bounding box of rings */
function bbox(rings) {
  let minLon = Infinity, minLat = Infinity, maxLon = -Infinity, maxLat = -Infinity;
  for (const ring of rings) {
    for (const [lon, lat] of ring) {
      if (lon < minLon) minLon = lon;
      if (lat < minLat) minLat = lat;
      if (lon > maxLon) maxLon = lon;
      if (lat > maxLat) maxLat = lat;
    }
  }
  return [minLon, minLat, maxLon, maxLat];
}

// ═══════════════════════════════════════════════════════════════════
// 1. Convert Parcels (PMBC GeoJSON + Islands Trust SS_CAD KML)
//
// PMBC has 2,411 parcels with rich metadata (plan, owner, area).
// SS_CAD has 6,637 parcels (PID + geometry only) — fills the gaps.
// We merge both: PMBC is primary, SS_CAD fills in missing PIDs.
// ═══════════════════════════════════════════════════════════════════

function convertParcels() {
  console.log("\n=== Converting Parcels (PMBC + Islands Trust CAD) ===");

  const PARCEL_EPSILON = 0.000005; // ~0.5m simplification
  const parcelMap = new Map(); // pid_digits → parcel object

  // ── Pass 1: PMBC GeoJSON (primary — has metadata) ─────────────
  const geojson = JSON.parse(
    fs.readFileSync(path.join(ROOT, "datasets", "PMBC_PARCEL_POLY_SV.geojson"), "utf8")
  );

  for (const feat of geojson.features) {
    const p = feat.properties;
    const pid = p.PID_FORMATTED || p.PID;
    if (!pid) continue;
    const pidDigits = pid.replace(/\D/g, "");
    if (pidDigits.length !== 9) continue;

    const rings = [];
    if (feat.geometry.type === "MultiPolygon") {
      for (const poly of feat.geometry.coordinates) rings.push(poly[0]);
    } else if (feat.geometry.type === "Polygon") {
      rings.push(feat.geometry.coordinates[0]);
    }
    if (rings.length === 0) continue;

    const [cx, cy] = centroid(rings[0]);
    const simplifiedRings = rings.map((r) =>
      simplifyRing(r, PARCEL_EPSILON).map(([lon, lat]) => [Math.round(lon * 1e6) / 1e6, Math.round(lat * 1e6) / 1e6])
    );

    parcelMap.set(pidDigits, {
      pid: pidDigits,
      pid_formatted: `${pidDigits.slice(0,3)}-${pidDigits.slice(3,6)}-${pidDigits.slice(6,9)}`,
      plan: p.PLAN_NUMBER || null,
      owner: p.OWNER_TYPE || null,
      area_sqm: p.FEATURE_AREA_SQM ? Math.round(p.FEATURE_AREA_SQM * 100) / 100 : null,
      centroid: [Math.round(cx * 1e6) / 1e6, Math.round(cy * 1e6) / 1e6],
      bbox: bbox(rings).map((v) => Math.round(v * 1e6) / 1e6),
      rings: simplifiedRings,
    });
  }
  const pmbcCount = parcelMap.size;
  console.log(`  PMBC: ${pmbcCount} parcels`);

  // ── Pass 2: Islands Trust SS_CAD KML (fills gaps) ─────────────
  const cadPath = path.join(ROOT, "datasets", "extracted", "SS_CAD", "doc.kml");
  const cadPlacemarks = parseKmlPlacemarks(cadPath);
  let cadAdded = 0;

  for (const pm of cadPlacemarks) {
    const rawPid = pm.attrs.PID || "";
    const pidDigits = rawPid.replace(/\D/g, "");
    if (pidDigits.length !== 9) continue;

    // Skip if already in PMBC data
    if (parcelMap.has(pidDigits)) continue;

    // CAD parcels are simple (no holes) — just use outer rings
    const outerRings = pm.polygons.map((p) => p.outer);
    if (outerRings.length === 0) continue;

    const [cx, cy] = centroid(outerRings[0]);
    const simplifiedRings = outerRings.map((r) =>
      simplifyRing(r, PARCEL_EPSILON).map(([lon, lat]) => [Math.round(lon * 1e6) / 1e6, Math.round(lat * 1e6) / 1e6])
    );

    parcelMap.set(pidDigits, {
      pid: pidDigits,
      pid_formatted: `${pidDigits.slice(0,3)}-${pidDigits.slice(3,6)}-${pidDigits.slice(6,9)}`,
      plan: null,
      owner: null,
      area_sqm: null,
      centroid: [Math.round(cx * 1e6) / 1e6, Math.round(cy * 1e6) / 1e6],
      bbox: bbox(outerRings).map((v) => Math.round(v * 1e6) / 1e6),
      rings: simplifiedRings,
    });
    cadAdded++;
  }
  console.log(`  SS_CAD: ${cadAdded} additional parcels (not in PMBC)`);

  // Sort by PID for binary search
  const parcels = [...parcelMap.values()].sort((a, b) => a.pid.localeCompare(b.pid));

  const out = { count: parcels.length, generated: new Date().toISOString(), parcels };
  const outPath = path.join(OUT, "ssi-parcels.json");
  fs.writeFileSync(outPath, JSON.stringify(out));
  const sizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
  console.log(`  → ${parcels.length} total parcels → ${outPath} (${sizeMB} MB)`);
  return parcels.length;
}

// ═══════════════════════════════════════════════════════════════════
// 2. Convert Islands Trust Zoning (KML → JSON)
// ═══════════════════════════════════════════════════════════════════

function convertZoning() {
  console.log("\n=== Converting Islands Trust Zoning ===");
  const kmlPath = path.join(ROOT, "datasets", "extracted", "SS_ZONING", "doc.kml");
  const placemarks = parseKmlPlacemarks(kmlPath);

  const zones = [];
  const codeSet = new Set();

  const ZONE_EPSILON = 0.00002; // ~2m, fine for zone lookup

  for (const pm of placemarks) {
    const code = pm.attrs.ZONE_CODE || "";
    const desc = pm.attrs.ZONE_DESC || "";
    const area = pm.attrs.ZONING_ARE || "";

    // Only include Salt Spring Island zones
    if (area && !area.includes("Salt Spring")) continue;

    // Each placemark may have multiple polygons, each with outer + holes
    for (const poly of pm.polygons) {
      const allRings = [poly.outer, ...poly.holes];
      codeSet.add(code);
      zones.push({
        code,
        desc,
        bbox: bbox([poly.outer]).map((v) => Math.round(v * 1e6) / 1e6),
        rings: allRings.map((r) =>
          simplifyRing(r, ZONE_EPSILON).map(([lon, lat]) => [Math.round(lon * 1e6) / 1e6, Math.round(lat * 1e6) / 1e6])
        ),
      });
    }
  }

  const out = {
    count: zones.length,
    unique_codes: codeSet.size,
    generated: new Date().toISOString(),
    zones,
  };
  const outPath = path.join(OUT, "ssi-zones.json");
  fs.writeFileSync(outPath, JSON.stringify(out));
  const sizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
  console.log(`  → ${zones.length} zone polygons (${codeSet.size} unique codes) → ${outPath} (${sizeMB} MB)`);
  return zones.length;
}

// ═══════════════════════════════════════════════════════════════════
// 3. Convert Islands Trust DPAs (KML → JSON)
// ═══════════════════════════════════════════════════════════════════

function convertDPAs() {
  console.log("\n=== Converting Islands Trust DPAs ===");
  const kmlPath = path.join(ROOT, "datasets", "extracted", "SS_DPA", "doc.kml");
  const placemarks = parseKmlPlacemarks(kmlPath);

  const dpas = [];
  const dpaStats = {};

  const DPA_EPSILON = 0.00005; // ~5m, appropriate for DPA boundaries

  for (const pm of placemarks) {
    const num = parseInt(pm.attrs.DPA_NUM, 10);
    const desc = pm.attrs.DPA_DESC || "";
    const bylaw = pm.attrs.BYLAW || "";

    if (isNaN(num)) continue;

    dpaStats[num] = (dpaStats[num] || 0) + 1;

    // Each placemark may have multiple polygons, each with outer + holes
    // We emit one entry per placemark (not per sub-polygon) to keep DPA count correct.
    // rings[0] = outer of first polygon, then holes of first, then outer of second, etc.
    // The PIP function will use even-odd across all rings.
    const allRings = [];
    for (const poly of pm.polygons) {
      allRings.push(poly.outer);
      for (const hole of poly.holes) {
        allRings.push(hole);
      }
    }

    dpas.push({
      num,
      desc,
      bylaw,
      bbox: bbox([allRings[0]]).map((v) => Math.round(v * 1e6) / 1e6),
      rings: allRings.map((r) =>
        simplifyRing(r, DPA_EPSILON).map(([lon, lat]) => [Math.round(lon * 1e6) / 1e6, Math.round(lat * 1e6) / 1e6])
      ),
    });
  }

  const out = {
    count: dpas.length,
    stats: dpaStats,
    generated: new Date().toISOString(),
    dpas,
  };
  const outPath = path.join(OUT, "ssi-dpas.json");
  fs.writeFileSync(outPath, JSON.stringify(out));
  const sizeMB = (fs.statSync(outPath).size / 1024 / 1024).toFixed(2);
  console.log(`  → ${dpas.length} DPA polygons → ${outPath} (${sizeMB} MB)`);
  console.log(`  DPA breakdown:`, dpaStats);
  return dpas.length;
}

// ═══════════════════════════════════════════════════════════════════
// Main
// ═══════════════════════════════════════════════════════════════════

fs.mkdirSync(OUT, { recursive: true });

const nParcels = convertParcels();
const nZones = convertZoning();
const nDPAs = convertDPAs();

console.log("\n=== Summary ===");
console.log(`  Parcels: ${nParcels}`);
console.log(`  Zones:   ${nZones}`);
console.log(`  DPAs:    ${nDPAs}`);
console.log(`  Output:  ${OUT}/`);
console.log("\nDone!");
