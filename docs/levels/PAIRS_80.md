# Spot Odd One — 80 关 Pair 表

> 数据源：`packages/level_data/levels_80.json`  
> 全关限时 10s；点错/超时即败

## 分布概览

| 维度 | 分布 |
|------|------|
| 类别 | animals: 32 · food: 30 · gestures: 18 |
| 网格 | 3x3: 15 · 4x4: 34 · 5x5: 31 |
| 平台风险 | low: 28 · medium: 36 · high: 16 |

## 难度曲线

| 关卡 | 网格 | 难度重心 |
|------|------|----------|
| 1–10 | 3×3 | L1 易辨识 |
| 11–25 | 3×3→4×4 | L2 |
| 26–45 | 4×4 | L3–L4 |
| 46–65 | 4×4→5×5 | L4–L5 |
| 66–80 | 5×5 | L5–L6 |

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
| 21 | 4×4 | 🐮 | 🐷 | animals | category | 2 | low | Cow vs pig |
| 22 | 4×4 | 🧀 | 🥚 | food | category | 2 | low | Cheese vs egg |
| 23 | 4×4 | 🐧 | 🐦 | animals | category | 2 | low | Penguin vs bird |
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
| 36 | 4×4 | 🦉 | 🦇 | animals | category | 3 | low | Owl vs bat |
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
| 50 | 5×5 | 👆 | 👇 | gestures | direction | 4 | low | Up vs down; first 5x5 |
| 51 | 5×5 | 🦢 | 🦆 | animals | lookalike | 4 | medium | Swan vs duck |
| 52 | 5×5 | 🫐 | 🍇 | food | lookalike | 4 | medium | Blueberries vs grapes |
| 53 | 5×5 | 🦓 | 🐴 | animals | lookalike | 4 | low | Zebra vs horse |
| 54 | 5×5 | 🌽 | 🥕 | food | category | 4 | low | Corn vs carrot; both orange-ish |
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

## 高风险 Pair（优先真机验收）

- **L-031**: 🐭 → 🐹 — Mouse vs hamster; verify on Android
- **L-040**: 🤞 → ✌️ — Crossed fingers vs victory; easy to miss
- **L-042**: 🍈 → 🍉 — Melon vs watermelon; platform shapes vary
- **L-044**: 🧄 → 🧅 — Garlic vs onion; very similar on some OS
- **L-046**: 🐆 → 🐅 — Leopard vs tiger; spotted vs striped
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

## 校验

- 关卡数：80
- base ≠ odd：通过
- index 连续 1–80：通过