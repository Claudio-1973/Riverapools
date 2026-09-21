export type BlogTopic = {
  id: string;
  number: string;
  kicker: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  facts: string[];
  takeaway: string;
  tags: string[];
};

export const blogTopics: BlogTopic[] = [
  {
    id: "hard-water", number: "01", kicker: "Water chemistry",
    title: "High calcium hardness: why local tile scales",
    seoTitle: "High Calcium Hardness in Pools | Rivera Pool Care",
    description: "Learn why Riverside County pools develop calcium scale and how balanced pH, alkalinity, and LSI help protect tile, finishes, and equipment.",
    intro: "Riverside County heat turns hard fill water into a mineral trap. As water evaporates in Murrieta and Temecula, calcium stays behind and concentrates on tile, spillways, and equipment.",
    tags: ["calcium", "scale", "LSI"],
    facts: ["Local hose bibs often test at 250–450+ ppm calcium before the water even enters the pool.", "When pH rises above 7.6 and water heats up, a positive LSI lets calcium carbonate precipitate onto the easiest surfaces.", "Keeping pH around 7.3–7.5 and total alkalinity balanced helps manage scaling tendencies.", "Scale management is an ongoing chemistry task, not a one-time scrub. Routine balancing prevents buildup."],
    takeaway: "Scale is a water-profile problem, not just a dirty tile problem. We balance the water to protect your finish and equipment.",
  },
  {
    id: "salt-cell", number: "02", kicker: "Equipment care",
    title: "Salt cell maintenance: the real cost of neglect",
    seoTitle: "Salt Cell Maintenance for Hard Water Pools | Rivera",
    description: "Protect a saltwater pool chlorinator from calcium scale with proper inspection and cleaning practices for hard-water pools in Riverside County.",
    intro: "A salt pool still needs inspection. In hard water, heat and high pH inside the electrolytic cell can plate calcium directly onto the plates and ruin a reliable chlorinator.",
    tags: ["salt systems", "chlorinator", "maintenance"],
    facts: ["Salt cells operate at a high local pH internally, accelerating scale bridges during peak summer use.", "Scale restricts flow, creates false low-salt readings, and makes the control board work harder while chlorine production falls.", "Gentle flushing and targeted acid baths (only when necessary) remove scale without damaging the delicate plate coating.", "Never scrape between plates with metal tools; damage to the ruthenium coating is permanent and ruins the cell."],
    takeaway: "Quarterly cell inspection preserves a five-to-seven-year operating life. A blinking inspect-cell warning is a call to action, not a light to ignore.",
  },
  {
    id: "storm", number: "03", kicker: "Weather response",
    title: "Santa Ana winds: the 48-hour recovery plan",
    seoTitle: "Pool Cleanup After Santa Ana Winds | Rivera Pool Care",
    description: "Follow a practical 48-hour pool recovery plan after Santa Ana winds, including debris removal, chlorine reset, brushing, and filter cleaning.",
    intro: "A wind event in Southwest Riverside County brings more than leaves. Silt carries phosphates, pollen, and organic load that can consume a pool's free chlorine within hours.",
    tags: ["Santa Ana", "silt", "storm recovery"],
    facts: ["Hours 1–6: Clear skimmer and pump baskets, ensure water levels are safe, and check the baseline filter pressure.", "Hours 6–24: Shock to restore chlorine levels, brush walls and floor, and let the filter run continuously.", "Hours 24–48: Wash cartridges or backwash to remove the fine silt that ordinary running will not clear.", "Do not let a pump run dry on clogged baskets, or stack acidic tablets to solve a massive organic storm load."],
    takeaway: "The first few hours protect the equipment pad. Debris removal, chemical reset, and filter cleaning must work together.",
  },
  {
    id: "phosphates", number: "04", kicker: "Sanitizer demand",
    title: "Why chlorine disappears overnight: the phosphate factor",
    seoTitle: "High Phosphates and Pool Chlorine Loss | Rivera",
    description: "Learn how phosphates feed algae and increase chlorine demand, when specialized testing helps, and why filter cleaning completes treatment.",
    intro: "When chlorine drops to zero even though the pool looks clear, invisible phosphate load may be feeding microscopic algae faster than your sanitizer can keep up.",
    tags: ["phosphates", "chlorine demand", "algae prevention"],
    facts: ["Fertilizer drift, windblown soil, and landscape runoff introduce phosphate nutrients into the pool water.", "At high levels, algae reproduce continuously. Basic test strips do not measure phosphate; a specialized test is required.", "Professional phosphate removers bind the nutrient into a precipitate that the filter captures (causing temporary cloudiness).", "A complete filter cleaning is needed a few days after treatment to clear the heavily loaded filter media."],
    takeaway: "Repeatedly adding chlorine treats the symptom. We test phosphate when the water repeatedly loses sanitizer to address the root cause.",
  },
  {
    id: "filters", number: "05", kicker: "Filtration",
    title: "Cartridge, D.E., or sand: what a clean filter protects",
    seoTitle: "Pool Filter Maintenance Guide | Rivera Pool Care",
    description: "Compare cartridge, D.E., and sand pool filter maintenance and learn how pressure readings help protect pumps, manifolds, and water clarity.",
    intro: "The filter catches what chemistry cannot: dust, dead algae, body oils, and silt. A neglected filter raises backpressure, overheats pumps, and sends debris back into the pool.",
    tags: ["cartridge", "D.E.", "sand filters"],
    facts: ["Cartridge systems filter roughly 10–15 microns and need full disassembly, degreasing, and pleat-by-pleat washing several times a year.", "D.E. systems require regular backwashing, fresh D.E. powder, and an annual grid inspection for tears.", "Sand filters need routine backwashing and media replacement every few years to prevent channeling.", "The pressure gauge is the trigger: 8–10 PSI above the clean baseline means flow is restricted and a teardown is due."],
    takeaway: "The pressure gauge is an early warning system. Objective monitoring prevents pump motor burnout and crushed internal manifolds.",
  },
  {
    id: "service", number: "06", kicker: "Service standards",
    title: "The true cost of splash-and-dash pool service",
    seoTitle: "What Quality Weekly Pool Service Includes | Rivera",
    description: "See what complete weekly pool service should test and inspect, from chemistry and filter pressure to pumps, salt cells, and circulation.",
    intro: "A four-minute basket empty and a few tabs is not a maintenance program. Water chemistry and the equipment pad need a qualified eye every single week.",
    tags: ["routine care", "water testing", "reliability"],
    facts: ["Dropping acidic trichlor tablets directly into a skimmer can send a concentrated acid slug through seals and heater components when the pump restarts.", "Overusing tablets continuously adds cyanuric acid, which eventually makes chlorine far less active.", "A complete visit tests pH, total alkalinity, calcium, CYA, and inspects the salt cell, filter pressure, and pump operation.", "Dependable care means catching small leaks or circulation issues before they become expensive breakdowns."],
    takeaway: "Ask what gets tested, what gets recorded, and how equipment is inspected. The cheapest visit can quickly become the most expensive repair.",
  },
  {
    id: "black-algae", number: "07", kicker: "Algae remediation",
    title: "Black algae: why normal shock does not kill it",
    seoTitle: "How to Treat Black Algae in a Pool | Rivera",
    description: "Understand why black algae resists normal pool shock and how repeated brushing and targeted chlorine treatment help prevent its return.",
    intro: "Black or dark-teal spots that resist brushing are often cyanobacteria rooted into the pool surface. Its protective waxy layer blocks ordinary chlorine.",
    tags: ["black algae", "remediation", "brushing"],
    facts: ["Physical disruption with a sturdy stainless-steel or hybrid brush is the crucial first step to break the organism's shield.", "After opening the protective sheath, targeted high-chlorine treatments and localized brushing must follow.", "Brushing twice daily for a week, along with elevated free chlorine and compatible algaecides, is often required.", "Skipping days allows the algae to rebuild its protective coating and resist the chemicals all over again."],
    takeaway: "A clear pool is not proof the organism is gone. We treat the root system aggressively and consistently to prevent seasonal returns.",
  },
  {
    id: "pump", number: "08", kicker: "Energy & circulation",
    title: "Variable-speed pump schedules for triple-digit summers",
    seoTitle: "Variable-Speed Pool Pump Schedules | Rivera",
    description: "Learn how to schedule a variable-speed pool pump for hot Riverside County summers while supporting filtration, skimming, and connected equipment.",
    intro: "Local pools need circulation through 90-degree water, but peak utility hours are expensive. A variable-speed schedule keeps turnover moving while avoiding full-speed operation all day.",
    tags: ["variable speed", "RPM", "energy efficiency"],
    facts: ["The pump affinity law means cutting speed in half drops power consumption drastically, while still moving significant water.", "A practical schedule runs at moderate speeds during peak skimming hours, and lower speeds overnight for constant filtration.", "Confirm minimum flow for all components: salt cells, heaters, and water features each have specific GPM requirements.", "The correct RPM depends on pipe diameter, filter pressure, and plumbing friction, not just guessing a speed."],
    takeaway: "Efficiency is a system result. We coordinate your pump schedule with the filter, heater, salt cell, and automation.",
  },
  {
    id: "green-pool", number: "09", kicker: "Restorative cleaning",
    title: "Green-pool recovery: clearing a neglected pool safely",
    seoTitle: "Safe Green Pool Recovery and Cleanup | Rivera",
    description: "Learn the steps for safe green-pool recovery: debris removal, brushing, shock treatment, frequent filter cleaning, and water rebalancing.",
    intro: "When a pool turns green, dumping gallons of chlorine into the water isn't enough. A structured recovery plan clears the water without damaging the equipment.",
    tags: ["green pool", "shock", "recovery"],
    facts: ["Removing organic debris like leaves and branches first is critical; chlorine cannot overcome a pile of decomposing leaves on the floor.", "Heavy brushing breaks up algae colonies on walls and steps, exposing them to the shock treatment.", "The filter will load quickly and require frequent cleaning or backwashing during the first few days of recovery.", "Re-balancing pH and alkalinity ensures the high levels of chlorine remain effective against the aggressive algae bloom."],
    takeaway: "Green pool recovery is an intensive process of filtration, chemistry, and labor. We use a systematic approach to bring clarity back safely.",
  },
  {
    id: "cya", number: "10", kicker: "Water reset",
    title: "Cyanuric acid lock: the silent cause of cloudy water",
    seoTitle: "High Cyanuric Acid in Pool Water | Rivera",
    description: "Learn how high cyanuric acid weakens chlorine, why stabilized tablets raise CYA, and when partial water dilution is the practical solution.",
    intro: "Stabilizer (CYA) protects chlorine from UV rays, but it does not evaporate. Repeated tablet use can push CYA so high that chlorine stops working effectively.",
    tags: ["CYA", "cloudy water", "stabilizer"],
    facts: ["A useful operating window is 30–50 ppm CYA for traditional pools and 60–80 ppm for many saltwater pools.", "At 100+ ppm, the required free chlorine rises sharply. High CYA makes it nearly impossible to maintain a sanitary pool without massive chlorine additions.", "There is no dependable chemical additive that removes high CYA; safe, partial dilution with fresh water is the standard solution.", "Consistent monitoring of CYA levels dictates when to switch from stabilized tablets to liquid chlorine."],
    takeaway: "If high chlorine still leaves the water cloudy, stop adding shock blindly. We test CYA accurately and choose a safe strategy.",
  },
];

export function getBlogTopic(id: string) {
  return blogTopics.find((topic) => topic.id === id);
}