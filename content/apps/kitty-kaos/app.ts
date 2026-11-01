import type { Screenshot, StudioApp } from "@/types/app";

export const kittyKaos: StudioApp = {
  slug: "kitty-kaos",
  name: "Kitty Kaos",
  nameJa: "キティ・カオス",
  tagline: "Stack the cats. The cats have other plans.",
  description:
    "Cats drop from the top of the screen and you stack them as high as they will tolerate. They are soft, they are wobbly, and they do not respect engineering. When the tower comes down, a Life keeps your score and puts the survivors back where they were standing.",
  status: "soon",
  platforms: ["ios", "android"],
  accent: "#F06A8E",
  icon: "/apps/kitty-kaos/icon.png",
  supportEmail: "hello@mikanoko.studio",
  // Same order and captions as the App Store listing (catstack: store/screenshots, make captions).
  screenshots: [
    shot("01-title", "Stack the cats. They have opinions.", "The title screen: the Kitty Kaos logo, the menu, and a pile of cats spilling over the wall."),
    shot("02-tower", "How high can you stack them?", "A tower of thirteen cats on the wall, with a long calico cat swaying in to drop."),
    shot("03-butterfly", "Catch the butterfly for a free Life", "A butterfly caught above the tower: +1 Life, with a burst of petals."),
    shot("04-collapse", "Gravity always wins eventually", "The tower tipping over, the cats wide-eyed with alarm."),
    shot("05-oh-no", "One Life saves the whole stack", "Oh no! card: use a Life to save the stack, or let it fall."),
    shot("06-new-cat", "Unlock new cats as you play", "New cat! card: Pastis, a tortoiseshell, unlocked over a tall tower."),
    shot("07-cats", "Collect every hand-drawn cat", "The Cats screen: every cat on a shelf over the town, each with its name."),
  ],
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

/** One store screenshot, its iPad counterpart beside it. */
function shot(name: string, caption: string, alt: string): Screenshot {
  return {
    src: `/apps/kitty-kaos/screenshots/${name}.png`,
    alt,
    size: [1320, 2868],
    caption,
    tablet: {
      src: `/apps/kitty-kaos/screenshots/ipad/${name}.png`,
      alt: `${alt} On iPad.`,
      size: [2064, 2752],
    },
  };
}
