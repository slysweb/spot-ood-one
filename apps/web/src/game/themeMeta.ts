import type { PackDifficulty, ThemeId } from "./types";

export interface ThemeMeta {
  id: ThemeId;
  path: string;
  label: string;
  eyebrow: string;
  headline: string;
  tagline: string;
  findLine: string;
  tutorialBody: string;
  difficulty: PackDifficulty;
}

export const THEMES: ThemeMeta[] = [
  {
    id: "emoji",
    path: "/emoji",
    label: "Emoji",
    eyebrow: "Emoji pack",
    headline: "Emoji",
    tagline: "Find the different emoji.",
    findLine: "Find the different emoji.",
    tutorialBody:
      "Tap the emoji that doesn’t match the rest. You have 10 seconds.",
    difficulty: "easy",
  },
  {
    id: "monster",
    path: "/monster",
    label: "Monsters",
    eyebrow: "Monster pack",
    headline: "Monsters",
    tagline: "Find the different monster.",
    findLine: "Find the different monster.",
    tutorialBody:
      "Tap the monster that doesn’t match the rest. Later levels twist, tint, and even jump around. You have 10 seconds.",
    difficulty: "easy",
  },
  {
    id: "cat",
    path: "/cat",
    label: "Cats",
    eyebrow: "Cat pack",
    headline: "Cats",
    tagline: "Find the different cat.",
    findLine: "Find the different cat.",
    tutorialBody:
      "Tap the one that doesn’t belong. Early levels hide another animal among cute cats; later levels use look-alike kitties, tints, bells, and jump-arounds. You have 10 seconds.",
    difficulty: "easy",
  },
  {
    id: "dog",
    path: "/dog",
    label: "Dogs",
    eyebrow: "Dog pack",
    headline: "Dogs",
    tagline: "Find the different dog.",
    findLine: "Find the different dog.",
    tutorialBody:
      "Tap the one that doesn’t belong. Early levels hide another animal among cute dogs; later levels use look-alike pups, tints, collars, and jump-arounds. You have 10 seconds.",
    difficulty: "easy",
  },
  {
    id: "fairy",
    path: "/fairy",
    label: "Fairies",
    eyebrow: "Fairy pack · Medium",
    headline: "Fairies",
    tagline: "Find the different fairy.",
    findLine: "Find the different fairy.",
    tutorialBody:
      "Tap the fairy that doesn’t belong. Early levels look clearly different; later levels change hair, dress, props, or tiny details — and some jump around. You have 10 seconds.",
    difficulty: "medium",
  },
  {
    id: "color",
    path: "/color",
    label: "Colors",
    eyebrow: "Color pack · Medium",
    headline: "Colors",
    tagline: "Find the different color.",
    findLine: "Find the different color.",
    tutorialBody:
      "Tap the color that doesn’t belong. Early levels use clear hue changes; later levels shift brightness, saturation, or gradients — and some jump around. You have 10 seconds.",
    difficulty: "medium",
  },
  {
    id: "fruit",
    path: "/fruit",
    label: "Fruits",
    eyebrow: "Fruit pack · Medium",
    headline: "Fruits",
    tagline: "Find the different fruit.",
    findLine: "Find the different fruit.",
    tutorialBody:
      "Tap the fruit that doesn’t belong. Early levels hide a different kind of fruit; later levels use look-alikes like lemon vs lime — and some jump around. You have 10 seconds.",
    difficulty: "medium",
  },
];

const DIFFICULTY_LABEL: Record<PackDifficulty, string> = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
};

export function difficultyLabel(d: PackDifficulty): string {
  return DIFFICULTY_LABEL[d];
}

export function getThemeMeta(id: ThemeId): ThemeMeta {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

export function isThemeId(value: string | undefined): value is ThemeId {
  return (
    value === "emoji" ||
    value === "monster" ||
    value === "cat" ||
    value === "dog" ||
    value === "fairy" ||
    value === "color" ||
    value === "fruit"
  );
}
