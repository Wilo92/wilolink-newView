"use client";

import { useEffect, useRef, useState } from "react";

// TODO: cuando conectes el contador de visitas real, reemplaza este número
// por el valor que traigas de tu API/base de datos.
const PLACEHOLDER_VISITS = 1284;

function useBogotaClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-CO", {
      timeZone: "America/Bogota",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return time;
}

// Líneas que se "escriben" una sola vez al montar (no en loop, a diferencia
// del Hero, porque acá el contenido cambia con el tiempo real).
type Line = { prefix: string; value: string; cls?: "g" | "o" | "m" };

function useBootTyping(lines: Line[]) {
  const [revealed, setRevealed] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      const acc: string[] = [];
      for (const line of lines) {
        const full = line.prefix + line.value;
        for (let i = 0; i <= full.length; i++) {
          if (cancelled) return;
          setRevealed([...acc, full.slice(0, i)]);
          await new Promise((r) => setTimeout(r, 16));
        }
        acc.push(full);
        await new Promise((r) => setTimeout(r, 120));
      }
      if (!cancelled) setDone(true);
    }
    run();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { revealed, done };
}

export default function StatsSection() {
  const time = useBogotaClock();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlayVideo, setCanPlayVideo] = useState(true);

  useEffect(() => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const conn = (navigator as any).connection;
    const saveData = conn?.saveData || ["slow-2g", "2g", "3g"].includes(conn?.effectiveType);
    setCanPlayVideo(!reduceMotion && !saveData);
  }, []);

  const lines: Line[] = [
    { prefix: "", value: "$ wilolink --status", cls: "g" },
    { prefix: "experiencia .......... ", value: "+2 años", cls: "o" },
    { prefix: "trabajos-completados .. ", value: "+200", cls: "o" },
    {
      prefix: "visitas-totales ....... ",
      value: PLACEHOLDER_VISITS.toLocaleString("es-CO"),
      cls: "m",
    },
  ];

  const { revealed, done } = useBootTyping(lines);

  return (
    <section className="grid grid-cols-1 bg-[#0a0e1a] md:grid-cols-2">
      {/* Columna izquierda: fondo de la sección, con la terminal centrada adentro */}
      <div className="flex items-center justify-center bg-[#0a0e1a] p-8 md:p-10">
        <div className="w-full max-w-sm rounded-xl border border-[#2a3355] bg-black p-5 font-mono text-[13px] text-[#9aa3c9]">
          {/* Barra de título, como una ventana de terminal real */}
          <div className="mb-3 flex gap-1.5 border-b border-[#1c2340] pb-3">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>

        {revealed.map((line, i) => (
          <div key={i} className="min-h-[20px] whitespace-pre">
            {line}
          </div>
        ))}

        {/* Línea de la hora: solo aparece cuando terminó de "escribir" lo demás,
            y se actualiza cada segundo sin animación de tecleo (sería raro
            re-escribir la hora letra por letra 60 veces por minuto) */}
        {done && (
          <div className="min-h-[20px] whitespace-pre">
            {"hora-local ............ "}
            <span className="text-[#5eead4]">{time}</span>
          </div>
        )}
        {done && (
          <div className="min-h-[20px]">
            $ <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-[#5eead4]" />
          </div>
        )}
        </div>
      </div>

      {/* Video de fondo con temática orbit */}
      <div className="relative min-h-[260px]">
        {canPlayVideo && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          >
            <source src="/stats-orbit-bg.mp4" type="video/mp4" />
          </video>
        )}
        {/* overlay oscuro para que el video no entre tan fuerte */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e1a]/70 via-[#0a0e1a]/30 to-[#0a0e1a]/60" />
      </div>
    </section>
  );
}