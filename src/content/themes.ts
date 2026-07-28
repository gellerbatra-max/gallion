/**
 * Selected themes — the categories Gelian is actively studying.
 * These are areas of interest, not committed investments.
 *
 * The data lives in `data/themes.json` and is edited through the CMS at
 * /admin. This file only gives it its types.
 */

import data from "./data/themes.json";

export type Theme = {
  id: string;
  index: string;
  title: string;
  summary: string;
  detail: string;
  markers: string[];
};

export const themes = data.themes as Theme[];
