import { kettleWatch } from "./app";

export const effectiveDate = "2025-11-04";

export default function KettleWatchPrivacy() {
  return (
    <>
      <p className="lede">
        Kettle Watch listens to your kitchen and never tells anyone what it
        heard. Here is exactly what that means.
      </p>

      <h2>What we collect</h2>
      <p>
        Nothing. Kettle Watch has no account, no analytics, no crash reporting
        and no network requests. We do not know how many times your kettle has
        boiled, and we would like to keep it that way.
      </p>

      <h2>The microphone</h2>
      <p>
        The app needs microphone access to hear a boil. When a watch is running,
        audio is held in a short rolling buffer in memory and analysed on your
        device. It is never written to storage, never transmitted, and is
        discarded continuously as new audio replaces it. Stopping the watch, or
        leaving the app, ends the buffer.
      </p>
      <p>
        You can revoke microphone access at any time in{" "}
        <strong>Settings → Privacy &amp; Security → Microphone</strong>. Kettle
        Watch will then do nothing at all, which is a valid way to use it.
      </p>

      <h2>Notifications</h2>
      <p>
        If you allow notifications, they are scheduled and delivered locally by
        your device. No push server is involved, so no notification content
        passes through us or Apple&apos;s push infrastructure.
      </p>

      <h2>Data stored on your device</h2>
      <p>
        Your settings — sensitivity, sound choice, whether the wrist tap is on —
        are stored locally. They are included in your device backup if you back
        your device up, and are removed when you delete the app.
      </p>

      <h2>Purchases</h2>
      <p>
        Kettle Watch is a one-time purchase handled entirely by the App Store.
        We receive aggregate sales reports from Apple. We never see your name,
        email address or payment details.
      </p>

      <h2>Children</h2>
      <p>
        The app collects no personal information from anyone, including
        children under 13.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the effective date at the top of this page
        changes with it. If a change ever means the app starts collecting
        something, we will say so in the app before it happens.
      </p>

      <h2>Asking us about it</h2>
      <p>
        Email <a href={`mailto:${kettleWatch.supportEmail}`}>{kettleWatch.supportEmail}</a>{" "}
        and a person will reply.
      </p>
    </>
  );
}
