/**
 * Company journey.
 *
 * PLACEHOLDER DATES — these milestones are illustrative and should be
 * replaced with the real record before launch. Entries marked `planned: true`
 * render with a muted treatment so nothing reads as a completed achievement.
 */

export type Milestone = {
  year: string;
  title: string;
  body: string;
  planned?: boolean;
};

export const milestones: Milestone[] = [
  {
    year: "2023",
    title: "The question",
    body: "A simple observation, returned to often enough to become a plan: the island exports remarkable things and almost never owns the brand that sells them. What would it take to change one link in that chain?",
  },
  {
    year: "2024",
    title: "Gelian is incorporated",
    body: "The platform is registered as a holding company rather than an operating business — deliberately, so that ventures can be founded, funded and separated cleanly as they mature.",
  },
  {
    year: "2025",
    title: "Thesis work",
    body: "Twelve months of category study across trade, hospitality, gemstones and services. Operators met, corridors mapped, and a shortlist of themes narrowed from twenty-odd to six.",
  },
  {
    year: "2026",
    title: "First ventures in development",
    body: "Concept, brand and operating models under construction for the first cohort. The platform's own narrative capability is stood up alongside them.",
  },
  {
    year: "2027",
    title: "First brand to market",
    body: "The first Gelian venture is expected to begin trading under its own name, with the portfolio page opening to the public as it does.",
    planned: true,
  },
  {
    year: "Beyond",
    title: "A portfolio, held",
    body: "A small number of ventures, each capable of standing alone, connected by a shared standard and a shared route between Sri Lanka and the world.",
    planned: true,
  },
];
