import { getTranslations } from "next-intl/server";
import { Clock, Award, ShieldCheck, UserRound, Handshake, Route } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

const icons = [Clock, Award, ShieldCheck, UserRound, Handshake, Route];

export default async function WhyUs() {
  const t = await getTranslations("whyUs");
  const items = t.raw("items") as { title: string; description: string }[];

  return (
    <section className="section-pad bg-[var(--color-surface-alt)]">
      <div className="container-page">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-navy-600)]">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-[var(--color-ink)] sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={0.1}>
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <RevealItem
                key={item.title}
                className="group rounded-2xl border border-[var(--color-border)] bg-white p-7 transition-all hover:-translate-y-1 hover:border-transparent hover:shadow-xl hover:shadow-black/[0.06]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-navy-800)]/8 text-[var(--color-navy-700)] transition-colors group-hover:bg-[var(--color-navy-700)] group-hover:text-white">
                  <Icon size={22} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--color-ink)]/70">
                  {item.description}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
