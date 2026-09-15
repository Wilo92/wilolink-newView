import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(100deg, #1a2138 0%, #2a2f52 45%, #b5501c 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 16,
              background: "#ffb020",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
              <polyline
                points="4,13 9,18 20,6"
                stroke="#1a1206"
                strokeWidth="3"
              />
            </svg>
          </div>
          <div style={{ display: "flex", fontSize: 72, fontWeight: 800 }}>
            <span style={{ color: "#ffb020" }}>WILO</span>
            <span style={{ color: "#f5f3ff" }}>LINK</span>
          </div>
        </div>
        <div style={{ fontSize: 30, color: "#e8e4ff" }}>
          Tecnología que se entiende.
        </div>
      </div>
    ),
    { ...size }
  );
}