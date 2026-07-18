# Monster 主题 — 资产与 120 关设计（v1）

> 第二类别主题：**小怪兽（Monster）**  
> 原则：**少资产 + 多变换**（镜像 / 旋转 / 缩放 / 色差）+ 后期动态干扰  
> 风格：可爱、圆润、适合英文休闲市场；**不要恐怖写实**

---

## 1. 你需要生成多少只怪兽？

### 结论（推荐）

| 方案 | 数量 | 说明 |
|------|------|------|
| **最低可行** | **12 只** | 全部 120 关可做完；中后期靠变换 + 色差 + 动效 |
| **更稳（推荐）** | **12 + 4 = 16** | 额外 4 只「双胞胎」专供地狱关（极像，只差一点） |
| 不建议 | 40+ | 成本高，收益低 |

**推荐开工：先做 12 只主阵容。**  
地狱关若手感不够，再补 4 只 twin（提示词见文末）。

### 12 只主阵容（角色卡）

每只要 **外形一眼可分**（剪影不同），方便简单关「完全不同」。

| ID | 代号 | 辨识点（给画师/提示词） |
|----|------|------------------------|
| M01 | Blobbo | 圆胖软泥，两只小眼，无角 |
| M02 | Hornix | 三角头 + 单角 |
| M03 | Spikey | 球身 + 背后短刺 |
| M04 | Winglet | 小翅膀 + 细腿 |
| M05 | Cyclope | 单眼大脑袋 |
| M06 | Fangy | 宽嘴露两颗牙 |
| M07 | Tentoo | 圆身 + 三根短触手 |
| M08 | Shelly | 半壳甲虫感 |
| M09 | Fluffo | 毛茸茸椭圆 |
| M10 | Robo | 方块关节机械感 |
| M11 | Ghosty | 飘带尾幽灵形（可爱版） |
| M12 | Crystal | 几何水晶身体 |

### 可选 4 只双胞胎（地狱关加强）

| Twin ID | 基于 | 唯一差异 |
|---------|------|----------|
| M01b | Blobbo | 眼睛略大 / 嘴角不同 |
| M05b | Cyclope | 瞳孔颜色不同 |
| M06b | Fangy | 牙数 2→3 或牙向相反 |
| M10b | Robo | 天线多一根 |

---

## 2. 变换与难度工具箱（不增加画图数量）

对同一张透明底 PNG，在游戏里施加：

| 变换 | 代码键 | 用途 |
|------|--------|------|
| 无 | `none` | 默认 |
| 水平镜像 | `flipX` | 中等 |
| 旋转 ±12° / ±20° / 180° | `rot12` / `rot20` / `rot180` | 中等→地狱 |
| 缩放 88% / 112% | `scale88` / `scale112` | 中等 |
| 色相偏移 / 明度 | `hue15` / `hue30` / `darker` | 地狱色差 |
| 组合 | 如 `flipX+rot12` | 地狱 |

**动态干扰（仅地狱段开启，程序实现，不需新图）：**

| FX | 说明 |
|----|------|
| `wobble` | 全体轻微自转 ±4° + 呼吸缩放 0.97–1.03 |
| `teleport` | 异类每 1.2–1.8s 与随机一格交换位置（短闪） |
| `jitter` | 全体微位移抖动（克制） |

---

## 3. 120 关难度曲线

全关仍建议 **10s**（与 Emoji 模式一致）；难度靠网格与相似度，不靠改时间。

| 关卡 | 档位 | 网格 | 规则要点 |
|------|------|------|----------|
| 1–20 | 简单 | 3×3 | 异类 = **另一只怪兽**（完全不同） |
| 21–35 | 简单+ | 3×3→4×4 | 仍是不同怪兽 |
| 36–45 | 简单+ | 4×4 | 仍用**不同怪兽**（不引入同图微差） |
| 46–60 | 中等 | 4×4 | 同怪 + **强**变换（大旋转 / 明显缩放 / 强色相） |
| 61–80 | 中等 | 4×4 | 同怪 + 可读变换（对称怪不用纯 flipX） |
| 81–100 | 困难 | 5×5 | 可读变换（无全盘晃动） |
| 101–120 | 地狱 | 5×5 | 强差异（缩放/翻转/倒立/色差）；偶数关 `teleport`，无全盘晃动 |

> **注意：** M01 / M03 / M07 / M09 接近左右对称，**禁止只用 flipX**（否则肉眼几乎看不出）。

详细 120 关表：`packages/level_data/monster/levels_monster_120.json`

---

## 4. 出图规格（务必统一）

- 画布：**1024×1024**（或 1536×1536）  
- **透明背景**（PNG）  
- 角色居中，四周留 10–12% 安全边距（旋转后不裁切）  
- 单角色、无文字、无水印、无地面阴影铺满（可有很轻接触阴影）  
- 统一光源：左上方柔光  
- 风格关键词固定（见提示词），12 只必须像同一世界观  

导出命名：

```
monster_m01.png … monster_m12.png
monster_m01b.png …（若做 twin）
```

---

## 5. Midjourney 提示词

### 5.1 风格锚点（每只都带上）

把下面整段粘在提示词前部：

```text
cute casual mobile game monster mascot, friendly not scary, soft rounded shapes,
clean thick outline, simple cel shading, vibrant but warm colors, chibi proportions,
centered character, full body, transparent background, no text, no watermark,
consistent art style for a match-3 style puzzle game character set --stylize 80 --v 6
```

若 MJ 不支持透明：加 `isolated on pure white background`，后期去背。

建议参数：`--stylize 50–120`，同一批用同一 `--seed`（先出一只定 seed，其余复用）。

### 5.2 12 只分镜提示（接在风格锚点后）

**M01 Blobbo**
```text
round chubby slime blob monster, two tiny black eyes, small smile, no horns,
soft coral-orange body, glossy highlight
```

**M02 Hornix**
```text
small triangle-headed monster with one spiral horn, purple body, stubby arms,
confident little grin
```

**M03 Spikey**
```text
round spiky monster with short dorsal spikes, mint-green body, cute angry eyebrows,
tiny feet
```

**M04 Winglet**
```text
tiny winged monster, bat-like small wings, sky-blue body, thin legs, cheerful
```

**M05 Cyclope**
```text
one big eye cyclops monster, oversized head, mustard-yellow body, tiny arms
```

**M06 Fangy**
```text
wide-mouth monster with two cute fangs, raspberry-red body, freckles, playful
```

**M07 Tentoo**
```text
round monster with three short tentacles at the bottom, teal body, curious eyes
```

**M08 Shelly**
```text
bug-like monster with a half shell on its back, amber shell, soft green underbody
```

**M09 Fluffo**
```text
fluffy oval cotton monster, cream and peach fur tufts, bead eyes, no limbs visible
```

**M10 Robo**
```text
cute robot monster, rounded square head, antenna, rivets, blue-gray metal, friendly LED eyes
```

**M11 Ghosty**
```text
cute ghost-shaped monster with wavy tail, pastel lavender, blush cheeks, not scary
```

**M12 Crystal**
```text
geometric crystal monster body made of soft facets, cyan and pink crystal, tiny smile
```

### 5.3 可选双胞胎（地狱加强）

在对应主提示后追加：

**M01b：** `same design as the coral slime blob, but slightly bigger eyes and a tiny tongue peeking out`  
**M05b：** `same cyclops design, but the iris is bright green instead of black`  
**M06b：** `same fang monster, but three small fangs instead of two`  
**M10b：** `same cute robot monster, but with two antennas instead of one`

并加：`must match the exact same art style, proportions, line weight, and lighting`

### 5.4 角色表（可选，一次出 3×4）

```text
3x4 character sheet of 12 cute casual game monsters, each in its own cell,
white background, consistent style, labeled M01 to M12 in tiny text under cells,
same lighting and outline weight --stylize 60
```

定稿后仍建议 **每只单独再出一张** 高清单角，方便透明底导出。

---

## 6. ChatGPT（DALL·E / 图像）提示词

可逐只生成；先发「风格锁」：

```text
You are generating assets for a casual web puzzle game "Spot Odd One".
Style lock: cute chibi monster mascots, soft rounded shapes, clean thick outlines,
simple cel shading, warm vibrant colors, friendly not scary, full body centered,
plain white background, no text, no watermark, consistent across the set.
Square 1024x1024. Generate one monster per request.
```

然后每次只发一只，例如：

```text
M01 Blobbo: round chubby slime blob, two tiny eyes, small smile, no horns,
soft coral-orange body, glossy highlight. Follow the style lock.
```

---

## 7. 关卡数据如何引用（开发向）

```json
{
  "id": "M-041",
  "index": 41,
  "grid": { "cols": 4, "rows": 4 },
  "base": { "monsterId": "M03", "transform": "none" },
  "odd":  { "monsterId": "M03", "transform": "flipX" },
  "fx": { "board": "none", "odd": "none" },
  "meta": { "band": "medium", "diffType": "flip" }
}
```

地狱示例：

```json
{
  "odd": { "monsterId": "M03", "transform": "rot12+hue15" },
  "fx": { "board": "wobble", "odd": "teleport" }
}
```

完整 120 关：`packages/level_data/monster/levels_monster_120.json`

---

## 8. 交付清单（你出图时勾选）

- [ ] 12 张主怪兽 PNG（透明或纯白）  
- [ ] （可选）4 张 twin  
- [ ] 抽查：缩小到游戏格子尺寸仍可辨认剪影  
- [ ] 抽查：`flipX` / 小角度旋转后不显脏边  

出图完成后把文件放到例如 `apps/web/public/monsters/`，即可接主题切换开发。
