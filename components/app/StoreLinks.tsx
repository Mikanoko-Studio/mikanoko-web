import type { StudioApp } from "@/types/app";

/**
 * TODO(daniel): swap these for the official Apple / Google badge artwork
 * (public/studio/badges/) before either store listing goes live — both
 * platforms have brand guidelines about how their badges look.
 */
const linkClass =
  "inline-flex items-center gap-2 border-[2.5px] border-sumi bg-kami px-4 py-2.5 font-display text-sm font-bold " +
  "shadow-[3px_4px_0_var(--color-sumi)] transition-transform duration-150 " +
  "hover:-translate-y-0.5 hover:translate-x-[-1px] active:translate-y-0.5 active:shadow-[1px_1px_0_var(--color-sumi)]";

export function StoreLinks({ app }: { app: StudioApp }) {
  const links = [
    app.appStoreUrl && { href: app.appStoreUrl, label: "App Store", sub: "iPhone" },
    app.playStoreUrl && { href: app.playStoreUrl, label: "Google Play", sub: "Android" },
    app.websiteUrl && { href: app.websiteUrl, label: "Its own website", sub: "web" },
  ].filter(Boolean) as { href: string; label: string; sub: string }[];

  if (links.length === 0) {
    return (
      <p className="label border-[2.5px] border-dashed border-sumi/35 px-4 py-3 text-sumi-soft">
        nowhere to download it yet
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-3">
      {links.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={linkClass}
          rel="noreferrer"
        >
          {link.label}
          <span className="label text-sumi-soft">{link.sub}</span>
        </a>
      ))}
    </div>
  );
}
