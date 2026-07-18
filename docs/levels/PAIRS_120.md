# Spot Odd One — 120 关 Pair 表

> 数据源：`packages/level_data/levels.json`  
> 全关限时 10s；点错/超时即败

## 分布概览

| 维度 | 分布 |
|------|------|
| 类别 | animals: 32 · food: 30 · gestures: 18 · faces: 5 · vehicles: 6 · sports: 4 · weather: 4 · symbols: 5 · objects: 6 · clothing: 4 · nature: 4 · travel: 2 |
| 网格 | 3x3: 15 · 4x4: 34 · 5x5: 71 |
| 平台风险 | low: 25 · medium: 58 · high: 37 |

## 难度曲线

| 关卡 | 网格 | 难度重心 |
|------|------|----------|
| 1–10 | 3×3 | L1 教学 |
| 11–25 | 3×3→4×4 | L2 |
| 26–50 | 4×4→5×5 | L3–L5 |
| 51–80 | 5×5 | L4–L6 |
| 81–120 | 5×5 | L5–L7 多品类专家关 |

## 完整 Pair 表

| # | Grid | Base | Odd | Category | DiffType | Diff | Risk | Notes |
|---|------|------|-----|----------|----------|------|------|-------|
| 1 | 3×3 | 🐶 | 🐱 | animals | category | 1 | low | Tutorial-friendly dog vs cat |
| 2 | 3×3 | 🍎 | 🍌 | food | category | 1 | low | Clear fruit contrast |
| 3 | 3×3 | 🐰 | 🦊 | animals | category | 1 | low | Rabbit vs fox |
| 4 | 3×3 | 👍 | 👎 | gestures | opposite | 1 | low | Opposite thumbs; high contrast |
| 5 | 3×3 | 🍕 | 🍔 | food | category | 1 | low | Pizza vs burger |
| 6 | 3×3 | 🐸 | 🐢 | animals | category | 1 | low | Frog vs turtle |
| 7 | 3×3 | 🍇 | 🍉 | food | category | 1 | low | Grapes vs watermelon |
| 8 | 3×3 | 👋 | 👏 | gestures | category | 1 | low | Wave vs clap |
| 9 | 3×3 | 🦁 | 🐷 | animals | category | 1 | low | Lion vs pig; very distinct |
| 10 | 3×3 | 🍩 | 🍦 | food | category | 1 | low | Donut vs ice cream |
| 11 | 3×3 | 🍎 | 🍏 | food | color_variant | 2 | medium | Red vs green apple; color-dependent |
| 12 | 3×3 | 🐔 | 🐣 | animals | state_variant | 2 | low | Chicken vs chick |
| 13 | 3×3 | 🍊 | 🍋 | food | category | 2 | low | Orange vs lemon |
| 14 | 3×3 | 🐴 | 🦄 | animals | category | 2 | low | Horse vs unicorn |
| 15 | 3×3 | ✋ | 🤚 | gestures | lookalike | 2 | medium | Palm front vs back |
| 16 | 4×4 | 🐻 | 🐼 | animals | lookalike | 2 | low | Bear vs panda; first 4x4 |
| 17 | 4×4 | 🥐 | 🍞 | food | lookalike | 2 | low | Croissant vs bread |
| 18 | 4×4 | 🐙 | 🦑 | animals | lookalike | 2 | medium | Octopus vs squid |
| 19 | 4×4 | 🍪 | 🍩 | food | lookalike | 2 | low | Cookie vs donut |
| 20 | 4×4 | ✊ | 👊 | gestures | lookalike | 2 | medium | Raised fist vs oncoming fist |
| 21 | 4×4 | 🐮 | 🐃 | animals | lookalike | 3 | medium | Cow vs water buffalo |
| 22 | 4×4 | 🧀 | 🧈 | food | lookalike | 3 | medium | Cheese vs butter |
| 23 | 4×4 | 🐧 | 🐤 | animals | lookalike | 3 | medium | Penguin vs chick |
| 24 | 4×4 | 🌮 | 🌯 | food | lookalike | 2 | medium | Taco vs burrito |
| 25 | 4×4 | ✌️ | 🤟 | gestures | lookalike | 2 | medium | Victory vs love-you gesture |
| 26 | 4×4 | 🐼 | 🐨 | animals | lookalike | 3 | medium | Classic lookalike pair |
| 27 | 4×4 | 🍓 | 🍒 | food | lookalike | 3 | medium | Strawberry vs cherries |
| 28 | 4×4 | 🐯 | 🦁 | animals | lookalike | 3 | low | Tiger vs lion |
| 29 | 4×4 | 🥑 | 🥒 | food | lookalike | 3 | medium | Avocado vs cucumber; green trap |
| 30 | 4×4 | 👌 | 🤏 | gestures | lookalike | 3 | medium | OK vs pinching hand |
| 31 | 4×4 | 🐭 | 🐹 | animals | lookalike | 3 | high | Mouse vs hamster; verify on Android |
| 32 | 4×4 | 🥖 | 🥨 | food | lookalike | 3 | low | Baguette vs pretzel |
| 33 | 4×4 | 🐺 | 🐶 | animals | lookalike | 3 | medium | Wolf vs dog |
| 34 | 4×4 | 🥦 | 🥬 | food | lookalike | 3 | medium | Broccoli vs leafy green |
| 35 | 4×4 | 🖐️ | 🖖 | gestures | lookalike | 3 | medium | Hand vs vulcan salute |
| 36 | 4×4 | 🦉 | 🦅 | animals | lookalike | 4 | medium | Owl vs eagle |
| 37 | 4×4 | 🍑 | 🍊 | food | lookalike | 3 | medium | Peach vs orange; round orange fruits |
| 38 | 4×4 | 🦀 | 🦞 | animals | lookalike | 3 | medium | Crab vs lobster |
| 39 | 4×4 | 🧁 | 🍰 | food | lookalike | 3 | low | Cupcake vs cake slice |
| 40 | 4×4 | 🤞 | ✌️ | gestures | lookalike | 4 | high | Crossed fingers vs victory; easy to miss |
| 41 | 4×4 | 🐪 | 🐫 | animals | lookalike | 4 | medium | One-hump vs two-hump camel |
| 42 | 4×4 | 🍈 | 🍉 | food | lookalike | 4 | high | Melon vs watermelon; platform shapes vary |
| 43 | 4×4 | 🦈 | 🐬 | animals | lookalike | 4 | medium | Shark vs dolphin |
| 44 | 4×4 | 🧄 | 🧅 | food | lookalike | 4 | high | Garlic vs onion; very similar on some OS |
| 45 | 4×4 | 👈 | 👉 | gestures | direction | 4 | low | Left vs right point; direction scan |
| 46 | 4×4 | 🐆 | 🐅 | animals | lookalike | 4 | high | Leopard vs tiger; spotted vs striped |
| 47 | 4×4 | 🥝 | 🍈 | food | lookalike | 4 | medium | Kiwi vs melon; green round fruits |
| 48 | 4×4 | 🐝 | 🪲 | animals | lookalike | 4 | medium | Bee vs beetle |
| 49 | 4×4 | 🥞 | 🧇 | food | lookalike | 4 | medium | Pancakes vs waffle |
| 50 | 5×5 | 👆 | ☝️ | gestures | lookalike | 5 | high | Backhand up vs index up |
| 51 | 5×5 | 🦢 | 🦆 | animals | lookalike | 4 | medium | Swan vs duck |
| 52 | 5×5 | 🫐 | 🍇 | food | lookalike | 4 | medium | Blueberries vs grapes |
| 53 | 5×5 | 🦓 | 🐴 | animals | lookalike | 4 | low | Zebra vs horse |
| 54 | 5×5 | 🌽 | 🌾 | food | lookalike | 5 | medium | Corn vs sheaf of rice |
| 55 | 5×5 | 🤏 | 👌 | gestures | lookalike | 5 | medium | Reverse of L-030; denser grid |
| 56 | 5×5 | 🦎 | 🐊 | animals | lookalike | 5 | medium | Lizard vs crocodile |
| 57 | 5×5 | 🥭 | 🍑 | food | lookalike | 5 | high | Mango vs peach; round warm fruits |
| 58 | 5×5 | 🦒 | 🦌 | animals | lookalike | 5 | medium | Giraffe vs deer |
| 59 | 5×5 | 🍙 | 🍘 | food | lookalike | 5 | high | Onigiri vs rice cracker |
| 60 | 5×5 | 🖖 | 🖐️ | gestures | lookalike | 5 | medium | Reverse of L-035 |
| 61 | 5×5 | 🦏 | 🦛 | animals | lookalike | 5 | medium | Rhino vs hippo |
| 62 | 5×5 | 🫒 | 🥑 | food | lookalike | 5 | high | Olive vs avocado; green ovals |
| 63 | 5×5 | 🐿️ | 🦫 | animals | lookalike | 5 | high | Chipmunk vs beaver; furry brown |
| 64 | 5×5 | 🍜 | 🍲 | food | lookalike | 5 | medium | Ramen vs pot of food |
| 65 | 5×5 | 👊 | ✊ | gestures | lookalike | 5 | medium | Reverse of L-020; denser |
| 66 | 5×5 | 🦭 | 🐋 | animals | lookalike | 5 | medium | Seal vs whale; late-game animals |
| 67 | 5×5 | 🧈 | 🧀 | food | lookalike | 5 | medium | Butter vs cheese; yellow blocks |
| 68 | 5×5 | 👈 | 👉 | gestures | direction | 6 | low | Left vs right in 5x5; direction scan under time |
| 69 | 5×5 | 🦩 | 🦚 | animals | lookalike | 6 | medium | Flamingo vs peacock |
| 70 | 5×5 | 🍲 | 🍛 | food | lookalike | 6 | high | Stew vs curry; bowl foods |
| 71 | 5×5 | 🦔 | 🦨 | animals | lookalike | 6 | high | Hedgehog vs skunk |
| 72 | 5×5 | ☝️ | 👆 | gestures | lookalike | 6 | high | Index pointing up vs backhand up |
| 73 | 5×5 | 🦞 | 🦐 | animals | lookalike | 6 | medium | Lobster vs shrimp |
| 74 | 5×5 | 🥪 | 🍞 | food | lookalike | 6 | medium | Sandwich vs bread |
| 75 | 5×5 | 🤙 | 👌 | gestures | lookalike | 6 | medium | Call-me vs OK |
| 76 | 5×5 | 🦘 | 🦙 | animals | lookalike | 6 | medium | Kangaroo vs llama |
| 77 | 5×5 | 🧆 | 🥙 | food | lookalike | 6 | high | Falafel vs stuffed flatbread |
| 78 | 5×5 | 🤚 | ✋ | gestures | lookalike | 6 | high | Reverse of L-015; endgame density |
| 79 | 5×5 | 🦦 | 🦭 | animals | lookalike | 6 | high | Otter vs seal; near-final boss warm-up |
| 80 | 5×5 | ✌️ | 🤞 | gestures | lookalike | 6 | high | Boss: victory vs crossed fingers in 5x5 |
| 81 | 5×5 | 😀 | 😃 | faces | lookalike | 5 | high | Grinning vs big grin |
| 82 | 5×5 | 😌 | ☺️ | faces | lookalike | 5 | high | Relieved vs smiling face |
| 83 | 5×5 | 😢 | 😭 | faces | lookalike | 5 | medium | Cry vs sob |
| 84 | 5×5 | 😡 | 😠 | faces | lookalike | 6 | high | Pouting vs angry |
| 85 | 5×5 | 😶 | 😐 | faces | lookalike | 6 | high | No mouth vs neutral |
| 86 | 5×5 | 🚗 | 🚕 | vehicles | lookalike | 5 | medium | Car vs taxi |
| 87 | 5×5 | 🚌 | 🚎 | vehicles | lookalike | 6 | high | Bus vs trolleybus |
| 88 | 5×5 | 🚂 | 🚄 | vehicles | lookalike | 5 | medium | Locomotive vs bullet train |
| 89 | 5×5 | ✈️ | 🛩️ | vehicles | lookalike | 6 | medium | Airplane vs small plane |
| 90 | 5×5 | ⛵ | 🚢 | vehicles | lookalike | 5 | medium | Sailboat vs ship |
| 91 | 5×5 | 🚲 | 🛴 | vehicles | lookalike | 5 | medium | Bike vs scooter |
| 92 | 5×5 | ⚽ | 🏀 | sports | lookalike | 5 | low | Soccer vs basketball |
| 93 | 5×5 | 🎾 | 🏐 | sports | lookalike | 5 | medium | Tennis vs volleyball |
| 94 | 5×5 | ⚾ | 🥎 | sports | lookalike | 6 | high | Baseball vs softball |
| 95 | 5×5 | 🥊 | 🥋 | sports | lookalike | 5 | medium | Boxing vs martial arts |
| 96 | 5×5 | ☀️ | 🌤️ | weather | lookalike | 6 | high | Sun vs sun behind cloud |
| 97 | 5×5 | 🌧️ | 🌦️ | weather | lookalike | 6 | high | Rain vs sun/rain |
| 98 | 5×5 | ❄️ | 🌨️ | weather | lookalike | 6 | high | Snowflake vs cloud snow |
| 99 | 5×5 | 🌙 | 🌛 | weather | lookalike | 6 | high | Crescent vs face moon |
| 100 | 5×5 | ⭐ | 🌟 | symbols | lookalike | 5 | medium | Star vs glowing star |
| 101 | 5×5 | ✨ | 💫 | symbols | lookalike | 6 | medium | Sparkles vs dizzy |
| 102 | 5×5 | ❤️ | 🧡 | symbols | color_variant | 5 | medium | Red vs orange heart |
| 103 | 5×5 | 💙 | 💜 | symbols | color_variant | 6 | medium | Blue vs purple heart |
| 104 | 5×5 | 🔶 | 🔸 | symbols | lookalike | 7 | high | Large vs small orange diamond |
| 105 | 5×5 | 📱 | 📲 | objects | lookalike | 6 | high | Phone vs phone with arrow |
| 106 | 5×5 | 💻 | 🖥️ | objects | lookalike | 5 | medium | Laptop vs desktop |
| 107 | 5×5 | 🔑 | 🗝️ | objects | lookalike | 6 | high | Key vs old key |
| 108 | 5×5 | ✏️ | ✒️ | objects | lookalike | 6 | high | Pencil vs nib |
| 109 | 5×5 | ⏰ | ⏱️ | objects | lookalike | 6 | high | Alarm vs stopwatch |
| 110 | 5×5 | 📗 | 📘 | objects | color_variant | 6 | medium | Green vs blue book |
| 111 | 5×5 | 👟 | 👞 | clothing | lookalike | 6 | medium | Sneaker vs shoe |
| 112 | 5×5 | 👒 | 🎩 | clothing | lookalike | 5 | low | Sun hat vs top hat |
| 113 | 5×5 | 👓 | 🕶️ | clothing | lookalike | 6 | high | Glasses vs sunglasses |
| 114 | 5×5 | 👕 | 👚 | clothing | lookalike | 6 | high | T-shirt vs blouse |
| 115 | 5×5 | 🌷 | 🌹 | nature | lookalike | 5 | medium | Tulip vs rose |
| 116 | 5×5 | 🌲 | 🌳 | nature | lookalike | 6 | high | Evergreen vs deciduous |
| 117 | 5×5 | 🍀 | ☘️ | nature | lookalike | 7 | high | Four-leaf vs shamrock |
| 118 | 5×5 | 🌵 | 🌴 | nature | lookalike | 5 | low | Cactus vs palm |
| 119 | 5×5 | 🏰 | 🏯 | travel | lookalike | 6 | medium | Castle vs Japanese castle |
| 120 | 5×5 | 🏠 | 🏡 | travel | lookalike | 7 | high | House vs house with garden |

## 高风险 Pair（优先真机验收）

- **L-031**: 🐭 → 🐹 — Mouse vs hamster; verify on Android
- **L-040**: 🤞 → ✌️ — Crossed fingers vs victory; easy to miss
- **L-042**: 🍈 → 🍉 — Melon vs watermelon; platform shapes vary
- **L-044**: 🧄 → 🧅 — Garlic vs onion; very similar on some OS
- **L-046**: 🐆 → 🐅 — Leopard vs tiger; spotted vs striped
- **L-050**: 👆 → ☝️ — Backhand up vs index up
- **L-057**: 🥭 → 🍑 — Mango vs peach; round warm fruits
- **L-059**: 🍙 → 🍘 — Onigiri vs rice cracker
- **L-062**: 🫒 → 🥑 — Olive vs avocado; green ovals
- **L-063**: 🐿️ → 🦫 — Chipmunk vs beaver; furry brown
- **L-070**: 🍲 → 🍛 — Stew vs curry; bowl foods
- **L-071**: 🦔 → 🦨 — Hedgehog vs skunk
- **L-072**: ☝️ → 👆 — Index pointing up vs backhand up
- **L-077**: 🧆 → 🥙 — Falafel vs stuffed flatbread
- **L-078**: 🤚 → ✋ — Reverse of L-015; endgame density
- **L-079**: 🦦 → 🦭 — Otter vs seal; near-final boss warm-up
- **L-080**: ✌️ → 🤞 — Boss: victory vs crossed fingers in 5x5
- **L-081**: 😀 → 😃 — Grinning vs big grin
- **L-082**: 😌 → ☺️ — Relieved vs smiling face
- **L-084**: 😡 → 😠 — Pouting vs angry
- **L-085**: 😶 → 😐 — No mouth vs neutral
- **L-087**: 🚌 → 🚎 — Bus vs trolleybus
- **L-094**: ⚾ → 🥎 — Baseball vs softball
- **L-096**: ☀️ → 🌤️ — Sun vs sun behind cloud
- **L-097**: 🌧️ → 🌦️ — Rain vs sun/rain
- **L-098**: ❄️ → 🌨️ — Snowflake vs cloud snow
- **L-099**: 🌙 → 🌛 — Crescent vs face moon
- **L-104**: 🔶 → 🔸 — Large vs small orange diamond
- **L-105**: 📱 → 📲 — Phone vs phone with arrow
- **L-107**: 🔑 → 🗝️ — Key vs old key
- **L-108**: ✏️ → ✒️ — Pencil vs nib
- **L-109**: ⏰ → ⏱️ — Alarm vs stopwatch
- **L-113**: 👓 → 🕶️ — Glasses vs sunglasses
- **L-114**: 👕 → 👚 — T-shirt vs blouse
- **L-116**: 🌲 → 🌳 — Evergreen vs deciduous
- **L-117**: 🍀 → ☘️ — Four-leaf vs shamrock
- **L-120**: 🏠 → 🏡 — House vs house with garden

## 校验

- 关卡数：120
- base ≠ odd：通过
- index 连续 1–120：通过