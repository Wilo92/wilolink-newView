"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  ShieldCheck,
  Layers,
  Send,
  Loader2,
  Info,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

// Misma variable de entorno que ya tienes configurada en Vercel.
const API_URL = process.env.NEXT_PUBLIC_AGENTE_API_URL || "http://localhost:8000";

const SUGERENCIAS = [
  "¿Cómo protejo los datos de mis clientes?",
  "Quiero una app para mi negocio",
  "¿Qué es una contraseña segura de verdad?",
];

const PASOS = [
  {
    icono: MessageSquare,
    titulo: "Escribes tu pregunta",
    texto: "En palabras normales. No hace falta saber de programación ni usar términos técnicos.",
  },
  {
    icono: ShieldCheck,
    titulo: "Analisis de seguridad informatica",
    texto:
      "El primer especialista señala qué puede salir mal y qué conviene proteger desde el inicio.",
  },
  {
    icono: Layers,
    titulo: "Analisis de desarrollo de software",
    texto: "El segundo parte de ese análisis y plantea cómo construirlo, paso por paso.",
  },
];

const STACK = ["FastAPI", "LangGraph", "Gemini 2.5 Flash", "Next.js", "Railway", "Vercel"];

const WHATSAPP =
  "https://wa.me/573003553762?text=" +
  encodeURIComponent("Hola Wilo, vengo de wilolink.com y quiero hablar sobre un proyecto.");

type Respuesta = {
  user: string;
  agente1: string | null; // riesgos / ciberseguridad
  agente2: string | null; // cómo construirlo / arquitectura
  error?: string;
};

export default function AgenteIAPage() {
  const [prompt, setPrompt] = useState("");
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const finRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    finRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [respuestas]);

  async function consultar(texto: string) {
    const consulta = texto.trim();
    if (!consulta || isLoading) return;

    setIsLoading(true);
    setPrompt("");
    setRespuestas((prev) => [...prev, { user: consulta, agente1: null, agente2: null }]);

    try {
      const response = await fetch(`${API_URL}/api/v1/agentes/consulta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consulta }),
      });

      if (!response.ok) throw new Error(`El servidor respondió ${response.status}`);

      const data = await response.json();

      setRespuestas((prev) => {
        const copia = [...prev];
        copia[copia.length - 1] = {
          ...copia[copia.length - 1],
          agente1: data.ciberseguridad_reporte,
          agente2: data.software_reporte,
        };
        return copia;
      });
    } catch (error) {
      console.error(error);
      setRespuestas((prev) => {
        const copia = [...prev];
        copia[copia.length - 1] = {
          ...copia[copia.length - 1],
          error: "No pudimos conectar con los especialistas. Intenta de nuevo en un momento.",
        };
        return copia;
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleEnviar(e: React.FormEvent) {
    e.preventDefault();
    consultar(prompt);
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 md:py-16">
      {/* ---------- Encabezado ---------- */}
      <div className="mb-10 flex flex-col gap-4">
        <h1 className="text-3xl font-extrabold leading-tight text-white md:text-[42px]">
          Seguridad y Desarrollo:
          <br className="hidden md:block" /> Dos especialistas de IA en una sola respuesta
        </h1>

        <p className="max-w-2xl text-[16px] leading-relaxed text-[#b9c0dd] md:text-[17px]">
          Pregunta lo que quieras sobre tecnología. Te responden dos agentes de IA expertos en seguridad
          informática y desarrollo de software.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <span className="text-[11.5px] font-semibold uppercase tracking-[0.1em] text-[#5b6488]">
            Hecho con
          </span>
          {STACK.map((t) => (
            <span
              key={t}
              className="rounded-md border border-[#232b45] bg-[#0d1220] px-2.5 py-1 text-[11.5px] font-medium text-[#8b93b8]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ---------- Los tres pasos ---------- */}
      <div className="mb-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {PASOS.map((paso) => {
          const Icono = paso.icono;
          return (
            <div
              key={paso.titulo}
              className="flex flex-col gap-2.5 rounded-2xl border border-[#232b45] bg-[#0d1220] p-5"
            >
              <Icono className="h-[18px] w-[18px] text-[#4b5578]" />
              <h2 className="text-[16px] font-bold text-white">{paso.titulo}</h2>
              <p className="text-[14px] leading-relaxed text-[#9aa3c6]">{paso.texto}</p>
            </div>
          );
        })}
      </div>

      {/* ---------- Panel de conversación ---------- */}
      <div className="overflow-hidden rounded-2xl border border-[#232b45] bg-[#0a0e1a]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#232b45] bg-[#12172a] px-5 py-4">
          <div className="flex items-center gap-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-[17px] w-[17px] text-[#22d3b8]" />
              <span className="text-sm font-bold text-[#22d3b8]">Seguridad Informatica</span>
            </div>
            <span className="h-[18px] w-px bg-[#2a3355]" />
            <div className="flex items-center gap-2">
              <Layers className="h-[17px] w-[17px] text-[#ffb020]" />
              <span className="text-sm font-bold text-[#ffb020]">Desarrollo de Software</span>
            </div>
          </div>
          {isLoading ? (
            <span className="flex items-center gap-2 text-[12.5px] text-[#8b93b8]">
              <Loader2 className="h-3.5 w-3.5 animate-spin" /> Pensando…
            </span>
          ) : (
            <span className="text-[12.5px] text-[#8b93b8]">La respuesta tarda unos segundos</span>
          )}
        </div>

        {/* Área de mensajes */}
        <div className="h-[520px] overflow-y-auto px-5 py-6">
          {respuestas.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
              <p className="text-[15px] font-semibold text-[#b9c0dd]">
                Escribe tu primera pregunta
              </p>
              <p className="max-w-sm text-[13.5px] leading-relaxed text-[#8b93b8]">
                O toca una de las sugerencias de abajo para ver cómo responden.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {respuestas.map((item, index) => (
                <div key={index}>
                  <div className="mb-3 flex justify-end">
                    <span className="inline-block max-w-[85%] rounded-2xl rounded-br-sm bg-[#22d3b8] px-4 py-2.5 text-left text-[13.5px] font-semibold leading-relaxed text-[#062119]">
                      {item.user}
                    </span>
                  </div>

                  {item.error ? (
                    <div className="flex items-start gap-2.5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                      <p className="text-[13.5px] leading-relaxed text-red-300">{item.error}</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
                      <Tarjeta
                        icono={<ShieldCheck className="h-[15px] w-[15px] text-[#22d3b8]" />}
                        titulo="Riesgos a cuidar"
                        color="#22d3b8"
                        contenido={item.agente1}
                      />
                      <Tarjeta
                        icono={<Layers className="h-[15px] w-[15px] text-[#ffb020]" />}
                        titulo="Cómo construirlo"
                        color="#ffb020"
                        contenido={item.agente2}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div ref={finRef} />
            </div>
          )}
        </div>

        {/* Sugerencias */}
        <div className="flex flex-col gap-2.5 px-5 pb-4">
          <span className="text-[12.5px] font-semibold text-[#8b93b8]">
            O prueba con una de estas
          </span>
          <div className="flex flex-wrap gap-2">
            {SUGERENCIAS.map((s) => (
              <button
                key={s}
                type="button"
                disabled={isLoading}
                onClick={() => consultar(s)}
                className="rounded-full border border-[#2a3355] bg-[#12172a] px-4 py-2.5 text-[13px] text-[#b9c0dd] transition-colors hover:border-[#22d3b8]/60 hover:text-white disabled:opacity-40"
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Campo de texto */}
        <form
          onSubmit={handleEnviar}
          className="flex items-center gap-2.5 border-t border-[#232b45] p-4"
        >
          <label htmlFor="prompt" className="sr-only">
            Tu pregunta
          </label>
          <input
            id="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={
              isLoading
                ? "Los especialistas están pensando…"
                : "Describe tu idea o escribe tu pregunta…"
            }
            disabled={isLoading}
            className="flex-1 rounded-xl border border-[#2a3355] bg-[#12172a] px-4 py-3 text-sm text-white outline-none transition-colors placeholder:text-[#6b7280] focus:border-[#22d3b8] disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="flex shrink-0 items-center gap-2 rounded-xl bg-[#22d3b8] px-5 py-3 text-sm font-bold text-[#062119] transition-transform hover:scale-[1.03] disabled:scale-100 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Pensando…
              </>
            ) : (
              <>
                Preguntar <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>

      {/* ---------- Aviso ---------- */}
      <div className="mt-6 flex items-start gap-3 rounded-xl border border-[#ffb020]/30 bg-[#ffb020]/[0.07] px-4 py-3.5">
        <Info className="mt-0.5 h-[17px] w-[17px] shrink-0 text-[#ffb020]" />
        <p className="text-[13.5px] leading-relaxed text-[#e0c48a]">
          Las respuestas las genera un modelo de inteligencia artificial. Sirven como punto de
          partida para orientarte, no como una asesoría definitiva. Si tu proyecto es serio,{" "}
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#ffb020] underline underline-offset-2"
          >
            hablemos directamente
          </a>
          .
        </p>
      </div>
    </section>
  );
}

/* ---------- Tarjeta de respuesta ---------- */

function Tarjeta({
  icono,
  titulo,
  color,
  contenido,
}: {
  icono: React.ReactNode;
  titulo: string;
  color: string;
  contenido: string | null;
}) {
  return (
    <div className="rounded-2xl border border-[#232b45] bg-[#12172a] p-4">
      <div className="mb-3 flex items-center gap-2">
        {icono}
        <span className="text-[11.5px] font-bold uppercase tracking-[0.1em]" style={{ color }}>
          {titulo}
        </span>
      </div>

      {contenido ? (
        <div className="prose prose-invert prose-sm max-w-none text-[#d8dcf5] prose-headings:text-white prose-strong:text-white prose-a:text-[#22d3b8]">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{contenido}</ReactMarkdown>
        </div>
      ) : (
        <div className="space-y-2.5">
          <div className="h-3 w-full animate-pulse rounded bg-[#232b45]" />
          <div className="h-3 w-11/12 animate-pulse rounded bg-[#232b45]" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-[#232b45]" />
        </div>
      )}
    </div>
  );
}