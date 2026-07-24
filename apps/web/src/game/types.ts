export type FailReason = "wrong" | "timeout";

export type ThemeId =
  | "emoji"
  | "monster"
  | "cat"
  | "dog"
  | "fairy"
  | "color"
  | "fruit"
  | "letter"
  | "number"
  | "food";

export type PackDifficulty = "easy" | "medium" | "hard";

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

export interface CatRef {
  render: "emoji" | "image";
  emoji?: string;
  catId?: string;
  transform: string;
}

export interface CatLevelDef {
  id: string;
  index: number;
  theme: "cat";
  grid: { cols: number; rows: number };
  base: CatRef;
  odd: CatRef;
  fx: { board: string; odd: string };
  rules: {
    timeLimitMs: number;
    failOnWrongTap: boolean;
    shuffleSeed: number;
  };
  meta: { band: string; diffType: string };
}

export interface CatCampaignData {
  version: number;
  theme: "cat";
  campaignLevels: number;
  defaults: { timeLimitMs: number; failOnWrongTap: boolean };
  levels: CatLevelDef[];
}

export interface DogRef {
  render: "image";
  dogId: string;
  transform: string;
}

export interface DogLevelDef {
  id: string;
  index: number;
  theme: "dog";
  grid: { cols: number; rows: number };
  base: DogRef;
  odd: DogRef;
  fx: { board: string; odd: string };
  rules: {
    timeLimitMs: number;
    failOnWrongTap: boolean;
    shuffleSeed: number;
  };
  meta: { band: string; diffType: string };
}

export interface DogCampaignData {
  version: number;
  theme: "dog";
  campaignLevels: number;
  defaults: { timeLimitMs: number; failOnWrongTap: boolean };
  levels: DogLevelDef[];
}

export interface FairyRef {
  render: "image";
  fairyId: string;
  transform: string;
}

export interface FairyLevelDef {
  id: string;
  index: number;
  theme: "fairy";
  grid: { cols: number; rows: number };
  base: FairyRef;
  odd: FairyRef;
  fx: { board: string; odd: string };
  rules: {
    timeLimitMs: number;
    failOnWrongTap: boolean;
    shuffleSeed: number;
  };
  meta: { band: string; diffType: string };
}

export interface FairyCampaignData {
  version: number;
  theme: "fairy";
  campaignLevels: number;
  defaults: { timeLimitMs: number; failOnWrongTap: boolean };
  levels: FairyLevelDef[];
}

export interface ColorRef {
  render: "swatch";
  colorId: string;
}

export interface ColorLevelDef {
  id: string;
  index: number;
  theme: "color";
  grid: { cols: number; rows: number };
  base: ColorRef;
  odd: ColorRef;
  fx: { board: string; odd: string };
  rules: {
    timeLimitMs: number;
    failOnWrongTap: boolean;
    shuffleSeed: number;
  };
  meta: { band: string; diffType: string };
}

export interface ColorCampaignData {
  version: number;
  theme: "color";
  campaignLevels: number;
  defaults: { timeLimitMs: number; failOnWrongTap: boolean };
  levels: ColorLevelDef[];
}

export interface FruitRef {
  render: "image";
  fruitId: string;
  transform: string;
}

export interface FruitLevelDef {
  id: string;
  index: number;
  theme: "fruit";
  grid: { cols: number; rows: number };
  base: FruitRef;
  odd: FruitRef;
  fx: { board: string; odd: string };
  rules: {
    timeLimitMs: number;
    failOnWrongTap: boolean;
    shuffleSeed: number;
  };
  meta: { band: string; diffType: string };
}

export interface FruitCampaignData {
  version: number;
  theme: "fruit";
  campaignLevels: number;
  defaults: { timeLimitMs: number; failOnWrongTap: boolean };
  levels: FruitLevelDef[];
}

export interface GlyphRef {
  render: "glyph";
  glyphId: string;
}

export interface LetterLevelDef {
  id: string;
  index: number;
  theme: "letter";
  grid: { cols: number; rows: number };
  base: GlyphRef;
  odd: GlyphRef;
  fx: { board: string; odd: string };
  rules: {
    timeLimitMs: number;
    failOnWrongTap: boolean;
    shuffleSeed: number;
  };
  meta: { band: string; diffType: string };
}

export interface LetterCampaignData {
  version: number;
  theme: "letter";
  campaignLevels: number;
  defaults: { timeLimitMs: number; failOnWrongTap: boolean };
  levels: LetterLevelDef[];
}

export interface NumberLevelDef {
  id: string;
  index: number;
  theme: "number";
  grid: { cols: number; rows: number };
  base: GlyphRef;
  odd: GlyphRef;
  fx: { board: string; odd: string };
  rules: {
    timeLimitMs: number;
    failOnWrongTap: boolean;
    shuffleSeed: number;
  };
  meta: { band: string; diffType: string };
}

export interface NumberCampaignData {
  version: number;
  theme: "number";
  campaignLevels: number;
  defaults: { timeLimitMs: number; failOnWrongTap: boolean };
  levels: NumberLevelDef[];
}

export interface FoodRef {
  render: "image";
  foodId: string;
  transform: string;
}

export interface FoodLevelDef {
  id: string;
  index: number;
  theme: "food";
  grid: { cols: number; rows: number };
  base: FoodRef;
  odd: FoodRef;
  fx: { board: string; odd: string };
  rules: {
    timeLimitMs: number;
    failOnWrongTap: boolean;
    shuffleSeed: number;
  };
  meta: { band: string; diffType: string; food?: string };
}

export interface FoodCampaignData {
  version: number;
  theme: "food";
  campaignLevels: number;
  defaults: { timeLimitMs: number; failOnWrongTap: boolean };
  levels: FoodLevelDef[];
}

export interface CellView {
  key: string;
  kind: "emoji" | "monster" | "image" | "color" | "glyph";
  emoji?: string;
  monsterId?: string;
  catId?: string;
  dogId?: string;
  fairyId?: string;
  fruitId?: string;
  foodId?: string;
  colorId?: string;
  glyphId?: string;
  glyph?: string;
  fill?: string;
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
