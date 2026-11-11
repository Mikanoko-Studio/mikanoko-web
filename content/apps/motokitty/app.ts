import type { StudioApp } from "@/types/app";

export const motokitty: StudioApp = {
  slug: "motokitty",
  name: "MOTOKITTY",
  nameJa: "モトキティ",
  tagline: "KEEP UP OR EXPLODE. THOSE ARE THE OPTIONS.",
  description:
    "An arcade biker game. Mochi rides a desert at dusk, flat out, to a loud, dirty rock 'n' roll soundtrack. Hold anywhere to open the throttle. Tilt to turn. Fall off the back of the screen or run off the front, and it's over. One life. One score. Nobody has asked Mochi to slow down, and nobody is going to.",
  status: "soon",
  platforms: ["ios", "android"],
  accent: "#BD5926",
  icon: "/apps/motokitty/icon.png",
  // Not out yet: no store links until it ships.
  supportEmail: "hello@mikanoko.studio",
  facts: [
    "The road moves three screen widths a second from the very first second. It never speeds up. The road just gets meaner.",
    "Your score is how far you got. That's the whole system.",
    "The explosion was turned up twice. It could still be louder.",
  ],
  support: [
    {
      q: "Which way do I tilt?",
      a: "Rock the phone towards you and away from you. Don't twist it. Tilt is measured from however you're holding it when the ride starts. TILT SENSITIVITY and INVERT STEERING are in Settings.",
    },
    {
      q: "I keep exploding.",
      a: "That's the ride. Let off the throttle before you hit the front of the screen, and stay off the sand.",
    },
    {
      q: "The world board says OFFLINE.",
      a: "We couldn't reach the server. Your rides still count on your own board.",
    },
    {
      q: "I bought Remove Ads. Why am I seeing ads?",
      a: "Your phone doesn't know about it yet, which happens on a new phone or after a reinstall. Go to Settings, tap REMOVE ADS, then RESTORE PURCHASES, signed in to the same Apple or Google account you bought it with.",
    },
    {
      q: "Can you take my score off the world board?",
      a: "Yes. Email us the initials, the score and roughly when you rode it, and we'll remove it.",
    },
  ],
};
