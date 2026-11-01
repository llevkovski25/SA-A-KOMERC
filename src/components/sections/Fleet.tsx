import { getTranslations } from "next-intl/server";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import AnimatedStat from "@/components/ui/AnimatedStat";
import Emphasize from "@/components/ui/Emphasize";
import SectionHeading from "@/components/ui/SectionHeading";

export default async function Fleet() {
  const t = await getTranslations("fleet");

  const stats = [
    { value: t("stats.trucks"), label: t("stats.trucksLabel") },
    { value: t("stats.capacity"), label: t("stats.capacityLabel") },
    { value: t("stats.standard"), label: t("stats.standardLabel") },
    { value: t("stats.partner"), label: t("stats.partnerLabel") },
  ];

  return (
    <section id="fleet" className="section-pad bg-white">
      <div className="container-page">
        <SectionHeading title={t("title")} />

        <Reveal delay={0.1} className="mx-auto mt-5 max-w-3xl space-y-3 text-[15px] md:mt-6 md:space-y-4 md:text-center leading-relaxed text-[var(--color-ink)]/80">
          <p><Emphasize text={t("paragraph1")} /></p>
          <p><Emphasize text={t("paragraph2")} /></p>
        </Reveal>

        <RevealGroup className="mx-auto mt-6 grid max-w-4xl grid-cols-2 gap-3 md:mt-10 md:grid-cols-4 md:gap-4" stagger={0.15}>
          {stats.map((stat) => (
            <RevealItem key={stat.label}>
              <div className="h-full rounded-xl bg-[var(--color-navy-800)] p-3.5 text-center md:p-5 transition-transform duration-300 hover:-translate-y-2 hover:scale-105">
                <p className="font-[family-name:var(--font-heading)] text-xl font-extrabold text-[var(--color-amber)] md:text-2xl">
                  <AnimatedStat value={stat.value} />
                </p>
                <p className="mt-1.5 text-xs font-bold text-white md:text-sm">{stat.label}</p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
