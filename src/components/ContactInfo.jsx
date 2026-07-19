"use client";

// TODO: reemplaza estos valores con tus datos reales antes de publicar.
const PHONE_DISPLAY = "+57 300 000 0000";
const WHATSAPP_NUMBER = "573000000000"; // mismo formato que usan CallbackForm.tsx y FloatingActions.tsx
const EMAIL = "contacto@wilolink.com";
const ADDRESS = "Dosquebradas, Risaralda";
const HOURS = "Lun–Sáb · 8am–6pm";

const SOCIALS = [
  { label: "WhatsApp", href: `https://wa.me/${WHATSAPP_NUMBER}` },
  { label: "Instagram", href: "https://instagram.com/wilolink" }, // TODO: confirmar handle real
];

// TODO: reemplaza el src del iframe por el embed real de tu ubicación.
// En Google Maps: busca tu dirección → Compartir → Insertar un mapa → copia
// la URL que está dentro de src="..." y pégala aquí.
const MAP_EMBED_SRC =
  "https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d1446.7603133413268!2d-75.67027428147132!3d4.8448206193856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1smz%2016%20cs%2010%20villa%20del%20campo!5e0!3m2!1ses!2sco!4v1784427130555!5m2!1ses!2sco";
  

export default function ContactInfo() {
  return (
    <section className="relative min-h-[420px] overflow-hidden bg-[#0a0e1a]">
      <iframe
        title="Ubicación de WiloLink"
        src={MAP_EMBED_SRC}
        className="absolute inset-0 h-full w-full grayscale invert-[0.9] contrast-[0.85]"
        style={{ border: 0 }}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Oscurece el mapa para que combine con el tema oscuro del sitio */}
      <div className="pointer-events-none absolute inset-0 bg-[#0a0e1a]/72" />

      <div className="relative z-10 flex min-h-[420px] items-center px-6 py-12 md:px-12">
        <div className="w-full max-w-sm rounded-xl border border-[#2a3355] bg-black p-6 font-mono text-[13px] text-[#9aa3c9]">
          <div className="mb-4 flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </div>
          <p className="mb-4 text-[#ffb020]">$ wilolink --info-contacto</p>

          <div className="mb-3.5 flex gap-3">
            <span className="text-[#5eead4]">📞</span>
            <div>
              <span className="mb-0.5 block text-[11px] text-[#6b7280]">
                teléfono / whatsapp
              </span>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[13px] text-[#e8eaf5] hover:text-[#5eead4]"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <div className="mb-3.5 flex gap-3">
            <span className="text-[#5eead4]">✉</span>
            <div>
              <span className="mb-0.5 block text-[11px] text-[#6b7280]">
                correo
              </span>
              <a
                href={`mailto:${EMAIL}`}
                className="font-sans text-[13px] text-[#e8eaf5] hover:text-[#5eead4]"
              >
                {EMAIL}
              </a>
            </div>
          </div>

          <div className="mb-3.5 flex gap-3">
            <span className="text-[#5eead4]">📍</span>
            <div>
              <span className="mb-0.5 block text-[11px] text-[#6b7280]">
                dirección
              </span>
              <span className="font-sans text-[13px] text-[#e8eaf5]">
                {ADDRESS}
              </span>
            </div>
          </div>

          <div className="mb-4 flex gap-3">
            <span className="text-[#5eead4]">🕒</span>
            <div>
              <span className="mb-0.5 block text-[11px] text-[#6b7280]">
                horario
              </span>
              <span className="font-sans text-[13px] text-[#e8eaf5]">
                {HOURS}
              </span>
            </div>
          </div>

          <span className="mb-2 block text-[11px] text-[#6b7280]">redes</span>
          <div className="flex flex-wrap gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-[#2a3355] px-3 py-1.5 font-sans text-[12px] text-[#9aa3c9] transition-colors hover:border-[#22d3b8] hover:text-[#5eead4]"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}