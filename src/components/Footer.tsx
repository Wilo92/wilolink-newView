import Link from "next/link";

const SOCIAL_LINKS = [
  {
    href: "https://facebook.com/tu-usuario",
    label: "Facebook",
    path: "M22 12a10 10 0 1 0-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 22 12z",
  },
  {
    href: "https://github.com/tu-usuario",
    label: "GitHub",
    path: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.2-.5-1.3.1-2.8 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .6 1.5.2 2.6.1 2.8.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10 10 0 0 0 12 2z",
  },
  {
    href: "https://linkedin.com/in/tu-usuario",
    label: "LinkedIn",
    path: "M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3 9h4v12H3zm7 0h3.8v1.7h.1c.5-1 1.9-2 3.8-2 4 0 4.8 2.6 4.8 6v6.3h-4V15c0-1.5 0-3.5-2.1-3.5s-2.5 1.7-2.5 3.4V21H10z",
  },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[linear-gradient(100deg,#b5501c_0%,#2a2f52_65%,#1a2138_100%)]">
      <div className="mx-auto max-w-7xl px-5 py-6 md:px-10">
        <div className="flex flex-col items-center gap-4 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#ffb020]">
              <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 stroke-[#1a1206]" strokeWidth={3} fill="none">
                <polyline points="4,13 9,18 20,6" />
              </svg>
            </span>
            <span className="text-base font-extrabold tracking-tight">
              <span className="text-[#ffb020]">WILO</span>
              <span className="text-[#f5f3ff]">LINK</span>
            </span>
          </Link>

          <p className="text-[13.5px] italic text-[#e8e4ff]">
            &ldquo;Gestiona, Conecta, Proyecta.&rdquo;
          </p>

          <div className="text-right">
            <p className="mb-2 text-[11px] font-bold tracking-[0.08em] text-[#d8dcf5]">
              ACERCA DE MI
            </p>
            <div className="flex justify-end gap-2.5">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-black/25 text-[#f5f3ff] transition-colors hover:bg-black/40"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 fill-current">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="my-4 h-px bg-white/15" />

        <p className="text-center text-xs text-[#d8dcf5]">
          © {year} WiloLink. Creado por{" "}
          <span className="font-bold text-white">Wilmer Restrepo (Wilo)</span>
        </p>
      </div>
    </footer>
  );
}