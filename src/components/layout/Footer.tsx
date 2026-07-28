import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "./Wordmark";
import { NewsletterForm } from "@/components/NewsletterForm";
import { site, footerNav, contact, social } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-auto border-t border-tide/60 bg-deep/40">
      <Container size="wide" className="py-16 lg:py-20">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          {/* Identity */}
          <div className="lg:col-span-4">
            <Wordmark showTagline />
            <p className="measure-tight mt-7 text-sm leading-relaxed text-mist">
              {site.mission}
            </p>

            <div className="mt-8 flex flex-col gap-1.5 text-sm">
              <a
                href={`mailto:${contact.general}`}
                className="link-draw w-fit text-ivory transition-colors hover:text-brass"
              >
                {contact.general}
              </a>
              <span className="text-haze">
                {contact.offices[0].city}, {contact.offices[0].country}
              </span>
            </div>
          </div>

          {/* Navigation */}
          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-5">
            {footerNav.map((group) => (
              <nav key={group.title} aria-label={group.title}>
                <h2 className="label text-haze">{group.title}</h2>
                <ul className="mt-5 flex flex-col gap-3">
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-mist transition-colors duration-400 hover:text-brass"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          {/* Dispatch */}
          <div className="lg:col-span-3">
            <NewsletterForm />
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-6 border-t border-tide/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-haze">
            &copy; {year} {site.legalName}. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {social.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-xs tracking-wide text-haze transition-colors hover:text-brass"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <Link
                href="/privacy"
                className="text-xs tracking-wide text-haze transition-colors hover:text-brass"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-xs tracking-wide text-haze transition-colors hover:text-brass"
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>

        <p className="mt-8 max-w-3xl text-[0.6875rem] leading-relaxed text-haze">
          Gelian is a privately held venture platform. Nothing on this website
          constitutes an offer to sell or a solicitation to buy any security, or
          investment advice of any kind. Ventures described as exploring, in
          development or coming soon are not operating businesses.
        </p>
      </Container>
    </footer>
  );
}
