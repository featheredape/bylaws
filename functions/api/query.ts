interface Env {
  CLAUDE_API_KEY: string;
}

// ═══════════════════════════════════════════════════════════════════
// LUB 355 — Sectioned for keyword-based selection
// ═══════════════════════════════════════════════════════════════════

const LUB_SECTIONS: Record<string, string> = {

// ── lub_core: Always included (header + Part 2 General Provisions) ──
lub_core: `
═══════════════════════════════════════
LAND USE BYLAW No. 355 (Consolidated March 2025)
═══════════════════════════════════════

Section 2.1 — APPLICATION: This Bylaw applies to the portion of SSI Local Trust Area within Electoral Area "F" of the Capital Regional District, as shown on Schedule "A".
Section 2.2 — COMPLIANCE: Land/water in the Trust Area must not be used, subdivided, and buildings/structures must not be constructed, altered, located or used, and signs must not be erected except as specifically permitted in this Bylaw.
Section 2.3 — CONFLICTING USE OR SITING: No lot may be subdivided, no building/structure used or sited in a manner which renders any existing use, building or structure on the same lot non-conforming with respect to siting or density.
Section 2.4 — VIOLATION: Any person who does or permits any act in contravention of this Bylaw, or neglects to do anything required by this Bylaw, is deemed to have violated its provisions.
Section 2.5 — PENALTY: Offence against this Bylaw is liable upon summary conviction to a fine not exceeding $5,000 and costs of prosecution. Each day of continued offence is a new and separate offence.
Section 2.6 — ADMINISTRATION AND ENFORCEMENT: The Islands Trust Bylaw Investigation Officer is authorized to enter any lot at any reasonable time to determine whether regulations are being observed.
Section 2.7 — COVENANTS AGAINST BUILDING AND SUBDIVISION: Where a covenant restricting subdivision or development is required, it must be granted to the SSI Local Trust Committee in priority to all financial charges and delivered in registerable form prior to approval.
Section 2.8 — SEVERABILITY: If any provision is held invalid, it is severed and does not affect the validity of remaining portions.

Section 1.2 — NUMBERING: first number = Part; second = Section; third = Subsection; fourth = Article; fifth = Clause. Example: 18 = Part, 18.1 = Section, 18.1.1 = Subsection, 18.1.1(1) = Article, 18.1.1(1)(a) = Clause.
Section 1.3 — INFORMATION NOTES: Paragraphs preceded by "Information Note" in italics are provided only to assist understanding and do not form part of the Bylaw.
Section 1.4 — USE OF ITALICS: Other than Information Notes, italics indicate the term is defined in Section 1.1 Definitions.
`,

// ── lub_definitions: Part 1 — Interpretation ──
lub_definitions: `
═══════════════════════════════════════
LUB 355 — PART 1: INTERPRETATION (Section 1.1 Definitions)
═══════════════════════════════════════

KEY DEFINITIONS (Section 1.1.1):
• "abattoir" — buildings or structures for processing farm products involving handling, slaughter, cutting, wrapping and storage of processed livestock.
• "accessory" — in relation to a use, building or structure: subordinate, customarily incidental and exclusively devoted to a principal use, building or structure expressly permitted by this Bylaw on the same lot; or if on a common property in a bare land strata plan, on a strata lot in that strata plan.
• "agriculture" — the use of land, buildings or structures for a farm operation.
• "agriculture, intensive" — agriculture involving confinement of more than 4550 kg of poultry or livestock, or operation of a fur farm, or manure-based cultivation of mushrooms.
• "alteration" — any change, addition or modification in construction or occupancy of an existing building or structure.
• "aquaculture" — growing and cultivation of aquatic plants or fish for commercial purposes, including shellfish growing on, in, or under the foreshore or in the water.
• "basement" — portion of a building between two floor levels that is partly underground with finished ceiling average < 1.2 m above grade.
• "bed and breakfast" — a home-based business providing temporary overnight accommodation and a morning meal to paying guests.
• "boathouse" — a one storey and one room building not exceeding 35 sq m in floor area, used exclusively to store watercraft.
• "buffer area" — area of a lot within 7.5 m of a lot line where that lot line adjoins another lot used for, or zoned to permit, residential, commercial guest accommodation, or agriculture use.
• "building" — a structure having a roof or cover supported by columns or walls and used or intended to be used for supporting or sheltering any use or occupancy.
• "cabin" — a building with floor area of 56 sq m or less, unless otherwise specified, used for commercial guest accommodation.
• "campground" — the use of land for temporary accommodation of paying guests who bring and sleep in a camping unit on a campsite.
• "camping unit" — a tent, trailer, recreational vehicle or similar transportable form of accommodation; excludes mobile or manufactured homes.
• "carport" — an accessory building where no more than 60% of ground area between roof and ground is enclosed by walls, providing a covered parking area.
• "church" — a building or structure for organized religious activities and associated accessory uses, not including a community hall, and not including any dwellings or accommodation.
• "club" — a group of people organized for common non-profit goals, characterized by membership qualifications, fees, meetings, and bylaws.
• "commercial" — occupied with or engaged in work for the purposes of earning an income.
• "commercial composting" — use of land for commercially processing organic matter through controlled biological decomposition.
• "commercial guest accommodation" — a commercial enterprise (other than a B&B home-based business) consisting of the temporary rental of commercial guest accommodation units, campsites or tourist hostel bed space to travellers/vacationers whose permanent domicile is elsewhere. Excludes time share plans. Term of occupancy by an individual must be < 30 days.
• "commercial guest accommodation unit" — a room, set of rooms, or cabin let as a single unit for commercial guest accommodation.
• "community hall" — a building for recreational, social, charitable, educational, entertainment, cultural activities and intermittent commercial uses, open to the public and owned/operated by a non-profit group or government agency.
• "community sewage collection system" — a system to collect, convey, treat and dispose of sewage serving more than one lot, owned and maintained by an Improvement District, Regional District, or sewer utility.
• "community water system" — a system of waterworks serving more than one lot, owned and maintained by an improvement district, Regional District, or water utility.
• "contractor's shop" — buildings or structures for housing/operating machinery, provision of services, fabrication of building-related products, interior storage; may include business office and exterior storage.
• "creative industry" — a use involving creative work and production of art, crafts, and custom-made goods, including artisan craft workshops, art/design studios, performing arts spaces, print/visual media studios, and education/research facilities.
• "day care, child" — a use in a building or structure where care, protection and supervision of children are provided on a regular schedule for a fee.
• "dock" — a float on the surface of water connected to the shoreline by a platform and ramp, used as a landing or wharfage place for water craft. Platform and ramp max width 1.2 m.
• "drive-in" — in relation to a commercial use, an establishment that permits customers to receive services, obtain goods, or be entertained while remaining in their motor vehicles.
• "duplex" — a building consisting of two dwelling units.
• "dwelling, single-family" — a building consisting of one dwelling unit not attached to any other dwelling unit by any means.
• "dwelling, multi-family" — a building consisting of more than two dwelling units.
• "dwelling unit" — one or more rooms in a building used or constructed for residential use of a single household, containing a common access, one kitchen, and eating, sleeping and living areas.
• "dwelling unit, affordable housing" — a deed restricted and/or rent controlled dwelling unit secured by a housing agreement registered on title; may include special needs housing and seniors dwelling units.
• "dwelling unit, farmworker's" — a dwelling unit accessory to a commercial farm business on a lot, used for residential accommodation of farmworkers employed in that farm business or for family.
• "farm building" — any building except a dwelling unit used in a farm operation for purposes other than human residential use or accommodation.
• "farm business" — a business in which one or more farm operations are conducted on one or more lots.
• "farm operation" — growing/producing/raising/keeping animals or plants; clearing/draining/irrigating/cultivating land; using farm machinery; applying fertilizers/pesticides; processing/direct marketing of farm products; and other agricultural activities. Does NOT include forest practices or breeding pets/operating a kennel.
• "farm structure" — any structure that is part of a farm operation.
• "floor area" — sum of horizontal areas of all storeys of a building or structure, including basements, measured to the outer surface of exterior walls and windows minus average wall thickness. Areas with floor-to-ceiling distance ≥ 1.8 m constitute a storey. Horizontal area of buildings where > 60% of area between roof and floor is enclosed by walls and windows is included.
• "floor space ratio" — total floor area of all buildings and structures on a lot divided by the total lot area.
• "frontage" — the length of a lot boundary that abuts a highway or access route in a bare land strata plan, excluding lot boundary abutting a lane or walkway.
• "full-time rental cottage" — a dwelling unit not exceeding 56 sq m in floor area on lots < 2 ha (or 90 sq m on lots ≥ 2 ha), occupied only pursuant to a residential tenancy agreement, and that comprises with the single family dwelling a single real estate entity.
• "grade" — the average elevation of the ground at a distance of 2 metres from a building or structure, averaging finished elevations at midpoints of all exterior walls, excluding artificial mounds.
• "greenhouse" — a structure with walls and roofs primarily of clear or translucent material used exclusively for growing plants, sufficient size for persons to work within.
• "guest house" — a building for commercial guest accommodation providing no more than 9 commercial guest accommodation units.
• "height" — average vertical distance between highest point of building/structure and grade. For flat/dome roofs: highest point is highest part of building. For pitched roofs: highest point is mid-point between highest ridge and highest eave (excluding dormers < 33% of total roof area).
• "highway" — a publicly owned street, road, lane, bridge, viaduct, and any other way open to public use; does NOT include a private right-of-way on a private lot.
• "home-based business" — a commercial use that is accessory to a residential use on a lot.
• "hotel" — a building containing commercial guest accommodation units with lobby, guest registration, and may contain restaurant, licensed drinking facilities, accessory retail sales/services, and meeting rooms.
• "impervious surface" — any surface compacted or covered so as to be highly resistant to infiltration by water, including compacted sand/clay, conventionally surfaced streets, roofs, sidewalks, and parking lots.
• "industry, farm-related light" — an industry that takes place indoors, comprising storage and manufacture of farm products, including processing, fabrication, assembly, treatment, packaging, incidental storage, sales and distribution; live animals not involved, raw animal products not rendered, agricultural waste processing does not occur.
• "industry, light" — an industry taking place indoors, comprising manufacture from previously prepared materials, including processing, fabrication, assembly, treatment, packaging, repairs, incidental storage, sales and distribution; excludes basic industrial processing from raw materials.
• "kennel" — any building/structure, compound, group of pens or cages or lot in which 3+ dogs are trained, cared for, bred, boarded or kept as part of a commercial enterprise.
• "kitchen" — a room equipped for residential storage, preparation, and heating of food for a single household; does not include a room per lot separate from residential use equipped as commercial to meet Food Premises Regulations.
• "landscape screen" — a visual barrier of natural vegetation, trees, shrubs, wooden fencing or combination, broken only by necessary perpendicular access ways, serving to screen land uses from abutting land and highways.
• "lot" — the smallest unit as shown on the records of the Land Title Office in which land is held or into which it is subdivided under the Land Title Act or Bare Land Strata Regulations under the Strata Property Act.
• "lot area" — the area of the horizontal plane of a lot bounded by vertical planes through the front, side and rear lot lines.
• "lot coverage" — the total area on the horizontal plane of those portions of a lot covered by buildings or structures divided by the area of the lot, expressed as a percentage. Measured to outer surface of exterior walls minus 15 cm, or to edge of eaves for roofed structures without walls.
• "lot depth" — the horizontal distance between front lot line and rear lot line; if not parallel, the length of a line joining mid-points.
• "lot line" — the boundary of a lot. Includes:
  - "front lot line" — lot line common to lot and abutting highway or access route. If multiple highways, the shorter lot line ≥ 20m is front. Hooked lot: larger portion adjoining parcel is front. Panhandle lot: line parallel to access road/highway and perpendicular to access strip lot lines.
  - "rear lot line" — lot line most closely paralleling and most distant from front lot line.
  - "exterior side lot line" — lot line that is not front or rear and is common to lot and an abutting highway or access route.
  - "interior side lot line" — lot line that is not front, rear or exterior side.
• "manufactured home" — a dwelling unit manufactured per CSA A277 Standards, designed for residential occupancy, manufactured wholly or partly offsite; includes mobile homes.
• "marina" — a system of piers or docks with > 10 moorage spaces for storing, servicing, fuelling, berthing and securing/launching private water craft.
• "marine-dependent" — a use requiring direct contact with tidal water or that cannot exist/occur economically in a non-marine location.
• "mobile home" — a transportable single or multiple section dwelling unit conforming to CSA Z240 Series, designed for residential occupancy.
• "mobile home space" — an area of land on a lot within the Residential 3 zone used or intended for installation of one mobile home, one manufactured home, or one single-family dwelling plus permitted additions and accessory buildings.
• "moorage" — the tying of a boat to a buoy, float or similar object anchored to the bed of the sea.
• "natural boundary" — the visible high water mark of the sea, a lake, a stream or other water body where presence and action of water is so common as to mark upon the soil or rock a character distinct from the bank vegetation and soil.
• "outdoor" — carried on or located outside a fully enclosed building or structure.
• "panhandle lot" — a lot that fronts on a highway by means of an access strip.
• "park" — area open to general population for outdoor recreational, scenic or conservation purposes.
• "pier" — a structure consisting of a fixed platform above water abutting the shoreline, used as a landing or wharfage place.
• "potable" — water safe to drink, fit for domestic purposes, meeting standards in Schedule "H".
• "pound" — a public facility for temporary impoundment of domestic animals caught on the Southern Gulf Islands.
• "principal" — in relation to a use, building or structure on a lot: primary and most important.
• "public" — in relation to a use, building or structure: operated to provide a governmental service to the general population of the island.
• "public service" — the use of land, buildings or structures for maintenance, repair or storage of vehicles, equipment or construction materials used solely for provision, maintenance or repair of public utilities or highways, and for emergency response facilities.
• "public utilities" — a use of land for provision of electricity, gas, water, sewage collection, telephone, cablevision or telecommunication services, or for navigational aids.
• "residential" — the use of a dwelling unit for: (a) permanent domicile/home life of a person; or (b) occasional/seasonal occupancy by an owner with permanent domicile elsewhere, or a non-paying guest. "Residential" does NOT include commercial guest accommodation use, or time share occupancy unless term ≥ 6 continuous months.
• "retail sales" — selling goods/merchandise directly to the consumer for personal, household, small business or office use; includes incidental services, processing or manufacturing of goods to be sold; does NOT include a liquor store.
• "retail services" — provision of services or entertainment to the general public for personal/household use, including insurance, real estate, personal service, motion pictures, amusement, recreation, health, educational, social services, museums, galleries; excludes restaurants and financial institutions.
• "seasonal cottage" — an accessory dwelling unit not exceeding 56 sq m in floor area which is occupied on a temporary basis (≤ 45 days/calendar year, max 30 consecutive) by persons with a permanent domicile elsewhere, primarily for recreation.
• "secondary suite" — an accessory, self-contained dwelling unit located within a building that otherwise contains a single-family dwelling, with lesser floor area than the principal dwelling unit.
• "senior" — a person aged 65 and over.
• "seniors' dwelling unit" — a dwelling unit restricted to residential occupancy by a senior and one other person who may be under 65 (spouse, partner, or unpaid caregiver residing in same dwelling unit).
• "seniors' supportive housing complex" — barrier-free housing development of seniors' dwelling units and accessory dwelling units for resident staff, with support services including: monitoring response for medical emergencies, one meal a day, housekeeping, laundry, recreational opportunities.
• "sign" — any device or medium visible from any lot other than the one it is on, or from a highway or the sea, used for advertising, information or identification.
• "slope" — average sustained deviation of land from horizontal measured over 6 m horizontal distance. Calculated: (vertical distance / horizontal distance) × 100.
• "special needs housing" — housing for residential accommodation of individuals requiring specific housing designs or services to live independently or in a supportive environment.
• "storey" — portion of a building (excluding basement) between surface of any floor and surface of floor above, or ceiling above (if no floor above), including any space with floor-to-ceiling height ≥ 1.8 m.
• "structure" — any material or combination of materials constructed for use, occupancy or ornamentation whether installed on, above or below the surface of land or water; excludes paving.
• "subdivision" — as defined in Land Title Act, and includes subdivision under Strata Property Act.
• "temporary" — period of occupancy or use: not exceeding 45 days in any calendar year, not more than 30 of which may be consecutive.
• "top of bank of a water body" — the first significant and regular break in the slope adjacent to the natural boundary of a water body where: (a) slope beyond break is flatter than 33.3%; and the land beyond maintains slope < 33.3% for min 15 m perpendicular to water body. Max horizontal distance of 30 m from natural boundary.
• "tourist hostel" — a commercial guest accommodation use with dormitory bed spaces and group facilities for cooking, eating and washing.
• "use" — the purpose or activity for which land or buildings are designed, arranged, intended or occupied/maintained; excludes removal of unprocessed natural resources.
• "vegetation screen" — a complete visual barrier (broken only by perpendicular access), formed by trees or plants ≥ 5 m high or that will attain 5 m height.
• "water body" — the sea, or any natural depression with visible banks, or a wetland; includes any lake, river, stream, creek, spring, swamp, gulch or surface source of water (whether containing fish or not), seasonal streams, and man-made surface drainage/catchment ponds that replace or divert a natural water body. Dug ponds that do not replace or divert a natural water body are NOT included.
• "wetland" — land inundated or saturated by surface or groundwater at a frequency/duration sufficient to support a prevalence of vegetation adapted for saturated soil conditions (swamps, marshes, bogs, similar areas).
• "wharfage" — tying of a boat or vessel to a wharf, float, pier or dock.
• "wholesale sales" — selling of merchandise to retailers, general employment, commercial, institutional or professional business users, contractors, other wholesalers, or brokering/agency service for selling merchandise.
• "zone" — a zone established by Part 9 of this Bylaw.

Section 1.2 — NUMBERING:
The numbering system: first number = Part; second = Section; third = Subsection; fourth = Article; fifth = Clause. Example: 18 = Part, 18.1 = Section, 18.1.1 = Subsection, 18.1.1(1) = Article, 18.1.1(1)(a) = Clause.

Section 1.3 — INFORMATION NOTES: Paragraphs preceded by "Information Note" in italics are provided only to assist understanding and do not form part of the Bylaw.

`,

// ── lub_general_regulations: Part 3 — General Regulations (Uses, Buildings, Structures) ──
lub_general_regulations: `
═══════════════════════════════════════
LUB 355 — PART 3: GENERAL REGULATIONS (USES, BUILDINGS AND STRUCTURES)
═══════════════════════════════════════

Section 3.1 — USES PERMITTED IN ALL ZONES:
The following uses are permitted in every zone: (1) public utilities; (2) approved navigational aids; (3) natural area parks and reserves; (4) uses, buildings and structures accessory to a principal use on the same lot that is permitted by this Bylaw; (5) passive recreation.

Section 3.2 — USES PROHIBITED IN ALL ZONES:
The following are prohibited in every zone: (1) commercial heliports/helipads (except emergency); (2) disposal of waste matter on land or in marine areas (except as lawfully discharged under Sewerage System Regulation, Agricultural Waste Control Regulation, or Environmental Management Act); (3) storage of special wastes except temporary storage (≤ 6 months accumulation) where specifically permitted; (4) storage/disposal of wastes on any island if not originating on that island; (5) commercial gaming operations; (6) drive-in and drive-through commercial land uses; (7) use of a lot, boat launching ramp, marina, pier or dock for rental, sales, moorage, wharfage or launching of personal watercraft.

Section 3.3 — AGRICULTURAL USES:
3.3.1 Where a lot is in the Agricultural Land Reserve but is NOT in A1 or A2 zone, then agriculture, farm buildings and farm structures are permitted on that lot and the provisions of Subsections 9.1.1, 9.1.2 and 9.1.3 apply to those agricultural uses.

Section 3.4 — VEGETATION SCREENS:
3.4.1 If a vegetation screen is required, it must be maintained within every part of the lot that is a buffer area.
3.4.2 Vegetation screen required in buffer area of lots occupied by: (1) general employment and commercial uses (except farm business not in a building); (2) emergency response stations; (3) kennels and pet boarding facilities; (4) general employment uses where lot adjoins another non-general employment lot zoned to permit agriculture.
3.4.3 Pound lots require vegetation screen on all portions within 15m of lot lines.
3.4.4 Does not apply to pre-existing uses as long as lot coverage not expanded and no trees ≥ 5m removed from buffer area.

Section 3.5 — DENSITY (LOTS IN MORE THAN ONE ZONE):
3.5.1 If a lot is in two or more zones, for density, lot coverage and minimum site area purposes, portions with different zoning must be considered as separate lots, provided no more than one dwelling unit is permitted on a lot unless specifically allowed.

Section 3.6 — DENSITY (LOTS CONTAINING A WATER BODY):
3.6.1 Where a lot contains a natural lake or wetland, the area of the wetland or lake below its natural boundary is NOT included in the lot area for calculating lot coverage or units per hectare.

Section 3.7 — DENSITY (DEDICATED LAND):
3.7.1 Where land is dedicated for conservation/stewardship, lot coverage and minimum lot area regulations apply as if the land had not been dedicated.

Section 3.8 — HEIGHT OF BUILDINGS AND STRUCTURES:
3.8.1 Unless otherwise specified, max height for structures is 7.6 m, max two storeys.
3.8.2 Max height for accessory buildings: 6 m on lots ≤ 1.2 ha, 7 m on lots > 1.2 ha.
3.8.3 In zones where agriculture is a principal permitted use, max height for farm buildings and structures (other than dwellings) is 10.7 m, max two storeys.
3.8.4 Height restrictions do NOT apply to: retaining walls, telecom antennae, church spires, flag poles, lightning poles, elevator shafts, stair towers, silos, barn ventilation shafts, water towers, electrical transmission towers, navigational equipment, ferry ramp towers, fire hose towers, fire alarm towers — provided lot coverage of such structures ≤ 1% or if on a building, ≤ 10% of roof area.
3.8.5 Structures floating on a water body: height measured from water surface.
3.8.6 Structures over a water body but imbedded in land beneath: height measured from elevation of natural boundary.
DEFAULT HEIGHT SUMMARY: Structures 7.6m (Section 3.8.1); accessory buildings 6m/7m (Section 3.8.2); farm buildings 10.7m in agricultural zones (Section 3.8.3). Zone-specific heights override these defaults.
DEFAULT SETBACKS (Section 4.3): Front 4.5m, Rear 7.5m, Side 1.5m, Exterior side 3.0m.

Section 3.9 — USE OF COMMON PROPERTY:
3.9.1 Common property in a strata plan is not a "lot" for density purposes but may be used for uses accessory to principal uses on strata lots. Max floor area of accessory structures within strata plan common property = number of lots × max floor area of accessory structures per lot.

Section 3.10 — VEHICLE STORAGE:
3.10.1 Except in GE1, GE2, GE3 zones, no lot may be used for: (1) parking/storage of more than two vehicles not completely enclosed in a permitted building; (2) keeping detached parts of vehicles unless completely enclosed.
3.10.2 No lot may be used for parking an industrial vehicle unless completely enclosed in a building or screened from public areas and neighbouring lots by a landscape screen (except in GE zones or if accessory to a permitted outdoor use or Mines Act permit).

Section 3.11 — DWELLING UNITS:
3.11.1 Unless otherwise specified, no more than one dwelling unit is permitted per lot.
3.11.2 Two-family dwellings constructed before July 31, 1990 are a permitted use in: Rural, Rural Uplands 1, Residential 7, Residential 8, Residential 9, and Forestry 1 zones.
3.11.3 A dwelling unit may have no more than one kitchen.
3.11.4 All rooms in a dwelling unit must be contiguous and accessible from within the dwelling unit; a dwelling unit may not consist of separate suites of rooms joined only by unenclosed space, passageway, garage, or any structure that does not function as an enclosed room. Intent: prevent construction of buildings that function as two-family dwellings but are not approved as such.
3.11.5 Max floor area for a dwelling unit is 500 square metres.

Section 3.12 — ACCESSORY BUILDINGS AND STRUCTURES:
3.12.1 Before occupation of a principal building on a lot, all accessory buildings and structures must comply with this Bylaw.
3.12.2 A carport is deemed an accessory building whether or not attached to the principal building.
3.12.3 Except where specifically permitted, an accessory building/structure may NOT be used for residential or guest accommodation uses.
3.12.4 An accessory building (other than a seasonal cottage or other permitted accessory dwelling unit) may not contain a shower enclosure, a bathtub, a kitchen, or more than three separate rooms.
3.12.5 Except for a seasonal cottage or other permitted accessory dwelling unit, total floor area of all accessory buildings and structures on a lot must not exceed: 70 sqm for lots ≤ 1.2 ha; 185 sqm for lots > 1.2 ha. One building with floor area < 25 sqm may be excluded from this calculation.

Section 3.13 — HOME-BASED BUSINESSES:
3.13.1 Home-based businesses are accessory to residential use of a lot and must be carried out indoors within a permitted dwelling unit, seasonal cottage or other fully enclosed accessory building. Exception: pottery kilns and outdoor activities of a family day care.
3.13.2 Total floor area for home-based business use must not exceed 50% of the total floor area of dwelling and permitted residential accessory buildings, up to max 70 sqm for lots ≤ 1.2 ha and 150 sqm for lots > 1.2 ha.
3.13.3 Must be operated by a person permanently residing on the premises. Max 3 additional non-resident employees (FTE) on lots ≤ 1.2 ha; max 4 on lots > 1.2 ha.
3.13.4 No exterior indication of the home-based business (stored materials, parking, displays, lighting) other than permitted signs. Parking spaces must be on the lot, visually buffered from neighbouring properties and road, at least 3m from side lot line and 7.6m from rear and front lot lines. Vehicle storage per Section 3.10.
3.13.5 Restrictions: (a) Noise ≤ 40 dB beyond the lot; (b) No vibration, smoke, dust, odour, litter, electrical interference, fire hazard, effluent or glare detectable outside lot boundaries; (c) No soil/surface water contamination by solvents, glues, chemicals or other harmful substances.
3.13.6 Only the following occupations may be conducted as home-based businesses: (a) B&B operations; (b) boarding houses (NOT in A2, RW1, RW2, Ri, or F2 zones); (c) production of arts, crafts, music, fabric, jewellery, food/drink items; (d) sales of products produced on same lot; (e) sales of products manufactured elsewhere (employees distribute offsite); (f) instructional classes (art, music, exercise, sport); (g) personal services with max 5 sqm product display; (h) repair of small appliances, electronic equipment, instruments, furniture, bicycles; (i) business and professional offices; (j) day care centres for up to 10 children; (k) auto repair (excl. auto body) on property > 2 ha not in A2/RW1/RW2/Ri/F2, screened from view, max 1 enclosed service bay ≤ 25 sqm, max 2 vehicles parked outside; (l) cabinet making, furniture making, upholstery, picture framing.
3.13.7 B&B home-based businesses permitted ONLY in: A1, A2, CD3, F1, F2, R6, R7, R8, R9, Rural, RW1, RU1, RU2 zones.
3.13.8 B&B conditions: (1) max 1 B&B per lot; (2) all guest bedrooms in principal dwelling unit or seasonal cottage only; (3) max 3 bedrooms for guests on lots ≤ 1.2 ha, max 4 on lots > 1.2 ha; (4) total floor area for guest accommodation ≤ 50% of floor area of single-family dwelling and seasonal cottage, max 100 sqm; (5) breakfast meals only for overnight guests; (6) off-street parking per Part 7, screened from view; (7) B&B signs may be indirectly illuminated (max 150 watt PAR lamp, 1-1.5m from sign).
Note: In ALR, B&Bs restricted to 3 bedrooms fully within single-family dwelling; more bedrooms require ALC written approval.

Section 3.14 — SEASONAL COTTAGES:
3.14.1 No seasonal cottage on lots < 1.2 ha (unless otherwise specified).
3.14.2 Max floor area: 56 sqm.
3.14.3 Must be physically detached from any other building; may not be on any lot occupied by 2+ other dwelling units.
3.14.4 Must not be located within 6m of any other building on the lot (including stairs, decks, porches attached to or functioning as part of cottage).
3.14.5 May not have a basement, or a garage/carport physically attached to it.
3.14.6 May only be used for temporary occupation (≤ 45 days/year, max 30 consecutive) by persons with permanent residence elsewhere, for recreation/vacation. May be used as part of a B&B (per 3.13.8), but NOT as a separate commercial guest accommodation unit or home-based business.
3.14.7 Where a lot on SSI is between 0.6 ha and 1.2 ha and contains a seasonal cottage (≤ 56 sqm) built prior to March 21, 1979, one single-family dwelling may also be permitted.
3.14.8 Where a lot on SSI > 0.6 ha was split by a public highway prior to January 1, 1980, a single-family dwelling is permitted on one portion and a seasonal cottage on the other.
3.14.9 A seasonal cottage may be a mobile home or manufactured home.
Info Note: Those wishing to use a seasonal cottage as a legal full-time residential dwelling unit may apply for a zoning amendment. OCP policies indicate such use can be considered, subject to water supplies and neighbourhood consultation.

Section 3.15 — FULL-TIME RENTAL COTTAGES:
3.15.1 No full-time rental cottage on lots < 1.2 ha.
3.15.2 Max floor area: 56 sqm on lots < 2 ha; 90 sqm on lots ≥ 2 ha.
3.15.3 Must be physically detached from any other building/structure; may not be on any lot occupied by 2+ other dwelling units.
3.15.4 Must not be within 6m of any other building (including attached stairs, decks, porches).
3.15.5 May not have a basement.
3.15.6 May have an attached garage or carport (counts toward floor area).
3.15.7 May be a mobile home or manufactured home.
3.15.8 If floor area > 56 sqm, may NOT be used for B&B home-based business.
3.15.9 No full-time rental cottage > 56 sqm (or additions > 11.6 sqm to existing) may be constructed unless equipped with a rainwater storage, treatment and delivery system for potable water per CSA B805-18. Building permit applications must include certified rainwater harvesting plans.

Section 3.16 — SECONDARY SUITES:
3.16.1 Secondary suites permitted on lots within or partially within the shaded area on Schedule "I". Also permitted in ALR on lots zoned A1 and A2.
3.16.2 Owner (or secondary suite occupant) must occupy either the dwelling unit or the secondary suite; OR a person managing the property (including dealing with neighbour complaints) must occupy one.
Info Note: Short term vacation rentals are NOT permitted in residential areas.
3.16.3 Max one secondary suite per lot.
3.16.4 Must be contained within the walls of the building containing the principal dwelling unit.
3.16.5 Entrance from exterior must be separate from the entrance to the principal dwelling unit.
3.16.6 Max floor area: 90 sqm (968 sq ft).
3.16.7 Must not be subdivided from the principal dwelling unit.
3.16.8 Where lot supplied by groundwater, building must have sufficient available groundwater.
3.16.9 Where supplied by rainwater collection, system must be capable of supplying sufficient potable water.
3.16.10 Where supplied by combination of sources, a written plan demonstrating adequate potable water supply is required.
3.16.11 Where supplied by community water system, operator must provide written confirmation of sufficient capacity.
3.16.12 Where supplied from a surface water body, a water license issued/amended after Nov 30, 1994, must permit required withdrawal.

Section 3.17 — DWELLINGS ON LARGE FARMS:
3.17 Where agriculture is a permitted principal use on a lot NOT in an Agricultural zone, additional farmworkers' dwelling units are permitted corresponding with subdivision potential, provided: (1) lot classified as farm under Assessment Act; (2) complies with Section 3.5; (3) number of farmworker units corresponds with subdivision potential per Section 5.8.1 and zone-specific subdivision/servicing requirements; (4) each unit supplied with potable water per Section 5.5; (5) max floor area per farmworker unit: 186 sqm; (6) owner grants covenant to SSI Local Trust Committee restricting use and prohibiting further subdivision.
Note: In ALR, adding more than one permanent detached dwelling unit requires Agricultural Land Commission permission.

Section 3.18 — TRAVEL TRAILERS AND RECREATIONAL VEHICLES:
3.18.1 In zones permitting dwelling units, one travel trailer/RV may be occupied as a camping unit for max 90 days/year with approved sewage disposal.
3.18.2 During construction of a dwelling unit, one travel trailer/RV may be occupied for max 2 years provided: (1) valid building permit exists; (2) water supply and approved sewage facilities are installed and temporarily connected.
3.18.3 Except as above, travel trailers/RVs may not be occupied on lots not zoned for campgrounds.

Section 3.19 — USE OF WATER SURFACES:
3.19.1 No building/structure over a water surface may be used as a dwelling, and no vessel used as a dwelling may be wharfaged — except for temporary wharfage of transient vessels, licensed commercial fishing boats, or one vessel as dwelling for security personnel at a public docking facility.

Section 3.20 — LOT COVERAGE AND DENSITY LIMITS (BUILDING STRATA LOTS):
3.20.1 Lot coverage, density limits and lot line setbacks in building strata subdivisions apply to the entire strata plan, not individual building strata lots.

Section 3.21 — CONDITIONS REGARDING MORE THAN ONE PRINCIPAL USE:
3.21.1 The following may NOT be constructed/occupied on any lot in combination with a single-family dwelling: public school, public hospital, community hall, emergency response facility.
3.21.2 Where a church is on any lot, only other permitted structures are one single-family dwelling per lot and buildings accessory to the dwelling.

Section 3.22 — ABATTOIR REGULATIONS:
3.22.1 Despite setbacks in Section 9.7.2, no abattoir may be located within: (1) 15m from front lot line; (2) 7.5m from interior side lot line; (3) 15m from non-general employment zone boundaries.
3.22.2 Combined mass of livestock in all confined livestock areas shall not exceed 4550 kg at any one time.

Section 3.23 — COMPOSTING REGULATIONS:
3.23.1 Backyard, household level composting is permitted in all residential zones.
3.23.2 Composting of agricultural waste produced onsite is permitted in all zones that permit agriculture.
3.23.3 Composting of organic matter originating at the site of the composting operation is permitted in all zones.
3.23.4 Commercial composting is subject to regulation by the Capital Regional District per the Composting Facilities Regulation Bylaw.
`,

// ── lub_siting: Part 4 — General Regulations (Siting) ──
lub_siting: `
═══════════════════════════════════════
LUB 355 — PART 4: GENERAL REGULATIONS (SITING)
═══════════════════════════════════════

Section 4.1 — SETBACKS FOR ACCESSORY BUILDINGS:
4.1.1 No accessory building (except a carport) may be located within 3 m of another building on a lot. Distance measured between closest points, including structural features such as raised decks or stairs physically attached to or functioning as part of a building.

Section 4.2 — VISIBILITY AT INTERSECTIONS:
4.2.1 No building or structure exceeding 0.75 m in height may be sited within the triangle formed by the boundaries of two intersecting highways and a line joining points on those boundaries 6 m from their point of intersection.

Section 4.3 — SETBACKS FROM LOT LINES AND ACCESS EASEMENTS:
4.3.1 Unless otherwise specified, no building or structure (except fence, pumphouse, public utility structure or underground utility) may be constructed within these setbacks from lot lines or road access easements:
  (1) Front lot line: 7.5 m
  (2) Rear lot line: 7.5 m
  (3) Interior side lot line: 3.0 m
  (4) Exterior side lot line: 4.5 m
Exception: One structure with floor area ≤ 10 sqm and height ≤ 2.5 m may be placed within the setback area from an interior side or rear lot line.
Exception: On any lot where a structure has existed since before January 13, 1971, an addition may be placed within the setback from an interior side or rear lot line, provided the addition is no closer to the lot line than the existing structure and the addition floor area ≤ 10% of existing structure floor area.
Info Note: Ministry of Transportation and Infrastructure requires a 4.5 m setback from any public road right-of-way for any building, mobile home, retaining wall or other structure.
Info Note: For panhandle lots, front lot lines include the lot line perpendicular to the access strip.
4.3.2 Where a structure was built prior to 1971 but now lies within a required setback, its siting is considered in conformance with 4.3.1.
4.3.3 Where the rear lot line of a strata lot is generally parallel to the natural boundary of a water body and common property ≥ 15 m in width lies between the rear lot line and the water body, the setback from the rear lot line is 0 m.
4.3.4 Min setback from lot line for drinking/feeding troughs, agricultural waste storage, or animal enclosures: 7.5 m.
4.3.5 Min setback from lot line for farm structures with boilers or walls with exhaust fans: 15 m.
4.3.6 Min setback from lot line for confined livestock areas (> 4550 kg livestock/poultry/farmed game): 30 m.
4.3.7 Min setback from lot line for manure-based mushroom barns and fur farm buildings: 30 m.
4.3.8 Min setback from lot line for pet boarding facilities, kennels and pounds: 45 m.
4.3.9 Min setbacks for a campsite: 30 m from front lot line, 15 m from any other lot line.

Section 4.4 — SETBACKS FROM WATER BODIES:
4.4.1 No building or structure (except fence, pumphouse, or boathouse) may be sited within 15 m of the natural boundary of any water body.
4.4.2 Setback from natural boundary of the sea may be reduced to 10 m where an engineer certifies the natural boundary is on non-erodible material.
4.4.3 No fill used to support a building or structure may be placed within the distances in 4.4.1.
4.4.4 Underside of floor system of any building portion used for habitation or storage of goods damageable by floodwaters must be ≥ 1.5 m higher than the elevation of the natural boundary of any water body within 30 m.
4.4.5 For structures within 30 m of St. Mary Lake natural boundary, underside of floor system must not be constructed below 42 m above mean sea level.
Info Note: Variances to setbacks may be considered by the SSI Local Trust Committee; environmental and aesthetic impacts will be taken into account.
Info Note: Construction, land clearing, vegetation removal or paving near water bodies may require a Development Permit.

Section 4.5 — SETBACKS FROM WATER BODIES — WATER QUALITY PROTECTION:
4.5.1 No sewage disposal field or septage pit within:
  (1) 30 m of natural boundary of the sea;
  (2) 60 m of natural boundary of Blackburn, Bullock, Cusheon, Ford, Maxwell, Roberts, Rosemurgy, St. Mary, Stowel, or Weston Lake;
  (3) 60 m of natural boundary of any water body leading into those lakes;
  (4) 30 m of natural boundary of any other water body.
4.5.2 No confined livestock areas (> 4550 kg), manure-mushroom barns, or agricultural waste storage within 60 m of the named lakes or 30 m of any water body draining into them.
4.5.3 Commercial/institutional/agricultural production/storage/manufacture of hazardous substances (petroleum products, chemicals, paints, solvents, pesticides, herbicides, fertilizers, sanitary sewage, animal wastes, construction materials, antifreeze, batteries, acids/alkalis, etc.) must be set back 30 m from natural boundary of any water body. Exception: indoor uses within Ganges Village Core.
4.5.4 Despite 4.5.3, pesticides, herbicides, fertilizers, soil and construction materials may be stored within 30 m of top of bank during permitted habitat restoration work.
4.5.5 Washing of fresh concrete must be ≥ 30 m from top of bank of any natural water body.

Section 4.6 — SETBACKS FROM DRINKING WATER WELLS — WATER QUALITY PROTECTION:
4.6.1 No sewage disposal field or septage pit within 30 m of a drinking water well within land designated on Schedule J.
4.6.2 No drinking water well within 30 m of a sewage disposal field or septage pit within land designated on Schedule J.

Section 4.7 — MEASUREMENTS OF SETBACKS:
4.7.1 All setbacks measured on a horizontal plane from building/structure to the natural boundary, lot line or other specified point.
4.7.2 Permitted projections into required setback areas for lot line setbacks only:
  (1) Chimneys, cornices, gutters, pilasters, sills, bay windows, ornamental features: max 0.6 m projection.
  (2) Steps, eaves, sunlight control projections, canopies, balconies, decks, porches: max 1.3 m projection into front/rear/exterior side setback; max 0.6 m into interior side setback.
`,

// ── lub_zones_residential: Zone summary + detailed R1-R12 ──
lub_zones_residential: `
═══════════════════════════════════════
LUB 355 — ZONE REGULATIONS: RESIDENTIAL & OTHER ZONES
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

Section 9.9.1 — Permitted Uses of Land, Buildings and Structures:
(♦ = permitted in zone. Uses are IN ADDITION to those in Subsections 3.1.1 and 3.16.1.)

PRINCIPAL USES:                              R1  R2  R3  R4  R5  R6  R7  R8  R9  R10 R11 R12
Single-family dwellings                       ♦   ♦   ♦       ♦   ♦   ♦   ♦   ♦   ♦   ♦
Duplexes                                      ♦   ♦               ♦
Duplexes built before Jul 31 1990                                 ♦   ♦   ♦
Multi-family dwellings                        ♦   ♦           ♦                       ♦¹
Dental/medical offices (max 2 practitioners)                      ♦   ♦   ♦   ♦
Elementary schools, pre-schools, day care                         ♦   ♦   ♦   ♦
Hospitals & public health care facilities                         ♦   ♦   ♦   ♦
Community halls                                                   ♦   ♦   ♦   ♦
Non-commercial outdoor active recreation          ♦               ♦   ♦   ♦   ♦
Churches                                                          ♦   ♦   ♦   ♦
Agriculture, excl. intensive agriculture                              ♦   ♦   ♦
Public service uses                           ♦   ♦   ♦   ♦   ♦   ♦   ♦   ♦   ♦   ♦   ♦
Seniors' supportive housing complex                                                       ♦²
ACCESSORY USES:
Home-based businesses (Section 3.13)          ♦   ♦   ♦   ♦   ♦   ♦   ♦   ♦   ♦
Seasonal cottages (Section 3.14)                                      ♦   ♦   ♦
¹ Special Provisions in Article 9.9.5(1) apply.
² Special Provisions in Article 9.9.5(3) apply.

Section 9.9.2 — Size, Siting, and Density (Table):

LOT COVERAGE & FLOOR AREA:                  R1  R2  R3  R4  R5  R6  R7  R8  R9  R10 R11 R12
Max combined lot coverage (%)                33  25  33  33  33  33  33  33  33  10  30  33⁶
Max floor space ratio                        N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A 0.6
Max floor area community hall/church/        N/A N/A N/A N/A N/A 930 930 930 930 N/A N/A N/A
  preschool/day care (sqm)
Max total farm buildings floor area (sqm)    N/A N/A N/A N/A N/A N/A 465 465 465 N/A N/A N/A
Max floor area of a dwelling unit (sqm)      N/A N/A 185 N/A 67  N/A N/A N/A N/A N/A 95¹ 95

HEIGHT:
Max height of dwelling unit (m)              *   *   4.5 *   *   *   *   *   *   *   *   7.6
(* = Section 3.8 default of 10.7 metres applies)

SETBACKS:
Min exterior side lot line setback (m)       N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A N/A 7.6

NUMBER OF UNITS & MINIMUM SITE AREAS:
Max dwelling units/ha (community sewage)     37  25  20² 12  N/A N/A N/A N/A N/A N/A 35³ N/A
Max dwelling units per lot                   N/A N/A N/A N/A 4   2   1⁵  1⁵  1⁵  1   38² N/A
Min lot area for >1 unit (ha)                0.3 0.3 0.3 1   N/A .16⁴N/A N/A N/A N/A N/A N/A
Min lot area for child day care (ha)         N/A N/A N/A N/A N/A 2   2   2   2   N/A N/A N/A
¹ except one dwelling unit per parcel to accommodate a manager/employee may exceed this.
² except one additional dwelling unit per parcel for a manager/employee.
³ special provisions in Article 9.9.5(1) apply.
⁴ except that two dwelling units are only permitted as a duplex, not two single-family dwellings.
⁵ except that a duplex is permitted in R7, R8, and R9 zones if constructed before July 31, 1990.
⁶ special provisions in Article 9.9.5(3) apply.

Section 9.9.3 — Subdivision and Servicing Requirements:

MIN WATER SERVICE FOR SUBDIVISION:           R1  R2  R3  R4  R5  R6  R7  R8  R9  R10 R11 R12
Adequate supply of potable water                             ♦       ♦   ♦   ♦   ♦
Community water system                        ♦   ♦   ♦       ♦       ♦                   ♦   ♦
MIN SEWAGE SERVICE FOR SUBDIVISION:
Individual on-site sewage treatment               ♦               ♦   ♦   ♦   ♦   ♦
Community sewage collection system            ♦   ♦           ♦                           ♦   ♦

MIN LOT AREAS THROUGH SUBDIVISION (hectares):
Individual on-site sewage + potable water:   NA  N/A N/A N/A 2   N/A 0.6 0.6 0.6 0.3 N/A N/A
Individual on-site sewage + community water: N/A N/A 2   2   1   N/A 0.4 0.4 0.4 0.3 N/A N/A
Community sewage + community water:          0.4 0.3 2   1   2   0.11 0.4 0.2 0.4 0.3 0.4 1
Min avg area (on-site sewage + potable):     N/A N/A N/A N/A 1   2   N/A 1   0.6 0.6 0.3¹N/A N/A
Min avg area (on-site + community water):    N/A N/A 2   1   2   1   0.4 0.4 0.4 0.3 N/A N/A
Min avg area (community sew + comm water):   0.4 0.3 2   1   2   0.11 1   0.4 0.4 0.4 0.3 0.4 1
¹ Special provisions in Article 9.9.5(2) apply.

Section 9.9.4 — Zone Variation Exceptions:
Zone variations apply when identified by a letter in brackets on Schedule "A" (e.g., R1(a), R6(c)):
• R1(a): Max 27 multi-family affordable housing dwelling units only. Home-based businesses limited to arts/crafts/offices/child day care. Max lot coverage 40%. Max height 11.0m (3 storeys). Setbacks: F:6.0m R:4.5m west-side:3.0m.
• R1(b): Permitted: dwelling units (affordable housing), duplexes, multi-family dwellings, office (max 186 sqm). Max 74 dwelling units, any over 40 must be affordable. Bed/breakfast & auto repair not permitted. Max dwelling units 18.
• R1(c): Front setback reduced to 5.0m. No off-street loading required.
• R3(a): Common recreation area/building permitted. Can subdivide to strata lots for mobile home spaces per Schedule "E".
• R5(a): Max 5 dwelling units up to 67 sqm plus 1 unit over 67 sqm.
• R6(a): No duplexes. Indoor public recreation + public health clinic permitted. Max 1 unit/lot. Max 268 total dwelling units. Block-specific rules per Schedule "C".
• R6(b): Funeral home permitted. Min lot 0.6 ha for subdivision (on-site sewage + potable water).
• R6(c): Permitted: max 26 affordable housing dwelling units (single or duplexes), 1 single-family dwelling, non-commercial outdoor recreation, public service uses. Min lot 0.037 ha (community services). Setbacks: F:4.5m side:1.5m south:15.25m rear:1.2m for accessory. No B&B/boarding houses in affordable units.
• R7(a): Seasonal cottage or full-time rental cottage instead of seasonal cottage.
• R8(a): Additional permitted use — storage of vehicles and equipment.
• R9(a): Additional permitted: private boat club house (max 230 sqm floor area), parking lot for boat club (max wharfage 1524m), one single-family dwelling. 80 parking spaces required.
• R12(a): Dental/medical offices (max 12 practitioners + 2 dwelling units in existing building), seniors' supportive housing complex + service club on remaining lot. Max 50 dwelling units, 3-storey at 13m height.

Section 9.9.5 — Special Provisions:
(1) R11 zone: Max 12 dwelling units/ha within community water supply district (unless separate irrigation system). 10m landscape strip along front lot line, 3m along other property lines.
(2) R10 zone: No lot may be subdivided into more than 21 lots.
(3) R12 zone: Max 12 dwelling units/ha within community water supply district. Landscape strips required as per R11.

ZONE-SPECIFIC SUMMARIES FOR QUICK REFERENCE:
• R1 – Residential 1: Lot coverage 33%, height 10.7m, setbacks F:4.5m R:7.5m S:1.5m ES:3.0m, max density 37 units/ha. Permitted: single-family dwelling, duplex, multi-family dwelling, public services, home-based business.
• R2 – Residential 2: Lot coverage 25%, height 10.7m, setbacks F:4.5m R:7.5m S:1.5m ES:3.0m, max density 25 units/ha. Permitted: single-family dwelling, duplex, multi-family dwelling, non-commercial outdoor recreation, public services, home-based business.
• R3 – Residential 3 (Mobile Home Park): Lot coverage 33%, height 4.5m, setbacks F:4.5m R:7.5m S:1.5m, min lot 0.3 ha, max density 20 units/ha, max floor area 185 sqm. Permitted: single-family dwelling, public services, home-based business.
• R4 – Residential 4: Lot coverage 33%, height 10.7m, min lot 1 ha, max density 12 units/ha. Permitted: single-family dwelling, public services, home-based business.
• R5 – Residential 5 (Multi-Unit): Lot coverage 33%, height 10.7m, max 4 units/lot, max floor area 67 sqm/unit. Permitted: single-family dwelling, multi-family dwelling, public services, home-based business.
• R6 – Residential 6: Lot coverage 33%, height 10.7m, max 2 units/lot, min lot 0.16 ha (duplex only). Permitted: single-family dwelling, duplex, dental/medical offices (2 practitioners), schools, day care, hospitals, community halls, non-commercial outdoor recreation, churches, public services, home-based business.
• R7 – Residential 7: Lot coverage 33%, height 10.7m, max 1 unit/lot (duplex if pre-1990). Community facilities max 930 sqm, farm buildings max 465 sqm. Permitted: single-family dwelling, dental/medical offices (2 practitioners), schools, day care, hospitals, community halls, non-commercial outdoor recreation, churches, agriculture (not intensive), public services, home-based business, seasonal cottage.
• R8 – Residential 8: Lot coverage 33%, height 10.7m, max 1 unit/lot (duplex if pre-1990). Community facilities max 930 sqm, farm buildings max 465 sqm. Permitted: single-family dwelling, dental/medical offices (2 practitioners), schools, day care, hospitals, community halls, non-commercial outdoor recreation, churches, agriculture (not intensive), public services, home-based business, seasonal cottage. Subdivision min 0.6 ha (on-site sewage + potable), 0.4 ha (on-site + community water), 0.2 ha (community services).
• R9 – Residential 9: Lot coverage 33%, height 10.7m, max 1 unit/lot (duplex if pre-1990). Community facilities max 930 sqm, farm buildings max 465 sqm. Permitted: single-family dwelling, dental/medical offices (2 practitioners), schools, day care, hospitals, community halls, non-commercial outdoor recreation, churches, agriculture (not intensive), public services, home-based business, seasonal cottage. Subdivision min 0.6 ha (on-site + potable), 0.4 ha (on-site + community water), 0.4 ha (community services).
• R10 – Residential 10 (Conservation): Lot coverage 10%, height 10.7m, max 1 unit/lot, min lot 0.3 ha. Max 21 lots per subdivision. Permitted: single-family dwelling, public services.
• R11 – Residential 11 (Cluster): Lot coverage 30%, height 10.7m, max density 35 units/ha, max floor area 95 sqm (except 1 manager unit). Max 12 units/ha in community water district. Landscape strips required. Permitted: single-family dwelling, public services, home-based business.
• R12 – Residential 12 (Compact): Lot coverage 33%, height 7.6m, floor space ratio 0.6, max floor area 95 sqm, exterior side setback 7.6m. Max 12 units/ha in community water district. Permitted: single-family dwelling, public services, home-based business.
  - R12(a) variation: seniors' supportive housing + service club, dental/medical offices (max 12), max 50 dwelling units, 13m height for 3-storey building.
`,

// ── lub_zones_rural: Rural, Upland, Watershed, Shoreline zones ──
lub_zones_rural: `
═══════════════════════════════════════
LUB 355 — ZONE REGULATIONS: RURAL, UPLAND, WATERSHED & SHORELINE
═══════════════════════════════════════

RURAL, UPLAND, WATERSHED AND SMALLER ISLAND ZONES (Section 9.10):
Zones: R (Rural), RU1 (Rural Uplands 1), RU2 (Rural Uplands 2), RU3 (Rural Uplands 3), RW1 (Rural Watershed 1), RW2 (Rural Watershed 2), Ri (Rural Island)

Section 9.10.1 – Permitted Uses of Land, Buildings and Structures:
Principal Uses:
• Single-family dwellings: R ♦, RU1 ♦, RU2 ♦, RU3 ♦, RW1 ♦, RW2 ♦, Ri ♦
• Two family dwellings constructed before July 31, 1990: R ♦, RU1 ♦
• Dental and medical offices (max 2 practitioners): R ♦
• Elementary schools, pre-schools, child day care: R ♦, RU1 ♦
• Public health care facilities: R ♦, RU1 ♦
• Community halls: R ♦, RU1 ♦
• Churches and cemeteries: R ♦, RU1 ♦
• Veterinarian clinics and animal hospitals: R ♦, RU1 ♦
• Pet boarding services and kennels: R ♦, RU1 ♦
• Pounds: R ♦, RU1 ♦
• Active outdoor non-commercial recreation (excluding golf courses and power-driven conveyance): R ♦, RU1 ♦
• Lighthouse stations: Ri ♦
• Agriculture: R ♦, RU1 ♦, RU2 ♦, RU3 ♦, Ri ♦
• Agriculture, excluding intensive agriculture: RW1 ♦, RW2 ♦
• Public service uses: R ♦, RU1 ♦, RU2 ♦, RU3 ♦, Ri ♦
Accessory Uses:
• Seasonal cottages (Section 3.14): R ♦, RU1 ♦, RU3 ♦, Ri ♦
• Home-based business use (Section 3.13): R ♦, RU1 ♦, RU2 ♦, RU3 ♦, RW1 ♦, RW2 ♦, Ri ♦
Info Note: In the Agricultural Land Reserve, agriculture, farm buildings and farm structures are permitted similar to Agriculture 1 zone (see Section 3.3.1).
Info Note: All activities in RW1 and RW2 must be carried out in accordance with LUB 355, OCP 434, Agricultural Waste Control Regulation, Drinking Water Protection Act, Water Sustainability Act, Groundwater Protection Regulation, and Fisheries Act.

Section 9.10.2 – Size, Siting and Density:
Lot Coverage and Floor Area:
• Max combined lot coverage: R 33%, RU1 33%, RU2 5%, RU3 10%, RW1 33%, RW2 33%, Ri 10%
• Max floor area for community hall/church/pre-school/day care (sq m): R 930, RU1 930, RU2 N/A, RU3 N/A, RW1 N/A, RW2 N/A, Ri N/A
• Max total floor area of farm buildings and farm structures (sq m): all zones 465
Number of Units and Minimum Site Areas:
• Max dwelling units per 8 ha (except secondary suites where permitted): R N/A, RU1 N/A, RU2 1, RU3 N/A, RW1 N/A, RW2 N/A, Ri N/A
• Max seasonal cottages per 8 ha: R N/A, RU1 N/A, RU2 1, RU3 N/A, RW1 N/A, RW2 N/A, Ri N/A
• Min lot area for day care centre (ha): R 2, RU1 2, RU2 N/A, RU3 N/A, RW1 N/A, RW2 N/A, Ri N/A
• Min lot area for pet boarding/kennels (ha): R 4, RU1 4, RU2 N/A, RU3 N/A, RW1 N/A, RW2 N/A, Ri N/A
• Min lot area for pound (ha): R 2, RU1 2, RU2 N/A, RU3 N/A, RW1 N/A, RW2 N/A, Ri N/A
Setbacks (* = Section 4.3 provisions apply):
• Front lot line: R *, RU1 *, RU2 15m, RU3 *, RW1 *, RW2 *, Ri *
• Rear lot line: R *, RU1 *, RU2 15m, RU3 *, RW1 *, RW2 *, Ri *
• Interior side lot line: R *, RU1 *, RU2 15m, RU3 *, RW1 *, RW2 *, Ri *
• Exterior side lot line: R *, RU1 *, RU2 15m, RU3 *, RW1 *, RW2 *, Ri *
Water Body Setbacks (in addition to Section 4.5):
• Min setback for agriculture from natural boundary of water body: R N/A, RU1 N/A, RU2 N/A, RU3 N/A, RW1 15m, RW2 15m, Ri N/A
• Min setback for livestock/poultry from natural boundary of water body: R N/A, RU1 N/A, RU2 N/A, RU3 N/A, RW1 15m, RW2 15m, Ri N/A

Section 9.10.3 – Subdivision and Servicing Requirements:
• Adequate supply of potable water required: all zones ♦
• Individual on-site sewage treatment required per lot: all zones ♦
• Min average area of lots in subdivision (ha): R 2, RU1 8, RU2 32, RU3 2.8, RW1 4, RW2 12, Ri 2
• Min individual lot area with on-site sewage + adequate potable water (ha): R 0.6, RU1 0.6, RU2 32, RU3 2, RW1 4, RW2 12, Ri 0.6
• Min individual lot area with on-site sewage + community water system (ha): R 0.4, RU1 0.6, RU2 32, RU3 2, RW1 4, RW2 12, Ri 0.4
• Min individual lot area with community sewage + community water (ha): R 0.4, RU1 0.6, RU2 32, RU3 2, RW1 4, RW2 12, Ri 0.4

Section 9.10.4 – Zone Variations (Exceptions in Particular Locations):
• R(a): Additional permitted use — construction and repair of boats.
• R(b): Seasonal cottage may be used for permanent residential occupancy.
• R(c): Min average area of lots by subdivision is 1.2 ha.
• R(d): Max number of lots in entire R(d) area shall not exceed 1.
• R(e): (a) Additional 15 lots permitted via density transfer from Lots 30/31 North SSI. (b) Seasonal cottage on max 60% of lots in bareland strata subdivision if total land area minus road area / total residential lots > 1.2 ha. Bare land strata lots for seasonal cottages = lots with largest lot area.
• R(f): Instead of seasonal cottage, permitted: seasonal cottage (Section 3.14) or full-time rental cottage (Section 3.15).
• R(g): Additional permitted uses — private yacht club outstation (max 26 sqm floor area), outdoor passive recreation and parking accessory to yacht club outstation.
• R(h): Max lots in entire R(h) area ≤ 3 (density transfer). No seasonal cottage on lots < 3.5 ha.
• R(i): Max lots in entire R(i) area ≤ 8 (density transfer to Lot 5, Section 39, South SSI).
• R(j): (defeated)
• R(k): Max lots in R(k) area ≤ 2. Max 1 seasonal cottage, located on specific lot (Remainder Lot 20, Section 85, South SSI, Plan 31795).
• R(l): Max lots in R(l) area ≤ 2. Min individual lot area by subdivision 0.6 ha.
• R(m): Only permitted principal uses: affordable housing dwelling units, one single-family dwelling, agriculture, public service uses. Max 10 affordable housing units, max 6 per multifamily building, max 10 dwelling units per lot total. No B&B or boarding houses in affordable housing. No auto repair.
• R(n): Only permitted uses/buildings: one single-family dwelling, four dwelling units (max 50 sqm each), tasting room (max 90 sqm), beer/liquor production/sales/storage, accessory retail sales (max 10 sqm floor area), accessory buildings (max 20 sqm floor area).
• R(o): Max 2 seasonal cottages permitted. Min average lot size by subdivision is 1 ha.
• R(p): Max 1 boathouse (max 60 sqm). Setback from natural boundary of sea is 15m.
• R(z): Max lots in all lands zoned F1(z), F2(z), F1(a)(z), R(z) and RU1(z) combined ≤ 72.
• RU1(a): Additional permitted use — plant nursery. Min average lot area by subdivision 16 ha. Min individual lot area 2 ha (with on-site sewage).
• RU1(b): Additional permitted uses — religious retreat/reception/retreat centres, meditation halls/cabins, farm buildings. Intensive agriculture NOT permitted. Max 2 retreat centres, 1 meditation hall, 6 meditation cabins, 1 reception centre per 65 ha. No building within 20m of any lot line. Min individual lot by subdivision 32 ha.
• RU1(c): Min individual lot by subdivision 3.5 ha if min average of all lots in subdivision is 5 ha.
• RU1(d): Additional permitted use — telecommunication facilities serving the general region.
• RU1(e): Max lots in entire RU1(e) area ≤ 1.
• RU1(f): Instead of seasonal cottage, permitted: seasonal cottage (Section 3.14) or full-time rental cottage (Section 3.15).
• RU1(z): Max lots in all lands zoned F1(z), F2(z), F1(a)(z), R(z) and RU1(z) combined ≤ 72.
• RW1(a): Additional permitted use — native wildlife recovery centre including accessory buildings (max 560 sqm floor area).

ZONE QUICK REFERENCE – RURAL / UPLAND / WATERSHED / ISLAND:
• R (Rural): Lot coverage 33%, min lot 2 ha avg (0.4-0.6 ha individual depending on servicing). Broadest rural permitted uses including schools, churches, community halls, vet clinics, kennels, pounds. Seasonal cottages and home-based business permitted.
• RU1 (Rural Uplands 1): Lot coverage 33%, min lot 8 ha avg (0.6 ha individual). Similar permitted uses to R. Schools, community halls, kennels, pounds permitted. Seasonal cottages and home-based business permitted.
• RU2 (Rural Uplands 2): Lot coverage 5%, min lot 32 ha. Max 1 dwelling per 8 ha. 15m setbacks all sides. Most restrictive upland zone. Agriculture and public services permitted. Home-based business permitted.
• RU3 (Rural Uplands 3): Lot coverage 10%, min lot 2.8 ha avg (2 ha individual). Agriculture and public services permitted. Seasonal cottages and home-based business permitted.
• RW1 (Rural Watershed 1): Lot coverage 33%, min lot 4 ha. Agriculture permitted (excluding intensive). 15m setback from water bodies for agriculture and livestock. Home-based business permitted. Activities must comply with water protection legislation.
• RW2 (Rural Watershed 2): Lot coverage 33%, min lot 12 ha. Agriculture permitted (excluding intensive). 15m setback from water bodies. Home-based business permitted. Activities must comply with water protection legislation.
• Ri (Rural Island): Lot coverage 10%, min lot 2 ha avg (0.4-0.6 ha individual). Lighthouse stations permitted. Agriculture, public services, seasonal cottages, home-based business permitted.

SHORELINE ZONES (Part 9.11):
• S1 – Shoreline 1: Lot coverage 10%, height 7.5m (reduced!), setbacks F:15m(from water) R:7.5m S:3m, min lot 0.5 ha. Permitted: dwelling, dock, boathouse, water-dependent uses.
• S2 – Shoreline 2: Lot coverage 20%, height 10.7m, setbacks F:10m(from water) R:10m S:5m, min lot 0.8 ha. Permitted: commercial accommodation, resort, recreation, restaurants.
`,

// ── lub_additional: ALR, DPA, TUP, Variances ──
lub_additional: `
═══════════════════════════════════════
LUB 355 — ADDITIONAL IMPORTANT RULES
═══════════════════════════════════════

AGRICULTURAL LAND RESERVE (ALR): Properties in the ALR have additional restrictions per the Agricultural Land Commission Act. Farm use takes priority. Non-farm uses require ALC approval. See also Section 3.3.1 — agriculture, farm buildings and farm structures are permitted on ALR lots even if not in A1/A2 zone.

DEVELOPMENT PERMIT AREAS (DPA): OCP 434 designates DPAs for environmental protection, hazard areas, and form/character. Development in DPAs requires a development permit.

TEMPORARY USE PERMITS: The Local Trust Committee may issue temporary use permits for uses not otherwise permitted in a zone, for up to 3 years (renewable).

VARIANCES: Minor variances to setback, lot coverage, or other regulations may be granted by the Board of Variance if hardship is demonstrated.
`,

}; // end LUB_SECTIONS

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

  // ── LUB 355 section keywords (lub_core always included, not scored) ──

  lub_definitions: {
    label: "LUB 355: Definitions & Terminology",
    icon: "📖",
    keywords: [
      "definition", "defined", "what is a", "what does", "means",
      "interpret", "terminology",
      "abattoir", "accessory building", "accessory use", "agricultural",
      "aquaculture", "basement", "bed and breakfast", "boathouse",
      "campground", "camping unit", "carport", "church",
      "contractor", "creative industry", "day care",
      "dock", "drive-in", "duplex", "dwelling unit",
      "floor area", "greenhouse", "guest house",
      "home-based business", "hotel", "kennel", "kitchen",
      "lot area", "lot coverage", "lot line", "manufactured home",
      "marina", "mobile home", "moorage", "natural boundary",
      "pier", "potable", "principal use", "public utility",
      "retail", "seasonal cottage", "secondary suite",
      "sign", "slope", "storage", "structure",
      "temporary use", "tourist accommodation", "water body", "wetland",
      "wharfage", "wholesale", "zone",
    ],
  },

  lub_general_regulations: {
    label: "LUB 355: General Regulations (Uses & Buildings)",
    icon: "🏗️",
    keywords: [
      "permitted use", "prohibited use", "uses permitted", "uses prohibited",
      "general regulation", "vegetation screen",
      "density", "lot coverage", "home-based business", "home occupation",
      "accessory building", "accessory structure",
      "dwelling unit", "secondary suite", "suite",
      "seasonal cottage", "rental cottage", "full-time rental",
      "height limit", "height restriction", "building height", "10.7",
      "travel trailer", "recreational vehicle",
      "composting", "abattoir",
      "boarding house", "bed and breakfast", "b&b",
      "large farm", "dwelling on farm",
      "water surface", "float home",
      "common property", "bare land strata",
    ],
  },

  lub_siting: {
    label: "LUB 355: Siting Regulations (Setbacks)",
    icon: "📏",
    keywords: [
      "setback", "set back", "distance from", "proximity",
      "lot line", "front lot line", "rear lot line", "side lot line",
      "exterior side", "interior side",
      "water body setback", "water quality protection",
      "drinking water well", "well setback", "septic",
      "sewage disposal", "septage",
      "visibility triangle", "intersection",
      "natural boundary", "foreshore",
      "confined livestock", "animal enclosure", "kennel setback",
      "campsite setback", "boathouse setback",
      "how far", "how close", "minimum distance",
      "7.5 m", "7.5m", "3.0 m", "3.0m", "4.5 m", "4.5m",
      "15 m from", "30 m from", "60 m from",
      "projection", "eaves", "chimney", "balcony", "deck",
    ],
  },

  lub_zones_residential: {
    label: "LUB 355: Residential & Other Zone Regulations",
    icon: "🏘️",
    keywords: [
      "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11", "r12",
      "residential zone", "residential 1", "residential 2",
      "a1", "a2", "agricultural zone",
      "c1", "c2", "commercial zone",
      "ca1", "ca2", "commercial accommodation",
      "ge1", "ge2", "ge3", "general employment",
      "pr1", "pr2", "parks and reserves",
      "multi-family", "multifamily", "mobile home park",
      "affordable housing", "seniors", "supportive housing",
      "cluster housing", "compact",
      "zone variation", "schedule a",
      "subdivision requirement", "servicing requirement",
      "community water", "community sewage",
    ],
  },

  lub_zones_rural: {
    label: "LUB 355: Rural, Upland, Watershed & Shoreline Zones",
    icon: "🌲",
    keywords: [
      "rural", "upland", "watershed",
      "ru1", "ru2", "ru3", "rw1", "rw2", "ri",
      "rural zone", "rural upland", "rural island",
      "f1", "f2", "forestry zone", "forestry",
      "s1", "s2", "shoreline zone", "shoreline",
      "retreat centre", "meditation",
      "plant nursery", "native wildlife",
      "lighthouse", "boathouse",
      "rural water protection",
      "8 ha", "32 ha", "12 ha",
    ],
  },

  lub_additional: {
    label: "LUB 355: ALR, DPA, Temporary Use & Variances",
    icon: "⚖️",
    keywords: [
      "alr", "agricultural land reserve", "alc", "agricultural land commission",
      "farm use", "non-farm use",
      "temporary use permit", "tup",
      "variance", "board of variance", "minor variance", "hardship",
      "non-conforming", "non conforming", "legal non-conforming",
      "development permit area",
    ],
  },
};

// LUB section keys (lub_core always included, never scored)
const LUB_SECTION_KEYS = ["lub_definitions", "lub_general_regulations", "lub_siting", "lub_zones_residential", "lub_zones_rural", "lub_additional"];
const OCP_SECTION_KEYS = ["goals_environment", "residential", "commercial", "community", "villages", "agricultural", "parks", "conservation", "infrastructure", "dpa"];

interface SectionSelection {
  lub: string[];
  ocp: string[];
}

// Detect explicit zone codes in query and map to LUB section keys
function detectZoneReferences(query: string): string[] {
  const sections = new Set<string>();
  const q = query.toUpperCase();

  // Residential zones R1-R12
  if (/\bR(?:1[0-2]?|[2-9])\b/.test(q)) sections.add("lub_zones_residential");
  // Agricultural, Commercial, Commercial Accommodation, General Employment, Parks
  if (/\b(?:A[12]|C[12]|CA[12]|GE[123]|PR[12])\b/.test(q)) sections.add("lub_zones_residential");
  // Rural/Upland/Watershed zones
  if (/\b(?:RU[123]|RW[12]|Ri)\b/i.test(q)) sections.add("lub_zones_rural");
  // Forestry, Shoreline
  if (/\b(?:F[12]|S[12])\b/.test(q)) sections.add("lub_zones_rural");

  return Array.from(sections);
}

function detectRelevantSections(query: string): SectionSelection {
  const q = query.toLowerCase();
  const scored: { section: string; score: number; source: "lub" | "ocp" }[] = [];

  for (const [section, config] of Object.entries(SECTION_KEYWORDS)) {
    if (section === "lub_core") continue; // always included, skip scoring
    let score = 0;
    for (const kw of config.keywords) {
      if (q.includes(kw)) {
        score += kw.length > 10 ? 3 : kw.length > 5 ? 2 : 1;
      }
    }
    if (score > 0) {
      const source = LUB_SECTION_KEYS.includes(section) ? "lub" : "ocp";
      scored.push({ section, score, source });
    }
  }

  // Boost zone sections detected by regex
  const zoneRefs = detectZoneReferences(query);
  for (const zoneSection of zoneRefs) {
    const existing = scored.find(s => s.section === zoneSection);
    if (existing) {
      existing.score += 10; // strong boost for explicit zone codes
    } else {
      scored.push({ section: zoneSection, score: 10, source: "lub" });
    }
    // When a zone is detected, also boost siting (setbacks are almost always relevant)
    const sitingEntry = scored.find(s => s.section === "lub_siting");
    if (sitingEntry) {
      sitingEntry.score += 3;
    } else {
      scored.push({ section: "lub_siting", score: 3, source: "lub" });
    }
  }

  // Sort by score descending
  scored.sort((a, b) => b.score - a.score);

  // Select top entries, capped at 7 total (LUB + OCP combined)
  const selected = scored.slice(0, 7);
  const lub = selected.filter(s => s.source === "lub").map(s => s.section);
  const ocp = selected.filter(s => s.source === "ocp").map(s => s.section);

  // Fallback defaults if nothing matched
  if (lub.length === 0 && ocp.length === 0) {
    return {
      lub: ["lub_general_regulations", "lub_zones_residential", "lub_siting"],
      ocp: ["residential", "dpa", "goals_environment"],
    };
  }

  // If we got LUB matches but no OCP, add a sensible OCP default
  if (ocp.length === 0) {
    ocp.push("residential", "dpa");
  }
  // If we got OCP matches but no LUB, add sensible LUB defaults
  if (lub.length === 0) {
    lub.push("lub_general_regulations", "lub_siting");
  }

  return { lub, ocp };
}

// ═══════════════════════════════════════════════════════════════════
// System prompt builder
// ═══════════════════════════════════════════════════════════════════

function buildSystemPrompt(selection: SectionSelection): string {
  // Always start with the core LUB context
  let context = `You are an expert compliance advisor for Salt Spring Island, British Columbia. You analyze queries against:
- Land Use Bylaw No. 355 (LUB 355), consolidated March 2025
- Official Community Plan Bylaw No. 434 (OCP 434)

${LUB_SECTIONS.lub_core}`;

  // Add selected LUB sections
  for (const section of selection.lub) {
    if (LUB_SECTIONS[section]) {
      context += `\n${LUB_SECTIONS[section]}`;
    }
  }

  // Add selected OCP sections
  for (const section of selection.ocp) {
    if (OCP_SECTIONS[section]) {
      context += `\n${OCP_SECTIONS[section]}`;
    }
  }

  // Note excluded LUB sections
  const excludedLub = LUB_SECTION_KEYS.filter(s => !selection.lub.includes(s));
  if (excludedLub.length > 0) {
    context += `\n\n═══════════════════════════════════════
NOTE: The following LUB 355 sections were NOT included in this analysis. If the query touches on these topics, mention this in warnings:
`;
    for (const s of excludedLub) {
      context += `- ${SECTION_KEYWORDS[s]?.label || s}\n`;
    }
  }

  // Note excluded OCP sections
  const excludedOcp = OCP_SECTION_KEYS.filter(s => !selection.ocp.includes(s));
  if (excludedOcp.length > 0) {
    context += `\n\n═══════════════════════════════════════
NOTE: The following OCP 434 sections were NOT included in this analysis. If the query touches on these topics, mention this in warnings:
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
    for (const s of excludedOcp) {
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
      { status: 500, headers: corsHeaders(request) }
    );
  }

  let body: { query: string };
  try {
    body = await request.json();
  } catch {
    return Response.json(
      { success: false, error: "Invalid request body" },
      { status: 400, headers: corsHeaders(request) }
    );
  }

  if (!body.query || body.query.trim().length < 5) {
    return Response.json(
      { success: false, error: "Please provide a more detailed question" },
      { status: 400, headers: corsHeaders(request) }
    );
  }

  if (body.query.length > 5000) {
    return Response.json(
      { success: false, error: "Query is too long (maximum 5,000 characters)" },
      { status: 400, headers: corsHeaders(request) }
    );
  }

  try {
    // Auto-detect relevant LUB + OCP sections from the query
    const selection = detectRelevantSections(body.query);
    const systemPrompt = buildSystemPrompt(selection);
    console.log(`[query] LUB sections: [${selection.lub.join(", ")}] | OCP sections: [${selection.ocp.join(", ")}] | prompt size: ${systemPrompt.length} chars`);

    // Model priority: try Sonnet 4 first, fall back to Haiku 3 if overloaded
    const MODELS = ["claude-sonnet-4-20250514", "claude-3-haiku-20240307"];

    const callClaude = async (): Promise<globalThis.Response> => {
      for (let i = 0; i < MODELS.length; i++) {
        const model = MODELS[i];
        console.log(`[query] Trying model: ${model}`);
        const resp = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": env.CLAUDE_API_KEY,
            "anthropic-version": "2023-06-01",
          },
          body: JSON.stringify({
            model,
            max_tokens: 2048,
            system: systemPrompt,
            messages: [{ role: "user", content: body.query }],
          }),
        });
        // If overloaded/rate-limited and we have a fallback model, try it
        if ((resp.status === 429 || resp.status === 529) && i < MODELS.length - 1) {
          console.log(`[query] ${model} returned ${resp.status}, falling back to ${MODELS[i + 1]}`);
          continue;
        }
        return resp;
      }
      // Shouldn't reach here, but TypeScript wants a return
      throw new Error("All models failed");
    };

    const response = await callClaude();

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Claude API error:", response.status, errorText);
      // Surface a more helpful message depending on status
      let userMessage = "Failed to analyze your query. Please try again.";
      if (response.status === 529 || response.status === 429) {
        userMessage = "The AI service is temporarily overloaded. Please wait a moment and try again.";
      } else if (response.status === 401) {
        userMessage = "API authentication error. Please check configuration.";
      }
      return Response.json(
        { success: false, error: userMessage },
        { status: 502, headers: corsHeaders(request) }
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
    const allSelected = [...selection.lub, ...selection.ocp];
    const analyzedSections = allSelected.map(s => ({
      key: s,
      label: SECTION_KEYWORDS[s]?.label || s,
      icon: SECTION_KEYWORDS[s]?.icon || "📄",
    }));

    return Response.json(
      { success: true, data: analysis, analyzed_sections: analyzedSections },
      { headers: corsHeaders(request) }
    );
  } catch (err) {
    console.error("Query error:", err);
    return Response.json(
      { success: false, error: "Something went wrong. Please try again." },
      { status: 500, headers: corsHeaders(request) }
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
