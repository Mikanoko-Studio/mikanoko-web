/**
 * The shape of everything we ship. One entry per app in `content/apps`.
 * Adding an app means adding a folder there — never a new route.
 */

export type Platform = "ios" | "android" | "web" | "mac";

/**
 * `live` — you can go get it.
 * `soon` — exists, not out yet.
 * `resting` — was out, isn't any more. Pages stay up; stores may not.
 */
export type AppStatus = "live" | "soon" | "resting";

export type Screenshot = {
  src: string;
  alt: string;
};

export type SupportQuestion = {
  q: string;
  a: string;
};

export type StudioApp = {
  /** URL segment. Lowercase, hyphenated, never changes once shipped. */
  slug: string;
  name: string;
  /** Decorative. Sits under the name on the app page. */
  nameJa?: string;
  /** One line. Shows on the studio homepage card. Keep it under ~60 chars. */
  tagline: string;
  /** A short paragraph or two for the app's own page. */
  description: string;
  status: AppStatus;
  platforms: Platform[];
  /** Spot colour for this app. Used sparingly — card edge, page accent. */
  accent: string;
  /** `/apps/<slug>/icon.png`. Falls back to a drawn placeholder. */
  icon?: string;
  screenshots?: Screenshot[];
  appStoreUrl?: string;
  playStoreUrl?: string;
  /** Only if the app has a site of its own. Most won't. */
  websiteUrl?: string;
  supportEmail: string;
  /** Optional pre-answered questions on /support/<slug>. */
  support?: SupportQuestion[];
  /** Odd true facts. Printed as a list. Not marketing. */
  facts?: string[];
  /** ISO date, or undefined if it isn't out. */
  releasedAt?: string;
};
