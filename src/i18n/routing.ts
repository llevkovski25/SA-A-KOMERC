import { defineRouting } from "next-intl/routing";

export const locales = ["mk", "sr", "bg", "hr", "en", "de"] as const;

export type Locale = (typeof locales)[number];

export const localeLabels: Record<Locale, { name: string }> = {
  mk: { name: "Македонски" },
  sr: { name: "Српски" },
  bg: { name: "Български" },
  hr: { name: "Hrvatski" },
  en: { name: "English" },
  de: { name: "Deutsch" },
};

export const routing = defineRouting({
  locales,
  defaultLocale: "mk",
  localePrefix: "always",
  localeDetection: false,
});
