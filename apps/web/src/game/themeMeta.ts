import type { ThemeId } from "./types";

export interface ThemeMeta {
  id: ThemeId;
  path: string;
  label: string;
  eyebrow: string;
  headline: string;
  tagline: string;
  findLine: string;
  tutorialBody: string;
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
  },
  {
    id: "cat",
    path: "/cat",
    label: "Cats",
    eyebrow: "Cat pack",
    headline: "Cats",
    tagline: "Find the different cat.",
    findLine: "Find the odd one among the cats.",
    tutorialBody:
      "Tap the one that doesn’t belong. Early levels hide another animal among cats; later levels use look-alike kitties, tints, bells, and jump-arounds. You have 10 seconds.",
  },
];

export function getThemeMeta(id: ThemeId): ThemeMeta {
  return THEMES.find((t) => t.id === id) ?? THEMES[0];
}

export function isThemeId(value: string | undefined): value is ThemeId {
  return value === "emoji" || value === "monster" || value === "cat";
}
