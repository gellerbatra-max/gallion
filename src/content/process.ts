/**
 * How a venture moves from an observation to a business. Used on /ventures.
 *
 * The data lives in `data/process.json` and is edited through the CMS at
 * /admin. This file only gives it its types.
 */

import data from "./data/process.json";

export type Stage = {
  step: string;
  title: string;
  duration: string;
  summary: string;
  detail: string[];
};

export type Criterion = { title: string; body: string };

export type Faq = { q: string; a: string };

export const stages = data.stages as Stage[];
export const evaluation = data.evaluation as Criterion[];
export const faqs = data.faqs as Faq[];
