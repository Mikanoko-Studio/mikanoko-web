import { apps } from "@/content/apps";
import type { Platform, StudioApp } from "@/types/app";

export function getApp(slug: string): StudioApp | undefined {
  return apps.find((app) => app.slug === slug);
}

export function appSlugs(): string[] {
  return apps.map((app) => app.slug);
}

export const platformLabel: Record<Platform, string> = {
  ios: "iPhone",
  android: "Android",
  web: "Web",
  mac: "Mac",
};

export const statusLabel: Record<StudioApp["status"], string> = {
  live: "out now",
  soon: "not out yet",
  resting: "resting",
};

/** Where to get this platform's copy, if anywhere yet. */
export function storeUrlFor(app: StudioApp, platform: Platform): string | undefined {
  if (platform === "android") return app.playStoreUrl;
  if (platform === "web") return app.websiteUrl;
  return app.appStoreUrl;
}

/** True when there is somewhere to get this platform's copy. */
export function isOutOn(app: StudioApp, platform: Platform): boolean {
  return Boolean(storeUrlFor(app, platform));
}

/**
 * The status, said truthfully: a live app that is only out on some of its platforms says which,
 * so "out now" never promises an iPhone app that is still in review.
 */
export function availabilityLabel(app: StudioApp): string {
  if (app.status !== "live") return statusLabel[app.status];
  const out = app.platforms.filter((platform) => isOutOn(app, platform));
  if (out.length === 0 || out.length === app.platforms.length) return statusLabel.live;
  return `${statusLabel.live} on ${out.map((platform) => platformLabel[platform]).join(" & ")}`;
}

/** True when there is anywhere at all to go and get the app. */
export function isDownloadable(app: StudioApp): boolean {
  return Boolean(app.appStoreUrl || app.playStoreUrl || app.websiteUrl);
}
