import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { serviceSlugs } from "@/lib/services";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    routes.push({
      url: `${siteConfig.url}/${locale}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.map((l) => [l, `${siteConfig.url}/${l}`])
        ),
      },
    });

    for (const service of serviceSlugs) {
      routes.push({
        url: `${siteConfig.url}/${locale}/services/${service.slug}`,
        lastModified: new Date(),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [
              l,
              `${siteConfig.url}/${l}/services/${service.slug}`,
            ])
          ),
        },
      });
    }
  }

  return routes;
}
