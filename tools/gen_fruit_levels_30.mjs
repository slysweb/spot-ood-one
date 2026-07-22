import fs from "fs";

/**
 * Fruit pack — medium, 30 levels.
 * Easy: different category / silhouette
 * Medium: look-alike pairs (shape/category confusion)
 * Bridge: clearer shape/category again
 * Hard: closest look-alikes + teleport
 */

const FRUIT_IDS = [
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
];

/** Clearly different silhouette / category */
const CLEAR_PAIRS = [
  ["R01", "R09"], // apple / banana
  ["R05", "R10"], // orange / strawberry
  ["R07", "R12"], // lemon / grapes
  ["R03", "R13"], // pear / watermelon
  ["R11", "R14"], // cherry / pineapple
  ["R01", "R15"], // apple / kiwi
  ["R09", "R04"], // banana / peach
  ["R16", "R12"], // mango / grapes
];

/** Look-alike / easily confused */
const LOOKALIKE_PAIRS = [
  ["R01", "R02"], // red / green apple
  ["R05", "R06"], // orange / tangerine
  ["R07", "R08"], // lemon / lime
  ["R01", "R04"], // apple / peach
  ["R01", "R03"], // apple / pear
  ["R11", "R10"], // cherry / strawberry
  ["R12", "R11"], // grapes / cherry
  ["R05", "R07"], // orange / lemon (citrus shape)
  ["R02", "R08"], // green apple / lime
  ["R04", "R16"], // peach / mango
  ["R03", "R16"], // pear / mango
  ["R06", "R05"], // tangerine / orange (swap)
];

/** Bridge: clearer category/shape */
const BRIDGE_PAIRS = [
  ["R01", "R09"],
  ["R05", "R10"],
  ["R07", "R13"],
  ["R11", "R14"],
];

/** Hard: closest look-alikes */
const HARD_PAIRS = [
  ["R01", "R02"],
  ["R07", "R08"],
  ["R05", "R06"],
  ["R01", "R04"],
  ["R02", "R08"],
  ["R05", "R07"],
];

function imageRef(id, transform = "none") {
  return { render: "image", fruitId: id, transform };
}

function level(index, cols, base, odd, band, diffType, fx) {
  return {
    id: `FR-${String(index).padStart(3, "0")}`,
    index,
    theme: "fruit",
    grid: { cols, rows: cols },
    base: imageRef(base),
    odd: imageRef(odd),
    fx: fx ?? { board: "none", odd: "none" },
    rules: {
      timeLimitMs: 10000,
      failOnWrongTap: true,
      shuffleSeed: 8200 + index,
    },
    meta: { band, diffType },
  };
}

function pick(arr, i) {
  return arr[i % arr.length];
}

const levels = [];

// 1–8 Easy
for (let i = 1; i <= 8; i++) {
  const cols = i <= 5 ? 3 : 4;
  const [base, odd] = pick(CLEAR_PAIRS, i - 1);
  levels.push(level(i, cols, base, odd, "easy", "category_shape"));
}

// 9–20 Medium look-alikes
for (let i = 9; i <= 20; i++) {
  const [base, odd] = pick(LOOKALIKE_PAIRS, i - 9);
  levels.push(level(i, 4, base, odd, "medium", "lookalike"));
}

// 21–24 Bridge
for (let i = 21; i <= 24; i++) {
  const [base, odd] = pick(BRIDGE_PAIRS, i - 21);
  levels.push(level(i, 4, base, odd, "bridge", "category_shape_easy"));
}

// 25–30 Hard + teleport from 28
for (let i = 25; i <= 30; i++) {
  const [base, odd] = pick(HARD_PAIRS, i - 25);
  const teleport = i >= 28;
  levels.push(
    level(i, 5, base, odd, "hard", "lookalike", {
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
  theme: "fruit",
  difficulty: "medium",
  campaignLevels: 30,
  assetPack: {
    required: FRUIT_IDS,
    note: "Medium short pack: 8 easy + 12 lookalike + 4 bridge + 6 hard/teleport. Cute cartoon WebP in public/fruits/.",
  },
  fx: ["none", "teleport"],
  defaults: { timeLimitMs: 10000, failOnWrongTap: true },
  bands: {
    "1-8": "easy — different category / silhouette",
    "9-20": "medium — look-alike fruits (shape/category)",
    "21-24": "bridge — clearer category/shape",
    "25-30": "hard — closest look-alikes on 5×5; teleport from 28",
  },
  levels,
};

fs.mkdirSync("packages/level_data/fruit", { recursive: true });
fs.writeFileSync(
  "packages/level_data/fruit/levels_fruit_30.json",
  JSON.stringify(out, null, 2) + "\n",
);

const lines = [
  "# Fruit 30 关一览",
  "",
  "> 中等难度：类别/剪影 → 易错认近亲 → 过渡 → 近亲 + 换位",
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
    `| ${l.index} | ${l.grid.cols}×${l.grid.rows} | ${l.base.fruitId} | ${l.odd.fruitId} | ${l.meta.band} | ${l.meta.diffType} | ${fx} |`,
  );
}
fs.mkdirSync("docs/levels", { recursive: true });
fs.writeFileSync("docs/levels/FRUIT_PAIRS_30.md", lines.join("\n") + "\n");

console.log("OK", { len: levels.length, L1: levels[0], L12: levels[11], L28: levels[27] });
