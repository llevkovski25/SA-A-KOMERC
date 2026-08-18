import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import AnimatedStat from "@/components/ui/AnimatedStat";

const galleryImages = [
  "/images/features/feature-24-7-logistics.jpg",
  "/images/features/feature-freight-forwarding.jpg",
  "/images/features/feature-logistics-control.jpg",
  "/images/features/feature-network.jpg",
];

export default async function Fleet() {
  const t = await getTranslations("fleet");

  const stats = [
    { value: t("stats.trucks"), label: t("stats.trucksLabel") },
    { value: t("stats.capacity"), label: t("stats.capacityLabel") },
    { value: t("stats.standard"), label: t("stats.standardLabel") },
    { value: t("stats.partner"), label: t("stats.partnerLabel") },
  ];

  return (
    <section id="fleet" className="relative overflow-hidden bg-[var(--color-surface-dark)]">
      <div className="absolute inset-0">
        <Image
          src="/images/fleet/fleet-hero.png"
          alt=""
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-surface-dark)]/40 via-[var(--color-surface-dark)]/85 to-[var(--color-surface-dark)]" />
      </div>

      <div className="container-page relative section-pad">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-[var(--color-amber)]">
            {t("eyebrow")}
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
            {t("title")}
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mx-auto mt-8 max-w-3xl space-y-4 text-center text-[15px] leading-relaxed text-white/75 md:text-base">
          <p>{t("paragraph1")}</p>
          <p>{t("paragraph2")}</p>
        </Reveal>

        <RevealGroup className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-6 md:grid-cols-4" stagger={0.1}>
          {stats.map((stat) => (
            <RevealItem
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
            >
              <p className="font-[family-name:var(--font-heading)] text-2xl font-extrabold text-white md:text-3xl">
                <AnimatedStat value={stat.value} />
              </p>
              <p className="mt-1.5 text-xs text-white/60 md:text-sm">{stat.label}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4" stagger={0.08}>
          {galleryImages.map((src) => (
            <RevealItem
              key={src}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={src}
                alt=""
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(min-width: 768px) 25vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
