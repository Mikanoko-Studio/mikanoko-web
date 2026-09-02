"use client";

import { useEffect, useRef, useState } from "react";

export function CopyEmail({ email, className = "" }: { email: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked (insecure context, or the user said no).
      // The address is right there as a link, so there is nothing to recover.
    }
  }

  return (
    <span className={`relative inline-flex ${className}`}>
      <button
        type="button"
        onClick={copy}
        className="label border-[2px] border-sumi px-2.5 py-1 transition-transform duration-150 hover:-rotate-2 hover:bg-momo"
      >
        copy
      </button>
      <span
        aria-hidden={!copied}
        className={`pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap border-[2px] border-sumi bg-kami px-2 py-1 font-display text-xs font-bold transition-all duration-200 ${
          copied ? "opacity-100" : "translate-y-1 opacity-0"
        }`}
      >
        got it!
        <span className="absolute -bottom-[7px] left-1/2 h-2.5 w-2.5 -translate-x-1/2 rotate-45 border-b-[2px] border-r-[2px] border-sumi bg-kami" />
      </span>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </span>
  );
}
