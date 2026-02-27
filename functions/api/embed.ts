// ─── Standalone embedding endpoint ─────────────────────────────────
// POST /api/embed  →  { texts: string[] }  →  { embeddings: number[][] }
// Uses Cloudflare Workers AI bge-small-en-v1.5 (384 dimensions).
// Batches in groups of 100 to stay within API limits.
// ───────────────────────────────────────────────────────────────────

interface Env {
  AI?: {
    run: (model: string, input: { text: string[] }) => Promise<{ data: number[][] }>;
  };
}

const EMBED_MODEL = "@cf/baai/bge-small-en-v1.5";
const BATCH_SIZE = 100;

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.AI) {
    return Response.json(
      { success: false, error: "Workers AI binding not configured" },
      { status: 500, headers: corsHeaders(request) }
    );
  }

  let body: { texts: string[] };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body" },
      { status: 400, headers: corsHeaders(request) }
    );
  }

  if (!Array.isArray(body.texts) || body.texts.length === 0) {
    return Response.json(
      { success: false, error: "Provide a non-empty 'texts' array" },
      { status: 400, headers: corsHeaders(request) }
    );
  }

  if (body.texts.length > 500) {
    return Response.json(
      { success: false, error: "Maximum 500 texts per request" },
      { status: 400, headers: corsHeaders(request) }
    );
  }

  try {
    const allEmbeddings: number[][] = [];

    for (let i = 0; i < body.texts.length; i += BATCH_SIZE) {
      const batch = body.texts.slice(i, i + BATCH_SIZE);
      const result = await env.AI.run(EMBED_MODEL, { text: batch });
      allEmbeddings.push(...result.data);
    }

    return Response.json(
      { success: true, embeddings: allEmbeddings, dimensions: 384, model: EMBED_MODEL },
      { headers: corsHeaders(request) }
    );
  } catch (err) {
    console.error("Embedding error:", err);
    return Response.json(
      { success: false, error: "Embedding computation failed" },
      { status: 502, headers: corsHeaders(request) }
    );
  }
};

export const onRequestOptions: PagesFunction = async (context) => {
  return new Response(null, { status: 204, headers: corsHeaders(context.request) });
};

const ALLOWED_ORIGINS = [
  "https://bylaws.saltspring.info",
  "http://localhost:8788",
  "http://127.0.0.1:8788",
];

function corsHeaders(request?: Request): Record<string, string> {
  const origin = request?.headers?.get("Origin") || "";
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}
