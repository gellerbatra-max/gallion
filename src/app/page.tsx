import type { Metadata } from "next";

import { Hero } from "@/components/sections/Hero";
import { CTABlock } from "@/components/sections/CTABlock";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { DirectionCard } from "@/components/cards/DirectionCard";
import { RouteDiagram } from "@/components/visuals/RouteDiagram";

import { home } from "@/content/home";
import { directions } from "@/content/directions";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = {
  ...pageMeta({
    title: home.seo.title,
    description: home.seo.description,
    path: "/",
  }),
  // The home page uses the full default title rather than the template.
  title: `${site.name} — ${site.tagline}`,
};

export default function HomePage() {
  const { whatWeAre, exchange, directionsPreview, closingCta } = home;

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
                <Eyebrow>{whatWeAre.eyebrow}</Eyebrow>
                <h2
                  id="what-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.9rem]"
                >
                  {whatWeAre.title}
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={100} className="flex flex-col gap-6">
                {whatWeAre.paragraphs.map((paragraph, index) => (
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

              <Reveal delay={180}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <Button
                    href={whatWeAre.primaryCta.href}
                    variant="secondary"
                    size="sm"
                    withArrow
                  >
                    {whatWeAre.primaryCta.label}
                  </Button>
                  <Button
                    href={whatWeAre.secondaryCta.href}
                    variant="secondary"
                    size="sm"
                    withArrow
                  >
                    {whatWeAre.secondaryCta.label}
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Both directions — the exchange                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section id="exchange" spacing="xl" aria-labelledby="exchange-heading">
        <Container size="wide">
          <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>{exchange.eyebrow}</Eyebrow>
                <h2
                  id="exchange-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.9rem]"
                >
                  {exchange.title}
                </h2>
                {exchange.paragraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    className={
                      index === 0
                        ? "measure mt-7 text-[1.0625rem] leading-[1.8] text-mist"
                        : "measure mt-5 text-[1.0625rem] leading-[1.8] text-mist"
                    }
                  >
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={120}>
                <div className="rounded-2xl border border-tide/70 bg-hull/30 p-6 sm:p-8">
                  <RouteDiagram />
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Future directions preview                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="directions"
        tone="raised"
        bordered
        aria-labelledby="directions-heading"
      >
        <Container size="wide">
          <div className="flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
            <SectionHeading
              className="sm:max-w-2xl"
              eyebrow={directionsPreview.eyebrow}
              title={<span id="directions-heading">{directionsPreview.title}</span>}
              lede={<p>{directionsPreview.lede}</p>}
            />
            <Reveal delay={120}>
              <Button
                href={directionsPreview.cta.href}
                variant="secondary"
                size="sm"
                withArrow
              >
                {directionsPreview.cta.label}
              </Button>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {directions
              .filter((direction) => direction.status === "developing")
              .map((direction, index) => (
                <Reveal key={direction.id} delay={(index % 3) * 90} className="h-full">
                  <DirectionCard direction={direction} />
                </Reveal>
              ))}
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
