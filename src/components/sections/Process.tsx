import { getTranslations } from "next-intl/server";
import { FileSearch, Route, PackageCheck, BadgeCheck } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const icons = [FileSearch, Route, PackageCheck, BadgeCheck];

export default async function Process() {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section id="process" className="section-pad bg-[var(--color-surface-alt)]">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-navy-600)]">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink)]/70">
            {t("subtitle")}
          </p>
        </Reveal>

        <RevealGroup
          className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.12}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-[var(--color-border)] lg:block"
          />
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <RevealItem key={step.title} className="relative">
                <div className="relative z-10 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[var(--color-navy-700)] shadow-md shadow-black/[0.06]">
                  <Icon size={26} strokeWidth={1.75} />
                  <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-navy-700)] text-xs font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-ink)]">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/70">
                  {step.description}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
