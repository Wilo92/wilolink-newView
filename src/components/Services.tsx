"use client";

import { useEffect, useRef } from "react";
import { motion, type Variants } from "framer-motion";

const SERVICES = [
  {
    title: "Mantenimiento preventivo / correctivo",
    desc: "Diagnóstico, mantenimiento preventivo y correctivo para laptops y computadores de escritorio. Solucionamos fallas de hardware y software, realizamos actualizaciones e instalación de aplicaciones para garantizar un funcionamiento óptimo.",
    accent: "#22d3b8",
    image: "/services/mantenimiento.jpg",
  },
  {
    title: "Enseñanza",
    desc: "Clases dirigidas a personas de diferentes profesiones y niveles de experiencia, incluso sin conocimientos previos. Aprende a manejar el computador, internet, herramientas ofimáticas y otras tecnologías de forma práctica y segura.",
    accent: "#ffb020",
    image: "/services/ensenanza.jpg",
  },
  {
    title: "Redes",
    desc: "Diseño, instalación y configuración de redes para hogares y empresas. Configuración de routers, redes Wi-Fi, conexión de dispositivos, puntos de red y sistemas de cámaras de seguridad.",
    accent: "#22d3b8",
    image: "/services/redes.jpg",
  },
  {
    title: "Desarrollo a la medida",
    desc: "Diseño y desarrollo de sitios web, aplicaciones y sistemas de información personalizados para cada negocio. Desde landing pages y sitios corporativos hasta plataformas completas con bases de datos, autenticación y paneles administrativos.",
    accent: "#ffb020",
    image: "/services/desarrollo.jpg",
  },
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

type NodeType = {
  x: number;
  y: number;
  vx: number;
  vy: number;
};

function useMeshBackground(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
) {
  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    let animationId = 0;
    let width = 0;
    let height = 0;
    let nodes: NodeType[] = [];

    const MAX_NODES = 80;
    const CONNECTION_DISTANCE = 90;

    const resize = () => {
      const parent = canvas.parentElement;

      if (!parent) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = parent.clientWidth;
      height = parent.clientHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;

      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(MAX_NODES, Math.round((width * height) / 15000));

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    };

    resize();

    window.addEventListener("resize", resize);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x <= 0 || node.x >= width) node.vx *= -1;
        if (node.y <= 0 || node.y >= height) node.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;

          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < CONNECTION_DISTANCE) {
            ctx.strokeStyle = `rgba(255,255,255,${
              (1 - distance / CONNECTION_DISTANCE) * 0.25
            })`;

            ctx.lineWidth = 1;

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = "rgba(255,255,255,0.55)";

      for (const node of nodes) {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [canvasRef]);
}

export default function Services() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useMeshBackground(canvasRef);

  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr]">
      <div className="relative overflow-hidden bg-[linear-gradient(100deg,#1a2138_0%,#2a2f52_45%,#b5501c_100%)] px-8 py-14 md:px-10 flex flex-col justify-center">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full opacity-50 pointer-events-none"
        />

        <div className="relative z-10">
          <p className="mb-3 text-xs font-bold tracking-[0.08em] text-[#ffb020]">
            LO QUE SABEMOS HACER
          </p>

          <h2 className="max-w-xs text-3xl font-extrabold leading-tight text-white">
            Somo tu aliado técnico para todo lo que necesites.
          </h2>
        </div>
      </div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={containerVariants}
        className="grid grid-cols-1 gap-4 bg-[#0a0e1a] p-8 sm:grid-cols-2 md:p-10"
      >
        {SERVICES.map((service) => (
          <motion.article
            key={service.title}
            variants={cardVariants}
            className="group relative min-h-[220px] overflow-hidden rounded-xl border-l-[3px] p-5 flex flex-col justify-end transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{
              borderLeftColor: service.accent,
            }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
              style={{
                backgroundImage: `url(${service.image})`,
              }}
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1acc] to-[#0a0e1a66]" />

            <div className="relative z-10">
              <h3 className="mb-2 text-[15px] font-bold text-white">
                {service.title}
              </h3>

              <p className="text-[12.5px] leading-relaxed text-[#d8dcf5]">
                {service.desc}
              </p>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  );
}
