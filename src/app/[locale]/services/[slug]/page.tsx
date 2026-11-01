import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Truck, Route, Network, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getServiceBySlug, serviceSlugs } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import Emphasize from "@/components/ui/Emphasize";
import PageBanner from "@/components/ui/PageBanner";

const icons = { truck: Truck, route: Route, network: Network };
const iconKeys: Record<string, keyof typeof icons> = {
  transport: "truck",
  forwarding: "route",
  trucking: "network",
};

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    serviceSlugs.map((s) => ({ locale, slug: s.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};
  const t = await getTranslations({
    locale,
    namespace: `meta.pages.servicesDetail.${service.key}`,
  });
  const languages: Record<string, string> = {};
  routing.locales.forEach((l) => {
    languages[l] = `${siteConfig.url}/${l}/services/${slug}`;
  });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `${siteConfig.url}/${locale}/services/${slug}`,
      languages,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const t = await getTranslations("services");
  const tNav = await getTranslations("nav");
  const bullets = t.raw(`items.${service.key}.bullets`) as string[];

  const otherServices = serviceSlugs.filter((s) => s.slug !== slug);

  return (
    <>
      <PageBanner
        title={t(`items.${service.key}.title`)}
        subtitle={t(`items.${service.key}.summary`)}
        image={service.image}
      >
        <Link
          href="/#services"
          className="mb-2 inline-flex items-center gap-1.5 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
        >
          <ArrowLeft size={15} />
          {tNav("services")}
        </Link>
      </PageBanner>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-6 md:gap-10 lg:grid-cols-3 lg:gap-14">
          <div className="lg:col-span-2">
            <Reveal>
              <p className="text-[15px] leading-relaxed text-[var(--color-ink)]/80 md:text-base">
                <Emphasize text={t(`items.${service.key}.detail`)} />
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-5 grid gap-2.5 sm:grid-cols-2 md:mt-10 md:gap-3">
              {bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="group flex items-start gap-3 rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-surface-alt)] p-3 transition-all md:p-4 duration-300 hover:-translate-y-1 hover:border-[var(--color-amber)] hover:bg-white hover:shadow-lg hover:shadow-[var(--color-amber)]/25"
                >
                  <Check size={18} strokeWidth={3} className="mt-0.5 shrink-0 text-[var(--color-amber)] transition-transform duration-300 group-hover:scale-125" />
                  <span className="text-sm font-semibold text-[var(--color-ink)]/85">{bullet}</span>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="mt-5 md:mt-10">
              <Link
                href="/contact"
                className="btn-accent inline-flex w-full items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm sm:w-auto md:text-base"
              >
                {tNav("getQuote")}
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="lg:col-span-1">
            <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-6">
              <h2 className="font-[family-name:var(--font-heading)] text-sm font-bold uppercase tracking-wide text-[var(--color-ink)]/60">
                {t("title")}
              </h2>
              <ul className="mt-4 space-y-3">
                {otherServices.map((s) => {
                  const OtherIcon = icons[iconKeys[s.key]];
                  return (
                    <li key={s.slug}>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group flex items-center gap-3 rounded-xl bg-white p-3.5 transition-all duration-300 hover:translate-x-1 hover:shadow-md"
                      >
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[var(--color-navy-800)]/8 text-[var(--color-navy-700)]">
                          <OtherIcon size={18} />
                        </span>
                        <span className="text-sm font-semibold text-[var(--color-ink)] group-hover:text-[var(--color-navy-700)]">
                          {t(`items.${s.key}.title`)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
