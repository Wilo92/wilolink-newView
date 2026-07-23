// src/components/WelcomeSplash.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Oswald, Sacramento, Montserrat } from "next/font/google";

const oswald = Oswald({ subsets: ["latin"], weight: ["400", "500"] });
const sacramento = Sacramento({ subsets: ["latin"], weight: "400" });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["500", "600"], style: "italic" });

const SERVICES = [
  "Mantenimiento preventivo y correctivo laptop's, pc de escritorio, servidores, celulares.",
  "Asesoria y consultoria tecnica",
  "Enseñanza en informática básica para adultos, niños y personas no tecnicas.",
  "Servicios de administración de redes empresariales o locales",
  "Desarrollo de sitios web y sistemas de información a la medida.",
];

// Mismo mesh gradient para ambas caras.
const MESH =
  "radial-gradient(ellipse 42% 55% at 4% 22%, #A428F0 0%, transparent 62%)," +
  "radial-gradient(ellipse 34% 48% at 6% 62%, #7A1BB5 0%, transparent 66%)," +
  "radial-gradient(ellipse 46% 58% at 97% 26%, #2E7FA6 0%, transparent 72%)," +
  "radial-gradient(ellipse 42% 46% at 88% 88%, #159AA8 0%, transparent 72%)," +
  "radial-gradient(ellipse 30% 34% at 66% 58%, #2B5FC4 0%, transparent 70%)," +
  "#08080f";

// Estilo base compartido por las dos caras de la tarjeta.
const face: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backfaceVisibility: "hidden",
  WebkitBackfaceVisibility: "hidden",
  borderRadius: 14,
  overflow: "hidden",
  background: MESH,
};

// Trama de puntos decorativa reutilizable.
function Dots({
  left,
  top,
  width,
  height,
  color = "#8e93a8",
  size = 23,
  gapY,
  opacity = 0.55,
}: {
  left: string;
  top: string;
  width: string;
  height: string;
  color?: string;
  size?: number;
  gapY?: number;
  opacity?: number;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width,
        height,
        backgroundImage: `radial-gradient(circle, ${color} 1.6px, transparent 1.6px)`,
        backgroundSize: `${size}px ${gapY ?? size}px`,
        opacity,
        pointerEvents: "none",
      }}
    />
  );
}

export default function WelcomeSplash() {
  const [visible, setVisible] = useState(true);
  const [flipped, setFlipped] = useState(false);
  const [exiting, setExiting] = useState(false);

  function handleContinue() {
    setExiting(true);
    // Debe coincidir con la duración del zoom de salida (0.5s).
    setTimeout(() => setVisible(false), 500);
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 22,
            padding: 16,
          }}
        >
          {/* Entrada: fade + scale in. Salida: zoom hacia adentro. */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={exiting ? { opacity: 0, scale: 2.2 } : { opacity: 1, scale: 1 }}
            transition={{ duration: exiting ? 0.5 : 0.45, ease: "easeOut" }}
            style={{
              perspective: 1400,
              width: "clamp(320px, 62vw, 720px)",
              aspectRatio: "1003 / 590",
              // Permite que las tipografías escalen con la tarjeta usando cqw.
              containerType: "inline-size",
            }}
          >
            <div
              onClick={() => setFlipped((f) => !f)}
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                cursor: "pointer",
                transformStyle: "preserve-3d",
                transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
                transition: "transform 0.7s ease",
              }}
            >
              {/* ---------- FRENTE ---------- */}
              <div style={face}>
                <Dots left="29%" top="1%" width="24%" height="12%" color="#6f7385" opacity={0.85} />
                <Dots left="40%" top="24%" width="9%" height="6%" color="#cfd6e6" size={20} gapY={12} opacity={0.9} />
                <Dots left="1%" top="52%" width="19%" height="33%" opacity={0.55} />
                <Dots left="14%" top="85%" width="8%" height="5%" color="#cfd6e6" size={19} gapY={12} opacity={0.9} />

                <div
                  style={{
                    position: "absolute",
                    left: "6%",
                    top: "33%",
                    display: "flex",
                    alignItems: "center",
                    gap: "2%",
                  }}
                >
                  <span
                    className={sacramento.className}
                    style={{ fontSize: "5.2cqw", color: "#5ec8d8", lineHeight: 1 }}
                  >
                    wilo
                  </span>

                  {/* Logo aproximado en CSS — ver nota abajo para usar el real. */}
                  <div
                    style={{
                      position: "relative",
                      width: "11cqw",
                      aspectRatio: "1",
                      borderRadius: "50%",
                      border: "0.6cqw solid #4FC3E8",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "64%",
                        height: "64%",
                        borderRadius: "50%",
                        border: "0.55cqw solid #e8f4fb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "55%",
                          height: "55%",
                          borderRadius: "50%",
                          border: "0.4cqw solid #4FC3E8",
                        }}
                      />
                    </div>
                    <div
                      style={{
                        position: "absolute",
                        left: "50%",
                        top: "6%",
                        transform: "translateX(-50%)",
                        width: "14%",
                        height: "52%",
                        background: "#eaf6fd",
                        borderRadius: "50% 50% 30% 30%",
                      }}
                    />
                  </div>
                </div>

                <div
                  className={oswald.className}
                  style={{ position: "absolute", right: "5.5%", top: "20%", textAlign: "right" }}
                >
                  <p style={{ fontSize: "4.6cqw", color: "#dbe6f2", letterSpacing: "0.02em", margin: "0 0 2%" }}>
                    WILMER RESTREPO
                  </p>
                  <p style={{ fontSize: "1.5cqw", color: "#cfe0ef", letterSpacing: "0.22em", margin: 0 }}>
                    Ingeniero de Sistemas
                  </p>
                  <p style={{ fontSize: "1.5cqw", color: "#cfe0ef", letterSpacing: "0.16em", margin: "1% 0 0" }}>
                    Especialista en desarrollo de software
                  </p>
                </div>

                <div
                  className={oswald.className}
                  style={{ position: "absolute", right: "5.5%", bottom: "14%", textAlign: "right" }}
                >
                  <a
                    href="tel:+573003553762"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "block",
                      fontSize: "3cqw",
                      color: "#ffffff",
                      margin: "0 0 2%",
                      textDecoration: "none",
                    }}
                  >
                    3003553762
                  </a>

                  <a
                    href="mailto:wilmerrestrepoo@hotmail.com"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "block",
                      fontSize: "2.3cqw",
                      color: "#d6e3f0",
                      margin: "0 0 6%",
                      textDecoration: "none",
                    }}
                  >
                    wilmerrestrepoo@hotmail.com
                  </a>

                  <a
                    href="https://www.wilolink.online"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "block",
                      fontSize: "1.5cqw",
                      color: "#b9cfe4",
                      margin: "0 0 2%",
                      textUnderlineOffset: 3,
                    }}
                  >
                    www.wilolink.online
                  </a>

                  <a
                    href="https://www.crediorbit.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{
                      display: "block",
                      fontSize: "1.5cqw",
                      color: "#b9cfe4",
                      margin: 0,
                      textUnderlineOffset: 3,
                    }}
                  >
                    www.crediorbit.com
                  </a>
                </div>
              </div>

              {/* ---------- REVERSO ---------- */}
              <div style={{ ...face, transform: "rotateY(180deg)" }}>
                <Dots left="29%" top="1%" width="24%" height="12%" color="#6f7385" opacity={0.85} />
                <Dots left="1%" top="58%" width="17%" height="28%" opacity={0.5} />
                <Dots left="13%" top="86%" width="8%" height="5%" color="#cfd6e6" size={19} gapY={12} opacity={0.9} />

                <div
                  style={{
                    position: "absolute",
                    left: "45%",
                    right: "4%",
                    top: "15%",
                    bottom: "15%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  {SERVICES.map((s) => (
                    <div
                      key={s}
                      style={{
                        background: "linear-gradient(90deg, #3D8FD6 0%, #3FC9B4 100%)",
                        borderRadius: 999,
                        padding: "2.4% 5%",
                        textAlign: "center",
                      }}
                    >
                      <p
                        className={montserrat.className}
                        style={{ fontSize: "1.5cqw", color: "#ffffff", margin: 0, lineHeight: 1.35 }}
                      >
                        {s}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Barrido de brillo, sincronizado con el flip */}
              <motion.div
                animate={flipped ? { left: "110%" } : { left: "-15%" }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  width: "12%",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.28), transparent)",
                  pointerEvents: "none",
                  borderRadius: 14,
                }}
              />
            </div>
          </motion.div>

          <p style={{ color: "#9aa3c9", fontSize: "clamp(11px, 1vw, 13px)", margin: 0 }}>
            Toca la tarjeta para voltearla
          </p>

          <motion.button
            onClick={handleContinue}
            whileTap={{ scale: 0.97 }}
            style={{
              background: "#22d3b8",
              color: "#062119",
              border: "none",
              borderRadius: 8,
              padding: "clamp(9px, 1vw, 12px) clamp(22px, 2.4vw, 32px)",
              fontSize: "clamp(13px, 1.1vw, 15px)",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Continuar al sitio →
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}