/** @deprecated prefer `@/game/campaign` — kept for thin re-exports. */
export {
  TIME_LIMIT_MS,
  clampLevel,
  getContinueLevel,
  getTotalLevels,
  buildThemeLevel,
} from "./campaign";

import { getTotalLevels } from "./campaign";

/** Emoji campaign size (legacy name). */
export const TOTAL_LEVELS = getTotalLevels("emoji");
