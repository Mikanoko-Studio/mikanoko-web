import Link from "next/link";
import type { ReactNode } from "react";
import { site } from "@/lib/site";

type LegalShellProps = {
  title: string;
  /** What the document is about — an app name, or the studio itself. */
  subject: string;
  effectiveDate: string;
  /** Where to go back to. */
  backHref: string;
  backLabel: string;
  children: ReactNode;
};

const dateFormat = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Chrome only. The words inside are written per app and never generated —
 * see content/legal.ts.
 */
export function LegalShell({
  title,
  subject,
  effectiveDate,
  backHref,
  backLabel,
  children,
}: LegalShellProps) {
  return (
    <article className="wrap py-14 sm:py-20">
      <Link href={backHref} className="label text-sumi-soft hover:text-mikan">
        ← {backLabel}
      </Link>

      <header className="mt-6 border-b-2 border-sumi/15 pb-6">
        <p className="label text-mikan">{subject}</p>
        <h1 className="mt-2 font-display text-3xl font-black sm:text-4xl">{title}</h1>
        <p className="label mt-4 text-sumi-soft">
          in effect since {dateFormat.format(new Date(effectiveDate))}
        </p>
      </header>

      <div className="prose-ink mt-8">{children}</div>

      <footer className="prose-ink mt-14 border-t-2 border-sumi/15 pt-6">
        <p className="label text-sumi-soft">
          {site.legalEntity} · <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </footer>
    </article>
  );
}
