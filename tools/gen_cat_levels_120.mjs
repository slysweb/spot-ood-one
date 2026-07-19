import fs from "fs";

/** Face-category cats (emoji) */
const FACE = ["😺", "😸", "😻", "😼"];
/** Body-category cats */
const BODY = ["🐈", "🐈‍⬛"];
/** Classic head */
const CLASSIC = ["🐱"];
const ALL_CATS = [...CLASSIC, ...FACE, ...BODY];

const OTHER = ["🐶", "🐰", "🐻", "🦊", "🐼", "🐷", "🐸", "🐵", "🐯", "🐨"];

const CAT_IDS = ["C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08"];
const TWINS = {
  C01: "C01b",
  C02: "C02b",
  C03: "C03b",
  C05: "C05b",
};
const FLIP_OK = new Set(["C01", "C04", "C05", "C07", "C08"]);

function emojiRef(emoji) {
  return { render: "emoji", emoji, transform: "none" };
}

function imageRef(catId, transform = "none") {
  return { render: "image", catId, transform };
}

function level(index, cols, base, odd, band, diffType, fx) {
  return {
    id: `C-${String(index).padStart(3, "0")}`,
    index,
    theme: "cat",
    grid: { cols, rows: cols },
    base,
    odd,
    fx: fx ?? { board: "none", odd: "none" },
    rules: {
      timeLimitMs: 10000,
      failOnWrongTap: true,
      shuffleSeed: 5000 + index,
    },
    meta: { band, diffType },
  };
}

function pick(arr, i) {
  return arr[i % arr.length];
}

function otherAnimal(i) {
  return pick(OTHER, i);
}

function transformHard(id, i) {
  const pool = FLIP_OK.has(id)
    ? ["hue40", "darker", "scale88", "flipX", "rot30", "hue40+scale88"]
    : ["hue40", "darker", "scale88", "rot30", "hue40+scale88", "scale75"];
  return pool[i % pool.length];
}

function transformHell(id, i) {
  const pool = FLIP_OK.has(id)
    ? ["hue40", "scale75", "flipX", "darker", "rot180", "scale125"]
    : ["hue40", "scale75", "darker", "rot180", "scale125", "hue40+scale88"];
  return pool[i % pool.length];
}

function transformTeleport(id, i) {
  const pool = FLIP_OK.has(id)
    ? ["scale75", "scale125", "rot180", "hue40", "flipX", "darker"]
    : ["scale75", "scale125", "rot180", "hue40", "darker", "scale75+hue40"];
  return pool[i % pool.length];
}

const levels = [];

// 1–30 Easy: cats + one other animal, 3x3
for (let i = 1; i <= 30; i++) {
  const cat = pick(ALL_CATS, i - 1);
  levels.push(
    level(
      i,
      3,
      emojiRef(cat),
      emojiRef(otherAnimal(i)),
      "easy",
      "cat_vs_animal",
      { board: "none", odd: "none" },
    ),
  );
}

// 31–50 Easy+: still cat vs animal, 3→4
for (let i = 31; i <= 50; i++) {
  const cols = i <= 40 ? 3 : 4;
  const cat = pick(ALL_CATS, i + 3);
  levels.push(
    level(
      i,
      cols,
      emojiRef(cat),
      emojiRef(otherAnimal(i + 5)),
      "easy_plus",
      "cat_vs_animal",
      { board: "none", odd: "none" },
    ),
  );
}

// 51–80 Medium: same cat category vs different cat category
for (let i = 51; i <= 80; i++) {
  const cols = 4;
  const useFaceBase = i % 2 === 0;
  const basePool = useFaceBase ? FACE : BODY;
  const oddPool = useFaceBase ? BODY : FACE;
  const base = pick(basePool, i);
  let odd = pick(oddPool, i + 2);
  // occasional classic head as odd among faces
  if (i % 5 === 0 && useFaceBase) odd = pick(CLASSIC, i);
  levels.push(
    level(
      i,
      cols,
      emojiRef(base),
      emojiRef(odd),
      "medium",
      "cat_category",
      { board: "none", odd: "none" },
    ),
  );
}

// 81–100 Hard: same illustrated cat, twin decoration OR color transform
for (let i = 81; i <= 100; i++) {
  const id = pick(CAT_IDS, i - 81);
  const twin = TWINS[id];
  if (twin && i % 3 === 0) {
    levels.push(
      level(
        i,
        5,
        imageRef(id),
        imageRef(twin),
        "hard",
        "decoration_or_fur",
        { board: "none", odd: "none" },
      ),
    );
  } else {
    levels.push(
      level(
        i,
        5,
        imageRef(id),
        imageRef(id, transformHard(id, i)),
        "hard",
        "fur_tint_or_pose",
        { board: "none", odd: "none" },
      ),
    );
  }
}

// 101–120 Hell: twins / micro + teleport on even
for (let i = 101; i <= 120; i++) {
  const id = pick(CAT_IDS, i - 101);
  const twin = TWINS[id];
  if (i >= 113 && twin) {
    levels.push(
      level(i, 5, imageRef(id), imageRef(twin), "hell", "twin", {
        board: "none",
        odd: "teleport",
      }),
    );
  } else if (i % 2 === 0) {
    levels.push(
      level(
        i,
        5,
        imageRef(id),
        imageRef(id, transformTeleport(id, i)),
        "hell",
        "teleport_overt",
        { board: "none", odd: "teleport" },
      ),
    );
  } else {
    levels.push(
      level(
        i,
        5,
        imageRef(id),
        imageRef(id, transformHell(id, i)),
        "hell",
        "hard_diff",
        { board: "none", odd: "none" },
      ),
    );
  }
}

if (levels.length !== 120) {
  console.error("Expected 120, got", levels.length);
  process.exit(1);
}

const out = {
  version: 1,
  theme: "cat",
  campaignLevels: 120,
  assetPack: {
    emojiCats: ALL_CATS,
    emojiOthers: OTHER,
    requiredImages: CAT_IDS,
    optionalTwins: Object.values(TWINS),
    note: "1–80 emoji; 81–120 illustrated cats + twins/transforms",
  },
  transforms: [
    "none",
    "flipX",
    "rot30",
    "rot180",
    "scale75",
    "scale88",
    "scale125",
    "hue40",
    "darker",
    "hue40+scale88",
    "scale75+hue40",
  ],
  fx: ["none", "teleport"],
  defaults: { timeLimitMs: 10000, failOnWrongTap: true },
  bands: {
    "1-30": "easy — cats vs other animal, 3x3 emoji",
    "31-50": "easy_plus — cats vs animal, 3x3→4x4",
    "51-80": "medium — cat category mix (face vs body)",
    "81-100": "hard — same cat, fur tint / decoration twin",
    "101-120": "hell — subtle + teleport",
  },
  levels,
};

fs.mkdirSync("packages/level_data/cat", { recursive: true });
fs.writeFileSync(
  "packages/level_data/cat/levels_cat_120.json",
  JSON.stringify(out, null, 2) + "\n",
);

const lines = [
  "# Cats 120 关一览",
  "",
  "> v1：1–80 emoji；81+ 精致猫图 + twin/变换；偶数地狱关 teleport",
  "",
  "| # | Grid | Base | Odd | Band | FX |",
  "|---|------|------|-----|------|----|",
];
for (const l of levels) {
  const fmt = (r) =>
    r.render === "emoji"
      ? r.emoji
      : `${r.catId}${r.transform && r.transform !== "none" ? `:${r.transform}` : ""}`;
  const fx =
    l.fx.board === "none" && l.fx.odd === "none"
      ? "—"
      : `${l.fx.board}/${l.fx.odd}`;
  lines.push(
    `| ${l.index} | ${l.grid.cols}×${l.grid.rows} | ${fmt(l.base)} | ${fmt(l.odd)} | ${l.meta.band} | ${fx} |`,
  );
}
fs.writeFileSync("docs/levels/CAT_PAIRS_120.md", lines.join("\n") + "\n");

console.log("OK", {
  len: levels.length,
  L1: levels[0],
  L55: levels[54],
  L85: levels[84],
  L110: levels[109],
});
