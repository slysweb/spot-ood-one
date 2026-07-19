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
  "A01",
  "A02",
  "A03",
  "A04",
  "A05",
  "A06",
  "A07",
  "A08",
  "A09",
  "A10",
]);

/** Twin PNGs present in /public/cats */
const AVAILABLE_TWINS = new Set<string>(["C01b", "C02b", "C03b", "C05b"]);

const TWIN_FALLBACK: Record<string, string[]> = {
  C01b: ["hue40"],
  C02b: ["hue30"],
  C03b: ["darker"],
  C05b: ["hue40"],
};

export function catSrc(id: string): string {
  return `/cats/cat_${id.toLowerCase()}.png`;
}

export function resolveCatArt(id: string): {
  catId: string;
  extraParts: string[];
} {
  const key = id.toUpperCase();
  if (AVAILABLE_TWINS.has(key)) {
    return { catId: key, extraParts: [] };
  }
  const twin = /^(C\d{2})b$/i.exec(key);
  if (twin) {
    const base = twin[1].toUpperCase();
    if (AVAILABLE.has(base)) {
      return { catId: base, extraParts: TWIN_FALLBACK[key] ?? ["hue40"] };
    }
  }
  if (AVAILABLE.has(key)) {
    return { catId: key, extraParts: [] };
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
