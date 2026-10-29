import type { StudioApp } from "@/types/app";

export const shiftKitty: StudioApp = {
  slug: "shift-kitty",
  name: "Shift Kitty",
  nameJa: "シフトキティ",
  tagline: "Tips, hours and shifts, logged in ten seconds.",
  description:
    "For people who work in bars, restaurants and anywhere else the money comes in tips. Log a shift on the way home — hours, tips, how the night went — and Shift Kitty keeps the running totals across every job you work. Everything lives on your phone and works with no signal. Mochi the cat keeps you company.",
  status: "soon",
  platforms: ["ios"],
  accent: "#E85A82",
  icon: "/apps/shift-kitty/icon.svg",
  supportEmail: "hello@mikanoko.studio",
  facts: [
    "Logging a shift never shows an ad. Not before, not during, not after.",
    "It works in a basement bar at 2am with no signal.",
    "Mochi has five faces, one for every kind of night.",
  ],
  support: [
    {
      q: "Where is my data kept?",
      a: "On your phone. Shift Kitty has no account and no server of ours holding your shifts. You can export everything as a spreadsheet or a file any time, from More → Export & year summary.",
    },
    {
      q: "I got a new phone and my shifts are gone.",
      a: "Shifts are saved on your phone, and they move with an iCloud or device backup. If you exported a file before switching, it has everything. Email us and we'll help.",
    },
    {
      q: "Is this a tax app?",
      a: "No. Shift Kitty can suggest how much to set aside for tax, but it isn't tax advice and it doesn't file anything. Your export is something to hand to whoever does your taxes.",
    },
  ],
};
