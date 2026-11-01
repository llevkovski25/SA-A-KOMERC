"use client";

import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const wordVariants: Variants = {
  hidden: { y: "115%", rotate: 5 },
  visible: {
    y: 0,
    rotate: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function AnimatedTitle({
  text,
  as = "h2",
  className,
  accentClassName = "text-[var(--color-navy-600)] hover:text-[var(--color-amber)]",
  accentWords = 1,
  delay = 0,
}: {
  text: string;
  as?: "h1" | "h2";
  className?: string;
  accentClassName?: string;
  accentWords?: number;
  delay?: number;
}) {
  const Tag = as === "h1" ? motion.h1 : motion.h2;
  const words = text.trim().split(/\s+/);
  const accentFrom = words.length - accentWords;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-5% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.07, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`}>
          <span className="-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-top">
            <motion.span
              variants={wordVariants}
              className={cn(
                "inline-block origin-bottom-left cursor-default transition-colors duration-200",
                i >= accentFrom ? accentClassName : "hover:text-[var(--color-amber)]"
              )}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </Tag>
  );
}
