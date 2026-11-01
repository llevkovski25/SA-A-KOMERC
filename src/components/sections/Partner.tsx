import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/Reveal";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Emphasize from "@/components/ui/Emphasize";

export default async function Partner() {
  const t = await getTranslations("partner");

  return (
    <section id="partners" className="section-pad bg-[var(--color-surface-alt)]">
      <div className="container-page">
        <div className="grid overflow-hidden rounded-2xl bg-[var(--color-navy-800)] lg:grid-cols-2">
          <Reveal className="flex flex-col justify-center p-5 md:p-10">
            <AnimatedTitle
              text={t("title")}
              accentWords={2}
              accentClassName="text-[var(--color-amber)] hover:text-white"
              className="text-[1.375rem] font-extrabold leading-tight text-white sm:text-3xl"
            />
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-white/90">
              <p><Emphasize text={t("paragraph1")} tone="dark" /></p>
              <p><Emphasize text={t("paragraph2")} tone="dark" /></p>
            </div>
            <div className="animate-float mt-6 inline-flex w-fit rounded-xl bg-white p-3">
              <Image
                src="/images/partners/partner-lkw-walter-logo.png"
                alt="LKW Walter"
                width={220}
                height={72}
                className="h-9 w-auto object-contain"
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="relative min-h-[200px] overflow-hidden md:min-h-[260px]">
            <Image
              src="/images/partners/partner-lkw-walter-bridge.jpg"
              alt="LKW Walter камион"
              fill
              className="object-cover object-[70%_50%] transition-transform duration-700 hover:scale-110"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
