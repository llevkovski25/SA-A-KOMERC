import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import AnimatedStat from "@/components/ui/AnimatedStat";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Emphasize from "@/components/ui/Emphasize";
import GrowLine from "@/components/ui/GrowLine";

export default async function AboutBand() {
  const t = await getTranslations("about");
  const tHero = await getTranslations("hero.trust");
  const tFleet = await getTranslations("fleet.stats");
  const tCommon = await getTranslations("common");

  const stats = [
    { value: tHero("years"), label: tHero("yearsLabel") },
    { value: tHero("trucks"), label: tHero("trucksLabel") },
    { value: tHero("countries"), label: tHero("countriesLabel") },
    { value: tHero("support"), label: tHero("supportLabel") },
  ];

  const highlights = [
    `${tFleet("partner")} ${tFleet("partnerLabel")}`,
    `${tFleet("standard")} ${tFleet("standardLabel")}`,
    `${tFleet("capacity")} ${tFleet("capacityLabel")}`,
  ];

  return (
    <section className="relative overflow-hidden bg-[var(--color-navy-900)]">
      <div className="absolute inset-0">
        <Image src="/images/fleet/fleet-hero.png" alt="" fill className="animate-kenburns object-cover opacity-25" sizes="100vw" />
      </div>

      <div className="container-page section-pad relative grid items-center gap-6 lg:grid-cols-2 lg:gap-16">
        <div>
          <AnimatedTitle
            text={t("title")}
            accentClassName="text-[var(--color-amber)] hover:text-white"
            className="text-[1.375rem] font-extrabold leading-tight text-white sm:text-3xl md:text-4xl"
          />
          <GrowLine className="mt-3 h-1 w-16 rounded-full bg-[var(--color-amber)] md:mt-4 md:h-1.5 md:w-20" />
          <Reveal delay={0.15}>
            <p className="mt-3 text-[15px] leading-relaxed text-white/90 md:mt-4 md:text-base">
              <Emphasize text={t("intro")} tone="dark" />
            </p>
            <ul className="mt-4 space-y-2 md:mt-6 md:space-y-2.5">
              {highlights.map((item) => (
                <li key={item} className="flex w-fit cursor-default items-center gap-2.5 text-sm font-bold text-white transition-all duration-300 hover:translate-x-2 hover:text-[var(--color-amber)]">
                  <CheckCircle2 size={20} className="shrink-0 text-[var(--color-amber)]" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="group mt-4 inline-flex items-center gap-1.5 py-1.5 text-sm font-extrabold text-[var(--color-amber)] md:mt-7"
            >
              {tCommon("readMore")}
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
            </Link>
          </Reveal>
        </div>

        <RevealGroup className="grid grid-cols-2 gap-3 md:gap-4" stagger={0.15}>
          {stats.map((stat) => (
            <RevealItem
              key={stat.label}
              className="rounded-xl border border-white/25 bg-white/10 p-3 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-amber)] hover:bg-white/15 md:p-7"
            >
              <p className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-[var(--color-amber)] md:text-5xl">
                <AnimatedStat value={stat.value} />
              </p>
              <p className="mt-1 text-[11px] font-bold uppercase leading-tight tracking-wide text-white md:mt-2 md:text-xs">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
