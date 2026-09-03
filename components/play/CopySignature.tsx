"use client";

import { useRef, useState, type ReactNode } from "react";

type State = "idle" | "copied" | "failed";

/**
 * Copies its children as rich HTML, so pasting into Gmail keeps the table and
 * the inline styles instead of arriving as flat text.
 */
export function CopySignature({ children }: { children: ReactNode }) {
  const region = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<State>("idle");

  async function copy() {
    const node = region.current;
    if (!node) return;

    try {
      await navigator.clipboard.write([
        new ClipboardItem({
          "text/html": new Blob([node.innerHTML], { type: "text/html" }),
          "text/plain": new Blob([node.innerText], { type: "text/plain" }),
        }),
      ]);
      setState("copied");
    } catch {
      // Older browsers, or the clipboard permission was refused. Select it
      // instead so Cmd+C still works.
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(node);
      selection?.removeAllRanges();
      selection?.addRange(range);
      setState("failed");
    }

    window.setTimeout(() => setState("idle"), 3000);
  }

  return (
    <div>
      <div
        ref={region}
        className="border-[2.5px] border-sumi bg-white p-6"
        style={{ colorScheme: "light" }}
      >
        {children}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={copy}
          className="border-[2.5px] border-sumi bg-kami px-4 py-2.5 font-display text-sm font-bold shadow-[3px_4px_0_var(--color-sumi)] transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0.5 active:shadow-[1px_1px_0_var(--color-sumi)]"
        >
          copy the signature
        </button>
        <p className="label text-sumi-soft" role="status" aria-live="polite">
          {state === "copied" && "copied — now paste it into Gmail"}
          {state === "failed" && "selected it instead — press Cmd+C"}
        </p>
      </div>
    </div>
  );
}
