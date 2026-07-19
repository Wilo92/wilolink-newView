"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const NAV_LINKS = [
  { href: "/", label: "Inicio" , external:false},
  { href: "/crediorbit", label: "Crediorbit.com",external: false },
  { href: "/agente-ia", label: "Agente IA",external: false },
  { href: "/game", label: "Game",external: false },
  {
    href: "https://myhdv.wilolink.com",
    label: "Freelancer",
    external: true,
  },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 bg-[linear-gradient(100deg,#1a2138_0%,#2a2f52_35%,#b5501c_100%)]"
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-10">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.svg"
            alt="WILOLINK"
            width={180}
            height={50}
            priority
            className="h-18 w-auto"
          />
        </Link>
        <div className="hidden items-center gap-1 rounded-full border border-white/15 bg-black/25 p-1.5 md:flex">
          {NAV_LINKS.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full px-3.5 py-1.5 text-[13.5px] font-medium text-[#d8dcf5] transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={`rounded-full px-3.5 py-1.5 text-[13.5px] font-medium transition-colors ${
                  isActive(link.href)
                    ? "bg-white text-[#1a1206]"
                    : "text-[#d8dcf5] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            )
          )}
        </div>

        <Link
          href="/contacto"
          className="hidden rounded-full bg-[#22d3b8] px-4 py-2 text-[13px] font-bold text-[#1a1206] transition-transform hover:scale-105 md:block"
        >
          Contacto
        </Link>

        <button
          className="text-[#f5f3ff] md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="flex flex-col gap-1 border-t border-white/10 bg-[#161b30] p-3 md:hidden"
          >
            {NAV_LINKS.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-[#d8dcf5]"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={`rounded-xl px-4 py-2.5 text-sm font-medium ${
                    isActive(link.href)
                      ? "bg-white text-[#1a1206]"
                      : "text-[#d8dcf5]"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <Link
              href="/contacto"
              className="mt-1 rounded-xl bg-[#22d3b8] px-4 py-2.5 text-center text-sm font-bold text-[#1a1206]"
            >
              Contacto
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}