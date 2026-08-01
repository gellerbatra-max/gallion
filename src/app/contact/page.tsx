import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading, Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";

import { contact } from "@/content/site";
import { contactContent } from "@/content/contact";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: contactContent.seo.title,
  description: contactContent.seo.description,
  path: "/contact",
});

export default function ContactPage() {
  const { header, form, details, collaboration } = contactContent;

  return (
    <>
      <PageHeader
        eyebrow={header.eyebrow}
        title={header.title}
        lede={<p>{header.lede}</p>}
        meta={header.meta}
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
                <Eyebrow>{form.eyebrow}</Eyebrow>
                <h2
                  id="form-heading"
                  className="mt-6 text-3xl leading-[1.14] sm:text-4xl"
                >
                  {form.title}
                </h2>
                <p className="measure mt-6 text-[1.0625rem] leading-[1.8] text-mist">
                  {form.body}
                </p>
              </Reveal>

              <Reveal delay={120} className="mt-12">
                <ContactForm topics={form.topics} />
              </Reveal>
            </div>

            {/* Details */}
            <div className="lg:col-span-5">
              <Reveal delay={80}>
                <div className="flex flex-col gap-10 rounded-2xl border border-tide/70 bg-hull/30 p-8 sm:p-10">
                  <div>
                    <p className="label text-haze">{details.directLabel}</p>
                    <ul className="mt-5 flex flex-col gap-4">
                      <li className="flex flex-col gap-1">
                        <span className="text-xs text-haze">
                          {details.generalNote}
                        </span>
                        <a
                          href={`mailto:${contact.general}`}
                          className="link-draw w-fit text-ivory transition-colors hover:text-brass"
                        >
                          {contact.general}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-tide/60 pt-8">
                    <p className="label text-haze">{details.phoneLabel}</p>
                    <ul className="mt-5 flex flex-col gap-4">
                      <li className="flex flex-col gap-1">
                        <span className="text-xs text-haze">
                          {details.whatsappNote}
                        </span>
                        <a
                          href={contact.whatsapp}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="link-draw w-fit text-ivory transition-colors hover:text-brass"
                        >
                          {details.whatsappLabel}
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="border-t border-tide/60 pt-8">
                    <p className="label text-haze">{details.locationLabel}</p>
                    <ul className="mt-5 flex flex-col gap-6">
                      {contact.offices.map((office) => (
                        <li key={office.city} className="flex flex-col gap-1.5">
                          <span className="font-display text-xl leading-none">
                            {office.city}
                          </span>
                          <span className="text-sm text-mist">
                            {office.country}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-6 text-xs leading-relaxed text-haze">
                      {details.locationNote}
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
            eyebrow={collaboration.eyebrow}
            title={<span id="collaboration-heading">{collaboration.title}</span>}
            lede={<p>{collaboration.lede}</p>}
          />

          <div className="mt-16 grid gap-x-12 gap-y-12 sm:grid-cols-2">
            {collaboration.items.map((item, index) => (
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

          <Reveal delay={280}>
            <p className="measure mt-14 border-t border-tide/60 pt-8 text-sm leading-[1.8] text-haze">
              {collaboration.declineNote}
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
