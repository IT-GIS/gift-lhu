"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  up: { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0 } },
  left: { hidden: { opacity: 0, x: -56 }, visible: { opacity: 1, x: 0 } },
  right: { hidden: { opacity: 0, x: 56 }, visible: { opacity: 1, x: 0 } },
  scale: { hidden: { opacity: 0, scale: 0.92 }, visible: { opacity: 1, scale: 1 } },
  fade: { hidden: { opacity: 0 }, visible: { opacity: 1 } },
} satisfies Record<string, Variants>;

export type ScrollFadeVariant = keyof typeof variants;

export function ScrollFade({
  children,
  variant = "up",
  delay = 0,
  amount = 0.2,
  className,
}: {
  children: ReactNode;
  variant?: ScrollFadeVariant;
  delay?: number;
  amount?: number;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("gift-scroll-fade", className)}
      variants={reduceMotion ? variants.fade : variants[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount }}
      transition={reduceMotion ? { duration: 0.01 } : { duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  );
}
