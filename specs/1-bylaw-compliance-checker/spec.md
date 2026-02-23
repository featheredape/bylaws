# Feature Specification: Salt Spring Island Bylaw Compliance Checker

**Feature Branch**: `1-bylaw-compliance-checker`
**Created**: 2026-02-23
**Status**: Approved
**Input**: User description: "Build a Salt Spring Island bylaw compliance checker accessible through the web, hosted by Cloudflare, with spec-driven development, form-based checking, hybrid AI approach, and modern sleek frontend."

## User Scenarios & Testing

### User Story 1 - Form-Based Compliance Check (Priority: P1)

A property owner on Salt Spring Island wants to check whether a proposed building or renovation complies with the Land Use Bylaw (LUB 355). They select their property zone, enter building details (height, footprint, setbacks, proposed use), and receive a detailed compliance report showing pass/fail for each applicable rule with exact bylaw references.

**Why this priority**: This is the core value proposition — the primary reason someone would use this tool. Without form-based compliance checking, there is no product.

**Independent Test**: Can be fully tested by submitting a compliance check form for an R1 residential zone with known valid and invalid values, and verifying the report shows correct pass/fail results with bylaw references.

**Acceptance Scenarios**:

1. **Given** a user on the checker page, **When** they select zone "R1 - Residential 1" and enter lot size 5000m², building footprint 200m², height 9m, front setback 8m, rear setback 8m, side setback 2m, proposed use "single-family dwelling", **Then** they receive a compliance report showing all checks as PASS with bylaw references from LUB 355 Part 9.
2. **Given** a user on the checker page, **When** they enter a building height of 15m in an R1 zone (max 10.5m), **Then** the report shows the height check as FAIL with severity "error", showing the 10.5m maximum and citing the specific LUB 355 section.
3. **Given** a user on the checker page, **When** they submit a form with missing required fields, **Then** they see clear validation messages indicating which fields are required.
4. **Given** a user on the checker page, **When** they receive any compliance report, **Then** the report includes disclaimers about consulting official sources and Salt Spring Island Planning Staff.

---

### User Story 2 - Zone Discovery & Browsing (Priority: P2)

A prospective property buyer or resident wants to explore the different zones on Salt Spring Island to understand what regulations apply. They can browse all 11 zone categories, view permitted uses, setback requirements, height limits, lot coverage rules, and other applicable regulations for any zone.

**Why this priority**: Zone discovery supports the core compliance check by helping users identify their zone and understand what rules apply. It's also independently useful for property research.

**Independent Test**: Can be tested by navigating to the zones page, selecting a zone, and verifying that all regulation categories are displayed with correct values and bylaw references.

**Acceptance Scenarios**:

1. **Given** a user on the zones page, **When** they view the zone list, **Then** they see all 11 zone categories (Agricultural, Commercial, Commercial Accommodation, Community Facilities, Comprehensive Development, Forestry, General Employment, Park and Reserves, Residential, Rural/Upland/Watershed/Smaller Islands, Shoreline) with zone codes and names.
2. **Given** a user on the zones page, **When** they select a specific zone, **Then** they see all applicable regulations grouped by category (setbacks, height, lot coverage, permitted uses, parking, signs, subdivision) with values, units, and bylaw references.
3. **Given** a user viewing zone details, **When** they see a regulation, **Then** each regulation shows the specific LUB 355 Part/Section reference.

---

### User Story 3 - Claude-Powered Q&A (Priority: P3)

A property owner has a complex question about bylaw compliance that doesn't fit neatly into the form-based checker (e.g., "Can I operate a bed & breakfast from my agricultural property?" or "What are the rules for accessory buildings in R1 zones?"). They can type a free-text question and receive an AI-generated answer with confidence level, bylaw source citations, and a disclaimer.

**Why this priority**: This adds significant value for edge cases and complex questions that the rule engine can't handle, but the core product works without it. It requires Claude API integration and ongoing API costs.

**Independent Test**: Can be tested by submitting a known bylaw question (e.g., about home-based businesses in R1) and verifying the response includes an answer, confidence level, source references, and disclaimer.

**Acceptance Scenarios**:

1. **Given** a user on the ask page, **When** they type "Can I build a secondary suite in an R1 zone?" and optionally select zone R1, **Then** they receive an answer citing relevant LUB 355 sections about secondary suites, with a confidence level and disclaimer.
2. **Given** a user on the ask page, **When** they submit a question, **Then** the response always includes a disclaimer that it's AI-generated and should be verified with official sources.
3. **Given** a user on the ask page, **When** the question is ambiguous or outside bylaw scope, **Then** the response indicates low confidence and recommends consulting Salt Spring Island Planning Staff.

---

### Edge Cases

- What happens when a user enters a zone code that doesn't exist?
- How does the system handle regulations that have exceptions or conditional applicability?
- What happens when a zone has no data for a particular regulation type (e.g., no water setback for inland zones)?
- How does the system handle the Claude API being unavailable or rate-limited?
- What happens when a user enters zero or negative values?

## Requirements

### Functional Requirements

- **FR-001**: System MUST allow users to select from all zones defined in LUB 355
- **FR-002**: System MUST validate user-entered property/building parameters (positive numbers, reasonable ranges)
- **FR-003**: System MUST check compliance for: permitted use, building height, front/rear/side/water setbacks, lot coverage, and lot size
- **FR-004**: System MUST return pass/fail for each checked rule with the exact bylaw reference (LUB 355 Part/Section)
- **FR-005**: System MUST include disclaimers on every compliance result stating this is informational only
- **FR-006**: System MUST display all zones with their regulations, organized by category
- **FR-007**: System MUST integrate with Claude API for free-text bylaw questions
- **FR-008**: System MUST show confidence levels (high/medium/low) on AI-generated answers
- **FR-009**: System MUST serve the frontend via Cloudflare Pages with a modern, responsive design
- **FR-010**: System MUST store all bylaw data in Cloudflare D1 (SQLite)

### Key Entities

- **Zone**: A land use zone defined in LUB 355 (e.g., R1, C1, A1). Has a code, name, category, and description.
- **Regulation**: A specific rule that applies to a zone (setback, height, coverage, etc.). Has a type, min/max value, unit, and bylaw reference.
- **PermittedUse**: A land use that is allowed, conditionally allowed, or not allowed in a zone.
- **ComplianceCheck**: A single pass/fail evaluation of one regulation against user-provided values.
- **ComplianceReport**: The complete set of checks for a user's submission, with overall pass/fail status.

## Success Criteria

### Measurable Outcomes

- **SC-001**: Users can complete a full compliance check in under 30 seconds (form fill + submit + results)
- **SC-002**: Rule-based compliance API responds in under 500ms
- **SC-003**: At least 20 extracted bylaw data points are verified correct against the original PDF
- **SC-004**: All 11 zone categories from LUB 355 are represented with at least basic regulations
- **SC-005**: All compliance checks include correct bylaw references traceable to LUB 355
- **SC-006**: Unit test coverage for the compliance engine is at least 80%
