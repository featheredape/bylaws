#!/usr/bin/env node
// Test that queries route to the expected OCP sections
// Run: node scripts/test-routing.mjs

// Simulate the keyword scoring from query.ts
const SECTION_KEYWORDS = {
  goals_environment: ["environmentally sensitive", "esa", "sensitive area", "biodiversity", "climate change", "energy efficiency", "ghg", "greenhouse gas", "carbon", "leed", "renewable energy", "solar", "wind power", "carbon budget", "natural hazard", "flooding", "flood", "unstable slope", "wildfire", "firesmart", "erosion", "geotechnical", "heritage", "archaeological", "archaeology", "first nations", "heritage conservation", "heritage building", "heritage site", "greenway", "conservation target", "ecosystem"],
  residential: ["secondary suite", "suite", "housing", "residential density", "affordable housing", "special needs housing", "flexible housing", "seasonal cottage", "cottage", "settlement pattern", "duplex", "multi-family", "multifamily", "strata", "dwelling", "rental", "home", "house", "neighbourhood", "density", "floor area", "owner occupied", "live in", "tenant", "renter", "apartment", "townhouse", "cluster housing", "supportive housing", "seniors", "seniors housing", "flexible unit", "transfer of development"],
  commercial: ["tourism", "tourist", "accommodation", "hotel", "motel", "resort", "bed and breakfast", "b&b", "campground", "rv park", "hostel", "guest house", "time-share", "timeshare", "convention centre", "home-based business", "home business", "home occupation", "light manufacturing", "general employment", "industrial", "heavy industry", "extractive", "mining", "mineral", "petroleum", "commercial services", "retail outside village", "destination resort", "water slide", "theme park", "casino", "temporary use permit", "temporary use", "moratorium"],
  community: ["school", "education", "child care", "daycare", "day care", "hospital", "health services", "medical", "dental", "health care", "emergency", "fire hall", "fire station", "ambulance", "church", "cemetery", "community hall", "cultural", "institutional", "government", "library", "recreation facility"],
  villages: ["ganges", "fulford", "channel ridge", "village", "village core", "commercial village", "pedestrian", "drive-in", "village designation", "village containment", "village boundary", "village character", "ferry terminal", "harbour", "harbor", "3-storey", "three storey", "post office", "bank", "credit union", "liquor store", "village green", "amenity zoning"],
  agricultural: ["agriculture", "agricultural", "alr", "agricultural land reserve", "farm", "farming", "farmland", "agri-tourism", "agritourism", "abattoir", "livestock", "crop", "orchard", "vineyard", "farm building", "farmworker", "farm worker", "food security", "farmers market", "alc", "agricultural land commission", "non-farm use", "farm use", "forestry"],
  parks: ["park", "parks", "recreation", "trail", "pathway", "park land", "parkland", "park dedication", "subdivision park", "portlock", "recreational", "sports", "athletic", "crown land", "public open space", "water access", "community green", "playground", "ball park"],
  conservation: ["watershed", "ecology", "ecological", "conservation", "shoreline", "marine", "aquatic", "wetland", "lake", "stream", "waterfront", "water body", "maxwell lake", "islet", "upland", "nature reserve", "fish habitat", "aquaculture", "foreshore", "beach", "swimming", "dock", "float", "boat", "marina", "mooring", "ocean", "ecological reserve", "bulkhead", "breakwater", "groin", "jetty", "pier", "revetment"],
  infrastructure: ["water supply", "potable water", "well", "sewer", "sewage", "septic", "waste management", "solid waste", "liquid waste", "road", "transportation", "transit", "bicycle", "cycling", "pathway", "parking", "parking lot", "off-site parking", "water system", "nsswd", "north salt spring waterworks", "power", "telecom", "electromagnetic", "ferry", "airstrip", "servicing", "infrastructure", "drainage"],
  dpa1: ["development permit", "dpa", "permit area", "form and character", "village permit", "ganges permit", "fulford permit", "building design", "commercial design", "storefront", "signage design", "pedestrian", "streetscape", "mixed use building"],
  dpa2: ["development permit", "dpa", "permit area", "non-village commercial", "general employment permit", "screening", "landscaping requirement", "commercial design", "commercial building", "industrial design", "outside village"],
  dpa3: ["development permit", "dpa", "permit area", "shoreline permit", "shoreline development", "shoreline stabilization", "bulkhead", "breakwater", "revetment", "seawall", "rockwall", "rock wall", "riprap", "dock permit", "dock", "float", "pier", "wharf", "dredg", "foreshore", "natural boundary of the sea", "erosion", "shoreline protection", "impervious surface", "accretion", "groin", "jetty"],
  dpa4: ["development permit", "dpa", "permit area", "lake permit", "stream permit", "wetland permit", "lake setback", "stream setback", "natural boundary", "fish habitat", "vegetation removal", "tree removal"],
  dpa5: ["development permit", "dpa", "permit area", "well capture", "capture zone", "drinking water", "groundwater", "aquifer", "well protection"],
  dpa6: ["development permit", "dpa", "permit area", "unstable slope", "soil erosion", "geotechnical", "landslide", "slope hazard", "steep slope", "retaining wall", "erosion", "bluff", "slope stability"],
  dpa7: ["development permit", "dpa", "permit area", "riparian", "streamside", "spea", "fish habitat", "fish protection", "environmental professional", "qep", "riparian buffer", "stream setback", "watercourse", "tree removal", "vegetation removal"],
};

const OCP_KEYS = Object.keys(SECTION_KEYWORDS);

function scoreQuery(query) {
  const q = query.toLowerCase();
  const scored = [];

  for (const [section, keywords] of Object.entries(SECTION_KEYWORDS)) {
    let score = 0;
    const matched = [];
    for (const kw of keywords) {
      if (q.includes(kw)) {
        const pts = kw.length > 10 ? 3 : kw.length > 5 ? 2 : 1;
        score += pts;
        matched.push(kw);
      }
    }

    // Definition boost
    if (/\b(?:definition|define|what is a|what does .+ mean)\b/i.test(query) && score > 0) {
      score += 3;
    }

    if (score > 0) scored.push({ section, score, matched });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 4); // top 4 OCP
}

// ─── Test cases ─────────────────────────────────────────────────────
const tests = [
  { query: "I want to build a rockwall on my shoreline in DPA 3", expect: ["dpa3"] },
  { query: "Can I build a dock on my waterfront property?", expect: ["dpa3", "conservation"] },
  { query: "Riparian setback requirements near a fish-bearing stream", expect: ["dpa7"] },
  { query: "Building near a well capture zone, what permits do I need?", expect: ["dpa5"] },
  { query: "My property is on a steep slope, what are the development rules?", expect: ["dpa6"] },
  { query: "Form and character guidelines for a new storefront in Ganges", expect: ["dpa1", "villages"] },
  { query: "Commercial building design outside the village", expect: ["dpa2"] },
  { query: "Vegetation removal near a lake on my property", expect: ["dpa4"] },
  { query: "Secondary suite in R4 zone", expect: ["residential"] },
  { query: "Can I subdivide my A1 farmland?", expect: ["agricultural"] },
  { query: "What is the definition of bulkhead?", expect: ["conservation"] },
  { query: "Cabin resort in CA2 zone", expect: ["commercial"] },
  { query: "Lake setbacks in R6", expect: ["conservation"] },
  { query: "Workshop on R4 lot", expect: [] },  // may not match OCP specifically
  { query: "Farmworker dwelling on A1", expect: ["agricultural"] },
  { query: "Septic system near St. Mary Lake", expect: ["infrastructure"] },
  { query: "Heritage building in Ganges", expect: ["goals_environment", "villages"] },
  { query: "Can I build a breakwater for my marina?", expect: ["dpa3", "conservation"] },
  { query: "Tree removal near a stream on my property", expect: ["dpa4", "dpa7"] },
  { query: "Erosion protection on my shoreline bluff", expect: ["dpa3", "dpa6"] },
];

let passed = 0;
let failed = 0;

console.log("=== OCP Section Routing Tests ===\n");

for (const t of tests) {
  const results = scoreQuery(t.query);
  const selected = results.map(r => r.section);

  // Check if all expected sections appear in the results
  const missing = t.expect.filter(e => !selected.includes(e));
  const ok = missing.length === 0;

  if (ok) {
    passed++;
    console.log(`✅ "${t.query}"`);
    console.log(`   → ${selected.join(", ") || "(no OCP match)"}`);
  } else {
    failed++;
    console.log(`❌ "${t.query}"`);
    console.log(`   → got: ${selected.join(", ") || "(none)"}`);
    console.log(`   → missing: ${missing.join(", ")}`);
    if (results.length > 0) {
      console.log(`   → scores: ${results.map(r => `${r.section}(${r.score})`).join(", ")}`);
    }
  }
  console.log();
}

console.log(`\n${passed}/${tests.length} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
