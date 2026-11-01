import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { serviceSlugs } from "@/lib/services";
import { siteConfig } from "@/lib/site";

const pages = [
  { path: "", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/fleet", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/contact", changeFrequency: "monthly" as const, priority: 0.8 },
  ...serviceSlugs.map((service) => ({
    path: `/services/${service.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  })),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routing.locales.flatMap((locale) =>
    pages.map((page) => ({
      url: `${siteConfig.url}/${locale}${page.path}`,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${siteConfig.url}/${l}${page.path}`])
        ),
      },
    }))
  );
}
