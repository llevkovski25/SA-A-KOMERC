"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navItems } from "./nav-items";
import LanguageSwitcher from "./LanguageSwitcher";
import { serviceSlugs } from "@/lib/services";
import { siteConfig, telLink } from "@/lib/site";
import { cn } from "@/lib/utils";

const navLinkClass =
  "relative flex items-center gap-1 px-3.5 py-2 text-sm font-extrabold uppercase tracking-wide text-white transition-colors after:absolute after:inset-x-3.5 after:bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-[var(--color-amber)] after:transition-transform after:duration-300 hover:text-[var(--color-amber)] hover:after:scale-x-100";

export default function Header() {
  const { scrollYProgress } = useScroll();
  const t = useTranslations("nav");
  const tCommon = useTranslations("common");
  const tServices = useTranslations("services.items");
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
        "fixed inset-x-0 top-0 z-50 w-full transition-colors duration-300",
        scrolled
          ? "bg-[var(--color-navy-900)] shadow-md shadow-black/20"
          : "bg-gradient-to-b from-black/55 to-transparent"
      )}
    >
      <div
        className={cn(
          "container-wide flex items-center justify-between transition-all duration-300",
          scrolled ? "h-14 md:h-16" : "h-16 md:h-24"
        )}
      >
        <Link href="/" className="relative z-10 flex shrink-0 items-center transition-transform duration-300 hover:scale-105">
          <Image
            src="/images/logo/logo-emblem.png"
            alt={siteConfig.name}
            width={500}
            height={245}
            preload
            className={cn(
              "w-auto brightness-0 invert transition-all duration-300",
              scrolled ? "h-10 md:h-12" : "h-12 md:h-16"
            )}
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) =>
            item.key === "services" ? (
              <div key={item.key} className="group relative">
                <Link href={item.href} className={navLinkClass}>
                  {t(item.key)}
                  <ChevronDown size={14} className="transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-0 top-full pt-2 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100">
                  <ul className="w-72 overflow-hidden rounded-xl border border-[var(--color-border)] bg-white py-1.5 shadow-xl">
                    {serviceSlugs.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="block px-4 py-2.5 text-sm font-bold text-[var(--color-ink)] transition-all hover:bg-[var(--color-amber)] hover:pl-6 hover:text-[var(--color-navy-900)]"
                        >
                          {tServices(`${s.key}.title`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <Link key={item.key} href={item.href} className={navLinkClass}>
                {t(item.key)}
              </Link>
            )
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher dark />
          <Link
            href="/contact"
            className="btn-accent rounded-full px-5 py-2.5 text-sm"
          >
            {t("getQuote")}
          </Link>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <LanguageSwitcher dark />
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            aria-label={tCommon("menu")}
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white hover:bg-white/10 active:bg-white/20"
          >
            <Menu size={26} />
          </button>
        </div>
      </div>

      {scrolled && (
        <motion.div
          aria-hidden
          style={{ scaleX: scrollYProgress }}
          className="absolute inset-x-0 bottom-0 h-1 origin-left bg-[var(--color-amber)]"
        />
      )}

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
                    src="/images/logo/logo-emblem.png"
                    alt={siteConfig.name}
                    width={500}
                    height={245}
                    className="h-14 w-auto brightness-0 invert"
                  />
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    aria-label={tCommon("close")}
                    className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-white hover:bg-white/10 active:bg-white/20"
                  >
                    <X size={26} />
                  </button>
                </div>
                <nav className="container-page mt-4 flex flex-col">
                  {navItems.map((item) => (
                    <div key={item.key} className="border-b border-white/10 py-3.5">
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block text-xl font-semibold text-white"
                      >
                        {t(item.key)}
                      </Link>
                      {item.key === "services" && (
                        <ul className="mt-2 space-y-2 pl-3">
                          {serviceSlugs.map((s) => (
                            <li key={s.slug}>
                              <Link
                                href={`/services/${s.slug}`}
                                onClick={() => setMobileOpen(false)}
                                className="block py-1 text-base text-white/80 active:text-[var(--color-amber)]"
                              >
                                {tServices(`${s.key}.title`)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </nav>
                <div className="container-page mt-6 flex flex-col gap-3 pb-8">
                  <a
                    href={telLink(siteConfig.people.sasa.phoneIntl)}
                    className="flex items-center gap-2 text-lg font-semibold text-white"
                  >
                    <Phone size={18} />
                    {siteConfig.people.sasa.phone}
                  </a>
                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="btn-accent mt-2 rounded-full px-6 py-3.5 text-center text-base"
                  >
                    {t("getQuote")}
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
