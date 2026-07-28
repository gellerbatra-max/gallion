import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  /** Overrides the default "Article"/"WebPage" OG type. */
  type?: "website" | "article";
  publishedTime?: string;
};

/**
 * Builds consistent per-page metadata. Titles flow through the template in
 * the root layout, so pass the bare page title here.
 */
export function pageMeta({
  title,
  description,
  path,
  type = "website",
  publishedTime,
}: PageMetaInput): Metadata {
  const url = `${site.url}${path}`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${site.name}`,
      description,
      url,
      siteName: site.name,
      type,
      locale: "en_GB",
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
    },
  };
}
