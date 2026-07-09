"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Bot, Send, Loader2 } from "lucide-react";

// La URL de tu FastAPI en Railway. Configúrala en Vercel como variable de
// entorno NEXT_PUBLIC_AGENTE_API_URL (Settings → Environment Variables).
const API_URL = process.env.NEXT_PUBLIC_AGENTE_API_URL || "http://localhost:8000";

type Respuesta = {
  user: string;
  agente1: string | null; // ciberseguridad
  agente2: string | null; // software development
};

export default function AgenteIAPage() {
  const [prompt, setPrompt] = useState("");
  const [respuestas, setRespuestas] = useState<Respuesta[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleEnviar(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);

    const nuevoMensajeUsuario: Respuesta = {
      user: prompt,
      agente1: null,
      agente2: null,
    };
    setRespuestas((prev) => [...prev, nuevoMensajeUsuario]);

    const promptEnviado = prompt;
    setPrompt("");

    try {
      const response = await fetch(`${API_URL}/api/v1/agentes/consulta`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ consulta: promptEnviado }),
      });

      if (!response.ok) throw new Error("Error en la respuesta del servidor");

      const data = await response.json();

      setRespuestas((prev) => {
        const actualizadas = [...prev];
        const ultimoIndex = actualizadas.length - 1;
        actualizadas[ultimoIndex] = {
          ...actualizadas[ultimoIndex],
          agente1: data.ciberseguridad_reporte,
          agente2: data.software_reporte,
        };
        return actualizadas;
      });
    } catch (error) {
      console.error(error);
      alert("Error al enviar la consulta a los agentes");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-10 md:py-14">
      <h1 className="mb-5 text-2xl font-extrabold text-white">Asistente IA</h1>

      <div className="overflow-hidden rounded-xl border border-[#232b45] bg-[#0a0e1a]">
        {/* Encabezado */}
        <div className="flex items-center justify-between border-b border-[#232b45] bg-[#12172a] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <Bot className="h-5 w-5 text-[#22d3b8]" />
            <p className="text-sm font-bold text-[#22d3b8]">
              Sistema multiagente especializado con agentes de Cybersecurity y
              Software Development.
            </p>
          </div>
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-[#22d3b8]" />}
        </div>

        {/* Área de chat */}
        <div className="h-[500px] overflow-y-auto bg-[#0a0e1a] px-5 py-6">
          {respuestas.length === 0 && !isLoading && (
            <p className="mt-16 text-center text-sm text-[#6b7280]">
              Escribir una pregunta
            </p>
          )}

          <div className="flex flex-col gap-5">
            {respuestas.map((item, index) => (
              <div key={index}>
                <div className="mb-3 text-right">
                  <span className="inline-block rounded-full bg-[#22d3b8] px-3.5 py-1.5 text-[12.5px] font-semibold text-[#062119]">
                    El usuario: {item.user}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                  {/* Agente ciberseguridad */}
                  <div className="rounded-xl border border-[#232b45] bg-[#12172a] p-4">
                    <strong className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-[#22d3b8]">
                      Agente especialista en ciberseguridad
                    </strong>
                    {item.agente1 ? (
                      <div className="prose prose-invert prose-sm max-w-none text-[#d8dcf5]">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {item.agente1}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="h-3 w-full animate-pulse rounded bg-[#232b45]" />
                        <div className="h-3 w-4/5 animate-pulse rounded bg-[#232b45]" />
                      </div>
                    )}
                  </div>

                  {/* Agente software development */}
                  <div className="rounded-xl border border-[#232b45] bg-[#12172a] p-4">
                    <strong className="mb-1.5 block text-[12px] font-bold uppercase tracking-wide text-[#ffb020]">
                      Agente especialista en desarrollo de software
                    </strong>
                    {item.agente2 ? (
                      <div className="prose prose-invert prose-sm max-w-none text-[#d8dcf5]">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {item.agente2}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <div className="h-3 w-full animate-pulse rounded bg-[#232b45]" />
                        <div className="h-3 w-3/5 animate-pulse rounded bg-[#232b45]" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Input */}
        <form
          onSubmit={handleEnviar}
          className="flex items-center gap-2.5 border-t border-[#232b45] bg-[#0a0e1a] p-4"
        >
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder={isLoading ? "Los agentes están pensando..." : "Escribe tu prompt aquí..."}
            disabled={isLoading}
            className="flex-1 rounded-lg border border-[#2a3355] bg-[#12172a] px-4 py-2.5 text-sm text-white outline-none placeholder:text-[#6b7280] focus:border-[#22d3b8] disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isLoading || !prompt.trim()}
            className="flex items-center gap-2 rounded-lg bg-[#22d3b8] px-4 py-2.5 text-sm font-bold text-[#062119] transition-transform hover:scale-105 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Pensando...
              </>
            ) : (
              <>
                Preguntar <Send className="h-4 w-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}