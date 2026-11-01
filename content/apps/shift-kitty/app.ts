import type { StudioApp } from "@/types/app";

export const shiftKitty: StudioApp = {
  slug: "shift-kitty",
  name: "Shift Kitty",
  nameJa: "シフトキティ",
  tagline: "Tips, hours and shifts, logged in fifteen seconds.",
  description:
    "For people who work in bars, restaurants and anywhere else the money comes in tips. Log a shift on the way home — hours, tips, how the night went — and Shift Kitty works out what it really paid, tips and all, across every job you work. It shows which nights and which jobs pay best, nudges you if you forget to log, and recaps each week when it ends. Everything lives on your phone and works with no signal. Mochi the cat keeps you company.",
  status: "soon",
  platforms: ["ios", "android"],
  accent: "#E85A82",
  icon: "/apps/shift-kitty/icon.svg",
  supportEmail: "hello@mikanoko.studio",
  // Same order and captions as the App Store listing (ind: store/screenshots).
  screenshots: [
    {
      src: "/apps/shift-kitty/screenshots/01-which-night-where.png",
      alt: "Insights: best nights of the week, a heatmap of which night pays best at which job, and earnings by job.",
      caption: "Know which nights actually pay",
      pro: true,
      // One iPad shot: beside the phone on wide screens, the first thing a desktop visitor sees.
      tablet: {
        src: "/apps/shift-kitty/screenshots/ipad/01-which-night-where.png",
        alt: "The same insights on iPad: best nights, the heatmap of which night pays best at which job, and earnings by job.",
        size: [2064, 2752],
      },
    },
    {
      src: "/apps/shift-kitty/screenshots/02-month-insights.png",
      alt: "This month: $6,261 across 25 shifts at $41.67 an hour with tips, and ahead of last month.",
      caption: "Your real hourly, tips included",
    },
    {
      src: "/apps/shift-kitty/screenshots/03-tonight.png",
      alt: "Tonight: a $344 shift at The Alder, $52.92 an hour with tips, and this week's total.",
      caption: "See what tonight really made",
    },
    {
      src: "/apps/shift-kitty/screenshots/04-job.png",
      alt: "One job's month: shift pay, tips kept, tip percentage and pay per hour.",
      caption: "Every job, broken down",
    },
    {
      src: "/apps/shift-kitty/screenshots/05-log-a-shift.png",
      alt: "Logging a shift: a Great night, a note, and the total worked out as you type.",
      caption: "Hours and tips in. Real pay out.",
    },
    {
      src: "/apps/shift-kitty/screenshots/06-calendar.png",
      alt: "A month calendar with each day's earnings, coloured by job.",
      caption: "Every shift, at a glance",
    },
    {
      src: "/apps/shift-kitty/screenshots/07-year-summary.png",
      alt: "Export and year summary: CSV and JSON exports, and the year's totals with a set-aside target.",
      caption: "Your year, ready to hand over",
    },
    {
      src: "/apps/shift-kitty/screenshots/08-journal.png",
      alt: "The journal: each night's mood and note, with what it made.",
      caption: "Remember how the night went",
      pro: true,
    },
    {
      src: "/apps/shift-kitty/screenshots/09-today.png",
      alt: "Today in the afternoon, under a daytime sky.",
      caption: "Brunch shift or last call",
    },
  ],
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
