import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { ThemeCard } from "@/components/cards/ThemeCard";
import { FAQ } from "@/components/FAQ";
import { Badge } from "@/components/ui/Badge";

import { stages, evaluation, faqs } from "@/content/process";
import { themes } from "@/content/themes";
import { statusMeta, type VentureStatus } from "@/content/ventures";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Ventures",
  description:
    "How Gelian identifies, evaluates and builds ventures — from observation and thesis work through pilot, brand and independent business line.",
  path: "/ventures",
});

const sourcing = [
  {
    title: "Mismatches",
    body: "Categories where the island supplies the input and imports the finished good. The gap between those two numbers is usually where a business is hiding.",
  },
  {
    title: "Operators",
    body: "People already doing the difficult part well and constrained by something other than talent — distribution, capital, brand, or simply no one to share the risk.",
  },
  {
    title: "Corridors",
    body: "Routes rather than markets. A product with a credible buyer in Dubai is a different proposition to the same product with a theoretical buyer everywhere.",
  },
  {
    title: "Inbound",
    body: "Foreign operators who want to enter Sri Lanka and cannot find a partner they can hold accountable. Half the mandate points this way.",
  },
];

const statusOrder: VentureStatus[] = ["exploring", "development", "coming-soon", "live"];

export default function VenturesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Ventures"
        title="How a question becomes a company."
        lede={
          <p>
            Gelian does not run an accelerator or a fund. We build a small
            number of ventures ourselves, in sequence, and we are strict about
            what has to be true before one moves to the next stage.
          </p>
        }
        meta={[
          { label: "Themes", value: "Six under study" },
          { label: "Stages", value: "Five, in order" },
          { label: "Concurrent builds", value: "Two to three" },
          { label: "Kill condition", value: "Set before we start" },
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Sourcing                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="sourcing-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow="Identification"
            title={<span id="sourcing-heading">Where the ideas come from.</span>}
            lede={
              <p>
                Not from a deal flow inbox. Four sources account for almost
                everything we have looked at seriously, and none of them
                involves waiting to be pitched.
              </p>
            }
          />

          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {sourcing.map((item, index) => (
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
      {/* Evaluation                                                        */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="raised" bordered aria-labelledby="evaluation-heading">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Evaluation</Eyebrow>
                <h2
                  id="evaluation-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.9rem]"
                >
                  Four questions, asked before the spreadsheet.
                </h2>
                <p className="measure mt-7 text-[1.0625rem] leading-[1.8] text-mist">
                  A model will agree with whoever built it. We try to spend the
                  first several weeks somewhere a model cannot reach, and we
                  write the case against an idea before the case for it.
                </p>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ol className="flex flex-col">
                {evaluation.map((item, index) => (
                  <Reveal
                    as="li"
                    key={item.title}
                    delay={index * 80}
                    className="flex gap-6 border-t border-tide/70 py-7 first:border-t-0 first:pt-0"
                  >
                    <span
                      aria-hidden="true"
                      className="text-xs font-medium tracking-[0.3em] text-brass/85"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl leading-snug">{item.title}</h3>
                      <p className="mt-3 text-[0.9375rem] leading-[1.75] text-mist">
                        {item.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Stages                                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section id="process" aria-labelledby="process-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow="The passage"
            title={
              <span id="process-heading">
                From observation to business line.
              </span>
            }
            lede={
              <p>
                Five stages. A venture only moves forward when the previous
                stage has actually finished — not when the calendar says it
                should have.
              </p>
            }
          />

          <ol className="mt-20 flex flex-col">
            {stages.map((stage, index) => (
              <Reveal
                as="li"
                key={stage.step}
                delay={(index % 2) * 80}
                className="grid gap-7 border-t border-tide/70 py-10 lg:grid-cols-12 lg:gap-12 lg:py-14"
              >
                <div className="lg:col-span-3">
                  <div className="flex items-baseline gap-5 lg:flex-col lg:gap-4">
                    <span
                      aria-hidden="true"
                      className="text-xl font-light tracking-[0.2em] text-brass/85"
                    >
                      {stage.step}
                    </span>
                    <span className="label text-haze">{stage.duration}</span>
                  </div>
                </div>

                <div className="lg:col-span-4">
                  <h3 className="text-2xl leading-tight sm:text-[1.75rem]">
                    {stage.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-[1.75] text-sand/85">
                    {stage.summary}
                  </p>
                </div>

                <div className="flex flex-col gap-4 lg:col-span-5">
                  {stage.detail.map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 32)}
                      className="text-[0.9375rem] leading-[1.8] text-mist"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* How brands are created                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="raised" bordered aria-labelledby="brand-heading">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Brand</Eyebrow>
                <h2
                  id="brand-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.9rem]"
                >
                  A name is the last thing we give a venture, not the first.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={100} className="flex flex-col gap-6">
                <p className="measure text-lg leading-[1.75] text-sand/90">
                  Working names exist so a project can be discussed. A real
                  name is issued only once the venture has met a customer and
                  survived the meeting.
                </p>
                <p className="measure text-[1.0625rem] leading-[1.8] text-mist">
                  When it is time, the platform builds the identity in house —
                  positioning, narrative, visual system, photography and the
                  standards documentation that keeps it consistent once other
                  people are running it. This is treated as infrastructure
                  rather than marketing spend, for the same reason a shipping
                  company owns its vessels rather than chartering them
                  indefinitely.
                </p>
                <p className="measure text-[1.0625rem] leading-[1.8] text-mist">
                  The test is unforgiving and simple: if someone encounters the
                  venture with no context — no introduction, no relationship,
                  no benefit of the doubt — do they understand what it is and
                  why it should exist? If not, it is not ready, whatever the
                  operations say.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Themes in detail                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section id="themes" aria-labelledby="themes-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow="Venture categories"
            title={<span id="themes-heading">The six themes, in detail.</span>}
            lede={
              <p>
                These are categories we are studying, not businesses we have
                launched. Specific ventures are named only when there is
                something real behind the name.
              </p>
            }
          />

          <div className="mt-16 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {themes.map((theme, index) => (
              <Reveal key={theme.id} delay={(index % 3) * 90}>
                <ThemeCard theme={theme} detailed />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* How the portfolio will grow                                       */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="raised" bordered aria-labelledby="portfolio-heading">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>Disclosure</Eyebrow>
                <h2
                  id="portfolio-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.9rem]"
                >
                  How this site will change as ventures launch.
                </h2>
                <p className="measure mt-7 text-[1.0625rem] leading-[1.8] text-mist">
                  The Future Ventures page is built to grow. Each entry carries
                  a status, and the status is the honest part — it tells you
                  exactly how far along something is, without a press release
                  in between.
                </p>
                <div className="mt-10">
                  <Button href="/portfolio" variant="secondary" size="sm" withArrow>
                    See the current entries
                  </Button>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <dl className="flex flex-col">
                {statusOrder.map((status, index) => (
                  <Reveal
                    key={status}
                    delay={index * 70}
                    className="flex flex-col gap-3 border-t border-tide/70 py-6 sm:flex-row sm:items-start sm:gap-8"
                  >
                    <dt className="sm:w-40 sm:shrink-0">
                      <Badge status={status} />
                    </dt>
                    <dd className="text-[0.9375rem] leading-[1.75] text-mist">
                      {statusMeta[status].description}
                    </dd>
                  </Reveal>
                ))}
              </dl>

              <Reveal delay={280}>
                <p className="mt-8 text-sm leading-relaxed text-haze">
                  When a venture begins trading it moves to <em>Live</em>, gains
                  its own link, and appears with its real name. Until then,
                  everything you see is a working name attached to work in
                  progress.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* FAQ                                                               */}
      {/* ---------------------------------------------------------------- */}
      <Section id="faq" aria-labelledby="faq-heading">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <Reveal>
                <Eyebrow>Frequently asked</Eyebrow>
                <h2
                  id="faq-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl"
                >
                  The questions we get most.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-8">
              <Reveal delay={100}>
                <FAQ items={faqs} />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      <CTABlock
        eyebrow="Bring us something"
        title="If you are already doing the difficult part, we are interested."
        body={
          <p>
            Operators, makers and founders with a real customer and a real
            constraint are the most useful conversation we can have. Tell us
            what stage you are at and what you need that is not money.
          </p>
        }
        secondary={{ label: "Read the philosophy", href: "/philosophy" }}
      />
    </>
  );
}
