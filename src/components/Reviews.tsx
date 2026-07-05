// ============================================================
// EDITA AQUÍ tus reseñas reales de Google (texto y nombre del cliente).
// Puedes copiarlas directo de tu perfil de Google Business.
// ============================================================
const REVIEWS = [
  {
    text: "Excelente atención, resolvió el problema de mi laptop el mismo día. Muy recomendado.",
    author: "Cliente de Google",
    initial: "A",
    color: "#22d3b8",
  },
  {
    text: "Muy profesional y explica todo con paciencia. Configuró la red de mi negocio sin problema.",
    author: "Cliente de Google",
    initial: "C",
    color: "#ffb020",
  },
  {
    text: "Me enseñó a usar el computador desde cero, con mucha paciencia. Gracias Wilo.",
    author: "Cliente de Google",
    initial: "M",
    color: "#22d3b8",
  },
] as const;

const RATING = 4.9;
const REVIEW_COUNT = 10;

const TRUST_SEALS = [
  {
    icon: "⚡",
    title: "Respuesta rápida",
    desc: "Te respondo el mismo día",
    color: "#22d3b8",
  },
  {
    icon: "🛠️",
    title: "Garantía en el servicio",
    desc: "Si algo no queda bien, lo corrijo",
    color: "#ffb020",
  },
  {
    icon: "🎯",
    title: "Atención personalizada",
    desc: "Trabajas directo conmigo",
    color: "#22d3b8",
  },
] as const;

export default function Reviews() {
  return (
    <section className="bg-[#0a0e1a] px-6 py-16 md:py-20">
      <div className="mx-auto max-w-4xl">
        {/* Resumen de calificación */}
        <div className="mb-8 flex items-center justify-center gap-3.5">
          <span className="text-3xl font-extrabold text-white">{RATING}</span>
          <div>
            <div className="text-base tracking-widest text-[#ffb020]">
              {"★".repeat(5)}
            </div>
            <p className="text-xs text-[#8b93b8]">
              Basado en {REVIEW_COUNT} reseñas de Google
            </p>
          </div>
        </div>

        {/* Tarjetas de reseñas */}
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-3">
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#232b45] bg-[#12172a] p-4.5"
            >
              <div className="mb-2 text-xs tracking-widest text-[#ffb020]">
                {"★".repeat(5)}
              </div>
              <p className="mb-3 text-xs leading-relaxed text-[#c7cbe8]">
                &ldquo;{r.text}&rdquo;
              </p>
              <div className="flex items-center gap-2">
                <span
                  className="flex h-6.5 w-6.5 items-center justify-center rounded-full text-[11px] font-extrabold text-[#0a1206]"
                  style={{ backgroundColor: r.color }}
                >
                  {r.initial}
                </span>
                <span className="text-[11.5px] font-bold text-white">
                  {r.author}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="my-8 h-px bg-[#1c2340]" />

        {/* Sellos de confianza — mismos colores teal/naranja del resto del sitio */}
        <div className="grid grid-cols-1 gap-4 text-center sm:grid-cols-3">
          {TRUST_SEALS.map((seal) => (
            <div
              key={seal.title}
              className="rounded-xl border-t-[3px] bg-[#12172a] p-5"
              style={{ borderTopColor: seal.color }}
            >
              <div
                className="mx-auto mb-2.5 flex h-8.5 w-8.5 items-center justify-center rounded-lg text-[15px]"
                style={{ backgroundColor: `${seal.color}1f`, color: seal.color }}
              >
                {seal.icon}
              </div>
              <div className="mb-1 text-[13.5px] font-bold text-white">
                {seal.title}
              </div>
              <div className="text-[11px] text-[#8b93b8]">{seal.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}