import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Badge } from "@/components/ui/Badge";
import { DirectionCard } from "@/components/cards/DirectionCard";

import { portfolio } from "@/content/portfolio";
import {
  directions,
  directionStatusMeta,
  directionsEyebrow,
  directionsTitle,
  directionsLede,
  type DirectionStatus,
} from "@/content/directions";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: portfolio.seo.title,
  description: portfolio.seo.description,
  path: "/portfolio",
});

export default function PortfolioPage() {
  const { header, legend, closingCta } = portfolio;
  const statusKeys = Object.keys(directionStatusMeta) as DirectionStatus[];

  return (
    <>
      <PageHeader
        eyebrow={header.eyebrow}
        title={header.title}
        lede={<p>{header.lede}</p>}
        meta={header.meta}
      />

      {/* ---------------------------------------------------------------- */}
      {/* The portfolio grid                                                */}
      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="portfolio-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow={directionsEyebrow}
            title={<span id="portfolio-heading">{directionsTitle}</span>}
            lede={<p>{directionsLede}</p>}
          />

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {directions.map((direction, index) => (
              <Reveal key={direction.id} delay={(index % 3) * 90} className="h-full">
                <DirectionCard direction={direction} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Status legend — what each label on the cards means                */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="raised" bordered aria-labelledby="legend-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow={legend.eyebrow}
            title={<span id="legend-heading">{legend.title}</span>}
            lede={<p>{legend.lede}</p>}
          />

          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {statusKeys.map((status, index) => (
              <Reveal
                key={status}
                delay={(index % 4) * 90}
                className="flex flex-col items-start gap-4 border-t border-tide/70 pt-7"
              >
                <Badge status={status} />
                <p className="text-[0.9375rem] leading-[1.75] text-mist">
                  {directionStatusMeta[status].description}
                </p>
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
