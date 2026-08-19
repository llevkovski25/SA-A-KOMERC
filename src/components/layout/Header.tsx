"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "./nav-items";
import LanguageSwitcher from "./LanguageSwitcher";
import { siteConfig, telLink } from "@/lib/site";
import { cn } from "@/lib/utils";

export default function Header() {
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-mount detection for the portal target; there's no external event to subscribe to instead.
    setMounted(true);
  }, []);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 24);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 shadow-md shadow-black/5 backdrop-blur-sm"
          : "bg-white"
      )}
    >
      <div
        className={cn(
          "container-page flex items-center justify-between transition-all duration-300",
          scrolled ? "h-16 md:h-18" : "h-20 md:h-24"
        )}
      >
        <Link href="/#hero" className="relative z-10 flex shrink-0 items-center">
          <Image
            src="/images/logo/logo-emblem.png"
            alt={siteConfig.name}
            width={500}
            height={245}
            priority
            className={cn(
              "w-auto transition-all duration-300",
              scrolled ? "h-11 sm:h-12 md:h-16" : "h-14 sm:h-16 md:h-20"
            )}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.key}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-medium text-[var(--color-ink)]/80 transition-colors hover:bg-[var(--color-surface-alt)] hover:text-[var(--color-navy-700)]"
            >
              {t(item.key)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher />
          <a
            href={telLink(siteConfig.people.sasa.phoneIntl)}
            className="flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-semibold text-[var(--color-navy-800)] transition-colors hover:bg-[var(--color-surface-alt)]"
          >
            <Phone size={16} />
            <span>{siteConfig.people.sasa.phone}</span>
          </a>
          <a
            href="#contact"
            className="rounded-full bg-[var(--color-navy-700)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[var(--color-navy-700)]/30 transition-all hover:bg-[var(--color-navy-600)] hover:shadow-md"
          >
            {t("getQuote")}
          </a>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={tCommon("menu")}
            className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[var(--color-ink)] hover:bg-[var(--color-surface-alt)]"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                style={{ backgroundColor: "#0c1230" }}
                className="fixed inset-0 z-[100] overflow-y-auto bg-[var(--color-surface-dark)] lg:hidden"
              >
            <div className="container-page flex h-20 items-center justify-between">
              <Image
                src="/images/logo/logo-horizontal.png"
                alt={siteConfig.name}
                width={500}
                height={74}
                className="h-7 w-auto brightness-0 invert sm:h-9"
              />
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                aria-label={tCommon("close")}
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-white hover:bg-white/10"
              >
                <X size={24} />
              </button>
            </div>
            <motion.nav
              initial="closed"
              animate="open"
              variants={{
                open: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
              }}
              className="container-page mt-6 flex flex-col gap-1"
            >
              {navItems.map((item) => (
                <motion.a
                  key={item.key}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  variants={{
                    closed: { opacity: 0, x: -16 },
                    open: { opacity: 1, x: 0 },
                  }}
                  className="border-b border-white/10 py-4 text-2xl font-semibold text-white"
                >
                  {t(item.key)}
                </motion.a>
              ))}
            </motion.nav>
            <div className="container-page mt-8 flex flex-col gap-3">
              <a
                href={telLink(siteConfig.people.sasa.phoneIntl)}
                className="flex items-center gap-2 text-lg font-semibold text-white"
              >
                <Phone size={18} />
                {siteConfig.people.sasa.phone}
              </a>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="mt-2 rounded-full bg-[var(--color-navy-600)] px-6 py-3.5 text-center text-base font-semibold text-white"
              >
                {t("getQuote")}
              </a>
            </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
