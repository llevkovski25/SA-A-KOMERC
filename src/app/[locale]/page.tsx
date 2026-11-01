import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import InfoStrip from "@/components/sections/InfoStrip";
import Services from "@/components/sections/Services";
import Marquee from "@/components/sections/Marquee";
import AboutBand from "@/components/sections/AboutBand";
import WhyUs from "@/components/sections/WhyUs";
import Destinations from "@/components/sections/Destinations";
import Process from "@/components/sections/Process";
import Team from "@/components/sections/Team";
import TrustCta from "@/components/sections/TrustCta";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <InfoStrip />
      <Services />
      <Marquee />
      <AboutBand />
      <WhyUs />
      <Destinations />
      <Process />
      <Team compact />
      <TrustCta />
    </>
  );
}
