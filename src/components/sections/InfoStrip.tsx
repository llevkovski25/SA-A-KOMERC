import { getTranslations } from "next-intl/server";
import { ArrowRight, Clock, MapPin, Phone } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { siteConfig, telLink } from "@/lib/site";

export default async function InfoStrip() {
  const t = await getTranslations("contact");
  const tNav = await getTranslations("nav");

  const labelClass = "text-xs font-extrabold uppercase tracking-wide text-[var(--color-amber)]";
  const iconClass =
    "mt-0.5 shrink-0 text-[var(--color-amber)] transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12";
  const itemClass =
    "group flex gap-2.5 py-4 transition-colors duration-300 hover:bg-white/10 lg:gap-3 lg:px-5 lg:py-5";

  return (
    <section className="bg-[var(--color-navy-900)]">
      <RevealGroup
        stagger={0.1}
        className="container-page grid grid-cols-2 gap-x-3 lg:grid-cols-4 lg:divide-x lg:divide-white/15"
      >
        <RevealItem className={itemClass}>
          <Phone size={20} className={iconClass} />
          <div>
            <h2 className={labelClass}>{t("eyebrow")}</h2>
            <a
              href={telLink(siteConfig.people.sasa.phoneIntl)}
              className="mt-0.5 block py-1.5 text-sm font-bold text-white hover:text-[var(--color-amber)] lg:mt-1 lg:py-0"
            >
              {siteConfig.people.sasa.phone}
            </a>
            <a
              href={telLink(siteConfig.people.marija.phoneIntl)}
              className="block py-1.5 text-sm font-bold text-white hover:text-[var(--color-amber)] lg:py-0"
            >
              {siteConfig.people.marija.phone}
            </a>
          </div>
        </RevealItem>

        <RevealItem className={itemClass}>
          <Clock size={20} className={iconClass} />
          <div>
            <h2 className={labelClass}>{t("hoursLabel")}</h2>
            <p className="mt-1 text-sm font-medium text-white">{t("hoursValue")}</p>
          </div>
        </RevealItem>

        <RevealItem className={`${itemClass} col-span-2 border-t border-white/15 lg:col-span-1 lg:border-t-0`}>
          <MapPin size={20} className={iconClass} />
          <div>
            <h2 className={labelClass}>{t("addressLabel")}</h2>
            <p className="mt-1 text-sm font-medium text-white">{t("addressValue")}</p>
          </div>
        </RevealItem>

        <RevealItem className="hidden items-center py-5 lg:flex lg:pl-5">
          <Link
            href="/contact"
            className="btn-accent inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm"
          >
            {tNav("getQuote")}
            <ArrowRight size={16} />
          </Link>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
