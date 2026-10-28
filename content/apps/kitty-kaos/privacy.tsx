import { kittyKaos } from "./app";

export const effectiveDate = "2026-10-15";

export default function KittyKaosPrivacy() {
  return (
    <>
      <p className="lede">
        Kitty Kaos is a game about stacking cats. It has no account and we
        don&apos;t collect anything about you ourselves — but it does show ads,
        and the ad company is a different story. Here is exactly what that
        means.
      </p>

      <h2>What we collect</h2>
      <p>
        Nothing. Kitty Kaos has no account, no sign-in and no analytics of our
        own. We don&apos;t run a server for it, and we don&apos;t know your
        name, your scores or how many cats you dropped.
      </p>

      <h2>Ads</h2>
      <p>
        The free version is paid for by ads from Google AdMob: a short ad
        between runs every few games, and an optional ad you can choose to
        watch to continue a run. To pick and count those ads, the Google Mobile
        Ads SDK collects information from your device, such as your IP address,
        device and app information, ad interactions, and diagnostic data. That
        information goes to Google, not to us. Google describes what it does
        with it in{" "}
        <a href="https://policies.google.com/technologies/partner-sites">
          How Google uses information from sites or apps that use its services
        </a>
        .
      </p>
      <p>
        <strong>Advertising identifier.</strong> On iPhone, the app asks for
        permission before using your device&apos;s advertising identifier; you
        can change your answer any time in{" "}
        <strong>Settings → Privacy &amp; Security → Tracking</strong>. On
        Android, you can reset or delete your advertising ID in{" "}
        <strong>Settings → Privacy → Ads</strong> (on some phones,{" "}
        <strong>Settings → Google → Ads</strong>). Either way, if you opt out
        you still get ads; they just aren&apos;t personalised.
      </p>
      <p>
        <strong>If you&apos;re in the UK, EEA or Switzerland,</strong> the app
        asks for your consent before personalised ads, using Google&apos;s
        consent form. You can change that choice any time in{" "}
        <strong>Settings → Privacy Options</strong> inside the game.
      </p>
      <p>
        <strong>If you&apos;re in a US state with a privacy law</strong> (such
        as California, Virginia, Colorado, Connecticut or Texas), showing you
        personalised ads may count as &ldquo;selling&rdquo; or
        &ldquo;sharing&rdquo; your personal information. You can opt out in{" "}
        <strong>Settings → Privacy Options</strong> inside the game; after
        that, Google only shows you ads that aren&apos;t personalised.
      </p>

      <h2>Data stored on your device</h2>
      <p>
        Your best score, your Lives, which cats you&apos;ve unlocked and your
        settings are saved on your phone. They&apos;re included in your device
        backup if you back up, and removed when you delete the app.
      </p>

      <h2>Purchases</h2>
      <p>
        Lives packs are bought through the App Store or Google Play, and Apple
        or Google handles the payment. We receive aggregate sales reports and
        never see your name, email address or payment details.
      </p>

      <h2>Children</h2>
      <p>
        Kitty Kaos is not directed at children under 13, and we don&apos;t
        knowingly collect personal information from them. If you believe a
        child has used the app and want to ask about it, email us.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the effective date at the top of this page
        changes with it. If a change ever means the app starts collecting
        something new, we will say so in the app before it happens.
      </p>

      <h2>Asking us about it</h2>
      <p>
        Email <a href={`mailto:${kittyKaos.supportEmail}`}>{kittyKaos.supportEmail}</a>{" "}
        and a person will reply.
      </p>
    </>
  );
}
