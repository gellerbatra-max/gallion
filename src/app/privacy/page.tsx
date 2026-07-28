import type { Metadata } from "next";

import { PageHeader } from "@/components/sections/PageHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";

import { site, contact } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How Gelian collects, uses and protects personal information submitted through this website.",
  path: "/privacy",
});

/**
 * TEMPLATE COPY. This is a professional, general-purpose privacy policy for a
 * small brochure website with a contact form and a mailing list. It is not
 * legal advice and has not been reviewed by a lawyer. Have counsel check it
 * against your actual data practices and jurisdiction before launch.
 */
const LAST_UPDATED = "1 June 2026";

export default function PrivacyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy Policy"
        lede={
          <p>
            We collect as little as we can, keep it only as long as it is
            useful, and never sell it. This page explains the detail behind
            that.
          </p>
        }
        meta={[
          { label: "Last updated", value: LAST_UPDATED },
          { label: "Applies to", value: "This website" },
          { label: "Controller", value: site.legalName },
          { label: "Contact", value: contact.general },
        ]}
      />

      <Section spacing="lg">
        <Container size="narrow">
          <Reveal>
            <Prose>
              <p>
                This policy explains how {site.legalName} (&ldquo;Gelian&rdquo;,
                &ldquo;we&rdquo;, &ldquo;us&rdquo;) handles personal information
                collected through {site.url} and through direct correspondence
                with us. By using this website you agree to the practices set
                out below.
              </p>

              <h2>1. Who we are</h2>
              <p>
                Gelian is a privately held venture platform registered in Sri
                Lanka, with its registered office in {contact.offices[0].city}.
                For the purposes of applicable data protection law, Gelian is
                the controller of the personal information described in this
                policy. Questions about this policy or about how we handle your
                information should go to{" "}
                <a href={`mailto:${contact.general}`}>{contact.general}</a>.
              </p>

              <h2>2. Information we collect</h2>
              <p>We collect three categories of information.</p>
              <ul>
                <li>
                  <strong>Information you give us.</strong> When you complete
                  the contact form we collect your name, email address, the
                  organisation you name, the enquiry type you select and the
                  content of your message. When you subscribe to our dispatch we
                  collect your email address.
                </li>
                <li>
                  <strong>Information sent automatically.</strong> Like most
                  websites, our hosting provider records technical information
                  when a page is requested — including IP address, browser and
                  device type, referring page and timestamps. This is used for
                  security, diagnostics and aggregate traffic measurement.
                </li>
                <li>
                  <strong>Correspondence.</strong> If you email, call or message
                  us, we keep a record of that correspondence so we can respond
                  and maintain continuity in the relationship.
                </li>
              </ul>
              <p>
                We do not knowingly collect special category data (such as
                health, religious or biometric information), and we ask that you
                do not include such information in messages to us.
              </p>

              <h2>3. How we use it</h2>
              <ul>
                <li>To reply to your enquiry and continue the conversation.</li>
                <li>
                  To send the dispatch, where you have asked to receive it.
                </li>
                <li>
                  To maintain records of business contacts, opportunities and
                  partners.
                </li>
                <li>
                  To operate, secure and improve this website, and to detect and
                  prevent abuse.
                </li>
                <li>
                  To comply with legal, regulatory and accounting obligations.
                </li>
              </ul>
              <p>
                We do not use your information for automated decision-making or
                profiling, and we do not sell, rent or trade personal
                information to anyone.
              </p>

              <h2>4. Our lawful basis</h2>
              <p>
                Where data protection law requires a lawful basis, we rely on:
                your <strong>consent</strong> for the dispatch, which you may
                withdraw at any time; our <strong>legitimate interests</strong>{" "}
                in responding to enquiries, running our business and securing
                our systems; and <strong>legal obligation</strong> where we are
                required to retain records.
              </p>

              <h2>5. Cookies and analytics</h2>
              <p>
                This website does not use advertising cookies, cross-site
                tracking pixels or third-party marketing tags. Any cookie set is
                strictly necessary for the site to function. If we later
                introduce privacy-respecting analytics, we will update this
                policy and, where required, ask for your consent first.
              </p>

              <h2>6. Who we share it with</h2>
              <p>
                We share personal information only with service providers who
                help us operate — our website host, our email provider and, if
                applicable, our mailing list provider — and only to the extent
                they need it to perform that service. These providers act on our
                instructions and are bound by confidentiality obligations. We
                may also disclose information where required by law, court order
                or a regulator, or where necessary to establish or defend legal
                claims.
              </p>

              <h2>7. International transfers</h2>
              <p>
                Our service providers may process information outside Sri Lanka,
                including in the European Union and the United States. Where
                information is transferred internationally, we take reasonable
                steps to ensure an appropriate level of protection, including
                contractual safeguards with those providers.
              </p>

              <h2>8. How long we keep it</h2>
              <ul>
                <li>
                  <strong>Contact form enquiries:</strong> up to 24 months from
                  our last exchange, unless the enquiry becomes an ongoing
                  business relationship.
                </li>
                <li>
                  <strong>Dispatch subscriptions:</strong> until you
                  unsubscribe, plus a short suppression record so we do not
                  contact you again in error.
                </li>
                <li>
                  <strong>Server logs:</strong> typically no more than 90 days.
                </li>
              </ul>

              <h2>9. Security</h2>
              <p>
                This website is served over encrypted connections, and access to
                enquiry data is limited to the small number of people at Gelian
                who need it. No system is perfectly secure, and we cannot
                guarantee the security of information transmitted over the
                internet, but we take reasonable technical and organisational
                measures appropriate to the sensitivity of the information we
                hold.
              </p>

              <h2>10. Your rights</h2>
              <p>
                Depending on where you are located, you may have the right to
                request access to the personal information we hold about you; to
                have inaccurate information corrected; to request erasure; to
                object to or restrict certain processing; to receive a copy of
                information you provided in a portable format; and to withdraw
                consent at any time. To exercise any of these, write to{" "}
                <a href={`mailto:${contact.general}`}>{contact.general}</a>. We
                will respond within the period required by applicable law, and
                may need to verify your identity first. If you are unsatisfied
                with our response, you may complain to the relevant supervisory
                authority in your jurisdiction.
              </p>

              <h2>11. Unsubscribing</h2>
              <p>
                Every dispatch includes an unsubscribe link. You can also email
                us and we will remove you promptly. Unsubscribing from the
                dispatch does not affect correspondence relating to an active
                enquiry or business relationship.
              </p>

              <h2>12. Children</h2>
              <p>
                This website is intended for a professional audience and is not
                directed at children. We do not knowingly collect information
                from anyone under 16. If you believe a child has provided us
                with personal information, contact us and we will delete it.
              </p>

              <h2>13. Other websites</h2>
              <p>
                This site links to third-party websites, including social
                platforms and, in future, the websites of individual Gelian
                ventures. We are not responsible for the privacy practices of
                those sites, and we encourage you to read their policies.
              </p>

              <h2>14. Changes to this policy</h2>
              <p>
                We may update this policy as our practices or the law change.
                The version in force is the one published here, with the date
                shown at the top of this page. Material changes will be flagged
                on this page for a reasonable period.
              </p>

              <h2>15. Contact</h2>
              <p>
                {site.legalName}
                <br />
                {contact.offices[0].note}, {contact.offices[0].city},{" "}
                {contact.offices[0].country}
                <br />
                <a href={`mailto:${contact.general}`}>{contact.general}</a>
              </p>
            </Prose>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
