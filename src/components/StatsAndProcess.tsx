"use client";

import { useEffect, useState } from "react";

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

function getBogotaDate() {
  return new Intl.DateTimeFormat("es-CO", {
    timeZone: "America/Bogota",
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

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

function StatsTerminal() {
  const time = useBogotaClock();

  const date = getBogotaDate();

  const lines: Line[] = [
    { prefix: "", value: "$ wilobyte --status", cls: "g" },
    { prefix: "experiencia .......... ", value: "+2 años", cls: "o" },
    { prefix: "trabajos-completados .. ", value: "+200", cls: "o" },
    {
      prefix: "visitas-totales ....... ",
      value: PLACEHOLDER_VISITS.toLocaleString("es-CO"),
      cls: "m",
    },
    { prefix: "", value: "$ date --now", cls: "g" },
  ];

  const { revealed, done } = useBootTyping(lines);

  return (
    <div className="flex justify-center md:justify-start">
      <div className="w-full max-w-md overflow-x-auto rounded-xl border border-[#2a3355] bg-black p-4 font-mono text-xs text-[#9aa3c9] sm:p-5 sm:text-[13px]">
        <div className="mb-3 flex gap-1.5 border-b border-[#1c2340] pb-3">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>

        {revealed.map((line, i) => (
          <div key={i} className="min-h-[20px] whitespace-pre-wrap break-all">
            {line.startsWith("$") ? (
              <span className="text-[#ffb020]">{line}</span>
            ) : (
              line
            )}
          </div>
        ))}

        {/* Línea de la hora: solo aparece cuando terminó de "escribir" lo demás,
            y se actualiza cada segundo sin animación de tecleo (sería raro
            re-escribir la hora letra por letra 60 veces por minuto) */}
        {done && (
          <div className="min-h-[20px] whitespace-pre-wrap break-words">
            {"fecha-actual .......... "}
            <span className="text-[#ffb020]">{date}</span>
          </div>
        )}
        {done && (
          <div className="min-h-[20px] whitespace-pre-wrap break-words">
            {"hora-local ............ "}
            <span className="text-[#5eead4]">{time}</span>
          </div>
        )}
        {done && (
          <div className="min-h-[20px]">
            ${" "}
            <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-[#5eead4]" />
          </div>
        )}
      </div>
    </div>
  );
}

const STEPS = [
  { num: "1", title: "Analizamos", color: "#22d3b8" },
  { num: "2", title: "Diseñamos", color: "#ffb020" },
  { num: "3", title: "Desarrollamos", color: "#22d3b8" },
  { num: "4", title: "Implementamos", color: "#ffb020" },
  { num: "5", title: "Acompañamos", color: "#22d3b8" },
] as const;

function ProcessTimeline() {
  return (
    <div className="w-full">
      <h2 className="mb-1 text-center text-2xl font-extrabold text-white md:text-3xl">
        Nuestra forma de trabajar
      </h2>

      {/* --- Versión mobile: vertical, con la línea a la izquierda --- */}
      {/* --- Versión mobile: vertical y centrada --- */}
      <div className="flex flex-col items-center lg:hidden">
        <div className=" flex w-full max-w-xs flex-col items-center">
          {STEPS.map((step, i) => (
            <div
              key={step.num}
              className="relative flex w-full flex-col items-center pb-8 last:pb-0"
            >
              

              <div
                className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-[#0a0e1a] font-extrabold"
                style={{
                  borderColor: step.color,
                  color: step.color,
                }}
              >
                {step.num}
              </div>

              <div className="mt-2 text-center text-[15px] font-bold text-white">
                {step.title}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Versión desktop: horizontal, con la línea arriba --- */}
      <div className="relative hidden lg:flex lg:justify-between">
        <div className="absolute left-[8%] right-[8%] top-[19px] h-0.5 bg-[#232b45]" />
        {STEPS.map((step) => (
          <div
            key={step.num}
            className="relative z-10 flex w-[18%] flex-col items-center text-center"
          >
            <div
              className="mb-2.5 flex h-10 w-10 items-center justify-center rounded-full border-2 bg-[#0a0e1a] font-extrabold"
              style={{ borderColor: step.color, color: step.color }}
            >
              {step.num}
            </div>
            <div className="text-sm font-bold text-white">{step.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StatsAndProcess() {
  return (
    <section className="flex min-h-screen items-center overflow-hidden bg-[#0a0e1a] px-4 py-12 sm:px-6 sm:py-16 md:min-h-0 md:px-10 md:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:items-center md:gap-10">
        <StatsTerminal />
        <ProcessTimeline />
      </div>
    </section>
  );
}
