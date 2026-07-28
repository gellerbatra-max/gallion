/**
 * Philosophy page copy.
 *
 * The data lives in `data/philosophy.json` and is edited through the CMS at
 * /admin. This file only gives it its types.
 */

import data from "./data/philosophy.json";
import type { CtaLink, MetaPair } from "./shared";

export type Principle = {
  number: string;
  title: string;
  claim: string;
  body: string;
};

export type Boundary = { title: string; body: string };

export type PhilosophyContent = {
  seo: { title: string; description: string };
  header: {
    eyebrow: string;
    title: string;
    lede: string;
    meta: MetaPair[];
  };
  opening: {
    title: string;
    paragraphs: string[];
    pullQuote: string;
  };
  manifesto: {
    eyebrow: string;
    title: string;
    lede: string;
    principles: Principle[];
  };
  boundaries: {
    eyebrow: string;
    title: string;
    lede: string;
    items: Boundary[];
  };
  closing: {
    eyebrow: string;
    statement: string;
  };
  closingCta: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
};

export const philosophy = data as PhilosophyContent;
