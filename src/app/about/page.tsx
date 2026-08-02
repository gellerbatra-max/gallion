import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Timeline } from "@/components/Timeline";
import { CompassRose } from "@/components/visuals/CompassRose";

import { about } from "@/content/about";
import { pageMeta } from "@/lib/seo";

/**
 * Splits a heading on its accent phrase so the phrase can be tinted gold.
 * Falls back to the plain string if the accent is absent or not found.
 */
function Accented({ text, accent }: { text: string; accent?: string }) {
  const index = accent ? text.indexOf(accent) : -1;
  if (!accent || index === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, index)}
      <span className="text-gilt">{accent}</span>
      {text.slice(index + accent.length)}
    </>
  );
}

export const metadata: Metadata = pageMeta({
  title: about.seo.title,
  description: about.seo.description,
  path: "/about",
});

export default function AboutPage() {
  const {
    header,
    identity,
    distinction,
    longView,
    milestones,
    journey,
    closingCta,
  } = about;

  return (
    <>
      <PageHeader
        eyebrow={header.eyebrow}
        title={header.title}
        lede={<p>{header.lede}</p>}
        meta={header.meta}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Identity — the name                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="identity-heading">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>{identity.eyebrow}</Eyebrow>
                <h2
                  id="identity-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.9rem]"
                >
                  <Accented text={identity.title} accent={identity.titleAccent} />
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={100} className="flex flex-col gap-6">
                {identity.paragraphs.map((paragraph, index) => {
                  const isLast = index === identity.paragraphs.length - 1;
                  return (
                    <p
                      key={index}
                      className={[
                        "measure",
                        index === 0
                          ? "text-lg leading-[1.75]"
                          : "text-[1.0625rem] leading-[1.8]",
                        index === 0 || isLast ? "text-sand/90" : "text-mist",
                      ].join(" ")}
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Distinction — investment vehicle, not a venture firm              */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="raised" bordered aria-labelledby="distinction-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow={distinction.eyebrow}
            title={<span id="distinction-heading">{distinction.title}</span>}
            lede={<p>{distinction.lede}</p>}
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {distinction.cards.map((item, index) => (
              <Reveal key={item.tier} delay={index * 90} className="h-full">
                <div className="relative flex h-full flex-col rounded-2xl border border-tide/70 bg-hull/40 p-8">
                  <p className="label text-brass/80">{item.tier}</p>
                  <h3 className="mt-6 text-2xl leading-tight">{item.name}</h3>
                  <p className="mt-5 text-[0.9375rem] leading-[1.75] text-mist">
                    {item.body}
                  </p>
                  <span
                    aria-hidden="true"
                    className="mt-auto pt-8 text-xs font-medium tracking-[0.3em] text-haze"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200}>
            <p className="measure mt-12 text-[0.9375rem] leading-[1.8] text-haze">
              {distinction.closingNote}
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Journey                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="journey-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow={journey.eyebrow}
            title={<span id="journey-heading">{journey.title}</span>}
            lede={<p>{journey.lede}</p>}
          />

          <div className="mt-16">
            <Timeline milestones={milestones} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Long-term vision                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section
        tone="raised"
        bordered
        className="overflow-hidden"
        aria-labelledby="longview-heading"
      >
        <CompassRose className="pointer-events-none absolute -bottom-44 -left-40 w-[42rem] text-brass/[0.04]" />
        <Container size="wide" className="relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>{longView.eyebrow}</Eyebrow>
                <h2
                  id="longview-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.9rem]"
                >
                  {longView.title}
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={100} className="flex flex-col gap-6">
                {longView.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index === 0
                        ? "measure text-lg leading-[1.75] text-sand/90"
                        : "measure text-[1.0625rem] leading-[1.8] text-mist"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>
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
