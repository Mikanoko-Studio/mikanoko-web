import { motokitty } from "./app";

export const effectiveDate = "2026-11-10";

export default function MotoKittyPrivacy() {
  return (
    <>
      <p className="lede">
        MotoKitty has no account, no ads and no analytics. The only thing that
        leaves your phone is your score, for the world board, and it goes with
        a random ID rather than anything about you.
      </p>

      <h2>What we collect</h2>
      <p>
        When a ride ends, the game sends our server the score, how long the ride
        lasted, the road&apos;s random seed, the game&apos;s version, and a
        random ID the game made up the first time it ran. The server uses them
        to place you on the world board and to turn away scores that
        couldn&apos;t have been ridden.
      </p>
      <p>
        The ID is not your name, email address, Apple ID, Google account or
        advertising ID, and it isn&apos;t shared with anyone. It exists so each
        player has one entry on the board. We don&apos;t link any of this to
        you and don&apos;t use it to track you.
      </p>

      <h2>Initials</h2>
      <p>
        If a ride makes a top ten, the game asks for three letters to put next
        to your score. They&apos;re shown to every MotoKitty player. They
        don&apos;t have to be your real initials. If a ride doesn&apos;t make a
        top ten, nothing is asked and no initials are stored.
      </p>

      <h2>Where it&apos;s kept</h2>
      <p>
        The world board runs on this website, hosted by Vercel, with the scores
        held in a database by Upstash. Each weekly board is kept for three weeks
        and then deleted. The all-time board keeps each player&apos;s best ride
        for as long as the board runs. Vercel keeps short-lived server logs
        with IP addresses for security, covered by{" "}
        <a href="https://vercel.com/legal/privacy-policy" rel="noreferrer">
          Vercel&apos;s privacy policy
        </a>
        . We don&apos;t store IP addresses ourselves.
      </p>

      <h2>Offline</h2>
      <p>
        MotoKitty plays without a connection. Offline, nothing is sent: your
        rides count on your own board only.
      </p>

      <h2>Motion sensors</h2>
      <p>
        The game reads your phone&apos;s tilt to steer the bike. It&apos;s used
        while you ride and is never stored or sent.
      </p>

      <h2>Data stored on your device</h2>
      <p>
        Your own top ten rides, how many rides you&apos;ve had, your settings,
        the random ID and your last initials are saved on your phone. Deleting
        the app removes them.
      </p>

      <h2>Crash reports</h2>
      <p>
        If the app crashes, your phone may offer to send a crash report to
        Apple or Google, who share an anonymised version with us. You can turn
        this off in your device&apos;s own settings.
      </p>

      <h2>Children</h2>
      <p>
        MotoKitty collects no personal information from anyone, including
        children under 13. The world board holds only scores, random IDs and
        three letters.
      </p>

      <h2>Taking a score off the board</h2>
      <p>
        Deleting the app doesn&apos;t remove your entry from the world board,
        because the board can&apos;t tell which phone is yours from anything
        but that random ID. Email us the initials, the score and roughly when
        you rode it, and we&apos;ll remove it.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the effective date at the top of this page
        changes with it.
      </p>

      <h2>Asking us about it</h2>
      <p>
        Email <a href={`mailto:${motokitty.supportEmail}`}>{motokitty.supportEmail}</a>{" "}
        and a person will reply.
      </p>
    </>
  );
}
