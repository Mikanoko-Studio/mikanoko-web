import type { StudioApp } from "@/types/app";

export const sockRadar: StudioApp = {
  slug: "sock-radar",
  name: "Sock Radar",
  nameJa: "くつした探知機",
  tagline: "It cannot actually find your sock. It tries.",
  description:
    "Point your phone at a room. Sock Radar sweeps, beeps, and confidently announces a direction. It is not detecting anything. You will still find the sock, because you looked. We consider this a success.",
  status: "soon",
  platforms: ["ios", "android"],
  accent: "#EFA3B6",
  icon: "/apps/sock-radar/icon.svg",
  // Not built yet: no store links until it ships.
  supportEmail: "socks@mikanoko.studio",
  facts: [
    "The beep was recorded in a stairwell.",
    "There is no radar.",
    "Found rate, self-reported: 61%.",
  ],
  support: [
    {
      q: "Is the radar real?",
      a: "No. Sock Radar has no way of knowing where your sock is. It picks a direction and commits.",
    },
    {
      q: "Then why does it work?",
      a: "Because you get up and look in a direction you hadn't looked in yet. We're being honest about this on purpose.",
    },
    {
      q: "The beep is too loud.",
      a: "Settings → Sweep → Volume. It starts loud because the first version was for a very large house.",
    },
  ],
};
