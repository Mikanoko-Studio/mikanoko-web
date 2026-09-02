"use client";

import { useState } from "react";

type MikanProps = {
  size?: number;
  className?: string;
  /** Set false for decorative copies that shouldn't be clickable. */
  interactive?: boolean;
};

/**
 * The studio mark. Click it five times and it comes apart.
 * Nothing else happens. That is the whole feature.
 */
export function Mikan({ size = 44, className = "", interactive = true }: MikanProps) {
  const [taps, setTaps] = useState(0);
  const peeled = taps >= 5;

  const body = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      aria-hidden="true"
      className="overflow-visible"
    >
      <g
        style={{
          transition: "transform 500ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          transform: peeled ? "rotate(-8deg)" : "none",
          transformOrigin: "32px 38px",
        }}
      >
        <circle
          cx="32"
          cy="38"
          r="22"
          fill="var(--color-mikan)"
          stroke="var(--color-sumi)"
          strokeWidth="3"
        />
        {/* segments, only once it has been taken apart */}
        <g
          stroke="var(--color-sumi)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity={peeled ? 0.8 : 0}
          style={{ transition: "opacity 400ms ease" }}
        >
          <path d="M32 16.5 V59.5" />
          <path d="M13.4 27 L50.6 49" />
          <path d="M13.4 49 L50.6 27" />
        </g>
        <path
          d="M22 30 q4 -6 10 -6"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity=".55"
        />
      </g>
      {/* one segment, escaping */}
      <path
        d="M32 38 L47 27 A19 19 0 0 1 47 49 Z"
        fill="var(--color-mikan)"
        stroke="var(--color-sumi)"
        strokeWidth="3"
        strokeLinejoin="round"
        style={{
          transition: "transform 550ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 300ms ease",
          transform: peeled ? "translate(16px, -6px) rotate(22deg)" : "none",
          transformOrigin: "32px 38px",
          opacity: peeled ? 1 : 0,
        }}
      />
      {/* stem + leaf */}
      <path d="M32 17 v-5" stroke="var(--color-sumi)" strokeWidth="3" strokeLinecap="round" />
      <path
        d="M33 12 q9 -7 15 -2 q-5 8 -15 2 Z"
        fill="var(--color-ha)"
        stroke="var(--color-sumi)"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  );

  if (!interactive) return <span className={className}>{body}</span>;

  return (
    <button
      type="button"
      onClick={() => setTaps((t) => t + 1)}
      aria-label={peeled ? "Mikan, peeled" : "Mikan"}
      className={`anim-wobble-hover appearance-none bg-transparent p-0 leading-none ${className}`}
    >
      {body}
    </button>
  );
}
