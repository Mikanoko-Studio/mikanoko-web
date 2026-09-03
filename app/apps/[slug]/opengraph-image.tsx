import { ImageResponse } from "next/og";
import { appSlugs, getApp } from "@/lib/apps";
import { site } from "@/lib/site";

export const alt = "App page";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return appSlugs().map((slug) => ({ slug }));
}

/** Per-app share card, in that app's own ink. Generated at build time. */
export default async function AppOpengraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getApp(slug);

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
        <div
          style={{
            width: 150,
            height: 12,
            backgroundColor: app?.accent ?? "#F0722B",
          }}
        />
        <div style={{ fontSize: 78, fontWeight: 700, marginTop: 36 }}>
          {app?.name ?? site.name}
        </div>
        <div style={{ fontSize: 38, marginTop: 14, color: "#7A6C61" }}>
          {app?.tagline ?? site.tagline}
        </div>
        <div style={{ fontSize: 26, marginTop: 44, color: "#7A6C61" }}>
          {site.name}
        </div>
      </div>
    ),
    size,
  );
}
