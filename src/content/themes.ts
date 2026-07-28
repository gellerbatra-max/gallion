/**
 * Selected themes — the categories Gelian is actively studying.
 * These are areas of interest, not committed investments.
 */

export type Theme = {
  id: string;
  index: string;
  title: string;
  summary: string;
  detail: string;
  markers: string[];
};

export const themes: Theme[] = [
  {
    id: "trade",
    index: "01",
    title: "Trade & Commerce",
    summary:
      "Products that already leave the island, sold badly. We are interested in the margin that gets left at the port.",
    detail:
      "Sri Lanka exports extraordinary raw material and imports the brand that sells it back. We study categories where the value added offshore is larger than the value added at home — and where ownership of the last mile is still available.",
    markers: ["Export brands", "Category ownership", "Logistics leverage"],
  },
  {
    id: "travel",
    index: "02",
    title: "Travel & Hospitality",
    summary:
      "Not more rooms. Better reasons to come, and a standard that survives the second visit.",
    detail:
      "The island is over-supplied with beds and under-supplied with point of view. We look for hospitality concepts with a defensible sense of place — small footprints, high craft, and an operating discipline that travels.",
    markers: ["Boutique formats", "Experience design", "Operating standards"],
  },
  {
    id: "gems",
    index: "03",
    title: "Gemstones & Jewellery",
    summary:
      "Provenance is the product. A stone with a verified story is a different asset to a stone without one.",
    detail:
      "Ceylon sapphire carries one of the strongest origin signals in the world and captures a fraction of its retail value. We are interested in the chain between Ratnapura and the vitrine — traceability, certification, design, and direct relationships with end buyers.",
    markers: ["Traceability", "Design & craft", "Direct-to-collector"],
  },
  {
    id: "media",
    index: "04",
    title: "Content & Media",
    summary:
      "Story is the second cargo. Nothing crosses a border alone.",
    detail:
      "Every venture we build will need to be explained to someone who has never been here. We treat narrative capability — film, editorial, photography, publishing — as infrastructure rather than marketing spend.",
    markers: ["Brand narrative", "Film & editorial", "Owned audience"],
  },
  {
    id: "digital",
    index: "05",
    title: "Digital Services",
    summary:
      "Serious technical talent, priced for a market that no longer exists.",
    detail:
      "Sri Lanka has depth in engineering, design and finance operations that is still sold as generic outsourcing. We are studying specialist service businesses — narrow, senior, and sold on outcome rather than headcount.",
    markers: ["Specialist services", "Senior teams", "Outcome pricing"],
  },
  {
    id: "bridge",
    index: "06",
    title: "Cross-Border Market Access",
    summary:
      "The traffic runs both ways. Getting in is as hard as getting out.",
    detail:
      "Foreign operators struggle to enter Sri Lanka with the right partners, and Sri Lankan operators struggle to land credibly abroad. We are exploring structures that carry both — joint ventures, distribution, licensing, and market entry.",
    markers: ["Market entry", "Distribution", "Joint ventures"],
  },
];
