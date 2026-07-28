# Gelian

Marketing site for **Gelian** — a privately held investment vehicle positioned between
Sri Lanka and global markets. Gelian identifies distinctive Sri Lankan value, shapes it
into disciplined businesses, and carries it to global markets — while bringing capital,
standards and opportunity back in return.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · zero runtime dependencies.

---

## Running it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run start      # serve the production build
npm run lint
npm run edit       # local content editor — http://localhost:4000
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
│   ├── about/  philosophy/  contact/
│   ├── privacy/  terms/           legal — footer-only, not in the top nav
│   ├── api/contact/                form endpoint (see "Before launch")
│   ├── not-found.tsx  sitemap.ts  robots.ts
│   ├── icon.tsx  opengraph-image.tsx  generated at build time
│   └── globals.css                the design system
│
├── components/
│   ├── layout/       Header (sticky, mobile panel), Footer, Wordmark
│   ├── sections/     Hero, PageHeader, CTABlock
│   ├── cards/        DirectionCard — the one card shape every "future
│   │                 direction" preview uses, on both Home and About
│   ├── ui/           Button, Badge, Container, Section, SectionHeading,
│   │                 Reveal, Prose
│   ├── visuals/      Meridians, CompassRose, RouteDiagram, Atmosphere
│   ├── ContactForm.tsx  Timeline.tsx  ManifestoBlock.tsx
│
├── content/          typed wrappers; the copy itself lives in content/data/*.json
│   ├── site.ts        nav, contact details, offices, socials, ports
│   ├── home.ts         every section of the home page
│   ├── about.ts        every section of the About page
│   ├── philosophy.ts   the eight principles + manifesto
│   ├── contact.ts      form copy, details labels, collaboration types
│   ├── directions.ts   the six "future direction" cards (shared Home + About)
│   ├── shared.ts        small types used by more than one page (CtaLink, etc.)
│   └── data/            the JSON the CMS and the local editor actually edit
│
└── lib/              cn(), pageMeta()
```

**Content is fully separated from presentation.** Every page reads from `src/content/*`,
one content module per page plus `site.ts` for site-wide things and `directions.ts` for
the one section that's shared between two pages.

---

## Site structure

Four top-level pages only, by design: **Home, About, Philosophy, Contact.** Privacy and
Terms exist but live in the footer, not the main nav. There is no separate ventures,
portfolio or insights section — the "future directions" preview (six category cards) is
embedded on the Home and About pages instead of being its own tab, and both pull from the
same `directions.json` so there is exactly one place to edit it.

`/ventures`, `/portfolio` and `/insights` — the previous site's routes — 307-redirect to
the pages that absorbed their content (see `next.config.ts`).

---

## Design system

Defined once in `src/app/globals.css` as Tailwind v4 theme tokens.

| Token | Value | Use |
| --- | --- | --- |
| `abyss` | `#04121A` | page base |
| `deep` / `hull` | `#07202C` / `#0B2A38` | raised surfaces, cards |
| `tide` / `shoal` | `#14394A` / `#1D4A5E` | hairlines, borders |
| `brass` | `#C8A24A` | primary accent, CTAs, all interaction states — 7.9:1 on abyss |
| `brass-soft` / `brass-deep` | `#E0C489` / `#8F6F2A` | hover, gradients, error states |
| `verdigris` / `verdigris-soft` | `#3C7767` / `#5F9686` | one status tone only — never interaction |
| `ivory` / `sand` | `#F6F2E9` / `#DCD2BE` | headings, emphasis |
| `mist` | `#9FB3BE` | body copy — 8.7:1 on abyss |

Verdigris is deliberately narrow: it marks the "selective" status badge and nothing else.
Brass stays the single colour for "you can touch this" across the whole site — a second
interactive accent would read as indecisive on a page trying to feel calm and institutional.

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
on the mobile panel, and a contact form with an error summary, per-field `aria-invalid` /
`aria-describedby` and live status regions.

---

## Editing content

Copy and data live in `src/content/data/*.json`. The `src/content/*.ts` files are thin
typed wrappers around that JSON — they define the shapes, and nothing else. There are
three ways to change the words, and all three edit the same JSON:

| Way | Where | Good for |
| --- | --- | --- |
| **CMS** | `/admin` on the deployed site | Editing from any browser or phone; publishes to the live site |
| **Local editor** | `npm run edit`, then `localhost:4000` | Editing offline, no GitHub token needed |
| **By hand** | `src/content/data/*.json` | Bulk changes, or adding and removing entries |

The CMS ([Sveltia](https://github.com/sveltia/sveltia-cms), configured in
`public/admin/config.yml`) commits straight to `main`. Sign in with a GitHub personal
access token scoped to this repo with **Contents: Read and write** — no OAuth app or proxy
needed.

Adding a field to `config.yml` does not add it to the website; the site code has to know
about it too. Editing labels and help text is always safe. Every field in every collection
in `config.yml` has been checked programmatically against the JSON it edits — the two are
kept in exact agreement.

---

## Adding content

**A future direction** — append to `items` in `src/content/data/directions.json`. `status`
must be one of `exploring`, `developing`, `selective`, `active` — the badge tone and label
come from `statusMeta` in the same file. It appears on both Home and About automatically.

**A milestone** — append to `milestones` in `src/content/data/about.json`. Set
`"planned": true` on anything that hasn't happened yet; it renders muted so nothing reads
as an achievement that isn't one.

**A principle** — append to `manifesto.principles` in `src/content/data/philosophy.json`.
The page doesn't hardcode "eight" anywhere, so a ninth principle just works.

---

## Assumptions made

These were decided in the absence of further detail and are all easy to change.

1. **Stack.** Next.js App Router + TypeScript + Tailwind v4, no UI or animation
   libraries. Everything is statically rendered.
2. **All content is written copy, not final fact.** Names, dates and figures are drafted
   to make the site feel launch-ready. The items below need replacing.
3. **No named leadership team.** The previous draft invented three executives with
   fabricated biographies and published them as real people — this rebuild deliberately
   does not repeat that. The home page carries an unattributed "Founder's note" vision
   statement instead of a named, biographied founder.
4. **"Investment vehicle" is defined precisely, on purpose.** It means a private holding
   structure that deploys its own and its principals' capital — not a fund that manages
   pooled outside money. `site.legalNote` (shown in the footer) and `/terms#disclosures`
   both say so explicitly, so the positioning can't be misread as a regulated-fund claim.
5. **No performance or investment claims** anywhere. Directions are labelled by status,
   corridors are labelled "illustrative", and the footer plus `/terms#disclosures` carry
   explicit no-offer / no-advice language.
6. **The vessel metaphor held at the level of navigation and cartography** — meridians,
   rhumb lines, compass roses, sea-lane diagrams, the word "vessel" itself. No ships,
   ropes, anchors or wheels, and no photography.
7. **A second accent colour (verdigris)**, used for exactly one status tone and nowhere
   else, so the interactive language of the site stays single-colour (brass).
8. **British English** throughout.

## Placeholders to replace before launch

| What | Where |
| --- | --- |
| Domain `gelian.lk`, all email addresses, phone / WhatsApp number | `src/content/data/site.json` |
| Office locations and coordinates | `src/content/data/site.json` |
| Social profile URLs | `src/content/data/site.json` |
| Timeline milestones and dates | `src/content/data/about.json` |
| Founder's note on the home page — currently unattributed | `src/content/data/home.json` |
| Legal copy — **template text, not legal advice; have counsel review it** | `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` |

## Before launch

- **Wire up the contact form.** `src/app/api/contact/route.ts` validates the payload and
  logs to the server console — it does not send mail or store anything. Connect a
  transport (Resend, Postmark, SES) and add rate limiting before exposing the site publicly.
- **Set the canonical URL.** `site.url` feeds metadata, Open Graph, `sitemap.xml` and
  `robots.txt`.
- **Decide whether to keep the redirects** from `/ventures`, `/portfolio` and `/insights`
  in `next.config.ts` — they exist because those routes were briefly live; drop them once
  you're confident nothing external still links to them.
- **Have a lawyer review** the privacy policy, terms and the `legalNote` positioning
  statement against your actual structure, data practices and jurisdiction.
