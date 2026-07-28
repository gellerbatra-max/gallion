import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { CTABlock } from "@/components/sections/CTABlock";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Timeline } from "@/components/Timeline";
import { MarkedRule } from "@/components/visuals/Atmosphere";
import { CompassRose } from "@/components/visuals/CompassRose";

import { milestones } from "@/content/journey";
import { team } from "@/content/team";
import { contact } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "About Gelian",
  description:
    "Gelian is a privately held venture platform based in Colombo — a holding vehicle for brands and businesses built between Sri Lanka and global markets.",
  path: "/about",
});

const structure = [
  {
    tier: "The platform",
    name: "Gelian",
    body: "Holds equity, allocates capital, sets the standard and provides shared capability — brand, narrative, market access and governance.",
  },
  {
    tier: "The ventures",
    name: "Separate companies",
    body: "Each incorporated in its own right, with its own name, leadership and P&L. They are built to stand without us, and to be judged on their own terms.",
  },
  {
    tier: "The relationship",
    name: "Owner, not operator",
    body: "We are close in the first years and deliberately distant after. A venture that needs the platform to function has not finished being built.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Gelian"
        title="A holding company for things worth carrying."
        lede={
          <p>
            Gelian is a privately held venture platform founded in Colombo. We
            build, back and hold companies that move between Sri Lanka and the
            wider world — and we are honest that most of that work is still
            ahead of us.
          </p>
        }
        meta={[
          { label: "Founded", value: "2024" },
          { label: "Structure", value: "Private holding platform" },
          { label: "Home port", value: `${contact.offices[0].city}, Sri Lanka` },
          { label: "Horizon", value: "Ten years, minimum" },
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Identity                                                          */}
      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="identity-heading">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>The name</Eyebrow>
                <h2
                  id="identity-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.9rem]"
                >
                  Named for the vessel, not the voyage.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={100} className="flex flex-col gap-6">
                <p className="measure text-lg leading-[1.75] text-sand/90">
                  Gelian takes its name from the galleon — the ocean-going ship
                  that made long-distance trade ordinary. It is a deliberate
                  choice of metaphor, and a specific one.
                </p>
                <p className="measure text-[1.0625rem] leading-[1.8] text-mist">
                  A galleon was not romantic. It was a piece of commercial
                  infrastructure: expensive to build, slow to load, and capable
                  of carrying value across distances that had previously
                  defeated it. It made places legible to one another. It also
                  required a crew that knew what it was doing, a route worth
                  running, and an owner patient enough to wait out the weather.
                </p>
                <p className="measure text-[1.0625rem] leading-[1.8] text-mist">
                  That is the company we are trying to be. Not the cargo, not
                  the destination — the thing that makes the crossing possible,
                  reliably, more than once.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Structure                                                         */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="raised" bordered aria-labelledby="structure-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow="The structure"
            title={
              <span id="structure-heading">
                A platform above, real companies below.
              </span>
            }
            lede={
              <p>
                Gelian is a holding vehicle rather than an operating business.
                That distinction matters more than it sounds, because it decides
                what we are able to do when a venture needs time, and what
                happens when one does not work.
              </p>
            }
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {structure.map((item, index) => (
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
              In practice this means a venture can be funded through the years
              before it earns, wound down without damaging the others, or sold
              on its own if that is the right outcome for the people running it.
              It also means the platform carries the cost of the standard —
              brand, narrative, governance — so a young company does not have to.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Founding philosophy — narrative                                   */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="xl" className="overflow-hidden" aria-labelledby="origin-heading">
        <CompassRose
          className="pointer-events-none absolute -top-40 -left-52 w-[44rem] text-brass/[0.035]"
        />
        <Container size="narrow" className="relative">
          <Reveal>
            <Eyebrow>The founding idea</Eyebrow>
            <h2
              id="origin-heading"
              className="mt-6 text-3xl leading-[1.14] sm:text-4xl"
            >
              Exploration, trade, curation, growth — in that order.
            </h2>
          </Reveal>

          <Reveal delay={100} className="mt-10 flex flex-col gap-7">
            <p className="text-[1.0625rem] leading-[1.85] text-mist">
              <span className="text-sand">Exploration</span> comes first because
              conviction that arrives early is usually borrowed. We spend an
              unreasonable amount of time on the ground — with growers, cutters,
              operators, engineers and buyers — before we have a view worth
              defending. Most of what we learn closes a file rather than opens
              one, and that is the point.
            </p>
            <p className="text-[1.0625rem] leading-[1.85] text-mist">
              <span className="text-sand">Trade</span> is the mechanism. Not
              trade as an abstraction, but the specific, unglamorous work of
              moving a good thing from where it is made to where it is valued —
              and keeping ownership of the relationship at the far end. That
              last clause is the entire difference between a supplier and a
              business.
            </p>
            <p className="text-[1.0625rem] leading-[1.85] text-mist">
              <span className="text-sand">Curation</span> is what stops a
              platform becoming a portfolio of accidents. We would rather run
              three ventures that deserve our full attention than fifteen that
              receive a fraction of it. Saying no is not caution; it is the only
              way craft survives more than one company.
            </p>
            <p className="text-[1.0625rem] leading-[1.85] text-mist">
              <span className="text-sand">Growth</span> comes last deliberately.
              It is a consequence of the first three done properly, and it is
              the one most companies try to buy first. We are building for
              compounding rather than for velocity, which means accepting that
              the first several years look slower than they are.
            </p>
          </Reveal>

          <Reveal delay={180}>
            <MarkedRule className="mt-14" />
          </Reveal>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Long-term vision                                                  */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="raised" bordered aria-labelledby="vision-heading">
        <Container size="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <Reveal>
                <Eyebrow>The long view</Eyebrow>
                <h2
                  id="vision-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl lg:text-[2.9rem]"
                >
                  What this should look like in a decade.
                </h2>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <Reveal delay={100} className="flex flex-col gap-6">
                <p className="measure text-lg leading-[1.75] text-sand/90">
                  A small group of companies — perhaps six, perhaps fewer —
                  each recognisable in its own market, each profitable enough to
                  choose its own pace, and each unmistakably from here.
                </p>
                <p className="measure text-[1.0625rem] leading-[1.8] text-mist">
                  We would like at least one of them to have changed how a
                  category thinks about Sri Lanka: to have made &lsquo;made
                  here&rsquo; a reason to pay more rather than a reason to
                  negotiate. We would like the people who supplied us in year
                  one to still be supplying us in year ten, on better terms. And
                  we would like the platform to be the least interesting part of
                  the story, because the ventures have outgrown it.
                </p>
                <p className="measure text-[1.0625rem] leading-[1.8] text-mist">
                  Everything on this website should be read against that
                  horizon. We are at the beginning of it.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Journey                                                           */}
      {/* ---------------------------------------------------------------- */}
      <Section aria-labelledby="journey-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow="The journey so far"
            title={<span id="journey-heading">A short log.</span>}
            lede={
              <p>
                Entries marked planned are intentions, not achievements. We will
                update this page as they become one or the other.
              </p>
            }
          />

          <div className="mt-16">
            <Timeline milestones={milestones} />
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* People                                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section tone="raised" bordered aria-labelledby="people-heading">
        <Container size="wide">
          <SectionHeading
            eyebrow="Stewardship"
            title={<span id="people-heading">Who is accountable.</span>}
            lede={
              <p>
                A deliberately small group. Ventures get their own leadership as
                they mature; the platform stays lean by design.
              </p>
            }
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {team.map((person, index) => (
              <Reveal key={person.name} delay={index * 90} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-tide/70 bg-hull/40 p-8">
                  <div className="flex items-center gap-4">
                    <span
                      aria-hidden="true"
                      className="flex size-12 shrink-0 items-center justify-center rounded-full border border-brass/40 font-display text-sm tracking-[0.15em] text-brass"
                    >
                      {person.initials}
                    </span>
                    <div>
                      <h3 className="text-xl leading-tight">{person.name}</h3>
                      <p className="label mt-2 text-haze">{person.role}</p>
                    </div>
                  </div>

                  <p className="mt-7 text-[0.9375rem] leading-[1.75] text-mist">
                    {person.bio}
                  </p>

                  <div className="mt-auto border-t border-tide/60 pt-6">
                    <p className="label text-haze">Focus</p>
                    <p className="mt-2.5 text-sm text-sand/80">{person.focus}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CTABlock
        eyebrow="Get in touch"
        title="We are easier to reach than most holding companies."
        body={
          <p>
            If you are an operator, a maker, an investor or simply someone who
            has thought hard about the same problem, write to us. We read
            everything and reply to anything serious.
          </p>
        }
        secondary={{ label: "See what we're exploring", href: "/portfolio" }}
      />
    </>
  );
}
