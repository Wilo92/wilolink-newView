"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";


type ProjectMedia =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

type Project = {
  name: string;
  url: string;
  urlLabel: string;
  media: ProjectMedia | null;
};

const PROJECTS: Project[] = [
  {
    name: "Odontología Pereira AGB",
    url: "https://www.odontologiapereiraagb.com",
    urlLabel: "odontologiapereiraagb.com",
    media: { type: "image", src: "/proyectos/agb.png" },
  },
  {
    name: "Crediorbit",
    url: "https://www.crediorbit.com", // TODO: URL real
    urlLabel: "crediorbit.com",
    media: {type:"image", src:"/proyectos/credi.png"},
  },
  {
    name: "Intranet Contraloria Risaralda",
    url: "https://intranetcontraloria.github.io/IntranetCGR/index.html",
    urlLabel: "intranetcontraloria.github.io",
    media: { type: "image", src: "/proyectos/contra.png" },
  },
  {
    name: "Feconder",
    url: "https://feconder.github.io/",
    urlLabel: "feconder.github.io",
    media: { type: "image", src: "/proyectos/feconder.png" },
  },

  {
    name: "Analisis datos contratacion publica",
    url: "https://contraloria-risaralda.streamlit.app/",
    urlLabel: "",
    media: { type: "video", src: "/proyectos/video.mp4" },
  },
];

const CARD_WIDTH = 220;
const GAP = 16; // debe coincidir con la clase gap-4 (16px) de abajo

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -(CARD_WIDTH + GAP) : CARD_WIDTH + GAP,
      behavior: "smooth",
    });
  }

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
          ← desliza o usa las flechas →
        </p>

        <div className="relative">
          {/* Flecha izquierda */}
          <button
            onClick={() => scrollByCard("left")}
            aria-label="Ver proyecto anterior"
            className="absolute left-0 top-[55px] z-10 -translate-x-1/2 rounded-full border border-[#2a3355] bg-[#0a0e1a] p-2 text-[#9aa3c9] transition-colors hover:border-[#22d3b8] hover:text-[#5eead4] hidden md:block"
          >
            <ChevronLeft size={18} />
          </button>

          {/* Contenedor con scroll-snap */}
          <div
            ref={scrollRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PROJECTS.map((project) => (
              <a
                key={project.name}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group min-w-[220px] flex-shrink-0 snap-start overflow-hidden rounded-lg border border-[#2a3355] bg-black transition-colors hover:border-[#22d3b8]"
              >
                {project.media?.type === "video" ? (
                  <video
                    src={project.media.src}
                    muted
                    loop
                    playsInline
                    onMouseEnter={(e) => e.currentTarget.play()}
                    onMouseLeave={(e) => {
                      e.currentTarget.pause();
                      e.currentTarget.currentTime = 0;
                    }}
                    className="h-[110px] w-full object-cover"
                  />
                ) : project.media?.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={project.media.src}
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

          {/* Flecha derecha */}
          <button
            onClick={() => scrollByCard("right")}
            aria-label="Ver siguiente proyecto"
            className="absolute right-0 top-[55px] z-10 translate-x-1/2 rounded-full border border-[#2a3355] bg-[#0a0e1a] p-2 text-[#9aa3c9] transition-colors hover:border-[#22d3b8] hover:text-[#5eead4] hidden md:block"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}