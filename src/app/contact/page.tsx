import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";

import { contact } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description:
    "Speak to Gelian about partnerships, joint ventures, market entry into Sri Lanka, supplier introductions or press. We reply to every serious enquiry within three working days.",
  path: "/contact",
});

const collaboration = [
  {
    title: "Operators & founders",
    body: "You are already doing the difficult part and the constraint is distribution, brand or capital rather than capability. This is the conversation we most want to have.",
  },
  {
    title: "Makers & suppliers",
    body: "Growers, cutters, weavers, workshops and small manufacturers in any of our six themes. We are building relationships years before we need them.",
  },
  {
    title: "Inbound market entry",
    body: "International operators looking at Sri Lanka who need a partner accountable for the outcome rather than a consultant accountable for a deck.",
  },
  {
    title: "Co-investors & partners",
    body: "Family offices, holding companies and operators with a complementary corridor. We share deals rarely and carefully, but we do share them.",
  },
  {
    title: "Specialists",
    body: "Certification, logistics, export finance, retail buying, hospitality operations. Occasional, well-scoped work with people who are genuinely expert.",
  },
  {
    title: "Press & speaking",
    body: "We speak on Sri Lankan categories, cross-border trade and long-horizon venture building — and decline more of these than we accept.",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Start a conversation."
        lede={
          <p>
            We are a small team and we read everything ourselves. Short and
            concrete beats long and polished — tell us what it is, who the
            customer is, and what you need that is not money.
          </p>
        }
        meta={[
          { label: "General", value: contact.general },
          { label: "Ventures", value: contact.ventures },
          { label: "Response", value: "Within 3 working days" },
          { label: "Home port", value: `${contact.offices[0].city}, Sri Lanka` },
        ]}
      />

      {/* ---------------------------------------------------------------- */}
      {/* Form + details                                                    */}
      {/* ---------------------------------------------------------------- */}
      <Section spacing="lg" aria-labelledby="form-heading">
        <Container size="wide">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-16">
            {/* Form */}
            <div className="lg:col-span-7">
              <Reveal>
                <Eyebrow>Write to us</Eyebrow>
                <h2
                  id="form-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl"
                >
                  Send a message.
                </h2>
                <p className="measure mt-6 text-[1.0625rem] leading-[1.8] text-mist">
                  {contact.responseTime} If we are not the right people, we will
                  say so quickly rather than leave you waiting.
                </p>
              </Reveal>

              <Reveal delay={120} className="mt-12">
                <ContactForm />
              </Reveal>
            </div>

            {/* Details */}
            <div className="lg:col-span-5">
              <Reveal delay={80}>
                <div className="flex flex-col gap-10 rounded-2xl border border-tide/70 bg-hull/30 p-8 sm:p-10">
                  <div>
                    <p className="label text-haze">Direct</p>
                    <ul className="mt-5 flex flex-col gap-4">
                      <li className="flex flex-col gap-1">
                        <span className="text-xs text-haze">
                          General enquiries
                        </span>
                        <a
                          href={`mailto:${contact.general}`}
                          className="link-draw w-fit text-ivory transition-colors hover:text-brass"
                        >
                          {contact.general}
                        </a>
                      </li>
                      <li className="flex flex-col gap-1">
                        <span className="text-xs text-haze">
                          Ventures &amp; opportunities
                        </span>
                        <a
                          href={`mailto:${contact.ventures}`}
                          className="link-draw w-fit text-ivory transition-colors hover:text-brass"
                        >
                          {contact.ventures}
                        </a>
                      </li>
                      <li className="flex flex-col gap-1">
                        <span className="text-xs text-haze">
                          Press &amp; speaking
                        </span>
                        <a
                          href={`mailto:${contact.press}`}
                          className="link-draw w-fit text-ivory transition-colors hover:text-brass"
                        >
                          {contact.press}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-tide/60 pt-8">
                    <p className="label text-haze">By phone</p>
                    <ul className="mt-5 flex flex-col gap-4">
                      <li className="flex flex-col gap-1">
                        <span className="text-xs text-haze">
                          Office &middot; weekdays, 09:00&ndash;17:30 (+05:30)
                        </span>
                        <a
                          href={contact.phoneHref}
                          className="link-draw w-fit text-ivory transition-colors hover:text-brass"
                        >
                          {contact.phone}
                        </a>
                      </li>
                      <li className="flex flex-col gap-1">
                        <span className="text-xs text-haze">
                          WhatsApp &middot; for introductions in transit
                        </span>
                        <a
                          href={contact.whatsapp}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="link-draw w-fit text-ivory transition-colors hover:text-brass"
                        >
                          Message on WhatsApp
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-tide/60 pt-8">
                    <p className="label text-haze">Where we are</p>
                    <ul className="mt-5 flex flex-col gap-6">
                      {contact.offices.map((office) => (
                        <li key={office.city} className="flex flex-col gap-1.5">
                          <span className="font-display text-xl leading-none">
                            {office.city}
                          </span>
                          <span className="text-sm text-mist">
                            {office.note}
                          </span>
                          <span className="text-xs text-haze">
                            {office.role} &middot; {office.coords}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-xs leading-relaxed text-haze">
                      Full registered address available on request. We meet by
                      appointment rather than drop-in.
                    </p>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------------- */}
      {/* Areas of collaboration                                            */}
      {/* ---------------------------------------------------------------- */}
      <Section
        id="collaboration"
        tone="raised"
        bordered
        aria-labelledby="collaboration-heading"
      >
        <Container size="wide">
          <SectionHeading
            eyebrow="Partnership types"
            title={
              <span id="collaboration-heading">
                Where a conversation is most likely to go somewhere.
              </span>
            }
            lede={
              <p>
                We are not trying to be reachable by everyone. These are the six
                kinds of enquiry we are genuinely set up to act on.
              </p>
            }
          />

          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {collaboration.map((item, index) => (
              <Reveal
                key={item.title}
                delay={(index % 3) * 90}
                className="border-t border-tide/70 pt-7"
              >
                <h3 className="text-xl leading-snug">{item.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-[1.75] text-mist">
                  {item.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={280}>
            <p className="measure mt-14 border-t border-tide/60 pt-8 text-sm leading-[1.8] text-haze">
              What we cannot help with: requests for donations or sponsorship,
              unsolicited agency and outsourcing pitches, and cold approaches
              asking us to invest in businesses outside the six themes. No
              offence intended in saying so — it saves everyone a week.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
