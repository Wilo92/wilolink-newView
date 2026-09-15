"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  /** Retraso antes de empezar la animación, en segundos. Útil para escalonar varios elementos. */
  delay?: number;
  /** Qué tanto se tiene que ver la sección antes de disparar la animación (0 a 1). */
  amount?: number;
};

export default function Reveal({ children, delay = 0, amount = 0.2 }: RevealProps) {
 
  const reduceMotion = false;

 
  const variants: Variants = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduceMotion
        ? { duration: 0 }
        : { duration: 0.6, delay, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}