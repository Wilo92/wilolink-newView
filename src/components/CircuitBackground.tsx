"use client";

import { useEffect, useRef } from "react";


type Props = {
  /** Color de fondo detrás del circuito. */
  fondo?: string;
  /** Color principal de los pulsos, en formato "R,G,B". */
  colorPrincipal?: string;
  /** Color secundario (algunos pulsos salen de este color), en formato "R,G,B". */
  colorAcento?: string;
  /** Porcentaje de pulsos que usan el color de acento (0 a 1). */
  proporcionAcento?: number;
  /** Separación de la cuadrícula en px. Más grande = pistas más largas y espaciadas. */
  paso?: number;
  /** Densidad: px² de pantalla por cada pista. Más bajo = más pistas. */
  densidad?: number;
  /** Opacidad de las pistas apagadas (0 a 1). */
  opacidadPista?: number;
};

type Pista = {
  puntos: [number, number][];
  acumulado: number[]; // longitud acumulada hasta cada punto
  total: number;
  progreso: number; // 0..1.4 (el 0.4 extra es una pausa antes de repetir)
  velocidad: number;
  color: string;
};

// Las 8 direcciones posibles: horizontal, vertical y diagonales.
const DIRECCIONES: [number, number][] = [
  [1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1],
];

const azar = (min: number, max: number) => min + Math.random() * (max - min);

export default function CircuitBackground({
  fondo = "#0b0f19",
  colorPrincipal = "34,211,184", // #22d3b8 (turquesa)
  colorAcento = "255,176,32", // #ffb020 (naranja)
  proporcionAcento = 0.25,
  paso = 26,
  densidad = 22000,
  opacidadPista = 0.055,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let ancho = 0;
    let alto = 0;
    let pistas: Pista[] = [];
    let frameId: number | null = null;

    /* ---------- Generar pistas ---------- */
    function crearPistas() {
      const cantidad = Math.round((ancho * alto) / densidad);
      const nuevas: Pista[] = [];

      for (let k = 0; k < cantidad; k++) {
        // Punto inicial alineado a la cuadrícula
        let x = Math.round(azar(0, ancho) / paso) * paso;
        let y = Math.round(azar(0, alto) / paso) * paso;
        // Arranca siempre en horizontal o vertical (índices pares)
        let dir = Math.floor(Math.random() * 4) * 2;

        const puntos: [number, number][] = [[x, y]];
        const segmentos = 3 + Math.floor(Math.random() * 4);

        for (let s = 0; s < segmentos; s++) {
          // Tramos rectos largos, tramos diagonales cortos
          const largo = s % 2 ? 1 + Math.floor(Math.random() * 2) : 2 + Math.floor(Math.random() * 6);
          x += DIRECCIONES[dir][0] * paso * largo;
          y += DIRECCIONES[dir][1] * paso * largo;
          puntos.push([x, y]);
          // Gira 45° a la izquierda o a la derecha
          dir = (dir + (Math.random() < 0.5 ? 1 : 7)) % 8;
        }

        const acumulado = [0];
        for (let i = 1; i < puntos.length; i++) {
          const [ax, ay] = puntos[i - 1];
          const [bx, by] = puntos[i];
          acumulado.push(acumulado[i - 1] + Math.hypot(bx - ax, by - ay));
        }

        nuevas.push({
          puntos,
          acumulado,
          total: acumulado[acumulado.length - 1],
          progreso: Math.random(),
          velocidad: azar(0.6, 1.6),
          color: Math.random() < proporcionAcento ? colorAcento : colorPrincipal,
        });
      }
      pistas = nuevas;
    }

    /* ---------- Posición a cierta distancia del inicio de una pista ---------- */
    function puntoEn(p: Pista, distancia: number): [number, number] {
      let i = 1;
      while (i < p.acumulado.length - 1 && p.acumulado[i] < distancia) i++;
      const [ax, ay] = p.puntos[i - 1];
      const [bx, by] = p.puntos[i];
      const tramo = p.acumulado[i] - p.acumulado[i - 1] || 1;
      const f = (distancia - p.acumulado[i - 1]) / tramo;
      return [ax + (bx - ax) * f, ay + (by - ay) * f];
    }

    /* ---------- Dibujar un cuadro ---------- */
    function dibujar() {
      ctx!.clearRect(0, 0, ancho, alto);
      ctx!.lineWidth = 1.4;
      ctx!.lineJoin = "round";

      for (const p of pistas) {
        // Pista apagada
        ctx!.strokeStyle = `rgba(255,255,255,${opacidadPista})`;
        ctx!.beginPath();
        p.puntos.forEach(([x, y], i) => (i ? ctx!.lineTo(x, y) : ctx!.moveTo(x, y)));
        ctx!.stroke();

        // "Pads" (circulitos) en los extremos
        ctx!.strokeStyle = `rgba(255,255,255,${opacidadPista * 1.7})`;
        for (const [x, y] of [p.puntos[0], p.puntos[p.puntos.length - 1]]) {
          ctx!.beginPath();
          ctx!.arc(x, y, 3, 0, Math.PI * 2);
          ctx!.stroke();
        }

        // Avanzar el pulso
        if (!reducirMovimiento) {
          p.progreso += p.velocidad / p.total;
          if (p.progreso > 1.4) p.progreso = 0;
        }

        // Pulso con estela (10 puntos que se desvanecen)
        if (p.progreso <= 1) {
          const cabeza = p.progreso * p.total;
          const estela = 10;
          for (let k = 0; k < estela; k++) {
            const d = cabeza - k * 5;
            if (d < 0) break;
            const [x, y] = puntoEn(p, d);
            ctx!.fillStyle = `rgba(${p.color},${0.55 * (1 - k / estela)})`;
            ctx!.beginPath();
            ctx!.arc(x, y, 1.6, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
      }
    }

    function bucle() {
      dibujar();
      frameId = requestAnimationFrame(bucle);
    }

    function detener() {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
    }

    function iniciar() {
      detener();
      if (reducirMovimiento) dibujar(); // un solo cuadro estático
      else bucle();
    }

    /* ---------- Ajustar al tamaño de la ventana ---------- */
    function ajustarTamano() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = window.innerWidth;
      alto = window.innerHeight;
      canvas!.width = ancho * dpr;
      canvas!.height = alto * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      crearPistas();
      iniciar();
    }

    let temporizador: ReturnType<typeof setTimeout>;
    const alRedimensionar = () => {
      clearTimeout(temporizador);
      temporizador = setTimeout(ajustarTamano, 150);
    };

    // Pausar cuando la pestaña no está visible (ahorra batería y CPU)
    const alCambiarVisibilidad = () => (document.hidden ? detener() : iniciar());

    ajustarTamano();
    window.addEventListener("resize", alRedimensionar);
    document.addEventListener("visibilitychange", alCambiarVisibilidad);

    return () => {
      detener();
      clearTimeout(temporizador);
      window.removeEventListener("resize", alRedimensionar);
      document.removeEventListener("visibilitychange", alCambiarVisibilidad);
    };
  }, [colorPrincipal, colorAcento, proporcionAcento, paso, densidad, opacidadPista]);

  // El div pone el fondo oscuro solo mientras esta página está montada;
  // el resto del sitio conserva su fondo normal.
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ backgroundColor: fondo }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}