"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useScroll, useTransform, motion } from "framer-motion";

function getInitialReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroBackground() {
  const [reducedMotion, setReducedMotion] = useState(getInitialReducedMotion);
  const [videoFailed, setVideoFailed] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const parallaxY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const showVideo = !reducedMotion && !videoFailed;

  return (
    <div ref={sectionRef} className="absolute inset-0 z-0 overflow-hidden">
      <motion.div style={{ y: parallaxY }} className="absolute inset-0 h-[120%]">
        {showVideo ? (
          <video
            className="h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            poster="/images/hero/hero-main.jpg"
            onError={() => setVideoFailed(true)}
          >
            <source src="/videos/hero-truck.mp4" type="video/mp4" />
          </video>
        ) : (
          <div className="relative h-full w-full overflow-hidden">
            <Image
              src="/images/hero/hero-main.jpg"
              alt=""
              fill
              priority
              className="animate-kenburns object-cover"
              sizes="100vw"
            />
          </div>
        )}
        <div
          aria-hidden
          className="animate-light-streak pointer-events-none absolute inset-y-0 left-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white to-transparent mix-blend-screen"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface-dark)]/80 via-[var(--color-surface-dark)]/35 to-[var(--color-surface-dark)]/5" />
      <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-surface-dark)]/60 via-transparent to-transparent" />
    </div>
  );
}
