import fs from "fs";

const srcPath = "packages/level_data/levels.json";
const fallback = "packages/level_data/levels_80.json";
const raw = fs.existsSync(srcPath)
  ? fs.readFileSync(srcPath, "utf8")
  : fs.readFileSync(fallback, "utf8");
const src = JSON.parse(raw);

// Prefer original first-80 if file already expanded
const base80 = src.levels.filter((l) => l.index <= 80);
if (base80.length !== 80) {
  console.error("Expected 80 base levels, got", base80.length);
  process.exit(1);
}

/** Curated hard pack — exactly 40, mixed categories */
const EXTRA = [
  // faces
  { base: "😀", odd: "😃", category: "faces", diffType: "lookalike", difficulty: 5, platformRisk: "high", notes: "Grinning vs big grin" },
  { base: "😌", odd: "☺️", category: "faces", diffType: "lookalike", difficulty: 5, platformRisk: "high", notes: "Relieved vs smiling face" },
  { base: "😢", odd: "😭", category: "faces", diffType: "lookalike", difficulty: 5, platformRisk: "medium", notes: "Cry vs sob" },
  { base: "😡", odd: "😠", category: "faces", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "Pouting vs angry" },
  { base: "😶", odd: "😐", category: "faces", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "No mouth vs neutral" },
  // vehicles
  { base: "🚗", odd: "🚕", category: "vehicles", diffType: "lookalike", difficulty: 5, platformRisk: "medium", notes: "Car vs taxi" },
  { base: "🚌", odd: "🚎", category: "vehicles", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "Bus vs trolleybus" },
  { base: "🚂", odd: "🚄", category: "vehicles", diffType: "lookalike", difficulty: 5, platformRisk: "medium", notes: "Locomotive vs bullet train" },
  { base: "✈️", odd: "🛩️", category: "vehicles", diffType: "lookalike", difficulty: 6, platformRisk: "medium", notes: "Airplane vs small plane" },
  { base: "⛵", odd: "🚢", category: "vehicles", diffType: "lookalike", difficulty: 5, platformRisk: "medium", notes: "Sailboat vs ship" },
  { base: "🚲", odd: "🛴", category: "vehicles", diffType: "lookalike", difficulty: 5, platformRisk: "medium", notes: "Bike vs scooter" },
  // sports
  { base: "⚽", odd: "🏀", category: "sports", diffType: "lookalike", difficulty: 5, platformRisk: "low", notes: "Soccer vs basketball" },
  { base: "🎾", odd: "🏐", category: "sports", diffType: "lookalike", difficulty: 5, platformRisk: "medium", notes: "Tennis vs volleyball" },
  { base: "⚾", odd: "🥎", category: "sports", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "Baseball vs softball" },
  { base: "🥊", odd: "🥋", category: "sports", diffType: "lookalike", difficulty: 5, platformRisk: "medium", notes: "Boxing vs martial arts" },
  // weather / sky
  { base: "☀️", odd: "🌤️", category: "weather", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "Sun vs sun behind cloud" },
  { base: "🌧️", odd: "🌦️", category: "weather", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "Rain vs sun/rain" },
  { base: "❄️", odd: "🌨️", category: "weather", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "Snowflake vs cloud snow" },
  { base: "🌙", odd: "🌛", category: "weather", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "Crescent vs face moon" },
  // symbols
  { base: "⭐", odd: "🌟", category: "symbols", diffType: "lookalike", difficulty: 5, platformRisk: "medium", notes: "Star vs glowing star" },
  { base: "✨", odd: "💫", category: "symbols", diffType: "lookalike", difficulty: 6, platformRisk: "medium", notes: "Sparkles vs dizzy" },
  { base: "❤️", odd: "🧡", category: "symbols", diffType: "color_variant", difficulty: 5, platformRisk: "medium", notes: "Red vs orange heart" },
  { base: "💙", odd: "💜", category: "symbols", diffType: "color_variant", difficulty: 6, platformRisk: "medium", notes: "Blue vs purple heart" },
  { base: "🔶", odd: "🔸", category: "symbols", diffType: "lookalike", difficulty: 7, platformRisk: "high", notes: "Large vs small orange diamond" },
  // objects
  { base: "📱", odd: "📲", category: "objects", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "Phone vs phone with arrow" },
  { base: "💻", odd: "🖥️", category: "objects", diffType: "lookalike", difficulty: 5, platformRisk: "medium", notes: "Laptop vs desktop" },
  { base: "🔑", odd: "🗝️", category: "objects", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "Key vs old key" },
  { base: "✏️", odd: "✒️", category: "objects", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "Pencil vs nib" },
  { base: "⏰", odd: "⏱️", category: "objects", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "Alarm vs stopwatch" },
  { base: "📗", odd: "📘", category: "objects", diffType: "color_variant", difficulty: 6, platformRisk: "medium", notes: "Green vs blue book" },
  // clothing
  { base: "👟", odd: "👞", category: "clothing", diffType: "lookalike", difficulty: 6, platformRisk: "medium", notes: "Sneaker vs shoe" },
  { base: "👒", odd: "🎩", category: "clothing", diffType: "lookalike", difficulty: 5, platformRisk: "low", notes: "Sun hat vs top hat" },
  { base: "👓", odd: "🕶️", category: "clothing", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "Glasses vs sunglasses" },
  { base: "👕", odd: "blouse", category: "clothing", diffType: "lookalike", difficulty: 5, platformRisk: "medium", notes: "PLACEHOLDER" },
  // nature
  { base: "🌷", odd: "🌹", category: "nature", diffType: "lookalike", difficulty: 5, platformRisk: "medium", notes: "Tulip vs rose" },
  { base: "🌲", odd: "🌳", category: "nature", diffType: "lookalike", difficulty: 6, platformRisk: "high", notes: "Evergreen vs deciduous" },
  { base: "🍀", odd: "☘️", category: "nature", diffType: "lookalike", difficulty: 7, platformRisk: "high", notes: "Four-leaf vs shamrock" },
  { base: "🌵", odd: "🌴", category: "nature", diffType: "lookalike", difficulty: 5, platformRisk: "low", notes: "Cactus vs palm" },
  // travel
  { base: "🏰", odd: "🏯", category: "travel", diffType: "lookalike", difficulty: 6, platformRisk: "medium", notes: "Castle vs Japanese castle" },
  { base: "🏠", odd: "🏡", category: "travel", diffType: "lookalike", difficulty: 7, platformRisk: "high", notes: "House vs house with garden" },
];

// Fix invalid clothing placeholder
EXTRA[33] = {
  base: "👕",
  odd: "👚",
  category: "clothing",
  diffType: "lookalike",
  difficulty: 6,
  platformRisk: "high",
  notes: "T-shirt vs blouse",
};

if (EXTRA.length !== 40) {
  console.error("EXTRA must be 40, got", EXTRA.length);
  process.exit(1);
}

const harden = {
  21: { base: "🐮", odd: "buffalo", category: "animals", diffType: "lookalike", difficulty: 3, platformRisk: "medium", notes: "Cow vs water buffalo" },
};

// fix buffalo emoji
harden[21] = { base: "🐮", odd: "🐃", category: "animals", diffType: "lookalike", difficulty: 3, platformRisk: "medium", notes: "Cow vs water buffalo" };
harden[22] = { base: "🧀", odd: "🧈", category: "food", diffType: "lookalike", difficulty: 3, platformRisk: "medium", notes: "Cheese vs butter" };
harden[23] = { base: "🐧", odd: "🐤", category: "animals", diffType: "lookalike", difficulty: 3, platformRisk: "medium", notes: "Penguin vs chick" };
harden[36] = { base: "🦉", odd: "🦅", category: "animals", diffType: "lookalike", difficulty: 4, platformRisk: "medium", notes: "Owl vs eagle" };
harden[50] = { base: "👆", odd: "☝️", category: "gestures", diffType: "lookalike", difficulty: 5, platformRisk: "high", notes: "Backhand up vs index up" };
harden[54] = { base: "🌽", odd: "🌾", category: "food", diffType: "lookalike", difficulty: 5, platformRisk: "medium", notes: "Corn vs sheaf of rice" };

const levels80 = base80.map((l) => {
  const h = harden[l.index];
  return h ? { ...l, ...h } : l;
});

const added = EXTRA.map((p, i) => {
  const index = 81 + i;
  return {
    id: `L-${String(index).padStart(3, "0")}`,
    index,
    grid: { cols: 5, rows: 5 },
    base: p.base,
    odd: p.odd,
    category: p.category,
    diffType: p.diffType,
    difficulty: p.difficulty,
    shuffleSeed: 2000 + index,
    platformRisk: p.platformRisk,
    notes: p.notes,
  };
});

const out = {
  version: 2,
  game: "Spot Odd One",
  campaignLevels: 120,
  defaults: src.defaults ?? {
    timeLimitMs: 10000,
    failOnWrongTap: true,
  },
  levels: [...levels80, ...added],
};

for (const l of out.levels) {
  if (l.base === l.odd || l.odd === "buffalo" || l.odd === "blouse") {
    console.error("Bad pair", l);
    process.exit(1);
  }
}

fs.writeFileSync("packages/level_data/levels.json", JSON.stringify(out, null, 2) + "\n");
fs.writeFileSync("packages/level_data/levels_80.json", JSON.stringify(out, null, 2) + "\n");

const byCat = {};
for (const l of out.levels) byCat[l.category] = (byCat[l.category] || 0) + 1;
console.log("OK", out.levels.length, byCat);
