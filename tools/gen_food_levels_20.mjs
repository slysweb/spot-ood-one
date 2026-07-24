import fs from "fs";

/**
 * Food pack — hard, 20 levels.
 * One unique food per level; base vs twin differ by a tiny prop only.
 * Warm readable twins → main denser grids → pressure + teleport.
 */

const PAIRS = [
  ["F01", "F01b"], // pizza ± strawberry
  ["F02", "F02b"], // ice cream ± cherry
  ["F03", "F03b"], // cookie ± chips
  ["F04", "F04b"], // milk ± straw
  ["F05", "F05b"], // butter bread ± butter
  ["F06", "F06b"], // chocolate ± almond
  ["F07", "F07b"], // cheese ± olive
  ["F08", "F08b"], // burger ± sesame
  ["F09", "F09b"], // hot dog ± ketchup
  ["F10", "F10b"], // donut ± sprinkles
  ["F11", "F11b"], // cake ± candle
  ["F12", "F12b"], // cupcake ± cherry
  ["F13", "F13b"], // sushi ± wasabi
  ["F14", "F14b"], // ramen ± egg
  ["F15", "F15b"], // taco ± cilantro
  ["F16", "F16b"], // fries ± ketchup
  ["F17", "F17b"], // popcorn ± caramel
  ["F18", "F18b"], // pancake ± blueberry
  ["F19", "F19b"], // onigiri ± sesame
  ["F20", "F20b"], // pudding ± cream
];

const NAMES = {
  F01: "pizza",
  F02: "ice cream",
  F03: "cookie",
  F04: "milk",
  F05: "butter bread",
  F06: "chocolate",
  F07: "cheese",
  F08: "hamburger",
  F09: "hot dog",
  F10: "donut",
  F11: "cake",
  F12: "cupcake",
  F13: "sushi",
  F14: "ramen",
  F15: "taco",
  F16: "fries",
  F17: "popcorn",
  F18: "pancake",
  F19: "onigiri",
  F20: "pudding",
};

function imageRef(id) {
  return { render: "image", foodId: id, transform: "none" };
}

function level(index, cols, base, odd, band, diffType, fx) {
  return {
    id: `FD-${String(index).padStart(3, "0")}`,
    index,
    theme: "food",
    grid: { cols, rows: cols },
    base: imageRef(base),
    odd: imageRef(odd),
    fx: fx ?? { board: "none", odd: "none" },
    rules: {
      timeLimitMs: 10000,
      failOnWrongTap: true,
      shuffleSeed: 9300 + index,
    },
    meta: {
      band,
      diffType,
      food: NAMES[base] ?? NAMES[base.replace(/b$/i, "")] ?? base,
    },
  };
}

if (PAIRS.length !== 20) {
  console.error("Expected 20 unique food pairs, got", PAIRS.length);
  process.exit(1);
}

const levels = [];

// 1–5 Warm: readable twin detail on 4×4
for (let i = 1; i <= 5; i++) {
  const [base, odd] = PAIRS[i - 1];
  levels.push(level(i, 4, base, odd, "warm", "twin_prop"));
}

// 6–14 Main: still twin props; grid steps to 5×5
for (let i = 6; i <= 14; i++) {
  const cols = i <= 9 ? 4 : 5;
  const [base, odd] = PAIRS[i - 1];
  // Swap some odds/bases so twin can be the majority sometimes
  const swap = i % 3 === 0;
  levels.push(
    level(
      i,
      cols,
      swap ? odd : base,
      swap ? base : odd,
      "main",
      "twin_prop",
    ),
  );
}

// 15–20 Pressure: 5×5; teleport from 17
for (let i = 15; i <= 20; i++) {
  const [base, odd] = PAIRS[i - 1];
  const teleport = i >= 17;
  const swap = i % 2 === 0;
  levels.push(
    level(i, 5, swap ? odd : base, swap ? base : odd, "hard", "twin_prop", {
      board: "none",
      odd: teleport ? "teleport" : "none",
    }),
  );
}

if (levels.length !== 20) {
  console.error("Expected 20, got", levels.length);
  process.exit(1);
}

const usedFoods = new Set(levels.map((l) => l.meta.food));
if (usedFoods.size !== 20) {
  console.error("Foods must be unique per level, got", [...usedFoods]);
  process.exit(1);
}

const out = {
  version: 1,
  theme: "food",
  difficulty: "hard",
  campaignLevels: 20,
  assetPack: {
    required: PAIRS.flat(),
    note: "Hard short pack: 20 unique foods, each base vs twin prop. Kawaii WebP in public/foods/.",
  },
  fx: ["none", "teleport"],
  defaults: { timeLimitMs: 10000, failOnWrongTap: true },
  bands: {
    "1-5": "warm — twin prop on 4×4 (still readable)",
    "6-14": "main — twin prop; 5×5 from 10",
    "15-20": "hard — densest grid; teleport from 17",
  },
  levels,
};

fs.mkdirSync("packages/level_data/food", { recursive: true });
fs.writeFileSync(
  "packages/level_data/food/levels_food_20.json",
  JSON.stringify(out, null, 2) + "\n",
);

const lines = [
  "# Food 20 关一览",
  "",
  "> 困难短包：每关一种食物；base / twin 仅差一个小部件（如披萨有无草莓）",
  "",
  "| # | Grid | Food | Base | Odd | Band | Diff | FX |",
  "|---|------|------|------|-----|------|------|----|",
];
for (const l of levels) {
  const fx =
    l.fx.board === "none" && l.fx.odd === "none"
      ? "—"
      : `${l.fx.board}/${l.fx.odd}`;
  lines.push(
    `| ${l.index} | ${l.grid.cols}×${l.grid.rows} | ${l.meta.food} | ${l.base.foodId} | ${l.odd.foodId} | ${l.meta.band} | ${l.meta.diffType} | ${fx} |`,
  );
}
fs.mkdirSync("docs/levels", { recursive: true });
fs.writeFileSync("docs/levels/FOOD_PAIRS_20.md", lines.join("\n") + "\n");

console.log("OK", {
  len: levels.length,
  foods: usedFoods.size,
  L1: levels[0],
  L17: levels[16],
});
