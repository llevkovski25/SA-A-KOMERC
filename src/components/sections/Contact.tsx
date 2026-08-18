import { getTranslations } from "next-intl/server";
import { Phone, Mail, Clock, MapPin, ExternalLink } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { WhatsAppIcon, ViberIcon, MessengerIcon } from "@/components/icons/BrandIcons";
import {
  siteConfig,
  telLink,
  whatsappLink,
  viberLink,
  mapsEmbedUrl,
  mapsDirectionsUrl,
} from "@/lib/site";
import QuoteForm from "./QuoteForm";

function PersonCard({
  name,
  role,
  phone,
  phoneIntl,
  email,
  facebook,
}: {
  name: string;
  role: string;
  phone: string;
  phoneIntl: string;
  email: string;
  facebook: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-white p-6">
      <p className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)]">
        {name}
      </p>
      <p className="text-sm text-[var(--color-navy-600)]">{role}</p>
      <div className="mt-4 space-y-2 text-sm text-[var(--color-ink)]/75">
        <a href={telLink(phoneIntl)} className="flex items-center gap-2 hover:text-[var(--color-navy-700)]">
          <Phone size={15} className="text-[var(--color-ink)]/40" />
          {phone}
        </a>
        <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-[var(--color-navy-700)]">
          <Mail size={15} className="text-[var(--color-ink)]/40" />
          {email}
        </a>
      </div>
      <div className="mt-4 flex gap-2.5">
        <a
          href={whatsappLink(phoneIntl)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-transform hover:scale-110"
        >
          <WhatsAppIcon size={17} />
        </a>
        <a
          href={viberLink(phoneIntl)}
          aria-label="Viber"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#7360F2]/10 text-[#7360F2] transition-transform hover:scale-110"
        >
          <ViberIcon size={17} />
        </a>
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Messenger"
          className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0084FF]/10 text-[#0084FF] transition-transform hover:scale-110"
        >
          <MessengerIcon size={17} />
        </a>
      </div>
    </div>
  );
}

export default async function Contact() {
  const t = await getTranslations("contact");

  return (
    <section id="contact" className="section-pad bg-[var(--color-surface-alt)]">
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

        <div className="mt-14 grid gap-8 lg:grid-cols-5 lg:gap-10">
          <div className="space-y-6 lg:col-span-2">
            <Reveal className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
              <iframe
                title="SAŠA KOMERC — map"
                src={mapsEmbedUrl()}
                className="h-56 w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex items-center justify-between gap-3 bg-white p-4">
                <div className="flex items-start gap-2 text-sm text-[var(--color-ink)]/75">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-navy-600)]" />
                  <span>
                    {siteConfig.address.full}
                    <span className="block text-xs text-[var(--color-ink)]/50">
                      {t("addressNote")}
                    </span>
                  </span>
                </div>
                <a
                  href={mapsDirectionsUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t("getDirections")}
                  className="flex shrink-0 items-center gap-1 text-xs font-semibold text-[var(--color-navy-700)] hover:text-[var(--color-navy-600)]"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.05} className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--color-amber)]/15 text-[var(--color-amber)]">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--color-ink)]">
                  {t("hoursLabel")}
                </p>
                <p className="text-sm text-[var(--color-ink)]/65">{t("hoursValue")}</p>
              </div>
            </Reveal>

            <RevealGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1" stagger={0.1}>
              <RevealItem>
                <PersonCard
                  name={t("people.sasa.name")}
                  role={t("people.sasa.role")}
                  phone={siteConfig.people.sasa.phone}
                  phoneIntl={siteConfig.people.sasa.phoneIntl}
                  email={siteConfig.people.sasa.email}
                  facebook={siteConfig.people.sasa.facebook}
                />
              </RevealItem>
              <RevealItem>
                <PersonCard
                  name={t("people.marija.name")}
                  role={t("people.marija.role")}
                  phone={siteConfig.people.marija.phone}
                  phoneIntl={siteConfig.people.marija.phoneIntl}
                  email={siteConfig.people.marija.email}
                  facebook={siteConfig.people.marija.facebook}
                />
              </RevealItem>
            </RevealGroup>
          </div>

          <Reveal delay={0.1} className="lg:col-span-3">
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
