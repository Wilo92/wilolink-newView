"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import Swal from "sweetalert2";
import { Heart, RotateCcw } from "lucide-react";

// Misma variable de entorno que ya tienes configurada en Vercel.
const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || "http://127.0.0.1:8000";
const API_BASE = `${FASTAPI_URL}/api/v1/ahorcado`;

const ALFABETO = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");
const VIDAS_TOTALES = 4;

const PASOS = [
  { titulo: "Elige una letra", texto: "Toca cualquiera del teclado de abajo." },
  { titulo: "Si acierta, aparece", texto: "Si no está en la palabra, pierdes una vida." },
  { titulo: "Complétala a tiempo", texto: "Descúbrela entera antes de quedarte sin vidas." },
];

const ESTADOS_MUNECO = [
  "Todavía no has fallado.",
  "Primer fallo. Tranquilo.",
  "Dos fallos. Ojo con la siguiente.",
  "Tres fallos. Queda una sola vida.",
  "Se acabó. Lo ahorcaste.",
];

type Partida = {
  progreso: string;
  intentos: number;
  estado: "jugando" | "gano" | "perdio";
  palabra_correcta?: string;
};

export default function GamePage() {
  const [partida, setPartida] = useState<Partida>({
    progreso: "",
    intentos: VIDAS_TOTALES,
    estado: "jugando",
  });
  const [letrasUsadas, setLetrasUsadas] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    nuevoJuego();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (partida.estado === "gano") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#22d3b8", "#ffb020", "#ffffff", "#1a2138"],
      });

      Swal.fire({
        title: "¡La sacaste!",
        text: "Adivinaste la palabra sin quedarte sin vidas.",
        icon: "success",
        background: "#12172a",
        color: "#f5f3ff",
        confirmButtonColor: "#22d3b8",
        confirmButtonText: "Otra vez",
      });
    }
  }, [partida.estado]);

  async function nuevoJuego() {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/nuevo`, {});
      setPartida(res.data);
      setLetrasUsadas([]);
    } catch (error) {
      console.error("Error iniciando juego:", error);
    } finally {
      setLoading(false);
    }
  }

  async function enviarLetra(letra: string) {
    if (letrasUsadas.includes(letra) || partida.estado !== "jugando" || loading) return;

    try {
      const res = await axios.post(`${API_BASE}/jugar`, { letra });
      setPartida(res.data);
      setLetrasUsadas((prev) => [...prev, letra]);
    } catch (error) {
      console.error("Error enviando letra:", error);
    }
  }

  // El backend devuelve el progreso como "F R _ N T _ _"
  const casillas = partida.progreso ? partida.progreso.trim().split(/\s+/) : [];
  const acertada = (letra: string) => letrasUsadas.includes(letra) && casillas.includes(letra);
  const fallada = (letra: string) => letrasUsadas.includes(letra) && !casillas.includes(letra);

  const errores = Math.max(0, Math.min(VIDAS_TOTALES, VIDAS_TOTALES - partida.intentos));

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 md:py-16">
      {/* ---------- Encabezado ---------- */}
      <div className="mb-9 flex flex-col gap-4">
        <div className="flex items-center gap-2.5">
          <span className="h-[7px] w-[7px] rounded-full bg-[#ffb020]" />
          <span className="text-[12px] font-bold uppercase tracking-[0.14em] text-[#ffb020]">
            Un descanso
          </span>
        </div>

        <h1 className="text-3xl font-extrabold leading-tight text-white md:text-[40px]">
          Juego del Ahorcado
        </h1>

        <p className="max-w-xl text-[16px] leading-relaxed text-[#b9c0dd] md:text-[17px]">
          Adivina la palabra oculta letra por letra. Todas salen del mundo de la programación:
          lenguajes, herramientas y conceptos que se usan a diario. Tienes cuatro intentos fallidos
          antes de perder.
        </p>
      </div>

      {/* ---------- Cómo se juega ---------- */}
      <div className="mb-9 grid grid-cols-1 gap-3.5 md:grid-cols-3">
        {PASOS.map((paso) => (
          <div
            key={paso.titulo}
            className="flex flex-col gap-1.5 rounded-2xl border border-[#232b45] bg-[#0d1220] px-5 py-4"
          >
            <h2 className="text-[15px] font-bold text-white">{paso.titulo}</h2>
            <p className="text-[13.5px] leading-relaxed text-[#9aa3c6]">{paso.texto}</p>
          </div>
        ))}
      </div>

      {/* ---------- Panel del juego ---------- */}
      <div className="rounded-2xl border border-[#232b45] bg-[#0a0e1a] p-6 md:p-8">
        {/* Cabecera del panel */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-[12px] font-bold uppercase tracking-[0.12em] text-[#8b93b8]">
              Palabra en juego
            </span>
            <span className="text-sm text-[#9aa3c6]">
              {casillas.length > 0
                ? `${casillas.length} letras · término de programación`
                : "Cargando palabra…"}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[13px] font-semibold text-[#9aa3c6]">Vidas</span>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: VIDAS_TOTALES }).map((_, i) => (
                <Heart
                  key={i}
                  className={`h-5 w-5 ${
                    i < partida.intentos
                      ? "fill-[#ffb020] text-[#ffb020]"
                      : "fill-transparent text-[#3d4566]"
                  }`}
                />
              ))}
            </div>
            <span
              className={`rounded-full px-3 py-1.5 text-[13px] font-bold ${
                partida.intentos <= 1
                  ? "bg-red-500/15 text-red-400"
                  : "bg-[#ffb020]/15 text-[#ffb020]"
              }`}
            >
              {partida.intentos} / {VIDAS_TOTALES}
            </span>
          </div>
        </div>

        {/* Muñeco + palabra */}
        <div className="flex flex-col items-center gap-6 py-4 md:flex-row md:items-center md:justify-center md:gap-10">
          <div className="flex flex-col items-center gap-2">
            <Muneco errores={errores} gano={partida.estado === "gano"} />
            <span className="text-center text-[12.5px] text-[#8b93b8]">
              {partida.estado === "gano" ? "¡Se salvó!" : ESTADOS_MUNECO[errores]}
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-2.5 md:gap-3">
            {casillas.map((c, i) => {
              const revelada = c !== "_";
              return (
                <span
                  key={i}
                  className={`flex h-[58px] w-[44px] items-center justify-center rounded-t-lg font-mono text-[26px] font-extrabold transition-colors md:h-[62px] md:w-[52px] md:text-[30px] ${
                    revelada
                      ? "border-b-[3px] border-[#22d3b8] bg-[#12172a] text-white"
                      : "border-b-[3px] border-[#2a3355] bg-[#0d1220] text-transparent"
                  }`}
                >
                  {revelada ? c : "·"}
                </span>
              );
            })}
          </div>
        </div>

        {/* Fin de partida */}
        {partida.estado !== "jugando" && (
          <div
            className={`my-6 rounded-2xl border py-6 text-center ${
              partida.estado === "gano"
                ? "border-[#22d3b8]/40 bg-[#22d3b8]/10"
                : "border-red-500/40 bg-red-500/10"
            }`}
          >
            <h3 className="mb-1.5 text-lg font-extrabold text-white">
              {partida.estado === "gano" ? "¡La sacaste!" : "Se acabaron las vidas"}
            </h3>
            <p className="mb-4 text-sm text-[#d8dcf5]">
              {partida.estado === "gano" ? (
                "Adivinaste la palabra sin quedarte sin vidas."
              ) : (
                <>
                  La palabra era{" "}
                  <strong className="text-white">{partida.palabra_correcta}</strong>. Vuelve a
                  intentarlo.
                </>
              )}
            </p>
            <button
              onClick={nuevoJuego}
              className="rounded-xl bg-[#22d3b8] px-6 py-2.5 text-sm font-bold text-[#062119] transition-transform hover:scale-[1.03]"
            >
              Jugar de nuevo
            </button>
          </div>
        )}

        {/* Teclado */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {ALFABETO.map((letra) => {
            const ok = acertada(letra);
            const mal = fallada(letra);
            const usada = ok || mal;

            return (
              <button
                key={letra}
                disabled={usada || partida.estado !== "jugando" || loading}
                onClick={() => enviarLetra(letra)}
                aria-label={`Letra ${letra}`}
                className={`h-11 w-11 rounded-lg text-sm font-bold transition-colors ${
                  ok
                    ? "border border-[#22d3b8] bg-[#22d3b8] text-[#062119]"
                    : mal
                    ? "border border-red-400/40 bg-red-400/10 text-red-400"
                    : "border border-[#22d3b8]/45 text-[#22d3b8] hover:bg-[#22d3b8]/10 disabled:opacity-40"
                }`}
              >
                {letra}
              </button>
            );
          })}
        </div>

        {/* Leyenda */}
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#1b2238] pt-5">
          <div className="flex flex-wrap items-center gap-5">
            <Leyenda color="bg-[#22d3b8]" texto="Acertada" />
            <Leyenda color="bg-red-400/25 border border-red-400/50" texto="Fallada" />
            <Leyenda color="border border-[#22d3b8]/45" texto="Sin usar" />
          </div>

          <button
            onClick={nuevoJuego}
            className="flex items-center gap-2 rounded-xl border border-[#2a3355] px-4 py-2.5 text-[13.5px] font-semibold text-[#b9c0dd] transition-colors hover:border-[#22d3b8]/60 hover:text-white"
          >
            <RotateCcw className="h-[15px] w-[15px]" />
            Empezar de nuevo
          </button>
        </div>
      </div>

      <p className="mt-6 text-center text-[13.5px] text-[#8b93b8]">
        Las palabras salen de una lista de términos de programación. ¿Se te ocurre alguna que falte?{" "}
        <a href="/contacto" className="text-[#22d3b8] underline underline-offset-2">
          Mándamela
        </a>
        .
      </p>
    </section>
  );
}

/* ---------------- El muñeco ---------------- */

function Muneco({ errores, gano }: { errores: number; gano: boolean }) {
  const muerto = errores >= 4 && !gano;

  // El color se va calentando con cada fallo.
  const color = gano ? "#22d3b8" : muerto ? "#f87171" : errores >= 3 ? "#ffb020" : "#22d3b8";
  const relleno = muerto
    ? "rgba(248,113,113,0.18)"
    : !gano && errores >= 3
    ? "rgba(255,176,32,0.18)"
    : "rgba(34,211,184,0.18)";

  // Al ganar siempre se muestra la cabeza, aunque no haya habido fallos.
  const hayCabeza = errores >= 1 || gano;

  return (
    <svg
      viewBox="0 0 150 190"
      className="h-[186px] w-[147px] shrink-0 md:h-[200px] md:w-[158px]"
      role="img"
      aria-label={gano ? "El personaje se salvó" : `Personaje del ahorcado con ${errores} de 4 fallos`}
    >
      {/* Horca */}
      <g stroke="#2a3355" strokeWidth="7" strokeLinecap="round" fill="none">
        <path d="M12 178 H92" />
        <path d="M32 178 V14" />
        <path d="M32 14 H98" />
        <path d="M98 14 V30" />
      </g>

      {/* 3 · brazos (detrás del cuerpo) */}
      {errores >= 3 && (
        <g fill={relleno} stroke={color} strokeWidth="2.8">
          <rect x="70" y="69" width="11" height="24" rx="5.5" />
          <rect x="115" y="69" width="11" height="24" rx="5.5" />
        </g>
      )}

      {/* 4 · piernas */}
      {errores >= 4 && (
        <g fill={relleno} stroke={color} strokeWidth="2.8">
          <rect x="86" y="100" width="11" height="26" rx="5.5" />
          <rect x="100" y="100" width="11" height="26" rx="5.5" />
        </g>
      )}

      {/* 2 · cuerpo */}
      {errores >= 2 && (
        <rect
          x="84"
          y="64"
          width="28"
          height="36"
          rx="11"
          fill={relleno}
          stroke={color}
          strokeWidth="3.2"
        />
      )}

      {/* 1 · cabeza y cara */}
      {hayCabeza && (
        <>
          <rect
            x="80"
            y="30"
            width="36"
            height="34"
            rx="12"
            fill="#12172a"
            stroke={color}
            strokeWidth="3.5"
          />

          {muerto ? (
            <g stroke={color} strokeLinecap="round" fill="none">
              <path d="M85 41 l7 7 M92 41 l-7 7" strokeWidth="3" />
              <path d="M102 41 l7 7 M109 41 l-7 7" strokeWidth="3" />
              <path d="M92 57 q6 6 12 0" strokeWidth="2.8" />
              <path d="M96 59 v6" strokeWidth="2.8" />
            </g>
          ) : (
            <>
              <circle cx="90" cy="45" r="4.6" fill="#ffffff" />
              <circle cx="90" cy="46" r="2.2" fill="#0a0e1a" />
              <circle cx="106" cy="45" r="4.6" fill="#ffffff" />
              <circle cx="106" cy="46" r="2.2" fill="#0a0e1a" />
              <path
                d={
                  gano
                    ? "M92 56 q6 7 12 0"
                    : errores >= 3
                    ? "M92 59 q6 -5 12 0"
                    : errores === 2
                    ? "M92 57 h12"
                    : "M92 56 q6 4 12 0"
                }
                stroke={color}
                strokeWidth="2.8"
                strokeLinecap="round"
                fill="none"
              />
            </>
          )}
        </>
      )}
    </svg>
  );
}

function Leyenda({ color, texto }: { color: string; texto: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-3.5 w-3.5 rounded ${color}`} />
      <span className="text-[13px] text-[#9aa3c6]">{texto}</span>
    </div>
  );
}