import { setRequestLocale } from "next-intl/server";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Destinations from "@/components/sections/Destinations";
import Fleet from "@/components/sections/Fleet";
import Partner from "@/components/sections/Partner";
import WhyUs from "@/components/sections/WhyUs";
import Team from "@/components/sections/Team";
import Gallery from "@/components/sections/Gallery";
import Contact from "@/components/sections/Contact";

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
      <About />
      <Services />
      <Destinations />
      <Fleet />
      <Partner />
      <WhyUs />
      <Team />
      <Gallery />
      <Contact />
    </>
  );
}
