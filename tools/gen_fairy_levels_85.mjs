import fs from "fs";

const FAIRY_IDS = ["F01", "F02", "F03", "F04", "F05", "F06", "F07", "F08"];

/** Same base, one clear part different (medium band) */
const PART_TWIN = {
  F01: "F01h",
  F02: "F02d",
  F03: "F03p",
  F04: "F04e",
  F05: "F05h",
  F06: "F06d",
  F07: "F07p",
  F08: "F08e",
};

/**
 * Medium-band base order by thumbnail visibility (96px board cells).
 * F02d/F05h/F06d are high-contrast; F03p/F07p are prop swaps; F01h is
 * blonde→soft pink (low contrast on pink dress — do not lead the band).
 * F04e / F08e (earring / wing-tip) are near-micro at thumb size — omit from
 * medium until redrawn with a larger part change.
 */
const MEDIUM_BASES = ["F02", "F05", "F06", "F03", "F07", "F01"];

/** Smaller detail twins (hard band) */
const MICRO_TWIN = {
  F01: "F01m",
  F02: "F02m",
  F03: "F03m",
  F04: "F04m",
};

function imageRef(id, transform = "none") {
  return { render: "image", fairyId: id, transform };
}

function level(index, cols, base, odd, band, diffType, fx) {
  return {
    id: `F-${String(index).padStart(3, "0")}`,
    index,
    theme: "fairy",
    grid: { cols, rows: cols },
    base,
    odd,
    fx: fx ?? { board: "none", odd: "none" },
    rules: {
      timeLimitMs: 10000,
      failOnWrongTap: true,
      shuffleSeed: 9000 + index,
    },
    meta: { band, diffType },
  };
}

function pick(arr, i) {
  return arr[i % arr.length];
}

function differentPair(i) {
  const base = pick(FAIRY_IDS, i);
  let odd = pick(FAIRY_IDS, i + 3);
  if (odd === base) odd = pick(FAIRY_IDS, i + 5);
  return { base, odd };
}

const levels = [];

// 1–15 Easy: clearly different fairy
for (let i = 1; i <= 15; i++) {
  const cols = i <= 8 ? 3 : 4;
  const { base, odd } = differentPair(i - 1);
  levels.push(
    level(i, cols, imageRef(base), imageRef(odd), "easy", "different_fairy", {
      board: "none",
      odd: "none",
    }),
  );
}

// 16–55 Medium: same fairy, one part different (clear twins first)
for (let i = 16; i <= 55; i++) {
  const id = pick(MEDIUM_BASES, i - 16);
  const twin = PART_TWIN[id];
  levels.push(
    level(i, 4, imageRef(id), imageRef(twin), "medium", "part_diff", {
      board: "none",
      odd: "none",
    }),
  );
}

// 56–65 Transition: still part diff but cycle clearer bases only
for (let i = 56; i <= 65; i++) {
  const id = pick(MEDIUM_BASES, i);
  const twin = PART_TWIN[id];
  levels.push(
    level(i, 4, imageRef(id), imageRef(twin), "bridge", "part_diff_easy", {
      board: "none",
      odd: "none",
    }),
  );
}

// 66–85 Hard: micro twin; teleport from 71
for (let i = 66; i <= 85; i++) {
  const id = pick(Object.keys(MICRO_TWIN), i - 66);
  const twin = MICRO_TWIN[id];
  const teleport = i >= 71;
  levels.push(
    level(i, 5, imageRef(id), imageRef(twin), "hard", "micro_diff", {
      board: "none",
      odd: teleport ? "teleport" : "none",
    }),
  );
}

if (levels.length !== 85) {
  console.error("Expected 85, got", levels.length);
  process.exit(1);
}

const out = {
  version: 1,
  theme: "fairy",
  difficulty: "medium",
  campaignLevels: 85,
  assetPack: {
    required: FAIRY_IDS,
    partTwins: MEDIUM_BASES.map((id) => PART_TWIN[id]),
    reservedSubtleTwins: ["F04e", "F08e"],
    microTwins: Object.values(MICRO_TWIN),
    note:
      "Medium pack: 15 easy + 40 part + 10 bridge + 20 micro/teleport. F04e/F08e omitted from medium (too subtle at thumb); redraw before reuse.",
  },
  fx: ["none", "teleport"],
  defaults: { timeLimitMs: 10000, failOnWrongTap: true },
  bands: {
    "1-15": "easy — different fairy silhouette/color",
    "16-55": "medium — one part different (painted twin)",
    "56-65": "bridge — clearer part diffs, no teleport",
    "66-85": "hard — micro twin; teleport from 71",
  },
  levels,
};

fs.mkdirSync("packages/level_data/fairy", { recursive: true });
fs.writeFileSync(
  "packages/level_data/fairy/levels_fairy_85.json",
  JSON.stringify(out, null, 2) + "\n",
);

const lines = [
  "# Fairy 85 关一览",
  "",
  "> 中等难度：明显不同 → 部件差 → 过渡 → 微差+换位",
  "",
  "| # | Grid | Base | Odd | Band | FX |",
  "|---|------|------|-----|------|----|",
];
for (const l of levels) {
  const fx =
    l.fx.board === "none" && l.fx.odd === "none"
      ? "—"
      : `${l.fx.board}/${l.fx.odd}`;
  lines.push(
    `| ${l.index} | ${l.grid.cols}×${l.grid.rows} | ${l.base.fairyId} | ${l.odd.fairyId} | ${l.meta.band} | ${fx} |`,
  );
}
fs.writeFileSync("docs/levels/FAIRY_PAIRS_85.md", lines.join("\n") + "\n");

console.log("OK", {
  len: levels.length,
  L1: levels[0],
  L20: levels[19],
  L60: levels[59],
  L75: levels[74],
});
