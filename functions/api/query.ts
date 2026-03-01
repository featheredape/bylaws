interface Env {
  CLAUDE_API_KEY: string;
  AI?: {
    run: (model: string, input: { text: string[] }) => Promise<{ data: number[][] }>;
  };
}

// ─── Vector math ────────────────────────────────────────────────────
function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB) + 1e-8);
}

// ═══════════════════════════════════════════════════════════════════
// LUB 355 — Sectioned for keyword-based selection
// ═══════════════════════════════════════════════════════════════════

const LUB_SECTIONS: Record<string, string> = {

// ── lub_core: Always included (header + Part 2 General Provisions) ──
lub_core: `
LAND USE BYLAW No. 355 (Consolidated March 2025)

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
LUB 355 — PART 1: INTERPRETATION (Section 1.1 Definitions)

KEY DEFINITIONS (Section 1.1.1):
abattoir: buildings or structures for processing farm products involving handling, slaughter, cutting, wrapping and storage of processed livestock.
accessory: in relation to a use, building or structure: subordinate, customarily incidental and exclusively devoted to a principal use, building or structure expressly permitted by this Bylaw on the same lot; or if on a common property in a bare land strata plan, on a strata lot in that strata plan.
agriculture: the use of land, buildings or structures for a farm operation.
agriculture, intensive: agriculture involving confinement of more than 4550 kg of poultry or livestock, or operation of a fur farm, or manure-based cultivation of mushrooms.
alteration: any change, addition or modification in construction or occupancy of an existing building or structure.
aquaculture: growing and cultivation of aquatic plants or fish for commercial purposes, including shellfish growing on, in, or under the foreshore or in the water.
basement: portion of a building between two floor levels that is partly underground with finished ceiling average < 1.2 m above grade.
bed and breakfast: a home-based business providing temporary overnight accommodation and a morning meal to paying guests.
boathouse: a one storey and one room building not exceeding 35 sq m in floor area, used exclusively to store watercraft.
buffer area: area of a lot within 7.5 m of a lot line where that lot line adjoins another lot used for, or zoned to permit, residential, commercial guest accommodation, or agriculture use.
building: a structure having a roof or cover supported by columns or walls and used or intended to be used for supporting or sheltering any use or occupancy.
cabin: a building with floor area of 56 sq m or less, unless otherwise specified, used for commercial guest accommodation.
campground: the use of land for temporary accommodation of paying guests who bring and sleep in a camping unit on a campsite.
camping unit: a tent, trailer, recreational vehicle or similar transportable form of accommodation; excludes mobile or manufactured homes.
carport: an accessory building where no more than 60% of ground area between roof and ground is enclosed by walls, providing a covered parking area.
church: a building or structure for organized religious activities and associated accessory uses, not including a community hall, and not including any dwellings or accommodation.
club: a group of people organized for common non-profit goals, characterized by membership qualifications, fees, meetings, and bylaws.
commercial: occupied with or engaged in work for the purposes of earning an income.
commercial composting: use of land for commercially processing organic matter through controlled biological decomposition.
commercial guest accommodation: a commercial enterprise (other than a B&B home-based business) consisting of the temporary rental of commercial guest accommodation units, campsites or tourist hostel bed space to travellers/vacationers whose permanent domicile is elsewhere. Excludes time share plans. Term of occupancy by an individual must be < 30 days.
commercial guest accommodation unit: a room, set of rooms, or cabin let as a single unit for commercial guest accommodation.
community hall: a building for recreational, social, charitable, educational, entertainment, cultural activities and intermittent commercial uses, open to the public and owned/operated by a non-profit group or government agency.
community sewage collection system: a system to collect, convey, treat and dispose of sewage serving more than one lot, owned and maintained by an Improvement District, Regional District, or sewer utility.
community water system: a system of waterworks serving more than one lot, owned and maintained by an improvement district, Regional District, or water utility.
contractor's shop: buildings or structures for housing/operating machinery, provision of services, fabrication of building-related products, interior storage; may include business office and exterior storage.
creative industry: a use involving creative work and production of art, crafts, and custom-made goods, including artisan craft workshops, art/design studios, performing arts spaces, print/visual media studios, and education/research facilities.
day care, child: a use in a building or structure where care, protection and supervision of children are provided on a regular schedule for a fee.
dock: a float on the surface of water connected to the shoreline by a platform and ramp, used as a landing or wharfage place for water craft. Platform and ramp max width 1.2 m.
drive-in: in relation to a commercial use, an establishment that permits customers to receive services, obtain goods, or be entertained while remaining in their motor vehicles.
duplex: a building consisting of two dwelling units.
dwelling, single-family: a building consisting of one dwelling unit not attached to any other dwelling unit by any means.
dwelling, multi-family: a building consisting of more than two dwelling units.
dwelling unit: one or more rooms in a building used or constructed for residential use of a single household, containing a common access, one kitchen, and eating, sleeping and living areas.
dwelling unit, affordable housing: a deed restricted and/or rent controlled dwelling unit secured by a housing agreement registered on title; may include special needs housing and seniors dwelling units.
dwelling unit, farmworker's: a dwelling unit accessory to a commercial farm business on a lot, used for residential accommodation of farmworkers employed in that farm business or for family.
farm building: any building except a dwelling unit used in a farm operation for purposes other than human residential use or accommodation.
farm business: a business in which one or more farm operations are conducted on one or more lots.
farm operation: growing/producing/raising/keeping animals or plants; clearing/draining/irrigating/cultivating land; using farm machinery; applying fertilizers/pesticides; processing/direct marketing of farm products; and other agricultural activities. Does NOT include forest practices or breeding pets/operating a kennel.
farm structure: any structure that is part of a farm operation.
floor area: sum of horizontal areas of all storeys of a building or structure, including basements, measured to the outer surface of exterior walls and windows minus average wall thickness. Areas with floor-to-ceiling distance ≥ 1.8 m constitute a storey. Horizontal area of buildings where > 60% of area between roof and floor is enclosed by walls and windows is included.
floor space ratio: total floor area of all buildings and structures on a lot divided by the total lot area.
frontage: the length of a lot boundary that abuts a highway or access route in a bare land strata plan, excluding lot boundary abutting a lane or walkway.
full-time rental cottage: a dwelling unit not exceeding 56 sq m in floor area on lots < 2 ha (or 90 sq m on lots ≥ 2 ha), occupied only pursuant to a residential tenancy agreement, and that comprises with the single family dwelling a single real estate entity.
grade: the average elevation of the ground at a distance of 2 metres from a building or structure, averaging finished elevations at midpoints of all exterior walls, excluding artificial mounds.
greenhouse: a structure with walls and roofs primarily of clear or translucent material used exclusively for growing plants, sufficient size for persons to work within.
guest house: a building for commercial guest accommodation providing no more than 9 commercial guest accommodation units.
height: average vertical distance between highest point of building/structure and grade. For flat/dome roofs: highest point is highest part of building. For pitched roofs: highest point is mid-point between highest ridge and highest eave (excluding dormers < 33% of total roof area).
highway: a publicly owned street, road, lane, bridge, viaduct, and any other way open to public use; does NOT include a private right-of-way on a private lot.
home-based business: a commercial use that is accessory to a residential use on a lot.
hotel: a building containing commercial guest accommodation units with lobby, guest registration, and may contain restaurant, licensed drinking facilities, accessory retail sales/services, and meeting rooms.
impervious surface: any surface compacted or covered so as to be highly resistant to infiltration by water, including compacted sand/clay, conventionally surfaced streets, roofs, sidewalks, and parking lots.
industry, farm-related light: an industry that takes place indoors, comprising storage and manufacture of farm products, including processing, fabrication, assembly, treatment, packaging, incidental storage, sales and distribution; live animals not involved, raw animal products not rendered, agricultural waste processing does not occur.
industry, light: an industry taking place indoors, comprising manufacture from previously prepared materials, including processing, fabrication, assembly, treatment, packaging, repairs, incidental storage, sales and distribution; excludes basic industrial processing from raw materials.
kennel: any building/structure, compound, group of pens or cages or lot in which 3+ dogs are trained, cared for, bred, boarded or kept as part of a commercial enterprise.
kitchen: a room equipped for residential storage, preparation, and heating of food for a single household; does not include a room per lot separate from residential use equipped as commercial to meet Food Premises Regulations.
landscape screen: a visual barrier of natural vegetation, trees, shrubs, wooden fencing or combination, broken only by necessary perpendicular access ways, serving to screen land uses from abutting land and highways.
lot: the smallest unit as shown on the records of the Land Title Office in which land is held or into which it is subdivided under the Land Title Act or Bare Land Strata Regulations under the Strata Property Act.
lot area: the area of the horizontal plane of a lot bounded by vertical planes through the front, side and rear lot lines.
lot coverage: the total area on the horizontal plane of those portions of a lot covered by buildings or structures divided by the area of the lot, expressed as a percentage. Measured to outer surface of exterior walls minus 15 cm, or to edge of eaves for roofed structures without walls.
lot depth: the horizontal distance between front lot line and rear lot line; if not parallel, the length of a line joining mid-points.
lot line: the boundary of a lot. Includes:
  - "front lot line" — lot line common to lot and abutting highway or access route. If multiple highways, the shorter lot line ≥ 20m is front. Hooked lot: larger portion adjoining parcel is front. Panhandle lot: line parallel to access road/highway and perpendicular to access strip lot lines.
  - "rear lot line" — lot line most closely paralleling and most distant from front lot line.
  - "exterior side lot line" — lot line that is not front or rear and is common to lot and an abutting highway or access route.
  - "interior side lot line" — lot line that is not front, rear or exterior side.
manufactured home: a dwelling unit manufactured per CSA A277 Standards, designed for residential occupancy, manufactured wholly or partly offsite; includes mobile homes.
marina: a system of piers or docks with > 10 moorage spaces for storing, servicing, fuelling, berthing and securing/launching private water craft.
marine-dependent: a use requiring direct contact with tidal water or that cannot exist/occur economically in a non-marine location.
mobile home: a transportable single or multiple section dwelling unit conforming to CSA Z240 Series, designed for residential occupancy.
mobile home space: an area of land on a lot within the Residential 3 zone used or intended for installation of one mobile home, one manufactured home, or one single-family dwelling plus permitted additions and accessory buildings.
moorage: the tying of a boat to a buoy, float or similar object anchored to the bed of the sea.
natural boundary: the visible high water mark of the sea, a lake, a stream or other water body where presence and action of water is so common as to mark upon the soil or rock a character distinct from the bank vegetation and soil.
outdoor: carried on or located outside a fully enclosed building or structure.
panhandle lot: a lot that fronts on a highway by means of an access strip.
park: area open to general population for outdoor recreational, scenic or conservation purposes.
pier: a structure consisting of a fixed platform above water abutting the shoreline, used as a landing or wharfage place.
potable: water safe to drink, fit for domestic purposes, meeting standards in Schedule "H".
pound: a public facility for temporary impoundment of domestic animals caught on the Southern Gulf Islands.
principal: in relation to a use, building or structure on a lot: primary and most important.
public: in relation to a use, building or structure: operated to provide a governmental service to the general population of the island.
public service: the use of land, buildings or structures for maintenance, repair or storage of vehicles, equipment or construction materials used solely for provision, maintenance or repair of public utilities or highways, and for emergency response facilities.
public utilities: a use of land for provision of electricity, gas, water, sewage collection, telephone, cablevision or telecommunication services, or for navigational aids.
residential: the use of a dwelling unit for: (a) permanent domicile/home life of a person; or (b) occasional/seasonal occupancy by an owner with permanent domicile elsewhere, or a non-paying guest. "Residential" does NOT include commercial guest accommodation use, or time share occupancy unless term ≥ 6 continuous months.
retail sales: selling goods/merchandise directly to the consumer for personal, household, small business or office use; includes incidental services, processing or manufacturing of goods to be sold; does NOT include a liquor store.
retail services: provision of services or entertainment to the general public for personal/household use, including insurance, real estate, personal service, motion pictures, amusement, recreation, health, educational, social services, museums, galleries; excludes restaurants and financial institutions.
seasonal cottage: an accessory dwelling unit not exceeding 56 sq m in floor area which is occupied on a temporary basis (≤ 45 days/calendar year, max 30 consecutive) by persons with a permanent domicile elsewhere, primarily for recreation.
secondary suite: an accessory, self-contained dwelling unit located within a building that otherwise contains a single-family dwelling, with lesser floor area than the principal dwelling unit.
senior: a person aged 65 and over.
seniors' dwelling unit: a dwelling unit restricted to residential occupancy by a senior and one other person who may be under 65 (spouse, partner, or unpaid caregiver residing in same dwelling unit).
seniors' supportive housing complex: barrier-free housing development of seniors' dwelling units and accessory dwelling units for resident staff, with support services including: monitoring response for medical emergencies, one meal a day, housekeeping, laundry, recreational opportunities.
sign: any device or medium visible from any lot other than the one it is on, or from a highway or the sea, used for advertising, information or identification.
slope: average sustained deviation of land from horizontal measured over 6 m horizontal distance. Calculated: (vertical distance / horizontal distance) × 100.
special needs housing: housing for residential accommodation of individuals requiring specific housing designs or services to live independently or in a supportive environment.
storey: portion of a building (excluding basement) between surface of any floor and surface of floor above, or ceiling above (if no floor above), including any space with floor-to-ceiling height ≥ 1.8 m.
structure: any material or combination of materials constructed for use, occupancy or ornamentation whether installed on, above or below the surface of land or water; excludes paving.
subdivision: as defined in Land Title Act, and includes subdivision under Strata Property Act.
temporary: period of occupancy or use: not exceeding 45 days in any calendar year, not more than 30 of which may be consecutive.
top of bank of a water body: the first significant and regular break in the slope adjacent to the natural boundary of a water body where: (a) slope beyond break is flatter than 33.3%; and the land beyond maintains slope < 33.3% for min 15 m perpendicular to water body. Max horizontal distance of 30 m from natural boundary.
tourist hostel: a commercial guest accommodation use with dormitory bed spaces and group facilities for cooking, eating and washing.
use: the purpose or activity for which land or buildings are designed, arranged, intended or occupied/maintained; excludes removal of unprocessed natural resources.
vegetation screen: a complete visual barrier (broken only by perpendicular access), formed by trees or plants ≥ 5 m high or that will attain 5 m height.
water body: the sea, or any natural depression with visible banks, or a wetland; includes any lake, river, stream, creek, spring, swamp, gulch or surface source of water (whether containing fish or not), seasonal streams, and man-made surface drainage/catchment ponds that replace or divert a natural water body. Dug ponds that do not replace or divert a natural water body are NOT included.
wetland: land inundated or saturated by surface or groundwater at a frequency/duration sufficient to support a prevalence of vegetation adapted for saturated soil conditions (swamps, marshes, bogs, similar areas).
wharfage: tying of a boat or vessel to a wharf, float, pier or dock.
wholesale sales: selling of merchandise to retailers, general employment, commercial, institutional or professional business users, contractors, other wholesalers, or brokering/agency service for selling merchandise.
zone: a zone established by Part 9 of this Bylaw.

Section 1.2 — NUMBERING:
The numbering system: first number = Part; second = Section; third = Subsection; fourth = Article; fifth = Clause. Example: 18 = Part, 18.1 = Section, 18.1.1 = Subsection, 18.1.1(1) = Article, 18.1.1(1)(a) = Clause.

Section 1.3 — INFORMATION NOTES: Paragraphs preceded by "Information Note" in italics are provided only to assist understanding and do not form part of the Bylaw.

`,

// ── lub_general_regulations: Part 3 — General Regulations (Uses, Buildings, Structures) ──
lub_general_regulations: `
LUB 355 — PART 3: GENERAL REGULATIONS (USES, BUILDINGS AND STRUCTURES)

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
LUB 355 — PART 4: GENERAL REGULATIONS (SITING)

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

// ── lub_subdivision: Part 5 — General Regulations (Subdivision) ──
lub_subdivision: `
LUB 355 — PART 5: GENERAL REGULATIONS (SUBDIVISION)

Section 5.1 — LOT AREA:
5.1.1 Subdivision applications must comply with the regulations for minimum and minimum average lot area and minimum service levels set out in Part 9 of this Bylaw, except the Approving Officer may approve a subdivision with lots that do not comply in these circumstances:
  (1) if the subdivision creates a single lot that does not comply, and that lot:
    (a) is to be used solely for unattended public utilities equipment and the owner grants a covenant under the Land Title Act restricting use to that use; or
    (b) is to be used solely as a publicly owned park or nature reserve and the owner grants a covenant restricting use to that use; or
    (c) is to be used solely for an emergency response station or community hall and the owner grants a covenant restricting use to one of those uses.
  (2) where the subdivision is a boundary adjustment between two existing lots and no lot is created with an area less than 0.4 ha if serviced by a community water service or less than 1 ha if not serviced by a community water service;
  (3) where the subdivision creates two lots from a lot in the Rural zone that is greater than 2 ha in area and has existed unchanged since February 11, 1976, and provided that neither parcel may be less than 0.4 ha if serviced by a community water service or less than 1 ha if not serviced by a community water service;
  (4) where the subdivision creates two lots from a lot that was split by a highway on or before January 1, 1980, in such a manner that each portion of the lot is at least 0.3 ha in area, and provided that the two lots are separated by the highway.
5.1.2 Where land is in the Agricultural Land Reserve, the minimum lot area applies only when land is: (1) approved for subdivision under the authority of the Agricultural Land Commission Act; or (2) exempted by the Agricultural Land Commission Act or regulations thereto.
5.1.3 (Deleted)

Section 5.2 — BOUNDARY ADJUSTMENTS:
5.2.1 The Approving Officer must not approve a boundary adjustment that would increase the area of any lot to the point where the new lots created could be subdivided into more lots than would be permitted under this Bylaw without the boundary adjustment.
5.2.2 The Approving Officer must not approve a boundary adjustment where one of the lots subject to adjustment is of such an area or shape that it does not have a useable building envelope that is at least 7.5 m in width and 7.5 m in depth, given the applicable lot line setbacks.

Section 5.3 — LOT DIMENSIONS:
5.3.1 The frontage of any lot in a proposed subdivision must be at least 10 per cent of its perimeter, provided that in no case may the frontage be less than 10 m.
5.3.2 No lot may have a lot depth greater than five times its width.
5.3.3 Side lot lines of proposed lots must be perpendicular or substantially perpendicular to the highway abutting the lot.
5.3.4 The lot depth of each lot created by subdivision must be at least 30 m.
5.3.5 Where a lot being subdivided contains or abuts a water body, each of the new lots being created must provide sufficient area for a building envelope of 280 square metres, an access driveway and on-site sewage treatment system to be constructed outside of the setbacks from each lot line and the water body as required in Part 4.
5.3.6 Where a lot being subdivided contains a tree bearing the nest of a great blue heron, a bald eagle or an osprey, or where the lot contains land within a 100 m radius of such a tree, then the depth and width of the new lots must provide sufficient area for a building envelope of 280 square metres, given required setbacks, and an access driveway and on-site sewage treatment system to be located on each proposed lot outside of a 100 m radius of the base of that tree.
Information Note: It is a provincial offence under the Wildlife Act to disturb or destroy the nest of an eagle, peregrine falcon, gyrfalcon, osprey, heron or burrowing owl, or the nest of any bird when occupied by a bird or its egg.
5.3.7 Where a lot abuts a water body, the area that lies between the water body and a line drawn 30 m from the natural boundary of the water body must not be included in the calculation of lot area for each lot proposed for subdivision for the purpose of determining whether the proposed lot complies with the minimum lot area regulations, except where this provision would decrease the total lot yield for a subdivision.

Section 5.4 — PANHANDLE LOTS:
5.4.1 No panhandle lot may be created by subdivision of land in a Commercial or General Employment zone or on land where multi-family dwelling units are permitted.
5.4.2 If a panhandle lot created by subdivision has sufficient area to be further subdivided under this Bylaw, the minimum width of the access strip is 20 m.
5.4.3 If a panhandle lot created by subdivision has insufficient area to be further subdivided, the minimum width of the access strip is 10 m.

Section 5.5 — POTABLE WATER:
5.5.1 Each lot in a proposed subdivision must be supplied with potable water in accordance with the service levels specified in Part 9 of this Bylaw.
5.5.2 Each lot in a proposed subdivision must be supplied with sufficient water to supply all uses, buildings and structures permitted on the lot by this Bylaw according to the standards set out in Table 1. Where more than one use is permitted on a lot, the amount of water to be supplied is the sum of the amounts required for each permitted use, calculated separately.
TABLE 1 — POTABLE WATER SUPPLY STANDARDS FOR SUBDIVISION:
  Dwelling unit: 1600 litres/day/lot
  Secondary Suite: 1200 litres/day/lot
  Seasonal cottage: 680 litres/day/lot
  Bed and breakfast home-based business: 225/bedroom
  Commercial or General Employment use: 900 litres/day/lot
  Community hall or church: 1590 litres/day/lot
  School: 50/classroom
  Commercial guest accommodation units: 450/unit
  Campground: 225/campsite
5.5.3 Where water is to be supplied by a community water system, the community water system must provide written confirmation of the amount of water it is able to supply to each lot.
5.5.4 Where water is to be supplied from a surface water body, the applicant for subdivision must provide proof of a water license issued after November 30, 1994, that permits the withdrawal of the required amount of water.
5.5.5 Where water is to be supplied by groundwater, the applicant for subdivision must provide written certification under seal of an engineer with experience in groundwater hydrology that there is sufficient available groundwater to provide the required amount of potable water on a continuous basis, and that the extraction from the groundwater table of that amount of water is not reasonably expected to adversely affect the quantity or quality of water obtainable from any existing well or surface water that is used as a source of potable water.
5.5.6 If the required amount of water cannot be supplied or if the certification, water license or confirmation referred to in 5.5.3, 5.5.4 or 5.5.5 cannot be made, the Approving Officer may nonetheless approve the subdivision if the applicant grants a covenant under the Land Title Act to the Salt Spring Island Local Trust Committee that restricts the development of the subdivision to the buildings, structures and uses for which the required amount of water can be supplied, licensed or certified under 5.5.3, 5.5.4 or 5.5.5.
5.5.7 For the purposes of the certification referred to in 5.5.5, the engineer must supply supporting documentation of a pump test conducted by the engineer which must indicate that the test was of sufficient duration to establish the long term reliability of the water supply in accordance with generally acceptable hydrological engineering practices.
5.5.8 Where the water supply is provided through a groundwater well or through a private surface water license, an engineer must also provide a water quality analysis that demonstrates that the surface water or the groundwater from each proposed water supply source or well is potable or can be made potable with a treatment system that is customarily used in a single-family dwelling. The certificate must include a plan of the proposed subdivision indicating each well location where a water sample was taken, and a statement that the water samples upon which the water quality analysis was performed were unadulterated samples taken from the locations indicated on the plan. If the water to be supplied is not potable, but can be made potable with a treatment system customarily used in a single-family dwelling, then the Approving Officer may nonetheless approve the subdivision if the applicant grants a covenant under the Land Title Act to the Salt Spring Island Local Trust Committee that requires on-going treatment of the water to ensure that it is potable before it is used as drinking water.

Section 5.6 — SEWAGE DISPOSAL:
5.6.1 Each lot proposed to be created by subdivision must be demonstrated by the applicant to contain or be capable of being serviced by an area or areas of sufficient size and appropriate characteristics to satisfy the setback requirements of Subsection 4.5.1 and the requirements of the Vancouver Island Health Authority Subdivision Standards for an on-site sewage treatment system for the buildings, structures and uses that are permitted on the lot by this Bylaw.

Section 5.7 — STORMWATER DRAINAGE:
5.7.1 Every subdivision must be designed and constructed to maximize the amount of precipitation that percolates into the ground, to minimize direct overland runoff, and to minimize impacts on the quality and quantity of groundwater.
5.7.2 Every surface drainage system in a subdivision must be designed to provide for the continuity of any existing surface drainage system serving the drainage basin in which the lot to be subdivided is located.
5.7.3 Every surface drainage system designed for a land subdivision located within 30 m of a fish-bearing water body, including the sea, must be consistent with the Land Development Guidelines.
5.7.4 No water body may be diverted, altered, or used for surface drainage purposes so as to transfer water between natural surface water watersheds.
5.7.5 Every surface drainage system must be designed so that the system is capable of conveying the peak rate of runoff from a 20-year storm event for the entire drainage basin within which the subdivision or development is located when such basin is fully developed.
5.7.6 Every surface drainage system must be designed and constructed to minimize scouring and erosion of ditch banks.
5.7.7 All drainage works, including ditches and culverts must be located in statutory rights-of-way granted to the Crown, or in dedicated highways, or in the case of a Bare Land Strata subdivision, on common property or an access lot.
5.7.8 If stormwater is discharged from a surface drainage system to the sea or a watercourse on or adjacent to the land being subdivided or developed, the system must be constructed and designed to retain stormwater for the period of time necessary to allow for settling of silt and other suspended solids.
5.7.9 Every applicant for subdivision must provide the written certification under seal of an engineer with experience in drainage engineering that the drainage system for the subdivision has been designed in accordance with Subsections 5.7.1 through 5.7.8.
5.7.10 Every applicant for subdivision must provide written certification under seal of an engineer with experience in drainage engineering that the subdivision has been constructed in accordance with the drainage system design prepared under Subsection 5.7.9 and such certification is to be provided before deposit of the subdivision plan in the Land Title Office.

Section 5.8 — COMPLIANCE WITH MINIMUM AND AVERAGE LOT AREAS:
5.8.1 Subdivisions must comply with the minimum and average lot area regulations set out in Part 9 of this Bylaw except that a park to be dedicated upon deposit of the subdivision plan need not comply with those regulations. For the purposes of this Bylaw, average lot area in a proposed subdivision is: the sum of the areas of the proposed lots, plus the area of land dedicated for parkland or school use, plus the area of land dedicated for environmental stewardship purposes, divided by the number of proposed lots.
5.8.2 No lot having an area of less than 8 ha may be subdivided under Section 946 of the Local Government Act to provide a residence for a relative of the owner unless the lot is located entirely within the Agricultural Land Reserve.
5.8.3 Where a lot proposed that contains or includes a water body, the area of the proposed lot is to be calculated as if it does not include the area of the water body, as measured below the natural boundary.

Section 5.9 — COVENANT AGAINST FURTHER SUBDIVISION AND DEVELOPMENT:
5.9.1 If a subdivision is proposed that yields the maximum number of lots permitted by the applicable minimum and average lot areas specified by this Bylaw, and one or more of the lots being created has an area equal to or greater than twice the applicable average lot area, the applicant must grant a covenant complying with Section 2.7 of this Bylaw for every such lot, prohibiting further subdivision of the lot.
5.9.2 If a subdivision is proposed that yields fewer than the maximum number of lots permitted by the applicable minimum and average lot areas specified by this Bylaw, and: (1) one or more of the lots being created has an area equal to or greater than twice the applicable average lot area, and (2) one or more of the lots being created has an area less than the applicable average lot area, then the applicant must grant a covenant complying with Section 2.7 of this Bylaw for every lot referred to in Article 5.9.2(1) prohibiting the subdivision of the lot so as to create a greater total number of lots by subdivision and re-subdivision of the original lot than would have been created had the first subdivision created the maximum number of lots permitted by the applicable minimum and average lot area specified by this Bylaw.
5.9.3 Where the approval of a bare land strata plan would create common property on which this Bylaw would permit the construction of a residential dwelling unit or seasonal cottage if the common property were a lot, the applicant must grant a covenant complying with Section 2.7 of this Bylaw for the common property prohibiting the further subdivision of the common property, the construction of any residential dwelling unit or seasonal cottage on the common property, and the disposition of the common property separately from the strata lots.

Section 5.10 — LOTS DIVIDED BY A ZONE BOUNDARY:
5.10.1 If a lot proposed to be subdivided is divided by a zone boundary, a separate calculation of the number of lots permitted must be made for each zone, and no lot may be created that is smaller than the minimum average lot area permitted for the zone in which it is located.
5.10.2 The creation of a lot lying within two or more zones is to be avoided wherever possible. If lots lying within two or more zones are subdivided, lot boundaries are to correspond with zone boundaries wherever possible.

Section 5.11 — SPLIT LOTS:
5.11.1 No lot may be created by subdivision, which is divided into two or more portions by a highway, park dedication, common property or other lot.

Section 5.12 — DOUBLE FRONTAGE LOTS:
5.12.1 No lot having frontage on more than one highway other than a corner lot may be created by subdivision.

Section 5.13 — HIGHWAY ACCESS:
5.13.1 All lots created through subdivision must have frontage on a highway, or in the case of a strata title subdivision, lots must have frontage on an access route connected to a highway.
5.13.2 Despite 5.13.1, a lot that is to be used solely for conservation use may be created without frontage on a highway, provided the applicant grants a covenant complying with Section 2.7 of this Bylaw that restricts use of the lot for conservation purposes and prohibits the construction of any structures on the lot.

Section 5.14 — CHARACTERISTICS OF PUBLIC ACCESS TO WATER BODIES:
5.14.1 Access to permanent water bodies are to be provided at intervals of 200 m where the average area of lots in a subdivision is less than 2.5 ha and at intervals of 400 m where the average area of lots in a subdivision is equal to or greater than 2.5 ha, regardless of whether the highway may be practically developed as a roadway for automobiles.
5.14.2 Despite 5.14.1, no access to water is required where that access would lead to a section of tidal shoreline that is identified as Environmentally Sensitive Habitat on Map 10 of the Salt Spring Island Official Community Plan, as an Environmentally Sensitive Shoreline Area on Map 11 of the Salt Spring Island Official Community Plan, nor to a freshwater shoreline of a lake that is a water supply for a community water system.
5.14.3 The Approving Officer may require that highways giving access to the shore of any water body, dedicated to the Crown at the time of subdivision, be consolidated into one or more larger areas and may require that such a highway be located in an area of high recreational value or so as to provide access to such an area, or in an area where the average gradient to the water body does not exceed 30 per cent.

Section 5.15 — HIGHWAY STANDARDS IN RELATION TO THE NATURAL ENVIRONMENT:
5.15.1 The purpose of the standards set out in 5.15.2 through 5.15.8 is to ensure that the construction of highways in connection with the subdivision of land does not result in the alteration of the land to an extent that is inconsistent with the object of the Islands Trust under the Islands Trust Act, the Islands Trust Policy Statement, or the Salt Spring Island Official Community Plan.
5.15.2 Highways are not to be provided in a manner that results in a physical division of land in the Parks and Reserves 6 or Parks and Reserves 7 zones; or in a manner such that a farm operation would be interrupted in the Agriculture 1 or Agriculture 2 zone, or a forestry operation would be interrupted in the Forestry 1 or Forestry 2 zone.
5.15.3 No highway may be constructed or located to connect an island in the Salt Spring Island Local Trust Area with any other island.
5.15.4 No highway may be located through a wetland identified in Schedule 9 of the Salt Spring Island Official Community Plan. Subdivisions must be laid out to ensure that environmental impacts are minimised in any other environmentally sensitive areas identified on Schedules 9 through 12 of the Salt Spring Island Official Community Plan.
5.15.5 No highway may be located so as to divert the flow of a surface watercourse or divert or contaminate in any way a groundwater aquifer, but this Subsection does not prohibit the culverting of a surface watercourse for a highway crossing or the construction of a stormwater retention facility provided that such culverting or construction is in accordance with the Land Development Guidelines.
5.15.6 Where any highway is to cross a water body, the design of the crossing is to be carried out by an engineer in accordance with Section 6 of the Land Development Guidelines.
5.15.7 The design of highways must to the greatest extent possible follow the natural contours of the land to minimize the extent of cutting and filling required to construct the highway.
5.15.8 Native vegetation must be reinstated in all portions of the highway not comprising the roadway, following the completion of a highway and any associated utilities.

Section 5.16 — PATHWAYS AND SHOULDER BIKEWAYS:
5.16.1 Highway right-of-way is to be dedicated and developed as a pathway to provide convenient pedestrian and cyclist access as follows:
  (1) Where a park, public school, public hospital, crown land or a lot zoned for commercial retail services would be more conveniently or quickly accessed from the proposed lots in a subdivision by a pathway than by a highway.
  (2) Where a road identified as a cycle route or potential transit route on Schedule 4 or Schedule 5 of the Salt Spring Island Official Community Plan would be more conveniently or quickly accessed from new lots by a pathway than by a highway.
5.16.2 Where a lot to be subdivided abuts a highway indicated on Schedule 4 of the Salt Spring Island Official Community Plan as a Cycle Route, land sufficient for the construction of shoulder bikeways with a minimum width of 1.5 m is to be dedicated in a manner consistent with the standards set out in the Salt Spring Island Cycle Route Inventory. The Approving Officer may also require the construction of such shoulder bikeways.
5.16.3 Where a lot is being subdivided into more than four lots, and the lot to be subdivided abuts a highway indicated on Schedule 5 of the Salt Spring Island Official Community Plan as a potential transit route, land sufficient for the construction of a bus stop is to be dedicated. The location of the area dedicated for the bus stop is to correspond to a pathway constructed as described in Article 5.16.1(1) of this Bylaw.

Section 5.17 — DRIVEWAY GUIDELINES:
5.17.1 Each lot in a proposed subdivision must be of sufficient area and appropriate configuration to permit the construction of an access driveway to a building site on the lot, complying with the guidelines illustrated on Schedule "D". Compliance with these guidelines is to be confirmed by an engineer or a surveyor.

Section 5.18 — SIDEWALK DIMENSIONS:
5.18.1 Sidewalks with boulevards are to be constructed on or adjacent to all abutting highways when lots are being subdivided in the Ganges Village Core, Fulford Village Core or Channel Ridge Village Core, as designated on Schedule 1 of the Salt Spring Island Official Community Plan.
5.18.2 Where required, sidewalks and boulevards are to be constructed at the time of subdivision according to the dimensions in Schedule "G".
Information Note: Construction of sidewalks on a highway right-of-way requires the permission of the Ministry of Transportation and Highways, and may require an agreement regarding on-going maintenance and liability. Where such an agreement is not made, sidewalks are to be constructed on the lot being subdivided.
`,

// ── lub_signs: Part 6 — Sign Regulations ──
lub_signs: `
LUB 355 — PART 6: SIGN REGULATIONS

Section 6.1 — STANDARDS FOR SIGNS:
6.1.1 Every sign permanently positioned on any lot or affixed to the outside of any structure must comply with the provisions pertaining to number of signs and maximum total sign area set out in Table 2 for the zone in which the sign is placed.
6.1.2 Signs must be located on the lot occupied by the use to which they refer.
6.1.3 Despite 6.1.2 and the regulations in Table 2 regarding the number and size of signs, a business may locate one un-illuminated sign for directional purposes only that is no more than 0.5 square metres in area beside a highway right-of-way that does not provide driveway access to the business.
Information Note: Location of a sign within a highway right-of-way requires the permission of the Ministry of Transportation and Highways.
6.1.4 Any sign that refers or directs attention to a business or service that is no longer in operation must be removed within 30 days after the operation of the business or service ends.
6.1.5 Any sign that has moving parts or that is lighted, animated or flashing to give the appearance of movement; and any noise-making sign, is prohibited.
6.1.6 Any light illuminating a sign must be controlled so as not to cast light towards the sky or into the eyes of oncoming motorists.
6.1.7 Double-faced signs are to be constructed so that the perimeters of both faces are congruent and are parallel and not more than 4 cm apart.
6.1.8 Nothing in this Bylaw prohibits the erection of a sign by an agency of government for purposes of public health, safety or direction, or by a candidate in a local, provincial, or federal election, during the period prior to the election.

TABLE 2 — SIGN REGULATIONS:
  Commercial zones, Commercial Accommodation zones, Community Facility zones, Comprehensive Development 2 Zone, General Employment zones:
    Max signs per principal use: 2
    Max total sign area: 1.8 square metres per business or use
  Schools, community halls, hospitals, art centres and public recreation centres with a gross floor area greater than 600 square metres:
    Max signs per principal use: 2
    Max total sign area: 1.8 square metres per use, not internally illuminated
  Shoreline 1 and 2 zones:
    Max signs per principal use: 2
    Max total sign area: 3.7 square metres per business or use, un-illuminated
  All other zones:
    Max signs: 1 per lot plus 1 per home-based business
    Max total sign area: 1 square metre per lot, un-illuminated
`,

// ── lub_zones_residential: Detailed R1-R12 Residential Zones (Section 9.9) ──
lub_zones_residential: `
LUB 355 — SECTION 9.9: RESIDENTIAL ZONES (R1-R12)

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
- R1(a): Max 27 multi-family affordable housing dwelling units only. Home-based businesses limited to arts/crafts/offices/child day care. Max lot coverage 40%. Max height 11.0m (3 storeys). Setbacks: F:6.0m R:4.5m west-side:3.0m.
- R1(b): Permitted: dwelling units (affordable housing), duplexes, multi-family dwellings, office (max 186 sqm). Max 74 dwelling units, any over 40 must be affordable. Bed/breakfast & auto repair not permitted. Max dwelling units 18.
- R1(c): Front setback reduced to 5.0m. No off-street loading required.
- R3(a): Common recreation area/building permitted. Can subdivide to strata lots for mobile home spaces per Schedule "E".
- R5(a): Max 5 dwelling units up to 67 sqm plus 1 unit over 67 sqm.
- R6(a): No duplexes. Indoor public recreation + public health clinic permitted. Max 1 unit/lot. Max 268 total dwelling units. Block-specific rules per Schedule "C".
- R6(b): Funeral home permitted. Min lot 0.6 ha for subdivision (on-site sewage + potable water).
- R6(c): Permitted: max 26 affordable housing dwelling units (single or duplexes), 1 single-family dwelling, non-commercial outdoor recreation, public service uses. Min lot 0.037 ha (community services). Setbacks: F:4.5m side:1.5m south:15.25m rear:1.2m for accessory. No B&B/boarding houses in affordable units.
- R7(a): Seasonal cottage or full-time rental cottage instead of seasonal cottage.
- R8(a): Additional permitted use — storage of vehicles and equipment.
- R9(a): Additional permitted: private boat club house (max 230 sqm floor area), parking lot for boat club (max wharfage 1524m), one single-family dwelling. 80 parking spaces required.
- R12(a): Dental/medical offices (max 12 practitioners + 2 dwelling units in existing building), seniors' supportive housing complex + service club on remaining lot. Max 50 dwelling units, 3-storey at 13m height.

Section 9.9.5 — Special Provisions:
(1) R11 zone: Max 12 dwelling units/ha within community water supply district (unless separate irrigation system). 10m landscape strip along front lot line, 3m along other property lines.
(2) R10 zone: No lot may be subdivided into more than 21 lots.
(3) R12 zone: Max 12 dwelling units/ha within community water supply district. Landscape strips required as per R11.

ZONE-SPECIFIC SUMMARIES FOR QUICK REFERENCE:
- R1 – Residential 1: Lot coverage 33%, height 10.7m, setbacks F:4.5m R:7.5m S:1.5m ES:3.0m, max density 37 units/ha. Permitted: single-family dwelling, duplex, multi-family dwelling, public services, home-based business.
- R2 – Residential 2: Lot coverage 25%, height 10.7m, setbacks F:4.5m R:7.5m S:1.5m ES:3.0m, max density 25 units/ha. Permitted: single-family dwelling, duplex, multi-family dwelling, non-commercial outdoor recreation, public services, home-based business.
- R3 – Residential 3 (Mobile Home Park): Lot coverage 33%, height 4.5m, setbacks F:4.5m R:7.5m S:1.5m, min lot 0.3 ha, max density 20 units/ha, max floor area 185 sqm. Permitted: single-family dwelling, public services, home-based business.
- R4 – Residential 4: Lot coverage 33%, height 10.7m, min lot 1 ha, max density 12 units/ha. Permitted: single-family dwelling, public services, home-based business.
- R5 – Residential 5 (Multi-Unit): Lot coverage 33%, height 10.7m, max 4 units/lot, max floor area 67 sqm/unit. Permitted: single-family dwelling, multi-family dwelling, public services, home-based business.
- R6 – Residential 6: Lot coverage 33%, height 10.7m, max 2 units/lot, min lot 0.16 ha (duplex only). Permitted: single-family dwelling, duplex, dental/medical offices (2 practitioners), schools, day care, hospitals, community halls, non-commercial outdoor recreation, churches, public services, home-based business.
- R7 – Residential 7: Lot coverage 33%, height 10.7m, max 1 unit/lot (duplex if pre-1990). Community facilities max 930 sqm, farm buildings max 465 sqm. Permitted: single-family dwelling, dental/medical offices (2 practitioners), schools, day care, hospitals, community halls, non-commercial outdoor recreation, churches, agriculture (not intensive), public services, home-based business, seasonal cottage.
- R8 – Residential 8: Lot coverage 33%, height 10.7m, max 1 unit/lot (duplex if pre-1990). Community facilities max 930 sqm, farm buildings max 465 sqm. Permitted: single-family dwelling, dental/medical offices (2 practitioners), schools, day care, hospitals, community halls, non-commercial outdoor recreation, churches, agriculture (not intensive), public services, home-based business, seasonal cottage. Subdivision min 0.6 ha (on-site sewage + potable), 0.4 ha (on-site + community water), 0.2 ha (community services).
- R9 – Residential 9: Lot coverage 33%, height 10.7m, max 1 unit/lot (duplex if pre-1990). Community facilities max 930 sqm, farm buildings max 465 sqm. Permitted: single-family dwelling, dental/medical offices (2 practitioners), schools, day care, hospitals, community halls, non-commercial outdoor recreation, churches, agriculture (not intensive), public services, home-based business, seasonal cottage. Subdivision min 0.6 ha (on-site + potable), 0.4 ha (on-site + community water), 0.4 ha (community services).
- R10 – Residential 10 (Conservation): Lot coverage 10%, height 10.7m, max 1 unit/lot, min lot 0.3 ha. Max 21 lots per subdivision. Permitted: single-family dwelling, public services.
- R11 – Residential 11 (Cluster): Lot coverage 30%, height 10.7m, max density 35 units/ha, max floor area 95 sqm (except 1 manager unit). Max 12 units/ha in community water district. Landscape strips required. Permitted: single-family dwelling, public services, home-based business.
- R12 – Residential 12 (Compact): Lot coverage 33%, height 7.6m, floor space ratio 0.6, max floor area 95 sqm, exterior side setback 7.6m. Max 12 units/ha in community water district. Permitted: single-family dwelling, public services, home-based business.
  - R12(a) variation: seniors' supportive housing + service club, dental/medical offices (max 12), max 50 dwelling units, 13m height for 3-storey building.
`,

// ── lub_zones_agricultural: Section 9.1 Agricultural Zones (A1, A2) ──
lub_zones_agricultural: `
LUB 355 — SECTION 9.1: AGRICULTURAL ZONES (A1, A2)
Info Note: Most land in A1/A2 zones is also in the Agricultural Land Reserve. Where this is the case, accessory uses are permitted only if also approved by the Agricultural Land Commission. Non-farm uses permitted by the ALC are only permitted if also consistent with this bylaw.

Section 9.1.1 — Permitted Uses (♦ = permitted) [amended BL461, BL492, BL526]:
PRINCIPAL USES:                                                          A1    A2
Agriculture, farm buildings and structures                                ♦     ♦
  (Info Note: "agriculture" includes processing, storage, and sale of
   farm products produced on that agricultural land, consistent with
   the Agricultural Land Reserve Use Regulation.)
Single-family dwellings                                                   ♦     ♦
ACCESSORY USES:
A secondary suite subject to Section 3.16                                 ♦     ♦
A second accessory dwelling unit, in addition to a secondary suite,       ♦     ♦
  provided that it is:
  a) a pre-existing dwelling unit constructed before February 22, 2019; or
  b) a manufactured home constructed between July 4, 2019 and
     December 31, 2021; or
  c) a farmworker's dwelling unit not exceeding:
     i.  56 sqm floor area on a lot between 1.2 and 2 ha; or
     ii. 90 sqm floor area on a lot greater than 2 ha; or
     iii.186 sqm floor area on a lot greater than 40 ha.
  (Info Note: For lots 40 ha or less where the single-family dwelling
   exceeds 500 sqm floor area, permission to construct an additional
   dwelling unit for farm use must be applied for and approved in
   writing by the Agricultural Land Commission.)
Home-based business use subject to Section 3.13                           ♦     ♦
Commercial guest accommodation in a campground on agricultural            ♦
  land classified as a farm under the Assessment Act
  (Info Note: requires agri-tourism activity consistent with the
   Agricultural Land Reserve Use Regulation to be occurring on the lot.)

Section 9.1.2 — Size, Siting and Density [amended BL526]:
Lot Coverage:                                                    A1    A2
- Max lot coverage excl greenhouses (%)                          35    35
- Max lot coverage incl greenhouses (%)                          75    75
- Max lot coverage campsites in campground (%)                   5     N/A
Number of Units and Site Areas:
- Max combined bedrooms for B&B home-based business              10    N/A
  and campsites on any lot
  (Info Note: ALC only permits B&B with max 4 bedrooms
   in principal residence. Campsite only if agri-tourism
   activity consistent with ALC regulations is occurring.)
Setbacks:
- Min rear lot line setback (m) for buildings, structures        4.5   4.5
  and uses not listed in Sections 4.3.4 through 4.3.9
  (Despite Article 4.3.1(2))

Section 9.1.3 — Stormwater and Agricultural Liquid Waste Management Plans:
Total impervious surface area of farm buildings, structures and pavement must not exceed 3500 sqm or 10% of a lot or contiguous lots, unless constructed in accordance with an engineer's stormwater design ensuring pre- and post-development runoff rate, flow pattern and water quality are similar, consistent with the Land Development Guidelines.

Section 9.1.4 — Subdivision Requirements:
- Min water supply: adequate supply of potable water (both zones)
- Min sewage: individual on-site sewage treatment per lot (both zones)
- Min area individual lot (ha):                          8     8

Section 9.1.5 — Zone Variations:
- A1(a): Additional permitted uses: community hall; processing and storage of farm products produced mainly within the SSI Local Trust Area; museum; outdoor community events.
- A1(b): Additional permitted use: outdoor children's recreational camp.
- A1(c): (Deleted — BL490)
- A1(d): Additional permitted use: a hotel and restaurant, including accessory buildings, occupying no more than 675 sqm of lot coverage.
- A1(e): Max lots permitted in entire A1(e) area = 1. Min individual lot area by subdivision = 6.7 ha.
- A1(f) [BL435]: Additional permitted uses: emergency response station; fire training facility. Regulations: (a) no building/structure associated with fire training facility within 8m of interior side lot line; (b) vegetation screen per Section 3.4; (c) no fuel other than propane for fire simulation; (d) fire simulation only on engineered concrete slab with metal burn props; (e) only water for fire extinguishment, contained and separated from contaminants before discharge.
- A2(a): (a) Despite lot coverage regulations, buildings and structures for residential uses must not exceed 10% of lot area. (b) Despite setback regulations, setback from any lot line must not be less than 7.5 m. (c) Subdivision of lots 48 ha or larger permitted: additional lots may be created (min 1 ha each) with a common lot (no building permitted). For each 8 ha of common lot, one additional lot is permitted (max 6 additional lots plus the common lot). Highway dedication included in common lot calculation. If remainder > 2 ha, one additional lot permitted.
- A2(b) [BL466]: Despite all other regulations, only the following principal uses are permitted: (a) biodiversity conservation, heritage, wildlife and scenery viewing (max 100 sqm buildings); (b) education and research (max 100 sqm buildings). Single-family dwellings are NOT permitted in A2(b).
`,

// ── lub_zones_commercial: Sections 9.2 Commercial + 9.3 Commercial Accommodation ──
lub_zones_commercial: `
LUB 355 — SECTIONS 9.2 & 9.3: COMMERCIAL & COMMERCIAL ACCOMMODATION ZONES

SECTION 9.2 — COMMERCIAL ZONES (C1, C2, C3, C4) [amended BL489, BL492]:

Section 9.2.1 — Permitted Uses (♦ = permitted):
PRINCIPAL USES:                                                          C1   C2   C3   C4
Indoor retail sales and rentals                                           ♦    ♦    ♦
Indoor retail services, excluding Laundromats                             ♦    ♦    ♦    ♦
Laundromats                                                               ♦
Outdoor retail sales of nursery plants and home gardening supplies        ♦    ♦
Indoor production of food/drink items, clothing, crafts, artwork,         ♦    ♦    ♦
  jewellery for retail or wholesale sales (with retail outlet on
  premises, water consumption max 1600 litres/day)
Offices                                                                   ♦    ♦              ♦
Banks and credit unions                                                   ♦    ♦
Indoor commercial recreation and amusement facilities                     ♦    ♦
Restaurants                                                               ♦    ♦    ♦
Churches                                                                  ♦    ♦
Libraries                                                                 ♦    ♦
Offices for building construction professionals and trades                ♦    ♦
Automobile service stations                                                    ♦
Automobile rentals with max 5 vehicles stored on-site                     ♦    ♦
Veterinarian clinics and animal hospitals                                 ♦    ♦
Indoor commercial and vocational schools                                  ♦    ♦
Day care centres for children, seniors, or people with special needs      ♦    ♦
Multifamily dwelling units                                                          ♦
Commercial guest accommodation in hotels or guest houses                       ♦
Collection of recyclable materials, excl outdoor sorting and storage      ♦              ♦
Public service uses                                                       ♦    ♦    ♦    ♦
ACCESSORY USES:
Dwelling units accessory to a commercial use                              ♦    ♦    ♦    ♦
Home-based businesses accessory to residential use                             ♦

Section 9.2.2 — Size, Siting and Density [amended BL489, BL492]:
Lot Coverage and Floor Area:                                     C1   C2   C3   C4
- Max lot coverage (%)                                           75   75   33   33
- Min size of a dwelling unit (sqm)                              N/A  30   N/A  N/A
Number of Units:
- Max multi-family dwelling units per ha                         N/A  37   N/A  N/A
- Max commercial guest accommodation units per lot/operation     N/A  50   N/A  N/A
Setbacks and Siting (C1 has specific setbacks; C2/C3/C4 use Section 4.3 defaults *):
  Despite Subsection 4.3.1, the following apply for C1:
- Min Front lot line setback (m):                                0.0  *    *    *
- Min Rear setback abutting non-commercial/non-industrial (m):   6.1  *    *    *
- Min Rear setback abutting commercial or industrial zone (m):   0.0  *    *    *
- Min Interior side abutting non-commercial/non-industrial (m):  6.1  *    *    *
- Min Interior side abutting commercial or industrial zone (m):  0.0  *    *    *
- Min Exterior side lot line setback (m):                        0.0  *    *    *
- Dwelling units not permitted in basement or below commercial:  N/A  ♦    N/A  N/A
(* = Section 4.3 provisions apply)
Info Note: Ministry of Transportation requires any building be min 4.5m from public road right-of-way unless Ministry setback permit granted.
Info Note: Vegetation screens required where commercial uses take place outside a building adjacent to non-commercial uses (Section 3.4).

Section 9.2.3 — Subdivision Requirements [amended BL489]:
Min lot area (ha):                                               C1   C2   C3   C4
  On-site sewage + potable water                                 1    1    1    1
  On-site sewage + community water                               1    .4   1    1
  Community sewage + community water                             .046 .046 .046 .046

Section 9.2.4 — Zone Variations:
- C1(a): Additional permitted uses: retail gasoline sales (max 160 sqm area); a liquor store.
- C1(b) [BL492]: Additional permitted use: liquor-primary.
- C1(c): Only the following uses are permitted: marina and marina services; marine fuelling stations; marine related retail stores and offices; boat rentals; marine equipment rentals excluding personal watercraft.
- C1(d): Additional permitted use: public schools.
- C1(e): (Deleted — BL444)
- C1(f) [BL378, BL492]: Notwithstanding Section 9.2.1, the only permitted use is: a parking lot.
- C1(g) [BL397]: Additional permitted use: a liquor store.
- C2(a) [BL430]: Additional permitted use: a parking lot.
- C2(b) [BL464]: Additional permitted use: dwelling units. Despite Subsection 9.2.2, max combined lot coverage of all buildings and structures is 33%.
- C4(a) [BL452, BL460]: Additional principal uses: indoor retail sales; indoor production of food/drink/clothing/crafts/artwork/jewellery for retail or wholesale sales (with retail outlet, water max 1600 L/day). Additional accessory use: dwelling units.
- C5(a) [BL489]: Despite Section 4.3, setbacks: 4.5m from front lot line; 1.0m from interior side abutting commercial or GE zone; 3.0m from interior side abutting non-commercial/non-GE zone. Rain collection structure permitted within rear and interior side setbacks. Max 37 dwelling units per ha. No off-street loading required. One parking space per dwelling unit not exceeding 70 sqm floor area. (Zone Variation C6(a) deleted.)

SECTION 9.3 — COMMERCIAL ACCOMMODATION ZONES (CA1-CA5) [amended BL492]:

Section 9.3.1 — Permitted Uses (♦ = permitted):
PRINCIPAL USES:                                                       CA1  CA2  CA3  CA4  CA5
Commercial guest accommodation units in hotels and motels              ♦    ♦
Commercial guest accommodation units in cabins                         ♦    ♦    ♦
Commercial guest accommodation units in guest houses                                  ♦
Commercial guest accommodation in a tourist hostel                                         ♦
Liquor-primary                                                         ♦    ♦
Restaurants                                                            ♦    ♦
Marina administration and services, incl washrooms/showers/laundry     ♦    ♦
Boat rentals                                                           ♦    ♦
Boat accommodation, servicing and maintenance, incl refuelling         ♦
Campgrounds subject to Schedule "F"                                         ♦              ♦
Single family dwellings                                                                    ♦
Public service uses                                                    ♦    ♦    ♦    ♦    ♦
ACCESSORY USES:
Residential use accessory to commercial guest accommodation,           ♦    ♦    ♦
  restaurant use, or marina administration and service
Retail sales accessory to commercial guest accommodation or marina     ♦    ♦    ♦
Retail services accessory to commercial guest accommodation            ♦    ♦    ♦
Boat rentals accessory to a principal use                                             ♦
Accessory campground                                                                       ♦

Section 9.3.2 — Size, Siting and Density:
                                                                  CA1  CA2  CA3  CA4  CA5
Lot Coverage and Floor Area:
- Max lot coverage (%)                                            33   33   33   20   5
- Max floor area per ha of commercial guest accommodation (sqm)   N/A  N/A  600  N/A  N/A
- Max floor area of a tourist hostel (sqm)                        N/A  N/A  N/A  N/A  450
- Max combined floor area of accessory retail sales/services (sqm)20   10   10   N/A  N/A
- Min floor area per bed space, beds not stacked (sqm)            N/A  N/A  N/A  N/A  3.7
- Min floor area per bed space, beds stacked (sqm)                N/A  N/A  N/A  N/A  2.8
- Max combined floor area accessory storage buildings (sqm)       70   70   70   70   70
Number of Units:
- Max commercial guest accommodation units on one lot             50   50   50   9    N/A
- Max combined guest accommodation units and campsites per ha     35   15   10   N/A  N/A
- Max number of guests permitted                                  N/A  N/A  N/A  N/A  40
- Max number of buildings for tourist hostel accommodation         N/A  N/A  N/A  N/A  3
- Max number of campsites in a campground                         N/A  N/A  N/A  N/A  4
- Max dwelling units per lot                                      1    1    1    N/A  1
Setbacks:
- Min rear/interior side lot line setback abutting another        15   15   15   15   15
  lot in a Commercial Accommodation zone (m)
- Min setback from any lot line not abutting another CA zone (m)  *    *    *    *    10
(* = Section 4.3 provisions apply)

Section 9.3.3 — Subdivision Requirements:
Min Lot Areas (ha):                                               CA1  CA2  CA3  CA4  CA5
- Min average area of lots in a subdivision                       2    2    2    2    2
- Min individual lot (on-site sewage + potable water)             2    2    2    2    .6
- Min individual lot (community sewage + community water)         2    2    2    .32  .6

Section 9.3.4 — Zone Variations:
- CA1(a): Additional permitted uses: recreational services; one single-family dwelling per lot; campgrounds subject to Schedule "F". Size/siting: (a) min 9 ha for commercial use; (b) max 4 guest accommodation units per ha; (c) cabins max 116 sqm floor area, max 2 storeys; (d) residential buildings no setback from any lot line; (e) commercial buildings min 7.6m from any lot line; (f) no max site coverage for residential buildings. Subdivision: no min lot area, min avg 0.50 ha (with on-site sewage + potable water), lots with depth < 30m and building envelope < 280 sqm permitted. On Lot 72 Strata Plan 905: max 18 single-family dwelling units (incl manager's), max 750 sqm combined accessory buildings.
- CA1(b): Only permitted uses: hotel; commercial guest accommodation units in cabins. Size/siting: (a) max lot coverage 10%; (b) cabins max 116 sqm floor area; (c) min 0.5 ha for commercial use; (d) max 20 commercial guest accommodation units per ha.
- CA1(c): Additional principal uses: boat building/repairs, marine-dependent sales/rentals/services; laundromat; car rentals. Building setbacks from natural boundary of sea do not apply to boat building/repairs/marina buildings. Max combined floor area of guest accommodation units: 700 sqm (on lots > 0.4 ha: one unit per 0.04 ha extra; no unit > 95 sqm; average of additional units max 55 sqm).
- CA1(d): Additional permitted uses: car rentals. Building setbacks from natural boundary of sea do not apply to boat/marina buildings. Max combined floor area of guest accommodation: 700 sqm (same formula as CA1(c)).
- CA1(e): Max number of commercial guest accommodation units is 8.
- CA1(f) [BL384, BL397, BL508]: Despite Article 9.3.2(1), total floor area max 215 sqm may be devoted to accessory liquor store within existing main building. Max 41.5 sqm for accessory retail services within existing main building. Lands zoned CA1(f) permit 55 commercial guest accommodation units and 3 accessory dwelling units (exclusively for hotel employees/families). Buildings sited as shown on Schedule "L".
- CA1(g) [BL431]: Max 8 commercial guest accommodation units. Max lot coverage 60%. Despite Section 4.3, setbacks from lot lines/road access easements: front 0m, rear 0m, interior side 0m, exterior side 0m.
- CA2(a): Max combined number of commercial guest accommodation units and campsites is 30.
- CA2(b) [BL397]: Max combined number of commercial guest accommodation units and campsites is 8. Additional permitted use: accessory liquor store (max 95 sqm floor area).
- CA3(a): Max combined number of commercial guest accommodation units and campsites is 25, provided that commercial guest accommodation units may not exceed 10 per ha.
- CA5(a): (a) Campsites may only be occupied by tents; (b) no more than one room in the tourist hostel for construction or cooking; (c) landscaping strip min 10m wide, 3m high along all property lines (except one driveway break and panhandle access strips); (d) fencing/signage to prevent trespassing; (e) no tourist hostel or accessory campground on any lot adjoining a lot occupied by a tourist hostel; (f) two off-site directional signs max 0.25 sqm each permitted.
`,

// ── lub_zones_other: Sections 9.4 (CF), 9.5 (CD), 9.6 (F), 9.7 (GE), 9.8 (PR) ──
lub_zones_other: `
LUB 355 — SECTIONS 9.4-9.8: CF, CD, FORESTRY, EMPLOYMENT & PARKS ZONES

SECTION 9.4 — COMMUNITY FACILITIES ZONES (CF1, CF2) [amended BL489, BL490]:

Section 9.4.1 — Permitted Uses (♦ = permitted):
PRINCIPAL USES:                                                    CF1   CF2
Public schools, pre-schools and child day care centres              ♦
Libraries                                                          ♦
Churches                                                            ♦
Community halls                                                     ♦
Public hospitals, clinics and health care facilities                ♦
Non-commercial active outdoor recreation                            ♦
Non-commercial indoor recreation facilities                         ♦
Service club buildings                                              ♦
Performing and visual art centres, including accessory sales        ♦
Collection of recyclable materials                                  ♦     ♦
Sorting and temporary storage of recyclable materials                     ♦
Collection of municipal solid waste                                       ♦
Sorting and temporary storage of municipal solid waste                    ♦
Liquid waste treatment                                                    ♦
Public service uses                                                 ♦     ♦
ACCESSORY USES:
Intermittent retail sales and retail services accessory              ♦     ♦
  to a principal use

Section 9.4.2 — Size, Siting and Density [amended BL489]:
Lot Coverage:                                                      CF1   CF2
- Max lot coverage (%)                                             25    25
Setbacks (despite Subsection 4.3.1):
- Min rear lot line setback abutting commercial or GE zone (m)     3.0   *
- Min interior side abutting non-commercial/non-GE zone (m)        7.5   7.5
- Min interior side abutting commercial or GE zone (m)             *     7.5
- Min exterior side lot line setback (m)                           *     7.5
(* = Section 4.3 provisions apply)

Section 9.4.3 — Subdivision:
- Min individual lot (on-site sewage + potable water) (ha):        1     1
- Min individual lot (community sewage + community water) (ha):    0.2   0.2

Section 9.4.4 — Zone Variations:
- CF1(a): Max combined lot coverage of all buildings and structures is 75%.
- CF1(b) [BL386]: Notwithstanding Section 9.4.1(1), Libraries are a prohibited use.
- CF1(c) [BL454]: Agriculture is a permitted principal use.
- CF1(d) [BL456]: Despite all other regulations, only the following principal uses are permitted: (a) public hospitals, clinics and health care facilities; (b) public schools, pre-schools and child day care centres; (c) performing and visual art centres; (d) public service uses. Only accessory uses: (a) indoor retail sales accessory to another permitted use; (b) dwelling units accessory to, and located above, another permitted use. A vegetation screen not less than 7.5m must be provided between property and lands within the Agricultural Land Reserve (unless within BC Hydro right-of-way).

SECTION 9.5 — COMPREHENSIVE DEVELOPMENT ZONES (CD1, CD2, CD3) [amended BL492]:

Section 9.5.1 — Permitted Uses (♦ = permitted):
PRINCIPAL USES:                                    CD1   CD2   CD3
Single-family dwellings                            ♦     ♦     ♦
Duplexes (pre-July 31, 1990)                       ♦     ♦
Multi-family dwellings                             ♦     ♦
Elementary schools, pre-schools, day care          ♦     ♦
Public health clinics                              ♦
Community halls                                    ♦
Outdoor active recreation                          ♦
Public indoor recreation facilities                ♦
Indoor retail sales use                                  ♦
Indoor retail services                                   ♦
Offices                                                  ♦
Banks and credit unions                                  ♦
Restaurants                                              ♦
Automobile rentals (max 5 vehicles)                      ♦
Public service uses                                ♦     ♦     ♦
ACCESSORY USES:
Seasonal cottages (Section 3.14 and 9.5.2)                           ♦
Home-based business (Section 3.13)                 ♦     ♦     ♦

Section 9.5.2 — Size, Siting and Density:
Lot Coverage and Floor Areas:                      CD1   CD2   CD3
- Max lot coverage (%)                             33    33    10
- Max floor area per lot of community hall,        930   N/A   N/A
  church, pre-school, or day care centre (sqm)
- Max floor area each non-residential use (sqm)    N/A   139   N/A
- Max number of commercial uses per                N/A   1     N/A
  two residential uses per lot
Number of Units and Min Site Areas:
- Max dwelling units per ha                        12.3  12.3  N/A
- Min lot area for child day care centre (ha)      1     N/A   N/A
- Min lot area for multi-family dwelling (ha)      .08   .08   N/A
- Min lot area for seasonal cottage (ha)           N/A   N/A   2
Setbacks:
- Min front lot line setback (m)                   3.0   4.5   *
- Min rear lot line setback (m)                    3.0   4.5   *
- Min exterior side lot line setback (m)           3.0   4.5   *
Height:
- Max height (m)                                   §     11.0  §
- Max storeys                                      §     3     §
(* = Section 4.3 provisions apply, § = Section 3.8 provisions apply)

Section 9.5.3 — Subdivision:
                                                   CD1   CD2   CD3
Min individual lot (ha)                            0.08  0.08  1.2
Min avg area lots (ha)                             0.08  0.08  4.6
Water supply: community water system required (CD1, CD2); adequate potable water (CD3).
Sewage: community sewage collection system (CD1, CD2); individual on-site (CD3).
CD3 special: min avg area may be reduced to 4.2 ha if: (a) applicant constructs community recreational ballpark facility on CRD land per Schedule "B", or (b) applicant provides funds (min 75% of financial benefit from reduced lot area) to SSI Local Trust Committee for CRD construction of community recreational facility.

SECTION 9.6 — FORESTRY ZONES (F1, F2):
Permitted principal uses:                          F1    F2
Forestry production/harvesting                     ♦     ♦
Single-family dwellings                            ♦     ♦
Duplexes (pre-July 31, 1990)                       ♦
Forestry research and education                    ♦     ♦
Agriculture                                        ♦     ♦
Public service uses                                ♦
Accessory: home-based business (F1, F2), seasonal cottages (F1 only).
Size/Siting: Max lot coverage 10% (both zones).
Subdivision: Min individual lot 8 ha (both zones), with on-site sewage + adequate potable water.
Zone Variations:
- F1(a): Min avg area by subdivision 2 ha, min individual lot 0.6 ha (with on-site sewage + potable water).
- F1(z): Max lots in all lands zoned F1(z), F2(z), F1(a)(z), R(z) and RU1(z) combined ≤ 72.
- F2(a): Second dwelling unit permitted (max 111.48 sqm / 1200 sq ft). No dwelling within 20m of southern interior side lot line.
- F2(z): Max lots in all lands zoned F1(z), F2(z), F1(a)(z), R(z) and RU1(z) combined ≤ 72.

SECTION 9.7 — GENERAL EMPLOYMENT ZONES (GE1, GE2, GE3):
Info Note: In ALR, uses only permitted if also permitted by Agricultural Land Commission.
Permitted principal uses:                          GE1   GE2   GE3
Boat building, servicing, repairs                  ♦     ♦     ♦
Car wash                                                 ♦     ♦
Car wash accessory to vehicle sales/rental/repair  ♦     ♦     ♦
Collection of recyclable materials                 ♦     ♦     ♦
Commercial composting facility                     ♦     ♦     ♦
Contractor's shop                                  ♦     ♦     ♦
Creative industry                                  ♦     ♦     ♦
Farm-related light industry                        ♦     ♦     ♦
Food processing (incl off-farm)                    ♦     ♦     ♦
Funeral homes                                      ♦     ♦     ♦
Indoor storage                                     ♦     ♦     ♦
Light industry                                     ♦     ♦     ♦
Public service uses                                ♦     ♦     ♦
Public utility uses                                ♦     ♦     ♦
Equipment rental/repair/sales                      ♦     ♦     ♦
Building supplies/appliances/furniture sales       ♦     ♦     ♦
Veterinarian clinics, animal hospitals             ♦     ♦     ♦
Wholesale sales                                    ♦     ♦     ♦
Agriculture                                              ♦
Abattoir                                                 ♦     ♦
Cement factory                                                 ♦
Heavy equipment rental/sales/service                     ♦     ♦
Outdoor storage (goods/vehicles excl derelict)           ♦     ♦
Outdoor storage of commercial trucks/bulk fuel                 ♦
Processing/sorting construction aggregates                     ♦
Processing/sorting/storage timber & wood products              ♦
Waste materials storage (related to principal uses)            ♦
Vehicle/metal dismantling and recycling                        ♦
Accessory: retail sales, one dwelling unit, office use — all accessory to a permitted principal use.

Size/Siting:                                       GE1   GE2   GE3
Max lot coverage (%)                               75    66    33
Max floor area accessory dwelling (sqm)            185   185   185
Min front lot line setback (m)                     *     *     *
Min rear setback abutting non-GE zone (m)          6     6     7.5
Min rear setback abutting GE zone (m)              3     3     3
Min interior side abutting non-GE zone (m)         6     6     7.5
Min interior side abutting GE zone (m)             3     3     3
Min exterior side lot line (m)                     6     7.5   7.5
Commercial composting setback from all lot lines   30    30    30
Max height (m)                                     *     *     11
(* = Section 3.8 default of 10.7m applies)
Stormwater: If impervious surface ≥ 280 sqm, no further impervious surface without engineer's stormwater design.
Subdivision: Min individual lot 0.6 ha (on-site sewage + potable water) or 0.2 ha (community services), all zones.

Zone Variations:
- GE1(a): Only permitted uses: light industry, funeral homes, building supplies/furniture sales, storage (no derelict/waste), public service uses, farm-related light industry, offices, personal services, dwelling unit in Strata Lot 4 Plan VIS4561, creative industry, food processing. Water consumption max 1000 litres/day. Accessory: indoor retail sales only.
- GE1(b): Additional: storage of goods/vehicles (no derelict/waste).
- GE1(c): Additional: laundromat.
- GE1(d): Additional: processing/sorting/storage timber and wood products, sawmills and planing mills.
- GE2(a): Additional: indoor/outdoor retail/wholesale sales of building/garden supplies/appliances/furniture with accessory outdoor sales/storage. Also outdoor storage of commercial trucks/bulk fuel, and processing/sorting construction aggregates. Lot coverage max 20%. Individual buildings max 3,250 sqm. 15m setback when abutting ALR.
- GE2(b): Additional: agriculture, farm buildings/structures, agriculture and food research/education.
- GE2(c): Additional: outdoor storage of commercial trucks/bulk fuel, processing/sorting aggregates, vehicle/metal dismantling and recycling. All additional uses set back 60m from water body.
- GE2(d): Additional: laundromat.
- GE2(f): Additional: outdoor storage of derelict vehicles, waste materials storage related to principal uses.
- GE3(a): All uses must be marine-dependent. Minimum rear lot line setback is 10m.

SECTION 9.8 — PARK AND RESERVES ZONES (PR1-PR6):
Permitted principal uses:                     PR1   PR2   PR3   PR4   PR5   PR6
Park administration offices                   ♦     ♦
Passive outdoor recreation                    ♦     ♦     ♦           ♦     ♦
Active outdoor recreation (excl golfing)      ♦     ♦           ♦
Golf course including practice areas                            ♦
Golf club house                                                 ♦
Accessory: retail sales and restaurant (PR4 only), caretaker's dwelling unit (PR1, PR2, PR4, PR5).

Size/Siting:                                  PR1   PR2   PR3   PR4   PR5   PR6
Max lot coverage (%)                          33    5     5     5     1     N/A
Min lot area for accessory dwelling (ha)      4     4     4     4     4     N/A
Max floor area accessory dwelling (sqm)       95    95    N/A   95    95    N/A
Max floor area golf clubhouse + accessory
  buildings incl retail/restaurant (sqm)      N/A   N/A   1675  N/A   N/A   N/A
Subdivision: Min individual lot 65 ha (PR1, PR2, PR4, PR5) or 20 ha (PR3) or 65 ha (PR6), with on-site sewage + potable water.

Zone Variations:
- PR2(a): Additional: campground.
- PR3(a): Additional: two indoor tennis courts or similar sports facilities, indoor squash court. Max 3 buildings, max tennis court building height 8.5m.
- PR4(a): Additional: accessory intermittent outdoor retail sales to max 25% lot coverage.
- PR4(b): Additional: commercial parking lot, marina administration offices and services.
- PR5(a): Additional: pre-schools and child day care centres, community halls.
- PR5(b): Additional: campground.
- PR5(c): Additional: telecommunication facilities serving the general region.
`,

// ── lub_zones_rural: Rural, Upland, Watershed, Shoreline zones ──
lub_zones_rural: `
LUB 355 — ZONE REGULATIONS: RURAL, UPLAND, WATERSHED & SHORELINE

RURAL, UPLAND, WATERSHED AND SMALLER ISLAND ZONES (Section 9.10):
Zones: R (Rural), RU1 (Rural Uplands 1), RU2 (Rural Uplands 2), RU3 (Rural Uplands 3), RW1 (Rural Watershed 1), RW2 (Rural Watershed 2), Ri (Rural Island)

Section 9.10.1 – Permitted Uses of Land, Buildings and Structures:
Principal Uses:
- Single-family dwellings: R ♦, RU1 ♦, RU2 ♦, RU3 ♦, RW1 ♦, RW2 ♦, Ri ♦
- Two family dwellings constructed before July 31, 1990: R ♦, RU1 ♦
- Dental and medical offices (max 2 practitioners): R ♦
- Elementary schools, pre-schools, child day care: R ♦, RU1 ♦
- Public health care facilities: R ♦, RU1 ♦
- Community halls: R ♦, RU1 ♦
- Churches and cemeteries: R ♦, RU1 ♦
- Veterinarian clinics and animal hospitals: R ♦, RU1 ♦
- Pet boarding services and kennels: R ♦, RU1 ♦
- Pounds: R ♦, RU1 ♦
- Active outdoor non-commercial recreation (excluding golf courses and power-driven conveyance): R ♦, RU1 ♦
- Lighthouse stations: Ri ♦
- Agriculture: R ♦, RU1 ♦, RU2 ♦, RU3 ♦, Ri ♦
- Agriculture, excluding intensive agriculture: RW1 ♦, RW2 ♦
- Public service uses: R ♦, RU1 ♦, RU2 ♦, RU3 ♦, Ri ♦
Accessory Uses:
- Seasonal cottages (Section 3.14): R ♦, RU1 ♦, RU3 ♦, Ri ♦
- Home-based business use (Section 3.13): R ♦, RU1 ♦, RU2 ♦, RU3 ♦, RW1 ♦, RW2 ♦, Ri ♦
Info Note: In the Agricultural Land Reserve, agriculture, farm buildings and farm structures are permitted similar to Agriculture 1 zone (see Section 3.3.1).
Info Note: All activities in RW1 and RW2 must be carried out in accordance with LUB 355, OCP 434, Agricultural Waste Control Regulation, Drinking Water Protection Act, Water Sustainability Act, Groundwater Protection Regulation, and Fisheries Act.

Section 9.10.2 – Size, Siting and Density:
Lot Coverage and Floor Area:
- Max combined lot coverage: R 33%, RU1 33%, RU2 5%, RU3 10%, RW1 33%, RW2 33%, Ri 10%
- Max floor area for community hall/church/pre-school/day care (sq m): R 930, RU1 930, RU2 N/A, RU3 N/A, RW1 N/A, RW2 N/A, Ri N/A
- Max total floor area of farm buildings and farm structures (sq m): all zones 465
Number of Units and Minimum Site Areas:
- Max dwelling units per 8 ha (except secondary suites where permitted): R N/A, RU1 N/A, RU2 1, RU3 N/A, RW1 N/A, RW2 N/A, Ri N/A
- Max seasonal cottages per 8 ha: R N/A, RU1 N/A, RU2 1, RU3 N/A, RW1 N/A, RW2 N/A, Ri N/A
- Min lot area for day care centre (ha): R 2, RU1 2, RU2 N/A, RU3 N/A, RW1 N/A, RW2 N/A, Ri N/A
- Min lot area for pet boarding/kennels (ha): R 4, RU1 4, RU2 N/A, RU3 N/A, RW1 N/A, RW2 N/A, Ri N/A
- Min lot area for pound (ha): R 2, RU1 2, RU2 N/A, RU3 N/A, RW1 N/A, RW2 N/A, Ri N/A
Setbacks (* = Section 4.3 provisions apply):
- Front lot line: R *, RU1 *, RU2 15m, RU3 *, RW1 *, RW2 *, Ri *
- Rear lot line: R *, RU1 *, RU2 15m, RU3 *, RW1 *, RW2 *, Ri *
- Interior side lot line: R *, RU1 *, RU2 15m, RU3 *, RW1 *, RW2 *, Ri *
- Exterior side lot line: R *, RU1 *, RU2 15m, RU3 *, RW1 *, RW2 *, Ri *
Water Body Setbacks (in addition to Section 4.5):
- Min setback for agriculture from natural boundary of water body: R N/A, RU1 N/A, RU2 N/A, RU3 N/A, RW1 15m, RW2 15m, Ri N/A
- Min setback for livestock/poultry from natural boundary of water body: R N/A, RU1 N/A, RU2 N/A, RU3 N/A, RW1 15m, RW2 15m, Ri N/A

Section 9.10.3 – Subdivision and Servicing Requirements:
- Adequate supply of potable water required: all zones ♦
- Individual on-site sewage treatment required per lot: all zones ♦
- Min average area of lots in subdivision (ha): R 2, RU1 8, RU2 32, RU3 2.8, RW1 4, RW2 12, Ri 2
- Min individual lot area with on-site sewage + adequate potable water (ha): R 0.6, RU1 0.6, RU2 32, RU3 2, RW1 4, RW2 12, Ri 0.6
- Min individual lot area with on-site sewage + community water system (ha): R 0.4, RU1 0.6, RU2 32, RU3 2, RW1 4, RW2 12, Ri 0.4
- Min individual lot area with community sewage + community water (ha): R 0.4, RU1 0.6, RU2 32, RU3 2, RW1 4, RW2 12, Ri 0.4

Section 9.10.4 – Zone Variations (Exceptions in Particular Locations):
- R(a): Additional permitted use — construction and repair of boats.
- R(b): Seasonal cottage may be used for permanent residential occupancy.
- R(c): Min average area of lots by subdivision is 1.2 ha.
- R(d): Max number of lots in entire R(d) area shall not exceed 1.
- R(e): (a) Additional 15 lots permitted via density transfer from Lots 30/31 North SSI. (b) Seasonal cottage on max 60% of lots in bareland strata subdivision if total land area minus road area / total residential lots > 1.2 ha. Bare land strata lots for seasonal cottages = lots with largest lot area.
- R(f): Instead of seasonal cottage, permitted: seasonal cottage (Section 3.14) or full-time rental cottage (Section 3.15).
- R(g): Additional permitted uses — private yacht club outstation (max 26 sqm floor area), outdoor passive recreation and parking accessory to yacht club outstation.
- R(h): Max lots in entire R(h) area ≤ 3 (density transfer). No seasonal cottage on lots < 3.5 ha.
- R(i): Max lots in entire R(i) area ≤ 8 (density transfer to Lot 5, Section 39, South SSI).
- R(j): (defeated)
- R(k): Max lots in R(k) area ≤ 2. Max 1 seasonal cottage, located on specific lot (Remainder Lot 20, Section 85, South SSI, Plan 31795).
- R(l): Max lots in R(l) area ≤ 2. Min individual lot area by subdivision 0.6 ha.
- R(m): Only permitted principal uses: affordable housing dwelling units, one single-family dwelling, agriculture, public service uses. Max 10 affordable housing units, max 6 per multifamily building, max 10 dwelling units per lot total. No B&B or boarding houses in affordable housing. No auto repair.
- R(n): Only permitted uses/buildings: one single-family dwelling, four dwelling units (max 50 sqm each), tasting room (max 90 sqm), beer/liquor production/sales/storage, accessory retail sales (max 10 sqm floor area), accessory buildings (max 20 sqm floor area).
- R(o): Max 2 seasonal cottages permitted. Min average lot size by subdivision is 1 ha.
- R(p): Max 1 boathouse (max 60 sqm). Setback from natural boundary of sea is 15m.
- R(z): Max lots in all lands zoned F1(z), F2(z), F1(a)(z), R(z) and RU1(z) combined ≤ 72.
- RU1(a): Additional permitted use — plant nursery. Min average lot area by subdivision 16 ha. Min individual lot area 2 ha (with on-site sewage).
- RU1(b): Additional permitted uses — religious retreat/reception/retreat centres, meditation halls/cabins, farm buildings. Intensive agriculture NOT permitted. Max 2 retreat centres, 1 meditation hall, 6 meditation cabins, 1 reception centre per 65 ha. No building within 20m of any lot line. Min individual lot by subdivision 32 ha.
- RU1(c): Min individual lot by subdivision 3.5 ha if min average of all lots in subdivision is 5 ha.
- RU1(d): Additional permitted use — telecommunication facilities serving the general region.
- RU1(e): Max lots in entire RU1(e) area ≤ 1.
- RU1(f): Instead of seasonal cottage, permitted: seasonal cottage (Section 3.14) or full-time rental cottage (Section 3.15).
- RU1(z): Max lots in all lands zoned F1(z), F2(z), F1(a)(z), R(z) and RU1(z) combined ≤ 72.
- RW1(a): Additional permitted use — native wildlife recovery centre including accessory buildings (max 560 sqm floor area).

ZONE QUICK REFERENCE – RURAL / UPLAND / WATERSHED / ISLAND:
- R (Rural): Lot coverage 33%, min lot 2 ha avg (0.4-0.6 ha individual depending on servicing). Broadest rural permitted uses including schools, churches, community halls, vet clinics, kennels, pounds. Seasonal cottages and home-based business permitted.
- RU1 (Rural Uplands 1): Lot coverage 33%, min lot 8 ha avg (0.6 ha individual). Similar permitted uses to R. Schools, community halls, kennels, pounds permitted. Seasonal cottages and home-based business permitted.
- RU2 (Rural Uplands 2): Lot coverage 5%, min lot 32 ha. Max 1 dwelling per 8 ha. 15m setbacks all sides. Most restrictive upland zone. Agriculture and public services permitted. Home-based business permitted.
- RU3 (Rural Uplands 3): Lot coverage 10%, min lot 2.8 ha avg (2 ha individual). Agriculture and public services permitted. Seasonal cottages and home-based business permitted.
- RW1 (Rural Watershed 1): Lot coverage 33%, min lot 4 ha. Agriculture permitted (excluding intensive). 15m setback from water bodies for agriculture and livestock. Home-based business permitted. Activities must comply with water protection legislation.
- RW2 (Rural Watershed 2): Lot coverage 33%, min lot 12 ha. Agriculture permitted (excluding intensive). 15m setback from water bodies. Home-based business permitted. Activities must comply with water protection legislation.
- Ri (Rural Island): Lot coverage 10%, min lot 2 ha avg (0.4-0.6 ha individual). Lighthouse stations permitted. Agriculture, public services, seasonal cottages, home-based business permitted.

SHORELINE ZONES (Section 9.11):
Info Note: Shoreline zoning covers entire SSI Local Trust Area (except Piers Island and Crown foreshore within 300m of Vancouver Island). Buildings must not be within 10m of eelgrass (Zostera marina) indicated on Schedule K, or within 125m of clam beds on OCP Map 10.

Section 9.11.1 — Permitted Uses (♦ = permitted):
PRINCIPAL USES:                                    S1    S2    S3    S4    S5    S6    S7    S8
Navigational uses                                  ♦     ♦     ♦     ♦     ♦     ♦     ♦     ♦
Geothermal heating (in tidal waters only)          ♦     ♦     ♦     ♦     ♦     ♦     ♦
Private floats/buoys (non-commercial moorage)                  ♦     ♦     ♦     ♦     ♦
Private docks/floats for non-commercial use                    ♦     ♦     ♦     ♦
  accessory to permitted use on adjacent upland
Aquaculture (excl fin fish)                                                ♦
Public ferry wharves                                           ♦
Docks for temporary commercial wharfage            ♦     ♦           ♦
Docks for private boat club wharfage                                       ♦
Commercial moorage/wharfage of resident boats      ♦     ♦           ♦
Marine fuelling services                           ♦     ♦
Retail sales of boating accessories                ♦
Commercial sea plane docks                         ♦
Sporting equipment sales/rental (excl watercraft)  ♦     ♦
Boat sales, rentals, servicing businesses          ♦     ♦
Commercial boat building and repair                ♦
Barge loading/unloading piers                      ♦           ♦
Log sorting and storage                            ♦
ACCESSORY USES:
Docks/floats/wharves for aquaculture                                       ♦
Docks/floats/walkways/ramps/breakwaters            ♦     ♦     ♦     ♦     ♦
  accessory to permitted use
Breakwaters/seawalls accessory to maintenance      ♦
  of a principal permitted use
Dwelling unit for aquaculture owner/operator                               ♦
Accessory buildings to house a permitted use       ♦
  (excl boat shelters)

Section 9.11.2 — Size, Siting and Density:
                                                   S1    S2    S3    S4    S5    S6    S7    S8
Max float area non-commercial moorage (sqm)        N/A   N/A   N/A   N/A   N/A   35    35    N/A
Max float area for private docks (sqm)             N/A   N/A   N/A   N/A   N/A   35    N/A   N/A
Max dwelling units                                 N/A   N/A   N/A   N/A   1     N/A   N/A   N/A
Max dwelling unit floor area (sqm)                 N/A   N/A   N/A   N/A   60    N/A   N/A   N/A
Max building size (sqm)                            60    N/A   N/A   N/A   N/A   N/A   N/A   N/A
Max height of buildings/structures (m)             4.5   4.5   10    4.5   4.5   4.5   4.5   4.5

Section 9.11.3 — Zone Variations:
- S1(a): Log sorting and storage NOT permitted. Marina defined to include marine sewage pump-out and public boat ramp.
- S2(a): Min 87 linear metres of wharfage for temporary/transient boats.
- S5(a): Additional: growing/cultivation of fin fish; fin fish pens and structures.
- S6(a): Additional: non-commercial private yacht club moorage (max 43m berth length), total float area max 190 sqm. Min parking: 1 space per 20m of non-commercial moorage.
- S6(b): Additional accessory: floating breakwaters. Total float area max 65 sqm.
- S8(a): Additional: storage of inert marine equipment, accessory floats and mooring buoys. Max float 35 sqm. Max 33% of S8(a) zone occupied by moored floats.
- S8(a) [BL503]: Additional: private buoys for non-commercial boat moorage.
`,

// ── lub_additional: ALR, DPA, TUP, Variances ──
lub_additional: `
LUB 355 — ADDITIONAL IMPORTANT RULES

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

agricultural: `
[Resource Land Use (Agriculture, Forestry)]
B.6 RESOURCE LAND USE OBJECTIVES AND POLICIES, Article B.6.2.2.15. In
reviewing such applications, the Committee should consider whether:
a. the site has limited agricultural potential.
b. existing general employment and commercial service lands have been developed to about
80 per cent of their practical development potential.
c. the rezoning application applies to land that is next to or across a road from existing
general employment land.
d. the proposed development would be well buffered from adjacent non-general employment
land.
e. there are adequate water supplies and a satisfactory means of sewage disposal.
Background Note: No application to rezone land within the Agricultural Land Reserve
will proceed without the support of the Agricultural Land Commission.
B.6.2.2.1 The Local Trust Committee should maintain an Agricultural Advisory Committee to:
a. provide community advice about bylaw changes, applications for rezoning or subdivision, and
applications to the Agricultural Land Commission.
b. help in developing and interpreting local policies about farming.
c. identify other ways that the Local Trust Committee can encourage and support farming in the
community.
B.6.2.2.8 On the advice of the Agricultural Advisory Committee, the Local Trust Committee should continue
to support local farming by:
a. addressing the need for additional housing on agricultural land.
b. permitting appropriate farm uses as defined by the Agricultural Land Reserve Act and
Regulations.
c. recognizing the traditional uses of the property owned by the Salt Spring Island Farmer's
Institute on Rainbow Road.
d. allowing for the processing and warehousing of island farm products on the Institute's
property.
e. supporting zoning that would allow various forms of community farming activities.
f. supporting the development of farmers' markets.
g. considering changes to the Land Use Bylaw, based on the objectives of the Area Farm
Plan and in consultation with the Agricultural Land Commission and the Ministry of
Agriculture and Lands, to permit additional dwellings for farm workers.
h. considering changes to the Land Use Bylaw to further support agri-tourism.
BL496 i. supporting efforts to ensure a viable local livestock industry.
(02/19)
j. updating agricultural information, monitoring changes in the agricultural sector and
helping to identify unused or available farmland.
B.6.2.2.9 The minimum average size of lots that can be created by subdivision in the Agriculture and
Watershed-Agriculture Designation will remain the same as permitted by existing zoning. The
Local Trust Committee could consider amending the minimum size of individual lots, if such a
change would benefit local farming or protect agricultural land by allowing clustered development.
Background Note: The minimum parcel sizes and minimum average parcel sizes outlined in the
Land Use Bylaw apply only when land is:
a. excluded from the Agricultural Land Reserve, or
b. approved for subdivision by the Agricultural Land Commission.
An exception to the minimum lot sizes can be made where a home site is
being created for a relative as outlined in Section 946 of the Local
Government Act. Such subdivisions must also be approved by the
Agricultural Land Commission.
B.6.2.2.19 When it considers rezoning applications for land that borders or drains into agricultural land, the
Local Trust Committee will ensure that zoning changes are not made in a way that would have a
negative effect on farming. For example, the Committee could require that a vegetation buffer
be maintained on land that is being rezoned next to farm land, if the proposed use could result in
conflicts with a farming operation. The Committee should also ensure that a zoning change
would not result in detrimental changes to natural drainage or pollution of water supplies. The
Agricultural Advisory Committee will be asked for advice about rezoning applications on land
that borders or drains into agricultural land.
BL488 B.6.2.2.21 The Local Trust Committee will use the Development Permit process to ensure that development
(07/20) in higher density areas such as commercial, general employment and multifamily zones remains
buffered from agricultural areas, is designed to reduce conflicts with agriculture, and does not
result in detrimental impacts due to water pollution or changes in the drainage regime.
B.6.2.2.32 The Local Trust Committee will support the implementation of the Area Farm Plan by the Salt
Spring Island Agricultural Alliance.
Background Note: "Where properties are located within the Agricultural Land Reserve, they are
subject to the Agricultural Land Commission Act, Regulations and relevant
Orders pursuant to the Act. The approval of the Agricultural Land
Commission will therefore be required in addition to any authority obtained in
accordance with the policies contained in this Plan or other bylaws governing
land use. Furthermore, policies and bylaws must be consistent with the Act,
failing which they will have no force or effect." - Agricultural Land
Commission
B.6.3.2.3 The minimum size of lots that can be created by subdivision in zones within the Forestry and
Watershed-Forestry Designation will remain the same as allowed by existing zoning.
B.6.3.2.7 The Provincial Government is encouraged to develop forestry policies and regulations that ensure
and support sustainable forest practices and protect drinking water sources on all privately owned
forest lands.

[Definition: agri-tourism]
agri-tourism — tourist activity, service or facility accessory to land that is classified as a farm under the Assessment Act.

[Definition: agricultural land]
agricultural land — as used in the objectives and policies in B.6.2 of this plan, refers to land that is designated 'Agriculture' on Map 1 and may include land in the Agricultural Land Reserve, land in an Agricultural zone and land that is classified as a farm under the Assessment Act.
`,

commercial: `
[Non-Village Commercial and General Employment]
B.3 NON-VILLAGE COMMERCIAL AND GENERAL EMPLOYMENT LAND USE
OBJECTIVES AND POLICIES
B.3.1.2.5 Campgrounds are permitted by zoning in some Agriculture-zoned locations. The Local Trust
Committee should consider rezoning applications from property owners wishing to develop small,
low impact campgrounds on larger properties in the following Designations:
Rural Neighbourhoods
Agriculture (subject to approval of the Agricultural Land Commission)
Forestry
Uplands

Applications for such a zoning change should demonstrate an adequate water supply,
appropriate sewage disposal capability, and a site plan that would be uncrowded and well
buffered by natural vegetation from neighbouring properties. If the Local Trust Committee
considers such rezoning applications, preference should be given to those where services can be
easily reached by walking, bicycle or public transit. Rezoning applications for the development of
campgrounds meant primarily for large Recreational Vehicles should not be considered.
B.3.1.2.8 To manage the impact of commercial tourist accommodation zones located in residential areas,
the Local Trust Committee could consider retaining zoning to:
a. limit the maximum number of tourist accommodation units in any one operation to 50 units.
b. establish an appropriate total floor area for tourist operations and for the accessory uses
currently allowed in commercial tourism accommodation zones.
c. establish standards for vegetation screening next to residential property.
d. establish density and standards for campgrounds.
BL488 B.3.3.2.5 Deleted
(07/20)
BL488 B.3.3.2.8 The Local Trust Committee should consider rezoning applications that would reduce the
(07/20) minimum lot size that can be created in general employment zones to about 0.2 ha. The
Committee could consider rezoning applications to reduce the minimum lot size to about 0.1 ha
as part of a proposal to provide an eligible community amenity or transfer development potential
from a less suitable location.
BL488 B.3.3.2.11 Removal of up to 2 hectares from the Agricultural Land Reserve to create land zoned for general
(07/20) employment uses in the locations identified in Article
B.3.3.2.14 The Local Trust Committee should not support proposals for the exploration and extraction of
peat, metals, minerals, coal and petroleum resources from Salt Spring Island.

Background Note: The extraction of minerals is not a use of land that can be regulated or
controlled by local zoning, although the processing of minerals is an
industrial use and is subject to zoning. The Ministry Energy, Mines and
Petroleum Resources has resource management and regulatory
responsibility for the province's mineral and energy resources under the
Mineral Tenure Act, Petroleum and Natural Gas Act, Coal Act and the Mines
Act. The tenuring of aggregate resources on Crown Lands is the
responsibility of the Integrated Land Management Bureau under the Land
Act. The Ministry of Energy, Mines and Petroleum Resources is responsible
for the reclamation, permitting, inspection and safety of sand and gravel
extraction operations. The Ministry commonly consults with the Local Trust
Committee in considering issuing approvals for mining activities and can take
local policies and regulations into account.
Others are encouraged to help achieve the objectives of this Section as follows:

[Definition: bed and breakfast]
bed and breakfast — a tourist accommodation use operated as a home-based business and providing overnight accommodation and a morning meal in an owner-occupied dwelling unit.

[Definition: general employment]
general employment — use that consists of business and economic activities, including, but not limited to: processing, manufacturing, wholesaling, warehousing and distribution, bulk materials handling, storage, and associated office, retail and ancillary activities.

[Definition: guest house]
guest house — a building used for temporary tourist accommodation use that provides no more than 9 tourist accommodation units.

[Definition: home-based business]
home-based business — any activity carried out for gain by a resident and conducted as a subordinate and accessory use in the resident's principal dwelling unit or in accessory structures allowed besides a dwelling unit on a parcel.

[Definition: industry]
industry — a use that primarily consists of processing, manufacture, construction, assembly, storage, packaging, wholesale sale, repair of heavy equipment, and extraction with accessory retail sales that are incidental to the primary activity.

[Definition: industry, heavy]
industry, heavy — an industry that takes place both inside and outside a building and is engaged in the basic processing and manufacturing of materials or products predominately from extracted or raw materials, or a use engaged in storage of, or manufacturing processes using flammable or explosive materials, or storage or manufacturing processes that potentially involve hazardous or commonly recognized offensive conditions.

[Definition: tourist hostel]
tourist hostel — a tourist accommodation use that consists of a single building in which travellers are accommodated in dormitories, with group facilities for eating and washing.

[Temporary Use Permits]
G.1.1 Areas where Temporary Use Permits can be issued
BL488 The following Designations are areas where the Local Trust Committee may issue Temporary Use Permits.
(07/20)
Agriculture Designation
Channel Ridge Village Designation
Educational Designation
Forestry Designation
Fulford Harbour Village Designation
Ganges Village Designation
General Employment and Commercial Services Designation
Health Services Designation
Park and Recreation Designation
Residential Neighbourhoods Designation
Rural Neighbourhoods Designation
Shoreline Development Designation
Uplands Designation
G.1.3.4 Permit conditions should ensure that off-street parking is provided in a way that is consistent with local
bylaws.
`,

community: `
[Community & Institutional Land Use]
B.4 COMMUNITY & INSTITUTIONAL LAND USE OBJECTIVES AND POLICIES
B.4.1.1.1 To ensure an appropriate supply of land is zoned for community needs such as schools, child
care, government functions, emergency services, health care facilities and cultural buildings.
B.4.2.1.1 To provide appropriately zoned land in convenient locations for educational facilities.
B.4.2.1.2 To ensure that day care facilities can continue to be where they are convenient for families.
B.4.2.2.1 The area designated specifically for Educational uses is shown on Map 1. Public schools will
also continue to be allowed by zoning in other designations.
B.4.2.2.2 Zones within the Educational Designation will continue to allow public schools and other related
uses. The Local Trust Committee may consider amending zoning to permit adult training and
learning facilities.
B.4.2.2.4 The Local Trust Committee will work cooperatively with School District #64 for school site
acquisition charges or acquisition of land for schools at the time of subdivision, should the District
pass a resolution requesting that the Local Trust Committee consider eligible school site
requirements. The Salt Spring Island Parks and Recreation Commission will also be invited to
participate to ensure a coordinated approach to public land dedication.
B.4.2.2.5 The Local Trust Committee should give special attention to land within and surrounding the
Educational Designation as follows:
a. Land next to the Educational Designation should not be rezoned for uses that would be
incompatible with the safety of school children.
b. Rezoning applications for land next to the Educational Designation should show how
pedestrian and bicyclist routes to schools will be maintained.
c. Rezoning applications for higher density housing within about 0.8 km of the Educational
Designation should be designed for families.
B.4.2.2.6 Child day care facilities will continue to be allowed in a broad variety of zones.
B.4.2.2.7 Zoning that applies to land next to Ganges Harbour or its water surface should not be changed in
a way that would interfere with the safe and convenient accommodation of school taxis from the
Outer Gulf Islands.

Others are encouraged to help achieve the objectives of this Section as follows:
B.4.2.2.8 The Ministry of Transportation and Infrastructure and the Salt Spring Island Transportation
Commission are requested to consider the objectives of this Section in their decisions regarding
roads next to or within the Educational Designation, and especially is encouraged to consider
means to safely accommodate pedestrians and bicyclists on such roads.
B.4.3.1.1 To ensure that local land use policies support the continued development of Salt Spring Island as
a healthy community.
B.4.3.1.2 To provide appropriately zoned land in convenient locations for the community's health care
facilities.
B.4.3.1.3 To support, through compatible land use zoning, directions contained in Health Plans prepared by
the Vancouver Island Health Authority and community health organizations.
B.4.3.2 POLICIES
Note: Where land is located within the North Salt Spring Waterworks District, any rezoning
proposals that are expected to result in a net increase in water demand must also take
into account the severe restraints on the District's available water supply. Policies in
Section
B.4.3.2.1 The area designated specifically for Health Services is shown on Map 1. Public hospitals and
private medical offices will also continue to be allowed by zoning in other Designations.
B.4.3.2.2 Zones within the Health Services Designation will continue to allow the range of health service
facilities and other uses allowed by current zoning.
B.4.3.2.3 Those wishing to rezone land to create large new health care facilities will be directed to lands in
the Health Services Designation or to adjacent lands.
B.4.3.2.4 The Local Trust Committee should give special attention to land within and surrounding the
Health Services Designation as follows:
a. Land next to the Health Services Designation should not be rezoned for uses that would be
incompatible with the safety and quiet of the hospital area.
b. Rezoning applications for land next to the Health Services Designation should show how
pedestrian routes to health service facilities will be maintained.
c. Rezoning applications for higher density housing within about 0.8 km of the Health Services
Designation should be designed for seniors or those with special needs.
B.4.4.1.1 To ensure that land use bylaws accommodate emergency response facilities in locations where
response times are optimal for most of the community.
B.4.4.2.2 The Local Trust Committee should retain the local subdivision regulations that allow the
subdivision of appropriately sized parcels for emergency response facilities, despite the minimum
parcel sizes allowed for other uses.
B.4.4.2.5 The Local Trust Committee will support the development of emergency-only road connections in
the following locations:
- between Don Ore and Charlesworth Roads
- between Wilkie Way and Rainbow Roads
- between Southridge and Sunnyside Roads
- Broadwell through to North End Road
- and other roads where required
B.4.5.1.1 To ensure that adequate amounts of land are appropriately zoned to accommodate the variety of
spiritual and cultural activities important to the community.
B.4.5.2.1 Local zoning will continue to allow churches, cemeteries, libraries, and community halls in many
zones. Low impact religious retreats will continue to be allowed by zoning in the Uplands
Designation.
B.4.5.2.5 The Local Trust Committee should ensure that local zoning supports the use of private and public
lands for local community events.

[Definition: institutional use]
institutional use — a non-profit, religious, or public use, such as a church, library, public or private school, hospital or government owned or operated building, structure or land used for a public purpose.
`,

conservation: `
[Conservation Land Use]
B.8 CONSERVATION LAND USE OBJECTIVES AND POLICIES
B.8.1.2.2 Zones within the Watershed and Islet Residential Designation will continue to allow the uses
allowed under current zoning. Existing commercial and institutional zones will remain, but zoning
changes should not be made to locate additional new or higher impact developments on lands in
this Designation.
B.8.1.2.4 The minimum size of lots that can be created by subdivision in this Designation will remain the
same as indicated in the Local Trust Committee's current Land Use Bylaw. New lot sizes should
continue to be no smaller than 12 ha in the Maxwell Lake watershed and no smaller than 4 ha in
other watershed areas.
B.8.1.2.8 The Local Trust Committee should give consideration to the protection of community water
system supply watersheds through designation as development permit areas.

Others are encouraged to help achieve the objectives of this Section as follows:
B.8.2.2.2 Zones within the Uplands Designation will continue to allow the low and very low density
residential development and the other land uses that are allowed by existing zoning.
BL488 B.8.2.2.3 Existing commercial and general employment zones will remain, but zoning amendments should
(07/20) not be made to locate large new commercial, general employment, institutional or multifamily
developments in the Uplands Designation.
B.8.2.2.5 The minimum size of lots and the minimum average size of lots that can be created by
subdivision in this Designation will remain the same as indicated by current bylaws. The
minimum average size of lots should not be less than 8 ha except in areas zoned Rural, where
the minimum average size of lots should not be less than 2 ha.

[Shoreline and Aquatic Use]
B.9 SHORELINE AND AQUATIC USE OBJECTIVES AND POLICIES
B.9.2.2.4 The Local Trust Committee should support the efforts of other agencies to maintain existing
public accesses to the Shoreline Conservation Designation. However, if the adjacent upland is
being subdivided, the Subdivision Approving Officer is encouraged to ensure that any new public
accesses provide viewing areas rather than direct physical access to sensitive habitat areas.
B.9.3.2.4 Should the Local Trust Committee consider rezoning applications on the uplands next to this
Designation, it will ensure that public access to recreation beaches would be maintained.
BL488 B.9.4.2.3 The Local Trust Committee could consider rezoning applications to allow new general
(07/20) employment, commercial and boat moorage uses in this designation. Before receiving such
applications, the Committee should develop guidelines for their review. The guidelines may be
incorporated into Development Permit Areas or Heritage Conservation Areas and should ensure
that effects on the natural environment, other shoreline users, First Nations interests and
adjacent properties would be reduced.
Note: Where service is to be provided by the North Salt Spring Waterworks District, any
rezoning proposals that are expected to result in a net increase in water demand must
also take into account the severe restraints on the District's available water supply.
Policies in Section
B.9.5.2.2 Zoning within this Designation will continue to allow the aquaculture uses allowed by current
zoning. Local bylaws will not be changed in a way that would restrict or prohibit an existing
aquaculture operation.
B.9.6.2.4 The Local Trust Committee could consider applications to rezone foreshore in this Designation for
other uses than those allowed by existing zoning. The Committee should first establish some
criteria for evaluating such applications to ensure impacts on the natural environment, other
foreshore users, First Nations interests and adjacent property owners are addressed and
minimized.

[Definition: accretion shoreforms]
accretion shoreforms — natural landforms along a shoreline created by the gradual deposit of solid materials by water.

[Definition: breakwater]
breakwater — a protective structure usually built offshore to protect harbour areas, moorage, navigation or beaches from wave action. Breakwaters may be fixed, open pile or floating.

[Definition: bulkhead]
bulkhead — a wall usually constructed parallel to the shore with the primary purpose to contain and prevent the loss of soil caused by erosion or wave action.

[Definition: conservation]
conservation — actions, legislation or institutional arrangements that lead to the protection or preservation of a given species, group of species, habitat, natural area, or property or areas of human heritage value or character.

[Definition: dock]
dock — a structure abutting the shoreline that floats on the water and is used as a landing or moorage place for commercial or pleasure craft.

[Definition: groin]
groin — a wall-like structure built seaward of the natural boundary and perpendicular to the shore to build or preserve an accretion beach by trapping littoral sand drift on the updraught side.

[Definition: jetty]
jetty — a structure usually built singly or in pairs perpendicular to the shore at harbour entrances to prevent shoaling or accretion of sand drift.

[Definition: marina]
marina — a system of piers or docks that contains more than ten moorage spaces for commercial uses such as storing, servicing, fuelling, berthing and securing or launching of private water craft that may include the sale of fuel and incidental supplies for boat owners, crews, and guests. Private joint use dock facilities are excluded.

[Definition: pier]
pier — a structure consisting of a fixed platform above the water that abuts the shoreline and is used as a landing or moorage place for commercial or pleasure craft.

[Definition: revetment]
revetment — a sloped shoreline structure built to protect an existing eroding shoreline or newly placed fill against waves, wakes, currents or weather, and commonly built of randomly placed boulders (riprap) or of sand-cement bags, paving blocks or other materials.
`,

dpa1: `
[DPA 1: Island Villages]
E.1 DEVELOPMENT PERMIT AREA 1 - ISLAND VILLAGES
BL488 E.1.1.2 All development in this Development Permit Area is exempted from the requirement to obtain a
(07/20)
Development Permit, except:
a. subdivision of land zoned for commercial, general employment or multifamily use.
b. subdivision of land that adjoins agricultural land or that drains into agricultural land.
c. new construction or alterations to existing buildings on land zoned for commercial, general
employment or multi-family use if the new development is of a size that must provide off-street
parking (according to local bylaws) or if the new development would change the capacity of an
existing parking lot.
d. installation of plastic backlit signs, of signs that do not comply with the local sign bylaw, or of signs
that are to be placed more than 5 m above the ground.
e. development of a parking lot with more than ten spaces for commercial, general employment or
multi-family residential use.
f. construction of institutional buildings that would create more than 280 m2 of new impervious surface.
Only the guidelines in section
E.1.2 Reasons for this Development Permit Area
The villages of Salt Spring Island function as commercial, social and cultural centres of the community.
Existing zoning means there is considerable potential for these activities to continue to grow in village areas.
Development Permit designation will guide the community's most significant, concentrated and visible new
development so that it is compatible with existing buildings, with the natural environment and with community
objectives for villages.
Zoning within the Area allows a high density of development which is expected to result in the creation of large
new areas of impervious surfaces. In the past, such development has changed natural patterns of stormwater
drainage and resulted in flooding or erosion of downslope properties.
This Development Permit Area is adjacent to land that is within the Agricultural Land Reserve or that has been
traditionally used for agricultural activities. The higher densities of development permitted in this Area could
have negative effects on nearby agricultural activities, if that development is not carefully managed. By paying
attention to the design of development in this Area, the potential for on-going conflicts between agricultural
activities and higher density developments can be minimized.

This Development Permit Area also includes three properties outside of village areas that are currently zoned
for multifamily development. Objectives for the development of these properties are similar to those for village
multifamily zones.
BL488 E.1.4.4 Major new commercial, general employment and multi-family developments should include construction of a
(07/20) sidewalk or walking path on adjacent road rights-of-way. All sidewalks and internal site circulation routes
should ensure barrier-free access.

Background Note: Construction of sidewalks or other parts of a development on road rights-of-way
requires the approval of the Ministry of Transportation and Infrastructure.
E.1.4.9 To ensure a compact and pedestrian-oriented
commercial area in village cores, new commercial
developments in the Ganges Village Core, the Channel
Ridge Village Core and in Fulford Harbour Village
should ideally be located with no or little setback from
the front property line. Minor variations could be
included to provide small public spaces and pedestrian
amenities along the streetfront. Exceptions to this
guideline could be considered:

a. On Hereford Avenue in Ganges where greater setbacks could reflect the location of existing
structures. Building setbacks along Hereford Avenue should show a transition between new and old
structures that enhances pedestrian use, and includes public space and amenities.
b. On waterfront properties in the Ganges Village Core and in Fulford Harbour Village, where
developments should be oriented towards the harbours and parking should be located upland of the
principal use on the property.
Background Note: Building construction within 4.5 m of a public road right of way will require the approval
of the Ministry of Transportation and Infrastructure.
E.1.4.11 To avoid the appearance of strip development along Lower Ganges Road in Ganges Village, new
developments with frontage on Lower Ganges Road north of Upper Ganges Road should be setback 7.6 m
from Lower Ganges Road and should maintain an effective vegetation screen between structures or parking
lots and the road, with minor breaks for access only. Where no other frontage exists, buildings should be
oriented inward around a central court. Where a secondary frontage exists with access to Lower Ganges
Road, building access should be from the secondary frontage, and building orientation should be either
inward or oriented to the secondary frontage. Where commercial parcels lie between Lower Ganges Road
and a residential street, all access should be developed from Lower Ganges Road, to buffer the residential
area from commercial traffic.
Additions to existing commercial development along Lower Ganges Road should use special creative
efforts to avoid continuance of the existing "strip mall" appearance. Parking and shop fronts should be
screened from Lower Ganges Road with generous landscaping buffers and islands. Use of designs that
face the interior of the parcel with an inner court and using scales of traditional village streetscapes should
be considered.
E.1.4.21 On through streets, the building setback required by local bylaws should be maintained so that a buffer
remains for homes. On non-through streets, a variance of the setback could be requested (e.g. to 3 to 4.5
m), to encourage human activity and create a lively, occupied character to the street.
E.1.5.5 In Ganges, between Jackson Avenue and
Lower Ganges Road, new developments
proposed along the north side of McPhillips
Avenue, both sides of Hereford Avenue and the
south side of Rainbow Road should allow for the development of a rear lane way (where topography
permits) that provides access to parking lots in the rear and minimizes access breaks along the streets.
The lane way should be about 7.5 m in width and should be landscaped and paved to make it an attractive
pedestrian route. Consideration could be given to using arcades, hidden courts or other architectural
features that would encourage development of secondary retail frontage along the lane.
E.1.5.7 Part of the parking required for commercial developments could be located in a parking lot on another
property, provided the following conditions are met besides the ones listed above:
a. The offsite parking lot is within a convenient walking distance (up to about a half a kilometre) of an
entrance to the building it serves. Larger parking lots in the Ganges Village Core should be located to
the west of Jackson Avenue.
b. Offsite parking lots for commercial uses are to be located on properties that are immediately next to
the commercial use or on more distant properties zoned for non-residential use.
c. Offsite parking lots must be exclusively dedicated and secured with a legal agreement that is in place
before issuance of a building permit and continues for the life of the building served.

d. Parking spaces for the disabled are not to be located offsite.
e. Signs showing the location of offsite parking should be clearly visible from streets next to the building
being served. Such signs may not be necessary if the offsite parking lot is to be used primarily by
tenant employees as a condition of lease.
E.1.6.10 To encourage use of the village during all seasons, continuous weather protection should be provided for
pedestrians along sidewalks. The minimum width should be 1.5 m.
BL488 E.1.7.5 Soft landscaping should cover a minimum of 40% of parcel areas in multifamily residential developments and
(07/20) at least 20% of the parcel area in commercial and general employment developments. Developments that
provide special needs housing or affordable seniors’ supportive housing may have a reduced area of soft
landscaping if necessary to accommodate special facilities, providing that neighbouring properties are
buffered by a vegetation screen and that parking lots are landscaped as outlined in Guideline E.1.7.16. The
area calculated as soft landscaping does not include parking areas, vehicle lanes and manoeuvring areas,
private open space and adjacent boulevards on public lands.
E.1.7.16 Parking lots should be carefully landscaped to screen them from adjacent streets and land uses, to provide
shade and to avoid large expanses of uninterrupted asphalt. The following landscape guidelines apply
specifically to parking lots, including off-site parking lots:
a. Parking lots with street frontage should be screened by a landscaped strip with a minimum width of 3
m. The perimeter of parking lots should also be screened with a minimum width of 2 m.
b. Parking lots with more than 10 spaces should include interior landscaping islands and peninsulas that
occupy at least 5 per cent of the lot area besides the street frontage and perimeter strips. Irregular
shapes of parking islands are encouraged, especially those incorporating existing vegetation naturally
and informally.

c. Reductions in parking space requirements may be requested to accommodate adequate parking lot
landscaping.
d. The use of permeable parking materials such as "hard grass" is strongly encouraged to soften the
visual effect of parking lots and minimize changes to site drainage.
E.1.9.2 Signs should be kept to the minimum size and number needed to inform and direct residents and visitors.
Sign size and lettering should not exceed that necessary to direct pedestrians and slow-moving traffic:
letters should rarely exceed 20 cm in height; the area of individual signs should rarely exceed 2.5 m2. Total
permitted sign area should not exceed that permitted by local bylaw.
`,

dpa2: `
[DPA 2: Non-Village Commercial]
E.2 DEVELOPMENT PERMIT AREA 2 - NON-VILLAGE COMMERCIAL AND GENERAL EMPLOYMENT .. 20
BL488 E.2.1.1 Development Permit Area 2 is shown on Map 19. It is designated according to Section 879(1)(e) of the
(07/20) Municipal Act to identify objectives and guidelines for the form and character of commercial and general
employment development outside Village Designations. It is also designated according to Section 879 (1)(c)
for the protection of farming on adjacent lands.
Background Note: The official version of Map 19 is drawn at a scale of 1:20,000 and is available through
the offices of the Islands Trust. The page size version of Map 19 that is bound with
this Plan has been included for convenience.
BL488 E.2.1.2 All development in this Development Permit Area is exempted from the requirement to obtain a Development
(07/20)
Permit, except:
a. subdivision of land zoned for commercial or general employment use.
b. subdivision of land that adjoins agricultural land or that drains into agricultural land.
c. development of more than 15 new tourist accommodation units or campsites on a property where no
such units are in operation.
d. development of new retail, general employment or commercial space greater than 185 m2 in gross
floor area that is visible from public areas or other properties.
e. development of new restaurants, pubs, or marinas on a property where such a use is not in operation.
f. development of a commercial or general employment parking lot with more than 15 spaces that is
visible from public areas or other properties.
g. development of more than 280 m2 of new impervious surfaces, or alteration of the existing drainage
regime on lands that adjoin or drain into agricultural land.
h. removal of vegetation within 8 m of agricultural land (excluding the emergency removal of a
hazardous tree).
i. development of a commercial composting facility subject to the Capital Regional District Composting
Facilities Regulation Bylaw.
j. removal of vegetation within 7.5 m of a lot line that abuts land zoned for residential or commercial
guest accommodation uses (excluding the emergency removal of a hazardous tree).
E.2.2 Reasons for this Development Permit Area
BL488 Existing local zoning provides a significant potential for new commercial and general employment
(07/20) development on properties located within residential and rural neighbourhoods. Other policies in this Plan
could lead to more intensive development on existing general employment properties.
Other policies and objectives of this Plan recognize the community's desire to retain a quiet, rural character
in island neighbourhoods.
Design guidelines can reduce the potential conflicts between large new commercial and general employment
development and neighbouring properties.
Some properties in this Development Permit Area adjoin or drain into land that is in the Agricultural Land
Reserve or that has been traditionally used for agricultural activities. The higher densities of development
permitted in this Area could have negative effects on nearby agricultural activities, if that development is not
carefully managed. By paying attention to the design of development in this Area, the potential for on-going
conflicts between agricultural activities and higher density development can be minimized.
E.2.3.3 To protect nearby agricultural lands (including their water supplies) and to reduce the potential for conflicts
between agricultural activities and higher density settlement areas.
NEIGHBOURHOOD STORE artwork: B. Curran
Background Note: Development Permits that are issued for developments in this Development Permit
Area could contain conditions that are based on the following guidelines. Not all
guidelines will apply to every permit. Permits will not contain conditions that are
unrelated to these guidelines. The conditions on a Development Permit will not
prevent a property from being used as the local zoning bylaw allows.
E.2.4.1 Property line setbacks should not be varied from those allowed by local bylaws.
BL488 E.2.4.6 Where the subject property adjoins agricultural land, building setbacks for general employment and
(07/20) commercial uses should be at least 15 m from the property line, to be consistent with the Guide to Edge
Planning (2015), developed by the BC Ministry of Agriculture.
BL488 E.2.8.1 Where large new commercial or general employment developments are visible from streets or other public
(07/20) areas, site landscaping should be installed before issuance of the building occupancy permit. A letter of
credit should be deposited with the Local Trust Committee for an amount equal to 150% of the cost of the
work to complete any landscaping that would be visible from public areas.
BL488 E.2.8.7 Where the property being subdivided or developed adjoins a property zoned for residential or commercial
(07/20) guest accommodation uses, a vegetated buffer of at least 3 m is to be planted or retained. The buffer width
should increase to at least 7.5 m where general employment or commercial uses (with the exception of a
farm business) are not contained within a building.
E.2.10.1 Total sign area should not exceed that permitted by local bylaws.
BL488 E.2.11.2 When land that is zoned for general employment or commercial service use is subdivided, lot configuration
(07/20) should encourage the development of a single entrance from the public street. An internal circulation
system should be developed that does not require vehicles to manoeuvre outside the property. New lot
sizes and shapes should ensure that a vegetation buffer can be maintained along the border with
neighbouring properties.
BL488 E.2.12.1 New commercial or general employment developments that will create more than 280 m2 of new impervious
(07/20) surfacing should include a report prepared by a Professional Engineer that determines the extent of

changes to the natural drainage. It should identify any conditions that should be incorporated into the
development permit to protect property from flooding, erosion or from other undesirable impacts as a result
of changes to stormwater runoff. Particular attention should be paid to ensuring that drainage changes will
not result in detrimental impacts such as flooding or reduced groundwater availability on agricultural lands
or watercourses that either adjoin the development or are located in the same watershed.
E.2.12.2 Developments that would create less than 280 m2 of impervious surface area should not alter drainage in a
way that would cause detrimental impacts on other properties, including agricultural land. The Local Trust
Committee could request that a drainage plan be prepared by a Professional Engineer to assist in
establishing development permit conditions related to drainage.
BL488 E.2.13.1 New commercial composting facilities, subject to the Capital Regional District Composting Facilities
(07/20) Regulation Bylaws, should be buffered from neighbouring uses in a manner consistent with the Compost
Facility Requirements Guideline: How to Comply with Part 5 of the Organic Matter Recycling Regulation
(Ministry of Water, Land and Air Protection, 2004).
Information Sources for Development Permit Area 2:
B.C. Agricultural Land Commission, 1993
Landscaped Buffer Specifications, Burnaby, B.C.
B.C. Ministry of Agriculture, Fisheries and Food, 1996
Strengthening farming in British Columbia. A guide to implementation of the Farm Practices Protection
(Right to Farm) Act, Victoria, B.C.
B.C. Ministry of Environment, Lands and Parks, 1992
Urban Runoff Quality Control Guidelines for British Columbia
BL488 B.C. Ministry of Water, Land and Air Protection, 2004,
(07/20) Compost Facility Requirements Guideline: How to Comply with Part 5 of the Organic Matter Recycling
Regulation
BL488 B.C. Ministry of Agriculture, Strengthening Farming Program, 2015,
(07/20) Guide to Edge Planning: Promoting Compatibility Along Agriculture-Urban Edges.
`,

dpa3: `
[Definition: impervious surface]
impervious surface — any surface compacted or covered with a layer of material so that it is highly resistant to infiltration by water, and including surfaces such as compacted sand, or clay, and most conventionally surfaced streets, roofs, sidewalks, parking lots, and other similar structures.

[DPA 3: Shoreline]
E.3.1 Description of Permit Area and Exemptions
BL488 E.3.1.1 Development Permit Area 3 is shown on Map 20. It is all that area of land covered by water between the
(07/20) natural boundary of the sea and a line drawn parallel to and 300 m seaward of the natural boundary of the
sea. It also encloses the land within 10 m of the natural boundary of the sea (measured horizontally) in areas
where the marine environment has been identified as being particularly sensitive to development impacts.
Development Permit Area 3 is designated according to Section 879 (1)(a) of the Municipal Act to identify
objectives and guidelines for the form and character of the commercial and general employment
development allowed on the water surface. It is also designated according to Section 879 (1)(a) and (b) to
protect the natural environment and to protect development from hazardous conditions.
Background Note: The official version of Map 20 is drawn at a scale of 1:20,000 and is available through
the offices of the Islands Trust. The page size version of Map 20 attached to this Plan
has been included for convenience.
BL488 E.3.1.2 All development in this Development Permit Area is exempted from the requirement to obtain a Development
(07/20)
Permit, except:
a. Construction of buildings.
b. An addition to an existing dock or construction of a new dock in areas outside the Shoreline
Conservation Designation (see Map 1) that will result in a total float area greater than 35 m2.
c. An addition to an existing dock or construction of a new dock in areas within the Shoreline
Conservation Designation (see Map 1).
d. Construction of more than one mooring facility next to a parcel.
e. Construction of a breakwater, a rock weir, a groin or a jetty.
f. Construction of shoreline stabilization works bulkheads or walkways.
g. Placing of fill.
h. Dredging.
i. Construction of boat launch ramps and railways.
j. Removal of trees with a trunk diameter greater than 20 cm (measured 1.5 m above the ground) or the
removal of other vegetation that results in the exposure of a total area of bare soil more than 9 m2 in
area within 10 m of the natural boundary of the sea.
k. Installation of light standards in commercial or general employment zones on the water surface.
l. Installation of signs in commercial or general employment zones that exceed the size allowed in local
bylaws.
m. The subdivision of land parcels that creates additional new lots within this Development Permit Area.
E.3.1.3 Despite Section E.3.1.2, the following activities are also exempted from the requirement to obtain a
Development Permit:
a. land alteration and vegetation removal on agricultural land that is more than 3 m from the natural
boundary of the sea, that is done for farming purposes, and that is consistent with normal farm
practices under the Farm Practices Protection (Right to Farm) Act.
b. forest management activities related to timber production and harvesting in the Forest Land Reserve.
c. fish habitat enhancement work approved by the Department of Fisheries and Oceans or the Ministry
of Environment.
d. the emergency removal of a hazardous tree.
e. emergency works to prevent flood damage to structures.
f. vegetation removal within 10 m of the natural boundary of the sea or works below the natural
boundary of the sea that have been approved in writing by the Ministry of Environment or the
Department of Fisheries and Oceans.
g. the subdivision of land parcels where a conservation covenant satisfactory to and in favour of the Salt
Spring Island Local Trust Committee or the Islands Trust Fund Board has already been registered for
the maintenance of natural drainage and protection of environmentally sensitive areas.
E.3.2 Reasons for this Development Permit Area
BL488 This Development Permit Area includes shoreline waters and natural fish and wildlife habitat that could be
(07/20) subject to degradation due to development. It also includes areas of land that lie adjacent to and influence
the island's most sensitive shoreline environments. Shoreline areas and beaches may contain unstable
slopes and soils subject to erosion, land slip and rock falls. There are also high aesthetic values along
shoreline areas. They will be affected by the form and character of commercial and general employment
development allowed by current zoning.
E.3.3.1 To protect the quality of the tidal waters that surround Salt Spring Island.
E.3.3.3 To prevent erosion and hazardous conditions that could result from interrupting the natural geohydraulic
processes along the shoreline.
E.3.3.4 To protect development from hazardous conditions.
BL488 E.3.3.5 To protect the natural beauty of the island's shoreline areas where commercial and general employment
(07/20) developments are allowed. To ensure such development is unobtrusive and contributes to the natural, public
character of the Crown foreshore.
E.3.4 Guidelines for Development
Background Note: Development Permits that are issued for developments in this Development Permit
Area could contain conditions that are based on the following guidelines. Not all
guidelines will apply to every permit. Permits will not contain conditions that are
unrelated to these guidelines. The conditions on a Development Permit will not
prevent a property from being used as the local zoning bylaw allows.
While forest management activities within the Forest Land Reserve are excluded from the Permit process,
voluntary compliance with the guidelines of this section is encouraged for such activities.
E.3.4.1 All work that takes place below the natural boundary of the sea should be done in a way that minimizes
degradation of water quality and disturbance of the substrate.
E.3.4.2 All work that takes place on land within 10 m of the natural boundary of the sea should be planned and
carried out in a way that is consistent with the Land Development Guidelines for the Protection of Aquatic
Habitat (Appendix 7).
E.3.4.3 Native vegetation and trees are to be retained or replaced to control erosion, protect banks and protect fish
and wildlife habitat.
E.3.4.4 New roads and septic systems should not be located in this Development Permit Area. If such a location
cannot be avoided, then the design and construction of the road or septic system should be supervised by a
qualified professional to ensure that the objectives and guidelines of this Area are met.
E.3.4.5 Structures should provide for the thorough flushing of all enclosed water areas and should not restrict the
movement of aquatic life or interfere with natural shoreline processes.
E.3.4.6 Open pile or floating breakwater designs are preferred. Solid breakwaters should not be used, except
facilities that will accommodate a marina.
E.3.4.7 New boating facilities that provide transient moorage should not be constructed unless access is available to
adequate and convenient facilities for pump-out, holding and treating of sewage from boats. New boating
facilities should be designed, located, and operated in a way that ensures there will be no discharge of toxic
material from boats (for example: fuels, oils, maintenance by-products).
E.3.4.8 There should be no dredging to create new facilities. Maintenance dredging of existing facilities should be
limited to the minimum area necessary to maximize the capacity of the existing facility. Dredging should be
done with the use of silt curtains to prevent siltation of adjacent areas.
E.3.4.9 The shoreline should not be filled in to create additional land, except minor areas of fill necessary to
complete the boardwalk section of the Ganges Public Pathway System in Ganges Harbour.
E.3.4.10 No parking areas should be located over the surface of the water, on land created by fill, or on accretion
shoreforms.
E.3.4.11 Boat launch ramps should be located on stable, non-erosional banks where a minimum amount of substrate
disturbance or stabilization is necessary. Ramps should be kept flush with the slope of the foreshore to
minimize interruption of geo-hydraulic processes.
E.3.4.12 Preference is to be given to the placement of mooring buoys and floats instead of docks. It is also to be
given to the construction of joint use docks rather than individual ones. Multifamily and strata-titled
developments are to construct joint use dock facilities. No more than one facility for mooring boats is to be
located next to any parcel. An exception could be made if more than one joint facility is to be located next to
the common property of a strata development.
E.3.4.13 Docks should not be located over shellfish beds or lead to the removal of any kelp or eel grass beds.
E.3.4.14 Large residential docks should be located and designed to avoid the need for shore defence works, or
breakwaters. If a bulkhead is to be constructed as a base for a dock, it should be constructed landward of
the natural boundary of the sea.
E.3.4.15 Structures in contact with the water should be constructed of stable materials, including finishes and
preservatives that will not degrade water quality.
E.3.4.16 Piers should use the minimum number of pilings necessary, with preference to large spans over more
pilings.
E.3.4.17 Piers should be constructed with a minimum clearance of 0.5 m above the elevation of the natural boundary
of the sea.
E.3.4.18 All docks should be constructed so that they do not rest on the bottom of the foreshore at low water levels.
E.3.4.19 Any plastic foams or other non-biodegradable materials used in construction of floats and docks should be
well contained to prevent escape into the natural environment.
E.3.4.20 Residential docks should not extend from shore any further than necessary to accommodate a small
pleasure craft. Residential docks should not accommodate boats with a draft greater than 2.2 m or have
floats more than 35 m2 total surface area unless more than two parcels have legal access to the dock.
E.3.4.21 Applications for shoreline stabilization should include a report, prepared by a Professional Engineer with
experience in geotechnical engineering, which describes the proposed modification and shows:
a. the need for the proposed modification to protect existing structures.
b. where the modification is proposed to protect new structures, the locations on the property where
those structures could be built and not require shoreline modification.
c. if any natural hazards, erosion, or interruption of geohydraulic processes may arise from the proposal
modification, including at sites on other properties or foreshore locations.

d. the cumulative effect of shoreline stabilization works along the drift sector where the works are
proposed.
e. whether there will be any degradation of water quality or loss of fish or wildlife habitat because of the
modification.
f. whether conditions should be incorporated into the development permit to achieve the objectives of
this Development Permit Area.
E.3.4.22 Shoreline stabilization should be limited to that necessary
a. to prevent damage to existing structures or an established use on adjacent upland.
b. to prevent damage to a proposed public land use.
New upland structures or additions should be located and designed to avoid or reduce the need for
shoreline stabilization. Shoreline stabilization should not interrupt natural processes solely to reduce erosion
of undeveloped land, except agricultural land.
E.3.4.23 Shoreline stabilization works should use natural means such as vegetative stabilization or protective berms
rather than structural solutions such as concrete or large riprap. Applications for structural stabilization
works should provide an explanation as to the need for structural solutions. Structural solutions should not
be employed in the Shoreline Conservation Designation, unless an existing building is threatened by wave
erosion and cannot be protected by other means.
E.3.4.24 Materials used for shoreline stabilization should consist of inert materials. Stabilization materials should not
consist of debris or contaminated material that could result in pollution of tidal waters.
E.3.4.25 Rock weirs, groins and jetties should not be constructed. An exception could be made if it can be shown
that they are part of a larger system that will reduce the need for overall shoreline modification and that they
are intended to prevent damage to existing structures. They should not be proposed to protect new
structures.
E.3.4.26 Bulkheads should only be constructed if no other alternative exists. Where bulkheads are proposed, they
should not to be located where geohydraulic processes are critical to shoreline conservation. Feeder bluffs,
marshes, wetlands, spits or hooks should be avoided. Bulkheads should be located parallel to and
landward of the natural boundary of the sea, as close to any natural bank as possible. Bulkheads should
allow the passage of surface or groundwater without causing ponding or saturation. They should be
constructed of stable, non-erodible materials that preserve natural shoreline characteristics. Adequate toe
protection including proper footings and retention mesh should be included. Beach materials should not be
used for fill behind bulkheads.
E.3.4.27 Where revetments are proposed, they should not result in the loss of riparian vegetation or fish habitat. The
size and quantity of materials used should be limited to that necessary to withstand the estimated energy of
the location's hydraulic action and prevent collapse. Filter cloth should be used to aid drainage.
E.3.4.28 Where this Area includes unique native species dependent on a marine shoreline habitat which have been
identified by a qualified professional as worthy of particular protection, their habitat areas should be left
undisturbed. If development is permitted in these areas, it should be undertaken only under the supervision
of a professional who is qualified in environmental protection, with advice from the Ministry of Environment,
the Department of Fisheries and Oceans, or Environment Canada.
E.3.4.29 To assist in the preparation of development permits for larger projects, the Local Trust Committee could
request an applicant to provide a report, prepared by a qualified professional with experience in the
protection of the natural environment. The report should indicate the type of conditions that should be
incorporated into the development permit to achieve the objectives and comply with the guidelines of this
Development Permit Area.
BL488 E.3.4.30 Buildings built over the water surface in areas zoned for commercial and general employment use in
(07/20) Ganges and Fulford Harbour should accommodate continuous pedestrian passage along the waterfront.
Developments in Ganges should contribute to the development of the Ganges Public Pathway System,
including the seawalk portion, shown on Map 17. New sections of the seawalk should be built in a way that
is consistent with existing portions, ensuring barrier-free access along the entire route. For public safety,
light fixtures should be provided at a consistent height and design.
E.3.4.31 Buildings built over the water surface should not exceed the heights allowed in the local zoning bylaw.
Building form in Ganges and Fulford harbours should be consistent with the guidelines in Section E.1.6.
BL488 E.3.4.32 Lighting of commercial and general employment developments built over the water surface should be kept
(07/20) to the minimum necessary for safety and visibility. Light fixtures on such sites should be simple and
unobtrusive in design. They should be carefully chosen to focus light on the area to be illuminated and avoid
spillage of light into other areas. Fixtures should not result in glare when viewed from areas that overlook
the sea. Low-glare fixtures with a high cut-off angle should be used. Full-spectrum fixtures are preferred.
Neon lighting should not be used outside buildings.
BL488 E.3.4.33 S igns on commercial and general employment developments built over the water surface should not exceed
(07/20) the size or total area allowed by local bylaw. Signs on such sites should not move or be audible and should
not incorporate lighting that moves or flashes or gives the impression of doing so.
E.3.5.1 If a proposed land subdivision is to create additional new lots within this Development Permit Area, then any
new lots, roads, building sites, septic fields and driveways should be located and constructed in a way that
meets the objectives of this Area. A covenant should be registered against the part of the property that is
within this Area to guide future development and meet the objectives of this Area.
`,

dpa4: `
[DPA 4: Lakes, Streams and Wetlands]
E.4 DEVELOPMENT PERMIT AREA 4 - LAKES, STREAMS and WETLANDS
Note: While this Development Permit Area extends only 10 m from the natural boundary of
some streams, the federal Department of Fisheries and Oceans and the B.C. Ministry
of Environment recommend that the area within at least 15 m of the top of the bank of
streams be left undisturbed to ensure that fish habitat is protected. It is an offence
under the Fisheries Act to do anything that results in the harmful alteration, disruption
or destruction of fish habitat. Property owners with land that lies within 15 m of the top
of the bank of a fish bearing stream should ensure that they take appropriate
precautions, even if their land is not within this Development Permit Area.
E.4.1 Description of Development Permit Area and Exemptions
E.4.1.1 Development Permit Area 4 is shown on Map 21. It is made up of the island's major lakes, streams and
wetlands. It also encloses the land (measured horizontally) that is within 10 m of the natural boundary of
streams, the land that is within 300 m of the natural boundary of Maxwell Lake and the land that is within 61
m of the natural boundary of all other island lakes, except for the land in Development Permit Area 3.
Development Permit Area 4 is designated according to Section 879 (1) (a) of the Municipal Act to protect the
natural environment.
Background Note: The official version of Map 21 is drawn at a scale of 1:20,000 and is available through
the offices of the Islands Trust. The page size version of Map 21 attached to this Plan
has been included for convenience.
E.4.1.2 All development in this Development Permit Area is exempted from the requirement to obtain a
Development Permit, except:
a. Removal of trees within 10 m of the natural boundary of a lake or a stream (or within 300 m of
Maxwell Lake).
b. Removal of other vegetation within 10 m of the natural boundary of a lake or stream (or within 300 m
of Maxwell Lake) that results in the exposure of a total area of bare soil more than 9 m2 in area.
c. Removal of vegetation in a wetland.
d. Installation of a septic field within 61 m of the natural boundary of a lake (or within 300 m of Maxwell
Lake).
e. Development of an impervious surface within 10 m of the natural boundary of a lake or a stream (or
within 300 m of Maxwell Lake).
f. Any works or installation of structures within a stream or below the natural boundary of a lake.
g. The subdivision of land parcels that create additional new lots within this Development Permit Area.
E.4.1.3 Despite Section E.4.1.2, the following activities are also exempted from the requirement to obtain a
Development Permit:
a. land alteration and vegetation removal on agricultural land that is more than 3 m from the natural
boundary of a lake or stream (except Maxwell Lake), that is done for farming purposes and that is
consistent with normal farm practices under the Farm Practices Protection (Right to Farm) Act.
b. forest management activities related to timber production and harvesting in the Forest Land Reserve.
c. fish habitat enhancement work approved by the Department of Fisheries and Oceans or the Ministry
of Environment.
d. the emergency removal of a hazardous tree.
e. emergency works to prevent flood damage to structures or repair to public service utilities.
f. vegetation removal or other works within 10 m of a lake or stream (or within 300 m of Maxwell Lake)
that has been approved in writing by the Ministry of Environment or by the Department of Fisheries
and Oceans.
g. works below the natural boundary of a lake or stream or a wetland that have been approved in writing
by the Ministry of Environment or by the Department of Fisheries and Oceans.
h. activities on land that is within 300 m of Maxwell Lake, but is outside the lake's surface catchment

area, as demonstrated by survey.
i. the subdivision of land parcels where a conservation covenant satisfactory to and in favour of the Salt
Spring Island Local Trust Committee or the Islands Trust Fund Board has already been registered for
the maintenance of natural drainage and protection of environmentally sensitive areas.
j. works undertaken by a waterworks district that have been certified by a Professional Engineer as
consistent with the Land Development Guidelines for the Protection of Aquatic Habitat.
E.4.2 Reasons for this Development Permit Area
E.4.2.1 The lakes and streams in this Development Permit Area provide natural fish and wildlife habitat. Many also
supply drinking water to individual license holders or community water supply systems. If not carefully
managed, development in this Area could result in degradation of water quality. Poor water quality would be
detrimental to fish and wildlife populations and could lead to increased costs for remedial drinking water
treatment.
E.4.2.2 This Development Permit Area contains riparian habitat that is important to many different species and is
particularly susceptible to disturbance. Development in this Area could lead to the disturbance or loss of a
disproportionately large number of different native plant and animal species.
E.4.3.1 To protect the quality of drinking water supplies.
E.4.3.3 To protect sensitive riparian habitat and the unique species that depends upon it.
E.4.4 Guidelines for New Development
Background Note: Development Permits that are issued for developments in this Development Permit
Area could contain conditions that are based on the following guidelines. Not all
guidelines will apply to every permit. Permits will not contain conditions that are
unrelated to these guidelines. The conditions on a Development Permit will not
prevent a property from being used as the local zoning bylaw allows.
While forest management activities within the Forest Land Reserve are excluded from the Permit process,
voluntary compliance with the guidelines of this section is encouraged for such activities.
E.4.4.1 All work that takes place in this Development Permit Area should be done in a way that minimizes
degradation in water quality and disturbance to natural drainage patterns.
E.4.4.2 All work that takes place on land within 10 m of the natural boundary of a lake or stream (or within 300 m of
Maxwell Lake) or within a wetland should be planned and carried out in a way that is consistent with the
Land Development Guidelines for the Protection of Aquatic Habitat (Appendix 7).
E.4.4.3 Native vegetation and trees are to be retained or replaced to control erosion, protect banks and protect fish
and wildlife habitat.
E.4.4.4 New roads and septic fields should not be located in this Development Permit Area. If such a location
cannot be avoided, then the design and construction of the road or septic field should be supervised by a
qualified professional to ensure that the objectives and guidelines of this Area are met. Septic systems that
are adjacent to lakes or to streams that drain to lakes should be designed to minimize both nutrient loading
and coliform contamination of lake waters.
E.4.4.5 Where this Area includes unique native species dependent on riparian habitat which have been identified by
a qualified professional as worthy of particular protection, their habitat areas should be left undisturbed. If
development is permitted, it should be undertaken only under the supervision of a professional who is

qualified in environmental protection, with advice from the Ministry of Environment, the Department of
Fisheries and Oceans, or Environment Canada.
E.4.4.6 To assist in the preparation of development permits for larger projects, the Local Trust Committee could
request an applicant to provide a report, prepared by a qualified professional with experience in surface
water management and the protection of habitat. The report should indicate the type of conditions that
should be incorporated into the development permit to achieve the objectives and comply with the guidelines
of this Development Permit Area.
`,

dpa5: `
[DPA 5: Community Well Capture Zones]
E.5 DEVELOPMENT PERMIT AREA 5 - COMMUNITY WELL CAPTURE ZONES
E.5.1 Description of Permit Area and Exemptions
E.5.1.1 Development Permit Area 5 is shown on Map 22. It is made up of the capture zones of wells that supply
community water systems. The capture zones have been identified by a professional geohydrologist and
represent a conservative estimate of the area that includes the groundwater watershed for community wells.
Development Permit Area 5 is designated according to Section 879 (1) (a) of the Municipal Act to protect
the natural environment.
Background Note: The official version of Map 22 is drawn at a scale of 1:20,000 and is available through
the offices of the Islands Trust. The page size version of Map 22 attached to this Plan
has been included for convenience.
E.5.1.2 All development in this Development Permit Area is exempted from the requirement to obtain a
Development Permit, except:
a. removal of vegetation that results in the exposure of bare soil more than 280 m2 in area.
b. construction of non-residential buildings larger than 70 m2 in area.
c. installation of a septic field.
d. the subdivision of land parcels that creates additional new lots within this Development Permit Area.
e. installation of fuel oil or gasoline storage tanks.
E.5.1.3 Despite Section E.5.1.2, the following activities are also exempted from the requirement to obtain a
Development Permit:
a. development on land within this Development Permit Area that is clearly outside an area shown in
Appendix 8 as being within the physical capture zone of a community water supply well.
b. land alteration and vegetation removal on agricultural land that is done for farming purposes and that
is consistent with normal farm practices as determined under the Farm Practices Protection (Right to
Farm) Act.
c. forest management activities related to timber production and harvesting in the Forest Land Reserve.
d. works undertaken by a community water system.
e. the emergency removal of a hazardous tree.
f. emergency works to prevent flood damage to structures.
g. the subdivision of land parcels where a conservation covenant satisfactory to and in favour of the Salt
Spring Island Local Trust Committee or the Islands Trust Fund Board has already been registered for
the maintenance of natural drainage and protection of groundwater quality.
E.5.2 Reasons for this Development Permit Area
E.5.2.1 This Development Permit Area is made up of the area that drains into wells used by community water
systems. If not carefully managed, development in this Area could result in the degradation of drinking
water quality for many homes. Prevention of water quality degradation is much less costly than remediating
an aquifer after contamination has occurred.
E.5.3 Objectives of this Development Permit Area
E.5.3.1 To protect the quality of drinking water supplied from community water system wells.
E.5.4 Guidelines for New Development
Background Note: Development Permits that are issued for developments in this Development Permit
Area could contain conditions that are based on the following guidelines. Not all
guidelines will apply to every permit. Permits will not contain conditions that are
unrelated to these guidelines. The conditions of a Development Permit will not prevent
a property from being used as the local zoning bylaw allows.
While forest management activities within the Forest Land Reserve are excluded from
the Permit process, voluntary compliance with the guidelines of this section is
encouraged for such activities.
E.5.4.1 All development that takes place within this Development Permit Area should be done in a way that
minimizes the degradation of water quality in community water system wells.
E.5.4.2 If vegetation is to be removed in a way that exposes more than 280 m2 of bare soil, then a plan should be
implemented to control stormwater drainage and avoid the deterioration of groundwater quality.
E.5.4.3 Non-residential structures should not be built in this Area if they are to be used for the storage or handling of
materials in quantities sufficient to pollute groundwater supplies. If such a location cannot be avoided, then
the structure should be designed and constructed to ensure that spills can be properly contained and
handled without polluting groundwater.
E.5.4.4 New roads and septic fields should not be located within this Development Permit Area. If such a location
cannot be avoided, then the design and construction of the road or septic field should be supervised by a
qualified professional to ensure that the objectives and guidelines of this Area are met.
E. 5.4.5 To assist in the preparation of development permits for larger projects, the Local Trust Committee could
request an applicant to provide a report, prepared by a professional engineer with experience in the
protection of groundwater supplies. The report should indicate the type of conditions that should be
incorporated into the development permit to achieve the objectives and comply with the guidelines of this
Development Permit Area.
E.5.5.1 If a proposed land subdivision is to create additional new lots within this Development Permit Area, then any
new lots, roads, building sites, septic fields and driveways should be located and constructed to meet the
objectives of this Area. A covenant should be registered against the part of the property that is within this
Area to guide future development and meet the objectives of this Area.
`,

dpa6: `
[DPA 6: Unstable Slopes and Soil Erosion]
E.6 DEVELOPMENT PERMIT AREA 6 - UNSTABLE SLOPES AND SOIL EROSION HAZARDS
E.6.1 Description of Development Permit Area and Exemptions
E.6.1.1 Development Permit Area 6 is shown on Maps 23 and 24. It is made up of areas that have been identified
as having a high hazard for soil erosion (Map 23) or a high hazard for slope instability (Map 24).
Development Permit Area 6 is identified according to Sections 879 (1)(a) and (b) of the Municipal Act to
protect the natural environment and to protect development from hazardous conditions.
Background Note: The official versions of Maps 23 and 24 are drawn at a scale of 1:20,000 and are
available through the offices of the Islands Trust. The page size versions of Maps 23
and 24 attached to this Plan have been included for convenience.
This Development Permit Area is based on a reconnaissance level hazard assessment
that was designed to flag significant areas of potentially hazardous lands that need
further assessment prior to disturbance. Only those areas identified as having a
potentially "high" hazard are included in this Development Permit Area. Other smaller
areas that cannot be mapped at this scale may also have unstable slopes. Some of
the areas shown on Map 24 may also include small areas that are not characterized by
instability.
E.6.1.2 All development in this Development Permit Area is exempted from the requirement to obtain a
Development Permit, except:
a. Removal of trees with a trunk diameter greater than 20 cm (measured 1.5 m above the ground) on
areas that have been identified as having a high hazard for slope instability.
b. Removal of vegetation that results in the exposure of a total area of bare soil more than 9 m2 in area.
c. Installation of a septic disposal field in an area that has been identified as having a high hazard for
slope instability.
d. Alteration of existing drainage courses.
e. The subdivision of land parcels that creates additional new lots within this Development Permit Area.
E.6.1.3 Despite Section E.6.1.2, the following activities are also exempted from the requirement to obtain a
Development Permit:
a. development on land within this Development Permit Area, that is, according to a professional survey
submitted to the Islands Trust by the developer, outside an area shown on Maps 13 and 14 as having
a high hazard for slope instability or soil erosion.
b. land alteration and vegetation removal on agricultural land that is not identified on Map 24 as having a
high hazard for slope instability, that is done for farming purposes and that is consistent with normal
farm practices under the Farm Practices Protection (Right to Farm) Act.
c. forest management activities related to timber production and harvesting in the Forest Land Reserve.
d. all activities except for soil excavation or road construction on those parts of this Area that have been
included because of the presence of the "Metchosin" soil type (indicated on Map 23).
e. development on, or subdivision of, a property that is in accordance with a report submitted to the
Islands Trust, prior to development or subdivision commencing, that has been prepared by a
geotechnical engineer or an engineer with expertise relevant to the applicable matter, and has been
conducted in accordance with the recommendations contained in the report addressing slope
instability and soil erosion hazards.
f. the emergency removal of a hazardous tree in compliance with an arborist’s report that has been
submitted to the Islands Trust.
g. emergency works to prevent flood damage to structures.
h. the subdivision of land parcels where a conservation covenant satisfactory to and in favour of the Salt
Spring Island Local Trust Committee or the Islands Trust Fund Board has already been registered for
the prevention of soil erosion and the protection of development from hazards due to slope instability.
E.6.2.1 Land in this Development Permit Area has been identified as having a high hazard for slope instability or soil
erosion. If not carefully managed, disturbance of the land in this Area could result in significant soil erosion
and increased hazards to development.
E.6.4 Guidelines for New Development
Background Note: Development Permits that are issued for developments in this Development Permit
Area could contain conditions that are based on the following guidelines. Not all
guidelines will apply to every permit. Permits will not contain conditions that are
unrelated to these guidelines. The conditions on a Development Permit in this Area
will not prevent a property from being used as the local zoning bylaw allows, unless
they are conditions that relate to health, safety or the protection of property from
damage.
While forest management activities within the Forest Land Reserve are excluded from
the Permit process, voluntary compliance with the guidelines of this section is
encouraged for such activities.
E.6.4.1 All development that takes place in this Development Permit Area should be done in a way that prevents
disturbance to unstable slopes and soils with high erosion hazards.
E.6.4.2 If a tree with a trunk diameter greater than 20 cm is to be removed, or if the removal of vegetation results in
an area of bare soil greater than 9 m2 in area, or if a natural drainage course is to be altered, then a plan
should be developed to prevent slope instability and to control soil erosion. Vegetation and trees are to be
retained and replaced as necessary to control erosion and protect banks.
E.6.4.3 New roads and septic fields should not be located in this Development Permit Area. If such a location
cannot be avoided, then the design and construction of the road or septic field should be supervised by a
professional engineer to ensure that the objectives and guidelines of this Area are met.
E.6.4.4 New structures should not be located in areas that have been identified on Map 24 as having a high hazard
for slope instability. If such a location cannot be avoided, then the design, construction and storm drainage
design of the structure should be supervised by a professional engineer to ensure that the objectives and
guidelines of this Area are met.
E.6.4.5 To assist in the preparation of development permits for larger projects, the Local Trust Committee could
request an applicant to provide a report, prepared by a professional engineer. The report should indicate
the type of conditions that should be incorporated into the development permit to achieve the objectives and
meet the guidelines of this Development Permit Area.
E.6.5.1 If a proposed land subdivision is to create additional new lots within this Development Permit Area, then any
new lots, roads, building sites, septic fields and driveways should be located and constructed in a way that
meets the objectives of this Area. A covenant should be registered against the part of the property that is
within this Area to guide future development and meet the objectives of this Area.
`,

dpa7: `
[DPA 7: Riparian Areas]
BL480 (05/15)
E.7 DEVELOPMENT PERMIT AREA 7 - RIPARIAN AREAS
Development Permit Area 7 is designated according to the Local Government Act to protect the natural
environment, its ecosystems and biological diversity.
Terms used in Section
E.7.1.1.1 Riparian areas related to the watercourses, wetlands and water bodies identified on Map 28 as
streams which include any of the following that provides fish habitat:
a) a watercourse, whether it usually contains water or not;
b) a pond, lake, river, creek or brook;
c) a ditch, spring or wetland that is connected by surface flow to something
referred to in paragraph (a) or (b);
and:
d) for a ravine the development permit area is measured from the top of the
ravine bank.
and Map 28 shall be so interpreted.
The designation and delineation of Development Permit Area 7 consists of a digital record stored and
maintained in a Geographic Information System (GIS) at the offices of the Islands Trust.
E.7.2.1 This development permit area contains streams, lakes and wetlands and their associated riparian areas,
which have been identified as potential fish habitat. Riparian areas are necessary for stream and watershed
health.
It is a policy of the Islands Trust Council that Local Trust Committees shall in their Official Community Plans
and regulatory bylaws, address means to prevent further loss or degradation of freshwater bodies or water
courses, wetlands or riparian zones and to protect aquatic wildlife.
Furthermore, the province of British Columbia’s Fish Protection Act, requires that local governments
establish regulations to protect riparian areas. This designation is intended to protect riparian areas from
development so that the areas can provide natural features, functions and conditions that support fish life
processes.
E.7.3.1 To protect the biological diversity and habitat values of riparian and aquatic ecosystems.
BL488 E.7.4.1 T he following residential, commercial, and/or general employment activities shall require a development
(07/20) permit whenever they occur within Development Permit Area 7, unless specifically exempted under Section
E.7.5:
a. Construction of, addition to, or alteration of a building or other structure.
b. Removal, alteration, or destruction of vegetation.
c. Soil removal, soil deposit or soil disturbance.
d. Development of drainage systems.
e. Creation of non-structural impervious or semi-impervious surfaces.
f. Subdivision, as defined in the Local Government Act;
g. Development, as that term is defined under the provincial Riparian Areas Regulation.
E.7.4.2 The property owner shall be required, in addition to any other application requirements enacted or imposed
by the Local Trust Committee, to provide at their expense an assessment report from a Qualified
Environmental Professional which has been submitted per the Riparian Areas Regulation.
E.7.4.3 In the event that a parcel of land is subject to more than one development permit area, all relevant
development permit area guidelines shall apply and only one development permit, containing conditions
based on guidelines in all applicable development permit areas, shall be required.
E.7.5.1 The following activities are exempt from any requirement for a development permit:
a. Interior or structural exterior alterations, renovations, maintenance, re-construction or repair to a pre-
existing permanent building or structure on an existing foundation or footprint to an extent that does not
alter, extend or increase the footprint. For clarity, this includes pre-existing septic and water systems.
b. The removal of trees that have been examined by an arborist and certified to pose an immediate threat
to life or property.
c. Emergency procedures to prevent, control or reduce immediate threats to life or property including:
emergency actions for flood-protection and erosion protection, clearing of an obstruction from a bridge
or culvert or an obstruction to drainage flow, and repairs to bridges and safety fences carried out in
accordance with the Water Act.
d. Gardening and yard maintenance activities within an existing landscaped area, including mowing,
pruning, planting and minor soil disturbance that does not alter the general contours of the land, or does
not involve the cosmetic application of artificial fertilizers, pesticides, or herbicides.
e. Restoration and enhancement activities by persons undertaking only to restore and enhance the natural
features, functions and conditions of riparian areas as approved in a signed and sealed letter from a
Qualified Environmental Professional submitted to the Islands Trust.
f. Development in accordance with a registered covenant or approved Development Permit that pertains
directly and explicitly to riparian habitat protection which: i) is registered in favour of the Local Trust
Committee and/or Provincial or Federal interests and ii) establishes a riparian buffer.
g. Proposals for the subject property which have an existing development permit and demonstrate that the
proposed development shall not in any way compromise the permit and continue to demonstrate
meeting or exceeding all protective measures and recommendations in accordance with a Riparian
Assessment Report from a Qualified Environmental Professional submitted to the Riparian Areas
Regulation Notification System.
h. Farm Operations as defined in the Farm Practices Protection (Right to Farm) Act and farm uses as
defined in the Agricultural Land Reserve Use, Subdivision, and Procedure Regulation. For clarity, a farm
operation or farm use means agricultural activities conducted by a farm business.
i. Development proposals for the subject property which demonstrate meeting or exceeding all protective
measures and recommendations in accordance with a Riparian Assessment Report from a Qualified
Environmental Professional submitted per the Riparian Areas Regulation before adoption of Bylaw No.
480.

Information Note: Despite these exemption provisions, property owners must meet all applicable local,
provincial or federal requirements. Some activities not listed in this section that are
regulated under other provincial or federal legislation may not require a development
permit. While many activities are exempt from the Permit Process, voluntary
compliance with the guidelines of this section is encouraged for all activities.
E.7.6 Guidelines for New Development
Prior to undertaking any applicable development activities within Development Permit Area 7, the property
owner shall apply to the Local Trust Committee for a development permit, and the following guidelines apply:
E.7.6.1 The property owner shall be required, in addition to any other application requirements enacted or imposed
by the Local Trust Committee, to provide at their expense an assessment report from a Qualified
Environmental Professional which has been submitted per the Riparian Areas Regulation.
E.7.6.2 The Local Trust Committee may impose permit conditions based on the assessment report including:
a. Require specified natural features or areas to be preserved, protected, restored or enhanced in
accordance with the permit.
b. Require natural water courses to be dedicated.
c. Require works to be constructed to preserve, protect, restore or enhance natural water courses or other
specified natural features of the environment.
d. Require protection measures, including that vegetation or trees be planted or retained in order to:
i. preserve, protect, restore or enhance fish habitat or riparian areas;
ii. control drainage, or;
iii. control erosion or protect banks.
E.7.6.3 The Local Trust Committee shall require a security for developments clearing greater than 280m2 (3,012 ft2)
of land within the Development Permit Area. Security shall be returned upon confirmation by a Qualified
Environmental Professional that assessment report conditions have been satisfactorily addressed.
E.7.6.4 Security shall be provided to secure satisfactory completion of habitat protection works, restoration
measures, or other works for the streams and streamside habitat (the “required works”). The security shall
be 150% of the estimated value of the required works as determined by the Local Trust Committee.
E.7.6.5 The development permit should not allow any development activities to take place within any Streamside
Protection and Enhancement Area identified by the Qualified Environmental Professional and the property
owner should be required to follow any measures identified by the Qualified Environmental Professional for
protecting the Streamside Protection and Enhancement Area over the long term and these measures should
be included as conditions of the development permit. The width of the Streamside Protection and
Enhancement Area may be less than the width of the Development Permit Area.
E.7.6.7 If the nature of the proposed project within the Development Permit Area changes after the professional
report has been prepared such that it is reasonable to assume that the professional’s assessment of the
impact of the development may be affected, the Local Trust Committee may require the property owner to
have the professional update the assessment at the property owner’s expense and development permit
conditions may be amended accordingly.

Information Note: Measures identified in Section 4 of the Riparian Areas Regulation Assessment Report
Form, or other direction provided by the Qualified Environmental Professional, which
occurs between the calculated Streamside Protection Area (SPEA) and the 30 meter
Riparian Assessment Area (RAA) should be incorporated into the Development Permit.
E.7.7.1 The Local Trust Committee may consider variances to the subdivision, siting or size regulations of this
Bylaw where the variance may result in enhanced protection of a Streamside Protection Enhancement
Area, riparian buffer or riparian ecosystem in compliance with recommendations of a professional’s report.
`,

goals_environment: `
[Community Objectives]
A.4.1.1 To recognize and protect the fragility and significance of our natural environment as one of our
community's greatest and irreplaceable assets.

[The Island Environment]
A.5.1.1 To recognize the intrinsic value of our ecosystems and that the health of our ecosystems is
inextricably linked to human health.
A.5.2.8 The Local Trust Committee will encourage protection of Crown foreshore, wetland, stream and
riparian corridor habitats, other sensitive ecosystems, and wildlife habitat through the
development permit process:
a. The Local Trust Committee will update watercourse mapping and development permit area
designations and guidelines to comply with provincial Riparian Area Regulations.
b. The Local Trust Committee will undertake updated sensitive ecosystem mapping and should
designate sensitive areas as development permit areas for protection of the natural
environment.
c. The Local Trust Committee will support efforts to map the locations of heron and raptor nests
and will review regulations and standards for a protective buffer. The Local Trust Committee
should designate development permit areas for the protection of sensitive nest trees.
d. The Local Trust Committee will support efforts to map the habitat of threatened or
endangered species and will consider designating development permit areas for the
protection of such habitat.
A.5.2.9 The Local Trust Committee will continue to use Development Permit Area designations for
protection of the natural environment to protect watersheds used for community surface water
supplies or within the capture zone of community water supply wells. Zoning changes should not
be made so that more development would be located in these areas. Development permit area
guidelines should encourage subdivision layouts that avoid impacts on these areas. Stewardship
on the part of property owners and other agencies will also be encouraged.
A.5.2.17 The Local Trust Committee will recognize the needs of the local farming community, the Farm
Practices Protection ("Right to Farm") Act, the Agricultural Land Commission Act and regulations,
and the recommendations of the Area Farm Plan when developing policies or bylaws about
environmental protection. The Agricultural Advisory Committee and the Ministry of Environment
will be consulted as part of this process to develop mutually acceptable management solutions
which protect sensitive environments but do not prohibit or unreasonably restrict farming.

[Climate Change and Energy Efficiency]
A.6.1.1 To consider the impacts of climate change as a central factor in land use decision-making.
A.6.2.20 The provincial government is supported in initiatives to amend the B.C. Building Code to require
reduced emissions and increased energy efficiency standards in new construction.

[Natural Hazard Areas]
A.7.1.1 To identify and guide development away from areas known to have natural hazards, such as
unstable slopes, highly erodible soils, wildfire, or the potential for flooding.
BL488 A.7.2.2 The Local Trust Committee will continue to require applicants for large new commercial, general
(07/20) employment or multifamily developments in village areas to ensure their development does not
increase flooding of downslope properties. Such effects will be managed through the
Development Permit process or through Land Use Bylaw regulations.

[Island Heritage]
A.8.1.1 To encourage protection of the island's archaeological sites and other sites of significance to First
Nations peoples,
Background Note: Archaeological sites are protected through designation as Provincial heritage
sites or through automatic protection by virtue of being of particular historic
or archaeological value. Protected archaeological sites may not be
destroyed, excavated, or altered without a permit issued by the Minister (or
designate) responsible for the Heritage Conservation Act. The Act is binding
on government and, in matters of heritage conservation, it takes precedence
over other legislation.

[Implementation]
D.5.1 It is intended that this Plan will consist not only of objectives, but also of policies for action to
achieve the stated objectives. This Plan clearly outlines how its objectives could be carried out
through changes to land use bylaws, through the decisions that the Local Trust Committee makes
in response to the proposals of others, and by advocating particular actions by others. Actual
priorities and the level and timing of implementation will be dependent on future discretionary
decisions made by successive Local Trust Committees and the resources available to them.

[Definition: environmentally sensitive area]
environmentally sensitive area — places that have special environmental attributes worthy of retention or special care. These areas are critical to the maintenance of productive and diverse plant and wildlife populations. Examples include rare ecosystems, habitats for species at risk and areas that are easily disturbed by human activities. Some of these environmentally sensitive areas are home to species which are nationally or provincially significant, others are important in a more local context. They range in size from small patches to extensive landscape features, and can include rare and common habitats, plants and animals.

[Definition: high biodiversity area]
high biodiversity area — areas shown on Map 9, or identified through site survey by a qualified professional as having value for their high degree of biodiversity.

[Definition: sustainability]
sustainability — means the maintenance of ecological processes so that the biological productivity of the Earth endures without dependence on non-renewable resources.

[Definition: sustainable]
sustainable — capable of being maintaining the integrity of natural ecosystems indefinitely, while meeting the economic and social needs of current and future generations.

[Ganges Heritage Conservation Area]
F.1 HERITAGE CONSERVATION AREA 1 - GANGES VILLAGE CORE
`,

infrastructure: `
[General Infrastructure Objectives]
C.1 GENERAL INFRASTRUCTURE AND SERVICING OBJECTIVES

[Transportation Servicing]
C.2 TRANSPORTATION SERVICING OBJECTIVES AND POLICIES

[Potable Water Supply]
C.3 POTABLE WATER QUANTITY AND SUPPLY OBJECTIVES AND POLICIES
Background Note: The objectives and policies in this Section pertain to water quantity only.
Objectives and Policies about water quality are in Part A.
C.3.2.1.5 To ensure that zoning changes within the boundaries of water systems do not result in such a
level of demand on island water sources that agricultural activities cannot obtain water.

TABLE 1 - North Salt Spring Waterworks District
Supply and Demand - 2008
Licence Peak Day Limit Estimated Annual Limit
(Million Imperial gallons/day) (Million Imperial gallons/year)
Current Water Licences
Lake Maxwell 0.500 911
St Mary Lake 0.943 1721
Total 1.443 2631
Current Demand2 175
Build-Out Demand3 277
Surplus (Deficit) at maximum build-out (14)
Source: North Salt Spring Waterworks District (2008)
Notes:
1. All NSSWD licences have peak day limits, but only the most recent licences have annual
limits. A 2.0:1 peak day to average day ratio appears appropriate based on the past 5 years
usage adjusted for meter wear and estimated losses from watermain leaks. With current
peak day licenses totalling 1.443 mgd and a 2:1 peak/avg day ratio, the calculated annual
licence limit would be 263 MGY.
2. Current demand is based on very dry summer years (like 2003), the total of customer meters
plus a 5% allowance for customer meter wear, plus a 15% allowance for losses from
watermain leaks.
3. Build-out demand is based on the June 30, 2006 Islands Trust Staff Report build-out
projection for development within NSSWD geographic boundaries permitted with current
zoning. The demand estimate is on the same basis as current demand.
Note: Within the North Salt Spring Waterworks District (NSSWD), the amount of development expected
under existing zoning is likely to require all of the water available under the NSSWD’s current
water licences. There is no assurance at this time that NSSWD could obtain additional water
licenses. Also, NSSWD completed a supply-demand study in January 2007 and concluded that
with current climate St Mary Lake drawdown may be excessive during future major droughts if all
licensees were withdrawing water at their current licence limits. Climate change is expected to
result in increasing irrigation demand and may result in declining water supply. Service
extensions from NSSWD and Capital Regional District waterworks may increasingly be needed
for supply replacement for north-island areas with failing or polluted groundwater supplies. The
Capital Regional District is now conducting a study of the NSSWD water supply situation.
Therefore, until such time as adequate water supply is assured, the target for zoning changes
within the NSSWD’s boundaries will be to achieve no net increase in water demand. Zoning
proposals within the NSSWD’s boundaries which would lead to an increase in water demand may
be considered, if they also propose other sources of water, conservation strategies, or other
zoning changes that would offset any predicted increase in water demand.

TABLE 2 – Salt Spring Island Water Systems (excluding NSSWD)
Current Connections and Remaining Supply Capacity
Community Water Water Current Build- Peak Annual
System Source Demand Out Day Licence
(MGY) Demand Licence (MGY)
(MGY) (Gal)
Beddis (CRD/NSSWD) St Mary 7.8 10 62,000 10*
Lake
Cedar Lane Wells 1.1 1.3
(CRD/NSSWD)
Cedars of Tuam (CRD) Wells 0.5 0.5
Erskine Heights (NSSWD) Wells 0.7 5
Fernwood/North Beach St Mary 75,000 22.8
(CRD) Lake (13.7)**
Fulford Harbour Lake 9.6 12*** 70,000 12.8*
(CRD/NSSWD) Weston
Harbour View Wells 0.5 0.5
Highland (CRD) St Mary 114,000 27.7
Lake (20.8)**
Maracaibo Estates Wells 2.2 3.6
Mount Belcher Wells 1.5 1.9
Reginald Hill Wells
Scott Point (NSSWD) Wells 1.5 1.6
Swan Point Wells
Notes: MGY – million Imperial gallons per year
* No annual licence limit – limit as shown is an estimate based on the peak day limit and an estimated peak
day/average day ratio of 2.0
** Amount in brackets is estimated annual licence limit if the actual maximum day/average day ratio is 2.0 –
the peak day limit will be reached at this ratio at this annual volume
*** Build-out demand includes Fulford School
NSSWD operates Beddis, Cedar Lane, Erskine Heights, Fulford Harbour, and Scott Point
C.3.3.2.1 To protect groundwater recharge areas, zones in the upland areas of the island will continue to
allow only a low density of development. The Local Trust Committee may consider undertaking or
supporting further analysis of groundwater recharge areas on the island, including the creation of
a groundwater conservation strategy. The transfer of development potential to other parts of the
island will be encouraged.

[Waste Management]
C.4 WASTE MANAGEMENT OBJECTIVES AND POLICIES
Background Note: Map 7 shows the island's existing waste management facilities.
C.4.2.4.3 Marina operators in Ganges and Fulford Harbours are asked to encourage good harbour
stewardship with their customers. They are asked to discourage the flushing of boat holding
tanks in confined harbour areas.

[Power and Telecommunications]
C.5 POWER AND TELECOMMUNICATIONS OBJECTIVES AND POLICIES
C.5.1.2.1 The Local Trust Committee should ensure that land is not rezoned for higher density residential
use, child care, schools, health care or public assembly in areas where electromagnetic radiation
is higher than normal.

[Definition: non-automotive]
non-automotive — describes forms of transportation or transportation systems that do not include use of individual automobiles.

[Definition: parking lot]
parking lot — an area not within a building where motor vehicles may be stored for the purposes of temporary, daily, or overnight off-street parking.

[Definition: parking space]
parking space — an area on a parking lot intended for temporary parking of a personal vehicle.
`,

parks: `
[Park and Recreation Land Use]
B.7 PARK AND RECREATION LAND USE OBJECTIVES AND POLICIES
B.7.1 respectively.
Note: Where land is located within the North Salt Spring Waterworks District, any
rezoning proposals that are expected to result in a net increase in water
demand must also take into account the severe restraints on the District's
available water supply. Policies in Section
B.7.1.1.2 To recognize the interests of First Nations in the
Crown Lands in this designation.
B.7.1.1.3 To encourage the management or disposition of
the island's Crown Land in a manner consistent
with broader policies of this Plan regarding
settlement patterns and the conservation of
environmentally sensitive areas and
conservation of areas of significance to First
Nations. To preserve the recreational,
conservation and community farm land uses of
that land.
B.7.1.1.4 To encourage a broad range of recreational opportunities, with an emphasis on those that do not
consume resources and that benefit the health and safety of residents.
TENT CAMPING IN RUCKLE PARK
artwork: B. Curan
B.7.1.2.1 The areas designated for Parks and Recreation are shown on Map 1.
B.7.1.2.2 Zones within the Parks and Recreation Designation will continue to allow parks and recreation
activities.
B.7.1.2.3 Zones within other Designations will continue to allow Public Park and recreation activities on
lands where they are now allowed.
B.7.1.2.4 The Local Trust Committee should continue to zone parks, in consultation with the Salt Spring
Island Parks and Recreation Commission, CRD Regional Parks and B.C. Parks, to permit
appropriate uses, including traditional community uses of public lands such as day care,
intermittent commercial uses and agriculture.
BL488 B.7.1.2.5 Zoning changes should not be made in this designation to allow commercial, general employment
(07/20) or residential developments, with the exception of single caretakers' residences.
Others are encouraged to help achieve the objectives of this Section as follows:
B.7.1.2.6 The Integrated Land Management Bureau is urged not to approve licenses, leases or sale of
Crown Land for uses that would be in conflict with the community's objectives for more
sustainable settlement patterns (see Section B.2.3), or that would alienate or occupy Crown Land
for private, non-park purposes. Where First Nations interests have been satisfied, Integrated
Land Management Bureau is encouraged to approve applications by other government agencies
to acquire Crown Land in the Park and Recreation Designation for conservation or park and
recreation purposes, as outlined in Policy B.7.2.2.9.
B.7.2.2.2 When land is being subdivided so that park land dedication is required by the Local Government
Act, the Local Trust Committee will require park land or an amount of money that represents up to
5 per cent of the land being subdivided. A dedication of less than 5 per cent could be considered
by the Local Trust Committee if other community benefits are being provided such as land,
additions to the trail network, or facility development.
B.7.2.2.3 The Local Trust Committee should require park land dedication, and not payment of cash in lieu,
if the proposed subdivision is in a land use designation listed in Appendix 5 or if the proposed
subdivision includes land in the categories described in Appendix 5.
B.7.2.2.6 Public park and recreation lands or recreational facilities (or money to purchase them) is an
eligible community amenity, which could be exchanged for a higher density of development as
outlined in Appendix 3. Preference should be given to proposals that would provide the park and
recreation lands of high community priority outlined in Appendix 5.
B.7.2.2.7 The Local Trust Committee should support applications by the Salt Spring Island Parks and
Recreation Commission for the non-farm use of, removal from, and subdivision of limited
amounts of land in the Agricultural Land Reserve to provide for the following community
recreation needs:
a. the expansion of recreational facilities, including administrative and utility buildings in Portlock
Park.
b. approximately 3 ha next to Portlock Park to allow for additional athletic fields and parking.
c. approximately 4 ha in the south end of the island, to replace an existing ball park facility
operated on ALR land.
d. additions to the trail network.
To be supported, specific applications should also have been referred to the Agricultural Advisory
Committee. They should also include plans to transfer good agricultural soils to agricultural land.
To offset the impacts of the non-farm use or the removal of lands from the Agricultural Land
Reserve under this policy, the Local Trust Committee will encourage the inclusion into the
Agricultural Land Reserve of other lands that are suitable for agriculture.
Background Note: This policy suggests the types of applications to the Agricultural Land
Commission which could be supported by the Local Trust Committee.
However, the final decision regarding all such applications rests with the
Commission.
B.7.2.2.9 The Local Trust Committee will support applications by public or community groups to acquire
Crown Land or licenses of occupation on Crown Lands in the Parks and Recreation Designation
for passive outdoor public recreation and conservation, subject to recognition of First Nations
interests and to consultation with First Nations.
B.7.2.2.11 The Local Trust Committee should ensure that opportunities to add to the trail network are
considered during the review of all new development proposals.
Others are encouraged to help achieve the objectives of this Section as follows:
B.7.2.2.12 The Capital Regional District is encouraged to acquire additional land for public park, trail network
segments, and recreation use through its regional parks function.
B.7.3.2.2 The Salt Spring Island Parks and Recreation Commission and School District #64 are supported
and encouraged in their agreements for joint use of facilities.
`,

residential: `
[Residential Land Use]
B.2 RESIDENTIAL LAND USE OBJECTIVES AND POLICIES
B.2.2.2.10 In zones where single family dwellings are presently allowed, the Local Trust Committee should
consider changing local zoning to also allow (as an alternative to a single family dwelling), a
flexible unit dwelling that:
a. has a maximum of two storeys, and
b. has a maximum floor area, and
c. could contain between one and three dwelling units, depending on the needs and wishes of
the property owner.
Flexible unit dwellings should only be allowed on lots larger than 1.2 ha or on smaller lots in
village areas. If zoning is changed to allow flexible unit dwellings, design guidelines and zoning
regulations should be developed to ensure the dwellings fit into single-family neighbourhoods.
B.2.2.2.20 Community care facilities will be allowed in zones that permit residential use, as outlined in the
Community Care and Assisted Living Act.
Background Note: The Community Care and Assisted Living Act ensures that local zoning
bylaws do not prevent Community Care facilities from locating in residential
areas.
B.2.5.2.3 The minimum average size of lots that can be created by subdivision will remain the same as
indicated in the existing Land Use Bylaw that applies to land in the Rural Neighbourhoods
Designation. New zones created in this Designation will not generally have a density that
exceeds 1 lot per 2 ha. However, the Local Trust Committee could make an exception by
allowing a density of 1 lot per 1.2 ha as part of a proposal that provided an eligible community
amenity (see Appendix 3) or as part of a proposal to transfer development potential (see Policy

[Definition: affordable housing]
affordable housing — describes rental or owned housing that can be acquired with 30 per cent of the median gross income of families or individuals on Salt Spring Island.

[Definition: floor area, gross]
floor area, gross — the sum of the gross horizontal areas of the several floors or a building or structure from the exterior face of exterior walls, or from the centreline of a wall separating two buildings where the floor to ceiling height is 1.8 m or more; including basements, stairwells, attic space, garages and enclosed porches.

[Definition: floor space ratio]
floor space ratio — the gross floor area of all buildings and structures on a parcel divided by the total parcel area.

[Definition: manufactured home park]
manufactured home park — the parcel, or parcels, on which one or more manufactured home sites that same landlord rents or intends to rent and common areas are located.

[Definition: multifamily use]
multifamily use — the use of a parcel or building for more than one dwelling unit, and the use of a parcel for a community residential home.

[Definition: residential use, high density]
residential use, high density — residential use where the density of dwellings is greater than one per 0.10 ha.

[Definition: residential use, low density]
residential use, low density — residential use where the density of dwellings is less than one per 2 ha.

[Definition: residential use, medium density]
residential use, medium density — residential use where the density of dwellings is between one per 0.10 ha and one per 2 ha.

[Definition: residential use, very low density]
residential use, very low density — residential use where the density of dwellings is less than one per 8 ha.

[Definition: seniors' dwelling unit]
seniors' dwelling unit — means a dwelling unit restricted to a person 65 years or older and one other person who may be under the age of 65 and who is a spouse, partner or unpaid caregiver who resides in the same dwelling unit.

[Definition: seniors' supportive housing]
seniors' supportive housing — means a barrier-free housing development comprised of seniors' dwelling units and accessory dwelling units for resident staff, provided in combination with support services which are to include at least all of the following: monitoring and response for medical emergencies, availability of one meal a day, housekeeping, laundry and recreational opportunities.

[Definition: special needs housing]
special needs housing — housing that provides for the residential accommodation of an individual or individuals who require specific housing designs or services to enable them to live relatively independently or in a supportive environment.

[Appendix 2: Shared Residential Zoning]
H.2.1 Guidelines for Shared Residential Zoning Applications
Applications for Shared Residential Zoning should be consistent with the points listed below.

[Appendix 4: Transfer of Development Potential]
H.4.1 Guidelines for Applications to Transfer Development Potential
The purpose of transfer of development potential is to allow for the consideration of applications that would result
in the transfer of development potential from environmentally sensitive areas, lands that are hazardous, or lands
that have cultural, historical, agricultural or landscape significance, while supporting the clustering of development
potential in areas more suitable for development.
Transfer of Development Potential, sometimes referred to as “Density Transfer”, is the ability to rezone land such that it
results in a reduction in development potential in one location and an increase in development potential in another, with
no overall, or net, increase in density. The development potential usually takes the form of lots or units and the
transfer is achieved by simultaneously changing the zoning on the “donor” and “receiver” parcels, or areas, to reflect
the changed subdivision potential or permitted number of units on each. Transfer of development potential may be
considered on a case-by-case basis, upon application for rezoning. The approval of a transfer of density through
rezoning should be conditional on compliance with the following policy guidelines. These guidelines do not pre-
determine a favourable outcome for any particular application.
`,

villages: `
[Village Land Use]
B.5 VILLAGE LAND USE OBJECTIVES AND POLICIES
B.5.1.1.3 To encourage the commercial viability of island villages and to retain traditional village functions.
B.5.1.2.2 Zoning in Village Designations will continue to allow the mix of commercial, institutional, cultural,
and multi-family land uses that are currently allowed. Commercial zoning should be simplified
with fewer zones and a broader range of uses allowed in each. The maximum residential density
allowed on any single property will remain at 37 units per ha. However, where a multifamily
development is comprised of special needs housing or affordable seniors’ supportive housing, the
density of development may exceed 37 units per ha, provided it does not exceed a floor space
ratio of 0.6, a site coverage of 33 percent, a maximum of two storeys and a maximum of 50 units
in any one development.
B.5.3.2.14 The Ministry of Transportation and Infrastructure, Capital Regional District, Salt Spring Harbour
Authority, and the B.C. Ferry Services Inc. are urged to help the Fulford Village community
develop solutions to ferry traffic congestion and ferry customer parking. The Local Trust
Committee supports strategies that emphasize improved traffic management on roads and
incentives for non-automotive travel. The B.C. Ferry Services Inc. is encouraged to support the
purchase and development of land for commuter parking, as outlined in Policy B.5.3.2.4. The
Local Trust Committee could support an expansion of the ferry staging area to accommodate a
minimum of one sailing load, provided solutions can be found to any anticipated environmental
impacts. The design of the staging area should minimize the impact on the village's character as
outlined in the applicable development permit area guidelines.

[Definition: neighbourhood convenience services]
neighbourhood convenience services — a commercial use that provides limited retail and service uses catering to the day to day needs of the residents of the surrounding area. Examples of retail and service uses provided include the retail sale of pre-packaged food and household items, video tape rentals, and the use of photocopy and facsimile machines.

[Definition: sign]
sign — any object, device, display, or structure, or part thereof, situated outdoors or visible from outdoors, which is used to advertise, identify, display, direct, or attract attention to an object, person, institution, organization, business, product, service, event, or location by any means, including words, letters, figures, design, symbols, fixtures, colours, illumination, or projected issues.

[Appendix 3: Amenity Zoning]
H.3.1 Guidelines for Amenity Zoning Applications
H.3.1.1 Where appropriate, applications for amenity zoning should propose a density level that does not exceed
the target density levels outlined in this Plan for the applicable Land Use Designation. For example, an
application in the Rural Neighbourhoods Designation should propose a density level no greater than 1
lot per 1.2 ha, as outlined in the policies for that Designation (See Policy B.2.5.2.3).
H.3.1.6 Prior to approving any amenity zoning application, the Local Trust Committee should give consideration to
the appropriateness of the land for the increased density. The following factors should be considered where
relevant:
a. environmental values are identified prior to site clearing and design.
b. development is located away from areas with high environmental values, and natural buffers are
placed between the development site and sensitive features.
c. development is concentrated in areas with lower environmental values.
d. site plans protect biodiversity, clean air, and clean water.
e. development is located away from areas that may be subject to erosion, flooding, wildfires, and
wildlife conflicts.
f. the impacts of roads are minimized and development is located in proximity to and accessible to
existing services, constructed roads, and transit, and the development should have the potential to
contribute to reducing community dependence of travel by automobile
g. the fragmentation of habitat is minimized.

h. potable water quality is maintained and an adequate supply is available to support the permitted level
of development.
i. air quality is maintained and energy efficient design, greenhouse gas emissions and climate change
adaption are considered.
j. energy- and water-efficient development is designed to conserve natural resources.
k. development minimizes waste, and manages waste in an environmentally sound manner.
l. that the development would not compromise archaeological, First Nations cultural, historical, heritage
sites or significant or outstanding landscape features.
m. that the development would be located away from community water system supply watersheds and
community well capture zones.
The Local Trust Committee should request that the applicant provide reports and other information
satisfying concerns that the Local Trust Committee considers relevant, including provision of a site plan that
shows how additional lots, building sites and accesses will be designed to minimize negative impacts. The
Local Trust Committee may consider the use of site-specific zoning, covenants, designation of development
permit areas, or a combination of tools to implement these criteria.
H.3.3.3 Where the proposed community amenity includes areas of land and valuation of the amenity is difficult or
impractical, the Local Trust Committee may consider an alternative to undertaking financial appraisal of the
value of the amenity. In such instances, the Local Trust Committee may consider permitting a maximum of
one additional parcel or one additional dwelling unit for each parcel of dedicated land that is equal to the
base minimum average parcel size for the Land Use Designation where it is located. For example, if land in
the Uplands Designation is dedicated, a maximum of one density could be exchanged for each 8 ha
dedicated or protected.
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
      "seniors", "seniors housing", "flexible unit", "transfer of development",
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
      "temporary use permit", "temporary use", "moratorium",
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
      "village green", "amenity zoning",
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
      "non-farm use", "farm use", "forestry",
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
      "bulkhead", "breakwater", "groin", "jetty", "pier", "revetment",
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
  dpa1: {
    label: "DPA 1: Island Villages",
    icon: "🏘️",
    keywords: [
      "development permit", "dpa", "permit area",
      "form and character", "village permit", "ganges permit", "fulford permit",
      "building design", "commercial design", "storefront", "signage design",
      "pedestrian", "streetscape", "mixed use building",
    ],
  },
  dpa2: {
    label: "DPA 2: Non-Village Commercial",
    icon: "🏢",
    keywords: [
      "development permit", "dpa", "permit area",
      "non-village commercial", "general employment permit",
      "screening", "landscaping requirement", "commercial design",
    ],
  },
  dpa3: {
    label: "DPA 3: Shoreline",
    icon: "🌊",
    keywords: [
      "development permit", "dpa", "permit area",
      "shoreline permit", "shoreline development", "shoreline stabilization",
      "bulkhead", "breakwater", "revetment", "seawall", "rockwall", "rock wall", "riprap",
      "dock permit", "dock", "float", "pier", "wharf",
      "dredg", "foreshore", "natural boundary of the sea",
      "erosion", "shoreline protection", "impervious surface",
      "accretion", "groin", "jetty",
    ],
  },
  dpa4: {
    label: "DPA 4: Lakes, Streams & Wetlands",
    icon: "💧",
    keywords: [
      "development permit", "dpa", "permit area",
      "lake permit", "stream permit", "wetland permit",
      "lake setback", "stream setback", "natural boundary",
      "fish habitat", "vegetation removal", "tree removal",
    ],
  },
  dpa5: {
    label: "DPA 5: Well Capture Zones",
    icon: "🚰",
    keywords: [
      "development permit", "dpa", "permit area",
      "well capture", "capture zone", "drinking water",
      "groundwater", "aquifer", "well protection",
    ],
  },
  dpa6: {
    label: "DPA 6: Unstable Slopes",
    icon: "⛰️",
    keywords: [
      "development permit", "dpa", "permit area",
      "unstable slope", "soil erosion", "geotechnical",
      "landslide", "slope hazard", "steep slope", "retaining wall",
    ],
  },
  dpa7: {
    label: "DPA 7: Riparian Areas",
    icon: "🐟",
    keywords: [
      "development permit", "dpa", "permit area",
      "riparian", "streamside", "spea", "fish habitat", "fish protection",
      "environmental professional", "qep", "riparian buffer",
      "stream setback", "watercourse",
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

  lub_subdivision: {
    label: "LUB 355: Subdivision Regulations (Part 5)",
    icon: "📐",
    keywords: [
      "subdivide", "subdivision", "subdividing", "split lot", "split my lot",
      "divide lot", "divide property", "divide my property", "divide my land",
      "lot split", "lot division", "create lots", "creating lots", "new lots",
      "boundary adjustment", "lot line adjustment", "lot consolidation",
      "lot area", "minimum lot area", "average lot area", "minimum lot size",
      "lot dimensions", "lot depth", "lot width", "lot frontage", "frontage",
      "panhandle lot", "panhandle", "access strip",
      "potable water supply", "water supply for subdivision",
      "sewage disposal", "septic for subdivision",
      "stormwater drainage", "drainage system", "drainage engineering",
      "covenant against subdivision", "further subdivision",
      "zone boundary lot", "split lots", "double frontage",
      "highway access", "road access", "access to highway",
      "public access to water", "water body access",
      "highway standards", "road standards", "road construction",
      "pathway", "bikeway", "shoulder bikeway", "cycle route",
      "driveway", "driveway guidelines",
      "sidewalk", "boulevard", "village core sidewalk",
      "building envelope", "280 square metres",
      "approving officer", "land title office",
      "eagle nest", "heron nest", "osprey nest",
      "pump test", "water quality analysis", "groundwater",
      "water license", "community water system",
    ],
  },

  lub_signs: {
    label: "LUB 355: Sign Regulations (Part 6)",
    icon: "🪧",
    keywords: [
      "sign", "signs", "signage", "business sign", "sign area",
      "sign size", "sign regulation", "sign permit",
      "illuminated sign", "lighted sign", "animated sign",
      "directional sign", "double-faced sign",
      "sign removal", "sign standards",
      "how many signs", "how big can a sign be",
      "table 2",
    ],
  },

  lub_zones_residential: {
    label: "LUB 355: Residential Zone Regulations (R1-R12)",
    icon: "🏘️",
    keywords: [
      "r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8", "r9", "r10", "r11", "r12",
      "residential zone", "residential 1", "residential 2", "residential 3",
      "residential 4", "residential 5", "residential 6", "residential 7",
      "residential 8", "residential 9", "residential 10", "residential 11", "residential 12",
      "multi-family", "multifamily", "mobile home park",
      "affordable housing", "seniors", "supportive housing",
      "cluster housing", "compact",
      "zone variation", "schedule a",
      "residential subdivision", "residential servicing",
    ],
  },

  lub_zones_agricultural: {
    label: "LUB 355: Agricultural Zone Regulations (A1, A2)",
    icon: "🌾",
    keywords: [
      "a1", "a2", "agricultural zone", "agricultural 1", "agricultural 2",
      "agriculture zone", "farm zone",
      "farmworker dwelling", "farmworker's dwelling",
      "abattoir", "kennel", "commercial composting",
      "farm-related light industry",
      "commercial guest accommodation",
      "greenhouse", "lot coverage greenhouse",
    ],
  },

  lub_zones_commercial: {
    label: "LUB 355: Commercial & Accommodation Zones (C1-C4, CA1-CA5)",
    icon: "🏢",
    keywords: [
      "c1", "c2", "c3", "c4", "commercial zone", "commercial 1", "commercial 2",
      "commercial 3", "commercial 4",
      "ca1", "ca2", "ca3", "ca4", "ca5",
      "commercial accommodation", "commercial accommodation zone",
      "hotel zone", "resort zone", "campground zone",
      "guest accommodation", "guest house",
      "automobile service station", "gasoline sales",
      "retail zone", "office zone", "restaurant zone",
      "pub", "theatre", "cinema",
    ],
  },

  lub_zones_other: {
    label: "LUB 355: CF, CD, Forestry, Employment & Parks Zones",
    icon: "🏛️",
    keywords: [
      "cf1", "cf2", "community facilities", "community facilities zone",
      "cd1", "cd2", "cd3", "comprehensive development",
      "f1", "f2", "forestry zone", "forestry 1", "forestry 2",
      "ge1", "ge2", "ge3", "general employment", "general employment zone",
      "pr1", "pr2", "pr3", "pr4", "pr5", "pr6", "parks and reserves",
      "park zone", "parks zone",
      "light industry", "contractor's shop", "creative industry",
      "boat building", "wholesale", "cement factory",
      "golf course", "golf club",
      "funeral home",
      "stormwater management",
      "marine-dependent",
    ],
  },

  lub_zones_rural: {
    label: "LUB 355: Rural, Upland, Watershed & Shoreline Zones",
    icon: "🌲",
    keywords: [
      "rural", "upland", "watershed",
      "ru1", "ru2", "ru3", "rw1", "rw2", "ri",
      "rural zone", "rural upland", "rural island",
      "s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8",
      "shoreline zone", "shoreline",
      "retreat centre", "meditation",
      "plant nursery", "native wildlife",
      "lighthouse", "boathouse",
      "rural water protection",
      "8 ha", "32 ha", "12 ha",
      "navigational", "moorage", "wharfage",
      "aquaculture", "fin fish",
      "eelgrass", "clam bed",
      "float", "dock", "pier",
      "sea plane", "barge",
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
const LUB_SECTION_KEYS = ["lub_definitions", "lub_general_regulations", "lub_siting", "lub_subdivision", "lub_signs", "lub_zones_residential", "lub_zones_agricultural", "lub_zones_commercial", "lub_zones_other", "lub_zones_rural", "lub_additional"];
const OCP_SECTION_KEYS = ["goals_environment", "residential", "commercial", "community", "villages", "agricultural", "parks", "conservation", "infrastructure", "dpa1", "dpa2", "dpa3", "dpa4", "dpa5", "dpa6", "dpa7"];

// ─── Section summaries for semantic embedding (bge-small-en-v1.5, 512 token limit) ───
// These are concise semantic descriptions that capture what each section covers,
// used for vector similarity reranking. Full section text is too large to embed.
const SECTION_SUMMARIES: Record<string, string> = {
  // LUB sections
  lub_definitions: "Definitions and interpretation of land use bylaw terminology. Accessory use, agriculture, basement, bed and breakfast, boathouse, building, cabin, campground, church, commercial, dwelling unit, floor area, guest accommodation, height, home-based business, hotel, kennel, lot area, lot coverage, manufactured home, marina, natural boundary, principal use, retail, secondary suite, seasonal cottage, setback, sign, structure, subdivision, temporary use, water body, wetland, zone.",
  lub_general_regulations: "General regulations for permitted and prohibited uses, buildings, and structures. Dwelling unit density, lot coverage limits, building height maximum 10.7 metres, home-based business rules, secondary suites, seasonal cottages, full-time rental requirements, bed and breakfast, accessory buildings, composting, abattoirs, boarding houses, travel trailers, float homes, bare land strata common property.",
  lub_siting: "Setback and siting regulations. Distance from lot lines, front rear interior exterior side setbacks, water body setbacks 30 metres from lake 15 metres from stream, drinking water well setback 60 metres, septic sewage disposal field distance, visibility triangle at intersections, natural boundary foreshore setback, eaves chimney balcony deck projection allowances, boathouse dock setbacks, kennel animal enclosure distances, campsite setbacks.",
  lub_subdivision: "Subdivision regulations. Minimum lot area, average lot area, lot dimensions depth width frontage, panhandle lot access strip, potable water supply requirements, sewage disposal septic requirements, stormwater drainage, covenant against further subdivision, zone boundary lots, double frontage lots, parkland dedication, community water and sewer servicing levels, on-site well and septic minimum areas.",
  lub_signs: "Sign regulations. Permitted sign types, maximum sign area and dimensions, illumination restrictions, setbacks from lot lines, temporary signs, real estate signs, home occupation signs, height limits.",
  lub_zones_residential: "Residential zone regulations R1 through R12. Single-family dwelling, duplex, multi-family, mobile home, manufactured home, affordable housing, secondary suite, seasonal cottage. Permitted uses, accessory uses, setbacks, lot coverage, building height, floor area ratio, subdivision minimum lot sizes for each residential zone. R1 through R12 specific variations and exceptions.",
  lub_zones_agricultural: "Agricultural zone regulations A1 and A2. Agriculture, farm buildings, single-family dwelling, secondary suite, second accessory dwelling for farmworker. Stormwater and agricultural liquid waste management. Zone variations: community hall, outdoor events, children's camp, hotel restaurant, emergency response fire training. A2 biodiversity conservation education, 10% lot coverage, setbacks.",
  lub_zones_commercial: "Commercial zone regulations C1 through C5 and Commercial Accommodation CA1 through CA5. Retail, office, restaurant, liquor store, laundromat, nursery, indoor production, veterinary clinic, day care, multifamily, guest accommodation. Hotels motels cabins guest houses tourist hostels campgrounds. Setbacks, lot coverage, subdivision, floor area per hectare, guest units per hectare, maximum guests, marina services, boat rentals.",
  lub_zones_other: "Community Facilities CF1 CF2, Comprehensive Development CD1 CD2 CD3, Forestry F1 F2, General Employment GE1 GE2 GE3, Parks and Recreation PR1 through PR6. Schools, churches, libraries, recreation, fire halls, waste management, recycling, liquid waste treatment. Forest harvesting, sawmill, contractor shop, warehouse, light industry. Park trails, nature reserves, cemeteries.",
  lub_zones_rural: "Rural zones RU1 RU2 RU3, Rural Watershed RW1 RW2, Rural Residential Ri, Shoreline zones S1 through S8. Rural residential, agriculture, forestry, watershed protection, upland rural use. Shoreline and foreshore regulations, marina, dock, wharf, moorage, boat launch, aquaculture, marine conservation. Setbacks from natural boundary, water access, environmental protection.",
  lub_additional: "Agricultural Land Reserve ALR restrictions, Agricultural Land Commission ALC approvals. Development Permit Areas DPA triggers. Temporary Use Permits TUP process. Board of Variance minor variances hardship applications. Non-conforming uses and structures legal non-conforming status.",
  // OCP sections
  goals_environment: "OCP community objectives, island environment, climate change energy efficiency, natural hazards, island heritage, Ganges Heritage Conservation Area. ESA environmentally sensitive areas, biodiversity, 30% conservation target, greenways, GHG reduction targets, renewable energy solar wind, flood unstable slope wildfire erosion geotechnical hazards, archaeological First Nations heritage, heritage buildings register, implementation policies.",
  residential: "OCP residential land use policies. Flexible unit dwellings 1-3 units, secondary suites max 90m2 owner-occupied, seasonal cottages, affordable housing special needs seniors supportive housing, cluster housing, settlement patterns, rural density max 1 lot per 2 hectares, no population growth beyond 2008 baseline, shared residential zoning appendix, transfer of development potential.",
  commercial: "OCP commercial tourism general employment policies. Tourist accommodation hotels motels guest houses campgrounds, bed and breakfast home-based business, light manufacturing industrial, general employment zones, temporary use permits, moratorium on resort hotel zoning until 80% built, prohibition on large destination resorts convention centres water slides casinos, extractive resource mining petroleum.",
  community: "OCP community institutional land use policies. Schools education child care daycare, hospital health services medical dental, emergency services fire hall ambulance, churches cemeteries community halls libraries cultural facilities, institutional use designations, government buildings, recreation facilities, adjacent rezoning requirements.",
  villages: "OCP village land use policies. Ganges village Fulford village Channel Ridge, village core mixed use, max 37 units per hectare density, pedestrian-oriented compact design, three-storey buildings, no large retail offices multifamily outside villages, prohibition on drive-in commercial, amenity zoning appendix, neighbourhood convenience services, ferry terminal harbour.",
  agricultural: "OCP resource land use agriculture forestry policies. ALR Agricultural Land Reserve, ALC Agricultural Land Commission, farm operations agri-tourism, food security farmers markets, farmworker dwelling housing, non-farm use restrictions, farming school tourist accommodation where farming capability minimal, no zoning prohibiting farming, 80% development threshold for rezoning.",
  parks: "OCP park and recreation land use policies. 5% parkland or money from subdivisions, trails pathways public open space, Crown land, water access maintenance, Portlock Park expansion, community greens playgrounds ball parks, sports athletic recreation areas, park land acquisition dedication, recreation facility standards.",
  conservation: "OCP conservation shoreline aquatic use policies. Watershed protection Maxwell Lake 300m buffer other lakes 61m, wetland stream riparian protection, dock float max 35m2 residential 2 boats max 2.2m draft, marina requirements, aquaculture except finfish, foreshore beach swimming access, ecological reserves nature reserves islets, upland conservation, marine ecology fish habitat.",
  infrastructure: "OCP infrastructure servicing policies. Potable water supply NSSWD priority hospitals schools then affordable seniors housing, no density increase in water-constrained areas, sewage septic waste management solid liquid waste, road standards transportation priority walking cycling transit, power telecommunications electromagnetic, ferry service airstrip, stormwater drainage, parking requirements.",
  dpa1: "OCP DPA 1 Island Villages. Form and character guidelines for development in Ganges, Fulford and other village areas. Building design, height, massing, pedestrian orientation, signage, streetscape, mixed use commercial residential buildings, storefront guidelines.",
  dpa2: "OCP DPA 2 Non-Village Commercial and General Employment. Form and character guidelines for commercial and industrial development outside villages. Screening, landscaping, parking, building design, property line setbacks, visual impact.",
  dpa3: "OCP DPA 3 Shoreline. Shoreline development permits for construction within 10m of natural boundary of sea and 300m seaward. Dock float pier wharf construction, shoreline stabilization revetment bulkhead rockwall riprap, breakwater, dredging, erosion protection, accretion shoreforms, groins jetties, water quality protection, fish habitat, eelgrass kelp shellfish, geotechnical engineer reports.",
  dpa4: "OCP DPA 4 Lakes Streams and Wetlands. Development permits for areas within 10m of natural boundary of lakes streams wetlands. Vegetation removal, fish habitat protection, stormwater management, septic setbacks, environmental assessment.",
  dpa5: "OCP DPA 5 Community Well Capture Zones. Development permits for areas within well capture zones. Drinking water protection, groundwater contamination prevention, hazardous materials storage restrictions, septic systems, impervious surface limits.",
  dpa6: "OCP DPA 6 Unstable Slopes and Soil Erosion Hazards. Development permits for areas with slope instability or erosion risk. Geotechnical assessment requirements, building siting on slopes, drainage, retaining walls, vegetation retention, safe building setbacks from slope crest.",
  dpa7: "OCP DPA 7 Riparian Areas. Development permits for fish-bearing streams lakes wetlands and riparian buffers. SPEA streamside protection, Qualified Environmental Professional QEP assessment, Riparian Areas Regulation RAR, fish habitat protection, vegetation retention, restoration requirements.",
};

// ─── Semantic reranking via Workers AI embeddings ───────────────────
const EMBED_MODEL = "@cf/baai/bge-small-en-v1.5";
const EMBED_BATCH_SIZE = 100;

async function rerankSections(
  query: string,
  candidates: { section: string; score: number; source: "lub" | "ocp" }[],
  env: Env,
): Promise<{ section: string; score: number; source: "lub" | "ocp" }[]> {
  if (!env.AI || candidates.length === 0) return candidates;

  try {
    // Build texts: [query, summary1, summary2, ...]
    const texts = [query, ...candidates.map(c => SECTION_SUMMARIES[c.section] || c.section)];
    const allEmbeddings: number[][] = [];

    for (let i = 0; i < texts.length; i += EMBED_BATCH_SIZE) {
      const batch = texts.slice(i, i + EMBED_BATCH_SIZE);
      const result = await env.AI.run(EMBED_MODEL, { text: batch });
      allEmbeddings.push(...result.data);
    }

    const queryEmbedding = allEmbeddings[0];
    const candidateEmbeddings = allEmbeddings.slice(1);

    // Combine keyword score (normalised) with semantic similarity
    const maxKeyword = Math.max(...candidates.map(c => c.score), 1);
    const reranked = candidates.map((c, i) => {
      const semantic = cosineSimilarity(queryEmbedding, candidateEmbeddings[i]);
      // Blend: 40% keyword, 60% semantic (semantic is the point of this upgrade)
      const blended = 0.4 * (c.score / maxKeyword) + 0.6 * semantic;
      return { ...c, score: blended };
    });

    reranked.sort((a, b) => b.score - a.score);
    console.log(`[rerank] Semantic reranking applied to ${candidates.length} candidates`);
    return reranked;
  } catch (err) {
    console.error("[rerank] Workers AI failed, falling back to keyword order:", err);
    return candidates;
  }
}

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
  // Agricultural zones A1, A2
  if (/\bA[12]\b/.test(q)) sections.add("lub_zones_agricultural");
  // Commercial zones C1-C4, Commercial Accommodation CA1-CA5
  if (/\b(?:C[1-4]|CA[1-5])\b/.test(q)) sections.add("lub_zones_commercial");
  // Community Facilities CF1-CF2, Comprehensive Development CD1-CD3, Forestry F1-F2, General Employment GE1-GE3, Parks PR1-PR6
  if (/\b(?:CF[12]|CD[1-3]|F[12]|GE[1-3]|PR[1-6])\b/.test(q)) sections.add("lub_zones_other");
  // Rural/Upland/Watershed zones
  if (/\b(?:RU[123]|RW[12]|Ri)\b/i.test(q)) sections.add("lub_zones_rural");
  // Shoreline zones S1-S8
  if (/\bS[1-8]\b/.test(q)) sections.add("lub_zones_rural");

  return Array.from(sections);
}

async function detectRelevantSections(query: string, env: Env): Promise<SectionSelection> {
  // LUB 355: Always include ALL 11 sections (~31K tokens total, ~15% of context).
  // This is the enforceable bylaw — every section could be relevant and there's
  // no reason to risk missing applicable regulations.
  const lub = [...LUB_SECTION_KEYS];

  // OCP 434: Use keyword scoring + semantic reranking to pick the top 3 most relevant.
  const q = query.toLowerCase();
  const ocpScored: { section: string; score: number; source: "lub" | "ocp" }[] = [];

  for (const [section, config] of Object.entries(SECTION_KEYWORDS)) {
    if (!OCP_SECTION_KEYS.includes(section)) continue; // only score OCP sections
    let score = 0;
    for (const kw of config.keywords) {
      if (q.includes(kw)) {
        score += kw.length > 10 ? 3 : kw.length > 5 ? 2 : 1;
      }
    }
    if (score > 0) {
      ocpScored.push({ section, score, source: "ocp" });
    }
  }

  // If query asks for a definition, boost any OCP section that matched
  // (OCP sections now contain inline definitions from Bylaw 434)
  const isDefQuery = /\b(?:definition|define|what is a|what does .+ mean)\b/i.test(query);
  if (isDefQuery) {
    for (const entry of ocpScored) entry.score += 3;
  }

  // Sort by keyword score, then semantic rerank via Workers AI embeddings
  ocpScored.sort((a, b) => b.score - a.score);
  const reranked = await rerankSections(query, ocpScored, env);

  // Take top 4 OCP sections (16 OCP sections now, including 7 individual DPAs)
  const ocp = reranked.slice(0, 4).map(s => s.section);

  // If no OCP keywords matched, infer from the query context
  if (ocp.length === 0) {
    const zoneRefs = detectZoneReferences(query);
    if (zoneRefs.some(z => z === "lub_zones_residential")) ocp.push("residential");
    else if (zoneRefs.some(z => z === "lub_zones_agricultural")) ocp.push("agricultural");
    else if (zoneRefs.some(z => z === "lub_zones_commercial")) ocp.push("commercial");
    else ocp.push("goals_environment");
  }

  return { lub, ocp };
}

// ═══════════════════════════════════════════════════════════════════
// System prompt builder
// ═══════════════════════════════════════════════════════════════════

// Static prefix (cacheable) — role + core LUB + task instructions
const SYSTEM_PREFIX = `You are an expert compliance advisor for Salt Spring Island, British Columbia. You analyze queries against:
- Land Use Bylaw No. 355 (LUB 355), consolidated March 2025
- Official Community Plan Bylaw No. 434 (OCP 434)

${LUB_SECTIONS.lub_core}

YOUR TASK: Respond with a compliance analysis in this EXACT JSON format (no text outside JSON):
{"compliance_status":"likely_compliant"|"likely_non_compliant"|"needs_review"|"insufficient_info","summary":"One sentence.","relevant_bylaws":[{"reference":"Bylaw No. 355, Section 9.9.2(a)(i)","title":"Short title","detail":"How it applies"}],"recommendations":["..."],"next_steps":["..."],"warnings":["..."]}

RULES:
1. JSON only. No text outside the JSON object.
2. If no zone specified, assume and note it. Always warn about consulting official sources.
3. CRITICAL: Use full references like "Bylaw No. 355, Section 9.9.2(a)(i)" — never abbreviated. Include Part numbers. List each subsection as a separate entry.
4. Reference OCP with actual policy numbers (e.g. "Bylaw No. 434, B.2.2.2.15(g)"). If a relevant section was not loaded, mention in warnings.`;

const EXCLUSION_SHORT_LABELS: Record<string, string> = {
  lub_definitions: "Definitions", lub_general_regulations: "General Regs",
  lub_siting: "Siting/Setbacks", lub_subdivision: "Subdivision",
  lub_signs: "Signs", lub_zones_residential: "Residential Zones",
  lub_zones_agricultural: "Agricultural Zones", lub_zones_commercial: "Commercial Zones",
  lub_zones_other: "CF/CD/GE/F/PR Zones", lub_zones_rural: "Rural/Shoreline Zones",
  lub_additional: "ALR/DPA/TUP/Variances",
  goals_environment: "Environment/Heritage", residential: "OCP Residential",
  commercial: "OCP Commercial", community: "OCP Community", villages: "OCP Villages",
  agricultural: "OCP Agricultural", parks: "OCP Parks", conservation: "OCP Conservation",
  infrastructure: "OCP Infrastructure",
  dpa1: "DPA 1: Villages", dpa2: "DPA 2: Commercial", dpa3: "DPA 3: Shoreline",
  dpa4: "DPA 4: Lakes/Streams", dpa5: "DPA 5: Wells", dpa6: "DPA 6: Slopes", dpa7: "DPA 7: Riparian",
};

interface SystemBlocks {
  cached: string;   // static prefix (cacheable)
  dynamic: string;  // per-query sections + exclusion note
}

function buildSystemPrompt(selection: SectionSelection): SystemBlocks {
  // Dynamic part: selected LUB + OCP sections + exclusion note
  let dynamic = "";

  for (const section of selection.lub) {
    if (LUB_SECTIONS[section]) {
      dynamic += `\n${LUB_SECTIONS[section]}`;
    }
  }
  for (const section of selection.ocp) {
    if (OCP_SECTIONS[section]) {
      dynamic += `\n${OCP_SECTIONS[section]}`;
    }
  }

  // Compact exclusion notes
  const excludedLub = LUB_SECTION_KEYS.filter(s => !selection.lub.includes(s));
  const excludedOcp = OCP_SECTION_KEYS.filter(s => !selection.ocp.includes(s));
  if (excludedLub.length > 0 || excludedOcp.length > 0) {
    const all = [...excludedLub, ...excludedOcp].map(s => EXCLUSION_SHORT_LABELS[s] || s);
    dynamic += `\n\n[Sections not loaded: ${all.join(", ")}. Mention in warnings if query touches these topics.]`;
  }

  return { cached: SYSTEM_PREFIX, dynamic };
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
    const selection = await detectRelevantSections(body.query, env);
    const { cached, dynamic } = buildSystemPrompt(selection);
    const promptSize = cached.length + dynamic.length;
    console.log(`[query] LUB sections: [${selection.lub.join(", ")}] | OCP sections: [${selection.ocp.join(", ")}] | prompt size: ${promptSize} chars`);

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
            "anthropic-beta": "prompt-caching-2024-07-31",
          },
          body: JSON.stringify({
            model,
            max_tokens: 2048,
            system: [
              { type: "text", text: cached, cache_control: { type: "ephemeral" } },
              { type: "text", text: dynamic },
            ],
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
