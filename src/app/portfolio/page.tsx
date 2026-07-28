import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { VentureCard } from "@/components/cards/VentureCard";
import { MarkedRule } from "@/components/visuals/Atmosphere";

import { ventures, statusMeta, type VentureStatus } from "@/content/ventures";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Future Ventures",
  description:
    "Gelian's current exploration areas — six venture concepts across trade, hospitality, gemstones, media, digital services and cross-border market access. None are operating businesses yet.",
  path: "/portfolio",
});

const statusOrder: VentureStatus[] = ["live", "development", "exploring", "coming-soon"];

export default function PortfolioPage() {
  const counts = statusOrder
    .map((status) => ({
      status,
      count: ventures.filter((venture) => venture.status === status).length,
    }))
    .filter((entry) => entry.count > 0);

  const live = ventures.filter((venture) => venture.status === "live");
  const upcoming = ventures.filter((venture) => venture.status !== "live");

  return (
    <>
      <PageHeader
        eyebrow="Future ventures"
        title="Current exploration areas."
        lede={
          <p>
            This is what a portfolio page looks like before there is a
            portfolio. Six concepts, each at a declared stage, each carrying a
            working name rather than a brand. Nothing here is trading, and we
            will not pretend otherwise.
          </p>
        }
        meta={[
          { label: "Entries", value: `${ventures.length} concepts` },
          { label: "Live ventures", value: live.length ? String(live.length) : "None yet" },
          { label: "Themes covered", value: "Six" },
          { label: "First to market", value: "Planned 2027" },
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Legend                                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="sm" aria-labelledby="legend-heading">
        <Container size="wide">
          <Reveal>
            <h2 id="legend-heading" className="sr-only">
              Status key
            </h2>
            <div className="flex flex-col gap-6 rounded-2xl border border-tide/70 bg-hull/30 p-7 sm:flex-row sm:items-center sm:justify-between sm:p-8">
              <div>
                <p className="label text-haze">Status key</p>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-mist">
                  Every entry states how far along it actually is. We would
                  rather publish an unglamorous status than an optimistic one.
                </p>
              </div>
              <ul className="flex flex-wrap gap-3">
                {counts.map((entry) => (
                  <li key={entry.status} className="flex items-center gap-2.5">
                    <Badge status={entry.status} />
                    <span className="text-sm text-haze">{entry.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Live ventures — renders only once something has launched          */}
      {/* ---------------------------------------------------------------- */}
      {live.length > 0 ? (
        <Section spacing="lg" aria-labelledby="live-heading">
          <Container size="wide">
            <SectionHeading
              eyebrow="Operating"
              title={<span id="live-heading">Live ventures.</span>}
            />
            <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {live.map((venture, index) => (
                <Reveal key={venture.slug} delay={(index % 3) * 90} className="h-full">
                  <VentureCard venture={venture} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      {/* ---------------------------------------------------------------- */}
      {/* The grid                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="lg" aria-labelledby="grid-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow="Under study"
            title={
              <span id="grid-heading">
                Six concepts, at four different depths.
              </span>
            }
            lede={
              <p>
                Working names are internal shorthand — they let us talk about a
                thing before it earns a real one. Several of these will not
                survive their own pilot, and that is the process functioning
                rather than failing.
              </p>
            }
          />

          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcoming.map((venture, index) => (
              <Reveal key={venture.slug} delay={(index % 3) * 90} className="h-full">
                <VentureCard venture={venture} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* How the page grows                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="raised" bordered aria-labelledby="growth-heading">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>As we go</Eyebrow>
                <h2
                  id="growth-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.9rem]"
                >
                  This page is designed to fill up.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={100} className="flex flex-col gap-6">
                <p className="measure text-lg leading-[1.75] text-sand/90">
                  As each venture clears its pilot, it will gain a real name, a
                  link of its own, and a live status — in that order, and only
                  after the fact.
                </p>
                <p className="measure text-[1.0625rem] leading-[1.8] text-mist">
                  Entries that do not survive will not quietly disappear. We
                  will mark what closed and, where we can, say what we got
                  wrong. A portfolio page that only ever grows is a portfolio
                  page that is not telling you very much.
                </p>
              </Reveal>

              <Reveal delay={180}>
                <dl className="mt-10 grid gap-8 border-t border-tide/70 pt-8 sm:grid-cols-2">
                  {(["exploring", "development"] as VentureStatus[]).map(
                    (status) => (
                      <div key={status} className="flex flex-col gap-3">
                        <dt>
                          <Badge status={status} />
                        </dt>
                        <dd className="text-sm leading-relaxed text-mist">
                          {statusMeta[status].description}
                        </dd>
                      </div>
                    ),
                  )}
                </dl>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Disclosure                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="sm" aria-labelledby="disclosure-heading">
        <Container size="narrow">
          <Reveal className="flex flex-col items-center text-center">
            <MarkedRule className="w-32" />
            <h2 id="disclosure-heading" className="label mt-8 text-haze">
              Important
            </h2>
            <p className="mt-5 text-sm leading-[1.8] text-haze">
              The ventures described on this page are concepts, exploration
              areas and works in progress. They are not operating businesses,
              completed investments or offers of any kind, and nothing here
              should be read as a representation of performance, returns or
              existing commercial relationships.
            </p>
          </Reveal>
        </Container>
      </Section>

      <CTABlock
        eyebrow="Collaborate"
        title="If one of these is your field, we would rather hear from you than about you."
        body={
          <p>
            Suppliers, makers, operators and specialists in any of these
            categories are welcome to write. So are people who think we have
            read a market wrongly — that is a genuinely useful email to receive.
          </p>
        }
        secondary={{ label: "How we build ventures", href: "/ventures" }}
      />
    </>
  );
}
