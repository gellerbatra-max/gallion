/**
 * Global site configuration.
 *
 * The values live in `data/site.json` so they can be edited through the CMS
 * at /admin. This file only gives them their types — edit the JSON, or use
 * the CMS, rather than changing anything here.
 */

import data from "./data/site.json";

export type Site = {
  name: string;
  legalName: string;
  /** Used for canonical URLs, sitemap and Open Graph. */
  url: string;
  tagline: string;
  description: string;
  founded: number;
  /** Short line used in the footer and in structured data. */
  mission: string;
};

export type NavItem = { label: string; href: string };

export type FooterGroup = { title: string; links: NavItem[] };

export type Office = {
  city: string;
  country: string;
  role: string;
  note: string;
  coords: string;
};

export type Contact = {
  general: string;
  ventures: string;
  press: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  offices: Office[];
  responseTime: string;
};

export type Port = { code: string; name: string; region: string };

export const site = data.site as Site;
export const nav = data.nav as NavItem[];
export const footerNav = data.footerNav as FooterGroup[];
export const contact = data.contact as Contact;
export const social = data.social as NavItem[];

/** Ports referenced by the route diagram on the home and about pages. */
export const ports = data.ports as Port[];
