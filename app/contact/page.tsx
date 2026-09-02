import type { Metadata } from "next";
import Link from "next/link";
import { CopyEmail } from "@/components/play/CopyEmail";
import { Onigiri, Star } from "@/components/studio/Doodles";
import { apps } from "@/content/apps";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `How to reach ${site.name}.`,
};

export default function ContactPage() {
  return (
    <div className="wrap py-12 sm:py-16">
      <p className="label text-mikan">{site.nameJa}</p>
      <h1 className="mt-2 font-display text-3xl font-black sm:text-4xl">
        how to reach us
      </h1>
      <p className="mt-3 max-w-md text-sumi-soft">
        There is no form. There is an email address and two people who read it.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        <section className="border-[2.5px] border-sumi bg-kami-deep p-6">
          <p className="label text-sumi-soft">anything at all</p>
          <p className="mt-2 flex flex-wrap items-center gap-3 font-display text-xl">
            <a
              href={`mailto:${site.email}`}
              className="border-b-[3px] border-mikan hover:bg-momo"
            >
              {site.email}
            </a>
            <CopyEmail email={site.email} />
          </p>
          <p className="mt-4 text-sm text-sumi-soft">
            Bugs, ideas, press, business things, and photographs of your kettle.
          </p>
        </section>

        <section className="border-[2.5px] border-sumi p-6">
          <p className="label text-sumi-soft">about one specific app</p>
          <ul className="mt-3 space-y-2">
            {apps.map((app) => (
              <li key={app.slug} className="flex items-baseline justify-between gap-3 border-b border-dashed border-sumi/25 pb-2 last:border-0">
                <Link href={`/support/${app.slug}`} className="font-display font-bold hover:text-mikan">
                  {app.name}
                </Link>
                <span className="label text-sumi-soft">{app.supportEmail}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="mt-10 max-w-xl">
        <h2 className="label flex items-center gap-2 text-sumi-soft">
          <Star size={14} /> the official-looking bit
        </h2>
        {/* TODO(daniel): registered address + company number, if we register one.
            App Store and Google Play listings both want a real trader address. */}
        <p className="mt-3 text-sm text-sumi-soft">
          {site.legalEntity} — an independent software studio. Registered
          details go here once there are any. For anything that needs a postal
          address, email us and we will send it.
        </p>
      </section>

      <p className="label mt-14 flex items-center gap-3 text-sumi-soft">
        <Onigiri size={26} />
        we are usually slower than we mean to be
      </p>
    </div>
  );
}
