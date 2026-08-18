import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import DestinationsMap from "./DestinationsMap";

export default async function Destinations() {
  const t = await getTranslations("destinations");

  const countries = ["germany", "netherlands", "sweden", "belgium"].map((id) => ({
    id,
    name: t(`countries.${id}.name`),
    description: t(`countries.${id}.description`),
  }));

  return (
    <section className="section-pad bg-white">
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

        <Reveal delay={0.1} className="mt-14">
          <DestinationsMap countries={countries} originLabel={t("origin")} />
        </Reveal>
      </div>
    </section>
  );
}
