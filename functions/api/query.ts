interface Env {
  CLAUDE_API_KEY: string;
}

// ═══════════════════════════════════════════════════════════════════
// LUB 355 — Always included
// ═══════════════════════════════════════════════════════════════════

const LUB_355 = `
═══════════════════════════════════════
LAND USE BYLAW No. 355 (Consolidated March 2025)
═══════════════════════════════════════

GENERAL REGULATIONS (LUB 355)

DEFAULT HEIGHT (Section 3.8): 10.7 metres unless zone-specific limit applies.
DEFAULT SETBACKS (Section 4.3): Front 4.5m, Rear 7.5m, Side 1.5m, Exterior side 3.0m.

═══════════════════════════════════════
ZONE REGULATIONS SUMMARY
═══════════════════════════════════════

AGRICULTURAL ZONES (Part 9.1):
• A1 – Agricultural 1: Lot coverage 5%, height 10.7m, setbacks F:7.5m R:7.5m S:3.0m, min lot 2 ha. Permitted: agricultural operations, farm buildings, one single-family dwelling, farmworker dwelling, home-based business (conditional).
• A2 – Agricultural 2: Same as A1 plus farm-related tourism (conditional).

COMMERCIAL ZONES (Part 9.2):
• C1 – Commercial 1: Lot coverage 50%, height 10.7m, setbacks F:4.5m R:7.5m S:1.5m, min lot 0.4 ha. Permitted: retail, offices, restaurants, personal services, entertainment.
• C2 – Commercial 2: Lot coverage 45%, height 10.7m, setbacks F:7.5m R:7.5m S:3.0m, min lot 0.5 ha. Permitted: retail, restaurants, offices, automotive service.

COMMERCIAL ACCOMMODATION ZONES (Part 9.3):
• CA1 – Commercial Accommodation 1: Lot coverage 30%, height 10.7m, setbacks F:7.5m R:7.5m S:3.0m, min lot 0.4 ha. Permitted: hotel, B&B, guest accommodation, campground.
• CA2 – Commercial Accommodation 2: Lot coverage 25%, height 10.7m, setbacks F:10m R:10m S:5m, min lot 0.8 ha. Permitted: resort, campground, recreation.

FORESTRY ZONES (Part 9.6):
• F1 – Forestry 1: Height 10.7m, min lot 8 ha. Permitted: forestry, single-family dwelling.
• F2 – Forestry 2: Height 10.7m, min lot 8 ha. Permitted: forestry, potential second dwelling.

GENERAL EMPLOYMENT ZONES (Part 9.7):
• GE1 – General Employment 1: Lot coverage 75%, height 10.7m, setbacks F:4.5m R:6m S:6m ES:6m, min lot 0.6 ha. Permitted: light industrial, warehousing, workshops.
• GE2 – General Employment 2: Lot coverage 66%, height 10.7m, setbacks F:4.5m R:6m S:6m ES:7.5m, min lot 0.6 ha. Permitted: general employment, outdoor storage.
• GE3 – General Employment 3: Lot coverage 33%, height 11m, setbacks F:4.5m R:7.5m S:7.5m ES:7.5m, min lot 0.6 ha. Permitted: marine-related employment.

PARKS AND RESERVES (Part 9.8):
• PR1: Lot coverage 33%. Permitted: active parks, recreation.
• PR2: Lot coverage 5%. Permitted: nature reserves, passive recreation.

RESIDENTIAL ZONES (Part 9.9):
• R1 – Residential 1: Lot coverage 33%, height 10.7m, setbacks F:4.5m R:7.5m S:1.5m ES:3.0m, max density 37 units/ha. Permitted: single-family dwelling, duplex, secondary suite (conditional), home-based business (conditional).
• R2 – Residential 2: Lot coverage 25%, height 10.7m, setbacks F:4.5m R:7.5m S:1.5m ES:3.0m, max density 25 units/ha. Permitted: single-family dwelling, secondary suite (conditional).
• R3 – Residential 3: Lot coverage 33%, height 4.5m (lower!), setbacks F:4.5m R:7.5m S:1.5m, min lot 0.3 ha, max density 20 units/ha, max floor area 185 sqm. Mobile home parks.
• R4 – Residential 4: Lot coverage 33%, height 10.7m, setbacks F:4.5m R:7.5m S:1.5m, min lot 1 ha, max density 12 units/ha. Low-density residential.
• R5 – Residential 5: Lot coverage 33%, height 10.7m. Multi-unit, max 4 units/lot, max floor area 67 sqm.
• R6 – Residential 6: Lot coverage 33%, height 10.7m, max 2 units/lot. Mixed residential.
• R7 – Residential 7: Lot coverage 33%, height 10.7m, min lot 0.6 ha, max 1 unit/lot. Residential + community facilities (max 930 sqm).
• R10 – Residential 10: Lot coverage 10%, height 10.7m, min lot 0.3 ha, max 1 unit/lot. Conservation-oriented.
• R11 – Residential 11: Lot coverage 30%, height 10.7m, max density 35 units/ha. Cluster residential.
• R12 – Residential 12: Lot coverage 33%, height 7.6m, max floor area 95 sqm. Compact residential.
  - R12a variation: seniors' supportive housing, dental/medical offices, max 50 dwelling units, 13m height for 3-storey.

RURAL / UPLAND / WATERSHED ZONES (Part 9.10):
• RU1 – Rural 1: Lot coverage 5%, height 10.7m, setbacks F:7.5m R:7.5m S:3m, min lot 4 ha. Permitted: single-family dwelling, agriculture, forestry.
• U1 – Upland 1: Lot coverage 5%, height 10.7m, setbacks F:10m R:10m S:5m, min lot 8 ha. Permitted: dwelling, forestry, conservation.
• W1 – Watershed 1: Lot coverage 3%, height 8.5m (reduced!), setbacks F:15m R:15m S:7.5m, min lot 10 ha. Permitted: dwelling, conservation, forestry. Most restrictive zone.

SHORELINE ZONES (Part 9.11):
• S1 – Shoreline 1: Lot coverage 10%, height 7.5m (reduced!), setbacks F:15m(from water) R:7.5m S:3m, min lot 0.5 ha. Permitted: dwelling, dock, boathouse, water-dependent uses.
• S2 – Shoreline 2: Lot coverage 20%, height 10.7m, setbacks F:10m(from water) R:10m S:5m, min lot 0.8 ha. Permitted: commercial accommodation, resort, recreation, restaurants.

═══════════════════════════════════════
SPECIAL REGULATIONS
═══════════════════════════════════════

HOME-BASED BUSINESSES (Part 3): Permitted in most residential/rural zones with conditions – must be secondary to residential use, limited floor area, limited signage, no outside employees (varies), no nuisance.

SECONDARY SUITES: Permitted in many residential zones subject to conditions – typically max one per lot, must meet building code, parking requirements.

ACCESSORY BUILDINGS: Subject to height, setback, and lot coverage regulations of the zone. Usually limited in floor area.

WATER SETBACKS: Buildings near watercourses require setbacks from the natural boundary of the sea or a lake/stream. Typically 15m from the sea, 30m from lakes, 15m from streams (varies by zone and development permit area).

AGRICULTURAL LAND RESERVE (ALR): Properties in the ALR have additional restrictions per the Agricultural Land Commission Act. Farm use takes priority. Non-farm uses require ALC approval.

DEVELOPMENT PERMIT AREAS (DPA): OCP 434 designates DPAs for environmental protection, hazard areas, and form/character. Development in DPAs requires a development permit.

TEMPORARY USE PERMITS: The Local Trust Committee may issue temporary use permits for uses not otherwise permitted in a zone, for up to 3 years (renewable).

VARIANCES: Minor variances to setback, lot coverage, or other regulations may be granted by the Board of Variance if hardship is demonstrated.
`;

// ═══════════════════════════════════════════════════════════════════
// OCP 434 SECTIONS — Included dynamically based on user selection
// ═══════════════════════════════════════════════════════════════════

const OCP_SECTIONS: Record<string, string> = {

goals_environment: `
═══════════════════════════════════════
OCP 434 — PART A: ISLAND-WIDE GOALS (Environment, Climate, Hazards, Heritage)
═══════════════════════════════════════

A.5 THE ISLAND ENVIRONMENT
A.5.1.7 Secure at least 30% of island land base for conservation via Community Greenways system.
A.5.2.2 Environmentally Sensitive Areas (ESAs) shown on Maps 9-12. Rezoning to transfer development potential from ESAs considered (Appendix 4).
A.5.2.5 PROHIBITION: No zoning changes resulting in more development or greater impacts on Environmentally Sensitive Areas.
A.5.2.8 DPA designations for threatened/endangered species habitat, Crown foreshore, wetland, stream and riparian corridors.
A.5.2.9 DPA designations for watershed protection of community surface water supplies.
A.5.2.13 Ecosystem-based approach to site planning and development using current best practices.
A.5.2.17 Consultation with farming community required — must develop mutually acceptable management solutions protecting sensitive environments without prohibiting farming.

A.6 CLIMATE CHANGE AND ENERGY EFFICIENCY
GHG emission reduction targets (from 2007 baseline): 15% by 2015, 40% by 2020, 85% by 2050.
A.6.2.1 Development Approval Information Bylaw may require climate change mitigation/adaptation criteria (energy efficiency, renewable energy, carbon sequestration) for significant new development.
A.6.2.2 MANDATORY: Energy efficiency attributes and climate change impacts must be considered in ALL rezoning applications proposing increased density or significant change of use.
A.6.2.3 Rezoning for significant density increase or change of use may require: projected carbon budget calculation OR demonstration of LEED Neighbourhood Design conformity or equivalent.
A.6.2.5 Support affordable housing rezoning incorporating climate change mitigation measures.
A.6.2.10 Energy-efficient building design exceeding BC Building Code is eligible community amenity for density exchange.
A.6.2.11 Energy efficiency and climate impact criteria incorporated in transfer of development potential applications.
A.6.2.16 Consider relaxing height restrictions for solar and wind power generation on residential lots.
A.6.2.17 Support small-scale zero-carbon renewable power for new/existing development (must be on same or adjacent site).

A.7 NATURAL HAZARD AREAS
A.7.1.1 Guide development away from unstable slopes, highly erodible soils, wildfire areas, flooding potential.
A.7.1.2 MANDATORY: Avoid creating new flooding hazards or aggravating existing ones from stormwater drainage changes.
A.7.2.1 Zoning includes setbacks from water bodies per Ministry of Environment. May establish elevation requirements above flood-prone areas.
A.7.2.2 MANDATORY: Large new commercial/GE/multifamily in villages must ensure development does not increase flooding of downslope properties (via Development Permit or LUB regulations).
A.7.2.4 PROHIBITION: No rezoning to increase development in areas with natural hazards (Maps 13-14).
A.7.2.8 Support wildfire hazard reduction and FireSmart initiatives. Consider DPA designation for wildfire hazard.

A.8 ISLAND HERITAGE
Heritage Conservation Act takes precedence — protected archaeological sites may NOT be destroyed, excavated, or altered without Provincial permit.
A.8.2.5 Rezoning for development potential transfer from heritage sites considered (Appendix 4).
A.8.2.6 Restoration and heritage designation of buildings is eligible community amenity for density exchange.
A.8.2.9 When rezoning on land with known heritage/archaeological/First Nations sites, ensure features would NOT be damaged.
A.8.2.12 MANDATORY FOR ALL APPLICATIONS: All development applications shall be reviewed for known archaeological sites and significant potential for unrecorded sites. Applicants MUST be notified if within known or potential archaeological area. May require professional consulting archaeologist. Best practice: modify plans to AVOID archaeological impacts. Provincial Heritage Alteration Permit required before any land-altering activities at protected sites. PROHIBITION: No zoning changes resulting in significant disturbance to archaeological sites.
`,

residential: `
═══════════════════════════════════════
OCP 434 — B.2: RESIDENTIAL LAND USE OBJECTIVES AND POLICIES
═══════════════════════════════════════

B.2.1 HOUSING QUANTITY
B.2.1.1.1 Support mix of housing types without compromising natural environment protection.
B.2.1.2.1 Avoid zoning changes that would increase island population beyond 2008 development potential. Exceptions only for affordable housing and other Plan objectives.

B.2.2 AFFORDABLE, RENTAL AND SPECIAL NEEDS HOUSING
B.2.2.2.3 All rezoning for affordable housing requires evidence of: need, adequate water, sewage disposal, energy/water efficient design, no ecosystem degradation, no hazardous area siting.
B.2.2.2.5 Land for affordable housing is eligible community amenity exchangeable for higher density.
B.2.2.2.6 Significant residential density increases should require affordable housing provision.
B.2.2.2.8 Affordable homes above commercial buildings allowed; third storey if view corridors considered.

FLEXIBLE HOUSING UNITS
B.2.2.2.10 Flexible unit dwellings (1–3 units, max 2 storeys, max floor area) only on lots >1.2 ha or in village areas.
B.2.2.2.13 Flexible unit dwellings should not be strata-titled.

SECONDARY SUITES (B.2.2.2.15)
a. Max one suite per dwelling
b. Owner occupies principal dwelling or suite
c. Only in areas with adequate potable water
d. Not in community water supply watersheds or well capture zones
e. Development permit required for suites in sensitive/hazardous areas
f. No short-term rental use
g. Max 40% of principal dwelling floor area, max 90 m²
h. Must comply with BC Building Code and health standards
i-n. Housing agreements, CRD coordination, incremental zoning changes, annual registration

SEASONAL COTTAGES (B.2.2.2.16)
Continue where currently allowed. May allow as full-time affordable rental. Max 90 m² on lots ≥2 ha.

B.2.3 SETTLEMENT PATTERNS
B.2.3.1.2 Redirect settlement to clusters with open space. Guide development toward villages/hamlets.
B.2.3.2.3 Village containment boundaries (Ganges, Fulford, Channel Ridge): keep compact, prevent leap-frog. No large commercial/institutional/multifamily outside Village Designations.
B.2.3.2.4 Subdivision applicants encouraged to cluster lots onto best development land, away from agriculture/forestry/environmental areas.

B.2.4 RESIDENTIAL NEIGHBOURHOODS — Min lot sizes per LUB. Could consider higher density for community amenity or development potential transfer.
B.2.5 RURAL NEIGHBOURHOODS — Density max 1 lot per 2 ha (exception: 1 per 1.2 ha for amenity/transfer).
B.2.6 CHANNEL RIDGE — Clusters of medium density; no large commercial/GE/institutional/multifamily; no increase in new lots.
`,

commercial: `
═══════════════════════════════════════
OCP 434 — B.3: NON-VILLAGE COMMERCIAL, TOURISM & GENERAL EMPLOYMENT
═══════════════════════════════════════

B.3.1 TOURISM — ACCOMMODATION AND FACILITIES
B.3.1.2.2 B&B operations allowed as home-based businesses in residential areas.
B.3.1.2.3 PROHIBITION: No transient accommodation in residential zones unless operated as home-based business.
B.3.1.2.5 Small low-impact campgrounds may be considered in Rural Neighbourhoods with appropriate sewage, natural vegetation buffering, services accessible by walking/bicycle. PROHIBITION: No large RV campgrounds.
B.3.1.2.6 Hostel accommodation may be considered in Rural Neighbourhood Designation.
B.3.1.2.7 MORATORIUM: No additional resort/hotel/motel zoning until built units reach at least 80% of 2008 development potential. Future development near lakes/streams restricted if negative freshwater impacts.
B.3.1.2.8 Commercial tourist accommodation in residential areas: max 50 units per operation; floor area standards; vegetation screening next to residential; density and campground standards.
B.3.1.2.9 PROHIBITIONS: No rezoning for large destination resorts, large convention centres, water slides, theme parks, casinos, or mini golf courses.
B.3.1.2.10 PROHIBITION: No time-shared resorts.
B.3.1.2.11 No strata-titling of existing resorts if neighbourhood impacts would exceed owner-managed levels.

B.3.2 HOME-BASED BUSINESSES
B.3.2.2.1 Home-based businesses allowed in all areas where residential use permitted; regulated by zoning.
B.3.2.2.2 Larger home-based industries (light manufacturing, assembly, repair) may be considered if: compatible with quiet rural character, well-screened by vegetation, no negative effect on neighbourhood/environment, guided through Development Permit process.

B.3.3 GENERAL EMPLOYMENT AND COMMERCIAL SERVICES
B.3.3.1.4 PROHIBITION OBJECTIVE: Avoid large-scale heavy industry.
B.3.3.1.6 Industrial waterfront zones primarily for marine-dependent industries.
B.3.3.2.4 PROHIBITION: No zoning changes resulting in net loss of developable general employment land.
B.3.3.2.7 PROHIBITION: No new heavy or extractive industries not needed by community.
B.3.3.2.8 Min lot size reduction to ~0.2 ha in general employment zones may be considered.
B.3.3.2.9 Temporary Use Permits may be issued for temporary industry on non-GE land.
B.3.3.2.11 Up to 2 ha ALR removal for general employment may be supported if site has limited agricultural potential.
B.3.3.2.14 PROHIBITION: No exploration/extraction of peat, metals, minerals, coal, petroleum resources.
`,

community: `
═══════════════════════════════════════
OCP 434 — B.4: COMMUNITY & INSTITUTIONAL LAND USES
═══════════════════════════════════════

B.4.1 GENERAL
B.4.1.1.1 Ensure appropriate land zoned for schools, child care, government, emergency services, health care, cultural buildings.
B.4.1.1.2 Minimize public cost through joint use and clustering of facilities.

B.4.2 EDUCATIONAL AND CHILD CARE
B.4.2.2.1 Educational Designation shown on Map 1; public schools also allowed in other designations by zoning.
B.4.2.2.5 Special requirements for land near Educational Designation:
  a. Adjacent land NOT to be rezoned for uses incompatible with school children safety.
  b. Rezoning must show maintenance of pedestrian/bicyclist routes to schools.
  c. Higher density housing within ~0.8 km should be designed for families.
B.4.2.2.6 Child day care facilities allowed in broad variety of zones.
B.4.2.2.7 Zoning next to Ganges Harbour should NOT interfere with safe school taxi accommodation from Outer Gulf Islands.

B.4.3 HEALTH SERVICES
B.4.3.2.3 Large new health care facilities directed to Health Services Designation or adjacent lands.
B.4.3.2.4 Special requirements for land near Health Services Designation:
  a. Adjacent land NOT to be rezoned for uses incompatible with hospital safety/quiet.
  b. Rezoning must show maintenance of pedestrian routes to health facilities.
  c. Higher density housing within ~0.8 km should be designed for seniors/special needs.
B.4.3.2.6 Medical/dental offices allowed in residential areas by zoning.

B.4.4 EMERGENCY RESPONSE
B.4.4.2.1 Emergency response facilities allowed in most zones; vegetation screening required.
B.4.4.2.2 Subdivision regulations allow appropriately sized parcels for emergency facilities despite minimum parcel sizes.
B.4.4.2.4 Emergency response organizations consulted on emergency access/safety for rezoning/development permit/subdivision applications.
B.4.4.2.5 Emergency-only road connections supported between specific road pairs.

B.4.5 OTHER COMMUNITY USES
B.4.5.2.1 Churches, cemeteries, libraries, community halls allowed in many zones. Low-impact religious retreats in Uplands.
B.4.5.2.3 Community cultural land/facilities eligible community amenity for higher density exchange (Appendix 3).
B.4.5.2.5 Zoning supports use of private/public lands for local community events.
`,

villages: `
═══════════════════════════════════════
OCP 434 — B.5: VILLAGE LAND USE POLICIES
═══════════════════════════════════════

B.5.1 GENERAL VILLAGE OBJECTIVES AND POLICIES
B.5.1.1.1 Compact pedestrian-oriented villages for commercial, institutional, cultural activities with high/medium density residential.
B.5.1.1.2 Modest village scale compatible with rural character and natural/heritage resources.
B.5.1.1.5 Avoid commercial strips along roads into villages.
B.5.1.1.6 Village uses focus on residents' requirements; traditional functions not displaced.

B.5.1.2.2 Max residential density: 37 units/ha. Special needs/affordable seniors' supportive housing may exceed to FSR 0.6, 33% coverage, max 2 storeys, max 50 units.
B.5.1.2.3 No large new retail/restaurants/offices/multifamily outside Village Designations.
B.5.1.2.4 Post offices, banks, credit unions, liquor stores, libraries: only in Village Designations.
B.5.1.2.5 New commercial land in villages only if: compact; existing zones largely developed; near existing commercial/GE/institutional; consistent with DPA; barrier free; sidewalks provided.
B.5.1.2.11 No drive-in commercial uses in villages.

B.5.2 GANGES VILLAGE
B.5.2.2.4 Could consider higher density for community amenity or development potential transfer (subject to NSSWD water capacity).
B.5.2.2.6 Rezoning must consider Ganges sewer treatment plant impact; CRD confirmation of sewage capacity required.
B.5.2.2.9 May allow 3-storey buildings away from shoreline, village core and established view corridors.

B.5.3 FULFORD VILLAGE
B.5.3.1.5 Form/character consistent with traditional small, compact, pedestrian scale.
B.5.3.2.3 Commercial rezoning on residential lots: use existing structure; maintain for village character.
B.5.3.2.5 Only affordable/special needs housing additions until comprehensive local area plan completed.
B.5.3.2.7 No heavy industry or large commercial not needed by south-end residents.
B.5.3.2.13 No development with net negative impact on Fulford Creek estuary, tidal flows, visual sightlines, or inner basin.

B.5.4 CHANNEL RIDGE VILLAGE
B.5.4.1.1 Compact mixed-use village for north-end residents.
B.5.4.1.4 Central village green required.
B.5.4.2.4 Higher density only from Channel Ridge Residential Designation transfers.
`,

agricultural: `
═══════════════════════════════════════
OCP 434 — B.6: AGRICULTURAL LAND USE POLICIES
═══════════════════════════════════════

B.6.1 GENERAL OBJECTIVES
B.6.1.1 Recognize and retain agriculture, forestry, fishing. Maintain and protect land bases.
B.6.1.2 Maximize local economic benefits with value-added processing.

B.6.2 AGRICULTURAL LAND USES
B.6.2.1.1 Farming as social, cultural, economic priority and ecologically responsible land use.
B.6.2.1.2 Maintain long-term farming/agro-forestry potential; preserve agricultural land and water supplies.
B.6.2.1.3 Incorporate Agricultural Land Commission Act, ALR regulations, Farm Practices Protection Act.
B.6.2.1.4 Limit non-farm use of agricultural land.
B.6.2.1.6 Reduce conflict between agricultural areas and higher density settlement.

KEY POLICIES
B.6.2.2.4 Existing uses continue. Existing GE/commercial zones remain unless owner applies for change.
B.6.2.2.6 No bylaw changes to prohibit/restrict farming in ALR or obstruct abattoirs, cold storage, food security facilities.
B.6.2.2.8 Support: additional farm housing; farm uses per ALR Act; processing/warehousing; community farming; farmers' markets; farm worker dwellings; agri-tourism; local livestock.
B.6.2.2.9 Subdivision min lot sizes per existing zoning. Could amend if benefits farming or protects land through clustering.
B.6.2.2.10 Could consider: small-scale forest product processing/sales; farming schools; farm tourist accommodation; waste management — only where farming capability minimal and use wouldn't interfere with productivity.
B.6.2.2.14 ALR subdivision only if: improves farming capability; house site ≤0.6 ha for relative (pre-1972 ownership); clearly in public interest.
B.6.2.2.16 ALC non-farm use/exclusion if: helps active farm diversify without decreasing capability; consistent with zoning/OCP; results in inclusion of non-ALR farmland; essential community services with no non-ALR alternative.
B.6.2.2.17 Rezoning must not reduce water availability for farming.
B.6.2.2.19 Land bordering agriculture: zoning changes must not negatively affect farming; may require vegetation buffer; no detrimental drainage/water pollution.
B.6.2.2.20 No large multifamily/GE/institutional/commercial in Agriculture or Watershed-Agriculture Designation.
B.6.2.2.21 Development Permit process ensures higher-density areas buffered from agriculture.
`,

parks: `
═══════════════════════════════════════
OCP 434 — B.7: PARKS AND RECREATION LAND USE
═══════════════════════════════════════

B.7.1 PARK AND RECREATION DESIGNATION
B.7.1.2.4 Parks zoned (in consultation with Parks Commission, CRD Parks, BC Parks) for: appropriate uses, traditional community uses (day care, intermittent commercial, agriculture).
B.7.1.2.5 PROHIBITIONS: No zoning changes allowing commercial, general employment, or residential developments in Parks Designation. EXCEPTION: Single caretakers' residences permitted.
B.7.1.2.6 Crown Land in Parks Designation should NOT be licensed/leased/sold for non-park private purposes.

B.7.2 ACQUISITION OF PUBLIC RECREATIONAL LAND
B.7.2.2.2 MANDATORY: When land subdivided, park land or money representing up to 5% of subdivided land required. Less than 5% may be considered if other community benefits provided.
B.7.2.2.3 Park land dedication (NOT cash in lieu) required if subdivision in designations listed in Appendix 5 or includes listed land categories.
B.7.2.2.5 Rezoning for development potential transfer considered if results in community acquisition of park/recreation lands or significant trail additions (Appendix 4 guidelines).
B.7.2.2.6 Park/recreation lands or facilities eligible community amenity for higher density exchange (Appendix 3).
B.7.2.2.7 Support Parks Commission ALR applications for: Portlock Park expansion; ~3 ha athletic fields/parking next to Portlock; ~4 ha south-end ballpark replacement. Must refer to Agricultural Advisory Committee; transfer good agricultural soils; offset by encouraging ALR inclusion.
B.7.2.2.11 Trail network additions considered in all new development proposal reviews.
B.7.2.2.13 Subdivision Approving Officer should NOT waive public water access for subdivisions next to water bodies.
B.7.2.2.14 Subdivision should require dedication/construction of public highways for non-vehicular and automobile traffic.

B.7.3 FUTURE RECREATION FACILITIES
B.7.3.2.1 Youth recreation facilities in various Designations may be considered; must show how impacts on environment and residential neighbourhoods reduced.
B.7.3.2.3 MANDATORY: When rezoning for recreation facilities, must minimize impacts on neighbourhood and natural environment.
`,

conservation: `
═══════════════════════════════════════
OCP 434 — B.8-B.9: CONSERVATION & SHORELINE POLICIES
═══════════════════════════════════════

B.8.1 WATERSHED AND ISLET RESIDENTIAL
B.8.1.2.2 Uses continue as currently zoned. No new higher-impact developments.
B.8.1.2.3 Land zoned for watershed protection only: no development potential.
B.8.1.2.4 Subdivision: min 12 ha in Maxwell Lake watershed; min 4 ha in other watersheds.
B.8.1.2.5 Zoning to protect community water supply lakes from septic field impacts.

B.8.2 UPLANDS DESIGNATION
B.8.2.2.2 Very low density residential and low-impact development.
B.8.2.2.3 No large commercial/GE/institutional/multifamily.
B.8.2.2.5 Subdivision min average lot size 8 ha (except Rural zones: min 2 ha).

B.8.3 ECOLOGICAL RESERVE
B.8.3.2.2 Only ecological reserves, outdoor ecological education and research.
B.8.3.2.5 No zoning changes increasing traffic through Ecological Reserve.

B.9 SHORELINE AND AQUATIC USE
B.9.1.1 Protect marine/freshwater shorelines and ecological processes; avoid use conflicts; maintain public access.

B.9.2 SHORELINE CONSERVATION
B.9.2.2.2 No negative impacts to sensitive habitat. No large new developments in or next to designation.

B.9.3 SHORELINE RECREATION
B.9.3.2.2 Only structures/uses not interfering with public beach/swimming. No large new foreshore/water developments.

B.9.4 SHORELINE DEVELOPMENT
B.9.4.2.3 Could consider new GE/commercial/moorage with guidelines for environment, users, First Nations, adjacent properties.
B.9.4.2.4 Marinas must install pump-out facilities for rezoning.

B.9.5 SHORELINE AQUACULTURE
B.9.5.2.2 Existing aquaculture protected. No bylaw changes restricting existing operations.
B.9.5.2.5 Could consider aquaculture (except finfish farming) in low-conflict areas.

B.9.6 OTHER MARINE USE
B.9.6.2.2 Residential dock uses continue. Structures limited to private docks/floats.
B.9.6.2.3 Joint use of private docks encouraged.
B.9.6.2.5 No major new structures near sensitive areas, unstable foreshore, high recreation, aquaculture potential, First Nations sites, heavy marine traffic.
`,

infrastructure: `
═══════════════════════════════════════
OCP 434 — PART C: INFRASTRUCTURE & SERVICING
═══════════════════════════════════════

C.1 GENERAL
C.1.1 Sufficient infrastructure for rural island community needs.
C.1.4 New development servicing costs borne by proponent, not community.

C.2 TRANSPORTATION
C.2.1 Land use encouraging walking, cycling, transit over automotive transport.
C.2.2 Road standards per Map 3; lowest safe design speeds; bicycle/pedestrian network priority (Map 4). Walking/bicycle pathways eligible community amenity for density exchange. DPA guidelines require pedestrian/cyclist support for commercial/GE/multifamily.

C.2.3 PARKING
C.2.3.2.1 Parking for average (not peak) demand in villages; accommodate small vehicle/bicycle standards.
C.2.3.2.4 Offsite parking within walking distance with legal agreements; shared parking for different peak-time uses.
C.2.3.2.13 Satellite parking on Ganges periphery; cash-in-lieu of parking.

C.2.4 WATER TRANSPORT — Retain existing ferry locations.
C.2.5 AIR TRANSPORT — No commercial land-based airstrip; no commercial float planes on lakes.

C.3 POTABLE WATER
C.3.1 PRECAUTIONARY PRINCIPLE: No density/intensity increase in areas with water supply concerns.
C.3.2 COMMUNITY WATER SYSTEMS
C.3.2.2.1 MANDATORY: Rezoning within water system requires referral to operator. No zoning changes if water cannot be supplied under existing licence.
C.3.2.2.2 NSSWD priority: 1) essential services (hospitals, schools), 2) special needs/affordable housing.
C.3.2.2.11 Rezoning increasing water demand: consider agricultural impacts.
C.3.3 PRIVATE WATER
C.3.3.2.1 Upland zones maintain low density to protect groundwater recharge.
C.3.3.2.2 Rezoning: evidence required that neighbours' water not depleted.
C.3.3.2.3 MANDATORY: Proof of adequate potable water required for each new subdivision lot.

C.4 WASTE MANAGEMENT
C.4.2 LIQUID WASTE
C.4.2.2.4 Rezoning in Ganges/Maliview sewer areas: referral to CRD required.
C.4.2.2.8 No zoning changes resulting in waste degrading sewer treatment.
C.4.2.3.1 Rezoning without sewer: evidence required sewage can be treated on-site without reaching surface/water bodies/potable water.
C.4.3 SOLID WASTE — No on-island landfill. No zoning for hazardous/industrial waste disposal.

C.5 POWER/TELECOM — No rezoning for higher density residential/childcare/schools/healthcare where electromagnetic radiation above normal.
`,

dpa: `
═══════════════════════════════════════
OCP 434 — PART E: DEVELOPMENT PERMIT AREAS (DPAs 1–7)
═══════════════════════════════════════

E.1 DPA 1 — ISLAND VILLAGES
Purpose: Form/character of commercial, industrial, multifamily; stormwater; farming protection.
Permits REQUIRED for: subdivision of commercial/GE/multifamily or land adjoining agriculture; new construction on commercial/GE/multifamily needing parking; parking lots >10 spaces; institutional buildings creating >280 m² impervious surface; drainage alteration adjoining agriculture; vegetation removal within 7.5 m of agricultural or residential lot line.
Guidelines: Building setbacks ≥15 m from agriculture; soft landscaping min 40% multifamily, 20% commercial/GE; 8 m vegetated buffer where adjoining agriculture (min 6 m height at maturity); >280 m² impervious = engineer's drainage report; parking behind buildings, max 30 spaces unless mid-lot landscaping; no landmark buildings, frontage max 2.5× height; signs max 20 cm lettering, max 2.5 m², no plastic backlit.

E.2 DPA 2 — NON-VILLAGE COMMERCIAL & GENERAL EMPLOYMENT
Purpose: Form/character outside villages; farming protection.
Permits REQUIRED for: subdivision of commercial/GE or land adjoining agriculture; >15 new tourist units/campsites; new restaurants/pubs/marinas; retail/GE/commercial >185 m²; parking lots >15 spaces visible from public; >280 m² impervious adjoining agriculture; vegetation removal within 8 m of agriculture.
Guidelines: Setbacks ≥15 m from agriculture; vegetated buffer where adjoining residential (3 m; 7.5 m if uses not contained in building); one access point per property preferred; vegetation screen along non-commercial boundaries; >280 m² impervious = engineer's drainage report.

E.3 DPA 3 — SHORELINE
Purpose: Marine environmental protection; waterfront form/character.
Area: Water between natural boundary and 300 m seaward; land within 10 m of natural boundary where marine sensitive.
Permits REQUIRED for: dock additions >35 m², breakwaters, shoreline stabilization, fill, dredging, boat launches, tree/vegetation removal within 10 m, subdivision.
Guidelines: Native vegetation retained/replaced; no new roads/septic; open pile or floating breakwater preferred; no dredging for new facilities; mooring buoys preferred over docks; joint-use docks for multifamily/strata; residential dock floats max 35 m², boats max 2.2 m draft; no parking on water surface/fill; bulkheads last resort, landward of natural boundary.

E.4 DPA 4 — LAKES, STREAMS & WETLANDS
Purpose: Freshwater ecosystem and drinking water protection.
Area: Within 10 m of stream boundary; 300 m of Maxwell Lake; 61 m of all other lakes. DFO recommends 15 m undisturbed from top of bank.
Permits REQUIRED for: tree removal, vegetation removal >9 m², septic within 61 m of lakes (300 m Maxwell), impervious within 10 m of streams, works in streams/below lake boundary, subdivision.
Guidelines: Native vegetation retained; no new roads/septic (professional supervision if unavoidable); septic minimizes nutrient loading/coliform; larger projects need professional surface water/habitat report; conservation covenant for subdivision.

E.5 DPA 5 — COMMUNITY WELL CAPTURE ZONES
Purpose: Drinking water protection from community wells.
Permits REQUIRED for: vegetation removal >280 m², non-residential buildings >70 m², septic fields, fuel storage, subdivision.
Guidelines: Minimize water quality degradation; vegetation removal >280 m² needs stormwater/groundwater plan; hazardous material needs spill containment; professional groundwater report for larger projects.

E.6 DPA 6 — UNSTABLE SLOPES & SOIL EROSION
Purpose: Geotechnical hazard and erosion protection. Based on Maps 23 (erosion) and 24 (slope instability).
Permits REQUIRED for: tree removal >20 cm diameter, vegetation removal >9 m², septic in instability areas, drainage alteration, subdivision.
Guidelines: Erosion/slope prevention plan required; no new structures on instability areas (engineer supervision if unavoidable); professional engineer report for larger projects.

E.7 DPA 7 — RIPARIAN AREAS
Purpose: Fish habitat and riparian ecosystem protection per Fish Protection Act. Applies to Map 28 areas.
Permits REQUIRED for: construction/additions/alterations, vegetation removal, soil disturbance, drainage systems, impervious surfaces, subdivision.
Guidelines: Qualified Environmental Professional (QEP) assessment required per Riparian Areas Regulation; no activity in Streamside Protection and Enhancement Area (SPEA); clearing >280 m² requires security (150% of habitat protection costs); QEP monitoring during construction; may vary subdivision/siting to enhance SPEA protection.
`,

};

// ═══════════════════════════════════════════════════════════════════
// Auto-detect relevant OCP sections from user query
// ═══════════════════════════════════════════════════════════════════

const SECTION_KEYWORDS: Record<string, { keywords: string[]; label: string; icon: string }> = {
  goals_environment: {
    label: "Environment, Climate & Heritage",
    icon: "🌍",
    keywords: [
      "environmentally sensitive", "esa", "sensitive area", "biodiversity",
      "climate change", "energy efficiency", "ghg", "greenhouse gas", "carbon",
      "leed", "renewable energy", "solar", "wind power", "carbon budget",
      "natural hazard", "flooding", "flood", "unstable slope", "wildfire",
      "firesmart", "erosion", "geotechnical",
      "heritage", "archaeological", "archaeology", "first nations",
      "heritage conservation", "heritage building", "heritage site",
      "greenway", "conservation target", "ecosystem",
    ],
  },
  residential: {
    label: "Residential Land Use",
    icon: "🏘️",
    keywords: [
      "secondary suite", "suite", "housing", "residential density", "affordable housing",
      "special needs housing", "flexible housing", "seasonal cottage", "cottage",
      "settlement pattern", "duplex", "multi-family", "multifamily", "strata",
      "dwelling", "rental", "home", "house", "neighbourhood", "density",
      "floor area", "owner occupied", "live in", "tenant", "renter",
      "apartment", "townhouse", "cluster housing", "supportive housing",
    ],
  },
  commercial: {
    label: "Commercial, Tourism & Employment",
    icon: "🏢",
    keywords: [
      "tourism", "tourist", "accommodation", "hotel", "motel", "resort",
      "bed and breakfast", "b&b", "campground", "rv park", "hostel",
      "guest house", "time-share", "timeshare", "convention centre",
      "home-based business", "home business", "home occupation",
      "light manufacturing", "general employment", "industrial",
      "heavy industry", "extractive", "mining", "mineral", "petroleum",
      "commercial services", "retail outside village", "destination resort",
      "water slide", "theme park", "casino",
    ],
  },
  community: {
    label: "Community & Institutional",
    icon: "🏛️",
    keywords: [
      "school", "education", "child care", "daycare", "day care",
      "hospital", "health services", "medical", "dental", "health care",
      "emergency", "fire hall", "fire station", "ambulance",
      "church", "cemetery", "community hall", "cultural",
      "institutional", "government", "library", "recreation facility",
    ],
  },
  villages: {
    label: "Village Land Use",
    icon: "🏪",
    keywords: [
      "ganges", "fulford", "channel ridge", "village", "village core",
      "commercial village", "pedestrian", "drive-in", "village designation",
      "village containment", "village boundary", "village character",
      "ferry terminal", "harbour", "harbor", "3-storey", "three storey",
      "post office", "bank", "credit union", "liquor store",
      "village green",
    ],
  },
  agricultural: {
    label: "Agricultural Land",
    icon: "🌾",
    keywords: [
      "agriculture", "agricultural", "alr", "agricultural land reserve",
      "farm", "farming", "farmland", "agri-tourism", "agritourism",
      "abattoir", "livestock", "crop", "orchard", "vineyard",
      "farm building", "farmworker", "farm worker", "food security",
      "farmers market", "alc", "agricultural land commission",
      "non-farm use", "farm use",
    ],
  },
  parks: {
    label: "Parks & Recreation",
    icon: "🌲",
    keywords: [
      "park", "parks", "recreation", "trail", "pathway",
      "park land", "parkland", "park dedication", "subdivision park",
      "portlock", "recreational", "sports", "athletic",
      "crown land", "public open space", "water access",
      "community green", "playground", "ball park",
    ],
  },
  conservation: {
    label: "Conservation & Shoreline",
    icon: "🌊",
    keywords: [
      "watershed", "ecology", "ecological", "conservation", "shoreline",
      "marine", "aquatic", "wetland", "lake", "stream", "waterfront",
      "water body", "maxwell lake", "islet", "upland", "nature reserve",
      "fish habitat", "aquaculture", "foreshore", "beach", "swimming",
      "dock", "float", "boat", "marina", "mooring", "ocean",
      "ecological reserve",
    ],
  },
  infrastructure: {
    label: "Infrastructure & Servicing",
    icon: "🚰",
    keywords: [
      "water supply", "potable water", "well", "sewer", "sewage",
      "septic", "waste management", "solid waste", "liquid waste",
      "road", "transportation", "transit", "bicycle", "cycling",
      "pathway", "parking", "parking lot", "off-site parking",
      "water system", "nsswd", "north salt spring waterworks",
      "power", "telecom", "electromagnetic", "ferry", "airstrip",
      "servicing", "infrastructure", "drainage",
    ],
  },
  dpa: {
    label: "Development Permit Areas",
    icon: "🛡️",
    keywords: [
      "development permit", "dpa", "permit area", "riparian",
      "well capture", "capture zone",
      "shoreline permit", "shoreline development", "vegetation removal",
      "tree removal", "streamside", "spea", "environmental professional",
      "qep", "form and character", "impervious surface", "buffer",
      "bulkhead", "breakwater", "dredg", "dock permit",
    ],
  },
};

function detectRelevantSections(query: string): string[] {
  const q = query.toLowerCase();
  const scored: { section: string; score: number }[] = [];

  for (const [section, config] of Object.entries(SECTION_KEYWORDS)) {
    let score = 0;
    for (const kw of config.keywords) {
      if (q.includes(kw)) {
        // Longer keywords are more specific, weight them higher
        score += kw.length > 10 ? 3 : kw.length > 5 ? 2 : 1;
      }
    }
    if (score > 0) {
      scored.push({ section, score });
    }
  }

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Always include sections with score > 0, but cap at 4 to manage tokens
  const selected = scored.slice(0, 4).map(s => s.section);

  // If nothing matched, include residential + dpa + goals as sensible defaults
  // (most queries are about building something on residential land)
  if (selected.length === 0) {
    return ["residential", "dpa", "goals_environment"];
  }

  return selected;
}

// ═══════════════════════════════════════════════════════════════════
// System prompt builder
// ═══════════════════════════════════════════════════════════════════

function buildSystemPrompt(selectedSections: string[]): string {
  let context = `You are an expert compliance advisor for Salt Spring Island, British Columbia. You analyze queries against:
- Land Use Bylaw No. 355 (LUB 355), consolidated March 2025
- Official Community Plan Bylaw No. 434 (OCP 434)

${LUB_355}`;

  // Add each selected OCP section
  for (const section of selectedSections) {
    if (OCP_SECTIONS[section]) {
      context += `\n${OCP_SECTIONS[section]}`;
    }
  }

  // Add brief OCP summary for sections NOT selected (so Claude knows they exist)
  const notSelected = Object.keys(OCP_SECTIONS).filter(s => !selectedSections.includes(s));
  if (notSelected.length > 0) {
    context += `\n\n═══════════════════════════════════════
NOTE: The following OCP 434 sections were NOT included in this analysis (user did not select them). If the query touches on these topics, mention that the user should re-run their search with the relevant section enabled:
`;
    const labels: Record<string, string> = {
      goals_environment: "Environment, Climate, Hazards & Heritage (Part A)",
      residential: "Residential Land Use (B.2)",
      commercial: "Commercial, Tourism & General Employment (B.3)",
      community: "Community & Institutional (B.4)",
      villages: "Village Land Use (B.5)",
      agricultural: "Agricultural Land (B.6)",
      parks: "Parks & Recreation (B.7)",
      conservation: "Conservation & Shoreline (B.8–B.9)",
      infrastructure: "Infrastructure & Servicing (Part C)",
      dpa: "Development Permit Areas (DPAs 1–7, Part E)",
    };
    for (const s of notSelected) {
      context += `- ${labels[s] || s}\n`;
    }
  }

  return `${context}

═══════════════════════════════════════
YOUR TASK
═══════════════════════════════════════

When a user describes what they want to build or do on Salt Spring Island, respond with a structured compliance analysis in this EXACT JSON format:

{
  "compliance_status": "likely_compliant" | "likely_non_compliant" | "needs_review" | "insufficient_info",
  "summary": "One clear sentence summarizing the compliance finding.",
  "relevant_bylaws": [
    {
      "reference": "Bylaw No. 355, Section 9.9.2(a)(i)",
      "title": "Short title of the regulation",
      "detail": "How this regulation applies to their query"
    }
  ],
  "recommendations": [
    "Actionable recommendation 1",
    "Actionable recommendation 2"
  ],
  "next_steps": [
    "What they should do next, step 1",
    "Step 2"
  ],
  "warnings": [
    "Important caution or limitation they should know about"
  ]
}

RULES:
1. Always respond in the JSON format above. No text outside the JSON.
2. If the user doesn't specify a zone, make reasonable assumptions and note them.
3. Always include at least one warning about consulting official sources.
4. CRITICAL: In the "reference" field, always provide the FULL bylaw number with complete section, subsection, and clause references. Use the format "Bylaw No. XXX, Section X.X.X(x)(x)" — be as specific as possible. Examples:
   - "Bylaw No. 355, Section 9.9.2(a)(i)" NOT just "LUB 355, Section 9.9"
   - "Bylaw No. 355, Section 3.8.1" NOT just "LUB 355, Height"
   - "Bylaw No. 434, Section B.2.2.2.15(g)" NOT just "OCP 434, Housing"
   - "Bylaw No. 355, Part 9.10, Section 9.10.1(3)" for specific zone subsections
   Include the Part number when relevant. If multiple subsections apply, list them separately as individual entries.
5. Be helpful and specific — don't just say "check with Planning Staff" without first giving your best analysis.
6. If you truly don't have enough information, set status to "insufficient_info" and ask clarifying questions in the summary.
7. Consider both LUB 355 AND any OCP 434 sections provided. Reference OCP sections using their actual policy numbers (e.g., "Bylaw No. 434, B.2.2.2.15(g)").
8. If a relevant OCP section was NOT included in the analysis, mention this in warnings and suggest the user enable it.
`;
}

// ═══════════════════════════════════════════════════════════════════
// Request handler
// ═══════════════════════════════════════════════════════════════════

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { request, env } = context;

  if (!env.CLAUDE_API_KEY) {
    return Response.json(
      { success: false, error: "API key not configured" },
      { status: 500, headers: corsHeaders() }
    );
  }

  let body: { query: string };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body" },
      { status: 400, headers: corsHeaders() }
    );
  }

  if (!body.query || body.query.trim().length < 5) {
    return Response.json(
      { success: false, error: "Please provide a more detailed question" },
      { status: 400, headers: corsHeaders() }
    );
  }

  // Auto-detect relevant OCP sections from the query
  const selectedSections = detectRelevantSections(body.query);

  const systemPrompt = buildSystemPrompt(selectedSections);

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": env.CLAUDE_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 2048,
        system: systemPrompt,
        messages: [{ role: "user", content: body.query }],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API error:", response.status, errorText);
      return Response.json(
        { success: false, error: "Failed to analyze your query. Please try again." },
        { status: 502, headers: corsHeaders() }
      );
    }

    const data: any = await response.json();
    const text = data.content?.[0]?.text ?? "";

    // Parse the JSON from Claude's response
    let analysis;
    try {
      // Extract JSON from response (handle potential markdown wrapping)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(text);
    } catch {
      // If JSON parsing fails, wrap the raw text
      analysis = {
        compliance_status: "needs_review",
        summary: text.slice(0, 300),
        relevant_bylaws: [],
        recommendations: ["Please rephrase your question for a more specific analysis."],
        next_steps: ["Contact Salt Spring Island Planning Staff for assistance."],
        warnings: ["This response could not be structured properly. Please try rephrasing your question."],
      };
    }

    // Build section metadata for frontend display
    const analyzedSections = selectedSections.map(s => ({
      key: s,
      label: SECTION_KEYWORDS[s]?.label || s,
      icon: SECTION_KEYWORDS[s]?.icon || "📄",
    }));

    return Response.json(
      { success: true, data: analysis, analyzed_sections: analyzedSections },
      { headers: corsHeaders() }
    );
  } catch (err) {
    console.error("Query error:", err);
    return Response.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500, headers: corsHeaders() }
    );
  }
};

export const onRequestOptions: PagesFunction = async () => {
  return new Response(null, { status: 204, headers: corsHeaders() });
};

function corsHeaders(): Record<string, string> {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}
