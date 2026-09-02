import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CopyEmail } from "@/components/play/CopyEmail";
import { SleepingCat } from "@/components/studio/Doodles";
import { hasPrivacy, hasTerms } from "@/content/legal";
import { appSlugs, getApp } from "@/lib/apps";

export function generateStaticParams() {
  return appSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/support/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const app = getApp(slug);
  if (!app) return {};

  return {
    title: `${app.name} support`,
    description: `How to get help with ${app.name}.`,
  };
}

export default async function SupportPage(props: PageProps<"/support/[slug]">) {
  const { slug } = await props.params;
  const app = getApp(slug);
  if (!app) notFound();

  return (
    <article className="wrap py-12 sm:py-16">
      <Link href={`/apps/${app.slug}`} className="label text-sumi-soft hover:text-mikan">
        ← {app.name}
      </Link>

      <header className="mt-6">
        <p className="label text-mikan">{app.name}</p>
        <h1 className="mt-2 font-display text-3xl font-black sm:text-4xl">
          something wrong?
        </h1>
      </header>

      <div className="mt-8 max-w-2xl border-[2.5px] border-sumi bg-kami-deep p-6">
        <p className="label text-sumi-soft">email us</p>
        <p className="mt-2 flex flex-wrap items-center gap-3 font-display text-xl">
          <a
            href={`mailto:${app.supportEmail}`}
            className="border-b-[3px] border-mikan hover:bg-momo"
          >
            {app.supportEmail}
          </a>
          <CopyEmail email={app.supportEmail} />
        </p>
        <p className="mt-4 max-w-lg text-sm text-sumi-soft">
          A person reads every one of these. Tell us your device and what you
          were doing — it saves a round trip. We usually reply within a couple
          of days, sooner if it&apos;s broken.
        </p>
      </div>

      {app.support && app.support.length > 0 && (
        <section className="mt-12 max-w-2xl">
          <h2 className="font-display text-xl font-bold">
            asked before
          </h2>
          <dl className="mt-5">
            {app.support.map((item) => (
              <div key={item.q} className="border-t-2 border-sumi/15 py-5">
                <dt className="font-display text-lg font-bold">{item.q}</dt>
                <dd className="mt-1.5 text-sumi-soft">{item.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <footer className="mt-12 flex items-end gap-4">
        <ul className="label space-y-2">
          {hasPrivacy(app.slug) && (
            <li>
              <Link href={`/privacy/${app.slug}`} className="hover:text-mikan">
                {app.name} privacy policy →
              </Link>
            </li>
          )}
          {hasTerms(app.slug) && (
            <li>
              <Link href={`/terms/${app.slug}`} className="hover:text-mikan">
                {app.name} terms →
              </Link>
            </li>
          )}
        </ul>
        <SleepingCat size={48} className="ml-auto opacity-70" />
      </footer>
    </article>
  );
}
