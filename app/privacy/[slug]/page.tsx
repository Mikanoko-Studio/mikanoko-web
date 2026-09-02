import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegalShell } from "@/components/legal/LegalShell";
import { hasPrivacy, privacyDocs } from "@/content/legal";
import { getApp } from "@/lib/apps";

export function generateStaticParams() {
  return Object.keys(privacyDocs).map((slug) => ({ slug }));
}

export async function generateMetadata(
  props: PageProps<"/privacy/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const app = getApp(slug);
  if (!app) return {};

  return {
    title: `${app.name} privacy policy`,
    description: `What ${app.name} does and does not collect.`,
  };
}

export default async function AppPrivacyPage(props: PageProps<"/privacy/[slug]">) {
  const { slug } = await props.params;
  const app = getApp(slug);
  if (!app || !hasPrivacy(slug)) notFound();

  const { default: Document, effectiveDate } = await privacyDocs[slug]();

  return (
    <LegalShell
      title="Privacy policy"
      subject={app.name}
      effectiveDate={effectiveDate}
      backHref={`/apps/${app.slug}`}
      backLabel={app.name}
    >
      <Document />
    </LegalShell>
  );
}
