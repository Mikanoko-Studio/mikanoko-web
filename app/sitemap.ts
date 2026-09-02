import type { MetadataRoute } from "next";
import { apps } from "@/content/apps";
import { privacyDocs, termsDocs } from "@/content/legal";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${site.url}${path}`;

  return [
    { url: url("/"), priority: 1 },
    { url: url("/apps"), priority: 0.8 },
    { url: url("/contact"), priority: 0.6 },
    { url: url("/privacy"), priority: 0.4 },
    ...apps.map((app) => ({ url: url(`/apps/${app.slug}`), priority: 0.9 })),
    ...apps.map((app) => ({ url: url(`/support/${app.slug}`), priority: 0.5 })),
    ...Object.keys(privacyDocs).map((slug) => ({
      url: url(`/privacy/${slug}`),
      priority: 0.4,
    })),
    ...Object.keys(termsDocs).map((slug) => ({
      url: url(`/terms/${slug}`),
      priority: 0.4,
    })),
  ];
}
