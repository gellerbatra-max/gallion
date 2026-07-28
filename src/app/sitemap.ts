import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { insights } from "@/content/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: Array<{
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly" | "yearly";
  }> = [
    { path: "", priority: 1, changeFrequency: "monthly" },
    { path: "/about", priority: 0.9, changeFrequency: "monthly" },
    { path: "/philosophy", priority: 0.8, changeFrequency: "yearly" },
    { path: "/ventures", priority: 0.9, changeFrequency: "monthly" },
    { path: "/portfolio", priority: 0.9, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
    { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  const now = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${site.url}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...insights.map((insight) => ({
      url: `${site.url}/insights/${insight.slug}`,
      lastModified: new Date(`${insight.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
