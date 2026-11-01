import { getTranslations } from "next-intl/server";
import { FileSearch, Route, PackageCheck, BadgeCheck } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Emphasize from "@/components/ui/Emphasize";
import GrowLine from "@/components/ui/GrowLine";
import SectionHeading from "@/components/ui/SectionHeading";

const icons = [FileSearch, Route, PackageCheck, BadgeCheck];

export default async function Process() {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as { title: string; description: string }[];

  return (
    <section id="process" className="section-pad bg-white">
      <div className="container-page">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <RevealGroup
          className="relative mt-6 grid gap-5 md:mt-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4"
          stagger={0.2}
        >
          {/* Vertical timeline on phones and tablets, horizontal line from lg up. */}
          <span
            aria-hidden
            className="pointer-events-none absolute bottom-6 left-[1.625rem] top-6 w-1 rounded-full bg-[var(--color-amber)] md:hidden"
          />
          <GrowLine
            delay={0.2}
            duration={1.6}
            className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[2.375rem] hidden h-1 rounded-full bg-[var(--color-amber)] lg:block"
          />
          {steps.map((step, i) => {
            const Icon = icons[i];
            return (
              <RevealItem
                key={step.title}
                className="group relative flex items-start gap-4 md:flex-col md:items-center md:gap-0 md:text-center"
              >
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[var(--color-navy-800)] text-white ring-4 ring-white transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                  <Icon strokeWidth={2} className="size-6 md:size-[30px]" />
                  <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-[var(--color-amber)] text-xs font-extrabold text-[var(--color-navy-900)] md:h-7 md:w-7 md:text-sm">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-[family-name:var(--font-heading)] text-base font-extrabold text-[var(--color-ink)] md:mt-4 md:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-[var(--color-ink)]/75 md:mt-2">
                    <Emphasize text={step.description} />
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
