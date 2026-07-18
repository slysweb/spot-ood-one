import type { ProgressSave } from "./types";
import { clampLevel, TOTAL_LEVELS } from "./levels";

const KEY = "spot_odd_one_v1";

const DEFAULTS: ProgressSave = {
  currentLevel: 1,
  bestLevel: 1,
  tutorialSeen: false,
  sound: true,
  colorblind: false,
  campaignCleared: false,
};

export function loadProgress(): ProgressSave {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return { ...DEFAULTS };
    const parsed = JSON.parse(raw) as Partial<ProgressSave>;
    return {
      ...DEFAULTS,
      ...parsed,
      currentLevel: clampLevel(parsed.currentLevel ?? 1),
      bestLevel: clampLevel(parsed.bestLevel ?? 1),
    };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveProgress(save: ProgressSave): void {
  localStorage.setItem(
    KEY,
    JSON.stringify({
      ...save,
      currentLevel: clampLevel(save.currentLevel),
      bestLevel: Math.min(Math.max(1, save.bestLevel), TOTAL_LEVELS),
    }),
  );
}
