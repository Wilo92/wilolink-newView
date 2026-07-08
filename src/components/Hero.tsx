"use client";

import { useEffect, useRef, useState } from "react";

const COMMANDS = [
  { prefix: "$ ", text: "wilolink --iniciar", pause: 250 },
  { prefix: "", text: "conectando servicios...", pause: 200 },
  { prefix: "› ", text: "desarrollo-web ...... ok", pause: 150 },
  { prefix: "› ", text: "reparacion-hw ....... ok", pause: 150 },
  { prefix: "› ", text: "redes-admin .......... ok", pause: 150 },
  { prefix: "$ ", text: "listo para conectar", pause: 1400 },
] as const;

type Node = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  c: string;
  r: number;
};

const COLORS = ["#22d3b8", "#ffb020"];
const SPACING = 75  ; // px entre nodos: menos densidad que antes, menos saturado
const CONNECT_DIST = 110;

function buildNodes(w: number, h: number): Node[] {
  const cols = Math.max(1, Math.round(w / SPACING));
  const rows = Math.max(1, Math.round(h / SPACING));
  const cw = w / cols;
  const ch = h / rows;
  const nodes: Node[] = [];

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      nodes.push({
        x: (i + 0.5) * cw + (Math.random() - 0.5) * cw * 0.6,
        y: (j + 0.5) * ch + (Math.random() - 0.5) * ch * 0.6,
        vx: (Math.random() - 0.5) * 1.8,
        vy: (Math.random() - 0.5) * 1.8,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        r: Math.random() > 0.65 ? 3 : 1.7,
      });
    }
  }
  return nodes;
}

function useMeshCanvas(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let nodes: Node[] = [];
    let pings: { x: number; y: number; r: number }[] = [];
    let frame = 0;
    let raf = 0;
    let w = 0;
    let h = 0;
    let isVisible = true;
    const mouse = { x: -9999, y: -9999, active: false };
    const MOUSE_RADIUS = 130;

    function handleMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
      mouse.active = true;
    }
    function handleLeave() {
      mouse.active = false;
    }
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseleave", handleLeave);

    // --- Pre-renderiza el "brillo" de cada color UNA sola vez (sprite) ---
    // en vez de llamar a createRadialGradient() por cada nodo, en cada frame.
    // Esto es lo que se conoce como "sprite caching": lo caro (calcular el
    // degradado) se hace una vez; en el loop de animación solo se copian
    // píxeles ya calculados con drawImage, que es prácticamente gratis.
    function makeGlowSprite(color: string, radius: number) {
      const size = radius * 2;
      const off = document.createElement("canvas");
      off.width = size;
      off.height = size;
      const octx = off.getContext("2d")!;
      const g = octx.createRadialGradient(radius, radius, 0, radius, radius, radius);
      g.addColorStop(0, color);
      g.addColorStop(1, "transparent");
      octx.fillStyle = g;
      octx.fillRect(0, 0, size, size);
      return off;
    }
    const glowSprites: Record<string, { normal: HTMLCanvasElement; hover: HTMLCanvasElement }> = {};
    COLORS.forEach((c) => {
      glowSprites[c] = {
        normal: makeGlowSprite(c, 3 * 4), // radio máximo (r=3) * factor normal (4)
        hover: makeGlowSprite(c, 3 * 7), // radio máximo (r=3) * factor hover (7)
      };
    });

    // Renderiza el canvas a menor resolución interna (60% del tamaño real) y
    // lo estira visualmente con CSS al 100%. El navegador tiene que "pintar"
    // muchos menos píxeles por cuadro, y como es un fondo abstracto en
    // movimiento, la pérdida de nitidez es imperceptible.
    const RENDER_SCALE = 0.6;

    function resize() {
      const parent = canvas!.parentElement!;
      w = canvas!.width = Math.round(parent.clientWidth * RENDER_SCALE);
      h = canvas!.height = Math.round(parent.clientHeight * RENDER_SCALE);
      nodes = buildNodes(w, h);
    }
    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      // Dibuja una sola vez, estático, y no anima más
      ctx.fillStyle = "#0a0e1a";
      ctx.fillRect(0, 0, w, h);
      nodes.forEach((n) => {
        ctx.fillStyle = n.c;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, 7);
        ctx.fill();
      });
      return () => {
        window.removeEventListener("resize", resize);
        canvas!.removeEventListener("mousemove", handleMove);
        canvas!.removeEventListener("mouseleave", handleLeave);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !raf) draw();
      },
      { threshold: 0 }
    );
    observer.observe(canvas);

    function draw() {
      if (!isVisible) {
        raf = 0;
        return;
      }
      ctx!.fillStyle = "#0a0e1a";
      ctx!.fillRect(0, 0, w, h);
      frame++;

      if (frame % 22 === 0) {
        const n = nodes[Math.floor(Math.random() * nodes.length)];
        pings.push({ x: n.x, y: n.y, r: 0 });
      }

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        if (mouse.active) {
          const dx = n.x - mouse.x;
          const dy = n.y - mouse.y;
          const d = Math.hypot(dx, dy);
          if (d < MOUSE_RADIUS && d > 0.01) {
            const force = (1 - d / MOUSE_RADIUS) * 2.2;
            n.x += (dx / d) * force;
            n.y += (dy / d) * force;
          }
        }
      });

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < CONNECT_DIST) {
            ctx!.strokeStyle = `rgba(120,200,190,${(1 - d / CONNECT_DIST) * 0.4})`;
            ctx!.lineWidth = 1;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.stroke();
          }
        }
      }

      // conecta la terminal (su centro real en pantalla) a sus 4 nodos más cercanos,
      // así se lee como "el nodo principal de la red" y no como una caja pegada encima
      const termPoint = { x: w * 0.18, y: h / 2 };
      const nearest = [...nodes]
        .sort(
          (a, b) =>
            Math.hypot(a.x - termPoint.x, a.y - termPoint.y) -
            Math.hypot(b.x - termPoint.x, b.y - termPoint.y)
        )
        .slice(0, 4);
      nearest.forEach((n) => {
        const d = Math.hypot(n.x - termPoint.x, n.y - termPoint.y);
        ctx!.strokeStyle = `rgba(255,255,255,${Math.max(0.08, 0.4 - d / 900)})`;
        ctx!.lineWidth = 1.2;
        ctx!.beginPath();
        ctx!.moveTo(termPoint.x, termPoint.y);
        ctx!.lineTo(n.x, n.y);
        ctx!.stroke();
      });

      nodes.forEach((n) => {
        const distToMouse = mouse.active ? Math.hypot(n.x - mouse.x, n.y - mouse.y) : Infinity;
        const nearMouse = distToMouse < MOUSE_RADIUS;
        const glowR = n.r * (nearMouse ? 7 : 4);
        const sprite = nearMouse ? glowSprites[n.c].hover : glowSprites[n.c].normal;
        ctx!.drawImage(sprite, n.x - glowR, n.y - glowR, glowR * 2, glowR * 2);
        ctx!.fillStyle = n.c;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, nearMouse ? n.r * 1.6 : n.r, 0, 7);
        ctx!.fill();

        if (nearMouse) {
          ctx!.strokeStyle = `rgba(255,255,255,${(1 - distToMouse / MOUSE_RADIUS) * 0.5})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(n.x, n.y);
          ctx!.lineTo(mouse.x, mouse.y);
          ctx!.stroke();
        }
      });

      pings = pings.filter((p) => p.r < 70);
      pings.forEach((p) => {
        p.r += 3.2;
        ctx!.strokeStyle = `rgba(255,255,255,${(1 - p.r / 70) * 0.35})`;
        ctx!.lineWidth = 1.2;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.r, 0, 7);
        ctx!.stroke();
      });

      raf = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      canvas!.removeEventListener("mousemove", handleMove);
      canvas!.removeEventListener("mouseleave", handleLeave);
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [canvasRef]);
}

function useTypingLoop() {
  const [lines, setLines] = useState<string[]>([""]);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      while (!cancelled) {
        for (const cmd of COMMANDS) {
          for (let i = 0; i <= cmd.text.length; i++) {
            if (cancelled) return;
            setLines((prev) => [...prev.slice(0, -1), cmd.prefix + cmd.text.slice(0, i)]);
            await new Promise((r) => setTimeout(r, 20));
          }
          setLines((prev) => [...prev, ""]);
          await new Promise((r) => setTimeout(r, cmd.pause));
        }
        await new Promise((r) => setTimeout(r, 1800));
        if (!cancelled) setLines([""]);
      }
    }
    run();
    return () => {
      cancelled = true;
    };
  }, []);

  return lines;
}

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useMeshCanvas(canvasRef);
  const lines = useTypingLoop();

  return (
    <section className="relative flex h-[460px] items-center overflow-hidden bg-[#0a0e1a] px-6 md:h-[560px] md:pl-16">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_75%_at_22%_50%,transparent_0%,rgba(10,14,26,0.55)_70%,rgba(10,14,26,0.85)_100%)]" />

      <div className="relative z-10 w-full max-w-sm rounded-xl border border-[#2a3355] bg-black p-5 font-mono text-[15px] text-[#9aa3c9] backdrop-blur-sm">
        <div className="mb-2 flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        {lines.map((line, i) => (
          <div key={i} className="min-h-[22px] whitespace-pre">
            {line.startsWith("$") ? (
              <span className="text-[#5eead4]">{line}</span>
            ) : line.startsWith("›") ? (
              <span>
                <span className="text-[#ffb020]">›</span>
                {line.slice(1)}
              </span>
            ) : (
              line
            )}
            {i === lines.length - 1 && (
              <span className="ml-0.5 inline-block h-3 w-1.5 animate-pulse bg-[#5eead4]" />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}