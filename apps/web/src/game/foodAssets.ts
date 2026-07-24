/** Food hard-pack art (kawaii WebP twins). */

import { mergeTransformKey, parseTransform } from "./monsterAssets";
import { IMAGE_EXT } from "./imageExt";

const KNOWN = new Set([
  "F01",
  "F01B",
  "F02",
  "F02B",
  "F03",
  "F03B",
  "F04",
  "F04B",
  "F05",
  "F05B",
  "F06",
  "F06B",
  "F07",
  "F07B",
  "F08",
  "F08B",
  "F09",
  "F09B",
  "F10",
  "F10B",
  "F11",
  "F11B",
  "F12",
  "F12B",
  "F13",
  "F13B",
  "F14",
  "F14B",
  "F15",
  "F15B",
  "F16",
  "F16B",
  "F17",
  "F17B",
  "F18",
  "F18B",
  "F19",
  "F19B",
  "F20",
  "F20B",
]);

export function foodSrc(id: string): string {
  return `/foods/food_${id.toLowerCase()}.${IMAGE_EXT}`;
}

export function resolveFoodArt(id: string): {
  id: string;
  src: string;
  extraParts: string[];
} {
  const key = id.toUpperCase();
  if (KNOWN.has(key)) {
    return { id: key, src: foodSrc(key), extraParts: [] };
  }
  return { id: "F01", src: foodSrc("F01"), extraParts: [] };
}

export function resolveFoodCell(
  foodId: string,
  transformKey: string,
): {
  src: string;
  transformKey: string;
  cssTransform: string;
  cssFilter: string;
} {
  const resolved = resolveFoodArt(foodId);
  const merged = mergeTransformKey(transformKey, resolved.extraParts);
  const { cssTransform, cssFilter } = parseTransform(merged);
  return {
    src: resolved.src,
    transformKey: merged,
    cssTransform,
    cssFilter,
  };
}
