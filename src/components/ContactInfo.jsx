"use client";

import { FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";

// Datos de contacto
const PHONE_DISPLAY = "+57 300 355 3762";
const WHATSAPP_NUMBER = "573003553762";
const EMAIL = "wilolink.online@gmail.com";
const ADDRESS = "Dosquebradas, Risaralda, Colombia";
const HOURS = "Lun–Dom · 8am–6pm";

const SOCIALS = [
  {
    label: "GitHub",
    href: "https://github.com/Wilo92",
    Icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/wilmer-restrepo-830544242/",
    Icon: FaLinkedinIn,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/TU_PAGINA", // Cambia por tu URL real o elimina este objeto
    Icon: FaFacebookF,
  },
];

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1446.7603133413268!2d-75.67027428147132!3d4.8448206193856!2m3!1f0!2f0!3f0!2m2!1i1024!2i768!4f13.1!2m1!1smz%2016%20cs%2010%20villa%20del%20campo!5e0!3m2!1ses!2sco!4v1784427130555!5m2!1ses!2sco";

export default function ContactInfo() {
  return (
    <section className="relative min-h-[420px] overflow-hidden bg-[#0a0e1a]">
      {/* Mapa */}
      <iframe
        title="Ubicación de WiloLink"
        src={MAP_EMBED_SRC}
        className="absolute inset-0 h-full w-full grayscale invert-[0.9] contrast-[0.85]"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Capa oscura */}
      <div className="pointer-events-none absolute inset-0 bg-[#0a0e1a]/72" />

      <div className="relative z-10 flex min-h-[420px] items-center px-6 py-12 md:px-12">
        <div className="w-full max-w-sm rounded-xl border border-[#2a3355] bg-black p-6 font-mono text-[13px] text-[#9aa3c9] shadow-2xl">

          {/* Botones estilo macOS */}
          <div className="mb-4 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>

          <p className="mb-6 text-[#ffb020]">$ wilolink --info-contacto</p>

          {/* Teléfono */}
          <div className="mb-4 flex gap-3">
            <span className="text-[#5eead4] text-lg">📞</span>
            <div>
              <span className="mb-1 block text-[11px] text-[#6b7280]">
                Teléfono / WhatsApp
              </span>

              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[13px] text-[#e8eaf5] transition hover:text-[#5eead4]"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          {/* Correo */}
          <div className="mb-4 flex gap-3">
            <span className="text-[#5eead4] text-lg">✉️</span>
            <div>
              <span className="mb-1 block text-[11px] text-[#6b7280]">
                Correo
              </span>

              <a
                href={`mailto:${EMAIL}`}
                className="font-sans text-[13px] text-[#e8eaf5] transition hover:text-[#5eead4]"
              >
                {EMAIL}
              </a>
            </div>
          </div>

          {/* Dirección */}
          <div className="mb-4 flex gap-3">
            <span className="text-[#5eead4] text-lg">📍</span>
            <div>
              <span className="mb-1 block text-[11px] text-[#6b7280]">
                Dirección
              </span>

              <span className="font-sans text-[13px] text-[#e8eaf5]">
                {ADDRESS}
              </span>
            </div>
          </div>

          {/* Horario */}
          <div className="mb-6 flex gap-3">
            <span className="text-[#5eead4] text-lg">🕒</span>
            <div>
              <span className="mb-1 block text-[11px] text-[#6b7280]">
                Horario
              </span>

              <span className="font-sans text-[13px] text-[#e8eaf5]">
                {HOURS}
              </span>
            </div>
          </div>

          {/* Redes Sociales */}
          <span className="mb-3 block text-[11px] text-[#6b7280]">
            Redes Sociales
          </span>

          <div className="flex flex-wrap gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-10 w-10 items-center justify-center rounded-md border border-[#2a3355] text-[#9aa3c9] transition-all duration-300 hover:border-[#22d3b8] hover:text-[#5eead4] hover:shadow-[0_0_12px_#22d3b8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#22d3b8]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}