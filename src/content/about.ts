/**
 * About page copy.
 *
 * The data lives in `data/about.json` and is edited through the CMS at
 * /admin. This file only gives it its types.
 */

import data from "./data/about.json";
import type { CtaLink, Card, MetaPair } from "./shared";

export type { CtaLink, Card, MetaPair };

export type Milestone = {
  year: string;
  title: string;
  body: string;
  planned?: boolean;
};

export type AboutContent = {
  seo: { title: string; description: string };
  header: {
    eyebrow: string;
    title: string;
    lede: string;
    meta: MetaPair[];
  };
  identity: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  distinction: {
    eyebrow: string;
    title: string;
    lede: string;
    cards: Card[];
    closingNote: string;
  };
  originStory: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  longView: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
  };
  milestones: Milestone[];
  journey: {
    eyebrow: string;
    title: string;
    lede: string;
  };
  directionsPreview: {
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

export const about = data as AboutContent;
