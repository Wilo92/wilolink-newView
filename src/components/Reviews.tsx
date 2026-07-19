
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
      </div>
    </section>
  );
}


