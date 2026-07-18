export type FailReason = "wrong" | "timeout";

export type ThemeId = "emoji" | "monster";

export type LevelCategory =
  | "animals"
  | "food"
  | "gestures"
  | "faces"
  | "vehicles"
  | "sports"
  | "weather"
  | "symbols"
  | "objects"
  | "clothing"
  | "nature"
  | "travel"
  | string;

export interface LevelDef {
  id: string;
  index: number;
  grid: { cols: number; rows: number };
  base: string;
  odd: string;
  category: LevelCategory;
  diffType: string;
  difficulty: number;
  shuffleSeed: number;
  platformRisk: "low" | "medium" | "high";
  notes: string;
}

export interface CampaignData {
  version: number;
  game: string;
  campaignLevels: number;
  defaults: {
    timeLimitMs: number;
    failOnWrongTap: boolean;
  };
  levels: LevelDef[];
}

export type MonsterTransform = string;

export interface MonsterRef {
  monsterId: string;
  transform: MonsterTransform;
}

export interface MonsterLevelDef {
  id: string;
  index: number;
  theme: "monster";
  grid: { cols: number; rows: number };
  base: MonsterRef;
  odd: MonsterRef;
  fx: { board: string; odd: string };
  rules: {
    timeLimitMs: number;
    failOnWrongTap: boolean;
    shuffleSeed: number;
  };
  meta: { band: string; diffType: string };
}

export interface MonsterCampaignData {
  version: number;
  theme: "monster";
  campaignLevels: number;
  defaults: { timeLimitMs: number; failOnWrongTap: boolean };
  levels: MonsterLevelDef[];
}

export interface CellView {
  key: string;
  kind: "emoji" | "monster";
  emoji?: string;
  monsterId?: string;
  src?: string;
  transformKey: string;
  cssTransform: string;
  cssFilter: string;
  /** Moves with the cell when teleport swaps positions */
  isOdd: boolean;
}

export interface ThemeProgress {
  currentLevel: number;
  bestLevel: number;
  tutorialSeen: boolean;
  campaignCleared: boolean;
}

/** @deprecated use AppSave; kept for migration typing */
export interface ProgressSave {
  currentLevel: number;
  bestLevel: number;
  tutorialSeen: boolean;
  sound: boolean;
  colorblind: boolean;
  campaignCleared: boolean;
}

export interface AppSave {
  version: 2;
  theme: ThemeId;
  sound: boolean;
  colorblind: boolean;
  themes: Record<ThemeId, ThemeProgress>;
}

export type Screen = "home" | "play" | "clear";

export type Overlay =
  | "tutorial"
  | "fail"
  | "share-fallback"
  | "start-over"
  | "pause"
  | "settings"
  | null;
