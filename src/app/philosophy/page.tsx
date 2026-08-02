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

import { philosophy, type EssayBlock } from "@/content/philosophy";
import { pageMeta } from "@/lib/seo";

/**
 * A narrow eyebrow + heading + prose section, shared by Strategy, Process
 * and Style. Pass `raised` to alternate the surface tone.
 */
function EssaySection({
  id,
  block,
  raised = false,
  decor = false,
}: {
  id: string;
  block: EssayBlock;
  raised?: boolean;
  decor?: boolean;
}) {
  return (
    <Section
      tone={raised ? "raised" : "base"}
      bordered={raised}
      className={decor ? "overflow-hidden" : undefined}
      aria-labelledby={`${id}-heading`}
    >
      {decor ? (
        <CompassRose className="pointer-events-none absolute top-1/2 -left-44 w-[40rem] -translate-y-1/2 text-brass/[0.04]" />
      ) : null}
      <Container size="narrow" className={decor ? "relative" : undefined}>
        <Reveal>
          <Eyebrow>{block.eyebrow}</Eyebrow>
          <h2
            id={`${id}-heading`}
            className="mt-6 text-3xl leading-[1.16] sm:text-[2.5rem]"
          >
            {block.title}
          </h2>
        </Reveal>

        <Reveal delay={100} className="mt-10 flex flex-col gap-7">
          {block.paragraphs.map((paragraph, index) => (
            <p key={index} className="text-[1.0625rem] leading-[1.85] text-mist">
              {paragraph}
            </p>
          ))}
        </Reveal>
      </Container>
    </Section>
  );
}

export const metadata: Metadata = pageMeta({
  title: philosophy.seo.title,
  description: philosophy.seo.description,
  path: "/philosophy",
});

export default function PhilosophyPage() {
  const {
    header,
    strategy,
    process: processBlock,
    manifesto,
    style,
    closing,
    closingCta,
  } = philosophy;

  return (
    <>
      <PageHeader
        eyebrow={header.eyebrow}
        title={header.title}
        lede={
          <>
            {header.lede.map((paragraph, index) => (
              <p key={index} className={index > 0 ? "mt-5" : undefined}>
                {paragraph}
              </p>
            ))}
          </>
        }
        meta={header.meta}
      />

      {/* ---------------------------------------------------------------- */}
      {/* The manifesto                                                     */}
      {/* ---------------------------------------------------------------- */}
      <Section
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
            lede={
              <>
                {manifesto.lede.map((paragraph, index) => (
                  <p key={index} className={index > 0 ? "mt-5" : undefined}>
                    {paragraph}
                  </p>
                ))}
              </>
            }
          />

          <div className="mt-20">
            <ManifestoBlock principles={manifesto.principles} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Strategy — what we choose to build                                */}
      {/* ---------------------------------------------------------------- */}
      <EssaySection id="strategy" block={strategy} />

      {/* ---------------------------------------------------------------- */}
      {/* Process — how we execute (the operating loop)                     */}
      {/* ---------------------------------------------------------------- */}
      <EssaySection id="process" block={processBlock} raised decor />

      {/* ---------------------------------------------------------------- */}
      {/* Style — our overall posture                                       */}
      {/* ---------------------------------------------------------------- */}
      <EssaySection id="style" block={style} />

      {/* ---------------------------------------------------------------- */}
      {/* Closing                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="raised" bordered spacing="xl" aria-labelledby="closing-heading">
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
