import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/lib/site";

export async function pageMetadata(
  locale: string,
  page: "about" | "fleet" | "contact"
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `meta.pages.${page}` });
  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    languages[l] = `${siteConfig.url}/${l}/${page}`;
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/${page}`,
      languages,
    },
  };
}
