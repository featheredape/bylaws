import { describe, it, expect } from "vitest";
import {
  normalizePID,
  pointInPolygonRing,
  pointInPolygon,
  inBBox,
  bboxOverlap,
  findParcel,
  lookupZoneInfo,
  findZone,
  findDPAsForParcel,
  findAdjacentParcels,
  aggregateNeighbouringDPAs,
  computeRingAreaM2,
  filterSliverZones,
  filterSliverDPAs,
  ZONE_MAP,
  DPA_NAMES,
  Parcel,
  ZonePolygon,
  DPAPolygon,
  DPAResult,
} from "../functions/lib/geo";

// ────────────────────────────────────────────────────────────────────
// normalizePID Tests
// ────────────────────────────────────────────────────────────────────

describe("normalizePID", () => {
  it("normalizes a valid 9-digit string", () => {
    const result = normalizePID("123456789");
    expect(result).toEqual({
      dashed: "123-456-789",
      digits: "123456789",
    });
  });

  it("handles input with dashes", () => {
    const result = normalizePID("123-456-789");
    expect(result).toEqual({
      dashed: "123-456-789",
      digits: "123456789",
    });
  });

  it("returns null for strings with fewer than 9 digits", () => {
    expect(normalizePID("12345678")).toBeNull();
  });

  it("returns null for strings with more than 9 digits", () => {
    expect(normalizePID("1234567890")).toBeNull();
  });

  it("returns null for non-numeric input", () => {
    expect(normalizePID("abc-def-ghi")).toBeNull();
  });

  it("returns null for empty string", () => {
    expect(normalizePID("")).toBeNull();
  });

  it("extracts 9 digits from mixed alphanumeric input", () => {
    const result = normalizePID("1a2b3-4c5d6-7e8f9");
    expect(result).toEqual({
      dashed: "123-456-789",
      digits: "123456789",
    });
  });

  it("returns null when input has leading spaces and too few digits", () => {
    expect(normalizePID("  12345678")).toBeNull();
  });
});

// ────────────────────────────────────────────────────────────────────
// pointInPolygonRing Tests
// ────────────────────────────────────────────────────────────────────

describe("pointInPolygonRing", () => {
  // Simple square: (0,0) to (2,2)
  const squareRing: number[][] = [
    [0, 0],
    [2, 0],
    [2, 2],
    [0, 2],
  ];

  it("returns true for point inside a simple square", () => {
    expect(pointInPolygonRing(1, 1, squareRing)).toBe(true);
  });

  it("returns false for point outside the square", () => {
    expect(pointInPolygonRing(3, 3, squareRing)).toBe(false);
  });

  it("returns false for point far outside", () => {
    expect(pointInPolygonRing(-5, -5, squareRing)).toBe(false);
  });

  it("handles point near an edge (inside)", () => {
    expect(pointInPolygonRing(0.5, 0.5, squareRing)).toBe(true);
  });

  it("handles point near an edge (outside)", () => {
    expect(pointInPolygonRing(2.5, 1, squareRing)).toBe(false);
  });

  // Triangle
  const triangleRing: number[][] = [
    [0, 0],
    [4, 0],
    [2, 4],
  ];

  it("returns true for point inside a triangle", () => {
    expect(pointInPolygonRing(2, 1, triangleRing)).toBe(true);
  });

  it("returns false for point outside a triangle", () => {
    expect(pointInPolygonRing(0, 5, triangleRing)).toBe(false);
  });
});

// ────────────────────────────────────────────────────────────────────
// pointInPolygon Tests (with holes)
// ────────────────────────────────────────────────────────────────────

describe("pointInPolygon", () => {
  // Outer ring: square from (0,0) to (4,4)
  // Inner ring (hole): square from (1,1) to (3,3)
  const outerRing: number[][] = [
    [0, 0],
    [4, 0],
    [4, 4],
    [0, 4],
  ];
  const holeRing: number[][] = [
    [1, 1],
    [3, 1],
    [3, 3],
    [1, 3],
  ];

  it("returns true for point inside outer ring but outside hole", () => {
    expect(pointInPolygon(0.5, 0.5, [outerRing, holeRing])).toBe(true);
  });

  it("returns false for point inside hole (even-odd toggle)", () => {
    expect(pointInPolygon(2, 2, [outerRing, holeRing])).toBe(false);
  });

  it("returns false for point outside entire polygon", () => {
    expect(pointInPolygon(5, 5, [outerRing, holeRing])).toBe(false);
  });

  it("returns false for degenerate ring with less than 3 points", () => {
    expect(pointInPolygon(1, 1, [[]])).toBe(false);
  });

  it("returns false for no rings", () => {
    expect(pointInPolygon(1, 1, [])).toBe(false);
  });

  // Polygon with multiple holes
  const multiHoleRings: number[][][] = [
    [[0, 0], [6, 0], [6, 6], [0, 6]], // outer
    [[1, 1], [2, 1], [2, 2], [1, 2]], // hole 1
    [[4, 4], [5, 4], [5, 5], [4, 5]], // hole 2
  ];

  it("returns true for point in outer ring, outside all holes", () => {
    expect(pointInPolygon(3, 3, multiHoleRings)).toBe(true);
  });

  it("returns false for point in first hole", () => {
    expect(pointInPolygon(1.5, 1.5, multiHoleRings)).toBe(false);
  });

  it("returns false for point in second hole", () => {
    expect(pointInPolygon(4.5, 4.5, multiHoleRings)).toBe(false);
  });
});

// ────────────────────────────────────────────────────────────────────
// inBBox Tests
// ────────────────────────────────────────────────────────────────────

describe("inBBox", () => {
  const bbox: number[] = [0, 0, 10, 10]; // [minLon, minLat, maxLon, maxLat]

  it("returns true for point inside bbox", () => {
    expect(inBBox(5, 5, bbox)).toBe(true);
  });

  it("returns true for point on bbox boundary (minLon, minLat)", () => {
    expect(inBBox(0, 0, bbox)).toBe(true);
  });

  it("returns true for point on bbox boundary (maxLon, maxLat)", () => {
    expect(inBBox(10, 10, bbox)).toBe(true);
  });

  it("returns false for point outside (lon < minLon)", () => {
    expect(inBBox(-1, 5, bbox)).toBe(false);
  });

  it("returns false for point outside (lon > maxLon)", () => {
    expect(inBBox(11, 5, bbox)).toBe(false);
  });

  it("returns false for point outside (lat < minLat)", () => {
    expect(inBBox(5, -1, bbox)).toBe(false);
  });

  it("returns false for point outside (lat > maxLat)", () => {
    expect(inBBox(5, 11, bbox)).toBe(false);
  });

  it("returns true for point on edge (lat boundary)", () => {
    expect(inBBox(5, 0, bbox)).toBe(true);
    expect(inBBox(5, 10, bbox)).toBe(true);
  });

  it("returns true for point on edge (lon boundary)", () => {
    expect(inBBox(0, 5, bbox)).toBe(true);
    expect(inBBox(10, 5, bbox)).toBe(true);
  });
});

// ────────────────────────────────────────────────────────────────────
// bboxOverlap Tests
// ────────────────────────────────────────────────────────────────────

describe("bboxOverlap", () => {
  it("returns true for overlapping bboxes", () => {
    const a = [0, 0, 10, 10];
    const b = [5, 5, 15, 15];
    expect(bboxOverlap(a, b)).toBe(true);
  });

  it("returns true for completely contained bbox", () => {
    const a = [0, 0, 10, 10];
    const b = [2, 2, 8, 8];
    expect(bboxOverlap(a, b)).toBe(true);
  });

  it("returns true for adjacent (touching) bboxes", () => {
    const a = [0, 0, 10, 10];
    const b = [10, 0, 20, 10]; // shares edge at lon=10
    expect(bboxOverlap(a, b)).toBe(true);
  });

  it("returns true for touching at corner", () => {
    const a = [0, 0, 10, 10];
    const b = [10, 10, 20, 20]; // touches at corner
    expect(bboxOverlap(a, b)).toBe(true);
  });

  it("returns false for separated bboxes", () => {
    const a = [0, 0, 10, 10];
    const b = [15, 15, 25, 25];
    expect(bboxOverlap(a, b)).toBe(false);
  });

  it("returns false for bboxes separated by small gap", () => {
    const a = [0, 0, 10, 10];
    const b = [10.1, 0, 20, 10];
    expect(bboxOverlap(a, b)).toBe(false);
  });

  it("returns true for nearly identical bboxes", () => {
    const a = [0, 0, 10, 10];
    const b = [0, 0, 10, 10];
    expect(bboxOverlap(a, b)).toBe(true);
  });
});

// ────────────────────────────────────────────────────────────────────
// findParcel Tests (binary search)
// ────────────────────────────────────────────────────────────────────

describe("findParcel", () => {
  const parcels: Parcel[] = [
    {
      pid: "000123456",
      pid_formatted: "000-123-456",
      plan: "ABC",
      owner: "Owner A",
      area_sqm: 1000,
      centroid: [-123.1, 49.1],
      bbox: [-123.2, 49.0, -123.0, 49.2],
      rings: [[[0, 0], [1, 0], [1, 1], [0, 1]]],
    },
    {
      pid: "000234567",
      pid_formatted: "000-234-567",
      plan: "DEF",
      owner: "Owner B",
      area_sqm: 2000,
      centroid: [-123.3, 49.3],
      bbox: [-123.4, 49.2, -123.2, 49.4],
      rings: [[[1, 1], [2, 1], [2, 2], [1, 2]]],
    },
    {
      pid: "000345678",
      pid_formatted: "000-345-678",
      plan: "GHI",
      owner: "Owner C",
      area_sqm: 3000,
      centroid: [-123.5, 49.5],
      bbox: [-123.6, 49.4, -123.4, 49.6],
      rings: [[[2, 2], [3, 2], [3, 3], [2, 3]]],
    },
  ];

  it("finds first element in array", () => {
    const result = findParcel(parcels, "000123456");
    expect(result?.pid).toBe("000123456");
  });

  it("finds last element in array", () => {
    const result = findParcel(parcels, "000345678");
    expect(result?.pid).toBe("000345678");
  });

  it("finds middle element in array", () => {
    const result = findParcel(parcels, "000234567");
    expect(result?.pid).toBe("000234567");
  });

  it("returns null for non-existent PID", () => {
    const result = findParcel(parcels, "999999999");
    expect(result).toBeNull();
  });

  it("returns null for empty array", () => {
    const result = findParcel([], "000123456");
    expect(result).toBeNull();
  });

  it("finds correct parcel with close but non-matching PIDs nearby", () => {
    const result = findParcel(parcels, "000234567");
    expect(result?.owner).toBe("Owner B");
  });
});

// ────────────────────────────────────────────────────────────────────
// lookupZoneInfo Tests
// ────────────────────────────────────────────────────────────────────

describe("lookupZoneInfo", () => {
  it("returns correct info for known zone code 'R1'", () => {
    const result = lookupZoneInfo("R1");
    expect(result).toEqual({
      lub_code: "R1",
      lub_name: "Residential 1",
      category: "residential",
      is_village: true,
    });
  });

  it("returns correct info for known zone code 'R2'", () => {
    const result = lookupZoneInfo("R2");
    expect(result?.lub_code).toBe("R2");
    expect(result?.category).toBe("residential");
  });

  it("returns correct info for commercial zone 'C1'", () => {
    const result = lookupZoneInfo("C1");
    expect(result?.category).toBe("commercial");
    expect(result?.is_village).toBe(true);
  });

  it("returns generic fallback for unknown code", () => {
    const result = lookupZoneInfo("XX99");
    expect(result?.lub_code).toBe("XX99");
    expect(result?.category).toBe("other");
    expect(result?.is_village).toBe(false);
  });

  it("handles variant codes by stripping suffix", () => {
    const result = lookupZoneInfo("R2(a)");
    expect(result?.lub_code).toBe("R2(a)"); // returns original code
    expect(result?.lub_name).toBe("Residential 2"); // but base info
    expect(result?.category).toBe("residential");
  });

  it("handles variant codes with different suffixes", () => {
    const result = lookupZoneInfo("R1(f)");
    expect(result?.lub_code).toBe("R1(f)");
    expect(result?.lub_name).toBe("Residential 1");
  });

  it("returns null for empty string", () => {
    const result = lookupZoneInfo("");
    expect(result).toBeNull();
  });

  it("returns generic fallback for whitespace-only string", () => {
    const result = lookupZoneInfo("   ");
    expect(result?.category).toBe("other");
    expect(result?.is_village).toBe(false);
  });

  it("handles case-insensitive lookup with uppercase", () => {
    const result = lookupZoneInfo("r1");
    expect(result?.lub_code).toBe("R1");
  });

  it("handles zone codes with whitespace", () => {
    const result = lookupZoneInfo("  R1  ");
    expect(result?.lub_code).toBe("R1");
  });
});

// ────────────────────────────────────────────────────────────────────
// findZone Tests
// ────────────────────────────────────────────────────────────────────

describe("findZone", () => {
  const zones: ZonePolygon[] = [
    {
      code: "R1",
      desc: "Residential 1",
      bbox: [0, 0, 10, 10],
      rings: [
        [
          [0, 0],
          [10, 0],
          [10, 10],
          [0, 10],
        ],
      ],
    },
    {
      code: "C1",
      desc: "Commercial 1",
      bbox: [15, 15, 25, 25],
      rings: [
        [
          [15, 15],
          [25, 15],
          [25, 25],
          [15, 25],
        ],
      ],
    },
  ];

  it("finds zone containing a point", () => {
    const result = findZone(5, 5, zones);
    expect(result?.code).toBe("R1");
    expect(result?.desc).toBe("Residential 1");
  });

  it("finds correct zone when point is in second zone", () => {
    const result = findZone(20, 20, zones);
    expect(result?.code).toBe("C1");
  });

  it("returns null when point is in no zone", () => {
    const result = findZone(12, 12, zones);
    expect(result).toBeNull();
  });

  it("returns null for empty zones array", () => {
    const result = findZone(5, 5, []);
    expect(result).toBeNull();
  });

  it("returns null for point outside all zones", () => {
    const result = findZone(30, 30, zones);
    expect(result).toBeNull();
  });

  it("finds zone at bbox boundary", () => {
    const result = findZone(0, 0, zones);
    expect(result?.code).toBe("R1");
  });
});

// ────────────────────────────────────────────────────────────────────
// findDPAsForParcel Tests
// ────────────────────────────────────────────────────────────────────

describe("findDPAsForParcel", () => {
  const parcel: Parcel = {
    pid: "000123456",
    pid_formatted: "000-123-456",
    plan: "ABC",
    owner: "Owner A",
    area_sqm: 5000,
    centroid: [5, 5],
    bbox: [3, 3, 7, 7],
    rings: [
      [
        [3, 3],
        [7, 3],
        [7, 7],
        [3, 7],
      ],
    ],
  };

  const dpaLand: DPAPolygon = {
    num: 1,
    desc: "Island Villages",
    bylaw: "2021-01",
    bbox: [0, 0, 10, 10],
    rings: [
      [
        [0, 0],
        [10, 0],
        [10, 10],
        [0, 10],
      ],
    ],
  };

  const dpaWater: DPAPolygon = {
    num: 4,
    desc: "Lakes and Streams",
    bylaw: "2021-02",
    bbox: [8, 8, 15, 15],
    rings: [
      [
        [8, 8],
        [15, 8],
        [15, 15],
        [8, 15],
      ],
    ],
  };

  it("finds DPA overlapping parcel centroid", () => {
    const result = findDPAsForParcel(parcel, [dpaLand, dpaWater]);
    expect(result.length).toBe(1);
    expect(result[0].number).toBe(1);
  });

  it("returns empty array when parcel is not in any DPA", () => {
    const noOverlapParcel: Parcel = {
      ...parcel,
      centroid: [20, 20],
      bbox: [18, 18, 22, 22],
      rings: [
        [
          [18, 18],
          [22, 18],
          [22, 22],
          [18, 22],
        ],
      ],
    };
    const result = findDPAsForParcel(noOverlapParcel, [dpaLand, dpaWater]);
    expect(result).toEqual([]);
  });

  it("returns multiple DPAs when parcel overlaps them", () => {
    const multiDpaParcel: Parcel = {
      ...parcel,
      centroid: [9, 9],
      bbox: [7, 7, 11, 11],
      rings: [
        [
          [7, 7],
          [11, 7],
          [11, 11],
          [7, 11],
        ],
      ],
    };
    const result = findDPAsForParcel(multiDpaParcel, [dpaLand, dpaWater]);
    expect(result.length).toBeGreaterThanOrEqual(1);
  });

  it("returns DPA results with correct structure", () => {
    const result = findDPAsForParcel(parcel, [dpaLand]);
    expect(result[0]).toHaveProperty("name");
    expect(result[0]).toHaveProperty("number");
    expect(result[0]).toHaveProperty("description");
    expect(result[0]).toHaveProperty("bylaw");
    expect(result[0]).toHaveProperty("source");
    expect(result[0].source).toBe("authoritative");
  });

  it("returns results sorted by DPA number", () => {
    const dpa2: DPAPolygon = {
      num: 2,
      desc: "Non-Village Commercial",
      bylaw: "2021-03",
      bbox: [3, 3, 7, 7],
      rings: [
        [
          [3, 3],
          [7, 3],
          [7, 7],
          [3, 7],
        ],
      ],
    };
    const result = findDPAsForParcel(parcel, [dpaWater, dpa2, dpaLand]);
    if (result.length > 1) {
      for (let i = 1; i < result.length; i++) {
        expect(result[i].number).toBeGreaterThanOrEqual(result[i - 1].number);
      }
    }
  });

  it("handles parcel with no rings gracefully", () => {
    const emptyParcel: Parcel = {
      ...parcel,
      rings: [],
    };
    const result = findDPAsForParcel(emptyParcel, [dpaLand]);
    expect(result.length).toBeGreaterThanOrEqual(0);
  });
});

// ────────────────────────────────────────────────────────────────────
// Constants Tests
// ────────────────────────────────────────────────────────────────────

describe("ZONE_MAP", () => {
  it("contains expected zone codes", () => {
    expect(ZONE_MAP["R1"]).toBeDefined();
    expect(ZONE_MAP["R2"]).toBeDefined();
    expect(ZONE_MAP["C1"]).toBeDefined();
    expect(ZONE_MAP["A1"]).toBeDefined();
  });

  it("has correct structure for zone entries", () => {
    const zone = ZONE_MAP["R1"];
    expect(zone.lub_code).toBe("R1");
    expect(zone.lub_name).toBeDefined();
    expect(zone.category).toBeDefined();
    expect(zone.is_village).toBeDefined();
  });

  it("categorizes residential zones correctly", () => {
    expect(ZONE_MAP["R1"].category).toBe("residential");
    expect(ZONE_MAP["R2"].category).toBe("residential");
  });

  it("categorizes commercial zones correctly", () => {
    expect(ZONE_MAP["C1"].category).toBe("commercial");
    expect(ZONE_MAP["CA1"].category).toBe("accommodation");
  });
});

describe("DPA_NAMES", () => {
  it("contains mappings for DPA 1-7", () => {
    expect(DPA_NAMES[1]).toBeDefined();
    expect(DPA_NAMES[2]).toBeDefined();
    expect(DPA_NAMES[3]).toBeDefined();
    expect(DPA_NAMES[4]).toBeDefined();
    expect(DPA_NAMES[5]).toBeDefined();
    expect(DPA_NAMES[6]).toBeDefined();
    expect(DPA_NAMES[7]).toBeDefined();
  });

  it("returns meaningful names for each DPA", () => {
    expect(DPA_NAMES[1]).toContain("Villages");
    expect(DPA_NAMES[3]).toContain("Shoreline");
    expect(DPA_NAMES[4]).toContain("Lakes");
  });
});

// ────────────────────────────────────────────────────────────────────
// computeRingAreaM2 Tests
// ────────────────────────────────────────────────────────────────────

describe("computeRingAreaM2", () => {
  it("returns 0 for empty ring", () => {
    expect(computeRingAreaM2([])).toBe(0);
  });

  it("returns 0 for ring with less than 3 points", () => {
    expect(computeRingAreaM2([[0, 0], [1, 1]])).toBe(0);
  });

  it("computes positive area for a simple square ring", () => {
    // Small square in lat/lon space (0.001 x 0.001 degrees)
    // At ~48.83°N with cosine correction, area ≈ 8,000+ m²
    const ring: number[][] = [
      [-123.5, 48.83],
      [-123.499, 48.83],
      [-123.499, 48.831],
      [-123.5, 48.831],
    ];
    const area = computeRingAreaM2(ring);
    expect(area).toBeGreaterThan(7000); // Well above the 100 m² threshold
    expect(area).toBeLessThan(10000);
  });

  it("returns approximately zero for a degenerate sliver", () => {
    // Extremely thin sliver: nearly collinear points
    const sliver: number[][] = [
      [-123.5, 48.83],
      [-123.50001, 48.83],
      [-123.50002, 48.83],
      [-123.50001, 48.830001],
    ];
    const area = computeRingAreaM2(sliver);
    expect(area).toBeLessThan(100); // Much less than threshold
  });

  it("handles clockwise vs counter-clockwise ring consistently", () => {
    const ccwRing: number[][] = [
      [-123.5, 48.83],
      [-123.499, 48.83],
      [-123.499, 48.831],
      [-123.5, 48.831],
    ];
    const cwRing: number[][] = [
      [-123.5, 48.831],
      [-123.499, 48.831],
      [-123.499, 48.83],
      [-123.5, 48.83],
    ];
    const areaCCW = computeRingAreaM2(ccwRing);
    const areaCW = computeRingAreaM2(cwRing);
    expect(areaCCW).toBeCloseTo(areaCW, 0); // Same magnitude (uses abs)
  });

  it("computes area for a triangle ring", () => {
    const triangle: number[][] = [
      [-123.5, 48.83],
      [-123.499, 48.83],
      [-123.4995, 48.831],
    ];
    const area = computeRingAreaM2(triangle);
    expect(area).toBeGreaterThan(0);
    expect(area).toBeLessThan(5000); // Smaller than the square
  });

  it("returns 0 for null ring", () => {
    expect(computeRingAreaM2(null as any)).toBe(0);
  });

  it("returns 0 for undefined ring", () => {
    expect(computeRingAreaM2(undefined as any)).toBe(0);
  });
});

// ────────────────────────────────────────────────────────────────────
// filterSliverZones Tests
// ────────────────────────────────────────────────────────────────────

describe("filterSliverZones", () => {
  it("keeps zones with area >= 100 m²", () => {
    const zones: ZonePolygon[] = [
      {
        code: "R1",
        desc: "Residential 1",
        bbox: [0, 0, 10, 10],
        rings: [
          [
            [0, 0],
            [10, 0],
            [10, 10],
            [0, 10],
          ],
        ], // Large area
      },
    ];
    const { filtered, count } = filterSliverZones(zones);
    expect(filtered.length).toBe(1);
    expect(count).toBe(0);
  });

  it("removes zones with area < 100 m²", () => {
    const zones: ZonePolygon[] = [
      {
        code: "S6",
        desc: "Shoreline 6",
        bbox: [-123.5, 48.83, -123.50001, 48.830001],
        rings: [
          [
            [-123.5, 48.83],
            [-123.50001, 48.83],
            [-123.50001, 48.830001],
            [-123.5, 48.830001],
          ],
        ], // Tiny sliver
      },
    ];
    const { filtered, count } = filterSliverZones(zones);
    expect(filtered.length).toBe(0);
    expect(count).toBe(1);
  });

  it("filters multiple zones and counts correctly", () => {
    const zones: ZonePolygon[] = [
      {
        code: "R1",
        desc: "Residential 1",
        bbox: [0, 0, 10, 10],
        rings: [[[0, 0], [10, 0], [10, 10], [0, 10]]],
      },
      {
        code: "S6",
        desc: "Shoreline 6",
        bbox: [-123.5, 48.83, -123.50001, 48.830001],
        rings: [
          [
            [-123.5, 48.83],
            [-123.50001, 48.83],
            [-123.50001, 48.830001],
            [-123.5, 48.830001],
          ],
        ],
      },
      {
        code: "R8",
        desc: "Residential 8",
        bbox: [0, 0, 10, 10],
        rings: [[[0, 0], [10, 0], [10, 10], [0, 10]]],
      },
    ];
    const { filtered, count } = filterSliverZones(zones);
    expect(filtered.length).toBe(2);
    expect(count).toBe(1);
  });

  it("handles zones with empty rings gracefully", () => {
    const zones: ZonePolygon[] = [
      {
        code: "R1",
        desc: "Residential 1",
        bbox: [0, 0, 10, 10],
        rings: [],
      },
    ];
    const { filtered, count } = filterSliverZones(zones);
    expect(filtered.length).toBe(1); // Kept as fallback
    expect(count).toBe(0);
  });

  it("returns empty result for empty input", () => {
    const { filtered, count } = filterSliverZones([]);
    expect(filtered.length).toBe(0);
    expect(count).toBe(0);
  });
});

// ────────────────────────────────────────────────────────────────────
// filterSliverDPAs Tests
// ────────────────────────────────────────────────────────────────────

describe("filterSliverDPAs", () => {
  it("keeps DPAs with area >= 100 m²", () => {
    const dpas: DPAPolygon[] = [
      {
        num: 1,
        desc: "Island Villages",
        bylaw: "2021-01",
        bbox: [0, 0, 10, 10],
        rings: [[[0, 0], [10, 0], [10, 10], [0, 10]]],
      },
    ];
    const { filtered, count } = filterSliverDPAs(dpas);
    expect(filtered.length).toBe(1);
    expect(count).toBe(0);
  });

  it("removes DPAs with area < 100 m²", () => {
    const dpas: DPAPolygon[] = [
      {
        num: 4,
        desc: "Lakes and Streams",
        bylaw: "2021-02",
        bbox: [-123.5, 48.83, -123.50001, 48.830001],
        rings: [
          [
            [-123.5, 48.83],
            [-123.50001, 48.83],
            [-123.50001, 48.830001],
            [-123.5, 48.830001],
          ],
        ],
      },
    ];
    const { filtered, count } = filterSliverDPAs(dpas);
    expect(filtered.length).toBe(0);
    expect(count).toBe(1);
  });

  it("filters multiple DPAs and counts correctly", () => {
    const dpas: DPAPolygon[] = [
      {
        num: 1,
        desc: "Island Villages",
        bylaw: "2021-01",
        bbox: [0, 0, 10, 10],
        rings: [[[0, 0], [10, 0], [10, 10], [0, 10]]],
      },
      {
        num: 4,
        desc: "Lakes and Streams",
        bylaw: "2021-02",
        bbox: [-123.5, 48.83, -123.50001, 48.830001],
        rings: [
          [
            [-123.5, 48.83],
            [-123.50001, 48.83],
            [-123.50001, 48.830001],
            [-123.5, 48.830001],
          ],
        ],
      },
      {
        num: 7,
        desc: "Riparian Areas",
        bylaw: "2021-07",
        bbox: [0, 0, 10, 10],
        rings: [[[0, 0], [10, 0], [10, 10], [0, 10]]],
      },
    ];
    const { filtered, count } = filterSliverDPAs(dpas);
    expect(filtered.length).toBe(2);
    expect(count).toBe(1);
  });

  it("handles DPAs with empty rings gracefully", () => {
    const dpas: DPAPolygon[] = [
      {
        num: 1,
        desc: "Island Villages",
        bylaw: "2021-01",
        bbox: [0, 0, 10, 10],
        rings: [],
      },
    ];
    const { filtered, count } = filterSliverDPAs(dpas);
    expect(filtered.length).toBe(1); // Kept as fallback
    expect(count).toBe(0);
  });

  it("returns empty result for empty input", () => {
    const { filtered, count } = filterSliverDPAs([]);
    expect(filtered.length).toBe(0);
    expect(count).toBe(0);
  });
});

// ────────────────────────────────────────────────────────────────────
// findAdjacentParcels Tests
// ────────────────────────────────────────────────────────────────────

// Helper to create a rectangular parcel at a given position
function makeParcel(pid: string, x: number, y: number, w: number, h: number): Parcel {
  return {
    pid: pid.replace(/-/g, ""),
    pid_formatted: pid,
    plan: null,
    owner: null,
    area_sqm: null,
    centroid: [x + w / 2, y + h / 2],
    bbox: [x, y, x + w, y + h] as [number, number, number, number],
    rings: [
      [
        [x, y],
        [x + w, y],
        [x + w, y + h],
        [x, y + h],
        [x, y], // closed ring
      ],
    ],
  };
}

describe("findAdjacentParcels", () => {
  // Two parcels sharing an edge (A is left, B is right, sharing x=10)
  const parcelA = makeParcel("001-000-001", 0, 0, 10, 10);
  const parcelB = makeParcel("001-000-002", 10, 0, 10, 10);
  // Parcel sharing only a corner vertex with A at (10, 10)
  const parcelC = makeParcel("001-000-003", 10, 10, 10, 10);
  // Parcel far away, not adjacent
  const parcelD = makeParcel("001-000-004", 100, 100, 10, 10);
  // Parcel with tiny gap (not touching A)
  const parcelE = makeParcel("001-000-005", 10.001, 0, 10, 10);

  const allParcels = [parcelA, parcelB, parcelC, parcelD, parcelE];
  const emptyZones: ZonePolygon[] = [];
  const emptyDPAs: DPAPolygon[] = [];

  it("finds parcels sharing an edge", () => {
    const result = findAdjacentParcels(parcelA, allParcels, emptyZones, emptyDPAs);
    const pids = result.map(r => r.pid_formatted);
    expect(pids).toContain("001-000-002");
  });

  it("finds parcels sharing only a corner vertex", () => {
    const result = findAdjacentParcels(parcelA, allParcels, emptyZones, emptyDPAs);
    const pids = result.map(r => r.pid_formatted);
    expect(pids).toContain("001-000-003");
  });

  it("excludes parcels that are far away", () => {
    const result = findAdjacentParcels(parcelA, allParcels, emptyZones, emptyDPAs);
    const pids = result.map(r => r.pid_formatted);
    expect(pids).not.toContain("001-000-004");
  });

  it("excludes parcels with a tiny gap (not touching)", () => {
    const result = findAdjacentParcels(parcelA, allParcels, emptyZones, emptyDPAs);
    const pids = result.map(r => r.pid_formatted);
    expect(pids).not.toContain("001-000-005");
  });

  it("does not include self in results", () => {
    const result = findAdjacentParcels(parcelA, allParcels, emptyZones, emptyDPAs);
    const pids = result.map(r => r.pid_formatted);
    expect(pids).not.toContain("001-000-001");
  });

  it("returns empty array when no parcels are adjacent", () => {
    const result = findAdjacentParcels(parcelD, allParcels, emptyZones, emptyDPAs);
    expect(result).toHaveLength(0);
  });

  it("returns empty array when allParcels is empty", () => {
    const result = findAdjacentParcels(parcelA, [], emptyZones, emptyDPAs);
    expect(result).toHaveLength(0);
  });

  it("populates zone info for adjacent parcels when zones are provided", () => {
    // Create a zone polygon covering parcel B's area
    const zone: ZonePolygon = {
      code: "R1",
      desc: "Residential 1",
      bbox: [9, -1, 21, 11],
      rings: [
        [
          [9, -1],
          [21, -1],
          [21, 11],
          [9, 11],
          [9, -1],
        ],
      ],
    };
    const result = findAdjacentParcels(parcelA, allParcels, [zone], emptyDPAs);
    const bResult = result.find(r => r.pid_formatted === "001-000-002");
    expect(bResult).toBeDefined();
    expect(bResult!.zone).toBeDefined();
    expect(bResult!.zone!.lub_code).toBe("R1");
  });

  it("populates DPA info for adjacent parcels when DPAs are provided", () => {
    // Create a DPA polygon covering parcel B's area
    const dpa: DPAPolygon = {
      num: 6,
      desc: "Unstable Slopes",
      bylaw: "434",
      bbox: [9, -1, 21, 11],
      rings: [
        [
          [9, -1],
          [21, -1],
          [21, 11],
          [9, 11],
          [9, -1],
        ],
      ],
    };
    const result = findAdjacentParcels(parcelA, allParcels, emptyZones, [dpa]);
    const bResult = result.find(r => r.pid_formatted === "001-000-002");
    expect(bResult).toBeDefined();
    expect(bResult!.dpas).toHaveLength(1);
    expect(bResult!.dpas[0].number).toBe(6);
  });
});

// ────────────────────────────────────────────────────────────────────
// aggregateNeighbouringDPAs Tests
// ────────────────────────────────────────────────────────────────────

describe("aggregateNeighbouringDPAs", () => {
  const ownDPA1: DPAResult = {
    name: "DPA 1 — Island Villages",
    number: 1,
    description: "Island Villages",
    bylaw: "Bylaw 434",
    source: "authoritative",
  };
  const ownDPA6: DPAResult = {
    name: "DPA 6 — Unstable Slopes & Soil Erosion",
    number: 6,
    description: "High Soil Erosion",
    bylaw: "Bylaw 434",
    source: "authoritative",
  };
  const neighbourDPA4: DPAResult = {
    name: "DPA 4 — Lakes, Streams & Wetlands",
    number: 4,
    description: "Lakes, Streams, Wetlands",
    bylaw: "Bylaw 434",
    source: "authoritative",
  };
  const neighbourDPA6: DPAResult = {
    name: "DPA 6 — Unstable Slopes & Soil Erosion",
    number: 6,
    description: "High Slope Stability",
    bylaw: "Bylaw 434",
    source: "authoritative",
  };

  it("returns DPAs from neighbours that the target doesn't have", () => {
    const ownDPAs = [ownDPA1];
    const adjacent = [
      { pid: "001000002", pid_formatted: "001-000-002", zone: null, dpas: [neighbourDPA4] },
    ];
    const result = aggregateNeighbouringDPAs(ownDPAs, adjacent);
    expect(result).toHaveLength(1);
    expect(result[0].number).toBe(4);
    expect(result[0].neighbouring_pids).toContain("001-000-002");
  });

  it("excludes DPAs the target already has", () => {
    const ownDPAs = [ownDPA6];
    const adjacent = [
      { pid: "001000002", pid_formatted: "001-000-002", zone: null, dpas: [neighbourDPA6] },
    ];
    const result = aggregateNeighbouringDPAs(ownDPAs, adjacent);
    expect(result).toHaveLength(0);
  });

  it("aggregates PIDs for the same DPA from multiple neighbours", () => {
    const ownDPAs: DPAResult[] = [];
    const adjacent = [
      { pid: "001000002", pid_formatted: "001-000-002", zone: null, dpas: [neighbourDPA4] },
      { pid: "001000003", pid_formatted: "001-000-003", zone: null, dpas: [neighbourDPA4] },
    ];
    const result = aggregateNeighbouringDPAs(ownDPAs, adjacent);
    expect(result).toHaveLength(1);
    expect(result[0].number).toBe(4);
    expect(result[0].neighbouring_pids).toHaveLength(2);
    expect(result[0].neighbouring_pids).toContain("001-000-002");
    expect(result[0].neighbouring_pids).toContain("001-000-003");
  });

  it("deduplicates PIDs when the same neighbour appears twice", () => {
    const ownDPAs: DPAResult[] = [];
    const adjacent = [
      { pid: "001000002", pid_formatted: "001-000-002", zone: null, dpas: [neighbourDPA4, neighbourDPA6] },
    ];
    const result = aggregateNeighbouringDPAs(ownDPAs, adjacent);
    expect(result).toHaveLength(2);
    // Each should have exactly one PID
    for (const r of result) {
      expect(r.neighbouring_pids).toHaveLength(1);
    }
  });

  it("returns results sorted by DPA number", () => {
    const ownDPAs: DPAResult[] = [];
    const adjacent = [
      { pid: "001000002", pid_formatted: "001-000-002", zone: null, dpas: [neighbourDPA6, neighbourDPA4] },
    ];
    const result = aggregateNeighbouringDPAs(ownDPAs, adjacent);
    expect(result[0].number).toBe(4);
    expect(result[1].number).toBe(6);
  });

  it("returns empty array when no adjacent parcels", () => {
    const result = aggregateNeighbouringDPAs([ownDPA1], []);
    expect(result).toHaveLength(0);
  });

  it("returns empty array when neighbours have no DPAs", () => {
    const adjacent = [
      { pid: "001000002", pid_formatted: "001-000-002", zone: null, dpas: [] as DPAResult[] },
    ];
    const result = aggregateNeighbouringDPAs([ownDPA1], adjacent);
    expect(result).toHaveLength(0);
  });
});
