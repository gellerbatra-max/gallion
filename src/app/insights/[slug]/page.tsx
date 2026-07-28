import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Prose } from "@/components/ui/Prose";
import { CTABlock } from "@/components/sections/CTABlock";
import { Meridians } from "@/components/visuals/Meridians";
import { MarkedRule } from "@/components/visuals/Atmosphere";

import {
  insights,
  sortedInsights,
  getInsight,
  formatDate,
  type Block,
} from "@/content/insights";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) {
    return { title: "Not found" };
  }

  return pageMeta({
    title: insight.title,
    description: insight.deck,
    path: `/insights/${insight.slug}`,
    type: "article",
    publishedTime: insight.date,
  });
}

function renderBlock(block: Block, index: number) {
  switch (block.type) {
    case "h2":
      return <h2 key={index}>{block.text}</h2>;
    case "quote":
      return (
        <blockquote key={index}>
          {block.text}
          {block.cite ? (
            <cite className="mt-4 block font-sans text-sm not-italic text-haze">
              {block.cite}
            </cite>
          ) : null}
        </blockquote>
      );
    case "list":
      return (
        <ul key={index}>
          {block.items.map((item) => (
            <li key={item.slice(0, 32)}>{item}</li>
          ))}
        </ul>
      );
    default:
      return <p key={index}>{block.text}</p>;
  }
}

export default async function InsightPage({ params }: Params) {
  const { slug } = await params;
  const insight = getInsight(slug);

  if (!insight) notFound();

  const position = sortedInsights.findIndex((entry) => entry.slug === slug);
  const next = sortedInsights[position + 1];
  const previous = sortedInsights[position - 1];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: insight.title,
    description: insight.deck,
    datePublished: insight.date,
    author: { "@type": "Person", name: insight.author },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/insights/${insight.slug}`,
  };

  return (
    <>
      <header className="relative overflow-hidden border-b border-tide/50 pt-36 pb-16 sm:pt-44 sm:pb-20">
        <Meridians className="text-tide" opacity={0.26} />

        <Container size="narrow" className="relative">
          <Reveal>
            <Link
              href="/insights"
              className="group inline-flex items-center gap-2 text-sm text-mist transition-colors hover:text-brass"
            >
              <span
                aria-hidden="true"
                className="transition-transform duration-500 group-hover:-translate-x-1"
              >
                &larr;
              </span>
              All insights
            </Link>

            <div className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
              <span className="label text-brass">{insight.category}</span>
              <span aria-hidden="true" className="size-1 rounded-full bg-tide" />
              <time dateTime={insight.date} className="label text-haze">
                {formatDate(insight.date)}
              </time>
              <span aria-hidden="true" className="size-1 rounded-full bg-tide" />
              <span className="label text-haze">{insight.readingTime}</span>
            </div>

            <h1 className="mt-8 text-[2.25rem] leading-[1.1] sm:text-5xl lg:text-[3.5rem]">
              {insight.title}
            </h1>

            <p className="mt-7 text-lg leading-[1.7] text-mist sm:text-xl">
              {insight.deck}
            </p>

            <p className="mt-9 text-sm text-sand/80">
              By {insight.author}
              <span className="mt-1 block text-xs text-haze">
                Gelian &middot; {formatDate(insight.date)}
              </span>
            </p>
          </Reveal>
        </Container>
      </header>

      <Section spacing="lg">
        <Container size="narrow">
          <Reveal>
            <Prose>
              <article>{insight.body.map(renderBlock)}</article>
            </Prose>
          </Reveal>

          <Reveal delay={100}>
            <MarkedRule className="mt-16" />

            <p className="mt-8 text-sm leading-relaxed text-haze">
              Written for Gelian&rsquo;s journal. Views are the author&rsquo;s
              and are offered as commentary, not as investment, legal or
              commercial advice.
            </p>
          </Reveal>

          {/* Neighbouring pieces */}
          {previous || next ? (
            <Reveal delay={160}>
              <nav
                aria-label="More insights"
                className="mt-16 grid gap-6 border-t border-tide/60 pt-10 sm:grid-cols-2"
              >
                {previous ? (
                  <Link
                    href={`/insights/${previous.slug}`}
                    className="group flex flex-col gap-3 rounded-2xl border border-tide/70 p-7 transition-colors duration-700 hover:border-brass/40"
                  >
                    <span className="label text-haze">Newer</span>
                    <span className="font-display text-xl leading-snug transition-colors group-hover:text-brass-soft">
                      {previous.title}
                    </span>
                  </Link>
                ) : (
                  <span aria-hidden="true" />
                )}

                {next ? (
                  <Link
                    href={`/insights/${next.slug}`}
                    className="group flex flex-col gap-3 rounded-2xl border border-tide/70 p-7 text-right transition-colors duration-700 hover:border-brass/40 sm:items-end"
                  >
                    <span className="label text-haze">Older</span>
                    <span className="font-display text-xl leading-snug transition-colors group-hover:text-brass-soft">
                      {next.title}
                    </span>
                  </Link>
                ) : null}
              </nav>
            </Reveal>
          ) : null}
        </Container>
      </Section>

      <CTABlock
        eyebrow="Continue"
        title="We write these because the thinking is the product."
        body={
          <p>
            If any of this is your field — or if you think we have read it
            wrongly — that is a genuinely useful email to receive.
          </p>
        }
        secondary={{ label: "More insights", href: "/insights" }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
    </>
  );
}
