import Image from "next/image";
import type { StudioApp } from "@/types/app";

type AppIconProps = {
  app: StudioApp;
  size?: number;
  className?: string;
};

/**
 * Uses the app's own icon when it has one. Apps that don't have art yet get a
 * drawn placeholder in their accent colour rather than a broken image.
 */
export function AppIcon({ app, size = 88, className = "" }: AppIconProps) {
  const radius = size * 0.235;

  if (app.icon) {
    return (
      <Image
        src={app.icon}
        alt=""
        width={size}
        height={size}
        unoptimized
        className={`border-[2.5px] border-sumi ${className}`}
        style={{ borderRadius: radius, width: size, height: size }}
      />
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 128 128"
      aria-hidden="true"
      className={className}
    >
      <rect
        width="128"
        height="128"
        rx="30"
        fill={app.accent}
        stroke="var(--color-sumi)"
        strokeWidth="5"
      />
      <g className="halftone" />
      <text
        x="64"
        y="64"
        textAnchor="middle"
        dominantBaseline="central"
        fill="var(--color-sumi)"
        fontSize="56"
        fontFamily="var(--font-display)"
        fontWeight="900"
      >
        {app.name.charAt(0)}
      </text>
      <text
        x="64"
        y="104"
        textAnchor="middle"
        fill="var(--color-sumi)"
        fontSize="13"
        fontFamily="var(--font-label)"
        letterSpacing="2"
        opacity=".6"
      >
        NO ART YET
      </text>
    </svg>
  );
}
