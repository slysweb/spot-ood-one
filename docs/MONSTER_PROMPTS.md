# Monster 出图提示词速查（复制即用）

需要：**12 张主图**（推荐）+ 可选 **4 张双胞胎**。  
详细设计见 `docs/MONSTER_THEME.md`。

---

## Midjourney — 风格前缀（每条都粘）

```text
cute casual mobile game monster mascot, friendly not scary, soft rounded shapes, clean thick outline, simple cel shading, vibrant but warm colors, chibi proportions, centered character, full body, isolated on pure white background, no text, no watermark, consistent art style for a puzzle game character set --stylize 80 --v 6
```

> 同一批尽量固定同一个 `--seed`。

---

## Midjourney — 12 只（前缀 + 下列之一）

**M01**
```text
round chubby slime blob monster, two tiny black eyes, small smile, no horns, soft coral-orange body, glossy highlight
```

**M02**
```text
small triangle-headed monster with one spiral horn, purple body, stubby arms, confident little grin
```

**M03**
```text
round spiky monster with short dorsal spikes, mint-green body, cute angry eyebrows, tiny feet
```

**M04**
```text
tiny winged monster, bat-like small wings, sky-blue body, thin legs, cheerful
```

**M05**
```text
one big eye cyclops monster, oversized head, mustard-yellow body, tiny arms
```

**M06**
```text
wide-mouth monster with two cute fangs, raspberry-red body, freckles, playful
```

**M07**
```text
round monster with three short tentacles at the bottom, teal body, curious eyes
```

**M08**
```text
bug-like monster with a half shell on its back, amber shell, soft green underbody
```

**M09**
```text
fluffy oval cotton monster, cream and peach fur tufts, bead eyes, no limbs visible
```

**M10**
```text
cute robot monster, rounded square head, one antenna, rivets, blue-gray metal, friendly LED eyes
```

**M11**
```text
cute ghost-shaped monster with wavy tail, pastel lavender, blush cheeks, not scary
```

**M12**
```text
geometric crystal monster body made of soft facets, cyan and pink crystal, tiny smile
```

---

## 可选双胞胎（地狱关）

在对应主提示后追加，并写：`same art style, proportions, line weight, lighting`

| ID | 追加句 |
|----|--------|
| M01b | `same coral slime blob, slightly bigger eyes, tiny tongue peeking out` |
| M05b | `same cyclops, iris bright green instead of black` |
| M06b | `same fang monster, three small fangs instead of two` |
| M10b | `same cute robot, two antennas instead of one` |

---

## ChatGPT 图像 — 风格锁（先发一次）

```text
You are generating assets for casual web puzzle game "Spot Odd One".
Style lock: cute chibi monster mascots, soft rounded shapes, clean thick outlines, simple cel shading, warm vibrant colors, friendly not scary, full body centered, plain white background, no text, no watermark, consistent across the set. Square image. One monster per request.
```

然后每次：`Generate M01 Blobbo: round chubby slime blob...`（用上面 MJ 描述即可）

---

## 导出要求

- 1024×1024 PNG，白底或透明  
- 居中，四周留边（方便旋转）  
- 命名：`monster_m01.png` … `monster_m12.png`
