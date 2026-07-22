import fs from "fs";

/**
 * Color pack — medium, 30 levels.
 * Differences: hue / brightness / saturation / gradient.
 * Swatches are resolved in apps/web/src/game/colorAssets.ts by colorId.
 */

/** Clearly different hue families for easy band */
const CLEAR_PAIRS = [
  ["RED", "BLUE"],
  ["GREEN", "PURPLE"],
  ["YELLOW", "BLUE"],
  ["ORANGE", "TEAL"],
  ["PINK", "GREEN"],
  ["CYAN", "RED"],
  ["PURPLE", "LIME"],
  ["TEAL", "ORANGE"],
];

/** Same family: brightness / near-hue / saturation */
const TONE_PAIRS = [
  ["RED", "RED_DARK"],
  ["RED", "RED_LIGHT"],
  ["BLUE", "BLUE_DARK"],
  ["BLUE", "BLUE_DESAT"],
  ["GREEN", "GREEN_LIGHT"],
  ["ORANGE", "ORANGE_DARK"],
  ["PURPLE", "PURPLE_LIGHT"],
  ["TEAL", "TEAL_DESAT"],
  ["YELLOW", "YELLOW_DARK"],
  ["PINK", "PINK_DESAT"],
  ["RED", "ORANGE_NEAR"],
  ["BLUE", "CYAN_NEAR"],
];

/** Bridge: clearer same-family diffs */
const BRIDGE_PAIRS = [
  ["RED", "RED_DARK"],
  ["GREEN", "GREEN_LIGHT"],
  ["BLUE", "PURPLE"],
  ["ORANGE", "YELLOW"],
];

/** Hard: subtle + gradients */
const HARD_PAIRS = [
  ["RED", "RED_SOFT"],
  ["BLUE", "BLUE_SOFT"],
  ["GREEN", "GREEN_GRAD"],
  ["ORANGE", "ORANGE_GRAD"],
  ["PURPLE", "PURPLE_GRAD"],
  ["TEAL", "TEAL_GRAD"],
];

function colorRef(colorId) {
  return { render: "swatch", colorId };
}

function level(index, cols, base, odd, band, diffType, fx) {
  return {
    id: `CL-${String(index).padStart(3, "0")}`,
    index,
    theme: "color",
    grid: { cols, rows: cols },
    base: colorRef(base),
    odd: colorRef(odd),
    fx: fx ?? { board: "none", odd: "none" },
    rules: {
      timeLimitMs: 10000,
      failOnWrongTap: true,
      shuffleSeed: 7100 + index,
    },
    meta: { band, diffType },
  };
}

function pick(arr, i) {
  return arr[i % arr.length];
}

function diffTypeForPair(base, odd) {
  if (odd.includes("GRAD") || base.includes("GRAD")) return "gradient";
  if (odd.includes("DESAT") || base.includes("DESAT")) return "saturation";
  if (
    odd.includes("DARK") ||
    odd.includes("LIGHT") ||
    odd.includes("SOFT") ||
    base.includes("DARK") ||
    base.includes("LIGHT") ||
    base.includes("SOFT")
  ) {
    return "brightness";
  }
  if (odd.includes("NEAR") || base.includes("NEAR")) return "hue_near";
  return "hue_clear";
}

const levels = [];

// 1–8 Easy: clearly different hue
for (let i = 1; i <= 8; i++) {
  const cols = i <= 5 ? 3 : 4;
  const [base, odd] = pick(CLEAR_PAIRS, i - 1);
  levels.push(level(i, cols, base, odd, "easy", "hue_clear"));
}

// 9–20 Medium: brightness / near-hue / saturation
for (let i = 9; i <= 20; i++) {
  const [base, odd] = pick(TONE_PAIRS, i - 9);
  levels.push(level(i, 4, base, odd, "medium", diffTypeForPair(base, odd)));
}

// 21–24 Bridge: clearer same-family
for (let i = 21; i <= 24; i++) {
  const [base, odd] = pick(BRIDGE_PAIRS, i - 21);
  levels.push(
    level(i, 4, base, odd, "bridge", diffTypeForPair(base, odd) + "_easy"),
  );
}

// 25–30 Hard: subtle + gradient; teleport from 28
for (let i = 25; i <= 30; i++) {
  const [base, odd] = pick(HARD_PAIRS, i - 25);
  const teleport = i >= 28;
  levels.push(
    level(i, 5, base, odd, "hard", diffTypeForPair(base, odd), {
      board: "none",
      odd: teleport ? "teleport" : "none",
    }),
  );
}

if (levels.length !== 30) {
  console.error("Expected 30, got", levels.length);
  process.exit(1);
}

const out = {
  version: 1,
  theme: "color",
  difficulty: "medium",
  campaignLevels: 30,
  assetPack: {
    note: "CSS swatches resolved by colorId in colorAssets.ts — no WebP art.",
    families: [
      "RED",
      "ORANGE",
      "YELLOW",
      "LIME",
      "GREEN",
      "TEAL",
      "CYAN",
      "BLUE",
      "PURPLE",
      "PINK",
    ],
  },
  fx: ["none", "teleport"],
  defaults: { timeLimitMs: 10000, failOnWrongTap: true },
  bands: {
    "1-8": "easy — clearly different hue",
    "9-20": "medium — brightness / near-hue / saturation",
    "21-24": "bridge — clearer same-family diffs",
    "25-30": "hard — soft brightness + gradients; teleport from 28",
  },
  levels,
};

fs.mkdirSync("packages/level_data/color", { recursive: true });
fs.writeFileSync(
  "packages/level_data/color/levels_color_30.json",
  JSON.stringify(out, null, 2) + "\n",
);

const lines = [
  "# Color 30 关一览",
  "",
  "> 中等难度：明显色相 → 明度/邻近色 → 过渡 → 微差/渐变 + 换位",
  "",
  "| # | Grid | Base | Odd | Band | Diff | FX |",
  "|---|------|------|-----|------|------|----|",
];
for (const l of levels) {
  const fx =
    l.fx.board === "none" && l.fx.odd === "none"
      ? "—"
      : `${l.fx.board}/${l.fx.odd}`;
  lines.push(
    `| ${l.index} | ${l.grid.cols}×${l.grid.rows} | ${l.base.colorId} | ${l.odd.colorId} | ${l.meta.band} | ${l.meta.diffType} | ${fx} |`,
  );
}
fs.mkdirSync("docs/levels", { recursive: true });
fs.writeFileSync("docs/levels/COLOR_PAIRS_30.md", lines.join("\n") + "\n");

console.log("OK", { len: levels.length, L1: levels[0], L15: levels[14], L28: levels[27] });
