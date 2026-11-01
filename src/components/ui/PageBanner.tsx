import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Emphasize from "@/components/ui/Emphasize";
import GrowLine from "@/components/ui/GrowLine";

export default function PageBanner({
  title,
  subtitle,
  image,
  children,
}: {
  title: string;
  subtitle?: string;
  image: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--color-surface-dark)] pb-8 pt-24 md:pb-16 md:pt-40">
      <div className="absolute inset-0">
        <Image src={image} alt="" fill preload className="animate-kenburns object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface-dark)]/85 via-[var(--color-surface-dark)]/60 to-[var(--color-surface-dark)]/30" />
      </div>
      <div className="container-wide relative">
        {children && <Reveal immediate>{children}</Reveal>}
        <AnimatedTitle
          as="h1"
          text={title}
          accentClassName="text-[var(--color-amber)] hover:text-white"
          className="max-w-3xl text-[clamp(1.5rem,7.5vw,3rem)] font-extrabold leading-tight text-white"
        />
        <GrowLine className="mt-3 h-1 w-16 rounded-full bg-[var(--color-amber)] md:mt-4 md:h-1.5 md:w-20" />
        {subtitle && (
          <Reveal immediate delay={0.25}>
            <p className="mt-3 max-w-2xl text-sm font-medium leading-relaxed text-white/90 md:mt-4 md:text-lg">
              <Emphasize text={subtitle} tone="dark" />
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
