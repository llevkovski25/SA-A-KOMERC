"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Point = { id: string; x: number; y: number; label: string; image?: string };

const origin: Point = { id: "origin", x: 61, y: 82, label: "" };

const points: Point[] = [
  { id: "sweden", x: 62, y: 8, label: "", image: "/images/destinations/destination-sweden.jpg" },
  { id: "netherlands", x: 33, y: 38, label: "", image: "/images/destinations/destination-netherlands.jpg" },
  { id: "germany", x: 43, y: 46, label: "", image: "/images/destinations/destination-germany.jpg" },
  { id: "belgium", x: 27, y: 45, label: "" },
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
    <div className="grid gap-10 lg:grid-cols-5 lg:gap-8">
      <div className="relative overflow-hidden rounded-3xl bg-[var(--color-surface-dark)] p-4 lg:col-span-3">
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
            preserveAspectRatio="xMidYMid meet"
          >
            {points.map((p) => {
              const active = hovered === null || hovered === p.id;
              return (
                <motion.path
                  key={p.id}
                  d={arcPath(origin, p)}
                  fill="none"
                  stroke={hovered === p.id ? "#F5A623" : "#4256E8"}
                  strokeWidth={hovered === p.id ? 0.6 : 0.35}
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
            <span className="rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-[var(--color-ink)] shadow-md">
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
                className="absolute flex -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col items-center gap-1.5"
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
                    "whitespace-nowrap rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[var(--color-ink)] shadow-md transition-transform",
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

      <div className="grid gap-4 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-1">
        {countries.map((country) => {
          const point = points.find((p) => p.id === country.id);
          return (
            <div
              key={country.id}
              onMouseEnter={() => setHovered(country.id)}
              onMouseLeave={() => setHovered(null)}
              className={cn(
                "flex items-center gap-4 rounded-2xl border p-4 transition-all",
                hovered === country.id
                  ? "border-[var(--color-navy-600)] bg-[var(--color-surface-alt)] shadow-md"
                  : "border-[var(--color-border)] bg-white"
              )}
            >
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-[var(--color-surface-alt)]">
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
                <p className="font-[family-name:var(--font-heading)] font-bold text-[var(--color-ink)]">
                  {country.name}
                </p>
                <p className="mt-0.5 text-xs leading-relaxed text-[var(--color-ink)]/65">
                  {country.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
