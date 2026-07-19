# Cats 主题 — 出图提示词

风格锚点（每张都带上）：

```text
cute cartoon cat mascot for casual mobile game, kawaii chibi, soft rounded shapes,
big expressive eyes, friendly smile, clean thick outlines, soft cel shading,
single character centered, transparent background, no text, no watermark,
1024x1024, consistent art style across a set
```

负面（若工具支持）：

```text
realistic photo, scary, horror, bloody, complex background, multiple cats, text, watermark, blurry
```

---

## 主阵容 C01–C08

把风格锚点 + 下表「造型」拼成完整提示词。

| ID | 造型提示（英文） |
|----|------------------|
| C01 | orange tabby cat face and upper body, clear tiger stripes, pink nose, sitting happily |
| C02 | fluffy white longhair cat, soft fur, pink nose, gentle smile |
| C03 | sleek black cat, bright yellow eyes, simple elegant silhouette |
| C04 | calico cat with orange black and white patches, cute round face |
| C05 | siamese cat, cream body, dark brown points on ears face paws, blue eyes |
| C06 | british shorthair gray cat, round chubby face, copper eyes, loaf pose |
| C07 | ginger orange cat in loaf pose, short legs tucked, cozy expression |
| C08 | black and white cow-pattern cat, asymmetrical spots, playful |

导出：`cat_c01.png` … `cat_c08.png`

---

## Twin（困难/地狱）

在对应主图提示词后追加差异，**其余完全一致**：

| ID | 追加 |
|----|------|
| C01b | wearing a small shiny gold bell on a thin collar around the neck |
| C03b | wearing a thin bright red collar with a tiny heart tag |
| C05b | small pink bow on the left ear |
| C02b | cream-ivory fur tint instead of pure white, one eye light blue one eye green |

导出：`cat_c01b.png` 等。

---

## 质感进阶（可选）

后期关若要更精致，可在锚点中加：

```text
premium sticker illustration, subtle fur texture, glossy eyes with catchlights,
soft ambient occlusion under chin, polished mobile game UI asset
```
