"use client";

import { FaGithub, FaLinkedinIn, FaFacebookF } from "react-icons/fa";
import { motion } from "framer-motion";

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
    href: "https://facebook.com/TU_PAGINA",
    Icon: FaFacebookF,
  },
];

const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1446.7603133413268!2d-75.67027428147132!3d4.8448206193856!2m3!1f0!2f0!3f0!2m2!1i1024!2i768!4f13.1!2m1!1smz%2016%20cs%2010%20villa%20del%20campo!5e0!3m2!1ses!2sco!4v1784427130555!5m2!1ses!2sco";

// Link real (no el iframe) para el botón "Ver en Google Maps" —
// las coordenadas son las mismas que ya usa el embed de arriba.
const GOOGLE_MAPS_URL =
  "https://www.google.com/maps?q=4.8448206193856,-75.67027428147132";

// El mapa entra con un fade lento y sutil (es el fondo, no debe robar atención)
const mapVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

// La tarjeta de contacto entra con fade + slide desde la izquierda
const cardVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

// Cada bloque de info (teléfono, correo, dirección, horario) se escalona
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const rowVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

export default function ContactInfo() {
  return (
    <section className="relative overflow-hidden bg-[#0a0e1a] md:min-h-[420px]">
      {/* Mapa con fade-in propio — a color, sin filtros grises */}
      <motion.iframe
        title="Ubicación de WiloLink"
        src={MAP_EMBED_SRC}
        className="h-56 w-full md:absolute md:inset-0 md:h-full"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={mapVariants}
      />

      {/* Overlay solo en desktop, muy sutil para que el mapa se siga viendo a color */}
      <div className="pointer-events-none absolute inset-0 hidden bg-[#0a0e1a]/30 md:block" />

      <div className="relative z-10 flex items-center px-6 py-8 md:min-h-[420px] md:py-12 md:pl-73 md:pr-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={cardVariants}
          className="w-full max-w-full rounded-xl border border-[#2a3355] bg-black p-6 font-mono text-[13px] text-[#9aa3c9] shadow-2xl md:max-w-sm"
        >
          <div className="mb-4 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>

          <p className="mb-6 text-[#ffb020]">$ wilolink --info-contacto</p>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
          >
            {/* Teléfono */}
            <motion.div variants={rowVariants} className="mb-4 flex gap-3">
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
            </motion.div>

            {/* Correo */}
            <motion.div variants={rowVariants} className="mb-4 flex gap-3">
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
            </motion.div>

            {/* Dirección */}
            <motion.div variants={rowVariants} className="mb-4 flex gap-3">
              <span className="text-[#5eead4] text-lg">📍</span>
              <div>
                <span className="mb-1 block text-[11px] text-[#6b7280]">
                  Dirección
                </span>
                <span className="font-sans text-[13px] text-[#e8eaf5]">
                  {ADDRESS}
                </span>
              </div>
            </motion.div>

            {/* Horario */}
            <motion.div variants={rowVariants} className="mb-6 flex gap-3">
              <span className="text-[#5eead4] text-lg">🕒</span>
              <div>
                <span className="mb-1 block text-[11px] text-[#6b7280]">
                  Horario
                </span>
                <span className="font-sans text-[13px] text-[#e8eaf5]">
                  {HOURS}
                </span>
              </div>
            </motion.div>

            {/* Redes sociales */}
            <motion.span
              variants={rowVariants}
              className="mb-3 block text-[11px] text-[#6b7280]"
            >
              Redes Sociales
            </motion.span>

            <motion.div variants={rowVariants} className="flex flex-wrap gap-3">
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
            </motion.div>

            {/* Botón real hacia Google Maps (más confiable que el mini-ícono del iframe) */}
            <motion.a
              variants={rowVariants}
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block rounded-lg border border-[#2a3355] px-4 py-2.5 text-center font-sans text-[12.5px] font-semibold text-[#5eead4] transition hover:border-[#22d3b8] hover:bg-[#22d3b8]/10"
            >
              Ver en Google Maps →
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}