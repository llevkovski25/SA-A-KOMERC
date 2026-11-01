import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Target, Eye } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Emphasize from "@/components/ui/Emphasize";
import GrowLine from "@/components/ui/GrowLine";

export default async function About() {
  const t = await getTranslations("about");

  return (
    <section id="about" className="section-pad bg-white">
      <div className="container-page">
        <div className="grid gap-6 md:gap-10 lg:grid-cols-5 lg:gap-14">
          <Reveal className="relative lg:col-span-2">
            <div className="relative mx-auto flex aspect-[2/1] w-full items-center justify-center rounded-2xl bg-[var(--color-surface-alt)] sm:aspect-square sm:max-w-sm lg:mx-0">
              <Image
                src="/images/logo/logo-emblem.png"
                alt="SAŠA KOMERC"
                width={500}
                height={245}
                className="animate-float w-1/2 object-contain sm:w-2/3"
              />
              <div className="absolute left-4 top-4 rounded-xl bg-[var(--color-amber)] px-4 py-2 text-[var(--color-navy-900)] shadow-lg">
                <p className="font-[family-name:var(--font-heading)] text-xl font-extrabold leading-none">
                  1992
                </p>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3">
            <AnimatedTitle
              text={t("title")}
              className="text-[1.375rem] font-extrabold leading-tight text-[var(--color-ink)] sm:text-3xl md:text-4xl"
            />
            <GrowLine className="mt-3 h-1 w-16 rounded-full bg-[var(--color-amber)] md:mt-4 md:h-1.5 md:w-20" />

            <Reveal delay={0.1} className="mt-5 space-y-4 text-[15px] leading-relaxed text-[var(--color-ink)]/80">
              <p><Emphasize text={t("paragraph1")} /></p>
              <p><Emphasize text={t("paragraph2")} /></p>
              <p><Emphasize text={t("paragraph3")} /></p>
            </Reveal>
          </div>
        </div>

        <RevealGroup className="mt-6 grid gap-3 md:mt-10 md:grid-cols-2 md:gap-5" stagger={0.15}>
          <RevealItem>
            <div className="h-full rounded-2xl bg-[var(--color-navy-800)] p-6 transition-transform duration-300 hover:-translate-y-2">
              <Target className="text-[var(--color-amber)]" size={30} />
              <h3 className="mt-3 font-[family-name:var(--font-heading)] text-xl font-extrabold text-white">
                {t("missionTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                <Emphasize text={t("missionText")} tone="dark" />
              </p>
            </div>
          </RevealItem>
          <RevealItem>
            <div className="h-full rounded-2xl bg-[var(--color-navy-800)] p-6 transition-transform duration-300 hover:-translate-y-2">
              <Eye className="text-[var(--color-amber)]" size={30} />
              <h3 className="mt-3 font-[family-name:var(--font-heading)] text-xl font-extrabold text-white">
                {t("visionTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/90">
                <Emphasize text={t("visionText")} tone="dark" />
              </p>
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}
