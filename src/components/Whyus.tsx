"use client";

import { motion, type Variants } from "framer-motion";

const REASONS = [
  {
    icon: "⚡",
    title: "Respuesta rápida",
    color: "#22d3b8",
  },
  {
    icon: "🛠️",
    title: "Garantía en el servicio",
    color: "#ffb020",
  },
  {
    icon: "🎯",
    title: "Atención personalizada",
    color: "#22d3b8",
  },
  {
    icon: "💬",
    title: "Precios claros y justos",
    color: "#ffb020",
  },
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut" },
  },
};

export default function WhyUs() {
  return (
    <section className="grid grid-cols-1 overflow-hidden bg-[#0a0e1a]  md:grid-cols-[1.3fr_1fr]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
        className="grid w-full grid-cols-1 gap-px bg-[#151a30] sm:grid-cols-2"
      >
        {REASONS.map((reason) => (
          <motion.div
            key={reason.title}
            variants={cardVariants}
            className="flex min-h-[180px] flex-col items-center justify-center border-t-[3px] bg-[#0e1223] p-8 text-center"
            style={{ borderTopColor: reason.color }}
          >
            <div
              className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg text-xl"
              style={{
                backgroundColor: `${reason.color}1f`,
                color: reason.color,
              }}
            >
              {reason.icon}
            </div>

            <h3 className="text-base font-bold text-white">{reason.title}</h3>
          </motion.div>
        ))}
      </motion.div>

      <div className="relative flex w-full flex-col justify-center overflow-hidden bg-gradient-to-br from-[#1c2148] via-[#3a2f52] to-[#c2571f] px-8 py-14 md:px-10">
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute left-[15%] top-[20%] h-1 w-1 rounded-full bg-white" />
          <div className="absolute left-[70%] top-[15%] h-1 w-1 rounded-full bg-white" />
          <div className="absolute left-[40%] top-[55%] h-1 w-1 rounded-full bg-white" />
          <div className="absolute left-[80%] top-[70%] h-1 w-1 rounded-full bg-white" />
          <div className="absolute left-[25%] top-[80%] h-1 w-1 rounded-full bg-white" />
        </div>

        <p className="relative z-10 mb-3 text-xs font-bold tracking-wide text-[#ffb020]">
          POR QUÉ ELEGIRNOS
        </p>
        <h2 className="relative z-10 text-3xl font-bold leading-tight text-white md:text-4xl">
          Un aliado que se nota en los detalles
        </h2>
      </div>
    </section>
  );
}
