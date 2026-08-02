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
  const { header, closingCta } = portfolio;
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
      {/* The portfolio grid, with a label key as a footnote                */}
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

          {/* Label key — a compact footnote to the boxes above */}
          <Reveal className="mt-14 border-t border-tide/60 pt-8">
            <p className="label text-haze">What the labels mean</p>
            <dl className="mt-6 grid gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4">
              {statusKeys.map((status) => (
                <div key={status} className="flex flex-col items-start gap-2.5">
                  <dt>
                    <Badge status={status} />
                  </dt>
                  <dd className="text-xs leading-relaxed text-haze">
                    {directionStatusMeta[status].description}
                  </dd>
                </div>
              ))}
            </dl>
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
