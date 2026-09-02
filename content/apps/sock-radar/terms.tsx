import { sockRadar } from "./app";

export const effectiveDate = "2026-02-14";

export default function SockRadarTerms() {
  return (
    <>
      <p className="lede">
        Short version: Sock Radar is a toy. Do not rely on it for anything that
        matters.
      </p>

      <h2>1. The radar is not a radar</h2>
      <p>
        Sock Radar does not detect socks, textiles, objects, people, or anything
        else. The direction it gives you is not a measurement and is not based
        on any sensing of the item you are looking for. The app is sold and
        described as a novelty, and we state this plainly inside the app on
        first launch.
      </p>

      <h2>2. What you may do with it</h2>
      <p>
        We grant you a personal, non-exclusive, non-transferable licence to use
        Sock Radar on devices you own or control, on the terms of the App Store
        or Google Play, whichever you got it from. You may not redistribute it,
        sell it, or take it apart and ship the pieces.
      </p>

      <h2>3. Using it sensibly</h2>
      <p>
        The sweep view shows a live camera feed and encourages you to walk
        around. Look where you are going. Do not use Sock Radar while driving,
        cycling, on stairs, near water, or anywhere a distracted step is a bad
        idea.
      </p>

      <h2>4. No warranty</h2>
      <p>
        Sock Radar is provided &ldquo;as is&rdquo;, without warranty of any
        kind, express or implied, including fitness for a particular purpose —
        and finding a sock is a particular purpose. We do not warrant that the
        app will be uninterrupted, error-free, or correct about anything.
      </p>

      <h2>5. Liability</h2>
      <p>
        To the fullest extent permitted by law, {sockRadar.name} and Mikanoko
        Studio are not liable for any indirect or consequential loss arising
        from your use of the app. Where liability cannot be excluded, it is
        limited to the amount you paid for the app. Nothing here limits
        liability for death or personal injury caused by negligence, for fraud,
        or for anything else that cannot lawfully be limited. If you are a
        consumer, your statutory rights are unaffected.
      </p>

      <h2>6. Purchases and refunds</h2>
      <p>
        All purchases go through Apple or Google, and their refund policies
        apply. We cannot issue refunds ourselves, but if you ask us we will tell
        you how to get one.
      </p>

      <h2>7. Ending it</h2>
      <p>
        You can end this agreement at any time by deleting the app. We may stop
        distributing or updating Sock Radar at any point; if we do, the copy you
        already have keeps working for as long as your device supports it.
      </p>

      <h2>8. Changes</h2>
      <p>
        If these terms change, the effective date above changes. Continuing to
        use the app after that means the new terms apply.
      </p>

      <h2>9. Law</h2>
      <p>
        These terms are governed by the laws of England and Wales, and the
        courts there have jurisdiction. If you live somewhere else as a
        consumer, you keep the protections of your local law.
      </p>

      <h2>10. Talking to us</h2>
      <p>
        Email <a href={`mailto:${sockRadar.supportEmail}`}>{sockRadar.supportEmail}</a>.
      </p>
    </>
  );
}
