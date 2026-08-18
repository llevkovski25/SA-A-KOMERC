"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";
import { useRouter } from "@/i18n/navigation";
import { locales, localeLabels, type Locale } from "@/i18n/routing";
import { flagIcons } from "@/components/icons/FlagIcons";
import { cn } from "@/lib/utils";

export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const t = useTranslations("common");
  const locale = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  function switchTo(next: Locale) {
    setOpen(false);
    router.replace(pathname, { locale: next });
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("language")}
        className={cn(
          "flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium transition-colors",
          dark
            ? "text-white/90 hover:bg-white/10"
            : "text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)]"
        )}
      >
        <Flag locale={locale} />
        <span className="uppercase">{locale}</span>
        <ChevronDown
          size={14}
          className={cn("transition-transform", open && "rotate-180")}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            role="listbox"
            className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white py-1.5 shadow-xl"
          >
            {locales.map((l) => (
              <li key={l}>
                <button
                  type="button"
                  role="option"
                  aria-selected={l === locale}
                  onClick={() => switchTo(l)}
                  className="flex w-full cursor-pointer items-center gap-2.5 px-3.5 py-2 text-left text-sm text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)]"
                >
                  <Flag locale={l} />
                  <span className="flex-1">{localeLabels[l].name}</span>
                  {l === locale && (
                    <Check size={14} className="text-[var(--color-navy-600)]" />
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

function Flag({ locale }: { locale: Locale }) {
  const FlagIcon = flagIcons[locale];
  return (
    <FlagIcon
      aria-hidden
      className="h-3 w-[18px] shrink-0 rounded-[2px] outline outline-1 -outline-offset-1 outline-black/10"
    />
  );
}
