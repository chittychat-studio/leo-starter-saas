import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Generated at build time from the site config, so it updates when you edit the copy.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f7f3ec",
          color: "#2a211a",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 700 }}>
          <div style={{ width: 34, height: 34, borderRadius: 999, background: "#e2592d", display: "flex" }} />
          {site.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 86, fontWeight: 800, letterSpacing: -3, lineHeight: 1.02, maxWidth: 980 }}>
            {site.tagline}
          </div>
          <div style={{ fontSize: 32, color: "#5b4c40", maxWidth: 900, lineHeight: 1.35 }}>
            {site.hero.note}
          </div>
        </div>
        <div style={{ display: "flex", height: 10, width: "100%", background: "#e2592d", borderRadius: 999 }} />
      </div>
    ),
    size,
  );
}
