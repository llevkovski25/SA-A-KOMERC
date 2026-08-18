import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import HeroBackground from "./HeroBackground";
import { Reveal } from "@/components/ui/Reveal";
import AnimatedStat from "@/components/ui/AnimatedStat";

export default async function Hero() {
  const t = await getTranslations("hero");

  const stats = [
    { value: t("trust.years"), label: t("trust.yearsLabel") },
    { value: t("trust.trucks"), label: t("trust.trucksLabel") },
    { value: t("trust.countries"), label: t("trust.countriesLabel") },
    { value: t("trust.support"), label: t("trust.supportLabel") },
  ];

  return (
    <section
      id="hero"
      className="relative flex min-h-dvh flex-col justify-end overflow-hidden bg-[var(--color-surface-dark)] pt-28"
    >
      <HeroBackground />

      <div className="container-page relative z-10 flex flex-1 flex-col justify-center pb-16">
        <Reveal>
          <span className="inline-flex w-fit items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-sm md:text-sm">
            {t("eyebrow")}
          </span>
        </Reveal>

        <Reveal delay={0.1}>
          <h1 className="mt-6 max-w-4xl text-4xl font-extrabold leading-[1.08] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {t("title")}
          </h1>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
            {t("subtitle")}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="rounded-full bg-[var(--color-navy-600)] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[var(--color-navy-600)]/30 transition-all hover:scale-[1.02] hover:bg-[var(--color-navy-500)] active:scale-[0.98] md:text-base"
            >
              {t("ctaPrimary")}
            </a>
            <a
              href="#about"
              className="rounded-full border border-white/40 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:scale-[1.02] hover:border-white hover:bg-white/15 active:scale-[0.98] md:text-base"
            >
              {t("ctaSecondary")}
            </a>
          </div>
        </Reveal>
      </div>

      <div className="container-page relative z-10 border-t border-white/15 py-8">
        <Reveal delay={0.35}>
          <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-[family-name:var(--font-heading)] text-3xl font-extrabold text-white md:text-4xl">
                  <AnimatedStat value={stat.value} />
                </dd>
                <dd className="mt-1 text-xs text-white/65 md:text-sm">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      <div className="absolute bottom-2 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-1 text-white/50 md:flex">
        <ChevronDown size={18} className="animate-bounce" />
      </div>
    </section>
  );
}
