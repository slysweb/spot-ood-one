import fs from "fs";

/**
 * Number pack — easy, 30 levels.
 * Bias toward digit/letter look-alikes (0/O, 5/S, 8/B, 1/l, 6/9).
 * Warm: related digits → Main: classic twins → Bridge: slightly easier → Hard: closest + teleport
 */

/** Mild related digit shapes */
const WARM_PAIRS = [
  ["1", "7"],
  ["2", "5"],
  ["3", "8"],
  ["4", "9"],
  ["6", "8"],
  ["0", "8"],
];

/** Classic digit / letter look-alikes */
const LOOKALIKE_PAIRS = [
  ["0", "O"],
  ["O", "0"],
  ["5", "S"],
  ["S", "5"],
  ["8", "B"],
  ["B", "8"],
  ["1", "l"],
  ["l", "1"],
  ["1", "I"],
  ["6", "9"],
  ["9", "6"],
  ["2", "Z"],
];

/** Bridge: slightly easier digit confusions */
const BRIDGE_PAIRS = [
  ["3", "5"],
  ["4", "7"],
  ["6", "8"],
  ["0", "6"],
];

/** Hardest twins */
const HARD_PAIRS = [
  ["0", "O"],
  ["5", "S"],
  ["1", "l"],
  ["8", "B"],
  ["6", "9"],
  ["O", "0"],
];

function glyphRef(glyphId) {
  return { render: "glyph", glyphId };
}

function level(index, cols, base, odd, band, diffType, fx) {
  return {
    id: `NM-${String(index).padStart(3, "0")}`,
    index,
    theme: "number",
    grid: { cols, rows: cols },
    base: glyphRef(base),
    odd: glyphRef(odd),
    fx: fx ?? { board: "none", odd: "none" },
    rules: {
      timeLimitMs: 10000,
      failOnWrongTap: true,
      shuffleSeed: 9200 + index,
    },
    meta: { band, diffType },
  };
}

function pick(arr, i) {
  return arr[i % arr.length];
}

const levels = [];

// 1–6 Warm: related digits on 3×3
for (let i = 1; i <= 6; i++) {
  const [base, odd] = pick(WARM_PAIRS, i - 1);
  levels.push(level(i, 3, base, odd, "easy", "shape_near"));
}

// 7–18 Main look-alikes; grid steps 3→4 gently
for (let i = 7; i <= 18; i++) {
  const cols = i <= 10 ? 3 : 4;
  const [base, odd] = pick(LOOKALIKE_PAIRS, i - 7);
  levels.push(level(i, cols, base, odd, "medium", "lookalike"));
}

// 19–22 Bridge
for (let i = 19; i <= 22; i++) {
  const [base, odd] = pick(BRIDGE_PAIRS, i - 19);
  levels.push(level(i, 4, base, odd, "bridge", "shape_near_easy"));
}

// 23–30 Hard; 4×4 then 5×5; teleport from 28
for (let i = 23; i <= 30; i++) {
  const cols = i <= 25 ? 4 : 5;
  const [base, odd] = pick(HARD_PAIRS, i - 23);
  const teleport = i >= 28;
  levels.push(
    level(i, cols, base, odd, "hard", "lookalike", {
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
  theme: "number",
  difficulty: "easy",
  campaignLevels: 30,
  assetPack: {
    note: "Runtime glyphs (CSS text) — no WebP. Easy short pack biased to look-alikes: 0/O, 5/S, 8/B, 1/l, 6/9.",
    glyphs: [
      ...new Set(
        levels.flatMap((l) => [l.base.glyphId, l.odd.glyphId]),
      ),
    ].sort(),
  },
  fx: ["none", "teleport"],
  defaults: { timeLimitMs: 10000, failOnWrongTap: true },
  bands: {
    "1-6": "warm — related digit shapes on 3×3",
    "7-18": "main — digit/letter look-alikes (0/O, 5/S, 8/B); 3×3→4×4",
    "19-22": "bridge — slightly easier digit confusions",
    "23-30": "hard — closest twins; 5×5 from 26; teleport from 28",
  },
  levels,
};

fs.mkdirSync("packages/level_data/number", { recursive: true });
fs.writeFileSync(
  "packages/level_data/number/levels_number_30.json",
  JSON.stringify(out, null, 2) + "\n",
);

const lines = [
  "# Number 30 关一览",
  "",
  "> 简单短包：相近数字热身 → 经典易混（0/O · 5/S · 8/B · 1/l · 6/9）→ 过渡 → 最强易混 + 换位",
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
    `| ${l.index} | ${l.grid.cols}×${l.grid.rows} | ${l.base.glyphId} | ${l.odd.glyphId} | ${l.meta.band} | ${l.meta.diffType} | ${fx} |`,
  );
}
fs.mkdirSync("docs/levels", { recursive: true });
fs.writeFileSync("docs/levels/NUMBER_PAIRS_30.md", lines.join("\n") + "\n");

console.log("OK", {
  len: levels.length,
  L1: levels[0],
  L8: levels[7],
  L28: levels[27],
});
