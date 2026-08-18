import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { navItems } from "./nav-items";
import { siteConfig, telLink } from "@/lib/site";
import { FacebookIcon } from "@/components/icons/BrandIcons";

export default async function Footer() {
  const t = await getTranslations("footer");
  const tNav = await getTranslations("nav");
  const tServices = await getTranslations("services.items");

  const year = new Date().getFullYear();

  const serviceLinks = [
    { slug: "megjunaroden-transport", key: "transport" as const },
    { slug: "shpedicija-logistika", key: "forwarding" as const },
    { slug: "trucking", key: "trucking" as const },
  ];

  return (
    <footer className="bg-[var(--color-surface-dark)] text-white">
      <div className="container-page grid gap-12 py-16 md:grid-cols-4 md:py-20">
        <div className="md:col-span-1">
          <Image
            src="/images/logo/logo-emblem.png"
            alt={siteConfig.name}
            width={500}
            height={245}
            className="h-16 w-auto brightness-0 invert"
          />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            {t("tagline")}
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-[var(--color-amber)]">
            <Clock size={16} />
            {t("hours")}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            {t("quickLinksTitle")}
          </h3>
          <ul className="mt-4 space-y-3">
            {navItems.map((item) => (
              <li key={item.key}>
                <a
                  href={item.href}
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  {tNav(item.key)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            {t("servicesTitle")}
          </h3>
          <ul className="mt-4 space-y-3">
            {serviceLinks.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-white/75 transition-colors hover:text-white"
                >
                  {tServices(`${s.key}.title`)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-white/50">
            {t("contactTitle")}
          </h3>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-white/40" />
              <span>{siteConfig.address.full}</span>
            </li>
            <li>
              <a
                href={telLink(siteConfig.people.sasa.phoneIntl)}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone size={16} className="text-white/40" />
                {siteConfig.people.sasa.phone}
              </a>
            </li>
            <li>
              <a
                href={telLink(siteConfig.people.marija.phoneIntl)}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Phone size={16} className="text-white/40" />
                {siteConfig.people.marija.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.people.sasa.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-white"
              >
                <Mail size={16} className="text-white/40" />
                {siteConfig.people.sasa.email}
              </a>
            </li>
          </ul>
          <div className="mt-5 flex gap-3">
            <a
              href={siteConfig.people.sasa.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
            >
              <FacebookIcon size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/40 md:flex-row">
          <p>
            © {year} {siteConfig.legalName}. {t("rights")}
          </p>
          <p>{t("einNote")}</p>
        </div>
      </div>
    </footer>
  );
}
