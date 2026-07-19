import { mergeTransformKey, parseTransform } from "./monsterAssets";
import { IMAGE_EXT } from "./imageExt";

const DOGS = new Set([
  "D01",
  "D02",
  "D03",
  "D04",
  "D05",
  "D06",
  "D07",
  "D08",
]);

const AVAILABLE_TWINS = new Set<string>(["D01b", "D02b", "D05b", "D07b"]);

/** Borrow illustrated animals/cats from the Cats pack */
const BORROWED: Record<string, string> = {
  A02: `/cats/cat_a02.${IMAGE_EXT}`,
  A03: `/cats/cat_a03.${IMAGE_EXT}`,
  A04: `/cats/cat_a04.${IMAGE_EXT}`,
  A05: `/cats/cat_a05.${IMAGE_EXT}`,
  A06: `/cats/cat_a06.${IMAGE_EXT}`,
  A07: `/cats/cat_a07.${IMAGE_EXT}`,
  A08: `/cats/cat_a08.${IMAGE_EXT}`,
  A09: `/cats/cat_a09.${IMAGE_EXT}`,
  A10: `/cats/cat_a10.${IMAGE_EXT}`,
  C01: `/cats/cat_c01.${IMAGE_EXT}`,
  C03: `/cats/cat_c03.${IMAGE_EXT}`,
  C05: `/cats/cat_c05.${IMAGE_EXT}`,
};

const TWIN_FALLBACK: Record<string, string[]> = {
  D01b: ["hue40"],
  D02b: ["hue30"],
  D05b: ["hue40"],
  D07b: ["darker"],
};

export function dogSrc(id: string): string {
  return `/dogs/dog_${id.toLowerCase()}.${IMAGE_EXT}`;
}

export function resolveDogArt(id: string): {
  id: string;
  src: string;
  extraParts: string[];
} {
  const key = id.toUpperCase();

  if (BORROWED[key]) {
    return { id: key, src: BORROWED[key], extraParts: [] };
  }

  if (AVAILABLE_TWINS.has(key)) {
    return { id: key, src: dogSrc(key), extraParts: [] };
  }

  const twin = /^(D\d{2})b$/i.exec(key);
  if (twin) {
    const base = twin[1].toUpperCase();
    if (DOGS.has(base)) {
      return {
        id: base,
        src: dogSrc(base),
        extraParts: TWIN_FALLBACK[key] ?? ["hue40"],
      };
    }
  }

  if (DOGS.has(key)) {
    return { id: key, src: dogSrc(key), extraParts: [] };
  }

  return { id: "D01", src: dogSrc("D01"), extraParts: [] };
}

export function resolveDogCell(
  dogId: string,
  transformKey: string,
): {
  src: string;
  transformKey: string;
  cssTransform: string;
  cssFilter: string;
} {
  const resolved = resolveDogArt(dogId);
  const merged = mergeTransformKey(transformKey, resolved.extraParts);
  const { cssTransform, cssFilter } = parseTransform(merged);
  return {
    src: resolved.src,
    transformKey: merged,
    cssTransform,
    cssFilter,
  };
}
