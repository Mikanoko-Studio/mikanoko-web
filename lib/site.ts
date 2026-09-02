/**
 * Studio-level facts. Everything here shows up in public copy, store
 * listings, or legal pages, so it needs to be true.
 *
 * TODO(daniel): confirm url, email, foundedYear and legalEntity before launch.
 */
export const site = {
  name: "Mikanoko Studio",
  nameJa: "ミカノコスタジオ",
  url: "https://mikanoko.studio",
  email: "hello@mikanoko.studio",
  foundedYear: 2025,
  /** The name that goes on App Store / Google Play listings. */
  legalEntity: "Mikanoko Studio",
  tagline: "We make small software. Some of it is useful.",
  description:
    "A small independent software studio. We make apps because we like making things.",
} as const;

export const nav = [
  { href: "/#apps", label: "apps" },
  { href: "/#who", label: "who" },
  { href: "/contact", label: "contact" },
] as const;
