import type { ComponentType } from "react";

/**
 * Legal documents are hand-written per app, not generated from a template —
 * what each app collects genuinely differs, and a shared template would
 * quietly start lying the moment two apps disagree.
 *
 * A route only exists for a slug that appears in one of these maps, so an
 * app without terms simply has no /terms/<slug> page.
 */
export type LegalModule = {
  default: ComponentType;
  /** ISO date. Shown in the page chrome and used for sitemap lastModified. */
  effectiveDate: string;
};

export const privacyDocs = {
  "kettle-watch": () => import("./apps/kettle-watch/privacy"),
  "sock-radar": () => import("./apps/sock-radar/privacy"),
} satisfies Record<string, () => Promise<LegalModule>>;

export const termsDocs = {
  "sock-radar": () => import("./apps/sock-radar/terms"),
} satisfies Record<string, () => Promise<LegalModule>>;

export type PrivacySlug = keyof typeof privacyDocs;
export type TermsSlug = keyof typeof termsDocs;

export function hasPrivacy(slug: string): slug is PrivacySlug {
  return slug in privacyDocs;
}

export function hasTerms(slug: string): slug is TermsSlug {
  return slug in termsDocs;
}
