import { shiftKitty } from "./app";

export const effectiveDate = "2026-10-29";

export default function ShiftKittyPrivacy() {
  return (
    <>
      <p className="lede">
        Shift Kitty holds your income, so we built it to keep that to itself.
        There is no account, your shifts never leave your phone unless you send
        them somewhere, and the ads are never personalised. Here is exactly
        what that means.
      </p>

      <h2>What we collect</h2>
      <p>
        Nothing about your work. Your shifts, tips, hours, expenses, jobs and
        notes are stored on your phone only. We don&apos;t run a server that
        holds them, we have no analytics of our own, and we never see your
        earnings.
      </p>
      <p>
        <strong>Crash reports.</strong> Shift Kitty has no crash reporting of
        its own. If you&apos;ve chosen to share analytics with app developers
        in your phone&apos;s settings, Apple or Google may pass us a report
        when the app crashes — technical details such as the device model,
        operating system, app version and where in the code it happened. None
        of your shifts, earnings or notes are in it.
      </p>

      <h2>Ads</h2>
      <p>
        The free version is paid for by ads from Google AdMob: an occasional
        full-screen ad between screens, and an optional ad you can choose to
        watch to unlock a feature for a while. Ads never appear while you log a
        shift. To show and count those ads, the Google Mobile Ads SDK collects
        information from your device, such as your IP address, device and app
        information, ad interactions, and diagnostic data. That information
        goes to Google, not to us. Google describes what it does with it in{" "}
        <a href="https://policies.google.com/technologies/partner-sites">
          How Google uses information from sites or apps that use its services
        </a>
        .
      </p>
      <p>
        <strong>The ads are never personalised.</strong> Shift Kitty asks Google
        for non-personalised ads only, and it never asks to track you across
        other apps, so it does not use your device&apos;s advertising
        identifier. It also switches off Google&apos;s optional
        &ldquo;publisher first-party ID&rdquo;, an identifier Google would
        otherwise keep for this app to make its ads more relevant. Nothing
        about your shifts or earnings is ever shared with Google or anyone
        else.
      </p>
      <p>
        <strong>If you&apos;re in the UK, EEA or Switzerland,</strong> the app
        asks for your consent using Google&apos;s consent form before showing
        ads. If you&apos;re in a US state with a privacy law (such as
        California, Virginia, Colorado, Connecticut or Texas), you can opt out
        of any &ldquo;sale&rdquo; or &ldquo;sharing&rdquo; of personal
        information. Either choice can be changed any time in{" "}
        <strong>More → Privacy choices</strong> inside the app.
      </p>
      <p>
        Removing ads, or buying Pro, turns ads off completely.
      </p>

      <h2>Data stored on your device</h2>
      <p>
        Everything you enter is saved on your phone. It&apos;s included in your
        device backup if you back up, and removed when you delete the app.
        When you export your shifts or a year summary, the app makes a file and
        hands it to whatever you choose — Files, Mail, Messages — and from then
        on it&apos;s yours; we never see it.
      </p>

      <h2>Reminders</h2>
      <p>
        If you turn on a reminder — the nudge to log a shift, the weekly recap,
        or quarterly tax reminders — Shift Kitty schedules it on your phone,
        and your phone delivers it. Nothing about your reminders is sent to us
        or to anyone else. The weekly recap shows last week&apos;s total, so it
        can appear on your lock screen; you can turn it off in the app, or hide
        notification previews in your phone&apos;s settings.
      </p>

      <h2>Purchases</h2>
      <p>
        Pro and ad removal are bought through the App Store, and Apple handles
        the payment. We receive aggregate sales reports and never see your
        name, email address or payment details.
      </p>

      <h2>Children</h2>
      <p>
        Shift Kitty is for adults who work, and is not directed at children
        under 13. We don&apos;t knowingly collect personal information from
        them. If you believe a child has used the app and want to ask about it,
        email us.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the effective date at the top of this page
        changes with it. If a change ever means the app starts collecting
        something new — for example, an optional backup to the cloud — we will
        say so in the app before it happens, and it will be your choice.
      </p>

      <h2>Asking us about it</h2>
      <p>
        Email <a href={`mailto:${shiftKitty.supportEmail}`}>{shiftKitty.supportEmail}</a>{" "}
        and a person will reply.
      </p>
    </>
  );
}
