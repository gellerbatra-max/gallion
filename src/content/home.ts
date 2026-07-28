/**
 * Home page copy.
 *
 * The data lives in `data/home.json` and is edited through the CMS at
 * /admin. This file only gives it its types.
 */

import data from "./data/home.json";
import type { CtaLink, Card } from "./shared";

export type { CtaLink, Card };
export type Stat = { value: string; label: string };
export type Step = { label: string; title: string; body: string };

export type HomeContent = {
  seo: { title: string; description: string };
  hero: {
    kicker: string;
    headline: string;
    headlineAccent: string;
    subheadline: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
    stats: Stat[];
  };
  whatWeAre: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
  vessel: {
    eyebrow: string;
    title: string;
    lede: string;
    cards: Card[];
  };
  exchange: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    paragraphs: string[];
    corridorsLabel: string;
    corridorsNote: string;
  };
  process: {
    eyebrow: string;
    title: string;
    lede: string;
    steps: Step[];
  };
  directionsPreview: {
    eyebrow: string;
    title: string;
    lede: string;
    cta: CtaLink;
  };
  vision: {
    eyebrow: string;
    quote: string;
    body: string;
    attributionName: string;
    attributionRole: string;
  };
  closingCta: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
};

export const home = data as HomeContent;
