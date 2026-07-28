import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Grain } from "@/components/visuals/Atmosphere";
import { site, contact, social } from "@/content/site";

/**
 * Type system.
 * Display — Cormorant Garamond: an old-style face with the proportions of
 * printed chart work. Text — Inter: neutral, legible, gets out of the way.
 */
const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.tagline}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "Gelian",
    "venture platform",
    "Sri Lanka",
    "holding company",
    "venture studio",
    "Colombo",
    "cross-border trade",
    "market entry Sri Lanka",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: site.url,
    siteName: site.name,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#04121A",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

/** Organisation schema — no claims beyond identity and contact details. */
const organisationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  description: site.description,
  foundingDate: String(site.founded),
  email: contact.general,
  address: {
    "@type": "PostalAddress",
    addressLocality: contact.offices[0].city,
    addressCountry: "LK",
  },
  sameAs: social.map((item) => item.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-GB"
      className={`${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-brass focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-abyss"
        >
          Skip to content
        </a>

        <Grain />
        <Header />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />

        <script
          type="application/ld+json"
          // Structured data is static and author-controlled.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organisationSchema),
          }}
        />
      </body>
    </html>
  );
}
