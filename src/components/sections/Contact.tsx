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
    <div className="rounded-2xl border-2 border-[var(--color-border)] bg-white p-4 transition-all md:p-6 duration-300 hover:-translate-y-1 hover:border-[var(--color-amber)] hover:shadow-lg hover:shadow-[var(--color-amber)]/25">
      <p className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)]">
        {name}
      </p>
      <p className="text-sm text-[var(--color-navy-600)]">{role}</p>
      <div className="mt-2 text-sm font-medium text-[var(--color-ink)]/80 md:mt-4 md:space-y-2">
        <a href={telLink(phoneIntl)} className="flex items-center gap-2 py-2 hover:text-[var(--color-navy-700)] md:py-0">
          <Phone size={15} className="shrink-0 text-[var(--color-navy-600)]" />
          {phone}
        </a>
        <a href={`mailto:${email}`} className="flex items-center gap-2 py-2 [overflow-wrap:anywhere] hover:text-[var(--color-navy-700)] md:py-0">
          <Mail size={15} className="shrink-0 text-[var(--color-navy-600)]" />
          {email}
        </a>
      </div>
      <div className="mt-3 flex gap-2.5 md:mt-4">
        <a
          href={whatsappLink(phoneIntl)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="WhatsApp"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366] transition-transform hover:scale-110"
        >
          <WhatsAppIcon size={20} />
        </a>
        <a
          href={viberLink(phoneIntl)}
          aria-label="Viber"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#7360F2]/10 text-[#7360F2] transition-transform hover:scale-110"
        >
          <ViberIcon size={20} />
        </a>
        <a
          href={facebook}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Messenger"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0084FF]/10 text-[#0084FF] transition-transform hover:scale-110"
        >
          <MessengerIcon size={20} />
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
        <div className="grid gap-5 lg:grid-cols-5 lg:gap-10">
          <div className="space-y-3 md:space-y-6 lg:col-span-2">
            <Reveal className="overflow-hidden rounded-2xl border border-[var(--color-border)]">
              <iframe
                title="SAŠA KOMERC — map"
                src={mapsEmbedUrl()}
                className="h-44 w-full md:h-56"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="flex items-center justify-between gap-3 bg-white p-4">
                <div className="flex items-start gap-2 text-sm text-[var(--color-ink)]/75">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-navy-600)]" />
                  <span>
                    {t("addressValue")}
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
                  className="flex shrink-0 items-center gap-1 p-2.5 text-xs font-semibold text-[var(--color-navy-700)] hover:text-[var(--color-navy-600)]"
                >
                  <ExternalLink size={18} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.05} className="flex items-center gap-3 rounded-2xl border border-[var(--color-border)] bg-white p-4 md:p-5">
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

            <RevealGroup className="grid gap-3 sm:grid-cols-2 md:gap-4 lg:grid-cols-1" stagger={0.1}>
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

          <Reveal delay={0.1} className="order-first lg:order-none lg:col-span-3">
            <QuoteForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
