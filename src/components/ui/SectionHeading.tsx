import { Reveal } from "@/components/ui/Reveal";
import AnimatedTitle from "@/components/ui/AnimatedTitle";
import Emphasize from "@/components/ui/Emphasize";
import GrowLine from "@/components/ui/GrowLine";

export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <AnimatedTitle
        text={title}
        className="text-[1.375rem] font-extrabold leading-tight text-[var(--color-ink)] sm:text-3xl md:text-4xl"
      />
      <GrowLine center className="mx-auto mt-3 h-1 w-16 rounded-full bg-[var(--color-amber)] md:mt-4 md:h-1.5 md:w-20" />
      {subtitle && (
        <Reveal delay={0.2} className="hidden sm:block">
          <p className="mt-4 text-base leading-relaxed text-[var(--color-ink)]/75">
            <Emphasize text={subtitle} />
          </p>
        </Reveal>
      )}
    </div>
  );
}
