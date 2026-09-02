import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Generated at build time. No fonts fetched, no runtime cost. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#FBF4E4",
          color: "#2B2420",
        }}
      >
        <svg width="130" height="130" viewBox="0 0 64 64">
          <circle cx="32" cy="38" r="21" fill="#F0722B" stroke="#2B2420" strokeWidth="3" />
          <path d="M32 17 v-5" stroke="#2B2420" strokeWidth="3" strokeLinecap="round" />
          <path d="M33 12 q9 -7 15 -2 q-5 8 -15 2 Z" fill="#3F7D52" stroke="#2B2420" strokeWidth="2.5" />
        </svg>
        <div style={{ fontSize: 74, fontWeight: 700, marginTop: 34 }}>{site.name}</div>
        <div style={{ fontSize: 40, marginTop: 12, color: "#7A6C61" }}>
          {site.tagline}
        </div>
      </div>
    ),
    size,
  );
}
