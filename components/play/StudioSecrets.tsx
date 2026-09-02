"use client";

import { useEffect, useState } from "react";

const WORD = "mikan";

/**
 * Two small things nobody asked for:
 *   1. a greeting for whoever opens the console
 *   2. type "mikan" anywhere and the page gets briefly citrusy
 */
export function StudioSecrets() {
  const [squeezed, setSqueezed] = useState(false);

  useEffect(() => {
    console.log(
      "%c🍊 みかん",
      "font-size:20px",
      "\nyou opened the console. hello.\nif you are reading this you are exactly the kind of person we make things for.\nhello@mikanoko.studio",
    );
  }, []);

  useEffect(() => {
    let buffer = "";

    function onKeyDown(event: KeyboardEvent) {
      const target = event.target as HTMLElement | null;
      if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) {
        return;
      }
      if (event.key.length !== 1) return;

      buffer = (buffer + event.key.toLowerCase()).slice(-WORD.length);
      if (buffer === WORD) {
        buffer = "";
        setSqueezed(true);
        window.setTimeout(() => setSqueezed(false), 1600);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!squeezed) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-50"
      style={{
        backgroundColor: "var(--color-mikan)",
        mixBlendMode: "multiply",
        animation: "citrus 1.6s ease-out forwards",
      }}
    />
  );
}
