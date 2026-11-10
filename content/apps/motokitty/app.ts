import type { StudioApp } from "@/types/app";

export const motokitty: StudioApp = {
  slug: "motokitty",
  name: "MotoKitty",
  nameJa: "モトキティ",
  tagline: "The road won't wait. Keep up, or explode.",
  description:
    "An arcade biker game. Mochi rides across a desert at dusk, flat out, to a psych-rock soundtrack. Hold anywhere to open the throttle and tilt your phone to turn. Fall off the back of the screen, or run off the front, and it's over. One life, one score: how far you got.",
  status: "soon",
  platforms: ["ios", "android"],
  accent: "#BD5926",
  icon: "/apps/motokitty/icon.png",
  // Not out yet: no store links until it ships.
  supportEmail: "hello@mikanoko.studio",
  support: [
    {
      q: "Which way do I tilt?",
      a: "Tilt the phone towards you or away from you, like rocking it back and forth. Tilt is measured from however you're holding it when the ride starts, so hold it the way that's comfortable. Settings has TILT SENSITIVITY and INVERT STEERING if it feels wrong.",
    },
    {
      q: "The world board says OFFLINE.",
      a: "The game couldn't reach our server. Rides still count on your own board, and the world board comes back once you're online again.",
    },
    {
      q: "Can you take my score off the world board?",
      a: "Yes. Email us the initials, the score and roughly when you rode it, and we'll remove it.",
    },
  ],
};
