import { mergeTransformKey, parseTransform } from "./monsterAssets";

const KNOWN = new Set([
  "F01",
  "F02",
  "F03",
  "F04",
  "F05",
  "F06",
  "F07",
  "F08",
  "F01h",
  "F02d",
  "F03p",
  "F04e",
  "F05h",
  "F06d",
  "F07p",
  "F08e",
  "F01m",
  "F02m",
  "F03m",
  "F04m",
]);

const TWIN_TO_BASE: Record<string, { base: string; extra: string[] }> = {
  F01h: { base: "F01", extra: ["hue40"] },
  F02d: { base: "F02", extra: ["hue30"] },
  F03p: { base: "F03", extra: ["hue40"] },
  F04e: { base: "F04", extra: ["darker"] },
  F05h: { base: "F05", extra: ["hue40"] },
  F06d: { base: "F06", extra: ["hue30"] },
  F07p: { base: "F07", extra: ["hue40"] },
  F08e: { base: "F08", extra: ["hue30"] },
  F01m: { base: "F01", extra: ["hue15"] },
  F02m: { base: "F02", extra: ["hue15"] },
  F03m: { base: "F03", extra: ["darker"] },
  F04m: { base: "F04", extra: ["hue15"] },
};

export function fairySrc(id: string): string {
  return `/fairies/fairy_${id.toLowerCase()}.png`;
}

export function resolveFairyArt(id: string): {
  id: string;
  src: string;
  extraParts: string[];
} {
  const key = id.toUpperCase();
  if (KNOWN.has(key)) {
    return { id: key, src: fairySrc(key), extraParts: [] };
  }
  const fb = TWIN_TO_BASE[key];
  if (fb) {
    return { id: fb.base, src: fairySrc(fb.base), extraParts: fb.extra };
  }
  return { id: "F01", src: fairySrc("F01"), extraParts: [] };
}

export function resolveFairyCell(
  fairyId: string,
  transformKey: string,
): {
  src: string;
  transformKey: string;
  cssTransform: string;
  cssFilter: string;
} {
  const resolved = resolveFairyArt(fairyId);
  const merged = mergeTransformKey(transformKey, resolved.extraParts);
  const { cssTransform, cssFilter } = parseTransform(merged);
  return {
    src: resolved.src,
    transformKey: merged,
    cssTransform,
    cssFilter,
  };
}
