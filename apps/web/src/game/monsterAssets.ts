import { IMAGE_EXT } from "./imageExt";

/** Files present in /public/monsters (no twins yet). */
const AVAILABLE = new Set([
  "M01",
  "M02",
  "M03",
  "M04",
  "M05",
  "M06",
  "M07",
  "M08",
  "M09",
  "M10",
  "M11",
  "M12",
]);

export function monsterSrc(monsterId: string): string {
  const id = monsterId.toLowerCase();
  return `/monsters/monster_${id}.${IMAGE_EXT}`;
}

/** Map twin IDs (M01b) to base art + extra transform when twin PNG is missing. */
export function resolveMonsterArt(monsterId: string): {
  monsterId: string;
  extraParts: string[];
} {
  const twin = /^M(\d{2})b$/i.exec(monsterId);
  if (twin) {
    const base = `M${twin[1]}`;
    if (AVAILABLE.has(base)) {
      return { monsterId: base, extraParts: ["hue30"] };
    }
  }
  if (AVAILABLE.has(monsterId)) {
    return { monsterId, extraParts: [] };
  }
  return { monsterId: "M01", extraParts: [] };
}

export function parseTransform(transformKey: string): {
  cssTransform: string;
  cssFilter: string;
} {
  const parts = transformKey
    .split("+")
    .map((p) => p.trim())
    .filter((p) => p && p !== "none");

  const transforms: string[] = [];
  const filters: string[] = [];

  for (const part of parts) {
    switch (part) {
      case "flipX":
        transforms.push("scaleX(-1)");
        break;
      case "rot12":
        transforms.push("rotate(12deg)");
        break;
      case "rot20":
        transforms.push("rotate(20deg)");
        break;
      case "rot30":
        transforms.push("rotate(30deg)");
        break;
      case "rot45":
        transforms.push("rotate(45deg)");
        break;
      case "rot180":
        transforms.push("rotate(180deg)");
        break;
      case "scale75":
        transforms.push("scale(0.75)");
        break;
      case "scale88":
        transforms.push("scale(0.82)");
        break;
      case "scale112":
        transforms.push("scale(1.18)");
        break;
      case "scale125":
        transforms.push("scale(1.28)");
        break;
      case "hue15":
        filters.push("hue-rotate(18deg)");
        break;
      case "hue30":
        filters.push("hue-rotate(36deg)");
        break;
      case "hue40":
        filters.push("hue-rotate(48deg)");
        break;
      case "darker":
        filters.push("brightness(0.72)");
        break;
      default:
        break;
    }
  }

  return {
    cssTransform: transforms.length ? transforms.join(" ") : "none",
    cssFilter: filters.length ? filters.join(" ") : "none",
  };
}

export function mergeTransformKey(
  baseKey: string,
  extraParts: string[],
): string {
  const parts = [
    ...baseKey.split("+").map((p) => p.trim()).filter((p) => p && p !== "none"),
    ...extraParts,
  ];
  return parts.length ? parts.join("+") : "none";
}
