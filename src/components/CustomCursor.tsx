"use client";

import { useEffect, useRef } from "react";

// ============================================================
// CONFIGURACIÓN — ajusta estos números para afinar la sensación
// ============================================================
const DOT_SIZE = 9; // px, el punto central (antes 6 — más visible para todo tipo de usuario)
const RING_SIZE = 36; // px, tamaño base del aro (llevado al tope del rango que pediste)
const RING_BORDER = 2; // px, más grueso para que no se pierda contra fondos claros
const COLOR_TEAL = "39, 216, 196"; // RGB del teal, sin # para usar en rgba()

const HOVER_SCALE = 2.0; // multiplicador del aro sobre elementos clickeables
const CLICK_SCALE = 0.7; // compresión al hacer click

// factores de suavizado (0-1): más alto = converge más rápido (menos "duración")
const EASE_POSITION = 0.18; // inercia del aro siguiendo al mouse
const EASE_SCALE_HOVER = 0.22; // ~180-250ms de transición al agrandar
const EASE_SCALE_CLICK = 0.45; // ~120ms de transición al comprimir

const MAX_STRETCH = 0.14; // deformación máxima por velocidad (14%)
const VELOCITY_SMOOTH = 0.25; // suavizado de la dirección de movimiento

// Selectores que activan el estado "hover" del cursor.
// Agrega data-cursor-hover a cualquier elemento custom que también deba activarlo.
const HOVER_SELECTOR =
  "a, button, [role='button'], input, textarea, select, .card, [data-cursor-hover]";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // --- Desactivar por completo en táctil o si el usuario pide menos movimiento ---
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (isTouch || reduceMotion) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Oculta el cursor nativo solo mientras este componente está activo
    document.body.classList.add("custom-cursor-active");

    // --- Estado mutable en refs: nunca dispara re-render de React ---
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { x: mouse.x, y: mouse.y };
    const prevRingPos = { x: mouse.x, y: mouse.y };

    let currentScale = 1;
    let targetScale = 1;
    let isHovering = false;
    let isClicking = false;

    // deformación por velocidad
    let scaleX = 1;
    let scaleY = 1;
    let angle = 0;
    let smoothAngle = 0;

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    function handlePointerOver(e: PointerEvent) {
      const target = e.target as HTMLElement;
      if (target.closest(HOVER_SELECTOR)) {
        isHovering = true;
      }
    }
    function handlePointerOut(e: PointerEvent) {
      const target = e.target as HTMLElement;
      const related = e.relatedTarget as HTMLElement | null;
      if (target.closest(HOVER_SELECTOR) && !related?.closest(HOVER_SELECTOR)) {
        isHovering = false;
      }
    }

    function handleMouseDown() {
      isClicking = true;
    }
    function handleMouseUp() {
      isClicking = false;
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("pointerover", handlePointerOver);
    document.addEventListener("pointerout", handlePointerOut);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    let raf = 0;

    function tick() {
      // --- El punto central sigue exacto, sin inercia ---
      dot!.style.transform = `translate3d(${mouse.x - DOT_SIZE / 2}px, ${
        mouse.y - DOT_SIZE / 2
      }px, 0)`;

      // --- El aro sigue con inercia (lerp hacia la posición real) ---
      ringPos.x += (mouse.x - ringPos.x) * EASE_POSITION;
      ringPos.y += (mouse.y - ringPos.y) * EASE_POSITION;

      // --- Velocidad entre frames, para la deformación ---
      const dx = ringPos.x - prevRingPos.x;
      const dy = ringPos.y - prevRingPos.y;
      const speed = Math.hypot(dx, dy);
      prevRingPos.x = ringPos.x;
      prevRingPos.y = ringPos.y;

      if (speed > 0.15) {
        angle = Math.atan2(dy, dx);
      }
      // suaviza el ángulo para que no "tiemble" en movimientos cortos
      let diff = angle - smoothAngle;
      diff = Math.atan2(Math.sin(diff), Math.cos(diff)); // normaliza a [-PI, PI]
      smoothAngle += diff * VELOCITY_SMOOTH;

      const stretch = Math.min(speed / 40, 1) * MAX_STRETCH;
      const targetScaleX = 1 + stretch;
      const targetScaleY = 1 - stretch * 0.7;
      scaleX += (targetScaleX - scaleX) * 0.25;
      scaleY += (targetScaleY - scaleY) * 0.25;

      // --- Escala por hover / click (con su propio suavizado) ---
      targetScale = isClicking ? CLICK_SCALE : isHovering ? HOVER_SCALE : 1;
      const ease = isClicking ? EASE_SCALE_CLICK : EASE_SCALE_HOVER;
      currentScale += (targetScale - currentScale) * ease;

      ring!.style.transform = `translate3d(${ringPos.x - RING_SIZE / 2}px, ${
        ringPos.y - RING_SIZE / 2
      }px, 0) rotate(${smoothAngle}rad) scale(${scaleX * currentScale}, ${
        scaleY * currentScale
      })`;

      // brillo leve extra cuando está en hover, sin perder el contorno de contraste
      const glowOpacity = 0.4 + (isHovering ? 0.3 : 0);
      const glowBlur = isHovering ? 18 : 12;
      ring!.style.boxShadow = `0 0 ${glowBlur}px rgba(${COLOR_TEAL}, ${glowOpacity}), 0 0 0 1px rgba(0,0,0,0.2)`;

      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("pointerover", handlePointerOver);
      document.removeEventListener("pointerout", handlePointerOut);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]" aria-hidden="true">
      {/* Punto central */}
      <div
        ref={dotRef}
        className="fixed left-0 top-0 rounded-full"
        style={{
          width: DOT_SIZE,
          height: DOT_SIZE,
          backgroundColor: `rgb(${COLOR_TEAL})`,
          boxShadow: `0 0 6px rgba(${COLOR_TEAL}, 0.9), 0 0 0 1px rgba(0,0,0,0.25)`,
          willChange: "transform",
        }}
      />
      {/* Aro con inercia */}
      <div
        ref={ringRef}
        className="fixed left-0 top-0 rounded-full"
        style={{
          width: RING_SIZE,
          height: RING_SIZE,
          border: `${RING_BORDER}px solid rgba(${COLOR_TEAL}, 0.8)`,
          boxShadow: `0 0 0 1px rgba(0,0,0,0.2)`,
          willChange: "transform",
        }}
      />
    </div>
  );
}