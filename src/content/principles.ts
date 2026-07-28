/**
 * The principles that make up the Gelian manifesto.
 *
 * The data lives in `data/principles.json` and is edited through the CMS at
 * /admin. This file only gives it its types.
 */

import data from "./data/principles.json";

export type Principle = {
  number: string;
  title: string;
  claim: string;
  body: string;
};

export const principles = data.principles as Principle[];
