/**
 * Small shared shapes used across more than one page's content — kept here
 * so page content modules (home.ts, about.ts, philosophy.ts, contact.ts)
 * don't import types from one another.
 */

export type CtaLink = { label: string; href: string };
export type MetaPair = { label: string; value: string };
export type Card = { tier: string; name: string; body: string };
