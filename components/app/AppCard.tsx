import Link from "next/link";
import { statusLabel } from "@/lib/apps";
import type { StudioApp } from "@/types/app";
import { AppIcon } from "./AppIcon";

export function AppCard({ app }: { app: StudioApp }) {
  return (
    <li className="peel relative border-[2.5px] border-sumi bg-kami">
      <Link href={`/apps/${app.slug}`} className="block h-full p-5 focus:outline-none">
        <div className="flex items-start gap-4">
          <AppIcon app={app} size={64} />
          <div className="min-w-0">
            <h3 className="font-display text-lg font-bold leading-snug">{app.name}</h3>
            {app.nameJa && (
              <p className="label mt-1 text-sumi-soft">{app.nameJa}</p>
            )}
          </div>
        </div>

        <p className="mt-4 text-[0.95rem] leading-relaxed">{app.tagline}</p>

        <p className="label mt-4 flex items-center gap-2 text-sumi-soft">
          <span
            aria-hidden="true"
            className="inline-block h-2 w-2 rounded-full"
            style={{ backgroundColor: app.status === "live" ? app.accent : "transparent", border: `1.5px solid var(--color-sumi)` }}
          />
          {statusLabel[app.status]}
        </p>
      </Link>
      <span className="peel-corner" aria-hidden="true" />
    </li>
  );
}
