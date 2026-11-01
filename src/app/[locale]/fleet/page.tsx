import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Fleet from "@/components/sections/Fleet";
import Partner from "@/components/sections/Partner";
import PageBanner from "@/components/ui/PageBanner";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "fleet");
}

export default async function FleetPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageBanner title={tNav("fleet")} image="/images/fleet/fleet-hero.png" />
      <Fleet />
      <Partner />
    </>
  );
}
