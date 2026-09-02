import { sockRadar } from "./app";

export const effectiveDate = "2026-02-14";

export default function SockRadarPrivacy() {
  return (
    <>
      <p className="lede">
        Sock Radar points at things. It does not look at them, keep them, or
        tell us about them.
      </p>

      <h2>What we collect</h2>
      <p>
        Nothing that identifies you. There is no account, no sign-in, and no
        advertising or tracking SDK in the app on either platform.
      </p>

      <h2>The camera</h2>
      <p>
        The sweep view shows a live camera feed so the radar has something to
        draw on top of. Frames are rendered to the screen and immediately
        discarded. Nothing is recorded, saved to your photo library, or sent off
        the device. The app has no photo library permission at all.
      </p>

      <h2>Motion sensors</h2>
      <p>
        Sock Radar reads the compass and accelerometer to know which way you are
        facing while sweeping. This is used to draw the sweep and for nothing
        else. It is not stored and not transmitted.
      </p>

      <h2>Location</h2>
      <p>
        Sock Radar does not request location permission and cannot determine
        where you are. On Android, compass access is provided without location
        permission.
      </p>

      <h2>Crash reports</h2>
      <p>
        If the app crashes, your operating system may offer to send a crash
        report to Apple or Google, who share an anonymised version with us. It
        contains a stack trace and device model. We use it to fix the crash. You
        can turn this off in your device&apos;s own diagnostics settings.
      </p>

      <h2>Data stored on your device</h2>
      <p>
        Sweep volume, haptics, and your self-reported found/not-found tally are
        stored locally on the device. The tally never leaves it — the found rate
        we quote elsewhere comes from people emailing us, not from the app.
      </p>

      <h2>Purchases</h2>
      <p>
        Handled by the App Store and Google Play. We receive aggregate sales
        reports and never see your payment details.
      </p>

      <h2>Children</h2>
      <p>
        The app collects no personal information from anyone, including children
        under 13.
      </p>

      <h2>Your rights</h2>
      <p>
        Because we hold no personal data about you, there is nothing for us to
        export, correct or delete. Deleting the app removes everything Sock
        Radar has stored. If you would like that confirmed in writing, ask and
        we will send it.
      </p>

      <h2>Changes</h2>
      <p>
        Changes are reflected in the effective date at the top of this page.
      </p>

      <h2>Asking us about it</h2>
      <p>
        Email <a href={`mailto:${sockRadar.supportEmail}`}>{sockRadar.supportEmail}</a>.
      </p>
    </>
  );
}
