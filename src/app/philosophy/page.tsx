import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ManifestoBlock } from "@/components/ManifestoBlock";
import { MarkedRule } from "@/components/visuals/Atmosphere";
import { CompassRose } from "@/components/visuals/CompassRose";

import { philosophy } from "@/content/philosophy";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: philosophy.seo.title,
  description: philosophy.seo.description,
  path: "/philosophy",
});

export default function PhilosophyPage() {
  const { header, opening, method, manifesto, closing, closingCta } = philosophy;

  return (
    <>
      <PageHeader
        eyebrow={header.eyebrow}
        title={header.title}
        lede={<p>{header.lede}</p>}
        meta={header.meta}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Opening essay                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="xl" aria-labelledby="opening-heading">
        <Container size="narrow">
          <Reveal>
            <h2 id="opening-heading" className="text-3xl leading-[1.16] sm:text-[2.5rem]">
              {opening.title}
            </h2>
          </Reveal>

          <Reveal delay={100} className="mt-10 flex flex-col gap-7">
            {opening.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-[1.0625rem] leading-[1.85] text-mist">
                {paragraph}
              </p>
            ))}
          </Reveal>

          <Reveal delay={160}>
            <blockquote className="mt-12 border-l border-brass/50 pl-7 font-display text-2xl leading-[1.45] text-sand sm:text-[1.75rem]">
              {opening.pullQuote}
            </blockquote>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* The method — the loop the principles hold us to                   */}
      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="method-heading">
        <Container size="narrow">
          <Reveal>
            <Eyebrow>{method.eyebrow}</Eyebrow>
            <h2
              id="method-heading"
              className="mt-6 text-3xl leading-[1.16] sm:text-[2.5rem]"
            >
              {method.title}
            </h2>
          </Reveal>

          <Reveal delay={100} className="mt-10 flex flex-col gap-7">
            {method.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-[1.0625rem] leading-[1.85] text-mist">
                {paragraph}
              </p>
            ))}
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
            eyebrow={manifesto.eyebrow}
            title={<span id="manifesto-heading">{manifesto.title}</span>}
            lede={<p>{manifesto.lede}</p>}
          />

          <div className="mt-20">
            <ManifestoBlock principles={manifesto.principles} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Closing                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="xl" aria-labelledby="closing-heading">
        <Container size="narrow">
          <Reveal className="flex flex-col items-center text-center">
            <Eyebrow className="justify-center">{closing.eyebrow}</Eyebrow>
            <MarkedRule className="mt-10 w-40" />
            <h2
              id="closing-heading"
              className="mt-10 font-display text-2xl leading-[1.4] font-light sm:text-[2rem]"
            >
              {closing.statement}
            </h2>
            <MarkedRule className="mt-12 w-40" />
          </Reveal>
        </Container>
      </Section>

      <CTABlock
        eyebrow={closingCta.eyebrow}
        title={closingCta.title}
        body={<p>{closingCta.body}</p>}
        primary={closingCta.primaryCta}
        secondary={closingCta.secondaryCta}
      />
    </>
  );
}
