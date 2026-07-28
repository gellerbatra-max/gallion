/**
 * Future ventures.
 *
 * The data lives in `data/ventures.json` and is edited through the CMS at
 * /admin. This file only gives it its types.
 *
 * IMPORTANT
 * Nothing here is an operating business, a completed investment or a
 * performance claim. Each entry is an exploration area with a working name.
 * When a venture launches, change its `status` to "live" and add `href` — the
 * portfolio grid renders the new state automatically. No layout work needed.
 */

import data from "./data/ventures.json";

export type VentureStatus =
  | "exploring"
  | "development"
  | "coming-soon"
  | "live";

export type Venture = {
  slug: string;
  /** Working name — internal, not a registered brand. */
  name: string;
  theme: string;
  themeId: string;
  oneLiner: string;
  description: string;
  status: VentureStatus;
  /** Market focus, written as a route: origin → destination. */
  geography: string;
  /** Approximate year the venture entered its current stage. */
  since: string;
  /** Populated once a venture has a public presence. */
  href?: string;
};

export const ventures = data.ventures as Venture[];

export const statusMeta = data.statusMeta as Record<
  VentureStatus,
  { label: string; description: string }
>;
