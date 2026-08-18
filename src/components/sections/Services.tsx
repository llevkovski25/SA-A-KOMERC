import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import ServicesClient, { type ServiceItem } from "./ServicesClient";

const serviceMeta: { key: ServiceItem["key"]; slug: string; icon: ServiceItem["icon"] }[] = [
  { key: "transport", slug: "megjunaroden-transport", icon: "truck" },
  { key: "forwarding", slug: "shpedicija-logistika", icon: "route" },
  { key: "trucking", slug: "trucking", icon: "network" },
];

export default async function Services() {
  const t = await getTranslations("services");

  const items: ServiceItem[] = serviceMeta.map((meta) => ({
    key: meta.key,
    slug: meta.slug,
    icon: meta.icon,
    title: t(`items.${meta.key}.title`),
    summary: t(`items.${meta.key}.summary`),
    detail: t(`items.${meta.key}.detail`),
    bullets: t.raw(`items.${meta.key}.bullets`) as string[],
  }));

  return (
    <section id="services" className="section-pad bg-[var(--color-surface-alt)]">
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

        <ServicesClient
          items={items}
          learnMoreLabel={t("learnMore")}
          showLessLabel={t("showLess")}
          viewDetailsLabel={t("viewDetails")}
        />
      </div>
    </section>
  );
}
