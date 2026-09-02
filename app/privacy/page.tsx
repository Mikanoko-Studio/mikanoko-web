import type { Metadata } from "next";
import Link from "next/link";
import { LegalShell } from "@/components/legal/LegalShell";
import { apps } from "@/content/apps";
import { hasPrivacy } from "@/content/legal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description: `What ${site.name} does and does not collect.`,
};

/** Studio-level policy. Each app has its own — this one is about the website. */
export default function StudioPrivacyPage() {
  const withPolicies = apps.filter((app) => hasPrivacy(app.slug));

  return (
    <LegalShell
      title="Privacy policy"
      subject={site.name}
      effectiveDate="2025-11-01"
      backHref="/"
      backLabel="back to the studio"
    >
      <p className="lede">
        This page is about this website. Each app has its own policy, because
        each app does something different.
      </p>

      <h2>This website</h2>
      <p>
        This site is a set of static pages. It sets no cookies, runs no
        analytics, embeds no third-party scripts, fonts or trackers, and has no
        forms to fill in. There is nothing here that identifies you.
      </p>
      <p>
        It is hosted by Vercel, who keep short-lived server logs containing IP
        addresses for security and operational reasons. Those logs are theirs,
        not ours, and are covered by{" "}
        <a href="https://vercel.com/legal/privacy-policy" rel="noreferrer">
          Vercel&apos;s privacy policy
        </a>
        .
      </p>

      <h2>The apps</h2>
      <p>
        App privacy is handled per app, because an app that listens to your
        kettle and an app that draws a fake radar do genuinely different things:
      </p>
      <ul>
        {withPolicies.map((app) => (
          <li key={app.slug}>
            <Link href={`/privacy/${app.slug}`}>{app.name} privacy policy</Link>
          </li>
        ))}
      </ul>

      <h2>Email</h2>
      <p>
        If you email us, we keep the email so we can reply to it and remember
        the conversation later. We do not add you to a mailing list, because we
        do not have one. Ask us to delete the thread and we will.
      </p>

      <h2>Changes</h2>
      <p>
        If this changes, the effective date at the top of the page changes with
        it.
      </p>

      <h2>Asking us about it</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalShell>
  );
}
