# OCP Analyzer: AI Model Proposals

Reference configurations for the AI-powered analysis backend. Each proposal defines a model, token budget, and retrieval pipeline configuration.

IMPORTANT: These configurations have been tested and deployed. Pay close attention to the exact model strings and API version header. Incorrect values will cause 400 errors from the Anthropic API.

## Critical API Details

```
API endpoint:       https://api.anthropic.com/v1/messages
anthropic-version:  2023-06-01    (MUST use this value; other versions like 2025-04-01 do NOT exist)
Required headers:   x-api-key, anthropic-version, Content-Type (application/json)
```

### Verified Model Strings

```
Claude Sonnet 4:    claude-sonnet-4-20250514
Claude Sonnet 4.5:  claude-sonnet-4-5-20250929    (NOT 20250514; that date is Sonnet 4)
Claude Opus 4.6:    claude-opus-4-6               (no date suffix)
```

---

## Proposal 1 (Original Baseline)

```
Model:              claude-sonnet-4-20250514
Max tokens:         1,024
Extended thinking:  No
Chunks to worker:   50
Reranked for LLM:   25
System prompt tone: Concise (3-6 sentences for factual questions)
Est. cost/query:    ~$0.03
```

**Worker config:**
```javascript
const MODEL_CONFIGS = {
  standard: {
    model: "claude-sonnet-4-20250514",
    max_tokens: 1024,
    thinking: null,
  },
};
const MAX_CANDIDATES_TO_WORKER = 50;
const RERANK_TOP_N = 25;
```

**Client config:**
```typescript
const MAX_CANDIDATES_TO_WORKER = 50;
```

**API request body:**
```json
{
  "model": "claude-sonnet-4-20250514",
  "max_tokens": 1024,
  "system": "<system prompt>",
  "messages": [{ "role": "user", "content": "<user message>" }]
}
```

---

## Proposal 2 (Sonnet 4.5, Fast) [Current Default "Analyze"]

Sonnet 4.5 with speed optimizations. Reduced reranked chunk count and lower max_tokens for faster responses. No extended thinking.

```
Model:              claude-sonnet-4-5-20250929
Max tokens:         2,048
Extended thinking:  No
Chunks to worker:   80
Reranked for LLM:   25
System prompt tone: Thorough (cover all relevant policies)
Est. cost/query:    ~$0.04
Est. response time: 5-8 seconds
```

**Worker config:**
```javascript
const MODEL_CONFIGS = {
  standard: {
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 2048,
    thinking: null,
  },
};
const MAX_CANDIDATES_TO_WORKER = 80;
const RERANK_TOP_N_STANDARD = 25;
```

**Client config:**
```typescript
const MAX_CANDIDATES_TO_WORKER = 80;
export type AnalysisMode = "standard";
```

**API request body:**
```json
{
  "model": "claude-sonnet-4-5-20250929",
  "max_tokens": 2048,
  "system": "<system prompt>",
  "messages": [{ "role": "user", "content": "<user message>" }]
}
```

---

## Proposal 2.5 (Sonnet 4.5 + Extended Thinking) [Not Currently Deployed]

Sonnet 4.5 with extended thinking enabled. The model reasons internally before responding, producing near-Opus quality at Sonnet pricing. Not currently deployed but available as an option.

```
Model:              claude-sonnet-4-5-20250929
Max tokens:         16,000 (budget includes thinking tokens)
Thinking budget:    10,000 tokens
Extended thinking:  Yes, type: "enabled"
Chunks to worker:   80
Reranked for LLM:   40
System prompt tone: Thorough (cover all relevant policies)
Est. cost/query:    ~$0.18
```

**Worker config:**
```javascript
const MODEL_CONFIGS = {
  standard: {
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 16000,
    thinking: { type: "enabled", budget_tokens: 10000 },
  },
};
const MAX_CANDIDATES_TO_WORKER = 80;
const RERANK_TOP_N = 40;
```

**API request body (extended thinking):**
```json
{
  "model": "claude-sonnet-4-5-20250929",
  "max_tokens": 16000,
  "thinking": {
    "type": "enabled",
    "budget_tokens": 10000
  },
  "system": "<system prompt>",
  "messages": [{ "role": "user", "content": "<user message>" }]
}
```

**Extended thinking constraints:**
- budget_tokens must be less than max_tokens
- NOT compatible with temperature or top_k modifications
- Cannot pre-fill responses (no assistant prefill)
- Response contains thinking blocks followed by text blocks

**Response parsing (thinking blocks come before text):**
```javascript
const textBlocks = (data.content || []).filter(b => b.type === "text");
const answer = textBlocks.length > 0 ? textBlocks[textBlocks.length - 1].text : null;
```

---

## Proposal 3 (Opus 4.6 Deep Analysis) [Current "Deep Analysis"]

Opus 4.6 for maximum analytical depth. Best at synthesizing across contradictory policies and nuanced planning arguments. Uses adaptive thinking.

```
Model:              claude-opus-4-6
Max tokens:         8,192
Thinking:           Adaptive (type: "adaptive")
Chunks to worker:   80
Reranked for LLM:   40
System prompt tone: Exhaustive (leave nothing out)
Est. cost/query:    ~$0.15
Est. response time: 15-20 seconds
```

**Worker config:**
```javascript
const MODEL_CONFIGS = {
  deep: {
    model: "claude-opus-4-6",
    max_tokens: 8192,
    thinking: { type: "adaptive" },
  },
};
const MAX_CANDIDATES_TO_WORKER = 80;
const RERANK_TOP_N_DEEP = 40;
```

**Client config:**
```typescript
const MAX_CANDIDATES_TO_WORKER = 80;
export type AnalysisMode = "deep";
```

**API request body (adaptive thinking):**
```json
{
  "model": "claude-opus-4-6",
  "max_tokens": 8192,
  "thinking": {
    "type": "adaptive"
  },
  "system": "<system prompt>",
  "messages": [{ "role": "user", "content": "<user message>" }]
}
```

**Opus 4.6 thinking notes:**
- Uses adaptive thinking (type: "adaptive"), NOT manual mode (type: "enabled")
- Manual extended thinking (type: "enabled" with budget_tokens) is DEPRECATED on Opus 4.6
- The model decides how much to think based on the complexity of the query
- Response format is the same: thinking blocks then text blocks; parse the last text block

---

## Current Hybrid Configuration (P2 + P3)

The current deployment uses P2 as the default "Analyze" mode and P3 as an optional "Deep Analysis" mode.

**Worker config (combined, production-verified):**
```javascript
const MODEL_CONFIGS = {
  // Default: Sonnet 4.5, fast
  standard: {
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 2048,
    thinking: null,
  },
  // Deep Analysis: Opus 4.6 with adaptive thinking
  deep: {
    model: "claude-opus-4-6",
    max_tokens: 8192,
    thinking: { type: "adaptive" },
  },
};
const RERANK_TOP_N_STANDARD = 25;
const RERANK_TOP_N_DEEP = 40;
```

**Client sends mode in request body:**
```typescript
const payload = {
  question: "user question here",
  mode: "standard" | "deep",
  chunks: [{ id, sectionTitle, text }],
};
```

**Worker selects config based on mode:**
```javascript
const mode = body.mode === "deep" ? "deep" : "standard";
const config = MODEL_CONFIGS[mode];
const rerankN = mode === "deep" ? RERANK_TOP_N_DEEP : RERANK_TOP_N_STANDARD;

// Build request body
const requestBody = {
  model: config.model,
  max_tokens: config.max_tokens,
  system: SYSTEM_PROMPT,
  messages: [{ role: "user", content: userMessage }],
};

// Add thinking config (works for both "enabled" and "adaptive" types)
if (config.thinking) {
  requestBody.thinking = config.thinking;
}

// API call
const response = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": apiKey,
    "anthropic-version": "2023-06-01",
  },
  body: JSON.stringify(requestBody),
});

// Parse response (same for both modes)
const data = await response.json();
const textBlocks = (data.content || []).filter(b => b.type === "text");
const answer = textBlocks[textBlocks.length - 1].text;
```

---

## Shared Configuration

These settings are common across P2 and P3.

### Retrieval Pipeline

```
1. Client: keyword scoring (search-engine.ts) produces ranked chunks
2. Client: sends top 80 chunks to worker
3. Worker: semantic reranking via Workers AI (bge-small-en-v1.5, 384 dims)
4. Worker: keeps top 25 (standard) or 40 (deep) reranked chunks
5. Worker: sends chunks + system prompt + user question to Claude
6. Worker: returns answer + reranked IDs to client
```

### Workers AI Embedding Model

```
Model:      @cf/baai/bge-small-en-v1.5
Dimensions: 384
Batch size: 100
Purpose:    Semantic reranking of keyword-matched chunks
```

### System Prompt Key Directives

```
- Ground answers in OCP policy excerpts with specific policy numbers
- Be thorough and comprehensive; cover all relevant policies and cross-references
- Note weak language (should, could, may consider) vs. mandatory language
- Identify related policies the resident may not have thought to ask about
- Do not use markdown headings; use plain prose with bolded policy numbers
- Do not use em-dashes; use periods, commas, semicolons, or new sentences
- Never give legal advice
```

---

## Cost Comparison

| Proposal | Per Query | 300/mo (10/day) | 600/mo (20/day) | 3,000/mo (100/day) |
|----------|-----------|-----------------|-----------------|---------------------|
| P1       | ~$0.03    | $9              | $18             | $90                 |
| P2       | ~$0.04    | $12             | $24             | $120                |
| P2.5     | ~$0.18    | $54             | $108            | $540                |
| P3       | ~$0.15    | $45             | $90             | $450                |

Pricing based on Anthropic API rates (as of Feb 2026):
- Sonnet 4/4.5: $3 per M input tokens, $15 per M output tokens
- Opus 4.6: $5 per M input tokens, $25 per M output tokens
- Extended thinking tokens are billed at output token rates

Note: P3 is cheaper per query than P2.5 despite using Opus, because Opus 4.6 pricing ($5/$25) is lower than earlier Opus models, and P2.5 generates ~10K thinking tokens billed at the output rate.

---

## Common Pitfalls

1. **Wrong model string for Sonnet 4.5**: The date suffix 20250514 is Sonnet 4, NOT Sonnet 4.5. Use 20250929 for Sonnet 4.5.
2. **Date suffix on Opus 4.6**: Use "claude-opus-4-6" with no date suffix.
3. **Invalid API version**: Only "2023-06-01" is valid. Do not use "2025-04-01" or other values.
4. **Manual thinking on Opus 4.6**: Use { type: "adaptive" }, not { type: "enabled", budget_tokens: N }. Manual mode is deprecated on Opus 4.6.
5. **Temperature with thinking**: Extended thinking is NOT compatible with temperature or top_k parameters. Omit them entirely.
6. **Response parsing**: With thinking enabled, the response contains thinking blocks before text blocks. Always filter for type === "text" and take the last one.
