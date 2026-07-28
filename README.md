# Gelian

Marketing site for **Gelian** — a privately held venture platform positioned between
Sri Lanka and global markets. Built as a holding-company / venture-firm website that can
grow into a real portfolio as ventures launch.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · zero runtime dependencies.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
```

Node 20+ required. The build fetches Cormorant Garamond and Inter through `next/font`,
so the first build needs network access; after that the fonts are self-hosted in the
bundle and no external requests are made at runtime.

---

## Structure

```
src/
├── app/
│   ├── layout.tsx                 fonts, metadata, header/footer, org schema
│   ├── page.tsx                   home
│   ├── about/  philosophy/  ventures/  portfolio/  contact/
│   ├── insights/                  journal index
│   │   └── [slug]/                statically generated articles
│   ├── privacy/  terms/           legal
│   ├── api/contact/  api/subscribe/   form endpoints (see "Before launch")
│   ├── not-found.tsx  sitemap.ts  robots.ts
│   ├── icon.tsx  opengraph-image.tsx  generated at build time
│   └── globals.css                the design system
│
├── components/
│   ├── layout/       Header (sticky, mobile panel), Footer, Wordmark
│   ├── sections/     Hero, PageHeader, CTABlock
│   ├── cards/        VentureCard, InsightCard, ThemeCard
│   ├── ui/           Button, Badge, Container, Section, SectionHeading,
│   │                 Reveal, Prose
│   ├── visuals/      Meridians, CompassRose, RouteDiagram, Atmosphere
│   ├── ContactForm.tsx  NewsletterForm.tsx  Timeline.tsx  FAQ.tsx
│
├── content/          all copy and data — the only files you need to edit
│   ├── site.ts       nav, contact details, offices, socials, ports
│   ├── themes.ts     the six areas of interest
│   ├── ventures.ts   future ventures + status definitions
│   ├── principles.ts the eight-principle manifesto
│   ├── process.ts    venture stages, evaluation criteria, FAQ
│   ├── journey.ts    timeline milestones
│   ├── team.ts       leadership
│   └── insights.ts   journal articles (structured blocks, not MDX)
│
└── lib/              cn(), pageMeta()
```

**Content is fully separated from presentation.** Every page reads from `src/content/*`.
Adding a venture, an insight or a milestone is a data edit — no layout work.

---

## Design system

Defined once in `src/app/globals.css` as Tailwind v4 theme tokens.

| Token | Value | Use |
| --- | --- | --- |
| `abyss` | `#04121A` | page base |
| `deep` / `hull` | `#07202C` / `#0B2A38` | raised surfaces, cards |
| `tide` / `shoal` | `#14394A` / `#1D4A5E` | hairlines, borders |
| `brass` | `#C8A24A` | primary accent, CTAs — 7.9:1 on abyss |
| `brass-soft` / `brass-deep` | `#E0C489` / `#8F6F2A` | hover, gradients, error states |
| `ivory` / `sand` | `#F6F2E9` / `#DCD2BE` | headings, emphasis |
| `mist` | `#9FB3BE` | body copy — 8.7:1 on abyss |

Type: **Cormorant Garamond** (display, 300–600) over **Inter** (text). Utilities
`label`, `measure`, `text-gilt`, `glass`, `link-draw`, `grain-layer` cover the recurring
treatments.

**Motion.** All visuals are inline SVG or CSS gradients — no images, no animation library.
`Reveal` fades content in on scroll via `IntersectionObserver`, writing straight to the DOM
so nothing re-renders. It only hides content *after* mounting (`js-reveal` on `<html>`), so
with JavaScript disabled the whole site renders at full opacity. Everything collapses to
zero duration under `prefers-reduced-motion`.

**Accessibility.** Semantic landmarks throughout, skip link, visible brass focus ring on
every interactive element, `aria-current` on active nav, Escape + focus trap + scroll lock
on the mobile panel, native `<details>` for the FAQ, and a contact form with an error
summary, per-field `aria-invalid` / `aria-describedby` and live status regions.

---

## Adding content

**A venture** — append to `src/content/ventures.ts`. Set `status` to `exploring`,
`development`, `coming-soon` or `live`; add `href` once it has a site of its own. The card
turns into a link and the counts on `/portfolio` update automatically.

**An insight** — append to `src/content/insights.ts` with a `body` of typed blocks
(`p`, `h2`, `quote`, `list`). The index, the home preview, the article route, the
prev/next navigation and the sitemap all pick it up.

**A nav item** — `nav` in `src/content/site.ts` drives desktop and mobile navigation.

---

## Assumptions made

These were decided in the absence of a brief and are all easy to change.

1. **Stack.** Next.js App Router + TypeScript + Tailwind v4, no UI or animation
   libraries. Everything is statically rendered — 21 static routes, 2 API routes.
2. **All content is written copy, not final fact.** Names, dates, quotes and figures are
   drafted to make the site feel launch-ready. The items below need replacing.
3. **No performance or investment claims** anywhere. Ventures are labelled by stage,
   corridors are labelled "illustrative", and the footer plus `/terms#disclosures` carry
   explicit no-offer / no-advice language.
4. **A galleon metaphor held at the level of navigation and cartography** — meridians,
   rhumb lines, compass roses, sea-lane diagrams. No ships, ropes, anchors or wheels.
5. **Extra pages beyond the brief:** individual insight articles (`/insights/[slug]`) so
   the journal is not a set of dead links, and a 404 page.
6. **British English** throughout.

## Placeholders to replace before launch

| What | Where |
| --- | --- |
| Domain `gelian.lk`, all email addresses, phone / WhatsApp number | `src/content/site.ts` |
| Office locations and coordinates | `src/content/site.ts` |
| **Leadership names and biographies — invented, do not publish as real people** | `src/content/team.ts` |
| Timeline milestones and dates | `src/content/journey.ts` |
| Founder quote and attribution on the home page | `src/app/page.tsx` |
| Venture working names and stages | `src/content/ventures.ts` |
| Social profile URLs | `src/content/site.ts` |
| Legal copy — **template text, not legal advice; have counsel review it** | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |

## Before launch

- **Wire up the forms.** `src/app/api/contact/route.ts` and `api/subscribe/route.ts`
  validate their payloads and log to the server console — they do not send mail or store
  anything. Connect a transport (Resend, Postmark, SES) and a list provider, and add rate
  limiting before exposing the site publicly.
- **Set the canonical URL.** `site.url` feeds metadata, Open Graph, `sitemap.xml` and
  `robots.txt`.
- **Have a lawyer review** the privacy policy and terms against your actual data
  practices and jurisdiction.
- Add double opt-in for the dispatch, as the privacy policy describes.
