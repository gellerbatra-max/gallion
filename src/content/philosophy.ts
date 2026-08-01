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

/** A simple eyebrow + heading + prose block, shared by several sections. */
export type EssayBlock = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
};

export type PhilosophyContent = {
  seo: { title: string; description: string };
  header: {
    eyebrow: string;
    title: string;
    lede: string[];
    meta: MetaPair[];
  };
  strategy: EssayBlock;
  process: EssayBlock;
  manifesto: {
    eyebrow: string;
    title: string;
    lede: string[];
    principles: Principle[];
  };
  style: EssayBlock;
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
