// ═══════════════════════════════════════════════════════════════════
// Pure geographic and lookup functions for Salt Spring Island bylaw checker
// ═══════════════════════════════════════════════════════════════════

// ─── Types ──────────────────────────────────────────────────────

export interface Parcel {
  pid: string;
  pid_formatted: string;
  plan: string | null;
  owner: string | null;
  area_sqm: number | null;
  centroid: [number, number]; // [lon, lat]
  bbox: [number, number, number, number]; // [minLon, minLat, maxLon, maxLat]
  rings: number[][][]; // outer boundary rings
}

export interface ZonePolygon {
  code: string;
  desc: string;
  bbox: [number, number, number, number];
  rings: number[][][];
}

export interface DPAPolygon {
  num: number;
  desc: string;
  bylaw: string;
  bbox: [number, number, number, number];
  rings: number[][][];
}

export interface DPAResult {
  name: string;
  number: number;
  description: string;
  bylaw: string;
  source: "authoritative"; // Always from Islands Trust dataset
}

export interface NeighbouringDPA extends DPAResult {
  neighbouring_pids: string[]; // formatted PIDs of neighbours that triggered this DPA
}

export interface AdjacentParcelInfo {
  pid: string;
  pid_formatted: string;
  zone: ZoneInfo | null;
  dpas: DPAResult[];
}

export interface ZoneInfo {
  lub_code: string;
  lub_name: string;
  category: "residential" | "rural" | "agricultural" | "commercial" | "accommodation"
    | "forestry" | "employment" | "parks" | "shoreline" | "watershed" | "upland"
    | "comprehensive" | "community" | "other";
  is_village: boolean;
}

// ─── Zone code → LUB 355 zone info mapping ─────────────────────

export const ZONE_MAP: Record<string, ZoneInfo> = {
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
  "CA3":  { lub_code: "CA3", lub_name: "Commercial Accommodation 3",  category: "accommodation", is_village: false },
  "CA4":  { lub_code: "CA4", lub_name: "Commercial Accommodation 4",  category: "accommodation", is_village: false },
  "CA5":  { lub_code: "CA5", lub_name: "Commercial Accommodation 5",  category: "accommodation", is_village: false },
  // Forestry
  "F1":   { lub_code: "F1",  lub_name: "Forestry 1",  category: "forestry", is_village: false },
  "F2":   { lub_code: "F2",  lub_name: "Forestry 2",  category: "forestry", is_village: false },
  // Comprehensive Development
  "CD1":  { lub_code: "CD1", lub_name: "Comprehensive Development 1",  category: "comprehensive", is_village: false },
  "CD2":  { lub_code: "CD2", lub_name: "Comprehensive Development 2",  category: "comprehensive", is_village: false },
  "CD3":  { lub_code: "CD3", lub_name: "Comprehensive Development 3",  category: "comprehensive", is_village: false },
  // Community Facility
  "CF1":  { lub_code: "CF1", lub_name: "Community Facility 1",  category: "community", is_village: false },
  "CF2":  { lub_code: "CF2", lub_name: "Community Facility 2",  category: "community", is_village: false },
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
  "RU2":  { lub_code: "RU2", lub_name: "Rural Uplands 2",  category: "upland", is_village: false },
  "RU3":  { lub_code: "RU3", lub_name: "Rural Uplands 3",  category: "upland", is_village: false },
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

// ─── DPA name mapping ───────────────────────────────────────────

export const DPA_NAMES: Record<number, string> = {
  1: "DPA 1 — Island Villages",
  2: "DPA 2 — Non-Village Commercial & General Employment",
  3: "DPA 3 — Shoreline",
  4: "DPA 4 — Lakes, Streams & Wetlands",
  5: "DPA 5 — Community Well Capture Zones",
  6: "DPA 6 — Unstable Slopes & Soil Erosion",
  7: "DPA 7 — Riparian Areas",
};

// ─── PID normalization ──────────────────────────────────────────

export function normalizePID(raw: string): { dashed: string; digits: string } | null {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 9) return null;
  return {
    dashed: `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 9)}`,
    digits,
  };
}

// ─── Ray-casting point-in-polygon (even-odd rule with holes) ────
//
// rings[0] is the outer boundary; rings[1..n] are holes (inner rings).
// A point is "inside" if the total crossing count across ALL rings is odd.
// This correctly handles polygons with holes (e.g., foreshore DPA wraps
// around the island with holes cut for land mass).

export function pointInPolygonRing(lon: number, lat: number, ring: number[][]): boolean {
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

export function pointInPolygon(lon: number, lat: number, rings: number[][][]): boolean {
  if (!rings[0] || rings[0].length < 3) return false;

  // Even-odd rule: toggle for each ring the point is inside
  let inside = false;
  for (const ring of rings) {
    if (pointInPolygonRing(lon, lat, ring)) {
      inside = !inside;
    }
  }
  return inside;
}

// ─── Area calculation ───────────────────────────────────────────
//
// Compute area of a ring using the shoelace formula, converted to m².
// For Salt Spring Island (~48.83°N), uses cosine correction to account for
// longitude convergence. Formula:
//   Area (degrees²) = 0.5 * sum of (lon[i] * lat[i+1] - lon[i+1] * lat[i])
//   Area (m²) = degrees² * (111320 m/degree)² * cos(latitude)

const METERS_PER_DEGREE = 111320; // Approximate meters per degree at equator
const LAT_SSI = 48.83; // Salt Spring Island latitude (degrees)
const LAT_RAD_SSI = LAT_SSI * Math.PI / 180;
const COS_LAT_SSI = Math.cos(LAT_RAD_SSI); // Cosine correction for longitude
const M2_PER_DEG2 = METERS_PER_DEGREE * METERS_PER_DEGREE * COS_LAT_SSI;

export function computeRingAreaM2(ring: number[][]): number {
  if (!ring || ring.length < 3) return 0;

  // Shoelace formula: A = 0.5 * |sum(x[i]*y[i+1] - x[i+1]*y[i])|
  let sum = 0;
  for (let i = 0; i < ring.length - 1; i++) {
    sum += ring[i][0] * ring[i + 1][1] - ring[i + 1][0] * ring[i][1];
  }
  // Close the ring
  sum += ring[ring.length - 1][0] * ring[0][1] - ring[0][0] * ring[ring.length - 1][1];

  const areaDegrees2 = Math.abs(sum) / 2;
  const areaM2 = areaDegrees2 * M2_PER_DEG2;

  return areaM2;
}

// ─── Sliver polygon filtering ───────────────────────────────────────────
//
// Remove degenerate polygons (GIS artifacts with near-zero area).
// Threshold: 100 m² — catches all identified slivers but avoids legitimate small features.

const SLIVER_AREA_THRESHOLD_M2 = 100;

export function filterSliverZones(zones: ZonePolygon[]): { filtered: ZonePolygon[]; count: number } {
  const filtered: ZonePolygon[] = [];
  let sliverCount = 0;

  for (const zone of zones) {
    if (zone.rings[0]) {
      const areaM2 = computeRingAreaM2(zone.rings[0]);
      if (areaM2 >= SLIVER_AREA_THRESHOLD_M2) {
        filtered.push(zone);
      } else {
        sliverCount++;
      }
    } else {
      filtered.push(zone); // Fallback for zones without rings
    }
  }

  return { filtered, count: sliverCount };
}

export function filterSliverDPAs(dpas: DPAPolygon[]): { filtered: DPAPolygon[]; count: number } {
  const filtered: DPAPolygon[] = [];
  let sliverCount = 0;

  for (const dpa of dpas) {
    if (dpa.rings[0]) {
      const areaM2 = computeRingAreaM2(dpa.rings[0]);
      if (areaM2 >= SLIVER_AREA_THRESHOLD_M2) {
        filtered.push(dpa);
      } else {
        sliverCount++;
      }
    } else {
      filtered.push(dpa); // Fallback for DPAs without rings
    }
  }

  return { filtered, count: sliverCount };
}

// ─── Bounding box utilities ──────────────────────────────────────

/** Check if a point is inside a polygon's bounding box (fast pre-filter) */
export function inBBox(lon: number, lat: number, bbox: number[]): boolean {
  return lon >= bbox[0] && lat >= bbox[1] && lon <= bbox[2] && lat <= bbox[3];
}

/** Check if two bounding boxes overlap (for parcel-polygon intersection) */
export function bboxOverlap(a: number[], b: number[]): boolean {
  return a[0] <= b[2] && a[2] >= b[0] && a[1] <= b[3] && a[3] >= b[1];
}

// ─── Core lookup functions ──────────────────────────────────────

/** Find a parcel by PID (binary search — parcels are sorted) */
export function findParcel(parcels: Parcel[], pidDigits: string): Parcel | null {
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

/** Look up zone info — try exact match, then base code (strip variant suffix) */
export function lookupZoneInfo(code: string): ZoneInfo | null {
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

/** Find zone at a point — uses bbox pre-filter for speed */
export function findZone(lon: number, lat: number, zones: ZonePolygon[]): ZonePolygon | null {
  for (const zone of zones) {
    if (inBBox(lon, lat, zone.bbox) && pointInPolygon(lon, lat, zone.rings)) {
      return zone;
    }
  }
  return null;
}

/** Find zone for a parcel — try centroid, then sample boundary points */
export function findZoneForParcel(parcel: Parcel, zones: ZonePolygon[]): ZonePolygon | null {
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
export function findDPAsForParcel(parcel: Parcel, dpas: DPAPolygon[]): DPAResult[] {
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

// ─── Adjacent parcel detection ──────────────────────────────────
//
// Find all parcels that share at least one vertex (within tolerance)
// with the target parcel. Uses a spatial hash on target vertices for
// efficient O(V_candidate) per candidate instead of O(V_target × V_candidate).

/** Tolerance for vertex matching (~0.5 m at SSI latitude) */
const VERTEX_TOLERANCE = 0.000005;

/** Bbox expansion buffer for candidate pre-filter (~11 m) */
const BBOX_BUFFER = 0.0001;

/**
 * Quantize a coordinate to a grid cell key for spatial hashing.
 * Cell size = 2 × tolerance so adjacent cells must also be checked.
 */
function vertexKey(lon: number, lat: number): string {
  const cellSize = VERTEX_TOLERANCE * 2;
  const gx = Math.floor(lon / cellSize);
  const gy = Math.floor(lat / cellSize);
  return `${gx},${gy}`;
}

/**
 * Build a spatial hash set from all vertices of a parcel's rings.
 * Each vertex is inserted into its grid cell.
 */
function buildVertexHash(parcel: Parcel): Set<string> {
  const hash = new Set<string>();
  for (const ring of parcel.rings) {
    for (const [lon, lat] of ring) {
      hash.add(vertexKey(lon, lat));
    }
  }
  return hash;
}

/**
 * Check if any vertex of a candidate parcel is near any vertex of the
 * target (represented by its spatial hash). Checks the candidate vertex's
 * cell plus all 8 neighbouring cells to handle boundary cases.
 */
function sharesVertex(candidateRings: number[][][], targetHash: Set<string>): boolean {
  const cellSize = VERTEX_TOLERANCE * 2;
  for (const ring of candidateRings) {
    for (const [lon, lat] of ring) {
      const gx = Math.floor(lon / cellSize);
      const gy = Math.floor(lat / cellSize);
      // Check 3×3 neighbourhood of grid cells
      for (let dx = -1; dx <= 1; dx++) {
        for (let dy = -1; dy <= 1; dy++) {
          if (targetHash.has(`${gx + dx},${gy + dy}`)) {
            return true;
          }
        }
      }
    }
  }
  return false;
}

/**
 * Expand a bbox by a buffer distance in all directions.
 */
function expandBBox(bbox: [number, number, number, number], buffer: number): [number, number, number, number] {
  return [bbox[0] - buffer, bbox[1] - buffer, bbox[2] + buffer, bbox[3] + buffer];
}

/**
 * Find all parcels adjacent to the target (sharing at least one vertex).
 * Returns parcel info with zone and DPA lookups for each neighbour.
 */
export function findAdjacentParcels(
  target: Parcel,
  allParcels: Parcel[],
  zones: ZonePolygon[],
  dpas: DPAPolygon[],
): AdjacentParcelInfo[] {
  const expandedBBox = expandBBox(target.bbox, BBOX_BUFFER);
  const targetHash = buildVertexHash(target);
  const results: AdjacentParcelInfo[] = [];

  for (const candidate of allParcels) {
    // Skip self
    if (candidate.pid === target.pid) continue;

    // Fast bbox pre-filter
    if (!bboxOverlap(expandedBBox, candidate.bbox)) continue;

    // Vertex proximity test via spatial hash
    if (!sharesVertex(candidate.rings, targetHash)) continue;

    // Found an adjacent parcel — look up its zone and DPAs
    const zonePolygon = findZoneForParcel(candidate, zones);
    const zoneInfo = zonePolygon ? lookupZoneInfo(zonePolygon.code) : null;
    const parcelDPAs = findDPAsForParcel(candidate, dpas);

    results.push({
      pid: candidate.pid,
      pid_formatted: candidate.pid_formatted,
      zone: zoneInfo,
      dpas: parcelDPAs,
    });
  }

  return results;
}

/**
 * Aggregate DPAs from adjacent parcels, deduplicating against the target
 * parcel's own DPAs. Returns only DPAs that the target doesn't already have,
 * with the list of neighbouring PIDs that triggered each one.
 */
export function aggregateNeighbouringDPAs(
  ownDPAs: DPAResult[],
  adjacentParcels: AdjacentParcelInfo[],
): NeighbouringDPA[] {
  const ownDPANumbers = new Set(ownDPAs.map(d => d.number));

  // Collect DPAs from neighbours, grouped by DPA number
  const dpaMap = new Map<number, { dpa: DPAResult; pids: string[] }>();

  for (const neighbour of adjacentParcels) {
    for (const dpa of neighbour.dpas) {
      // Skip DPAs the target already has
      if (ownDPANumbers.has(dpa.number)) continue;

      const existing = dpaMap.get(dpa.number);
      if (existing) {
        existing.pids.push(neighbour.pid_formatted);
      } else {
        dpaMap.set(dpa.number, { dpa, pids: [neighbour.pid_formatted] });
      }
    }
  }

  // Convert to sorted array
  return [...dpaMap.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([, { dpa, pids }]) => ({
      ...dpa,
      neighbouring_pids: [...new Set(pids)], // deduplicate PIDs
    }));
}
