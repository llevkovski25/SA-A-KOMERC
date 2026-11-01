import { getTranslations } from "next-intl/server";
import SectionHeading from "@/components/ui/SectionHeading";
import { serviceSlugs } from "@/lib/services";
import ServicesClient, { type ServiceItem } from "./ServicesClient";

export default async function Services() {
  const t = await getTranslations("services");

  const items: ServiceItem[] = serviceSlugs.map((s) => ({
    key: s.key,
    slug: s.slug,
    image: s.image,
    title: t(`items.${s.key}.title`),
    summary: t(`items.${s.key}.summary`),
  }));

  return (
    <section id="services" className="section-pad scroll-mt-16 bg-[var(--color-surface-alt)]">
      <div className="container-page">
        <SectionHeading title={t("title")} />
        <ServicesClient items={items} learnMoreLabel={t("learnMore")} />
      </div>
    </section>
  );
}
