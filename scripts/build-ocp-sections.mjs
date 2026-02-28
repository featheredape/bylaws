#!/usr/bin/env node
// Build OCP sections from ocp_chunks_v2.json
// Groups 1,202 chunks into 10 OCP section keys for query.ts

import { readFileSync, writeFileSync } from "fs";

const chunks = JSON.parse(readFileSync("datasets/ocp_chunks_v2.json", "utf-8"));

// ─── Map each sectionTitle to one of the 10 OCP keys ───────────────
const TITLE_TO_KEY = {
  // goals_environment
  "Community Objectives": "goals_environment",
  "The Island Environment": "goals_environment",
  "Climate Change and Energy Efficiency": "goals_environment",
  "Natural Hazard Areas": "goals_environment",
  "Island Heritage": "goals_environment",
  "Ganges Heritage Conservation Area": "goals_environment",

  // residential
  "Residential Land Use": "residential",

  // commercial
  "Non-Village Commercial and General Employment": "commercial",

  // community
  "Community & Institutional Land Use": "community",

  // villages
  "Village Land Use": "villages",

  // agricultural
  "Resource Land Use (Agriculture, Forestry)": "agricultural",

  // parks
  "Park and Recreation Land Use": "parks",

  // conservation
  "Conservation Land Use": "conservation",
  "Shoreline and Aquatic Use": "conservation",

  // infrastructure
  "General Infrastructure Objectives": "infrastructure",
  "Potable Water Supply": "infrastructure",
  "Waste Management": "infrastructure",
  "Transportation Servicing": "infrastructure",
  "Power and Telecommunications": "infrastructure",

  // dpa
  "DPA 1: Island Villages": "dpa",
  "DPA 2: Non-Village Commercial": "dpa",
  "DPA 3: Shoreline": "dpa",
  "DPA 4: Lakes, Streams and Wetlands": "dpa",
  "DPA 5: Community Well Capture Zones": "dpa",
  "DPA 6: Unstable Slopes and Soil Erosion": "dpa",
  "DPA 7: Riparian Areas": "dpa",

  // Appendices & admin → skip or put into relevant sections
  "Appendix 2: Shared Residential Zoning": "residential",
  "Appendix 3: Amenity Zoning": "villages",
  "Appendix 4: Transfer of Development Potential": "residential",
  "Temporary Use Permits": "commercial",
  "Implementation": "goals_environment",

  // Definitions → distribute to the most relevant section
  // We'll handle these specially below

  // Administrative/structural → skip
  "The Official Community Plan": null,
  "Structure and Format": null,
  "Authority and Interpretation": null,
  "Administration": null,
  "Background Information": null,
  "Monitoring Success": null,
  "Future Amendments and Reviews": null,
  "Severability": null,
  "A": null,
  "B": null,
};

// Map definitions to relevant OCP keys
const DEFINITION_TO_KEY = {
  "affordable housing": "residential",
  "bed and breakfast": "commercial",
  "agri-tourism": "agricultural",
  "agricultural land": "agricultural",
  "breakwater": "conservation",
  "building": null,
  "bulkhead": "conservation",
  "conservation": "conservation",
  "dock": "conservation",
  "environmentally sensitive area": "goals_environment",
  "excavation": null,
  "floor area, gross": "residential",
  "floor space ratio": "residential",
  "general employment": "commercial",
  "groin": "conservation",
  "guest house": "commercial",
  "high biodiversity area": "goals_environment",
  "home-based business": "commercial",
  "impervious surface": "dpa",
  "industry": "commercial",
  "industry, heavy": "commercial",
  "institutional use": "community",
  "jetty": "conservation",
  "manufactured home park": "residential",
  "marina": "conservation",
  "multifamily use": "residential",
  "neighbourhood convenience services": "villages",
  "non-automotive": "infrastructure",
  "parking lot": "infrastructure",
  "parking space": "infrastructure",
  "pier": "conservation",
  "residential use, high density": "residential",
  "residential use, low density": "residential",
  "residential use, medium density": "residential",
  "residential use, very low density": "residential",
  "revetment": "conservation",
  "seniors' dwelling unit": "residential",
  "seniors' supportive housing": "residential",
  "sign": "villages",
  "special needs housing": "residential",
  "sustainability": "goals_environment",
  "sustainable": "goals_environment",
  "tourist hostel": "commercial",
  "accretion shoreforms": "conservation",
};

// ─── Group chunks ──────────────────────────────────────────────────
const groups = {};
const unmapped = new Set();

for (const chunk of chunks) {
  let key;

  // Check if it's a definition
  if (chunk.sectionTitle.startsWith("Definition: ")) {
    const term = chunk.sectionTitle.replace("Definition: ", "");
    key = DEFINITION_TO_KEY[term];
    if (key === undefined) {
      unmapped.add(chunk.sectionTitle);
      continue;
    }
    if (key === null) continue; // skip
  } else {
    key = TITLE_TO_KEY[chunk.sectionTitle];
    if (key === undefined) {
      unmapped.add(chunk.sectionTitle);
      continue;
    }
    if (key === null) continue; // skip
  }

  if (!groups[key]) groups[key] = [];
  groups[key].push(chunk);
}

if (unmapped.size > 0) {
  console.error("⚠ Unmapped sectionTitles:", [...unmapped]);
}

// ─── Build section content ─────────────────────────────────────────
// Sort chunks within each group by ID to preserve document order
const sortById = (a, b) => {
  // IDs like "A.1", "B.2.3.a" — sort lexicographically by parts
  const pa = a.id.split(".");
  const pb = b.id.split(".");
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    const va = pa[i] || "";
    const vb = pb[i] || "";
    const na = parseInt(va), nb = parseInt(vb);
    if (!isNaN(na) && !isNaN(nb)) {
      if (na !== nb) return na - nb;
    } else {
      if (va < vb) return -1;
      if (va > vb) return 1;
    }
  }
  return 0;
};

// Policy-relevance scoring: chunks with regulatory language score higher
const policyScore = (text) => {
  const t = text.toLowerCase();
  let score = 0;
  const policyTerms = [
    "shall", "must", "require", "prohibit", "permit", "not permit",
    "restrict", "regulate", "setback", "buffer", "minimum", "maximum",
    "density", "zone", "designation", "bylaw", "regulation",
    "not allow", "encourage", "support", "ensure", "maintain",
  ];
  for (const term of policyTerms) {
    if (t.includes(term)) score += 2;
  }
  // Bonus for specific measurements/numbers
  if (/\d+\s*(?:m|metres|meters|hectares|ha|km|units|%)/i.test(text)) score += 3;
  // Penalty for very short chunks (likely headers/labels)
  if (text.length < 50) score -= 5;
  return score;
};

const CHAR_BUDGET = 6000; // per section

const sections = {};
const stats = [];

for (const [key, groupChunks] of Object.entries(groups)) {
  groupChunks.sort(sortById);

  // Build full content with section headers on title transitions
  let content = "";
  let lastTitle = "";
  const allParts = [];

  for (const chunk of groupChunks) {
    let part = "";
    if (chunk.sectionTitle !== lastTitle) {
      part += `\n[${chunk.sectionTitle}]\n`;
      lastTitle = chunk.sectionTitle;
    }
    part += chunk.text + "\n";
    allParts.push({ part, score: policyScore(chunk.text), len: part.length });
  }

  const totalChars = allParts.reduce((s, p) => s + p.len, 0);

  if (totalChars <= CHAR_BUDGET) {
    // Fits within budget — use everything
    content = allParts.map(p => p.part).join("");
  } else {
    // Over budget — prioritize high-scoring chunks
    // Always include all section title headers
    // Sort by score descending, take until budget filled
    const indexed = allParts.map((p, i) => ({ ...p, i }));

    // Keep first chunk of each section title group (for context)
    const titleFirsts = new Set();
    let currentTitle = "";
    for (let i = 0; i < groupChunks.length; i++) {
      if (groupChunks[i].sectionTitle !== currentTitle) {
        currentTitle = groupChunks[i].sectionTitle;
        titleFirsts.add(i);
      }
    }

    // Score-rank non-first chunks
    const mustInclude = indexed.filter(p => titleFirsts.has(p.i));
    const candidates = indexed.filter(p => !titleFirsts.has(p.i));
    candidates.sort((a, b) => b.score - a.score);

    let used = mustInclude.reduce((s, p) => s + p.len, 0);
    const selected = new Set(mustInclude.map(p => p.i));

    for (const c of candidates) {
      if (used + c.len > CHAR_BUDGET) continue;
      selected.add(c.i);
      used += c.len;
    }

    // Reconstruct in original order
    content = allParts
      .filter((_, i) => selected.has(i))
      .map(p => p.part)
      .join("");
  }

  sections[key] = content.trim();
  stats.push({
    key,
    chunks: groupChunks.length,
    totalChars,
    outputChars: sections[key].length,
    trimmed: totalChars > CHAR_BUDGET,
  });
}

// ─── Output ────────────────────────────────────────────────────────
writeFileSync("scripts/ocp-sections-output.json", JSON.stringify(sections, null, 2));

console.log("\n=== OCP Section Build Results ===\n");
let grandTotal = 0;
for (const s of stats.sort((a, b) => a.key.localeCompare(b.key))) {
  console.log(
    `${s.key.padEnd(20)} ${String(s.chunks).padStart(4)} chunks  ${String(s.totalChars).padStart(7)} chars → ${String(s.outputChars).padStart(6)} chars${s.trimmed ? " (trimmed)" : ""}`
  );
  grandTotal += s.outputChars;
}
console.log(`\nTotal output: ${grandTotal} chars (~${Math.round(grandTotal / 4)} tokens)`);
console.log(`\nOutput written to: scripts/ocp-sections-output.json`);
