/**
 * Global site configuration.
 *
 * NOTE ON PLACEHOLDERS
 * Contact details, the domain, phone numbers and office locations below are
 * tasteful placeholders chosen so the site reads as complete. Replace every
 * value in `contact`, `social` and `siteUrl` with real details before launch.
 */

export const site = {
  name: "Gelian",
  legalName: "Gelian (Private) Limited",
  /** Used for canonical URLs, sitemap and Open Graph. Replace at launch. */
  url: "https://www.gelian.lk",
  tagline: "A venture platform between Sri Lanka and the world.",
  description:
    "Gelian is a venture platform that discovers distinctive Sri Lankan opportunities and carries them to global markets — and brings global standards, capital and craft back home.",
  founded: 2024,
  /** Short line used in the footer and in structured data. */
  mission:
    "Building and backing ventures that carry Sri Lanka outward and bring the world in.",
} as const;

export const nav = [
  { label: "About", href: "/about" },
  { label: "Philosophy", href: "/philosophy" },
  { label: "Ventures", href: "/ventures" },
  { label: "Future Ventures", href: "/portfolio" },
  { label: "Insights", href: "/insights" },
] as const;

export const footerNav = [
  {
    title: "Platform",
    links: [
      { label: "About Gelian", href: "/about" },
      { label: "Philosophy", href: "/philosophy" },
      { label: "How We Build Ventures", href: "/ventures" },
      { label: "Future Ventures", href: "/portfolio" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Insights", href: "/insights" },
      { label: "Contact", href: "/contact" },
      { label: "Partnerships", href: "/contact#collaboration" },
      { label: "Frequently Asked", href: "/ventures#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Use", href: "/terms" },
      { label: "Disclosures", href: "/terms#disclosures" },
    ],
  },
] as const;

export const contact = {
  general: "hello@gelian.lk",
  ventures: "ventures@gelian.lk",
  press: "press@gelian.lk",
  /** Placeholder number — replace before launch. */
  phone: "+94 76 000 0000",
  phoneHref: "tel:+94760000000",
  whatsapp: "https://wa.me/94760000000",
  offices: [
    {
      city: "Colombo",
      country: "Sri Lanka",
      role: "Registered office",
      note: "Colombo 03, Western Province",
      coords: "6.9271° N, 79.8612° E",
    },
    {
      city: "London",
      country: "United Kingdom",
      role: "Correspondence",
      note: "Market development, Europe",
      coords: "51.5072° N, 0.1276° W",
    },
  ],
  responseTime: "We reply to every serious enquiry within three working days.",
} as const;

export const social = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/gelian" },
  { label: "Instagram", href: "https://www.instagram.com/gelian" },
  { label: "X", href: "https://x.com/gelian" },
] as const;

/** Ports referenced by the route diagram on the home and about pages. */
export const ports = [
  { code: "CMB", name: "Colombo", region: "Sri Lanka" },
  { code: "DXB", name: "Dubai", region: "Middle East" },
  { code: "SIN", name: "Singapore", region: "Southeast Asia" },
  { code: "LHR", name: "London", region: "Europe" },
  { code: "JFK", name: "New York", region: "North America" },
  { code: "SYD", name: "Sydney", region: "Oceania" },
] as const;
