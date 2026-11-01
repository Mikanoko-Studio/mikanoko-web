import { kittyKaos } from "./app";

export const effectiveDate = "2026-11-01";

export default function KittyKaosTerms() {
  return (
    <>
      <p className="lede">
        Short version: Kitty Kaos is a game. Your Lives and cats live on your
        phone, the Nine Lives pack is a one-off purchase you use up, and a new
        run is always free.
      </p>

      <h2>1. Who these terms are with</h2>
      <p>
        {kittyKaos.name} is made by Mikanoko Studio LLC (&ldquo;we&rdquo;).
        These terms apply when you play it. If you got the game from the App
        Store, Apple&apos;s standard licence agreement also applies; if you got
        it from Google Play, Google Play&apos;s terms also apply.
      </p>

      <h2>2. What you may do with it</h2>
      <p>
        We grant you a personal, non-exclusive, non-transferable licence to
        play {kittyKaos.name} on devices you own or control. You may not
        redistribute it, sell it, or take it apart and ship the pieces. The
        cats are ours; please don&apos;t lift them for your own projects.
      </p>

      <h2>3. Your progress</h2>
      <p>
        Your best score, Lives, unlocked cats and settings are stored on your
        phone, not on a server of ours. If you delete the game or change
        phones, they don&apos;t come with you, and we cannot restore them
        ourselves. If that happens after you bought Lives, email us and
        we&apos;ll help.
      </p>

      <h2>4. Nine Lives</h2>
      <p>
        The Nine Lives pack is an in-app purchase that adds nine Lives to your
        balance, sold through the App Store or Google Play at the price shown
        before you buy. It is consumable: Lives are used up as you play, and
        once used they are gone. It is never needed to play: a new run is
        always free, and Lives can also be earned in the game. Lives have no
        cash value and can&apos;t be transferred or exchanged.
      </p>

      <h2>5. Refunds</h2>
      <p>
        All purchases go through Apple or Google, and their refund policies
        apply. We cannot issue refunds ourselves, but if you ask us we will
        tell you how to get one.
      </p>

      <h2>6. Ads</h2>
      <p>
        The free game shows ads from Google AdMob, described in the{" "}
        <a href={`/privacy/${kittyKaos.slug}`}>privacy policy</a>. Watching an
        ad to continue a run is always optional. We are not responsible for
        the content of ads or the sites they link to.
      </p>

      <h2>7. No warranty</h2>
      <p>
        {kittyKaos.name} is provided &ldquo;as is&rdquo;, without warranty of
        any kind, express or implied, including fitness for a particular
        purpose. We do not warrant that the game will be uninterrupted or
        error-free, or that any tower will stay standing.
      </p>

      <h2>8. Liability</h2>
      <p>
        To the fullest extent permitted by law, Mikanoko Studio LLC is not
        liable for any indirect or consequential loss arising from your use of
        the game, including lost progress. Where liability cannot be excluded,
        it is limited to what you paid us in the twelve months before the
        claim. Nothing here limits liability that cannot lawfully be limited.
        If you are a consumer, your statutory rights are unaffected.
      </p>

      <h2>9. Ending it</h2>
      <p>
        You can end this agreement at any time by deleting the game. We may
        stop distributing or updating {kittyKaos.name}; if we do, the copy you
        already have keeps working for as long as your device supports it.
      </p>

      <h2>10. Changes</h2>
      <p>
        If these terms change, the effective date above changes. Continuing to
        play after that means the new terms apply.
      </p>

      <h2>11. Law</h2>
      <p>
        These terms are governed by the laws of the State of New York, and the
        courts in New York have jurisdiction. If you live somewhere else as a
        consumer, you keep the protections of your local law.
      </p>

      <h2>12. Talking to us</h2>
      <p>
        Email{" "}
        <a href={`mailto:${kittyKaos.supportEmail}`}>
          {kittyKaos.supportEmail}
        </a>
        .
      </p>
    </>
  );
}
