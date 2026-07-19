# Fairy 主题 — 出图提示词

**画布：1024×1024（1:1）** · 白底 · 单角色居中 · 偏女性向柔和卡通

风格锚点：

```text
cute cartoon fairy girl mascot for casual mobile game, kawaii chibi, soft feminine pastel colors,
elegant cute not sexy, soft rounded shapes, big expressive eyes, gentle smile,
clean thick outlines, soft cel shading, tiny sparkles optional,
single character centered, plain white background, no text, no watermark,
1024x1024 square composition, consistent art style across the set
```

| ID | 造型 |
|----|------|
| F01 | long straight blonde hair, small magic wand, soft pink dress, tiny wings |
| F02 | twin tails, star-pattern skirt, lavender tones |
| F03 | short bob hair, large pink bow on head, mint dress |
| F04 | flower crown, fluffy pastel tutu skirt |
| F05 | spiral curls, larger fairy wings, peach dress |
| F06 | cute brimmed hat, soft blue dress |
| F07 | lily-of-the-valley greens and whites, delicate look |
| F08 | moonlit silver-white hair and dress, soft glow |

部件 twin（与本体构图一致，只改一点）：

| ID | 相对本体 |
|----|----------|
| F01h | hair color → soft pink |
| F02d | dress/skirt → warm coral instead of lavender |
| F03p | holds a flower instead of empty hands / different prop |
| F04e | different ear decoration / necklace |
| F05h | hair → light blue |
| F06d | dress → soft yellow |
| F07p | holds a small lantern instead of flowers |
| F08e | wing tip color / small moon earring change |

> **可辨度备注（2026-07-19）**：`F01h`（金发→浅粉）在 4×4 缩略下几乎不可辨；`F04e` / `F08e` 接近微差。三者均已从中等段剔除，需重画出更大部件差（例如无翅膀 twin）后再用。中等段只用：`F02d` / `F05h` / `F06d` / `F03p` / `F07p`。

微差 twin（原高难；**暂不排关**）：

| ID | 差异 |
|----|------|
| F01m | only shoe buckle / tiny wand tip gem different |
| F02m | only tiny star on skirt different color |
| F03m | only bow center gem different |
| F04m | only one flower in crown different color |

> **可辨度备注（2026-07-19）**：`F01m`–`F04m` 在 ~80px 棋盘格上像素差 <1%，肉眼等同「全一样」。高难段 66–85 已改用中等段高对比 twin（`F05h` / `F06d` / `F03p` / `F07p` / `F02d`）+ 5×5 / teleport 加压。重画 micro 时需做成缩略可见的大部件差后再排关。
