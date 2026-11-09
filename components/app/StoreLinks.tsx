import Image from "next/image";
import type { StudioApp } from "@/types/app";

const linkClass =
  "inline-flex items-center gap-2 border-[2.5px] border-sumi bg-kami px-4 py-2.5 font-display text-sm font-bold " +
  "shadow-[3px_4px_0_var(--color-sumi)] transition-transform duration-150 " +
  "hover:-translate-y-0.5 hover:translate-x-[-1px] active:translate-y-0.5 active:shadow-[1px_1px_0_var(--color-sumi)]";

export function StoreLinks({ app }: { app: StudioApp }) {
  const links = [
    app.websiteUrl && { href: app.websiteUrl, label: "Its own website", sub: "web" },
  ].filter(Boolean) as { href: string; label: string; sub: string }[];

  if (links.length === 0 && !app.appStoreUrl && !app.playStoreUrl) {
    return (
      <p className="label border-[2.5px] border-dashed border-sumi/35 px-4 py-3 text-sumi-soft">
        nowhere to download it yet
      </p>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      {app.appStoreUrl && (
        // Apple's own badge, unaltered (Apple's marketing guidelines), the height of the Play
        // badge's visible artwork. It has no clear space of its own, unlike Google's.
        <a href={app.appStoreUrl} rel="noreferrer" className="inline-block">
          <Image
            src="/studio/badges/app-store.svg"
            alt="Download on the App Store"
            width={120}
            height={40}
            className="h-[42px] w-auto"
          />
        </a>
      )}
      {app.playStoreUrl && (
        // Google's own badge, unaltered: its brand rules allow the Play logo only this way. The
        // artwork carries its own clear space, so it sits a little wider than it looks.
        <a href={app.playStoreUrl} rel="noreferrer" className="-my-2 -ml-2 inline-block">
          <Image
            src="/studio/badges/google-play.png"
            alt="Get it on Google Play"
            width={646}
            height={250}
            className="h-[62px] w-auto"
          />
        </a>
      )}
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
