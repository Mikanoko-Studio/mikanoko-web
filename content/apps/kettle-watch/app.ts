import type { StudioApp } from "@/types/app";

export const kettleWatch: StudioApp = {
  slug: "kettle-watch",
  name: "Kettle Watch",
  nameJa: "やかん",
  tagline: "Tells you when the water boiled. That's it.",
  description:
    "You put the kettle on. You walk away. You forget. Kettle Watch listens for the boil and taps your wrist. It does not have a timer, a streak, a subscription or an opinion about your hydration.",
  status: "live",
  platforms: ["ios"],
  accent: "#8FBEDC",
  icon: "/apps/kettle-watch/icon.svg",
  // PLACEHOLDER: fictional app, fake store id. Replace on first real release.
  appStoreUrl: "https://apps.apple.com/app/id000000000",
  supportEmail: "kettle@mikanoko.studio",
  releasedAt: "2025-11-04",
  facts: [
    "Listens with the microphone. Nothing leaves your phone.",
    "Works with electric kettles, stovetop kettles, and one specific saucepan.",
    "Has been wrong twice. Both times it was a shower.",
  ],
  support: [
    {
      q: "It didn't hear my kettle.",
      a: "Put the phone within about two metres of the kettle and make sure microphone access is on. Very quiet kettles genuinely defeat it — email us and we'll add yours.",
    },
    {
      q: "Does it record me?",
      a: "No. Audio is analysed on the device in a rolling buffer and never written to disk or sent anywhere.",
    },
    {
      q: "Can it do eggs?",
      a: "No.",
    },
  ],
};
