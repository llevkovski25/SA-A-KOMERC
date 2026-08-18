import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import GalleryClient from "./GalleryClient";

const galleryOrder = [1, 8, 3, 4, 10, 7, 6, 9, 5, 2];
const images = galleryOrder.map(
  (n) => `/images/gallery/photo-${String(n).padStart(2, "0")}.jpg`
);

export default async function Gallery() {
  const t = await getTranslations("gallery");
  const tCommon = await getTranslations("common");

  return (
    <section id="gallery" className="section-pad bg-[var(--color-surface-alt)]">
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

        <div className="mt-14">
          <GalleryClient
            images={images}
            closeLabel={tCommon("close")}
            nextLabel={tCommon("next")}
            prevLabel={tCommon("prev")}
          />
        </div>
      </div>
    </section>
  );
}
