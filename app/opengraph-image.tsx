import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 72, fontWeight: 800 }}>
          <span>compare</span>
          <span style={{ color: "#9ca3af" }}>Code</span>
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.7)", marginTop: 20 }}>
          Are you a Shipper or a Solver?
        </div>
      </div>
    ),
    { ...size }
  );
}
