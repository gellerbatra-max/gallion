import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Prose } from "@/components/ui/Prose";
import { Reveal } from "@/components/ui/Reveal";

import { site, contact } from "@/content/site";
import { pageMeta } from "@/lib/seo";

export const metadata: Metadata = pageMeta({
  title: "Terms of Use",
  description:
    "The terms governing use of the Gelian website, including intellectual property, disclaimers and important disclosures about forward-looking statements.",
  path: "/terms",
});

/**
 * TEMPLATE COPY. General-purpose terms for a brochure website. Not legal
 * advice and not reviewed by a lawyer — have counsel adapt this to your
 * jurisdiction and actual practices before launch.
 */
const LAST_UPDATED = "2 August 2026";

const registeredOffice =
  contact.offices.find((office) => office.role === "Registered office") ??
  contact.offices[0];

export default function TermsPage() {
  return (
    <>
      <header className="border-b border-tide/50 pt-36 pb-14 sm:pt-44 sm:pb-16 lg:pt-48 lg:pb-20">
        <Container size="narrow">
          <Reveal>
            <h1 className="text-[2.5rem] leading-[1.08] sm:text-[3.25rem] lg:text-[4rem]">
              Terms of Use
            </h1>
          </Reveal>
        </Container>
      </header>

      <Section spacing="lg">
        <Container size="narrow">
          <Reveal>
            <Prose>
              <p>
                These terms govern your use of {site.url} (the
                &ldquo;site&rdquo;), operated by {site.legalName}
                (&ldquo;Gelian&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;). By
                accessing or using the site you agree to them. If you do not
                agree, please do not use the site.
              </p>

              <h2>1. About this site</h2>
              <p>
                The site is an informational presence for a privately held
                investment vehicle. It describes who we are, how we think, and
                the areas we are studying. It is not a transactional service,
                it does not host an account system, and it does not process
                payments.
              </p>

              <h2 id="disclosures">2. No offer, no advice</h2>
              <p>
                Nothing on this site constitutes, or should be construed as, an
                offer to sell or a solicitation of an offer to buy any security,
                partnership interest, fund unit or other financial instrument in
                any jurisdiction. Nothing here is investment, financial, legal,
                tax or accounting advice, and no fiduciary or advisory
                relationship is created by your use of the site or by
                corresponding with us.
              </p>
              <p>
                Gelian does not manage money for third parties, does not operate
                a collective investment scheme, and is not registered as an
                investment adviser or broker in any jurisdiction. If you are
                considering a commercial arrangement with us, take your own
                independent professional advice.
              </p>

              <h2>3. Forward-looking statements</h2>
              <p>
                Much of the content on this site is forward-looking. Ventures
                described as <strong>exploring</strong>,{" "}
                <strong>in development</strong> or <strong>coming soon</strong>{" "}
                are concepts and works in progress, not operating businesses.
                Working names are internal shorthand and are not registered
                brands, trading names or evidence of any commercial activity.
                Timelines, categories and intentions may change without notice,
                and several of the concepts described will not proceed.
              </p>
              <p>
                Nothing on this site is a representation about past performance,
                investment returns, revenue, assets under management, or the
                existence of commercial relationships with any named place,
                market or organisation. Corridors, markets and geographies are
                described as areas of interest only.
              </p>

              <h2>4. Accuracy of content</h2>
              <p>
                We take reasonable care to ensure the site is accurate at the
                time of publication, but we give no warranty that it is
                complete, current or error-free. Content may be changed,
                withdrawn or updated at any time without notice.
              </p>

              <h2>5. Intellectual property</h2>
              <p>
                All content on this site — including text, copy, design, visual
                identity, layout, illustrations, code and the Gelian name and
                marks — is owned by or licensed to Gelian and is protected by
                copyright and other intellectual property rights.
              </p>
              <p>
                You may view, download and print pages for your own information
                and internal business use. You may quote short extracts provided
                you attribute them to Gelian and link to the source page. You
                may not otherwise reproduce, republish, adapt, distribute or
                commercially exploit any part of the site, use it to train
                machine learning models, or use our name or marks without our
                prior written permission.
              </p>

              <h2>6. Acceptable use</h2>
              <ul>
                <li>
                  Do not use the site for any unlawful, fraudulent or harmful
                  purpose.
                </li>
                <li>
                  Do not attempt to gain unauthorised access to the site, its
                  servers or any connected system.
                </li>
                <li>
                  Do not introduce malicious code, or attempt to disrupt or
                  overload the site.
                </li>
                <li>
                  Do not scrape or harvest the site systematically, or use
                  automated means to submit the contact form.
                </li>
                <li>
                  Do not submit material through our forms that is unlawful,
                  defamatory, infringing or confidential to someone else.
                </li>
              </ul>

              <h2>7. Material you send us</h2>
              <p>
                If you send us an idea, proposal, business plan or other
                material through this site or by email, you do so on a
                non-confidential basis unless we have signed a written
                confidentiality agreement with you first. We consider a great
                many opportunities, and some will inevitably resemble one
                another. Submitting material to us creates no obligation on our
                part, no partnership, and no entitlement to compensation. You
                confirm that you have the right to send us anything you send.
              </p>

              <h2>8. Links to other sites</h2>
              <p>
                The site links to third-party websites, including social
                platforms and, in future, the websites of individual ventures. A
                link is not an endorsement, and we have no control over and
                accept no responsibility for the content, products or practices
                of any third-party site.
              </p>

              <h2>9. Availability</h2>
              <p>
                We do not guarantee that the site will be available
                uninterrupted or free from error. We may suspend, withdraw or
                restrict all or part of the site for business or operational
                reasons, and we will try to give reasonable notice where we can.
              </p>

              <h2>10. Disclaimers and liability</h2>
              <p>
                The site is provided &ldquo;as is&rdquo; and, to the fullest
                extent permitted by law, we exclude all warranties, conditions
                and representations, whether express or implied, in relation to
                it.
              </p>
              <p>
                To the fullest extent permitted by law, Gelian, its directors,
                officers, employees and agents will not be liable for any loss
                of profit, loss of business, loss of anticipated savings, loss of
                data, or any indirect or consequential loss arising out of or in
                connection with your use of, or inability to use, this site or
                your reliance on any content on it. Nothing in these terms
                excludes or limits liability that cannot lawfully be excluded or
                limited.
              </p>

              <h2>11. Privacy</h2>
              <p>
                Our handling of personal information is described in our{" "}
                <a href="/privacy">Privacy Policy</a>, which forms part of these
                terms.
              </p>

              <h2>12. Changes to these terms</h2>
              <p>
                We may amend these terms from time to time. These terms were
                last updated on {LAST_UPDATED}. The version in force is the one
                published on this page, and your continued use of the site after
                a change takes effect constitutes acceptance of the amended
                terms.
              </p>

              <h2>13. Governing law</h2>
              <p>
                These terms and any dispute arising from them are governed by
                the laws of the Democratic Socialist Republic of Sri Lanka, and
                the courts of Sri Lanka have exclusive jurisdiction, save that we
                retain the right to bring proceedings in the courts of the
                country in which you are resident or established.
              </p>

              <h2>14. Contact</h2>
              <p>
                {site.legalName}
                <br />
                {registeredOffice.city}, {registeredOffice.country}
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
