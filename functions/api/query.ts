interface Env {
  CLAUDE_API_KEY: string;
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

goals_environment: `
OCP 434 — PART A: ISLAND-WIDE GOALS (Environment, Climate, Hazards, Heritage)

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
OCP 434 — B.2: RESIDENTIAL LAND USE OBJECTIVES AND POLICIES

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
OCP 434 — B.3: NON-VILLAGE COMMERCIAL, TOURISM & GENERAL EMPLOYMENT

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
OCP 434 — B.4: COMMUNITY & INSTITUTIONAL LAND USES

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
OCP 434 — B.5: VILLAGE LAND USE POLICIES

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
OCP 434 — B.6: AGRICULTURAL LAND USE POLICIES

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
OCP 434 — B.7: PARKS AND RECREATION LAND USE

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
OCP 434 — B.8-B.9: CONSERVATION & SHORELINE POLICIES

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
OCP 434 — PART C: INFRASTRUCTURE & SERVICING

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
OCP 434 — PART E: DEVELOPMENT PERMIT AREAS (DPAs 1–7)

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

  // If we got LUB matches but no OCP, infer a relevant OCP default
  if (ocp.length === 0) {
    if (lub.includes("lub_zones_residential")) ocp.push("residential");
    else if (lub.includes("lub_zones_agricultural")) ocp.push("agricultural");
    else if (lub.includes("lub_zones_commercial")) ocp.push("commercial");
    ocp.push("dpa"); // DPA is lightweight and broadly relevant
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
  infrastructure: "OCP Infrastructure", dpa: "OCP DPAs",
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
    const selection = detectRelevantSections(body.query);
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
