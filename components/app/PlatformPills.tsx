import { platformLabel, storeUrlFor } from "@/lib/apps";
import type { StudioApp } from "@/types/app";

/**
 * One pill per platform. A platform the app is out on links to its store; on a live app, one it
 * isn't out on yet is dashed and says so.
 */
export function PlatformPills({ app }: { app: StudioApp }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {app.platforms.map((platform) => {
        const href = storeUrlFor(app, platform);
        const label = platformLabel[platform];
        if (href) {
          return (
            <li key={platform}>
              <a href={href} rel="noreferrer" className="stamp text-sumi-soft hover:text-sumi">
                {label}
                <span aria-hidden="true"> ↗</span>
              </a>
            </li>
          );
        }
        const soon = app.status === "live";
        return (
          <li key={platform} className={`stamp text-sumi-soft${soon ? " border-dashed" : ""}`}>
            {soon ? `${label} · soon` : label}
          </li>
        );
      })}
    </ul>
  );
}
