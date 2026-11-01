import { getTranslations } from "next-intl/server";
import { Clock, Award, ShieldCheck, UserRound, Handshake, Route } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Emphasize from "@/components/ui/Emphasize";
import SectionHeading from "@/components/ui/SectionHeading";

const icons = [Clock, Award, ShieldCheck, UserRound, Handshake, Route];

export default async function WhyUs() {
  const t = await getTranslations("whyUs");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <SectionHeading title={t("title")} />

        <RevealGroup className="mt-6 grid grid-cols-2 gap-3 md:mt-12 md:gap-5 lg:grid-cols-3" stagger={0.1}>
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <RevealItem key={item.title}>
                <div className="group flex h-full flex-col items-center rounded-2xl border-2 border-[var(--color-border)] bg-white p-3.5 text-center transition-all duration-300 hover:-translate-y-2 hover:border-[var(--color-amber)] hover:shadow-xl hover:shadow-[var(--color-amber)]/25 md:p-6">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-navy-800)] text-white transition-all duration-500 group-hover:rotate-[360deg] group-hover:scale-110 group-hover:bg-[var(--color-amber)] group-hover:text-[var(--color-navy-900)] md:h-16 md:w-16">
                    <Icon strokeWidth={2} className="size-[22px] md:size-[26px]" />
                  </span>
                  <h3 className="mt-2.5 font-[family-name:var(--font-heading)] text-sm font-extrabold leading-snug text-[var(--color-ink)] md:mt-4 md:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 hidden text-sm leading-relaxed text-[var(--color-ink)]/75 md:block">
                    <Emphasize text={item.description} />
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
