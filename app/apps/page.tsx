import type { Metadata } from "next";
import { AppCard } from "@/components/app/AppCard";
import { apps } from "@/content/apps";

export const metadata: Metadata = {
  title: "Apps",
  description: "Everything Mikanoko Studio has made, and one thing it hasn't.",
};

export default function AppsPage() {
  return (
    <div className="wrap py-12 sm:py-16">
      <h1 className="font-display text-3xl font-black sm:text-4xl">
        everything we made
      </h1>
      <p className="mt-3 max-w-md text-sumi-soft">
        Small apps, one job each. No accounts, no subscriptions unless we say so
        very loudly.
      </p>

      <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <AppCard key={app.slug} app={app} />
        ))}
      </ul>
    </div>
  );
}
