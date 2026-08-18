"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Truck, Route, Network, Plus, ArrowRight, Check } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const icons = { truck: Truck, route: Route, network: Network };

export type ServiceItem = {
  key: "transport" | "forwarding" | "trucking";
  slug: string;
  icon: keyof typeof icons;
  title: string;
  summary: string;
  detail: string;
  bullets: string[];
};

export default function ServicesClient({
  items,
  learnMoreLabel,
  showLessLabel,
  viewDetailsLabel,
}: {
  items: ServiceItem[];
  learnMoreLabel: string;
  showLessLabel: string;
  viewDetailsLabel: string;
}) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  return (
    <RevealGroup className="mt-14 grid gap-6 lg:grid-cols-3" stagger={0.12}>
      {items.map((item) => {
        const Icon = icons[item.icon];
        const isOpen = openKey === item.key;
        return (
          <RevealItem key={item.key} className={cn(isOpen && "lg:col-span-3")}>
            <motion.div
              layout
              transition={{ layout: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } }}
              className={cn(
                "h-full overflow-hidden rounded-3xl border border-[var(--color-border)] bg-white shadow-sm shadow-black/[0.03] transition-shadow hover:shadow-lg hover:shadow-black/[0.06]",
                isOpen && "lg:grid lg:grid-cols-2"
              )}
            >
              <div className="p-7 md:p-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-navy-800)]/8 text-[var(--color-navy-700)]">
                  <Icon size={26} strokeWidth={1.75} />
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-heading)] text-xl font-bold text-[var(--color-ink)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--color-ink)]/70">
                  {item.summary}
                </p>
                <button
                  type="button"
                  onClick={() => setOpenKey(isOpen ? null : item.key)}
                  aria-expanded={isOpen}
                  className="mt-6 flex cursor-pointer items-center gap-2 text-sm font-semibold text-[var(--color-navy-700)] transition-colors hover:text-[var(--color-navy-600)]"
                >
                  <span
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full bg-[var(--color-navy-700)]/10 transition-transform duration-300",
                      isOpen && "rotate-45"
                    )}
                  >
                    <Plus size={15} />
                  </span>
                  {isOpen ? showLessLabel : learnMoreLabel}
                </button>
              </div>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    key="detail"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-[var(--color-border)] bg-[var(--color-surface-alt)] lg:border-l lg:border-t-0"
                  >
                    <div className="p-7 md:p-8">
                      <p className="text-sm leading-relaxed text-[var(--color-ink)]/75 md:text-[15px]">
                        {item.detail}
                      </p>
                      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                        {item.bullets.map((bullet) => (
                          <li
                            key={bullet}
                            className="flex items-start gap-2 text-sm text-[var(--color-ink)]/80"
                          >
                            <Check
                              size={16}
                              className="mt-0.5 shrink-0 text-[var(--color-navy-600)]"
                            />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/services/${item.slug}`}
                        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--color-navy-700)] transition-colors hover:text-[var(--color-navy-600)]"
                      >
                        {viewDetailsLabel}
                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </RevealItem>
        );
      })}
    </RevealGroup>
  );
}
