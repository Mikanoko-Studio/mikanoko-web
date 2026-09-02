import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalShell } from "@/components/legal/LegalShell";
import { hasTerms, termsDocs } from "@/content/legal";
import { getApp } from "@/lib/apps";

export function generateStaticParams() {
  return Object.keys(termsDocs).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/terms/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const app = getApp(slug);
  if (!app) return {};

  return {
    title: `${app.name} terms`,
    description: `The terms you agree to by using ${app.name}.`,
  };
}

export default async function AppTermsPage(props: PageProps<"/terms/[slug]">) {
  const { slug } = await props.params;
  const app = getApp(slug);
  if (!app || !hasTerms(slug)) notFound();

  const { default: Document, effectiveDate } = await termsDocs[slug]();

  return (
    <LegalShell
      title="Terms of use"
      subject={app.name}
      effectiveDate={effectiveDate}
      backHref={`/apps/${app.slug}`}
      backLabel={app.name}
    >
      <Document />
    </LegalShell>
  );
}
