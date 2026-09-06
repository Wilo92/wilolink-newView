"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
    children: ReactNode;
    /** Retraso antes de empezar la animación, en segundos. Útil para escalonar varios elementos. */
    delay?: number;
    /** Qué tanto se tiene que ver la sección antes de disparar la animación (0 a 1). */
    amount?: number;
};

export default function Reveal({ children, delay = 0, amount = 0.2 }: RevealProps) {
    // Si el usuario pide menos movimiento, no animamos nada — se muestra directo.
    const reduceMotion = useReducedMotion();

    if (reduceMotion) return <>{children}</>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount }}
            transition={{ duration: 0.6, delay, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
}