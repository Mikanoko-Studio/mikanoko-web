import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppIcon } from "@/components/app/AppIcon";
import { PlatformPills } from "@/components/app/PlatformPills";
import { StoreLinks } from "@/components/app/StoreLinks";
import { Star } from "@/components/studio/Doodles";
import { hasPrivacy, hasTerms } from "@/content/legal";
import { appSlugs, getApp, statusLabel } from "@/lib/apps";

export function generateStaticParams() {
  return appSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/apps/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const app = getApp(slug);
  if (!app) return {};

  return {
    title: app.name,
    description: app.tagline,
    openGraph: { title: app.name, description: app.tagline },
  };
}

export default async function AppPage(props: PageProps<"/apps/[slug]">) {
  const { slug } = await props.params;
  const app = getApp(slug);
  if (!app) notFound();

  const links = [
    { href: `/support/${app.slug}`, label: "support" },
    hasPrivacy(app.slug) ? { href: `/privacy/${app.slug}`, label: "privacy" } : null,
    hasTerms(app.slug) ? { href: `/terms/${app.slug}`, label: "terms" } : null,
  ].filter(Boolean) as { href: string; label: string }[];

  return (
    <article className="wrap py-12 sm:py-16">
      <Link href="/#apps" className="label text-sumi-soft hover:text-mikan">
        ← everything else
      </Link>

      {/* a rule in the app's own ink, the only place its colour gets to lead */}
      <div
        className="mt-6 h-1.5 w-24 ink"
        style={{ backgroundColor: app.accent }}
        aria-hidden="true"
      />

      <header className="mt-6 flex flex-wrap items-start gap-6">
        <AppIcon app={app} size={96} />
        <div className="min-w-0 flex-1">
          <h1 className="font-display text-3xl font-black sm:text-4xl">
            {app.name}
          </h1>
          {app.nameJa && <p className="label mt-2 text-sumi-soft">{app.nameJa}</p>}
          <p className="mt-3 max-w-lg font-display text-lg leading-snug">
            {app.tagline}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <PlatformPills platforms={app.platforms} />
            <span className="stamp" style={{ color: app.accent }}>
              {statusLabel[app.status]}
            </span>
          </div>
        </div>
      </header>

      <div className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <p className="max-w-xl text-lg leading-relaxed">{app.description}</p>

          <div className="mt-8">
            <StoreLinks app={app} />
          </div>

          {app.screenshots && app.screenshots.length > 0 && (
            <ul className="mt-12 flex snap-x gap-4 overflow-x-auto pb-4">
              {app.screenshots.map((shot) => (
                <li key={shot.src} className="shrink-0 snap-start">
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={260}
                    height={563}
                    className="border-[2.5px] border-sumi"
                  />
                </li>
              ))}
            </ul>
          )}
        </div>

        <aside className="space-y-8">
          {app.facts && app.facts.length > 0 && (
            <div className="border-[2.5px] border-sumi bg-kami-deep p-5">
              <p className="label mb-3 flex items-center gap-2 text-mikan">
                <Star size={14} /> true things
              </p>
              <ul className="space-y-2 text-sm">
                {app.facts.map((fact) => (
                  <li key={fact} className="border-b border-dashed border-sumi/25 pb-2 last:border-0 last:pb-0">
                    {fact}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <p className="label mb-3 text-sumi-soft">the boring pages</p>
            <ul className="label space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-mikan">
                    {link.label} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </article>
  );
}
