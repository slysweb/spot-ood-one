import fs from "fs";

const DOG_IDS = ["D01", "D02", "D03", "D04", "D05", "D06", "D07", "D08"];

const DOG_GROUPS = {
  fluffy: ["D01", "D05"],
  short: ["D02", "D08"],
  spotted: ["D03", "D06"],
  northern: ["D04", "D07"],
};
const GROUP_KEYS = Object.keys(DOG_GROUPS);

/** Non-dog animals (reuse cat pack art via dogAssets path map) */
const OTHER_IDS = [
  "A02",
  "A03",
  "A04",
  "A05",
  "A06",
  "A07",
  "A08",
  "A09",
  "A10",
  "C01",
  "C03",
  "C05",
];

const TWINS = {
  D01: "D01b",
  D02: "D02b",
  D05: "D05b",
  D07: "D07b",
};

const FLIP_OK = new Set(["D01", "D02", "D03", "D06", "D07", "D08"]);

function imageRef(id, transform = "none") {
  return { render: "image", dogId: id, transform };
}

function level(index, cols, base, odd, band, diffType, fx) {
  return {
    id: `D-${String(index).padStart(3, "0")}`,
    index,
    theme: "dog",
    grid: { cols, rows: cols },
    base,
    odd,
    fx: fx ?? { board: "none", odd: "none" },
    rules: {
      timeLimitMs: 10000,
      failOnWrongTap: true,
      shuffleSeed: 7000 + index,
    },
    meta: { band, diffType },
  };
}

function pick(arr, i) {
  return arr[i % arr.length];
}

function otherGroup(key, i) {
  const others = GROUP_KEYS.filter((k) => k !== key);
  return others[i % others.length];
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

for (let i = 1; i <= 30; i++) {
  levels.push(
    level(
      i,
      3,
      imageRef(pick(DOG_IDS, i - 1)),
      imageRef(pick(OTHER_IDS, i)),
      "easy",
      "dog_vs_animal",
      { board: "none", odd: "none" },
    ),
  );
}

for (let i = 31; i <= 50; i++) {
  const cols = i <= 40 ? 3 : 4;
  levels.push(
    level(
      i,
      cols,
      imageRef(pick(DOG_IDS, i + 2)),
      imageRef(pick(OTHER_IDS, i + 4)),
      "easy_plus",
      "dog_vs_animal",
      { board: "none", odd: "none" },
    ),
  );
}

for (let i = 51; i <= 80; i++) {
  const baseKey = pick(GROUP_KEYS, i);
  const oddKey = otherGroup(baseKey, i + 3);
  levels.push(
    level(
      i,
      4,
      imageRef(pick(DOG_GROUPS[baseKey], i)),
      imageRef(pick(DOG_GROUPS[oddKey], i + 1)),
      "medium",
      "dog_category",
      { board: "none", odd: "none" },
    ),
  );
}

for (let i = 81; i <= 100; i++) {
  const id = pick(DOG_IDS, i - 81);
  const twin = TWINS[id];
  if (twin && i % 3 === 0) {
    levels.push(
      level(i, 5, imageRef(id), imageRef(twin), "hard", "decoration_or_fur", {
        board: "none",
        odd: "none",
      }),
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

for (let i = 101; i <= 120; i++) {
  const id = pick(DOG_IDS, i - 101);
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
  theme: "dog",
  campaignLevels: 120,
  assetPack: {
    requiredDogs: DOG_IDS,
    optionalTwins: Object.values(TWINS),
    borrowedOthers: OTHER_IDS,
    dogGroups: DOG_GROUPS,
    note: "All illustrated; non-dog odds reuse /cats assets; dogs are 1024x1024",
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
    "1-30": "easy — dog vs other animal, 3x3",
    "31-50": "easy_plus — dog vs animal, 3→4",
    "51-80": "medium — dog category mix",
    "81-100": "hard — same dog tint/twin",
    "101-120": "hell — subtle + teleport",
  },
  levels,
};

fs.mkdirSync("packages/level_data/dog", { recursive: true });
fs.writeFileSync(
  "packages/level_data/dog/levels_dog_120.json",
  JSON.stringify(out, null, 2) + "\n",
);

const lines = [
  "# Dogs 120 关一览",
  "",
  "> v1：全关插画；异类动物复用 cats 资源",
  "",
  "| # | Grid | Base | Odd | Band | FX |",
  "|---|------|------|-----|------|----|",
];
for (const l of levels) {
  const fmt = (r) =>
    `${r.dogId}${r.transform && r.transform !== "none" ? `:${r.transform}` : ""}`;
  const fx =
    l.fx.board === "none" && l.fx.odd === "none"
      ? "—"
      : `${l.fx.board}/${l.fx.odd}`;
  lines.push(
    `| ${l.index} | ${l.grid.cols}×${l.grid.rows} | ${fmt(l.base)} | ${fmt(l.odd)} | ${l.meta.band} | ${fx} |`,
  );
}
fs.writeFileSync("docs/levels/DOG_PAIRS_120.md", lines.join("\n") + "\n");

console.log("OK", { len: levels.length, L1: levels[0], L55: levels[54] });
