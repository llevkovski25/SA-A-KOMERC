import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/ui/Reveal";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Emphasize from "@/components/ui/Emphasize";

export default async function TrustCta() {
  const t = await getTranslations("partner");
  const tNav = await getTranslations("nav");

  return (
    <section className="section-pad bg-white">
      <div className="container-page">
        <Reveal className="flex flex-col items-center gap-4 rounded-2xl bg-gradient-to-r from-[var(--color-navy-900)] to-[var(--color-navy-700)] p-5 text-center shadow-xl shadow-[var(--color-navy-800)]/30 md:gap-7 md:p-10 lg:flex-row lg:gap-10 lg:text-left">
          <div className="animate-float shrink-0 rounded-xl bg-white p-3">
            <Image
              src="/images/partners/partner-lkw-walter-logo.png"
              alt="LKW Walter"
              width={220}
              height={72}
              className="h-9 w-auto object-contain md:h-11"
            />
          </div>
          <div className="flex-1">
            <AnimatedTitle
              text={t("title")}
              accentWords={2}
              accentClassName="text-[var(--color-amber)] hover:text-white"
              className="text-xl font-extrabold text-white md:text-2xl"
            />
            <p className="mt-2 hidden text-sm leading-relaxed text-white/90 md:block md:text-base">
              <Emphasize text={t("short")} tone="dark" />
            </p>
          </div>
          <Link
            href="/contact"
            className="btn-accent w-full shrink-0 rounded-full px-7 py-3.5 text-center text-sm md:w-auto"
          >
            {tNav("getQuote")}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
