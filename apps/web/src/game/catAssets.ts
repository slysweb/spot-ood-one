import { mergeTransformKey, parseTransform } from "./monsterAssets";

const AVAILABLE = new Set([
  "C01",
  "C02",
  "C03",
  "C04",
  "C05",
  "C06",
  "C07",
  "C08",
]);

/** Twin PNGs present in /public/cats */
const AVAILABLE_TWINS = new Set<string>(["C01b", "C02b", "C03b", "C05b"]);

const TWIN_FALLBACK: Record<string, string[]> = {
  C01b: ["hue40"],
  C02b: ["hue30"],
  C03b: ["darker"],
  C05b: ["hue40"],
};

export function catSrc(catId: string): string {
  return `/cats/cat_${catId.toLowerCase()}.png`;
}

export function resolveCatArt(catId: string): {
  catId: string;
  extraParts: string[];
} {
  if (AVAILABLE_TWINS.has(catId)) {
    return { catId, extraParts: [] };
  }
  const twin = /^(C\d{2})b$/i.exec(catId);
  if (twin) {
    const base = twin[1].toUpperCase();
    if (AVAILABLE.has(base)) {
      return { catId: base, extraParts: TWIN_FALLBACK[catId] ?? ["hue40"] };
    }
  }
  if (AVAILABLE.has(catId)) {
    return { catId, extraParts: [] };
  }
  return { catId: "C01", extraParts: [] };
}

export function resolveCatCell(
  catId: string,
  transformKey: string,
): {
  src: string;
  transformKey: string;
  cssTransform: string;
  cssFilter: string;
} {
  const resolved = resolveCatArt(catId);
  const merged = mergeTransformKey(transformKey, resolved.extraParts);
  const { cssTransform, cssFilter } = parseTransform(merged);
  return {
    src: catSrc(resolved.catId),
    transformKey: merged,
    cssTransform,
    cssFilter,
  };
}
