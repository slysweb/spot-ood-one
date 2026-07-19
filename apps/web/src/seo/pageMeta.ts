import { difficultyLabel, getThemeMeta } from "@/game/themeMeta";
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
    "Pick a pack and find the one that doesn’t belong. Quick odd-one-out puzzles with emoji, monsters, cats, dogs, and fairies.",
  path: "/",
};

const THEME_SEO: Record<
  ThemeId,
  Pick<PageMeta, "title" | "description">
> = {
  emoji: {
    title: "Emoji Pack — Spot Odd One",
    description:
      "Find the emoji that doesn’t belong. An easy Spot Odd One pack with quick timed levels.",
  },
  monster: {
    title: "Monsters Pack — Spot Odd One",
    description:
      "Find the monster that doesn’t belong. An easy Spot Odd One pack with twists, tints, and jump-arounds.",
  },
  cat: {
    title: "Cats Pack — Spot Odd One",
    description:
      "Find the odd one among the cats. An easy Spot Odd One pack with look-alike kitties and timed levels.",
  },
  dog: {
    title: "Dogs Pack — Spot Odd One",
    description:
      "Find the odd one among the dogs. An easy Spot Odd One pack with look-alike pups and timed levels.",
  },
  fairy: {
    title: "Fairies Pack (Medium) — Spot Odd One",
    description:
      "Spot the fairy that doesn’t match. A medium Spot Odd One pack — watch hair, dress, props, and tiny details.",
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

/** Optional play-state title; canonical stays on the theme landing URL. */
export function getThemePlayTitle(themeId: ThemeId): string {
  const meta = getThemeMeta(themeId);
  const diff = difficultyLabel(meta.difficulty);
  return `Play ${meta.label} (${diff}) — Spot Odd One`;
}
