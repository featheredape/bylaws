# Salt Spring Island Bylaw Compliance Checker Constitution

## Core Principles

### I. Bylaw Accuracy (NON-NEGOTIABLE)
Every regulation extracted from official PDF sources (LUB 355, OCP 434) MUST be verified against the original document. Extracted numerical values (setbacks, heights, lot coverage, etc.) require spot-check tests comparing against manually confirmed PDF values. A minimum of 20 data points across 5+ zones must be verified before any release. Data integrity errors are treated as critical bugs.

### II. Test-First Development
All compliance logic is test-driven. For each compliance rule: write a failing test first, then implement the rule to make it pass. Red-Green-Refactor cycle enforced. Unit tests for the compliance engine, contract tests for API response shapes (Zod schemas), integration tests for full request-response flows, and bylaw verification tests for data accuracy.

### III. Transparency & Traceability
Every compliance check result MUST include: the requirement being checked, the provided value, the pass/fail result, severity level (error/warning/info), the exact bylaw reference (Part, Section, Schedule from LUB 355 or OCP 434), and a human-readable explanation. Users must always understand WHY a check passed or failed.

### IV. User Safety & Disclaimers
This tool is for informational purposes only. Every compliance response MUST include clear disclaimers stating that results should be verified with official bylaw documents and that users should consult with Salt Spring Island Planning Staff for definitive answers. The tool does not replace official review or building permit processes.

### V. Hybrid Intelligence
Deterministic rule-based checks for common, well-defined regulations (setbacks, heights, lot coverage, permitted uses). Claude API fallback for edge cases, ambiguous interpretations, and complex questions that cannot be answered by structured rules alone. AI-generated responses MUST include confidence levels and source citations.

### VI. Performance
Rule-based API responses MUST complete in under 500ms. D1 database queries are indexed for efficient filtering. Frontend loads and is interactive within 2 seconds. Claude API fallback may take longer but must show loading state to user.

### VII. Simplicity & YAGNI
Start with the minimum viable feature set. No premature abstractions. Single-file components where practical. Avoid over-engineering the data model beyond what the bylaws actually contain. Add complexity only when justified by a concrete requirement.

## Technology Constraints

- **Runtime**: Cloudflare Workers (TypeScript, serverless)
- **Frontend**: React + Vite, served via Workers ASSETS binding
- **Database**: Cloudflare D1 (SQLite) for structured bylaw data
- **AI**: Anthropic SDK (`@anthropic-ai/sdk`) via Claude API
- **Testing**: Vitest + `@cloudflare/vitest-pool-workers` + Miniflare
- **Validation**: Zod for API request/response schemas
- **Routing**: `itty-router` (Workers-native, lightweight)
- **Deploy**: Wrangler CLI to Cloudflare

## Development Workflow

- All features follow SpecKit workflow: Constitution → Specify → Plan → Tasks → Implement
- Each user story is independently testable and deliverable
- Bylaw data extraction is treated as the highest-risk phase and gets extra verification
- All API endpoints have contract tests validating response shapes
- Compliance engine rules each have unit tests with known pass/fail cases
- No deployment without all tests passing

## Governance

This constitution supersedes all other development practices for this project. Amendments require explicit documentation and rationale. Bylaw accuracy principles are non-negotiable — no feature ships with unverified bylaw data.

**Version**: 1.0.0 | **Ratified**: 2026-02-23 | **Last Amended**: 2026-02-23
