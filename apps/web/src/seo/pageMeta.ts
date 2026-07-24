import { getThemeMeta } from "@/game/themeMeta";
import type { ThemeId } from "@/game/types";

export interface PageMeta {
  title: string;
  description: string;
  /** Site-relative path used for the canonical URL. */
  path: string;
}

export const HUB_META: PageMeta = {
  title: "Spot Odd One — Find the Odd One Out",
  description:
    "Play a free find the difference game — spot the difference picture among look-alike photos and pick the odd one out. Quick packs with emoji, monsters, cats, dogs, fairies, colors, fruits, letters, numbers, and foods.",
  path: "/",
};

export const ABOUT_META: PageMeta = {
  title: "About Spot Odd One — Free Odd One Out Game",
  description:
    "Learn about Spot Odd One, a free find the odd one out game. Tap the different picture among look-alikes across emoji, monster, cat, dog, fairy, color, fruit, letter, number, and food packs.",
  path: "/about",
};

export const PRIVACY_META: PageMeta = {
  title: "Privacy Policy — Spot Odd One",
  description:
    "Privacy Policy for Spot Odd One. Play without an account; progress and settings stay in your browser. We do not sell personal data.",
  path: "/privacy",
};

export const TERMS_META: PageMeta = {
  title: "Terms of Service — Spot Odd One",
  description:
    "Terms of Service for Spot Odd One, the free find the odd one out browser game at spotoddone.com.",
  path: "/terms",
};

const THEME_SEO: Record<
  ThemeId,
  Pick<PageMeta, "title" | "description">
> = {
  emoji: {
    title: "Spot the different emoji picture — Spot Odd One",
    description:
      "Spot the different emoji picture among look-alikes. An easy Spot Odd One pack with quick timed levels.",
  },
  monster: {
    title: "Spot the different monster picture — Spot Odd One",
    description:
      "Spot the different monster picture among look-alikes. An easy Spot Odd One pack with twists, tints, and jump-arounds.",
  },
  cat: {
    title: "Spot the different cat picture — Spot Odd One",
    description:
      "Spot the different cat picture among look-alike kitties. An easy Spot Odd One pack with timed levels.",
  },
  dog: {
    title: "Spot the different dog picture — Spot Odd One",
    description:
      "Spot the different dog picture among look-alike pups. An easy Spot Odd One pack with timed levels.",
  },
  fairy: {
    title: "Spot the different fairy picture — Spot Odd One",
    description:
      "Spot the different fairy picture — watch hair, dress, props, and tiny details. A medium Spot Odd One pack.",
  },
  color: {
    title: "Spot the different color picture — Spot Odd One",
    description:
      "Spot the different color picture among look-alike swatches — watch hue, brightness, and gradients. A medium Spot Odd One pack.",
  },
  fruit: {
    title: "Spot the different fruit picture — Spot Odd One",
    description:
      "Spot the different fruit picture among cute look-alikes — watch shape and type. A medium Spot Odd One pack.",
  },
  letter: {
    title: "Spot the different letter picture — Spot Odd One",
    description:
      "Spot the different letter picture among look-alikes like b vs d and p vs q. An easy Spot Odd One pack with timed levels.",
  },
  number: {
    title: "Spot the different number picture — Spot Odd One",
    description:
      "Spot the different number picture among look-alikes like 0 vs O and 5 vs S. An easy Spot Odd One pack with timed levels.",
  },
  food: {
    title: "Spot the different food picture — Spot Odd One",
    description:
      "Spot the different food picture among kawaii look-alike dishes — watch tiny toppings and props. A hard Spot Odd One pack.",
  },
};

export function getThemePageMeta(themeId: ThemeId): PageMeta {
  const meta = getThemeMeta(themeId);
  const seo = THEME_SEO[themeId];
  return {
    title: seo.title,
    description: seo.description,
    path: meta.path,
  };
}
