import type { StudioApp } from "@/types/app";

export const kittyKaos: StudioApp = {
  slug: "kitty-kaos",
  name: "Kitty Kaos",
  nameJa: "ねこカオス",
  tagline: "Stack the cats. The cats have other plans.",
  description:
    "Cats drop from the top of the screen and you stack them as high as they will tolerate. They are soft, they are wobbly, and they do not respect engineering. When the tower comes down, a Life keeps your score and puts the survivors back where they were standing.",
  status: "soon",
  platforms: ["ios", "android"],
  accent: "#F06A8E",
  icon: "/apps/kitty-kaos/icon.svg",
  supportEmail: "hello@mikanoko.studio",
  facts: [
    "Every cat is drawn by hand. Nobody has agreed which one is the best.",
    "A new run is always free. Lives only ever save a run you're already in.",
    "Sometimes a butterfly goes past. Catching it is worth a Life.",
  ],
  support: [
    {
      q: "I lost my Lives when I changed phones.",
      a: "Scores and Lives are saved on your phone only, so a new phone starts fresh. Email us with what you had and we'll sort it out.",
    },
    {
      q: "Can I turn the ads off?",
      a: "Ads only play between runs every so often, or when you choose to watch one to continue. Buying a Nine Lives pack doesn't remove them yet — that's on the list.",
    },
    {
      q: "The tower fell over and it wasn't my fault.",
      a: "It was the cats. We're always tuning how they land — tell us what happened and we'll have a look.",
    },
  ],
};
