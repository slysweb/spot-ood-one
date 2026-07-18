import raw from "@level-data/levels.json";
import type { CampaignData, LevelDef, ProgressSave } from "./types";

const data = raw as CampaignData;

export const TIME_LIMIT_MS = data.defaults.timeLimitMs;
export const TOTAL_LEVELS = data.campaignLevels;

export function getLevel(index: number): LevelDef {
  const level = data.levels.find((l) => l.index === index);
  if (!level) {
    throw new Error(`Missing level ${index}`);
  }
  return level;
}

export function clampLevel(index: number): number {
  return Math.min(Math.max(1, index), TOTAL_LEVELS);
}

/** Resume point for Continue CTA (supports players who cleared an older 80-level build). */
export function getContinueLevel(progress: ProgressSave): number {
  if (progress.currentLevel > 1) return clampLevel(progress.currentLevel);
  if (progress.campaignCleared || progress.bestLevel >= TOTAL_LEVELS) {
    return clampLevel(Math.min(progress.bestLevel + 1, TOTAL_LEVELS));
  }
  if (progress.bestLevel > 1) return clampLevel(progress.bestLevel);
  return 1;
}

/** Deterministic odd-cell index from seed + retry. */
export function pickOddIndex(
  total: number,
  seed: number,
  retryCount: number,
): number {
  const x = (seed * 9301 + retryCount * 49297 + 233280) % 233280;
  return x % total;
}

export function buildCells(
  level: LevelDef,
  retryCount: number,
): { cells: string[]; oddIndex: number } {
  const total = level.grid.cols * level.grid.rows;
  const oddIndex = pickOddIndex(total, level.shuffleSeed, retryCount);
  const cells = Array.from({ length: total }, (_, i) =>
    i === oddIndex ? level.odd : level.base,
  );
  return { cells, oddIndex };
}
