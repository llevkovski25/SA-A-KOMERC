import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";

export default async function Partner() {
  const t = await getTranslations("partner");

  return (
    <section id="partners" className="section-pad bg-white">
      <div className="container-page">
        <div className="overflow-hidden rounded-3xl bg-[#1230BF]">
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal className="relative flex flex-col justify-center p-8 md:p-14">
              <span className="text-sm font-semibold uppercase tracking-wider text-white/60">
                {t("eyebrow")}
              </span>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight text-white sm:text-4xl">
                {t("title")}
              </h2>
              <div className="mt-6 max-w-lg space-y-4 text-[15px] leading-relaxed text-white/80">
                <p>{t("paragraph1")}</p>
                <p>{t("paragraph2")}</p>
              </div>
              <div className="mt-8 inline-flex w-fit rounded-2xl bg-white p-4 shadow-lg">
                <Image
                  src="/images/partners/partner-lkw-walter-logo.png"
                  alt="LKW Walter"
                  width={220}
                  height={72}
                  className="h-10 w-auto object-contain md:h-12"
                />
              </div>
            </Reveal>

            <Reveal delay={0.15} className="relative min-h-[280px]">
              <Image
                src="/images/partners/partner-lkw-walter-bridge.jpg"
                alt="LKW Walter камион"
                fill
                className="object-cover object-[70%_50%]"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#1230BF] via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#1230BF]/40" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
