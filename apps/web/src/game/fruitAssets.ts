import { mergeTransformKey, parseTransform } from "./monsterAssets";
import { IMAGE_EXT } from "./imageExt";

const KNOWN = new Set([
  "R01",
  "R02",
  "R03",
  "R04",
  "R05",
  "R06",
  "R07",
  "R08",
  "R09",
  "R10",
  "R11",
  "R12",
  "R13",
  "R14",
  "R15",
  "R16",
]);

export function fruitSrc(id: string): string {
  return `/fruits/fruit_${id.toLowerCase()}.${IMAGE_EXT}`;
}

export function resolveFruitArt(id: string): {
  id: string;
  src: string;
  extraParts: string[];
} {
  const key = id.toUpperCase();
  if (KNOWN.has(key)) {
    return { id: key, src: fruitSrc(key), extraParts: [] };
  }
  return { id: "R01", src: fruitSrc("R01"), extraParts: [] };
}

export function resolveFruitCell(
  fruitId: string,
  transformKey: string,
): {
  src: string;
  transformKey: string;
  cssTransform: string;
  cssFilter: string;
} {
  const resolved = resolveFruitArt(fruitId);
  const merged = mergeTransformKey(transformKey, resolved.extraParts);
  const { cssTransform, cssFilter } = parseTransform(merged);
  return {
    src: resolved.src,
    transformKey: merged,
    cssTransform,
    cssFilter,
  };
}
