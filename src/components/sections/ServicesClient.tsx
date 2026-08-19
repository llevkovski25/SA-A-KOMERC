"use client";

import { Truck, Route, Network, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";

const icons = { truck: Truck, route: Route, network: Network };

export type ServiceItem = {
  key: "transport" | "forwarding" | "trucking";
  slug: string;
  icon: keyof typeof icons;
  title: string;
  summary: string;
};

export default function ServicesClient({
  items,
  learnMoreLabel,
}: {
  items: ServiceItem[];
  learnMoreLabel: string;
}) {
  return (
    <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3" stagger={0.12}>
      {items.map((item) => {
        const Icon = icons[item.icon];
        return (
          <RevealItem key={item.key}>
            <Link
              href={`/services/${item.slug}`}
              className="group flex h-full flex-col rounded-3xl border border-[var(--color-border)] bg-white p-7 shadow-sm shadow-black/[0.03] transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-black/[0.06] md:p-8"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-navy-800)]/8 text-[var(--color-navy-700)]">
                <Icon size={26} strokeWidth={1.75} />
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--color-ink)]">
                {item.title}
              </h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--color-ink)]/70">
                {item.summary}
              </p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-navy-700)] transition-colors group-hover:text-[var(--color-navy-600)]">
                {learnMoreLabel}
                <ArrowRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1"
                />
              </span>
            </Link>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
