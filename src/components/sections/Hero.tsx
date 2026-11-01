import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";
import HeroBackground from "./HeroBackground";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Emphasize from "@/components/ui/Emphasize";
import GrowLine from "@/components/ui/GrowLine";

export default async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section
      id="hero"
      className="relative flex min-h-[68svh] items-center overflow-hidden bg-[var(--color-surface-dark)] lg:min-h-[calc(100svh-7.5rem)]"
    >
      <HeroBackground />

      <div className="container-wide relative z-10 pb-8 pt-20 md:pb-12 md:pt-32">
        <Reveal immediate>
          <p className="w-fit cursor-default text-xs font-bold uppercase tracking-wider text-[var(--color-amber)] transition-all duration-300 hover:tracking-widest hover:text-white md:text-base">
            {t("eyebrow")}
          </p>
        </Reveal>

        <AnimatedTitle
          as="h1"
          text={t("title")}
          delay={0.15}
          accentClassName="text-[var(--color-amber)] hover:text-white"
          className="mt-3 max-w-3xl text-[clamp(1.85rem,9vw,3.75rem)] font-extrabold leading-[1.1] text-white"
        />
        <GrowLine delay={0.6} className="mt-4 h-1 w-16 rounded-full bg-[var(--color-amber)] md:mt-5 md:h-1.5 md:w-20" />

        <Reveal immediate delay={0.45}>
          <p className="mt-4 max-w-xl text-[15px] font-medium leading-relaxed text-white/90 transition-colors duration-300 hover:text-white md:mt-5 md:text-lg">
            <Emphasize text={t("subtitle")} tone="dark" />
          </p>
        </Reveal>

        <Reveal immediate delay={0.6}>
          <Link
            href="/contact"
            className="btn-accent mt-6 inline-flex rounded-full px-8 py-3.5 text-sm md:mt-8 md:py-4 md:text-base"
          >
            {t("ctaPrimary")}
          </Link>
        </Reveal>
      </div>

      <ChevronDown
        aria-hidden
        size={28}
        className="absolute bottom-4 left-1/2 z-10 hidden -translate-x-1/2 animate-bounce text-white md:block"
      />
    </section>
  );
}
