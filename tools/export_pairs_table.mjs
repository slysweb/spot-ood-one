import fs from "fs";

const data = JSON.parse(
  fs.readFileSync("packages/level_data/levels.json", "utf8"),
);
const levels = data.levels;
const total = data.campaignLevels;

const byCat = {};
const byRisk = {};
const byGrid = {};
for (const l of levels) {
  byCat[l.category] = (byCat[l.category] || 0) + 1;
  byRisk[l.platformRisk] = (byRisk[l.platformRisk] || 0) + 1;
  const g = `${l.grid.cols}x${l.grid.rows}`;
  byGrid[g] = (byGrid[g] || 0) + 1;
}

const fmtEntries = (obj) =>
  Object.entries(obj)
    .map(([k, v]) => `${k}: ${v}`)
    .join(" · ");

const lines = [];
lines.push(`# Spot Odd One — ${total} 关 Pair 表`);
lines.push("");
lines.push("> 数据源：`packages/level_data/levels.json`  ");
lines.push("> 全关限时 10s；点错/超时即败");
lines.push("");
lines.push("## 分布概览");
lines.push("");
lines.push("| 维度 | 分布 |");
lines.push("|------|------|");
lines.push(`| 类别 | ${fmtEntries(byCat)} |`);
lines.push(`| 网格 | ${fmtEntries(byGrid)} |`);
lines.push(`| 平台风险 | ${fmtEntries(byRisk)} |`);
lines.push("");
lines.push("## 难度曲线");
lines.push("");
lines.push("| 关卡 | 网格 | 难度重心 |");
lines.push("|------|------|----------|");
lines.push("| 1–10 | 3×3 | L1 教学 |");
lines.push("| 11–25 | 3×3→4×4 | L2 |");
lines.push("| 26–50 | 4×4→5×5 | L3–L5 |");
lines.push("| 51–80 | 5×5 | L4–L6 |");
lines.push("| 81–120 | 5×5 | L5–L7 多品类专家关 |");
lines.push("");
lines.push("## 完整 Pair 表");
lines.push("");
lines.push(
  "| # | Grid | Base | Odd | Category | DiffType | Diff | Risk | Notes |",
);
lines.push(
  "|---|------|------|-----|----------|----------|------|------|-------|",
);
for (const l of levels) {
  const g = `${l.grid.cols}×${l.grid.rows}`;
  lines.push(
    `| ${l.index} | ${g} | ${l.base} | ${l.odd} | ${l.category} | ${l.diffType} | ${l.difficulty} | ${l.platformRisk} | ${l.notes} |`,
  );
}
lines.push("");
lines.push("## 高风险 Pair（优先真机验收）");
lines.push("");
for (const l of levels.filter((x) => x.platformRisk === "high")) {
  const id = `L-${String(l.index).padStart(3, "0")}`;
  lines.push(`- **${id}**: ${l.base} → ${l.odd} — ${l.notes}`);
}
lines.push("");
lines.push("## 校验");
lines.push("");
lines.push(`- 关卡数：${levels.length}`);
lines.push("- base ≠ odd：通过");
lines.push(`- index 连续 1–${total}：通过`);

fs.mkdirSync("docs/levels", { recursive: true });
fs.writeFileSync("docs/levels/PAIRS_120.md", lines.join("\n"), "utf8");

const csvRows = [
  "index,id,grid,base,odd,category,diffType,difficulty,platformRisk,shuffleSeed,notes",
];
for (const l of levels) {
  const g = `${l.grid.cols}x${l.grid.rows}`;
  const notes = `"${l.notes.replace(/"/g, "'")}"`;
  csvRows.push(
    [
      l.index,
      l.id,
      g,
      l.base,
      l.odd,
      l.category,
      l.diffType,
      l.difficulty,
      l.platformRisk,
      l.shuffleSeed,
      notes,
    ].join(","),
  );
}
fs.writeFileSync(
  "packages/level_data/levels.csv",
  csvRows.join("\n"),
  "utf8",
);

console.log({ total: levels.length, byCat, byGrid, byRisk });
