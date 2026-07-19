import type { AppSave, ThemeId, ThemeProgress } from "./types";
import { clampLevel, getTotalLevels } from "./campaign";

const KEY = "spot_odd_one_v2";
const LEGACY_KEY = "spot_odd_one_v1";

const emptyTheme = (): ThemeProgress => ({
  currentLevel: 1,
  bestLevel: 1,
  tutorialSeen: false,
  campaignCleared: false,
});

function defaults(): AppSave {
  return {
    version: 2,
    theme: "emoji",
    sound: true,
    colorblind: false,
    themes: {
      emoji: emptyTheme(),
      monster: emptyTheme(),
      cat: emptyTheme(),
      dog: emptyTheme(),
      fairy: emptyTheme(),
    },
  };
}

export function loadSave(): AppSave {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as AppSave;
      return normalize(parsed);
    }

    const legacy = localStorage.getItem(LEGACY_KEY);
    if (legacy) {
      const old = JSON.parse(legacy) as {
        currentLevel?: number;
        bestLevel?: number;
        tutorialSeen?: boolean;
        sound?: boolean;
        colorblind?: boolean;
        campaignCleared?: boolean;
      };
      const migrated = defaults();
      migrated.sound = old.sound ?? true;
      migrated.colorblind = old.colorblind ?? false;
      migrated.themes.emoji = {
        currentLevel: old.currentLevel ?? 1,
        bestLevel: old.bestLevel ?? 1,
        tutorialSeen: !!old.tutorialSeen,
        campaignCleared: !!old.campaignCleared,
      };
      saveSave(migrated);
      return migrated;
    }
  } catch {
    /* ignore */
  }
  return defaults();
}

function normalize(save: AppSave): AppSave {
  const base = defaults();
  const theme: ThemeId =
    save.theme === "monster" ||
    save.theme === "cat" ||
    save.theme === "dog" ||
    save.theme === "fairy"
      ? save.theme
      : "emoji";
  return {
    version: 2,
    theme,
    sound: save.sound ?? true,
    colorblind: save.colorblind ?? false,
    themes: {
      emoji: {
        ...base.themes.emoji,
        ...save.themes?.emoji,
      },
      monster: {
        ...base.themes.monster,
        ...save.themes?.monster,
      },
      cat: {
        ...base.themes.cat,
        ...save.themes?.cat,
      },
      dog: {
        ...base.themes.dog,
        ...save.themes?.dog,
      },
      fairy: {
        ...base.themes.fairy,
        ...save.themes?.fairy,
      },
    },
  };
}

export function saveSave(save: AppSave): void {
  const next: AppSave = {
    ...save,
    version: 2,
    themes: {
      emoji: clampTheme("emoji", save.themes.emoji),
      monster: clampTheme("monster", save.themes.monster),
      cat: clampTheme("cat", save.themes.cat ?? emptyTheme()),
      dog: clampTheme("dog", save.themes.dog ?? emptyTheme()),
      fairy: clampTheme("fairy", save.themes.fairy ?? emptyTheme()),
    },
  };
  localStorage.setItem(KEY, JSON.stringify(next));
}

function clampTheme(theme: ThemeId, t: ThemeProgress): ThemeProgress {
  const total = getTotalLevels(theme);
  return {
    currentLevel: clampLevel(theme, t.currentLevel),
    bestLevel: Math.min(Math.max(1, t.bestLevel), total),
    tutorialSeen: !!t.tutorialSeen,
    campaignCleared: !!t.campaignCleared,
  };
}

export function getThemeProgress(save: AppSave, theme: ThemeId): ThemeProgress {
  return save.themes[theme] ?? emptyTheme();
}
