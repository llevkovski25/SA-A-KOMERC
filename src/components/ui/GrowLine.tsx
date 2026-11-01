"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function GrowLine({
  className,
  center = false,
  delay = 0.3,
  duration = 0.8,
}: {
  className?: string;
  center?: boolean;
  delay?: number;
  duration?: number;
}) {
  return (
    <motion.span
      aria-hidden
      className={cn("block", center ? "origin-center" : "origin-left", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}
