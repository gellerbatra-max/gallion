import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { MarkedRule } from "@/components/visuals/Atmosphere";
import { CompassRose } from "@/components/visuals/CompassRose";

import { principles } from "@/content/principles";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Philosophy",
  description:
    "Eight principles that decide what Gelian builds, backs and declines — curiosity, selection, craft, credibility, global relevance, local authenticity, long horizons and bridge-building.",
  path: "/philosophy",
});

const refusals = [
  {
    title: "We do not chase volume",
    body: "A larger portfolio is not a better one. If we cannot give a venture serious attention, we should not own it.",
  },
  {
    title: "We do not sell the origin cheaply",
    body: "Cost arbitrage is a temporary condition someone else will undercut. If the only reason to build here is that it is cheap, we pass.",
  },
  {
    title: "We do not announce what has not happened",
    body: "No launch is described in the past tense before it happens. Nothing on this site is a result unless it is labelled as one.",
  },
  {
    title: "We do not take capital with a clock on it",
    body: "Money that must exit on someone else's schedule will eventually make the decision for us. We would rather grow slower and keep the choice.",
  },
];

export default function PhilosophyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Philosophy"
        title="What we believe, and what it costs us."
        lede={
          <p>
            Principles are only worth writing down if they occasionally make you
            worse off. These eight have already cost us opportunities we wanted.
            That is how we know they are doing something.
          </p>
        }
        meta={[
          { label: "Principles", value: "Eight" },
          { label: "Standard", value: "Craft before scale" },
          { label: "Horizon", value: "Ten years, minimum" },
          { label: "Direction", value: "Both ways" },
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Opening essay                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="xl" aria-labelledby="opening-heading">
        <Container size="narrow">
          <Reveal>
            <h2 id="opening-heading" className="text-3xl leading-[1.16] sm:text-[2.5rem]">
              Most companies inherit their philosophy from whatever worked last
              quarter.
            </h2>
          </Reveal>

          <Reveal delay={100} className="mt-10 flex flex-col gap-7">
            <p className="text-[1.0625rem] leading-[1.85] text-mist">
              That is not a criticism — it is what pressure does. A business
              under quarterly scrutiny develops the beliefs that keep it alive
              in three-month increments, and those beliefs are almost always
              about speed. Move faster. Announce sooner. Take the deal in front
              of you.
            </p>
            <p className="text-[1.0625rem] leading-[1.85] text-mist">
              We built Gelian as a holding platform partly to escape that.
              Structure is not a substitute for character, but it does decide
              which kind of character is affordable. A vehicle designed to hold
              things for a decade can afford beliefs that a vehicle designed to
              exit in four cannot.
            </p>
            <p className="text-[1.0625rem] leading-[1.85] text-mist">
              What follows is not a values statement. Values statements are
              written to be agreed with. These are written to be argued with —
              by us, in rooms where a decision is actually being made, usually
              when the easier answer is sitting right there.
            </p>
          </Reveal>

          <Reveal delay={160}>
            <blockquote className="mt-12 border-l border-brass/50 pl-7 font-display text-2xl leading-[1.45] text-sand sm:text-[1.75rem]">
              A principle that has never cost you anything is not a principle.
              It is a preference.
            </blockquote>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* The manifesto                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="manifesto"
        tone="raised"
        bordered
        spacing="xl"
        className="overflow-hidden"
        aria-labelledby="manifesto-heading"
      >
        <CompassRose className="pointer-events-none absolute -right-56 top-20 w-[46rem] text-brass/[0.04]" />

        <Container size="wide" className="relative">
          <SectionHeading
            eyebrow="The manifesto"
            title={<span id="manifesto-heading">Eight principles.</span>}
            lede={
              <p>
                In the order we tend to apply them — from the first question we
                ask about an opportunity to the last thing we owe the place we
                built it in.
              </p>
            }
          />

          <ol className="mt-20 flex flex-col">
            {principles.map((principle, index) => (
              <Reveal
                as="li"
                key={principle.number}
                delay={(index % 2) * 80}
                className="grid gap-6 border-t border-tide/70 py-10 sm:grid-cols-12 sm:gap-10 lg:py-12"
              >
                <div className="flex items-baseline gap-5 sm:col-span-3 sm:flex-col sm:gap-4">
                  <span
                    aria-hidden="true"
                    className="font-display text-2xl leading-none text-brass/85"
                  >
                    {principle.number}
                  </span>
                  <span className="label text-haze">{principle.title}</span>
                </div>

                <div className="sm:col-span-9">
                  <h3 className="text-2xl leading-[1.25] sm:text-[1.9rem]">
                    {principle.claim}
                  </h3>
                  <p className="measure mt-5 text-[1.0625rem] leading-[1.8] text-mist">
                    {principle.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* What this rules out                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="refusals-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow="The other side"
            title={<span id="refusals-heading">What this rules out.</span>}
            lede={
              <p>
                The useful half of any philosophy is the list of things it
                forbids. Here is ours, stated plainly so it can be held against
                us.
              </p>
            }
          />

          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {refusals.map((item, index) => (
              <Reveal
                key={item.title}
                delay={(index % 2) * 90}
                className="border-t border-tide/70 pt-7"
              >
                <h3 className="text-xl leading-snug">{item.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.75] text-mist">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="raised" bordered spacing="xl" aria-labelledby="closing-heading">
        <Container size="narrow">
          <Reveal className="flex flex-col items-center text-center">
            <Eyebrow className="justify-center">In short</Eyebrow>
            <MarkedRule className="mt-10 w-40" />
            <h2
              id="closing-heading"
              className="mt-10 font-display text-2xl leading-[1.4] font-light sm:text-[2rem]"
            >
              Find the few things worth carrying. Build them properly. Hold them
              long enough to matter. Leave the place better supplied than we
              found it.
            </h2>
            <MarkedRule className="mt-12 w-40" />
          </Reveal>
        </Container>
      </Section>

      <CTABlock
        eyebrow="Next"
        title="This is how the philosophy becomes a company."
        body={
          <p>
            The Ventures page sets out how an observation becomes a thesis, a
            pilot, a brand and eventually a business — and what has to be true
            at each stage before we go on.
          </p>
        }
        primary={{ label: "How we build ventures", href: "/ventures" }}
        secondary={{ label: "Future ventures", href: "/portfolio" }}
      />
    </>
  );
}
