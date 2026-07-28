/**
 * Contact page copy.
 *
 * The data lives in `data/contact.json` and is edited through the CMS at
 * /admin. This file only gives it its types.
 */

import data from "./data/contact.json";
import type { MetaPair } from "./shared";

export type CollaborationItem = { title: string; body: string };

export type ContactContent = {
  seo: { title: string; description: string };
  header: {
    eyebrow: string;
    title: string;
    lede: string;
    meta: MetaPair[];
  };
  form: {
    eyebrow: string;
    title: string;
    body: string;
    topics: string[];
  };
  details: {
    directLabel: string;
    generalNote: string;
    partnershipsNote: string;
    pressNote: string;
    phoneLabel: string;
    officeHoursNote: string;
    whatsappNote: string;
    whatsappLabel: string;
    locationLabel: string;
    locationNote: string;
  };
  collaboration: {
    eyebrow: string;
    title: string;
    lede: string;
    items: CollaborationItem[];
    declineNote: string;
  };
};

export const contactContent = data as ContactContent;
