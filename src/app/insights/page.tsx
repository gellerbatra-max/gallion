import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { InsightCard } from "@/components/cards/InsightCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { CompassRose } from "@/components/visuals/CompassRose";

import { sortedInsights, formatDate } from "@/content/insights";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Insights",
  description:
    "Founder notes, market observations and field notes from Gelian — on Sri Lankan categories, cross-border trade, provenance and long-horizon venture building.",
  path: "/insights",
});

export default function InsightsPage() {
  const [lead, ...rest] = sortedInsights;
  const categories = Array.from(
    new Set(sortedInsights.map((insight) => insight.category)),
  );

  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="The journal."
        lede={
          <p>
            Notes on what we are reading, building and getting wrong. Written
            for operators and allocators who think about the same problems —
            not for search engines.
          </p>
        }
        meta={[
          { label: "Pieces", value: String(sortedInsights.length) },
          { label: "Cadence", value: "Six or seven a year" },
          { label: "Latest", value: formatDate(lead.date) },
          { label: "Formats", value: categories.length + " kinds" },
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Lead article                                                      */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="lg" aria-labelledby="lead-heading">
        <Container size="wide">
          <h2 id="lead-heading" className="sr-only">
            Latest
          </h2>
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl border border-tide/70 bg-hull/30 p-8 sm:p-12 lg:p-16">
              <CompassRose className="pointer-events-none absolute -right-24 -bottom-32 w-96 text-brass/[0.05]" />
              <div className="relative">
                <InsightCard insight={lead} variant="feature" />
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Archive                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="lg" aria-labelledby="archive-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow="Archive"
            title={<span id="archive-heading">Everything else.</span>}
          />

          <div className="mt-16 grid gap-x-12 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((insight, index) => (
              <Reveal key={insight.slug} delay={(index % 3) * 90} className="h-full">
                <InsightCard insight={insight} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Dispatch                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="raised" bordered spacing="lg" aria-labelledby="dispatch-heading">
        <Container size="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow="The Dispatch"
                title={
                  <span id="dispatch-heading">
                    Sent when there is something worth sending.
                  </span>
                }
                lede={
                  <p>
                    No cadence for its own sake, no round-ups of other
                    people&rsquo;s links. Occasional letters from the platform,
                    and early notice when a venture reaches the surface.
                  </p>
                }
              />
            </div>

            <div className="lg:col-span-6 lg:pl-8">
              <Reveal delay={120}>
                <div className="rounded-2xl border border-tide/70 bg-abyss/40 p-8 sm:p-10">
                  <NewsletterForm inline />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
