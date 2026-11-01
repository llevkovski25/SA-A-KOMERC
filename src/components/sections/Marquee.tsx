import { getTranslations } from "next-intl/server";
import { Truck } from "lucide-react";

export default async function Marquee() {
  const t = await getTranslations("destinations.countries");

  const items = [
    "NL-SE-NL",
    t("germany.name"),
    "Euro 5/6",
    t("netherlands.name"),
    "LKW Walter",
    t("sweden.name"),
    "24/7",
    t("belgium.name"),
    "DE-SE-DE",
  ];

  const group = (
    <div className="flex shrink-0 items-center">
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="whitespace-nowrap font-[family-name:var(--font-heading)] text-sm font-extrabold uppercase tracking-wide text-[var(--color-navy-900)] md:text-xl">
            {item}
          </span>
          <Truck strokeWidth={2.25} className="mx-4 size-[18px] shrink-0 text-[var(--color-navy-900)] md:mx-6 md:size-[22px]" />
        </span>
      ))}
    </div>
  );

  return (
    <div aria-hidden className="overflow-hidden bg-[var(--color-amber)] py-2 md:py-3.5">
      <div className="animate-marquee flex w-max hover:[animation-play-state:paused]">
        {group}
        {group}
      </div>
    </div>
  );
}
