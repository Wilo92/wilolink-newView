"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { motion, type Variants } from "framer-motion";

type ProjectMedia =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

type Project = {
  name: string;
  category: string;
  description: string;
  url: string;
  urlLabel: string;
  media: ProjectMedia | null;
};

const PROJECTS: Project[] = [
  {
    name: "Odontología Pereira AGB",
    category: "Sitio web corporativo",
    description: "Página orientada a la captación de pacientes y presencia digital.",
    url: "https://www.odontologiapereiraagb.com",
    urlLabel: "odontologiapereiraagb.com",
    media: { type: "image", src: "/proyectos/agb.png" },
  },
  {
    name: "Crediorbit",
    category: "Plataforma financiera",
    description: "Desarrollo web enfocado en servicios financieros.",
    url: "https://www.crediorbit.com",
    urlLabel: "crediorbit.com",
    media: { type: "image", src: "/proyectos/credi.png" },
  },
  {
    name: "Intranet Contraloría Risaralda",
    category: "Sistema empresarial",
    description: "Herramienta interna para gestión y administración institucional.",
    url: "https://intranet-contraloria-2026.vercel.app/",
    urlLabel: "Ver proyecto",
    media: { type: "image", src: "/proyectos/contra.png" },
  },
  {
    name: "Feconder",
    category: "Portal institucional",
    description: "Sitio web informativo para organización regional.",
    url: "https://feconder.github.io/",
    urlLabel: "Ver proyecto",
    media: { type: "image", src: "/proyectos/feconder.png" },
  },
  {
    name: "Análisis de Contratación Pública",
    category: "Dashboard de datos",
    description: "Visualización y análisis interactivo de información pública.",
    url: "https://contraloria-risaralda.streamlit.app/",
    urlLabel: "Ver demo",
    media: { type: "video", src: "/proyectos/video.mp4" },
  },
];

const CARD_WIDTH = 280;
const GAP = 16;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: "easeOut",
    },
  },
};

export default function Projects() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollByCard = (direction: "left" | "right") => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollBy({
      left: direction === "left" ? -(CARD_WIDTH + GAP) : CARD_WIDTH + GAP,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-[#0a0e1a] px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto max-w-6xl">
        {/* Encabezado */}
        <div className="mb-12 text-center">
        

          <h2 className="mt-4 text-3xl font-extrabold text-white md:text-4xl">
            Proyectos desarrollados para nuestros clientes
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#9aa3c9] md:text-base">
            Hemos creado sitios web, plataformas empresariales, sistemas de
            información y herramientas de análisis de datos para empresas,
            instituciones y emprendedores que buscan crecer con tecnología.
          </p>
        </div>

        {/* Flechas */}
        <div className="relative">
          <button
            onClick={() => scrollByCard("left")}
            className="absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2a3355] bg-[#0f1527] p-3 text-[#9aa3c9] transition hover:border-[#22d3b8] hover:text-[#5eead4] md:block"
          >
            <ChevronLeft size={18} />
          </button>

          <motion.div
            ref={scrollRef}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {PROJECTS.map((project) => (
              <motion.a
                key={project.name}
                variants={cardVariants}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group min-w-[280px] max-w-[280px] snap-start overflow-hidden rounded-xl border border-[#25304e] bg-[#111827] transition-all duration-300 hover:-translate-y-1 hover:border-[#22d3b8]"
              >
                {/* Media */}
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
                    className="h-[160px] w-full object-cover"
                  />
                ) : (
                  <img
                    src={project.media?.src}
                    alt={project.name}
                    className="h-[160px] w-full object-cover object-top"
                  />
                )}

                {/* Contenido */}
                <div className="p-5">
                  <span className="inline-block rounded bg-[#22d3b8]/10 px-2 py-1 text-[11px] font-medium text-[#5eead4]">
                    {project.category}
                  </span>

                  <h3 className="mt-3 text-lg font-bold text-white">
                    {project.name}
                  </h3>

                  <p className="mt-2 text-sm leading-relaxed text-[#a8b2d1]">
                    {project.description}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-sm font-medium text-[#5eead4]">
                    Ver proyecto
                    <ExternalLink size={14} />
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>

          <button
            onClick={() => scrollByCard("right")}
            className="absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 rounded-full border border-[#2a3355] bg-[#0f1527] p-3 text-[#9aa3c9] transition hover:border-[#22d3b8] hover:text-[#5eead4] md:block"
          >
            <ChevronRight size={18} />
          </button>
        </div>


        {/* Tecnologías y capacidades */}
        <div className="mt-14 rounded-2xl border border-[#1f2a44] bg-[#111827] p-8 md:p-10">
          <div className="text-center">
            <span className="inline-block rounded-full border border-[#22d3b8]/30 bg-[#22d3b8]/10 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-[#5eead4]">
              Tecnologías y herramientas
            </span>

            <h3 className="mt-4 text-2xl font-bold text-white md:text-3xl">
              Soluciones desarrolladas con tecnologías modernas
            </h3>

            <p className="mx-auto mt-4 max-w-3xl text-sm leading-relaxed text-[#9aa3c9] md:text-base">
              Cada proyecto es construido utilizando tecnologías modernas que
              garantizan rendimiento, seguridad, escalabilidad y facilidad de
              mantenimiento.
            </p>
          </div>

          

          <div className="mt-12">
            <h4 className="mb-5 text-center text-sm font-semibold uppercase tracking-wider text-[#9aa3c9]">
              Stack tecnológico
            </h4>

            <div className="flex flex-wrap justify-center gap-3">
              {[
                "Next.js",
                "React",
                "TypeScript",
                "JavaScript",
                "Node.js",
                "Python",
                "FastAPI",
                "PostgreSQL",
                "MySQL",
                "MongoDB",
                "Tailwind CSS",
                "Docker",
                "Git",
                "GitHub",
                "Vercel",
                "Streamlit",
                "Railway",
                "Wordpress"
              ].map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-[#22d3b8]/20 bg-[#22d3b8]/10 px-4 py-2 text-sm font-medium text-[#5eead4]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}