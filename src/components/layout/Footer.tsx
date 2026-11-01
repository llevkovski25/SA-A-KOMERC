import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems } from "./nav-items";
import { serviceSlugs } from "@/lib/services";
import { siteConfig, telLink } from "@/lib/site";
import { FacebookIcon } from "@/components/icons/BrandIcons";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tServices = await getTranslations("services.items");
  const tHero = await getTranslations("hero");
  const tContact = await getTranslations("contact");

  const year = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-navy-800)] text-white">
      <div className="container-page pt-8 md:pt-14">
        <div className="flex items-center gap-5">
          <span aria-hidden className="h-px flex-1 bg-white/40" />
          <Link
            href="/contact"
            className="py-2 font-[family-name:var(--font-heading)] text-xl font-extrabold text-[var(--color-amber)] transition-transform duration-300 hover:scale-110 md:text-2xl"
          >
            {tHero("ctaSecondary")}
          </Link>
          <span aria-hidden className="h-px flex-1 bg-white/40" />
        </div>
      </div>

      <div className="container-page grid grid-cols-2 gap-x-4 gap-y-7 py-7 md:gap-10 md:py-12 lg:grid-cols-[1.2fr_0.8fr_1.2fr_1.4fr]">
        <div className="col-span-2 flex flex-col items-center text-center lg:col-span-1 lg:items-start lg:text-left">
          <Image
            src="/images/logo/logo-emblem.png"
            alt={siteConfig.name}
            width={500}
            height={245}
            className="h-14 w-auto brightness-0 invert md:h-16"
          />
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80 md:mt-4">
            {t("tagline")}
          </p>
          <div className="mt-2 flex items-center gap-2 text-sm font-medium text-white md:mt-4">
            <Clock size={16} />
            {t("hours")}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-[var(--color-amber)]">
            {t("quickLinksTitle")}
          </h3>
          <ul className="mt-2 space-y-0.5 md:mt-4 md:space-y-2.5">
            {navItems.map((item) => (
              <li key={item.key}>
                <Link
                  href={item.href}
                  className="inline-block py-1.5 text-sm font-medium text-white/90 transition-all md:py-0 duration-300 hover:translate-x-1.5 hover:text-[var(--color-amber)]"
                >
                  {tNav(item.key)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-[var(--color-amber)]">
            {t("servicesTitle")}
          </h3>
          <ul className="mt-2 space-y-0.5 md:mt-4 md:space-y-2.5">
            {serviceSlugs.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="inline-block py-1.5 text-sm font-medium text-white/90 transition-all md:py-0 duration-300 hover:translate-x-1.5 hover:text-[var(--color-amber)]"
                >
                  {tServices(`${s.key}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 lg:col-span-1">
          <h3 className="text-sm font-extrabold uppercase tracking-wide text-[var(--color-amber)]">
            {t("contactTitle")}
          </h3>
          <ul className="mt-2 space-y-0.5 text-sm text-white/80 md:mt-4 md:space-y-2.5">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-white/60" />
              <span>{tContact("addressValue")}</span>
            </li>
            <li>
              <a
                href={telLink(siteConfig.people.sasa.phoneIntl)}
                className="flex items-center gap-2.5 py-1.5 transition-colors md:py-0 hover:text-[var(--color-amber)]"
              >
                <Phone size={16} className="text-white/60" />
                {siteConfig.people.sasa.phone}
              </a>
            </li>
            <li>
              <a
                href={telLink(siteConfig.people.marija.phoneIntl)}
                className="flex items-center gap-2.5 py-1.5 transition-colors md:py-0 hover:text-[var(--color-amber)]"
              >
                <Phone size={16} className="text-white/60" />
                {siteConfig.people.marija.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.people.sasa.email}`}
                className="flex items-center gap-2.5 py-1.5 [overflow-wrap:anywhere] transition-colors md:py-0 hover:text-[var(--color-amber)]"
              >
                <Mail size={16} className="shrink-0 text-white/60" />
                {siteConfig.people.sasa.email}
              </a>
            </li>
          </ul>
          <a
            href={siteConfig.people.sasa.facebook}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="mt-3 flex h-11 w-11 items-center justify-center rounded-full bg-white/15 transition-all duration-300 hover:-translate-y-1 hover:bg-[var(--color-amber)] hover:text-[var(--color-navy-900)]"
          >
            <FacebookIcon size={16} />
          </a>
        </div>
      </div>

      <div className="border-t border-white/20">
        <p className="container-page py-5 text-center text-xs text-white/70">
          © {year} {siteConfig.legalName}. {t("rights")}
        </p>
      </div>
    </footer>
  );
}
