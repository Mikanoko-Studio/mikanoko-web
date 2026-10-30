import { shiftKitty } from "./app";

export const effectiveDate = "2026-10-30";

export default function ShiftKittyTerms() {
  return (
    <>
      <p className="lede">
        Short version: Shift Kitty is a record of what you worked and made. It
        is not tax or financial advice, your records live on your phone, and
        the subscriptions renew until you cancel them.
      </p>

      <h2>1. Who these terms are with</h2>
      <p>
        {shiftKitty.name} is made by Mikanoko Studio LLC (&ldquo;we&rdquo;).
        These terms apply when you use it. If you got the app from the App
        Store, Apple&apos;s standard licence agreement also applies; if you got
        it from Google Play, Google Play&apos;s terms also apply.
      </p>

      <h2>2. What you may do with it</h2>
      <p>
        We grant you a personal, non-exclusive, non-transferable licence to use{" "}
        {shiftKitty.name} on devices you own or control. You may not
        redistribute it, sell it, or take it apart and ship the pieces.
      </p>

      <h2>3. Not tax or financial advice</h2>
      <p>
        {shiftKitty.name} adds up the hours, wages and tips you enter. Its
        figures are only as accurate as what you put in. The tax set-aside is a
        percentage you choose applied to the earnings you tell it to include:
        it is not an amount owed, it does not calculate tax, and it does not
        file anything. For tax questions, ask whoever does your taxes.
      </p>

      <h2>4. Your records</h2>
      <p>
        Your shifts, tips, notes and settings are stored on your phone, not on
        a server of ours. If you delete the app or lose the phone, they go with
        it, and we cannot get them back. You can export everything to CSV or
        JSON at any time, free; we suggest doing so now and then.
      </p>

      <h2>5. Subscriptions</h2>
      <p>
        Shift Kitty Pro and Remove Ads are auto-renewing subscriptions, monthly
        or yearly, sold through the App Store or Google Play. The price and
        length of each are shown before you buy. Payment is taken by Apple or
        Google, and the subscription renews automatically at the end of each
        period unless you cancel it before then. You can cancel any time in
        your App Store or Google Play account settings; deleting the app does
        not cancel it. When a subscription ends, the features it opened close
        again, and your records stay.
      </p>

      <h2>6. Refunds</h2>
      <p>
        All purchases go through Apple or Google, and their refund policies
        apply. We cannot issue refunds ourselves, but if you ask us we will
        tell you how to get one.
      </p>

      <h2>7. Ads</h2>
      <p>
        The free version shows ads from Google AdMob, described in the{" "}
        <a href={`/privacy/${shiftKitty.slug}`}>privacy policy</a>. We are not
        responsible for the content of ads or the sites they link to.
      </p>

      <h2>8. No warranty</h2>
      <p>
        {shiftKitty.name} is provided &ldquo;as is&rdquo;, without warranty of
        any kind, express or implied, including fitness for a particular
        purpose. We do not warrant that the app will be uninterrupted,
        error-free, or that its calculations will suit your situation.
      </p>

      <h2>9. Liability</h2>
      <p>
        To the fullest extent permitted by law, Mikanoko Studio LLC is not
        liable for any indirect or consequential loss arising from your use of
        the app, including tax penalties or lost records. Where liability
        cannot be excluded, it is limited to what you paid for the app in the
        twelve months before the claim. Nothing here limits liability that
        cannot lawfully be limited. If you are a consumer, your statutory
        rights are unaffected.
      </p>

      <h2>10. Ending it</h2>
      <p>
        You can end this agreement at any time by deleting the app and
        cancelling any subscription. We may stop distributing or updating{" "}
        {shiftKitty.name}; if we do, the copy you already have keeps working
        for as long as your device supports it.
      </p>

      <h2>11. Changes</h2>
      <p>
        If these terms change, the effective date above changes. Continuing to
        use the app after that means the new terms apply.
      </p>

      <h2>12. Law</h2>
      <p>
        These terms are governed by the laws of the State of New York, and the
        courts in New York have jurisdiction. If you live somewhere else as a
        consumer, you keep the protections of your local law.
      </p>

      <h2>13. Talking to us</h2>
      <p>
        Email{" "}
        <a href={`mailto:${shiftKitty.supportEmail}`}>
          {shiftKitty.supportEmail}
        </a>
        .
      </p>
    </>
  );
}
