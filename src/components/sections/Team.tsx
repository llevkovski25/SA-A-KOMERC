import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Phone, Mail } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { siteConfig, telLink } from "@/lib/site";

export default async function Team() {
  const t = await getTranslations("team");

  const members = [
    {
      key: "sasa" as const,
      person: siteConfig.people.sasa,
      photo: "/images/team/sasa-spasovski.jpg",
    },
    {
      key: "marija" as const,
      person: siteConfig.people.marija,
      photo: "/images/team/marija-jordanova.jpg",
    },
  ];

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

        <RevealGroup className="mx-auto mt-14 grid max-w-3xl gap-6 sm:grid-cols-2" stagger={0.15}>
          {members.map((member) => (
            <RevealItem
              key={member.key}
              className="flex flex-col items-center rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-8 text-center"
            >
              <div className="relative h-28 w-28 overflow-hidden rounded-full shadow-lg shadow-[var(--color-navy-700)]/25 ring-4 ring-white">
                <Image
                  src={member.photo}
                  alt={t(`members.${member.key}.name`)}
                  fill
                  className="object-cover"
                  sizes="112px"
                />
              </div>
              <h3 className="mt-5 font-[family-name:var(--font-heading)] text-lg font-bold text-[var(--color-ink)]">
                {t(`members.${member.key}.name`)}
              </h3>
              <p className="text-sm font-medium text-[var(--color-navy-600)]">
                {t(`members.${member.key}.role`)}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-[var(--color-ink)]/70">
                {t(`members.${member.key}.bio`)}
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href={telLink(member.person.phoneIntl)}
                  aria-label={member.person.phone}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-navy-700)] shadow-sm transition-colors hover:bg-[var(--color-navy-700)] hover:text-white"
                >
                  <Phone size={16} />
                </a>
                <a
                  href={`mailto:${member.person.email}`}
                  aria-label={member.person.email}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--color-navy-700)] shadow-sm transition-colors hover:bg-[var(--color-navy-700)] hover:text-white"
                >
                  <Mail size={16} />
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
