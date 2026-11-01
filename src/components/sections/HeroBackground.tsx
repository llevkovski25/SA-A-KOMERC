"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

function getInitialReducedMotion() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function HeroBackground() {
  const [reducedMotion, setReducedMotion] = useState(getInitialReducedMotion);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const showVideo = !reducedMotion && !videoFailed;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {showVideo ? (
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => setVideoFailed(true)}
        >
          <source src="/videos/hero-truck.mp4" type="video/mp4" />
        </video>
      ) : (
        <Image
          src="/images/hero/hero-main.jpg"
          alt=""
          fill
          preload
          className="object-cover"
          sizes="100vw"
        />
      )}
      <div className="absolute inset-0 bg-[var(--color-surface-dark)]/40 md:bg-[var(--color-surface-dark)]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-surface-dark)]/80 via-[var(--color-surface-dark)]/40 to-transparent" />
    </div>
  );
}
