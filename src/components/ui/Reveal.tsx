"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 70, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 90, damping: 14, mass: 0.9 },
  },
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 56,
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  /** Animate on mount. For content inside an overflow-hidden band, where the
   *  offset start position can sit outside the clip and never count as in view. */
  immediate?: boolean;
}) {
  const shown = { opacity: 1, y: 0, scale: 1 };
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, scale: 0.96 }}
      {...(immediate
        ? { animate: shown }
        : { whileInView: shown, viewport: { once: true, margin: "-4% 0px" } })}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealGroup({
  children,
  className,
  stagger = 0.1,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-4% 0px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={defaultVariants}>
      {children}
    </motion.div>
  );
}
