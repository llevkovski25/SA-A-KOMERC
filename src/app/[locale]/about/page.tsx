import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import About from "@/components/sections/About";
import Team from "@/components/sections/Team";
import PageBanner from "@/components/ui/PageBanner";
import { pageMetadata } from "@/lib/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "about");
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const tNav = await getTranslations("nav");

  return (
    <>
      <PageBanner title={tNav("about")} image="/images/features/feature-transport-network.jpg" />
      <About />
      <Team />
    </>
  );
}
