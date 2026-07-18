export type FailReason = "wrong" | "timeout";

export type LevelCategory = "animals" | "food" | "gestures";

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

export interface ProgressSave {
  currentLevel: number;
  bestLevel: number;
  tutorialSeen: boolean;
  sound: boolean;
  colorblind: boolean;
  campaignCleared: boolean;
}

export type Screen =
  | "home"
  | "play"
  | "clear";

export type Overlay =
  | "tutorial"
  | "fail"
  | "share-fallback"
  | "start-over"
  | "pause"
  | "settings"
  | null;
