import { getTranslations } from "next-intl/server";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { Link } from "@/i18n/navigation";
import { siteConfig, telLink, whatsappLink } from "@/lib/site";

export default async function MobileActionBar() {
  const tNav = await getTranslations("nav");
  const tCommon = await getTranslations("common");
  const phone = siteConfig.people.sasa.phoneIntl;

  return (
    <>
      <div aria-hidden className="mobile-bar-spacer bg-[var(--color-navy-800)] lg:hidden" />
      <nav className="mobile-bar fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_1.5fr] gap-2 bg-[var(--color-navy-900)] p-2 shadow-[0_-6px_20px_rgba(0,0,0,0.25)] lg:hidden">
        <a
          href={telLink(phone)}
          className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-white/15 text-[13px] font-bold text-white active:bg-white/30"
        >
          <Phone size={16} className="shrink-0" />
          {tNav("callUs")}
        </a>
        <a
          href={whatsappLink(phone)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#25D366] text-[13px] font-bold text-[#06281a] active:opacity-80"
        >
          <WhatsAppIcon size={16} />
          {tCommon("whatsapp")}
        </a>
        <Link
          href="/contact"
          className="btn-accent flex h-11 items-center justify-center rounded-full px-2 text-center text-[13px] leading-tight"
        >
          {tNav("getQuote")}
        </Link>
      </nav>
    </>
  );
}
