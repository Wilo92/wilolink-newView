"use client";

import { useEffect, useRef } from "react";



type Props = {
 
  fondo?: string;
  
  colorPrincipal?: string;
 
  colorAcento?: string;
 
  opacidad?: number;
 
  tamano?: number;
  
  fps?: number;
  
  caracteres?: string;
};


function hexARgb(hex: string): string {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `${(n >> 16) & 255},${(n >> 8) & 255},${n & 255}`;
}

export default function CodeRainBackground({
  fondo = "#0b0f19",
  colorPrincipal = "34,211,184", 
  colorAcento = "255,176,32", 
  opacidad = 0.32,
  tamano = 15,
  fps = 22,
  caracteres = "01{}[]<>/=;:$#&|!*+-_()=>constletfnifreturnasyncawait",
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducirMovimiento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fondoRgb = hexARgb(fondo);
    const simbolos = caracteres.split("");
    const intervalo = 1000 / fps;

    let ancho = 0;
    let alto = 0;
    let columnas = 0;
    let filas: number[] = []; 
    let frameId: number | null = null;
    let ultimo = 0;

    const simboloAlAzar = () => simbolos[Math.floor(Math.random() * simbolos.length)];

    function colorCaracter() {
      
      return Math.random() < 0.04
        ? `rgba(${colorAcento},${Math.min(1, opacidad * 1.7)})`
        : `rgba(${colorPrincipal},${opacidad})`;
    }

    function pintarFondo() {
      ctx!.fillStyle = fondo;
      ctx!.fillRect(0, 0, ancho, alto);
    }

   
    function paso() {
     
      ctx!.fillStyle = `rgba(${fondoRgb},0.14)`;
      ctx!.fillRect(0, 0, ancho, alto);
      ctx!.font = `500 ${tamano - 2}px ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace`;

      for (let i = 0; i < columnas; i++) {
        if (i % 2) continue; 
        const x = i * tamano;
        const y = filas[i] * tamano;
        ctx!.fillStyle = colorCaracter();
        ctx!.fillText(simboloAlAzar(), x, y);

       
        if (y > alto && Math.random() > 0.975) filas[i] = 0;
        filas[i] += 1;
      }
    }

   
    function dibujarEstatico() {
      pintarFondo();
      ctx!.font = `500 ${tamano - 2}px ui-monospace, "JetBrains Mono", Menlo, Consolas, monospace`;
      for (let i = 0; i < columnas; i += 2) {
        for (let y = tamano; y < alto; y += tamano) {
          if (Math.random() < 0.12) {
            ctx!.fillStyle = `rgba(${colorPrincipal},${opacidad * Math.random()})`;
            ctx!.fillText(simboloAlAzar(), i * tamano, y);
          }
        }
      }
    }

    function bucle(ahora: number) {
      if (ahora - ultimo >= intervalo) {
        paso();
        ultimo = ahora;
      }
      frameId = requestAnimationFrame(bucle);
    }

    function detener() {
      if (frameId !== null) cancelAnimationFrame(frameId);
      frameId = null;
    }

    function iniciar() {
      detener();
      if (reducirMovimiento) dibujarEstatico();
      else frameId = requestAnimationFrame(bucle);
    }

   
    function ajustarTamano() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ancho = window.innerWidth;
      alto = window.innerHeight;
      canvas!.width = ancho * dpr;
      canvas!.height = alto * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      columnas = Math.ceil(ancho / tamano);
   
      filas = Array.from({ length: columnas }, () => -Math.random() * (alto / tamano));
      pintarFondo();
      iniciar();
    }

    let temporizador: ReturnType<typeof setTimeout>;
    const alRedimensionar = () => {
      clearTimeout(temporizador);
      temporizador = setTimeout(ajustarTamano, 150);
    };

  
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
  }, [fondo, colorPrincipal, colorAcento, opacidad, tamano, fps, caracteres]);

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