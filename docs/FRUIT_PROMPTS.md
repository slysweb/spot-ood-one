# Fruit 出图提示词与风格锚点

> 本包当前用 **程序化 SVG → WebP** 入库（`tools/gen_fruit_art.mjs`）。  
> 若以后改手绘/AI 出图，请沿用下列锚点，并遵守 `DIFFICULTY_AND_ASSETS.md` 的 1024 WebP 规则。

---

## 风格锚点（强制）

```
cute kawaii cartoon fruit, chibi, soft cel shading, bold clean outline,
plain white background, single fruit centered, square 1024x1024,
friendly kids puzzle game art, no text, no watermark, no realistic photo
```

负面：

```
realistic, photo, horror, text, logo, multiple fruits, busy background,
3d render, muddy colors, tiny details that vanish at 80px
```

---

## 缩略可辨原则

- 4×4 / 5×5 棋盘上，差异必须靠 **剪影或大色块**，不要靠籽粒/高光微差。  
- 易错认对（柠檬/青柠、橙/橘）要在轮廓或主色上拉开，而不是只改 5% 色相。
