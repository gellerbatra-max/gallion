/**
 * Home page copy.
 *
 * The data lives in `data/home.json` and is edited through the CMS at
 * /admin. This file only gives it its types.
 */

import data from "./data/home.json";
import type { CtaLink } from "./shared";

export type { CtaLink };
export type Stat = { value: string; label: string };

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
  exchange: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    paragraphs: string[];
    corridorsLabel: string;
    corridorsNote: string;
  };
  directionsPreview: {
    eyebrow: string;
    title: string;
    lede: string;
    cta: CtaLink;
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
