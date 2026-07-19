import emojiRaw from "@level-data/levels.json";
import monsterRaw from "@level-data/monster/levels_monster_120.json";
import catRaw from "@level-data/cat/levels_cat_120.json";
import type {
  CampaignData,
  CatCampaignData,
  CatLevelDef,
  CatRef,
  CellView,
  MonsterCampaignData,
  MonsterLevelDef,
  ThemeId,
  ThemeProgress,
} from "./types";
import { resolveCatCell } from "./catAssets";
import {
  mergeTransformKey,
  monsterSrc,
  parseTransform,
  resolveMonsterArt,
} from "./monsterAssets";

const emojiData = emojiRaw as CampaignData;
const monsterData = monsterRaw as MonsterCampaignData;
const catData = catRaw as CatCampaignData;

export const TIME_LIMIT_MS = 10_000;

export function getTotalLevels(theme: ThemeId): number {
  if (theme === "monster") return monsterData.campaignLevels;
  if (theme === "cat") return catData.campaignLevels;
  return emojiData.campaignLevels;
}

export function clampLevel(theme: ThemeId, index: number): number {
  const max = getTotalLevels(theme);
  return Math.min(Math.max(1, index), max);
}

export function getContinueLevel(
  theme: ThemeId,
  progress: ThemeProgress,
): number {
  const total = getTotalLevels(theme);
  if (progress.currentLevel > 1) return clampLevel(theme, progress.currentLevel);
  if (progress.campaignCleared || progress.bestLevel >= total) {
    return clampLevel(theme, Math.min(progress.bestLevel + 1, total));
  }
  if (progress.bestLevel > 1) return clampLevel(theme, progress.bestLevel);
  return 1;
}

function pickOddIndex(total: number, seed: number, retryCount: number): number {
  const x = (seed * 9301 + retryCount * 49297 + 233280) % 233280;
  return x % total;
}

function emojiCell(emoji: string, index: number, isOdd: boolean): CellView {
  return {
    key: `e-${index}-${emoji}`,
    kind: "emoji",
    emoji,
    transformKey: "none",
    cssTransform: "none",
    cssFilter: "none",
    isOdd,
  };
}

function monsterCell(
  monsterId: string,
  transformKey: string,
  index: number,
  isOdd: boolean,
): CellView {
  const resolved = resolveMonsterArt(monsterId);
  const merged = mergeTransformKey(transformKey, resolved.extraParts);
  const { cssTransform, cssFilter } = parseTransform(merged);
  return {
    key: `m-${index}-${resolved.monsterId}-${merged}`,
    kind: "monster",
    monsterId: resolved.monsterId,
    src: monsterSrc(resolved.monsterId),
    transformKey: merged,
    cssTransform,
    cssFilter,
    isOdd,
  };
}

export function buildEmojiLevel(
  levelIndex: number,
  retryCount: number,
): {
  cols: number;
  cells: CellView[];
  oddIndex: number;
  fx: { board: string; odd: string };
  timeLimitMs: number;
} {
  const level = emojiData.levels.find((l) => l.index === levelIndex);
  if (!level) throw new Error(`Missing emoji level ${levelIndex}`);
  const total = level.grid.cols * level.grid.rows;
  const oddIndex = pickOddIndex(total, level.shuffleSeed, retryCount);
  const cells = Array.from({ length: total }, (_, i) =>
    emojiCell(i === oddIndex ? level.odd : level.base, i, i === oddIndex),
  );
  return {
    cols: level.grid.cols,
    cells,
    oddIndex,
    fx: { board: "none", odd: "none" },
    timeLimitMs: emojiData.defaults.timeLimitMs,
  };
}

export function buildMonsterLevel(
  levelIndex: number,
  retryCount: number,
): {
  cols: number;
  cells: CellView[];
  oddIndex: number;
  fx: { board: string; odd: string };
  timeLimitMs: number;
} {
  const level = monsterData.levels.find((l) => l.index === levelIndex) as
    | MonsterLevelDef
    | undefined;
  if (!level) throw new Error(`Missing monster level ${levelIndex}`);
  const total = level.grid.cols * level.grid.rows;
  const oddIndex = pickOddIndex(total, level.rules.shuffleSeed, retryCount);
  const cells = Array.from({ length: total }, (_, i) => {
    const ref = i === oddIndex ? level.odd : level.base;
    return monsterCell(ref.monsterId, ref.transform, i, i === oddIndex);
  });
  return {
    cols: level.grid.cols,
    cells,
    oddIndex,
    fx: level.fx,
    timeLimitMs: level.rules.timeLimitMs,
  };
}

function catCell(ref: CatRef, index: number, isOdd: boolean): CellView {
  if (ref.render === "emoji" && ref.emoji) {
    return {
      key: `c-e-${index}-${ref.emoji}`,
      kind: "emoji",
      emoji: ref.emoji,
      transformKey: "none",
      cssTransform: "none",
      cssFilter: "none",
      isOdd,
    };
  }
  const catId = ref.catId ?? "C01";
  const art = resolveCatCell(catId, ref.transform ?? "none");
  return {
    key: `c-i-${index}-${catId}-${art.transformKey}`,
    kind: "image",
    catId,
    src: art.src,
    transformKey: art.transformKey,
    cssTransform: art.cssTransform,
    cssFilter: art.cssFilter,
    isOdd,
  };
}

export function buildCatLevel(
  levelIndex: number,
  retryCount: number,
): {
  cols: number;
  cells: CellView[];
  oddIndex: number;
  fx: { board: string; odd: string };
  timeLimitMs: number;
} {
  const level = catData.levels.find((l) => l.index === levelIndex) as
    | CatLevelDef
    | undefined;
  if (!level) throw new Error(`Missing cat level ${levelIndex}`);
  const total = level.grid.cols * level.grid.rows;
  const oddIndex = pickOddIndex(total, level.rules.shuffleSeed, retryCount);
  const cells = Array.from({ length: total }, (_, i) =>
    catCell(i === oddIndex ? level.odd : level.base, i, i === oddIndex),
  );
  return {
    cols: level.grid.cols,
    cells,
    oddIndex,
    fx: level.fx,
    timeLimitMs: level.rules.timeLimitMs,
  };
}

export function buildThemeLevel(
  theme: ThemeId,
  levelIndex: number,
  retryCount: number,
) {
  if (theme === "monster") return buildMonsterLevel(levelIndex, retryCount);
  if (theme === "cat") return buildCatLevel(levelIndex, retryCount);
  return buildEmojiLevel(levelIndex, retryCount);
}
