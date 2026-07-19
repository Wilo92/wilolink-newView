"use client";

import { useState } from "react";

// Mismo número que usa FloatingActions.tsx — considera moverlo a un solo
// archivo de constantes compartido (ej. src/lib/constants.ts) cuando tengas
// más lugares que lo necesiten, para no repetirlo en varios componentes.
const WHATSAPP_NUMBER = "573000000000";

export default function CallbackForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const text =
      `Hola, quiero que me llamen de WiloLink.\n\n` +
      `Nombre: ${name}\n` +
      `WhatsApp: ${phone}\n` +
      `Necesito: ${message}`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank", "noopener,noreferrer");
    setSent(true);
  }

  return (
    <section className="bg-[#0a0e1a] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-md rounded-xl border border-[#2a3355] bg-black p-6 font-mono text-[13px] text-[#9aa3c9]">
        <div className="mb-4 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <p className="mb-4 text-[#ffb020]">$ wilolink --contactar</p>

        {sent ? (
          <div className="py-6 text-center">
            <p className="mb-1 text-[#5eead4]">✓ solicitud enviada</p>
            <p className="text-[#8b93b8]">
              Se abrió WhatsApp con tu mensaje — solo dale enviar allá y te
              contacto lo antes posible.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label className="mb-1 block text-[11px] text-[#6b7280]">
              Tu nombre
            </label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Escribe tu nombre completo"
              className="mb-3.5 w-full border-b border-[#232b45] bg-transparent pb-1.5 font-sans text-[15px] text-white outline-none focus:border-[#22d3b8]"
            />

            <label className="mb-1 block text-[11px] text-[#6b7280]">
              Tu WhatsApp
            </label>
            <input
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Ej: 300 123 4567"
              className="mb-3.5 w-full border-b border-[#232b45] bg-transparent pb-1.5 font-sans text-[15px] text-white outline-none focus:border-[#22d3b8]"
            />

            <label className="mb-1 block text-[11px] text-[#6b7280]">
              ¿Qué necesitas?
            </label>
            <textarea
              required
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ej: se me dañó la pantalla de mi laptop y quiero saber si la pueden reparar..."
              className="mb-3.5 w-full resize-none border-b border-[#232b45] bg-transparent pb-1.5 font-sans text-[15px] text-white outline-none focus:border-[#22d3b8]"
            />

            <button
              type="submit"
              className="mt-2 w-full rounded-md bg-[#22d3b8] py-2.5 text-center font-sans font-bold text-[#062119] transition-transform hover:scale-[1.02]"
            >
              Enviar por WhatsApp →
            </button>
          </form>
        )}
      </div>
    </section>
  );
}