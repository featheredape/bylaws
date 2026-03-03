# ADR-001: OCP Section Architecture & Bylaw Content Routing

**Status:** Accepted
**Date:** 2026-03-01
**Deciders:** Project owner

## Context

The SSI Bylaw Compliance Checker sends relevant sections of LUB 355 and OCP 434 to Claude as system prompt context for each query. The original design had 10 hand-written OCP summary sections (~27K chars total) and a combined cap of 7 sections (LUB + OCP competing for the same slots). This led to two problems:

1. **OCP content was too thin.** Hand-written summaries missed critical regulatory details (e.g., DPA 3 shoreline stabilization guidelines E.3.4.21-E.3.4.33 were absent).
2. **OCP got crowded out.** With LUB and OCP sharing a 7-slot cap, LUB keywords (especially zone codes with +10 boost) consumed most slots, leaving 0-2 for OCP.
3. **DPA routing was imprecise.** All 7 Development Permit Areas (103K chars source) were crammed into one 6K "dpa" section, losing almost all policy detail.

## Decision

### 1. Always include all LUB 355 sections

All 11 scored LUB sections (~31K tokens, ~15% of Claude's 200K context) are included on every query. No keyword gating, no cap.

**Rationale:** LUB 355 is the enforceable zoning bylaw — every section could be relevant. At 15% of context, the cost is minimal and eliminates the risk of missing applicable regulations due to keyword gaps.

### 2. Replace hand-written OCP with chunked source content

The user's `ocp_chunks_v2.json` (1,202 chunks, 85 section titles, 369K chars) from the actual OCP 434 document replaces hand-written summaries. A build script (`scripts/build-ocp-sections.mjs`) groups chunks by section key, preserves document order, and trims to per-section character budgets using policy-relevance scoring.

### 3. Split DPA into 7 individual sections

Instead of one combined "dpa" section, each Development Permit Area gets its own section key (dpa1-dpa7) with independent keyword routing, semantic summaries, and character budgets.

| Section | Description | Budget | Source Size |
|---------|-------------|--------|-------------|
| dpa1 | Island Villages (form & character) | 10K | 39K |
| dpa2 | Non-Village Commercial | 8K | 14K |
| dpa3 | Shoreline (stabilization guidelines) | 17K | 17K |
| dpa4 | Lakes, Streams & Wetlands | 8K | 8K |
| dpa5 | Community Well Capture Zones | 6K | 5.5K |
| dpa6 | Unstable Slopes & Soil Erosion | 7K | 7K |
| dpa7 | Riparian Areas | 10K | 11K |

### 4. Separate LUB and OCP routing

LUB and OCP no longer compete for slots. LUB is always fully included. OCP uses keyword scoring + semantic reranking (Workers AI bge-small-en-v1.5) to pick the top 4 most relevant sections from 16 candidates.

## Options Considered

### Option A: Keep combined cap (status quo)
| Dimension | Assessment |
|-----------|------------|
| Complexity | Low |
| Token cost | ~13K tokens/request |
| Coverage | Poor — OCP frequently excluded |
| DPA detail | Very poor — 6K for all 7 DPAs |

**Pros:** Minimal token usage.
**Cons:** Missed regulations, thin OCP content, imprecise DPA routing.

### Option B: Always-all LUB + routed OCP with split DPAs (chosen)
| Dimension | Assessment |
|-----------|------------|
| Complexity | Medium |
| Token cost | ~35-45K tokens/request |
| Coverage | Excellent — full LUB, targeted OCP |
| DPA detail | Good — individual DPAs with generous budgets |

**Pros:** No missed LUB regulations, precise DPA routing, rich policy content.
**Cons:** Higher per-request token cost (~3x).

### Option C: Include everything (all LUB + all OCP)
| Dimension | Assessment |
|-----------|------------|
| Complexity | Low |
| Token cost | ~60K tokens/request |
| Coverage | Maximum |
| DPA detail | Maximum |

**Pros:** Zero routing risk.
**Cons:** Expensive, may reduce Claude's focus with irrelevant sections, approaching prompt caching limits.

## Trade-off Analysis

Option B balances coverage and cost. The key insight is that LUB and OCP serve different purposes: LUB contains enforceable rules that are always relevant (justify always-on), while OCP provides policy context where selective routing is acceptable (a shoreline query doesn't need agricultural policy). Splitting DPAs was critical — DPA 3 alone has 17K chars of shoreline stabilization guidelines that were entirely lost in the old 6K combined budget.

## Architecture Summary

```
Query → detectRelevantSections()
         ├── LUB: always include all 11 sections (~31K tokens)
         │    └── lub_core (always) + lub_definitions, lub_general_regulations,
         │        lub_siting, lub_subdivision, lub_signs, lub_zones_residential,
         │        lub_zones_agricultural, lub_zones_commercial, lub_zones_other,
         │        lub_zones_rural, lub_additional
         │
         └── OCP: keyword score → semantic rerank → top 4 of 16 sections
              ├── 9 topic sections: goals_environment, residential, commercial,
              │   community, villages, agricultural, parks, conservation, infrastructure
              └── 7 DPA sections: dpa1, dpa2, dpa3, dpa4, dpa5, dpa6, dpa7

System Prompt = SYSTEM_PREFIX (cached) + LUB sections + OCP sections + exclusion note
```

## Consequences

- **Easier:** Answering DPA-specific questions (shoreline, riparian, wells, slopes) with actual regulatory text
- **Easier:** No more missed LUB regulations due to keyword gaps
- **Harder:** Build process now requires running `scripts/build-ocp-sections.mjs` when OCP source data changes
- **Harder:** 16 OCP section keywords + summaries to maintain instead of 10
- **Revisit:** Token costs should be monitored; if too high, OCP cap can be reduced from 4 to 3
- **Revisit:** Prompt caching effectiveness — the static prefix is cached, but dynamic section content varies per query

## Action Items

1. [x] Build grouping/trimming script (`scripts/build-ocp-sections.mjs`)
2. [x] Replace OCP_SECTIONS in query.ts with chunked content
3. [x] Split DPA into 7 individual sections with keywords and summaries
4. [x] Update OCP_SECTION_KEYS, SECTION_KEYWORDS, SECTION_SUMMARIES
5. [x] Remove LUB cap — always include all 11 sections
6. [x] Verify build (282.9KB) and tests (107 pass)
7. [x] Add token usage logging (input, output, cache_creation, cache_read tokens per request)
8. [x] Create routing test suite (`scripts/test-routing.mjs`) — 20/20 tests passing across all DPA types
9. [ ] Deploy to production (`npm run deploy`) and monitor token usage via Cloudflare logs
