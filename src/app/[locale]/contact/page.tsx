import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Contact from "@/components/sections/Contact";
import PageBanner from "@/components/ui/PageBanner";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageBanner
        title={tNav("contact")}
        subtitle={t("title")}
        image="/images/features/feature-24-7-logistics.jpg"
      />
      <Contact />
    </>
  );
}
