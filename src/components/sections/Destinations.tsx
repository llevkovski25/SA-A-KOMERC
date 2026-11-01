import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import DestinationsMap from "./DestinationsMap";

export default async function Destinations() {
  const t = await getTranslations("destinations");

  const countries = ["germany", "netherlands", "sweden", "belgium"].map((id) => ({
    id,
    name: t(`countries.${id}.name`),
    description: t(`countries.${id}.description`),
  }));

  return (
    <section className="section-pad bg-[var(--color-surface-alt)]">
      <div className="container-page">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <Reveal delay={0.1} className="mt-6 md:mt-10">
          <DestinationsMap countries={countries} originLabel={t("origin")} />
        </Reveal>
      </div>
    </section>
  );
}
