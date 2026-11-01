"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Truck, Route, Network, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import Emphasize from "@/components/ui/Emphasize";
import { cn } from "@/lib/utils";

const icons = { transport: Truck, forwarding: Route, trucking: Network };

export type ServiceItem = {
  key: keyof typeof icons;
  slug: string;
  image: string;
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
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  function onScroll() {
    const el = scroller.current;
    if (!el || el.scrollWidth <= el.clientWidth) return;
    const progress = el.scrollLeft / (el.scrollWidth - el.clientWidth);
    setActive(Math.round(progress * (items.length - 1)));
  }

  return (
    <>
      {/* Swipeable on phones so the three services fit one screen; a grid from lg up. */}
      <div
        ref={scroller}
        onScroll={onScroll}
        className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-3 md:-mx-10 md:mt-12 md:scroll-px-10 md:px-10 lg:mx-0 lg:grid lg:snap-none lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        {items.map((item, i) => {
          const Icon = icons[item.key];
          return (
            <Reveal
              key={item.key}
              delay={i * 0.15}
              className="w-[84%] max-w-sm shrink-0 snap-start lg:w-auto lg:max-w-none"
            >
              <Link
                href={`/services/${item.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md shadow-black/10 transition-all duration-300 hover:-translate-y-3 hover:shadow-2xl hover:shadow-[var(--color-navy-800)]/30 active:scale-[0.98]"
              >
                <div className="relative aspect-[2/1] overflow-hidden lg:aspect-[16/10]">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-115"
                    sizes="(min-width: 1024px) 33vw, 84vw"
                  />
                  <div className="absolute inset-0 bg-[var(--color-navy-800)]/0 transition-colors duration-300 group-hover:bg-[var(--color-navy-800)]/25" />
                </div>
                <div className="flex flex-1 flex-col items-center px-5 pb-5 text-center lg:px-6 lg:pb-7">
                  <span className="relative -mt-7 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-amber)] text-[var(--color-navy-900)] shadow-lg shadow-black/20 transition-all duration-500 group-hover:rotate-[360deg] group-hover:bg-[var(--color-navy-800)] group-hover:text-white lg:-mt-8 lg:h-16 lg:w-16">
                    <Icon size={26} strokeWidth={2} />
                  </span>
                  <h3 className="mt-3 font-[family-name:var(--font-heading)] text-base font-extrabold uppercase leading-snug text-[var(--color-ink)] transition-colors group-hover:text-[var(--color-navy-600)] lg:mt-4 lg:text-lg">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--color-ink)]/75 lg:mt-3">
                    <Emphasize text={item.summary} />
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-[var(--color-navy-700)] lg:mt-5">
                    {learnMoreLabel}
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-2" />
                  </span>
                </div>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1.5 origin-left scale-x-0 bg-[var(--color-amber)] transition-transform duration-500 group-hover:scale-x-100"
                />
              </Link>
            </Reveal>
          );
        })}
      </div>

      <div aria-hidden className="mt-2 flex justify-center gap-2 lg:hidden">
        {items.map((item, i) => (
          <span
            key={item.key}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              i === active ? "w-6 bg-[var(--color-amber)]" : "w-2 bg-[var(--color-navy-800)]/25"
            )}
          />
        ))}
      </div>
    </>
  );
}
