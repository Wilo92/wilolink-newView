"use client";

// TODO: reemplaza estos datos con tus 3 proyectos reales antes de publicar.
// image: pon la ruta de la captura en /public (ej: "/proyectos/la-cosecha.png")
// o déjala en null si todavía no tienes la captura — se muestra un placeholder.
const PROJECTS = [
  {
    name: "Restaurante La Cosecha",
    url: "https://lacosecha.com", // TODO: URL real
    urlLabel: "lacosecha.com",
    image: null,
  },
  {
    name: "Clínica Sonrisa Dental",
    url: "https://sonrisadental.com", // TODO: URL real
    urlLabel: "sonrisadental.com",
    image: null,
  },
  {
    name: "Ferretería El Tornillo",
    url: "https://eltornillo.com", // TODO: URL real
    urlLabel: "eltornillo.com",
    image: null,
  },
];

export default function Projects() {
  return (
    <section className="bg-[#0a0e1a] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-5xl">
        <h2
          className="mb-1 text-center font-bold text-[#f4f2ec]"
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "22px" }}
        >
          $ proyectos --listar
        </h2>
        <p className="mb-8 text-center font-mono text-[13px] text-[#8b93b8]">
          ← desliza para ver más →
        </p>

        <div className="flex gap-4 overflow-x-auto pb-3">
          {PROJECTS.map((project) => (
            <a
              key={project.name}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group min-w-[220px] flex-shrink-0 overflow-hidden rounded-lg border border-[#2a3355] bg-black transition-colors hover:border-[#22d3b8]"
            >
              {project.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={project.image}
                  alt={`Captura del sitio ${project.name}`}
                  className="h-[110px] w-full object-cover object-top"
                />
              ) : (
                <div className="flex h-[110px] w-full items-center justify-center bg-[#0d1120] font-mono text-[11px] text-[#4a5278]">
                  [ captura pendiente ]
                </div>
              )}

              <div className="p-3">
                <p className="mb-1 text-[13px] font-semibold text-[#f4f2ec]">
                  {project.name}
                </p>
                <p className="font-mono text-[11px] text-[#5eead4] group-hover:underline">
                  {project.urlLabel} →
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}