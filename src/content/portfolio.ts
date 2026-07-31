/**
 * Portfolio page copy.
 *
 * The data lives in `data/portfolio.json` and is edited through the CMS at
 * /admin. This file only gives it its types. The portfolio cards themselves
 * come from `directions.ts` (data/directions.json), shared with the home page.
 */

import data from "./data/portfolio.json";
import type { CtaLink, MetaPair } from "./shared";

export type { CtaLink, MetaPair };

export type PortfolioContent = {
  seo: { title: string; description: string };
  header: {
    eyebrow: string;
    title: string;
    lede: string;
    meta: MetaPair[];
  };
  legend: {
    eyebrow: string;
    title: string;
    lede: string;
  };
  closingCta: {
    eyebrow: string;
    title: string;
    body: string;
    primaryCta: CtaLink;
    secondaryCta: CtaLink;
  };
};

export const portfolio = data as PortfolioContent;
