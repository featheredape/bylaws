// ─── Debug endpoint: tests AI embedding + Claude API pipeline ──────
// GET or POST /api/debug?q=can+I+build+near+the+water
//
// Returns a step-by-step diagnostic report showing:
//  1. Whether env.AI binding exists
//  2. Whether embedding works (bge-small-en-v1.5)
//  3. Keyword scoring results
//  4. Semantic reranking results (before vs after)
//  5. Whether Claude API key is present
//  6. Whether Claude API responds (lightweight ping)
// ───────────────────────────────────────────────────────────────────

interface Env {
  CLAUDE_API_KEY: string;
  AI?: {
    run: (model: string, input: { text: string[] }) => Promise<{ data: number[][] }>;
  };
}

interface DiagStep {
  step: string;
  status: "pass" | "fail" | "skip";
  ms?: number;
  detail: any;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
  return runDiag(context);
};

export const onRequestPost: PagesFunction<Env> = async (context) => {
  return runDiag(context);
};

async function runDiag(context: { request: Request; env: Env }) {
  const { request, env } = context;
  const url = new URL(request.url);
  const query = url.searchParams.get("q") || "can I build a dock near the lake on my property?";
  const steps: DiagStep[] = [];

  // ── Step 1: Check env bindings ────────────────────────────────
  steps.push({
    step: "1. Environment bindings",
    status: "pass",
    detail: {
      AI_binding: env.AI ? "present" : "MISSING",
      CLAUDE_API_KEY: env.CLAUDE_API_KEY ? `present (${env.CLAUDE_API_KEY.slice(0, 12)}...)` : "MISSING",
    },
  });

  // ── Step 2: Test embedding ────────────────────────────────────
  let queryEmbedding: number[] | null = null;
  if (env.AI) {
    const t0 = Date.now();
    try {
      const result = await env.AI.run("@cf/baai/bge-small-en-v1.5", {
        text: [query],
      });
      queryEmbedding = result.data[0];
      steps.push({
        step: "2. Workers AI embedding",
        status: "pass",
        ms: Date.now() - t0,
        detail: {
          model: "@cf/baai/bge-small-en-v1.5",
          dimensions: queryEmbedding.length,
          sample: queryEmbedding.slice(0, 5).map(v => v.toFixed(4)),
        },
      });
    } catch (err: any) {
      steps.push({
        step: "2. Workers AI embedding",
        status: "fail",
        ms: Date.now() - t0,
        detail: { error: err.message || String(err) },
      });
    }
  } else {
    steps.push({
      step: "2. Workers AI embedding",
      status: "skip",
      detail: "env.AI not available — reranking will fall back to keyword-only",
    });
  }

  // ── Step 3: Keyword scoring ───────────────────────────────────
  // Inline a lightweight version of the keyword scoring to show results
  const SECTION_KEYWORDS_LITE: Record<string, string[]> = {
    lub_definitions: ["definition", "what is", "means"],
    lub_general_regulations: ["permitted use", "height", "density", "lot coverage", "home-based business", "secondary suite"],
    lub_siting: ["setback", "distance from", "lot line", "water body", "well", "foreshore"],
    lub_subdivision: ["subdivide", "subdivision", "lot area", "minimum lot"],
    lub_signs: ["sign", "signage"],
    lub_zones_residential: ["residential", "dwelling", "house", "suite", "R1", "R2", "R4", "R6"],
    lub_zones_agricultural: ["agriculture", "farm", "A1", "A2"],
    lub_zones_commercial: ["commercial", "hotel", "retail", "restaurant", "C1", "CA1"],
    lub_zones_other: ["community", "forestry", "employment", "CF1", "GE1"],
    lub_zones_rural: ["rural", "watershed", "shoreline", "dock", "marina", "foreshore"],
    lub_additional: ["ALR", "variance", "temporary use", "non-conforming"],
    goals_environment: ["environment", "climate", "heritage", "flood"],
    residential: ["housing", "affordable", "density", "dwelling"],
    commercial: ["tourism", "tourist", "hotel", "campground"],
    community: ["school", "hospital", "church", "library"],
    villages: ["ganges", "fulford", "village"],
    agricultural: ["agriculture", "farm", "ALR"],
    parks: ["park", "trail", "recreation"],
    conservation: ["watershed", "marine", "wetland", "lake", "stream", "shoreline", "dock", "water"],
    infrastructure: ["water supply", "sewer", "road", "parking"],
    dpa: ["development permit", "riparian", "DPA"],
  };

  const q = query.toLowerCase();
  const keywordScores: { section: string; score: number; matchedKeywords: string[] }[] = [];
  for (const [section, keywords] of Object.entries(SECTION_KEYWORDS_LITE)) {
    const matched: string[] = [];
    let score = 0;
    for (const kw of keywords) {
      if (q.includes(kw.toLowerCase())) {
        score += kw.length > 10 ? 3 : kw.length > 5 ? 2 : 1;
        matched.push(kw);
      }
    }
    if (score > 0) {
      keywordScores.push({ section, score, matchedKeywords: matched });
    }
  }
  keywordScores.sort((a, b) => b.score - a.score);

  steps.push({
    step: "3. Keyword scoring",
    status: keywordScores.length > 0 ? "pass" : "fail",
    detail: {
      query,
      matchedSections: keywordScores.length,
      top10: keywordScores.slice(0, 10),
    },
  });

  // ── Step 4: Semantic reranking comparison ─────────────────────
  if (queryEmbedding && env.AI) {
    const t0 = Date.now();
    try {
      // Embed summaries of the matched sections
      const SECTION_SUMMARIES_LITE: Record<string, string> = {
        lub_definitions: "Definitions of land use bylaw terms: dwelling, setback, lot area, floor area, accessory use",
        lub_general_regulations: "Permitted uses, building height, lot coverage, home business, secondary suite, density",
        lub_siting: "Setbacks from lot lines, water body setbacks, foreshore, well distance, septic distance",
        lub_subdivision: "Subdivision minimum lot area, lot dimensions, servicing requirements",
        lub_signs: "Sign regulations, dimensions, illumination",
        lub_zones_residential: "Residential zones R1-R12, single family, duplex, multi-family, mobile home",
        lub_zones_agricultural: "Agricultural zones A1 A2, farm buildings, farmworker dwelling",
        lub_zones_commercial: "Commercial zones C1-C5, hotels, retail, restaurants, guest accommodation CA1-CA5",
        lub_zones_other: "Community facilities, forestry, general employment, parks and recreation zones",
        lub_zones_rural: "Rural zones, watershed, shoreline, dock, wharf, marina, foreshore, boat launch",
        lub_additional: "ALR restrictions, development permits, temporary use, variances, non-conforming",
        goals_environment: "Environmental protection, climate change, natural hazards, heritage conservation",
        residential: "Residential land use policies, housing density, affordable housing, suites",
        commercial: "Commercial tourism employment policies, hotels, campgrounds, home business",
        community: "Schools, hospitals, churches, community halls, emergency services",
        villages: "Ganges, Fulford village policies, mixed use, pedestrian design",
        agricultural: "Agricultural land reserve, farm operations, food security",
        parks: "Parks trails recreation, open space, parkland dedication",
        conservation: "Watershed, marine, wetlands, lakes, streams, shoreline, dock, fish habitat",
        infrastructure: "Water supply, sewer, roads, transit, parking, drainage",
        dpa: "Development permit areas, riparian, well capture, shoreline development",
      };

      const candidateSections = keywordScores.length > 0
        ? keywordScores.map(k => k.section)
        : Object.keys(SECTION_SUMMARIES_LITE);

      const summaryTexts = candidateSections.map(s => SECTION_SUMMARIES_LITE[s] || s);
      const result = await env.AI.run("@cf/baai/bge-small-en-v1.5", {
        text: summaryTexts,
      });

      const dot = (a: number[], b: number[]) => {
        let d = 0, na = 0, nb = 0;
        for (let i = 0; i < a.length; i++) { d += a[i]*b[i]; na += a[i]*a[i]; nb += b[i]*b[i]; }
        return d / (Math.sqrt(na) * Math.sqrt(nb) + 1e-8);
      };

      const semanticScores = candidateSections.map((section, i) => ({
        section,
        keywordRank: i + 1,
        similarity: parseFloat(dot(queryEmbedding!, result.data[i]).toFixed(4)),
      }));

      semanticScores.sort((a, b) => b.similarity - a.similarity);
      const reranked = semanticScores.map((s, i) => ({
        ...s,
        semanticRank: i + 1,
        moved: s.keywordRank - (i + 1), // positive = promoted, negative = demoted
      }));

      steps.push({
        step: "4. Semantic reranking",
        status: "pass",
        ms: Date.now() - t0,
        detail: {
          candidateCount: candidateSections.length,
          reranked,
        },
      });
    } catch (err: any) {
      steps.push({
        step: "4. Semantic reranking",
        status: "fail",
        ms: Date.now() - t0,
        detail: { error: err.message || String(err) },
      });
    }
  } else {
    steps.push({
      step: "4. Semantic reranking",
      status: "skip",
      detail: "Skipped — no query embedding available",
    });
  }

  // ── Step 5: Claude API ping ───────────────────────────────────
  if (env.CLAUDE_API_KEY) {
    const t0 = Date.now();
    try {
      const resp = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": env.CLAUDE_API_KEY,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model: "claude-3-haiku-20240307",
          max_tokens: 10,
          messages: [{ role: "user", content: "Reply with OK" }],
        }),
      });
      const data: any = await resp.json();
      steps.push({
        step: "5. Claude API ping",
        status: resp.ok ? "pass" : "fail",
        ms: Date.now() - t0,
        detail: {
          httpStatus: resp.status,
          model: data.model || "unknown",
          reply: data.content?.[0]?.text?.slice(0, 50) || data.error?.message || "no response",
        },
      });
    } catch (err: any) {
      steps.push({
        step: "5. Claude API ping",
        status: "fail",
        ms: Date.now() - t0,
        detail: { error: err.message || String(err) },
      });
    }
  } else {
    steps.push({
      step: "5. Claude API ping",
      status: "skip",
      detail: "CLAUDE_API_KEY not set",
    });
  }

  // ── Summary ───────────────────────────────────────────────────
  const passed = steps.filter(s => s.status === "pass").length;
  const failed = steps.filter(s => s.status === "fail").length;
  const skipped = steps.filter(s => s.status === "skip").length;

  return Response.json(
    {
      query,
      summary: `${passed} passed, ${failed} failed, ${skipped} skipped`,
      allPassed: failed === 0,
      steps,
    },
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
}

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, {
    status: 204,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
};
