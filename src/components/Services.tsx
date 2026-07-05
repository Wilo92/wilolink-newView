"use client";

import { useEffect, useRef } from "react";

const SERVICES = [
  {
    title: "Mantenimiento",
    desc: "Diagnóstico, limpieza y reparación de laptops, PC de escritorio y dispositivos móviles. Mantenimiento preventivo para evitar fallas, y corrección de problemas de hardware o software cuando ya se presentaron.",
    accent: "#22d3b8",
    image: "/services/mantenimiento.jpg",
  },
  {
    title: "Enseñanza",
    desc: "Clases de informática básica pensadas para adultos, niños y personas sin experiencia técnica. Manejo de computador, internet, herramientas ofimáticas y uso seguro de la tecnología, a tu ritmo.",
    accent: "#ffb020",
    image: "/services/ensenanza.jpg",
  },
  {
    title: "Redes",
    desc: "Instalación y administración de redes empresariales o domésticas: configuración de routers, cableado estructurado, control de acceso y monitoreo para que tu conexión sea estable y segura.",
    accent: "#22d3b8",
    image: "/services/redes.jpg",
  },
  {
    title: "Desarrollo",
    desc: "Diseño y desarrollo de sitios web y sistemas de información a la medida de tu negocio, desde una landing sencilla hasta plataformas con base de datos y paneles de administración.",
    accent: "#ffb020",
    image: "/services/desarrollo.jpg",
  },
] as const;

function useMeshBackground(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    let nodes: { x: number; y: number; vx: number; vy: number }[] = [];

    function resize() {
      const parent = canvas!.parentElement!;
      w = canvas!.width = parent.clientWidth;
      h = canvas!.height = parent.clientHeight;
      const count = Math.round((w * h) / 9000);
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
      }));
    }
    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      return () => window.removeEventListener("resize", resize);
    }

    function draw() {
      ctx!.clearRect(0, 0, w, h);
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
          if (d < 90) {
            ctx!.strokeStyle = `rgba(255,255,255,${(1 - d / 90) * 0.25})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }
      ctx!.fillStyle = "rgba(255,255,255,0.5)";
      nodes.forEach((n) => {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 1.5, 0, 7);
        ctx!.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [canvasRef]);
}

export default function Services() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useMeshBackground(canvasRef);

  return (
    <section className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr]">
      {/* Panel izquierdo: gradiente de marca + malla animada */}
      <div className="relative flex flex-col justify-center overflow-hidden bg-[linear-gradient(100deg,#1a2138_0%,#2a2f52_45%,#b5501c_100%)] px-8 py-14 md:px-10">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-50" />
        <div className="relative">
          <p className="mb-3 text-xs font-bold tracking-[0.08em] text-[#ffb020]">
            LO QUE HACEMOS
          </p>
          <h2 className="max-w-xs text-3xl font-extrabold leading-tight text-white">
            Un aliado técnico para todo lo que necesitas
          </h2>
        </div>
      </div>

      {/* Panel derecho: grid de servicios */}
      <div className="grid grid-cols-1 gap-3.5 bg-[#0a0e1a] p-8 sm:grid-cols-2 md:p-10">
        {SERVICES.map((s) => (
          <div
            key={s.title}
            className="group relative flex min-h-[220px] flex-col justify-end overflow-hidden rounded-xl border-l-[3px] p-5 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg"
            style={{ borderLeftColor: s.accent }}
          >
            {/* Imagen de fondo */}
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundImage: `url(${s.image})` }}
            />
            {/* Overlay oscuro para que el texto sea legible sobre cualquier foto */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e1a] via-[#0a0e1acc] to-[#0a0e1a66]" />

            <div className="relative">
              <h3 className="mb-1.5 text-[15px] font-bold text-white">{s.title}</h3>
              <p className="text-[12.5px] leading-relaxed text-[#d8dcf5]">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}