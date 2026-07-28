/**
 * Leadership.
 *
 * The people live in `data/team.json` and are edited through the CMS at
 * /admin. This file only gives them their types.
 *
 * PLACEHOLDER PEOPLE — the names, titles and biographies currently in the
 * JSON are invented so the page reads as complete. Replace them before the
 * site goes live. Do not publish these as real individuals.
 */

import data from "./data/team.json";

export type Person = {
  name: string;
  role: string;
  initials: string;
  bio: string;
  focus: string;
};

export const team = data.team as Person[];
