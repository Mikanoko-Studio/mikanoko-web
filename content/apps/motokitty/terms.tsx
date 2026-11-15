import { motokitty } from "./app";

export const effectiveDate = "2026-11-15";

export default function MotoKittyTerms() {
  return (
    <>
      <p className="lede">
        Short version: MOTOKITTY is a game. Ride it, crash it, ride it again.
        Your rides live on your phone, your best one goes on the world board,
        and Remove Ads is one payment that lasts for good.
      </p>

      <h2>1. Who these terms are with</h2>
      <p>
        {motokitty.name} is made by Mikanoko Studio LLC (&ldquo;we&rdquo;).
        These terms apply when you play it. If you got the game from the App
        Store, Apple&apos;s standard licence agreement also applies; if you got
        it from Google Play, Google Play&apos;s terms also apply.
      </p>

      <h2>2. What you may do with it</h2>
      <p>
        We grant you a personal, non-exclusive, non-transferable licence to
        play {motokitty.name} on devices you own or control. You may not
        redistribute it, sell it, or take it apart and ship the pieces. Mochi,
        the bike, the desert and the soundtrack are ours; please don&apos;t lift
        them for your own projects.
      </p>

      <h2>3. Ride somewhere safe</h2>
      <p>
        You steer by tilting your phone. Play sitting or standing still, with
        room around you, and never while you&apos;re driving, riding or crossing
        a road. The bike in the game has no brakes. You should.
      </p>

      <h2>4. Your rides</h2>
      <p>
        Your own top ten, your settings and your initials are stored on your
        phone, not on a server of ours. If you delete the game or change
        phones, they don&apos;t come with you, and we can&apos;t restore them.
      </p>

      <h2>5. The world board</h2>
      <p>
        Your best ride goes on the world board, shared by every iPhone and
        Android player, with the three letters you pick. Pick letters you&apos;d
        be happy for anyone to see: the server turns away offensive ones, and
        we remove any that slip through. Rides that couldn&apos;t have been
        ridden don&apos;t count, and we may take off any score we believe was
        cheated. We may reset the board, change how it works, or switch it
        off. A place on it is bragging rights, not a prize: it has no cash
        value.
      </p>

      <h2>6. Remove Ads</h2>
      <p>
        Remove Ads is an in-app purchase sold through the App Store or Google
        Play at the price shown before you buy. It stops the ads between rides
        for good on the Apple or Google account you bought it with, and
        nothing else changes. On a new phone or after a reinstall, RESTORE
        PURCHASES under REMOVE ADS in Settings brings it back. It is never
        needed to play, and it can&apos;t be transferred or exchanged.
      </p>

      <h2>7. Refunds</h2>
      <p>
        All purchases go through Apple or Google, and their refund policies
        apply. We can&apos;t issue refunds ourselves, but if you ask us
        we&apos;ll tell you how to get one. A refunded Remove Ads is taken
        away again.
      </p>

      <h2>8. Ads</h2>
      <p>
        The free game shows an ad from Google AdMob between some rides, never
        while you ride, as described in the{" "}
        <a href={`/privacy/${motokitty.slug}`}>privacy policy</a>. We
        aren&apos;t responsible for the content of ads or the sites they link
        to.
      </p>

      <h2>9. No warranty</h2>
      <p>
        {motokitty.name} is provided &ldquo;as is&rdquo;, without warranty of
        any kind, express or implied, including fitness for a particular
        purpose. We don&apos;t warrant that the game will be uninterrupted or
        error-free, that the world board will always be reachable, or that you
        will keep up.
      </p>

      <h2>10. Liability</h2>
      <p>
        To the fullest extent permitted by law, Mikanoko Studio LLC is not
        liable for any indirect or consequential loss arising from your use of
        the game, including lost rides or a lost place on the board. Where
        liability can&apos;t be excluded, it is limited to what you paid us in
        the twelve months before the claim. Nothing here limits liability that
        can&apos;t lawfully be limited. If you are a consumer, your statutory
        rights are unaffected.
      </p>

      <h2>11. Ending it</h2>
      <p>
        You can end this agreement at any time by deleting the game. We may
        stop distributing or updating {motokitty.name}; if we do, the copy you
        already have keeps working for as long as your device supports it,
        though the world board may not.
      </p>

      <h2>12. Changes</h2>
      <p>
        If these terms change, the effective date above changes. Riding on
        after that means the new terms apply.
      </p>

      <h2>13. Law</h2>
      <p>
        These terms are governed by the laws of the State of New York, and the
        courts in New York have jurisdiction. If you live somewhere else as a
        consumer, you keep the protections of your local law.
      </p>

      <h2>14. Talking to us</h2>
      <p>
        Email{" "}
        <a href={`mailto:${motokitty.supportEmail}`}>
          {motokitty.supportEmail}
        </a>{" "}
        and a person will reply.
      </p>
    </>
  );
}
