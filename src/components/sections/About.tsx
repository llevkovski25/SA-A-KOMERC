import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Target, Eye } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export default async function About() {
  const t = await getTranslations("about");

  return (
    <section id="about" className="section-pad bg-white">
      <div className="container-page grid gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl shadow-2xl shadow-black/10 lg:max-w-none">
            <Image
              src="/images/gallery/gallery-12.jpg"
              alt="Саша Спасовски во канцеларијата на САША КОМЕРЦ"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
          </div>
          <div className="absolute -bottom-8 -right-4 flex h-28 w-28 items-center justify-center rounded-2xl bg-white p-4 shadow-xl shadow-black/10 sm:-right-8 sm:h-36 sm:w-36">
            <Image
              src="/images/logo/logo-emblem.png"
              alt=""
              width={500}
              height={245}
              className="h-full w-full object-contain"
            />
          </div>
          <div className="absolute left-4 top-4 rounded-2xl bg-[var(--color-navy-800)] px-5 py-3 text-white shadow-lg sm:left-8 sm:top-8">
            <p className="font-[family-name:var(--font-heading)] text-2xl font-extrabold leading-none">
              1992
            </p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-navy-600)]">
              {t("eyebrow")}
            </span>
            <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl">
              {t("title")}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-6 space-y-4 text-[15px] leading-relaxed text-[var(--color-ink)]/75 md:text-base">
            <p>{t("paragraph1")}</p>
            <p>{t("paragraph2")}</p>
            <p>{t("paragraph3")}</p>
          </Reveal>

          <RevealGroup className="mt-10 grid gap-5 sm:grid-cols-2" stagger={0.12}>
            <RevealItem className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6">
              <Target className="text-[var(--color-navy-600)]" size={24} />
              <h3 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-ink)]">
                {t("missionTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/70">
                {t("missionText")}
              </p>
            </RevealItem>
            <RevealItem className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6">
              <Eye className="text-[var(--color-navy-600)]" size={24} />
              <h3 className="mt-3 font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-ink)]">
                {t("visionTitle")}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/70">
                {t("visionText")}
              </p>
            </RevealItem>
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
