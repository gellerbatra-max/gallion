import Link from "next/link";
import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { CTABlock } from "@/components/sections/CTABlock";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ThemeCard } from "@/components/cards/ThemeCard";
import { VentureCard } from "@/components/cards/VentureCard";
import { InsightCard } from "@/components/cards/InsightCard";
import { RouteDiagram } from "@/components/visuals/RouteDiagram";
import { MarkedRule } from "@/components/visuals/Atmosphere";

import { themes } from "@/content/themes";
import { ventures } from "@/content/ventures";
import { principles } from "@/content/principles";
import { sortedInsights } from "@/content/insights";
import { ports, site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: site.tagline,
    description: site.description,
    path: "/",
  }),
  // The home page uses the full default title rather than the template.
  title: `${site.name} — ${site.tagline}`,
};

export default function HomePage() {
  const previewVentures = ventures.slice(0, 3);
  const previewPrinciples = principles.slice(0, 4);
  const latestInsights = sortedInsights.slice(0, 3);

  return (
    <>
      <Hero />

      {/* ---------------------------------------------------------------- */}
      {/* What Gelian is                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section id="what" tone="raised" bordered aria-labelledby="what-heading">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>What Gelian is</Eyebrow>
                <h2
                  id="what-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.9rem]"
                >
                  Not one business. A platform that will hold several.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={100} className="flex flex-col gap-6">
                <p className="measure text-lg leading-[1.75] text-sand/90">
                  Gelian is a privately held venture platform. We start,
                  acquire and hold companies — each with its own name, its own
                  leadership and its own reason to exist — rather than running a
                  single operating business under one roof.
                </p>
                <p className="measure text-[1.0625rem] leading-[1.8] text-mist">
                  The structure is deliberate. A holding platform can take
                  positions a single company cannot: it can fund a venture
                  through the years before it earns, keep the ones that work,
                  and close the ones that do not without taking the whole
                  enterprise down with them. It also keeps the standard in one
                  place. Whatever we build, it is built to the same brief.
                </p>
                <p className="measure text-[1.0625rem] leading-[1.8] text-mist">
                  We are early. What exists today is a thesis, a structure, and
                  the first ventures in development. We would rather say that
                  plainly than dress it up.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button href="/about" variant="secondary" size="sm" withArrow>
                    About the platform
                  </Button>
                  <Button href="/ventures" variant="quiet" size="sm" withArrow>
                    How we build ventures
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Why Gelian exists                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section id="why" aria-labelledby="why-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow="Why Gelian exists"
            title={
              <span id="why-heading">
                An island that supplies the world, and rarely names the product.
              </span>
            }
            lede={
              <p>
                Sri Lanka has sat on the east&ndash;west sea lane for two
                thousand years. Cinnamon, sapphire, tea, textiles, engineering
                talent — the raw quality has never been the problem. The problem
                is who owns the brand at the other end of the voyage.
              </p>
            }
          />

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-tide/70 bg-tide/70 sm:grid-cols-3">
            {[
              {
                figure: "The gap",
                title: "Value leaves before it is captured",
                body: "In several categories the island supplies the input and imports the finished good. The margin is added somewhere with better shopfronts and a longer memory for branding.",
              },
              {
                figure: "The cause",
                title: "Ownership, not capability",
                body: "A supplier is a line item; a brand is a counterparty. The distance between them is measured in patience and distribution, not in skill or material.",
              },
              {
                figure: "The response",
                title: "Build the missing layer",
                body: "Own the customer relationship, hold the ventures long enough for that ownership to compound, and keep the craft and the margin in the same place.",
              },
            ].map((item, index) => (
              <Reveal
                key={item.title}
                delay={index * 90}
                className="flex flex-col gap-4 bg-abyss p-8 sm:p-9"
              >
                <p className="label text-brass/80">{item.figure}</p>
                <h3 className="text-xl leading-snug">{item.title}</h3>
                <p className="text-[0.9375rem] leading-[1.75] text-mist">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* How we think                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section id="how" tone="raised" bordered aria-labelledby="how-heading">
        <Container size="wide">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              className="sm:max-w-2xl"
              eyebrow="How we think"
              title={<span id="how-heading">Four of our eight principles.</span>}
              lede={
                <p>
                  They are not values on a wall. They are the arguments we have
                  with ourselves before we commit capital or a name.
                </p>
              }
            />
            <Reveal delay={120}>
              <Button href="/philosophy" variant="secondary" size="sm" withArrow>
                Read all eight
              </Button>
            </Reveal>
          </div>

          <ul className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {previewPrinciples.map((principle, index) => (
              <Reveal
                as="li"
                key={principle.number}
                delay={index * 80}
                className="flex gap-6 border-t border-tide/70 pt-7"
              >
                <span
                  aria-hidden="true"
                  className="font-display text-lg text-brass/85"
                >
                  {principle.number}
                </span>
                <div>
                  <h3 className="text-xl leading-snug">{principle.claim}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-[1.75] text-mist">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Selected themes                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section id="themes" aria-labelledby="themes-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow="Selected themes"
            title={<span id="themes-heading">Where we are looking.</span>}
            lede={
              <p>
                Six areas of interest, narrowed from a much longer list. These
                are categories under study — not committed investments, and not
                a promise of what we will build.
              </p>
            }
          />

          <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme, index) => (
              <Reveal key={theme.id} delay={(index % 3) * 90}>
                <ThemeCard theme={theme} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Future ventures preview                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="ventures-preview"
        tone="raised"
        bordered
        aria-labelledby="ventures-heading"
      >
        <Container size="wide">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              className="sm:max-w-2xl"
              eyebrow="Future ventures"
              title={<span id="ventures-heading">The first cohort.</span>}
              lede={
                <p>
                  Working names for concepts in development. Nothing here is
                  trading yet — when a venture opens its doors, it will be
                  marked live and it will say so itself.
                </p>
              }
            />
            <Reveal delay={120}>
              <Button href="/portfolio" variant="secondary" size="sm" withArrow>
                See all six
              </Button>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {previewVentures.map((venture, index) => (
              <Reveal key={venture.slug} delay={index * 90} className="h-full">
                <VentureCard venture={venture} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Both directions                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section id="bridge" spacing="xl" aria-labelledby="bridge-heading">
        <Container size="wide">
          <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Both directions</Eyebrow>
                <h2
                  id="bridge-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.9rem]"
                >
                  Sri Lanka to the world.
                  <span className="block text-gilt">
                    And the world to Sri Lanka.
                  </span>
                </h2>
                <p className="measure mt-7 text-[1.0625rem] leading-[1.8] text-mist">
                  A bridge with traffic in one direction is a drain. Half our
                  mandate is carrying Sri Lankan ventures into demanding
                  markets. The other half is bringing capital, standards,
                  partners and ideas back — and leaving behind something more
                  capable than what we found.
                </p>
                <p className="measure mt-5 text-[1.0625rem] leading-[1.8] text-mist">
                  Getting out is hard. Getting in is harder. Foreign operators
                  are rarely deterred by competition here; they are deterred by
                  not knowing whom to trust. That is a solvable problem, and
                  solving it properly is itself a business.
                </p>

                <div className="mt-10">
                  <Button
                    href="/ventures"
                    variant="secondary"
                    size="sm"
                    withArrow
                  >
                    How the crossing works
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <div className="rounded-2xl border border-tide/70 bg-hull/30 p-6 sm:p-8">
                  <RouteDiagram />

                  <div className="mt-6 border-t border-tide/60 pt-6">
                    <p className="label text-haze">Working corridors</p>
                    <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                      {ports.map((port) => (
                        <li key={port.code} className="flex flex-col gap-1">
                          <span className="text-sm text-sand">{port.name}</span>
                          <span className="text-xs text-haze">
                            {port.region}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-xs leading-relaxed text-haze">
                      Illustrative corridors of interest. Not an indication of
                      established operations or partnerships in these markets.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Founder statement                                                 */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="vision"
        tone="raised"
        bordered
        spacing="xl"
        aria-labelledby="vision-heading"
      >
        <Container size="narrow">
          <Reveal className="flex flex-col items-center text-center">
            <Eyebrow className="justify-center">From the founder</Eyebrow>
            <MarkedRule className="mt-10 w-40" />

            <blockquote
              id="vision-heading"
              className="mt-10 font-display text-2xl leading-[1.45] font-light text-ivory sm:text-[1.9rem] sm:leading-[1.42]"
            >
              &ldquo;I kept having the same meeting. Someone would hold up
              something made here — a stone, a cloth, a cup of tea — and everyone
              in the room would agree it was excellent. Then the price would be
              set as though it were ordinary. Gelian exists because I stopped
              accepting that as the natural order of things.&rdquo;
            </blockquote>

            <p className="mt-10 text-[1.0625rem] leading-[1.8] text-mist">
              We are not in a hurry, and we are not standing still. The plan is
              to build a small number of ventures properly, hold them for a long
              time, and be judged on what they look like in a decade rather than
              what they promise this year.
            </p>

            <MarkedRule className="mt-12 w-40" />

            <p className="mt-8 text-sm text-sand">
              Rehan Alwis
              <span className="mt-1.5 block text-xs text-haze">
                Founder, Gelian
              </span>
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Latest insights                                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section id="insights-preview" aria-labelledby="insights-heading">
        <Container size="wide">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              className="sm:max-w-2xl"
              eyebrow="Insights"
              title={<span id="insights-heading">From the journal.</span>}
              lede={
                <p>
                  Notes on what we are reading, building and getting wrong.
                  Written for people who think about the same problems.
                </p>
              }
            />
            <Reveal delay={120}>
              <Link
                href="/insights"
                className="group inline-flex items-center gap-2 text-sm text-brass transition-colors hover:text-brass-soft"
              >
                All insights
                <span
                  aria-hidden="true"
                  className="transition-transform duration-500 group-hover:translate-x-1"
                >
                  &rarr;
                </span>
              </Link>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-x-12 gap-y-12 lg:grid-cols-3">
            {latestInsights.map((insight, index) => (
              <Reveal key={insight.slug} delay={index * 90} className="h-full">
                <InsightCard insight={insight} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CTABlock
        title="If you are building something that should travel, we should talk."
        body={
          <p>
            We are interested in operators, makers, founders and partners on
            either side of the crossing — whether you are trying to leave the
            island or land on it. Tell us what you are working on and what you
            need that is not money.
          </p>
        }
        secondary={{ label: "Read the FAQ", href: "/ventures#faq" }}
      />
    </>
  );
}
