/**
 * Company journey.
 *
 * The milestones live in `data/journey.json` and are edited through the CMS
 * at /admin. Entries marked `planned: true` render with a muted treatment so
 * nothing reads as a completed achievement.
 *
 * PLACEHOLDER DATES — the milestones currently in the JSON are illustrative
 * and should be replaced with the real record before launch.
 */

import data from "./data/journey.json";

export type Milestone = {
  year: string;
  title: string;
  body: string;
  planned?: boolean;
};

export const milestones = data.milestones as Milestone[];
