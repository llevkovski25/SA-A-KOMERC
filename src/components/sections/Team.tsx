import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Phone, Mail } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import Emphasize from "@/components/ui/Emphasize";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig, telLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export default async function Team({ compact = false }: { compact?: boolean }) {
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

  const buttonClass =
    "flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-navy-800)] text-white transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:bg-[var(--color-amber)] hover:text-[var(--color-navy-900)] active:bg-[var(--color-amber)] active:text-[var(--color-navy-900)]";

  return (
    <section className="section-pad bg-[var(--color-surface-alt)]">
      <div className="container-page">
        <SectionHeading title={t("title")} subtitle={t("subtitle")} />

        <RevealGroup
          className={cn(
            "mx-auto mt-6 grid max-w-3xl md:mt-10 md:gap-6",
            compact ? "grid-cols-2 gap-3" : "gap-4 sm:grid-cols-2"
          )}
          stagger={0.2}
        >
          {members.map((member) => (
            <RevealItem key={member.key}>
              <div
                className={cn(
                  "group flex h-full flex-col items-center rounded-2xl bg-white text-center shadow-md shadow-black/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[var(--color-navy-800)]/25 md:p-7",
                  compact ? "p-4" : "p-6"
                )}
              >
                <div
                  className={cn(
                    "relative transition-transform duration-500 group-hover:scale-105 md:h-36 md:w-36",
                    compact ? "h-24 w-24" : "h-32 w-32"
                  )}
                >
                  <span
                    aria-hidden
                    className="absolute -inset-1 animate-[spin_6s_linear_infinite] rounded-full bg-[conic-gradient(var(--color-amber),var(--color-navy-600),var(--color-amber))] md:-inset-1.5"
                  />
                  <div className="relative h-full w-full overflow-hidden rounded-full ring-[3px] ring-white md:ring-4">
                    <Image
                      src={member.photo}
                      alt={t(`members.${member.key}.name`)}
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 144px, 128px"
                    />
                  </div>
                </div>
                <h3 className="mt-4 font-[family-name:var(--font-heading)] text-base font-extrabold leading-snug text-[var(--color-ink)] md:mt-6 md:text-xl">
                  {t(`members.${member.key}.name`)}
                </h3>
                <p className="text-xs font-bold text-[var(--color-navy-600)] md:text-sm">
                  {t(`members.${member.key}.role`)}
                </p>
                <p
                  className={cn(
                    "mt-3 text-sm leading-relaxed text-[var(--color-ink)]/75 md:mt-4",
                    compact && "hidden md:block"
                  )}
                >
                  <Emphasize text={t(`members.${member.key}.bio`)} />
                </p>
                <div className="mt-auto flex gap-3 pt-4 md:pt-6">
                  <a
                    href={telLink(member.person.phoneIntl)}
                    aria-label={member.person.phone}
                    className={buttonClass}
                  >
                    <Phone size={17} />
                  </a>
                  <a
                    href={`mailto:${member.person.email}`}
                    aria-label={member.person.email}
                    className={buttonClass}
                  >
                    <Mail size={17} />
                  </a>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
