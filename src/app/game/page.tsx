"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import confetti from "canvas-confetti";
import Swal from "sweetalert2";

const FASTAPI_URL = process.env.NEXT_PUBLIC_FASTAPI_URL || "http://127.0.0.1:8000";
const API_BASE = `${FASTAPI_URL}/api/v1/ahorcado`;
const ALFABETO = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ".split("");

type Partida = {
  progreso: string;
  intentos: number;
  estado: "jugando" | "gano" | "perdio";
  palabra_correcta: string;
};

export default function GamePage() {
  const [partida, setPartida] = useState<Partida>({
    progreso: "",
    intentos: 4,
    estado: "jugando",
    palabra_correcta: "",
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
        title: "¡QUÉ CHIMBA!",
        text: "HAS LOGRADO ADIVINAR LA PALABRA",
        icon: "success",
        background: "#12172a",
        color: "#f5f3ff",
        confirmButtonColor: "#22d3b8",
        confirmButtonText: "Sos un duro",
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
    if (letrasUsadas.includes(letra) || partida.estado !== "jugando") return;

    try {
      const res = await axios.post(`${API_BASE}/jugar`, { letra });
      setPartida(res.data);
      setLetrasUsadas([...letrasUsadas, letra]);
    } catch (error) {
      console.error("Error enviando letra:", error);
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <div className="overflow-hidden rounded-xl border border-[#232b45] bg-[#0a0e1a] p-6 md:p-8">
        {/* Encabezado */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-extrabold text-white">Juego del Ahorcado</h1>
            <p className="text-sm text-[#8b93b8]">¡Adiviná la palabra! 🎮</p>
          </div>
          <span
            className={`rounded-full px-3.5 py-1.5 text-sm font-bold ${
              partida.intentos <= 1
                ? "bg-red-500/15 text-red-400"
                : "bg-[#ffb020]/15 text-[#ffb020]"
            }`}
          >
            Vidas: {partida.intentos} / 4
          </span>
        </div>

        {/* Palabra en progreso */}
        <div className="my-10 text-center">
          <div className="font-mono text-4xl font-extrabold tracking-[0.3em] text-white md:text-5xl">
            {partida.progreso || "........"}
          </div>
        </div>

        {/* Banner de fin de partida */}
        {partida.estado !== "jugando" && (
          <div
            className={`mb-6 rounded-xl border py-6 text-center ${
              partida.estado === "gano"
                ? "border-[#22d3b8]/40 bg-[#22d3b8]/10"
                : "border-red-500/40 bg-red-500/10"
            }`}
          >
            <h2 className="mb-1 text-lg font-extrabold text-white">
              {partida.estado === "gano" ? "¡FELICIDADES! 🎉" : "¡TE AHORCARON! 💀"}
            </h2>
            {partida.estado === "perdio" && (
              <p className="mb-3 text-sm text-[#d8dcf5]">
                La palabra era: <strong className="text-white">{partida.palabra_correcta}</strong>
              </p>
            )}
            <button
              onClick={nuevoJuego}
              className="mt-2 rounded-lg bg-[#22d3b8] px-6 py-2.5 text-sm font-bold text-[#062119] transition-transform hover:scale-105"
            >
              Jugar de nuevo
            </button>
          </div>
        )}

        {/* Teclado */}
        <div className="flex flex-wrap justify-center gap-2">
          {ALFABETO.map((letra) => {
            const usada = letrasUsadas.includes(letra);
            return (
              <button
                key={letra}
                disabled={usada || partida.estado !== "jugando" || loading}
                onClick={() => enviarLetra(letra)}
                className={`h-11 w-11 rounded-lg text-sm font-bold transition-colors ${
                  usada
                    ? "bg-[#171d33] text-[#3a3f5a]"
                    : "border border-[#22d3b8]/50 text-[#22d3b8] hover:bg-[#22d3b8]/10 disabled:opacity-40"
                }`}
              >
                {letra}
              </button>
            );
          })}
        </div>

        {/* Reiniciar */}
        <div className="mt-8 text-center">
          <button
            onClick={nuevoJuego}
            className="text-xs text-[#6b7280] underline-offset-2 hover:text-[#8b93b8] hover:underline"
          >
            Reiniciar partida
          </button>
        </div>
      </div>
    </section>
  );
}