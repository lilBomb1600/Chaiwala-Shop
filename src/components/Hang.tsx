"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Anything on a nail: it comes into view a little crooked and swings straight, pivoting from the top. The page's one
 * motion idea (the hung board in the opening) carried to the prints and chits. Visible from the first frame.
 */
export function Hang({ children, index = 0, className }: { children: ReactNode; index?: number; className?: string }) {
  const reduce = useReducedMotion();
  const tilt = index % 2 ? 2.4 : -2.4;
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { rotate: tilt }}
      whileInView={{ rotate: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ type: "spring", stiffness: 90, damping: 6, delay: Math.min(index, 4) * 0.05 }}
      style={{ transformOrigin: "50% 0%" }}
    >
      {children}
    </motion.div>
  );
}
