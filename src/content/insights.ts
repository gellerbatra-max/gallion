/**
 * Insights — the Gelian journal.
 *
 * Articles live in `data/insights.json` and are edited through the CMS at
 * /admin. Editorial content is authored as structured blocks rather than MDX
 * so the whole site stays dependency-free and statically rendered. Adding an
 * entry is enough — the index, the home preview and the article route all
 * pick it up automatically.
 */

import data from "./data/insights.json";

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string }
  | { type: "list"; items: string[] };

export type Insight = {
  slug: string;
  title: string;
  deck: string;
  category: "Founder Note" | "Market Observation" | "Field Note" | "Essay";
  /** ISO date — used for sorting and <time> elements. */
  date: string;
  readingTime: string;
  author: string;
  featured?: boolean;
  body: Block[];
};

export const insights = data.insights as unknown as Insight[];

export const sortedInsights = [...insights].sort((a, b) =>
  b.date.localeCompare(a.date),
);

export function getInsight(slug: string) {
  return insights.find((entry) => entry.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
