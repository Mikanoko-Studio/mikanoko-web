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

/** True when there is anywhere at all to go and get the app. */
export function isDownloadable(app: StudioApp): boolean {
  return Boolean(app.appStoreUrl || app.playStoreUrl || app.websiteUrl);
}
