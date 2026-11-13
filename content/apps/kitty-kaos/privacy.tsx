import { kittyKaos } from "./app";

export const effectiveDate = "2026-11-13";

export default function KittyKaosPrivacy() {
  return (
    <>
      <p className="lede">
        Kitty Kaos is a game about stacking cats. It has no account, and the
        only thing we collect ourselves is your best score for the leaderboard
        — but it does show ads, and the ad company is a different story. Here
        is exactly what that means.
      </p>

      <h2>What we collect: Top Kittens</h2>
      <p>
        Kitty Kaos has no account, no sign-in and no analytics. The one thing
        it sends us is for Top Kittens, the worldwide leaderboard: when you
        beat your best score, the game sends that score to our server, along
        with a random ID your phone made up the first time you played. The ID
        isn&apos;t your name, your Apple or Google account, or your advertising
        identifier; it only lets the board keep one row per phone.
      </p>
      <p>
        If you make the top 100, you can add a display name, which everyone
        can see next to your score. It&apos;s up to you, and you don&apos;t
        have to add one. Names go through a word filter, and anyone can report
        a name, which we may hide or remove.
      </p>
      <p>
        The server is hosted by Vercel and the board is stored with Upstash.
        If you&apos;d like your row taken off the board, email us the name or
        score and we&apos;ll remove it. Deleting the app doesn&apos;t remove
        it.
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
        Your best score, your Lives, which cats you&apos;ve unlocked, your
        settings, and your leaderboard ID and name are saved on your phone. They&apos;re included in your device
        backup if you back up, and removed when you delete the app.
      </p>

      <h2>Purchases</h2>
      <p>
        Nine Lives and Remove Ads are bought through the App Store or Google
        Play, and Apple or Google handles the payment. We receive aggregate sales reports and
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
        something new, we&apos;ll update this page and say so in the release
        notes.
      </p>

      <h2>Asking us about it</h2>
      <p>
        Email <a href={`mailto:${kittyKaos.supportEmail}`}>{kittyKaos.supportEmail}</a>{" "}
        and a person will reply.
      </p>
    </>
  );
}
