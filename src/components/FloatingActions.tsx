"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";

// TODO: reemplaza por tu número real, formato internacional sin + ni espacios (ej. 573001234567)
const WHATSAPP_NUMBER = "573003553762";
const WHATSAPP_MESSAGE = "Hola, vi tu sitio WiloLink y quiero saber más sobre tus servicios.";

// TODO: reemplaza por tu link corto de reseña de Google Business
// (se genera en Google Business Profile, no es la URL normal de tu ficha)
const GOOGLE_REVIEW_URL = "https://g.page/r/TU-ID-AQUI/review";

const OPTIONS = [
  {
    key: "google",
    label: "¿Te ayudamos? Cuéntalo ★",
    href: GOOGLE_REVIEW_URL,
    bg: "bg-white",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5">
        <path fill="#4285F4" d="M22 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.6c-.2 1.3-1 2.4-2.1 3.1v2.6h3.4c2-1.8 3.1-4.5 3.1-7.6z" />
        <path fill="#34A853" d="M12 22c2.8 0 5.2-.9 6.9-2.5l-3.4-2.6c-.9.6-2.1 1-3.5 1-2.7 0-5-1.8-5.8-4.3H2.7v2.7C4.4 19.8 7.9 22 12 22z" />
        <path fill="#FBBC05" d="M6.2 13.6c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V6.9H2.7C1.9 8.4 1.5 10.1 1.5 12s.4 3.6 1.2 5.1z" />
        <path fill="#EA4335" d="M12 5.6c1.5 0 2.9.5 4 1.5l3-3C17.2 2.3 14.8 1.4 12 1.4 7.9 1.4 4.4 3.6 2.7 6.9l3.5 2.7c.8-2.5 3.1-4 5.8-4z" />
      </svg>
    ),
  },
  {
    key: "whatsapp",
    label: "Escríbenos por WhatsApp",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`,
    bg: "bg-[#22d3b8]",
    icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5 fill-[#0a1f1c]">
        <path d="M12 2a10 10 0 0 0-8.5 15.2L2 22l4.9-1.5A10 10 0 1 0 12 2zm5.3 14.2c-.2.6-1.3 1.2-1.9 1.3-.5.1-1.1.1-1.7-.1-.4-.1-.9-.3-1.6-.6-2.8-1.2-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.8 0-1.3.7-2 1-2.3.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5.2.5.7 1.8.8 1.9.1.1.1.3 0 .5-.1.2-.2.3-.3.5-.2.2-.3.3-.5.5-.2.2-.3.4-.1.7.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.7-.1.2-.2.7-.8.9-1.1.2-.3.4-.2.6-.1.2.1 1.5.7 1.8.8.3.1.5.2.5.3.1.2.1.6-.1 1.1z" />
      </svg>
    ),
  },
] as const;

export default function FloatingActions() {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // cierra si el usuario hace click fuera del componente
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open &&
          OPTIONS.map((opt, i) => (
            <motion.a
              key={opt.key}
              href={opt.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.9 }}
              transition={{ duration: 0.15, delay: i * 0.04 }}
              className="flex items-center gap-2.5"
            >
              <span className="rounded-lg border border-[#2a3355] bg-[#171d33] px-3 py-1.5 text-xs font-medium text-[#e8e4ff] shadow-lg">
                {opt.label}
              </span>
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-full shadow-lg ${opt.bg}`}
              >
                {opt.icon}
              </span>
            </motion.a>
          ))}
      </AnimatePresence>

      <div className="relative">
        {!open && (
          <span className="absolute -inset-1.5 animate-ping rounded-full border-2 border-[#22d3b8] opacity-60" />
        )}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Cerrar opciones de contacto" : "Abrir opciones de contacto"}
          className="relative flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#ff9a3d] text-[#1a1206] shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          {open ? <X size={22} /> : <Plus size={22} />}
        </button>
      </div>
    </div>
  );
}