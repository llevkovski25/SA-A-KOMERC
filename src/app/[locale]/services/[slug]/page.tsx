import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Truck, Route, Network, Check, ArrowRight, ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { getServiceBySlug, serviceSlugs } from "@/lib/services";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";

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
  const Icon = icons[iconKeys[service.key]];
  const bullets = t.raw(`items.${service.key}.bullets`) as string[];

  const otherServices = serviceSlugs.filter((s) => s.slug !== slug);

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--color-surface-dark)] pt-32 pb-24 md:pb-32">
        <div className="absolute inset-0">
          <Image src={service.image} alt="" fill className="object-cover opacity-30" sizes="100vw" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-dark)] via-[var(--color-surface-dark)]/70 to-[var(--color-surface-dark)]/40" />
        </div>
        <div className="container-page relative">
          <Reveal>
            <Link
              href="/#services"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-white/60 transition-colors hover:text-white"
            >
              <ArrowLeft size={15} />
              {tNav("services")}
            </Link>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-white backdrop-blur-sm">
              <Icon size={30} strokeWidth={1.75} />
            </div>
            <h1 className="mt-6 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl md:text-5xl">
              {t(`items.${service.key}.title`)}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
              {t(`items.${service.key}.summary`)}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-pad bg-white">
        <div className="container-page grid gap-14 lg:grid-cols-3 lg:gap-16">
          <div className="lg:col-span-2">
            <Reveal>
              <p className="text-base leading-relaxed text-[var(--color-ink)]/75 md:text-lg">
                {t(`items.${service.key}.detail`)}
              </p>
            </Reveal>

            <Reveal delay={0.1} className="mt-10 grid gap-3 sm:grid-cols-2">
              {bullets.map((bullet) => (
                <div
                  key={bullet}
                  className="flex items-start gap-3 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface-alt)] p-4"
                >
                  <Check size={18} className="mt-0.5 shrink-0 text-[var(--color-navy-600)]" />
                  <span className="text-sm text-[var(--color-ink)]/80">{bullet}</span>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.15} className="mt-10">
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-navy-700)] px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-[var(--color-navy-700)]/25 transition-all hover:bg-[var(--color-navy-600)] md:text-base"
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
                        className="group flex items-center gap-3 rounded-xl bg-white p-3.5 transition-shadow hover:shadow-md"
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
