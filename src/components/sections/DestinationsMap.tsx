"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Emphasize from "@/components/ui/Emphasize";
import { cn } from "@/lib/utils";

type Point = {
  id: string;
  x: number;
  y: number;
  label: string;
  image?: string;
  /** Where the label sits around the dot, so close neighbours don't overlap. */
  labelClass?: string;
};

const origin: Point = { id: "origin", x: 61, y: 82, label: "" };

const points: Point[] = [
  { id: "sweden", x: 62, y: 8, label: "", image: "/images/destinations/destination-sweden.jpg", labelClass: "left-[80%] top-1/2 -translate-y-1/2" },
  { id: "netherlands", x: 33, y: 38, label: "", image: "/images/destinations/destination-netherlands.jpg", labelClass: "bottom-[70%] left-1/2 -translate-x-1/2" },
  { id: "germany", x: 43, y: 46, label: "", image: "/images/destinations/destination-germany.jpg", labelClass: "left-[80%] top-1/2 -translate-y-1/2" },
  { id: "belgium", x: 27, y: 45, label: "", labelClass: "right-1/4 top-[75%]" },
];

function arcPath(from: Point, to: Point) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2 - 12;
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
}

export default function DestinationsMap({
  countries,
  originLabel,
}: {
  countries: { id: string; name: string; description: string }[];
  originLabel: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="grid gap-3 md:gap-10 lg:grid-cols-5 lg:gap-8">
      <div className="relative overflow-hidden rounded-2xl bg-[var(--color-surface-dark)] p-3 md:rounded-3xl md:p-4 lg:col-span-3">
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        />
        <div className="relative aspect-[6/5] w-full">
          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
          >
            {points.map((p) => {
              const active = hovered === null || hovered === p.id;
              return (
                <motion.path
                  key={p.id}
                  d={arcPath(origin, p)}
                  fill="none"
                  stroke={hovered === p.id ? "#FFFFFF" : "#F5A623"}
                  strokeWidth={hovered === p.id ? 0.7 : 0.45}
                  strokeLinecap="round"
                  strokeDasharray="2 2"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: active ? 0.8 : 0.25 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                />
              );
            })}
          </svg>

          <button
            type="button"
            className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
            style={{ left: `${origin.x}%`, top: `${origin.y}%` }}
          >
            <span className="relative flex h-3.5 w-3.5 items-center justify-center rounded-full bg-[var(--color-amber)]">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--color-amber)] opacity-60" />
            </span>
            <span className="whitespace-nowrap rounded-full bg-[var(--color-amber)] px-2.5 py-1 text-[11px] font-extrabold text-[var(--color-navy-900)] shadow-md">
              {originLabel}
            </span>
          </button>

          {points.map((p) => {
            const country = countries.find((c) => c.id === p.id);
            if (!country) return null;
            return (
              <button
                type="button"
                key={p.id}
                onMouseEnter={() => setHovered(p.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(p.id)}
                onBlur={() => setHovered(null)}
                aria-label={country.name}
                className="absolute flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <span
                  className={cn(
                    "relative flex h-3 w-3 items-center justify-center rounded-full bg-[var(--color-navy-500)] ring-4 ring-[var(--color-navy-500)]/25 transition-transform",
                    hovered === p.id && "scale-125 bg-[var(--color-amber)] ring-[var(--color-amber)]/30"
                  )}
                />
                <span
                  className={cn(
                    "absolute whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-bold text-[var(--color-ink)] shadow-md transition-transform",
                    p.labelClass,
                    hovered === p.id && "scale-105"
                  )}
                >
                  {country.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:gap-4 lg:col-span-2 lg:grid-cols-1">
        {countries.map((country) => {
          const point = points.find((p) => p.id === country.id);
          return (
            <div
              key={country.id}
              onMouseEnter={() => setHovered(country.id)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "flex items-center gap-2.5 rounded-xl border-2 p-2 transition-all duration-300 md:gap-4 md:rounded-2xl md:p-4",
                hovered === country.id
                  ? "-translate-y-1 border-[var(--color-amber)] bg-white shadow-lg shadow-[var(--color-amber)]/25"
                  : "border-[var(--color-border)] bg-white"
              )}
            >
              <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-[var(--color-surface-alt)] md:h-14 md:w-14 md:rounded-xl">
                {point?.image ? (
                  <Image src={point.image} alt="" fill className="object-cover" sizes="56px" />
                ) : (
                  <div className="flex h-full w-full">
                    <span className="h-full w-1/3 bg-[#000000]" />
                    <span className="h-full w-1/3 bg-[#FDDA24]" />
                    <span className="h-full w-1/3 bg-[#EF3340]" />
                  </div>
                )}
              </div>
              <div>
                <p className="font-[family-name:var(--font-heading)] text-sm font-extrabold text-[var(--color-ink)] md:text-base">
                  {country.name}
                </p>
                <p className="mt-0.5 hidden text-xs leading-relaxed text-[var(--color-ink)]/75 md:block">
                  <Emphasize text={country.description} />
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
