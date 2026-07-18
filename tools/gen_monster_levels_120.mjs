import fs from "fs";

const IDS = [
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
];

/**
 * Flip only works when silhouette is clearly left/right asymmetric.
 * M01/M03/M07/M09 look nearly mirrored — never flip-only.
 */
const FLIP_OK = new Set(["M02", "M04", "M06", "M08", "M10", "M11", "M12"]);

const TWINS = {
  M01: "M01b",
  M05: "M05b",
  M06: "M06b",
  M10: "M10b",
};

function differentPair(i) {
  const base = IDS[i % IDS.length];
  let odd = IDS[(i + 3 + Math.floor(i / 4)) % IDS.length];
  if (base === odd) odd = IDS[(i + 5) % IDS.length];
  return { base, odd };
}

/** Strong, readable transforms for early “same monster” lessons */
function transformObvious(i) {
  return ["rot45", "scale125", "rot180", "hue40", "scale75", "darker"][i % 6];
}

function transformMedium(id, i) {
  const pool = FLIP_OK.has(id)
    ? ["rot45", "scale125", "flipX", "scale75", "hue40", "rot180"]
    : ["rot45", "scale125", "scale75", "hue40", "rot180", "darker"];
  return pool[i % pool.length];
}

function transformHard(id, i) {
  const pool = FLIP_OK.has(id)
    ? ["rot30", "hue40", "scale88", "flipX", "darker", "hue40+rot30"]
    : ["rot30", "hue40", "scale88", "darker", "hue40+rot30", "scale125"];
  return pool[i % pool.length];
}

/**
 * Hell diffs must stay readable on 5×5.
 * Avoid small rotations — they look like wobble noise.
 */
function transformHell(id, i) {
  const pool = FLIP_OK.has(id)
    ? ["hue40", "scale75", "flipX", "darker", "rot180", "scale125"]
    : ["hue40", "scale75", "darker", "rot180", "scale125", "hue40+scale88"];
  return pool[i % pool.length];
}

/** Teleport levels: only size / flip / upside-down / strong hue (never mid-angle rot) */
function transformTeleport(id, i) {
  const pool = FLIP_OK.has(id)
    ? ["scale75", "scale125", "rot180", "hue40", "flipX", "darker"]
    : ["scale75", "scale125", "rot180", "hue40", "darker", "scale75+hue40"];
  return pool[i % pool.length];
}

function level(index, cols, baseId, oddId, transform, band, diffType, fx) {
  return {
    id: `M-${String(index).padStart(3, "0")}`,
    index,
    theme: "monster",
    grid: { cols, rows: cols },
    base: { monsterId: baseId, transform: "none" },
    odd: { monsterId: oddId, transform },
    fx: fx ?? { board: "none", odd: "none" },
    rules: {
      timeLimitMs: 10000,
      failOnWrongTap: true,
      shuffleSeed: 3000 + index,
    },
    meta: { band, diffType },
  };
}

const levels = [];

// 1–20 Easy 3x3 different
for (let i = 1; i <= 20; i++) {
  const { base, odd } = differentPair(i - 1);
  levels.push(
    level(i, 3, base, odd, "none", "easy", "different", {
      board: "none",
      odd: "none",
    }),
  );
}

// 21–45 Easy+ STILL different monsters (no same-art transforms yet)
for (let i = 21; i <= 45; i++) {
  const cols = i <= 30 ? 3 : 4;
  const { base, odd } = differentPair(i + 7);
  levels.push(
    level(i, cols, base, odd, "none", "easy_plus", "different", {
      board: "none",
      odd: "none",
    }),
  );
}

// 46–60 Introduce strong same-monster transforms (very readable)
for (let i = 46; i <= 60; i++) {
  const id = IDS[(i - 46) % IDS.length];
  levels.push(
    level(i, 4, id, id, transformObvious(i), "medium", "obvious_transform", {
      board: "none",
      odd: "none",
    }),
  );
}

// 61–80 Medium
for (let i = 61; i <= 80; i++) {
  const id = IDS[(i - 61) % IDS.length];
  levels.push(
    level(i, 4, id, id, transformMedium(id, i), "medium", "transform", {
      board: "none",
      odd: "none",
    }),
  );
}

// 81–100 Hard 5x5 (no wobble — it hides rotation/size cues)
for (let i = 81; i <= 100; i++) {
  const id = IDS[(i - 81) % IDS.length];
  levels.push(
    level(i, 5, id, id, transformHard(id, i), "hard", "subtle", {
      board: "none",
      odd: "none",
    }),
  );
}

// 101–120 Hell — readable 5×5; teleport without board wobble
for (let i = 101; i <= 120; i++) {
  const id = IDS[(i - 101) % IDS.length];
  const twin = TWINS[id];
  if (i >= 115 && twin) {
    levels.push(
      level(i, 5, id, twin, "none", "hell", "twin", {
        board: "none",
        odd: "teleport",
      }),
    );
  } else if (i % 2 === 0) {
    levels.push(
      level(i, 5, id, id, transformTeleport(id, i), "hell", "teleport_overt", {
        board: "none",
        odd: "teleport",
      }),
    );
  } else {
    levels.push(
      level(i, 5, id, id, transformHell(id, i), "hell", "hard_diff", {
        board: "none",
        odd: "none",
      }),
    );
  }
}

if (levels.length !== 120) {
  console.error("Expected 120, got", levels.length);
  process.exit(1);
}

const out = {
  version: 4,
  theme: "monster",
  campaignLevels: 120,
  assetPack: {
    required: IDS,
    optionalTwins: Object.values(TWINS),
    note: "1–45 different; transforms from 46; hell uses overt size/hue/flip/180° — no wobble+tilt",
  },
  transforms: [
    "none",
    "flipX",
    "rot12",
    "rot20",
    "rot30",
    "rot45",
    "rot180",
    "scale75",
    "scale88",
    "scale112",
    "scale125",
    "hue15",
    "hue30",
    "hue40",
    "darker",
    "flipX+rot20",
    "hue40+rot30",
    "hue40+scale88",
    "scale75+hue40",
    "flipX+hue30",
    "scale88+hue30",
  ],
  fx: ["none", "wobble", "teleport"],
  defaults: { timeLimitMs: 10000, failOnWrongTap: true },
  bands: {
    "1-20": "easy — different monster, 3x3",
    "21-45": "easy_plus — different monsters only, 3x3→4x4",
    "46-60": "medium — strong same-monster transform",
    "61-80": "medium — readable transforms",
    "81-100": "hard — 5x5 readable transforms",
    "101-120": "hell — strong diffs; teleport on even levels (no board wobble)",
  },
  levels,
};

fs.mkdirSync("packages/level_data/monster", { recursive: true });
fs.writeFileSync(
  "packages/level_data/monster/levels_monster_120.json",
  JSON.stringify(out, null, 2) + "\n",
);

const lines = [
  "# Monster 120 关一览",
  "",
  "> v4：地狱关去掉全盘晃动；换位关只用缩放/翻转/倒立/强色差",
  "",
  "| # | Grid | Base | Odd | Transform | Band | FX |",
  "|---|------|------|-----|-----------|------|----|",
];
for (const l of levels) {
  const fx =
    l.fx.board === "none" && l.fx.odd === "none"
      ? "—"
      : `${l.fx.board}/${l.fx.odd}`;
  lines.push(
    `| ${l.index} | ${l.grid.cols}×${l.grid.rows} | ${l.base.monsterId} | ${l.odd.monsterId} | ${l.odd.transform} | ${l.meta.band} | ${fx} |`,
  );
}
fs.writeFileSync("docs/levels/MONSTER_PAIRS_120.md", lines.join("\n") + "\n");

console.log("OK", {
  len: levels.length,
  L114: levels[113],
});
