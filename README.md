# Salt Spring Island Bylaw Compliance Checker

A serverless compliance analysis tool for Land Use Bylaw No. 355 and Official Community Plan (OCP) No. 434 on Salt Spring Island. Built with Cloudflare Pages, zero external API dependencies, and local authoritative GIS datasets.

## Overview

The Bylaw Compliance Checker answers a single, critical question: **Will my proposed development comply with Salt Spring Island's land-use regulations?**

The application provides intelligent analysis by combining two core capabilities:

1. **Property Lookup** — Enter a PID (Parcel Identification Number) to retrieve zoning information, area measurements, and applicable Designated Protected Areas (DPAs) from authoritative Islands Trust and Property Mortgage and Taxation databases.

2. **Compliance Analysis** — Describe your proposed project, and Claude (via API) reviews your submission against the full text of LUB 355 and auto-detected sections of OCP 434, returning structured compliance findings with specific bylaw sections, recommendations, and next steps.

The tool serves property owners, developers, and planners preparing preliminary feasibility assessments before engaging with Islands Trust planning staff.

## Architecture Overview

The Bylaw Compliance Checker is a Cloudflare Pages application combining static frontend assets with serverless functions:

- **Frontend** — Lightweight HTML/CSS/JavaScript shell (`public/`) with form capture and PDF report generation.
- **Serverless Functions** — TypeScript workers in `functions/api/` handle two API endpoints: property/zoning lookup and compliance analysis.
- **Data Layer** — Three pre-converted, authoritative JSON datasets (parcels, zones, DPAs) are cached on first request, eliminating runtime database calls and external GIS API dependencies.
- **AI Analysis** — Integration with Claude API (via environment binding `CLAUDE_API_KEY`) for intelligent bylaw interpretation.

All geographic lookups use ray-casting point-in-polygon algorithms with bounding-box optimization, ensuring sub-100ms response times even with 2,270+ parcels and 440+ DPA polygons in memory.

## Project Structure

```
bylaw3/
├── README.md                          # This file
├── package.json                       # npm scripts and dependencies
├── wrangler.toml                      # Cloudflare Pages configuration
│
├── functions/
│   ├── lib/
│   │   └── geo.ts                     # Pure GIS functions (point-in-polygon, binary search, zone lookup)
│   └── api/
│       ├── pid-lookup.ts              # POST /api/pid-lookup — property zoning + DPA lookup
│       └── query.ts                   # POST /api/query — compliance analysis with Claude
│
├── public/
│   ├── index.html                     # Main app shell
│   ├── styles.css                     # Responsive styling
│   ├── app.js                         # Frontend logic and API calls
│   ├── pdf-report.js                  # PDF generation for compliance reports
│   ├── jspdf.umd.min.js               # PDF library
│   └── data/
│       ├── ssi-parcels.json           # 2,270 PMBC parcel geometries with centroids, bounding boxes
│       ├── ssi-zones.json             # 629 Islands Trust zoning polygons (R1, C1, A1, etc.)
│       └── ssi-dpas.json              # 440 DPA polygons (7 types: Villages, Shoreline, Wetlands, etc.)
│
├── scripts/
│   ├── validate-datasets.js           # Validates JSON datasets and logs statistics
│   ├── convert-datasets.js            # Converts raw GIS exports to optimized JSON
│   ├── download-ssi-parcels.js        # Fetches parcel data from PMBC WFS
│   └── download-ssi-zoning.js         # Fetches zoning data from Islands Trust WFS
│
└── tests/
    └── geo.test.ts                    # 73 unit tests covering all geo functions (vitest)
```

## Local Development

### Prerequisites

- Node.js 18+ and npm
- `CLAUDE_API_KEY` environment variable or Cloudflare binding

### Setup

```bash
npm install
```

### Running the Dev Server

```bash
npx wrangler pages dev public --binding CLAUDE_API_KEY=your-key-here
```

The app will be available at `http://localhost:8787`. The dev server automatically rebuilds TypeScript functions on file changes.

### Running Tests

The test suite covers pure geographic functions (point-in-polygon, binary search, zone lookup) and data validation:

```bash
npm test           # Run tests once
npm run test:watch # Watch mode for TDD
```

All 73 tests pass, validating core GIS logic against known polygons with and without holes, boundary conditions, and edge cases.

## API Endpoints

### POST /api/pid-lookup

Looks up a property by Parcel Identification Number and returns its zoning, area, and applicable DPAs.

**Request:**
```json
{
  "pid": "009-123-456"
}
```

**Response (success):**
```json
{
  "success": true,
  "data": {
    "pid": "009-123-456",
    "area_sqm": 5000,
    "area_ha": 0.5,
    "plan_number": "ABC123",
    "owner_type": "Private",
    "zone_code": "R1",
    "zone_desc": "Residential 1",
    "lub_zone_code": "R1",
    "lub_zone_name": "Residential 1",
    "zone_category": "residential",
    "is_village": true,
    "dpas": [
      {
        "name": "DPA 1 — Island Villages",
        "number": 1,
        "description": "Island Villages form/character protection",
        "bylaw": "OCP 434",
        "source": "authoritative"
      }
    ],
    "centroid": { "lon": -123.425, "lat": 49.123 },
    "debug_map_link": "https://www.google.com/maps?q=49.123,-123.425"
  },
  "source": "local_datasets"
}
```

**Response (not found):**
```json
{
  "success": false,
  "error": "No property found for PID 999-999-999. Please verify the number and try again."
}
```

### POST /api/query

Analyzes a proposed project against LUB 355 and auto-detected OCP 434 sections. Uses Claude API for intelligent interpretation.

**Request:**
```json
{
  "query": "I want to build a secondary suite in my R1 residential home with a separate entrance, about 75 square meters."
}
```

**Response (success):**
```json
{
  "success": true,
  "analysis": {
    "query": "I want to build a secondary suite in my R1 residential home...",
    "compliance_status": "CONDITIONAL_APPROVAL",
    "summary": "Secondary suites are permitted in R1 zones subject to specific conditions. Your project appears feasible, but requires careful attention to OCP 434 policies on water access and development permits.",
    "bylaw_sections": [
      {
        "ref": "LUB 355, Section 9.9, R1 Zone",
        "title": "Residential 1 Zone Regulations",
        "excerpt": "Secondary suite (conditional): Max one per lot, owner must occupy principal dwelling or suite, max 40% of principal dwelling floor area, max 90 m²."
      },
      {
        "ref": "OCP 434, B.2.2.2.15",
        "title": "Secondary Suites Policy",
        "excerpt": "Secondary suites only in areas with adequate potable water. Not in community water supply watersheds or well capture zones."
      }
    ],
    "compliance_steps": [
      {
        "step": 1,
        "title": "Verify water availability",
        "description": "Confirm your property is served by adequate potable water and is not in a well capture zone.",
        "responsible": "Property owner / Islands Trust"
      },
      {
        "step": 2,
        "title": "Check DPA requirements",
        "description": "Determine if your property falls within Development Permit Areas, particularly DPA 1 (Villages) or DPA 4 (Wetlands).",
        "responsible": "Islands Trust"
      },
      {
        "step": 3,
        "title": "Building permit and BC Building Code",
        "description": "Ensure design complies with BC Building Code (separate entrance, egress, utilities).",
        "responsible": "Developer / Designer"
      }
    ],
    "warnings": [
      {
        "severity": "warning",
        "message": "If your property is in a DPA, a development permit may be required before building permit approval."
      },
      {
        "severity": "info",
        "message": "Consider registering your secondary suite annually to maintain legal status."
      }
    ]
  },
  "source": "claude_analysis",
  "inference_time_ms": 8500
}
```

**Request validation:**
- Query length must not exceed 5,000 characters
- Empty queries are rejected

**Response (error):**
```json
{
  "success": false,
  "error": "Your query is too long. Please keep it under 5,000 characters."
}
```

## Data Pipeline

The application operates on three pre-converted JSON datasets stored in `public/data/`. Each dataset is cached on first access and reused across requests.

### ssi-parcels.json

Contains 2,270+ parcel records from Property Mortgage and Taxation / PMBC, indexed by 9-digit PID. Each record includes:
- PID (9-digit, sortable)
- Formatted PID (dashed: XXX-XXX-XXX)
- Plan number and owner type (for context)
- Area in square meters
- Centroid (lon, lat) for zone lookups
- Bounding box for spatial filtering
- Outer boundary rings (GeoJSON-style coordinate arrays)

**Use:** Binary search by PID; centroid + boundary sampling for zone and DPA overlap.

### ssi-zones.json

Contains 629 zoning polygons from Islands Trust authoritative data, keyed by zone code (R1, C1, A1, etc.). Each polygon includes:
- Zone code and description
- Bounding box (fast pre-filter)
- Rings (outer boundary only; Islands Trust zones are non-overlapping)

**Use:** Point-in-polygon test to determine applicable zoning regulations.

### ssi-dpas.json

Contains 440 DPA polygons (Designated Protected Areas) from Islands Trust OCP 434, numbered 1–7. Each polygon includes:
- DPA number (1–7), description, and source bylaw
- Bounding box and rings (many have holes, e.g., foreshore DPA wrapping around land)

**Use:** Identifies which development permit areas apply to a parcel, triggering additional review requirements.

### Validation

Run the validation script to inspect datasets and confirm counts:

```bash
node scripts/validate-datasets.js
```

This reports parcel count, zone count, DPA count, any data inconsistencies, and geographic bounds.

## Testing

The test suite (`tests/geo.test.ts`) contains 73 unit tests validating core GIS logic:

- **PID normalization** — 8 tests covering dashed vs. digit extraction, edge cases
- **Point-in-polygon** — 15 tests on single rings, polygons with holes, boundary conditions
- **Bounding box** — 12 tests for containment, overlap, edge intersection
- **Binary search** — 6 tests on parcel lookup across sorted arrays
- **Zone lookup** — 10 tests for exact match, case-insensitive, variant suffixes, fallback
- **Zone finding** — 11 tests for spatial containment, multi-zone arrays
- **DPA finding** — 11 tests for centroid + boundary sampling, multi-DPA overlap, result ordering
- **Constants validation** — 2 test suites on ZONE_MAP and DPA_NAMES coverage

Run tests with:
```bash
npm test
```

For development with auto-rerun:
```bash
npm run test:watch
```

## Deployment

The application is deployed to Cloudflare Pages with automatic builds from source.

### Prerequisites

- Cloudflare account with Pages enabled
- `CLAUDE_API_KEY` secret configured in the Pages project

### Deploy

```bash
npx wrangler pages deploy public --project-name ssi-bylaw-checker
```

### Environment Secrets

Set the following secret in the Cloudflare Pages dashboard:

- **CLAUDE_API_KEY** — Your Claude API key (from Anthropic)

Without this secret, the `/api/query` endpoint will return a 500 error.

### CORS Configuration

The `/api/pid-lookup` and `/api/query` endpoints are hardcoded to allow CORS requests only from:
- `https://bylaw.saltspring.info` (production domain)

To add additional origins, modify the `corsHeaders()` function in `functions/api/pid-lookup.ts` and `functions/api/query.ts`.

## Security Considerations

### Input Validation

- **PID lookup** — Accepts only 9-digit strings; normalized and validated before binary search
- **Query endpoint** — Maximum 5,000 characters; prevents overly large Claude API calls
- **HTML escaping** — All user input displayed in HTML is properly escaped to prevent injection

### Data Integrity

- **Race conditions** — Dataset loading uses promise guards (`loadingParcels`, etc.) to ensure concurrent requests share a single fetch, preventing duplicate loads
- **Cached datasets** — Once loaded, datasets are cached in memory and reused; no mutations
- **CORS lock** — API endpoints only accept cross-origin requests from the production domain

### API Security

- **Claude integration** — API key is stored as a Cloudflare environment binding and never exposed to the frontend
- **Query length limits** — Prevents excessively long requests to Claude API
- **Error handling** — Generic error messages returned to clients; detailed logs available to administrators

## License and Disclaimer

This tool is provided **for informational purposes only** and is **not legal or planning advice**.

Compliance analysis is generated by Claude, an AI assistant, and while it references actual bylaw text, it may contain errors or omissions. Salt Spring Island planning regulations are complex and subject to change.

**Always verify findings with Islands Trust planning staff before proceeding with development.** Contact Islands Trust planning staff:
- https://islandstrust.bc.ca/island-planning/salt-spring/
- https://www.islandstrust.bc.ca/island-planning/salt-spring/contact/

Bylaw references are current to **March 2025** (LUB 355 consolidated, OCP 434).

---

For official bylaw documents and zoning information, see:
- [Islands Trust — Salt Spring Island Official Bylaws](https://islandstrust.bc.ca/island-planning/salt-spring/bylaws/)
- [Agricultural Land Commission (ALC)](https://www.alc.gov.bc.ca)
