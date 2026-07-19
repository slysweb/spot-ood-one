# Cats 主题 — 资产与 120 关设计（v1）

> 第三类别主题：**小猫（Cats）** · **难度：简单（Easy）**  
> 总规：`docs/DIFFICULTY_AND_ASSETS.md`  
> 风格：手绘卡通、有趣、可爱；**全关精致插画**（无 emoji）  
> 原则：简单关靠「物种差」一眼可辨；后期靠同种微差 + 动效

---

## 1. 难度曲线（产品规则）

| 档位 | 关卡 | 网格 | 规则 |
|------|------|------|------|
| 简单 | 1–30 | 3×3 | 一群插画猫里夹 **一只其他插画动物** |
| 简单+ | 31–50 | 3×3→4×4 | 仍是猫 vs 其他动物 |
| 中等 | 51–80 | 4×4 | **同类猫**里夹 **另一类猫**（品种分组不同） |
| 困难 | 81–100 | 5×5 | **同一只猫**，异类为 **肤色不同** 或 **装饰不同**（铃铛、蝴蝶结、项圈） |
| 地狱 | 101–120 | 5×5 | 更细微差 + `teleport`（偶数关）；不用全盘 wobble 盖住微差 |

全关 **10 秒**；错点即败（与其它主题一致）。

---

## 2. 资产（全关精致插画，无 emoji）

画布 **1024×1024**，白底或透明底，角色居中，留 10% 边距。  
命名：`apps/web/public/cats/cat_c01.png` / `cat_a01.png` …

### 2.1 猫 C01–C08

| ID | 品种/造型 | 辨识点 |
|----|-----------|--------|
| C01 | Orange Tabby | 橘条纹、圆脸 |
| C02 | White Fluff | 白长毛、粉鼻子 |
| C03 | Black Cat | 全黑、黄眼睛 |
| C04 | Calico | 三花色块 |
| C05 | Siamese | 重点色、蓝眼睛 |
| C06 | Gray British | 英短灰、圆脸 |
| C07 | Ginger Loaf | 橘猫馒头蹲 |
| C08 | Cow Spot | 黑白奶牛纹 |

中等「类」分组：

| 类 | 成员 |
|----|------|
| orange | C01, C07 |
| light | C02, C05 |
| dark | C03 |
| patterned | C04, C08 |
| gray | C06 |

### 2.2 其他动物 A01–A10（简单关异类）

| ID | 动物 |
|----|------|
| A01 | Dog |
| A02 | Rabbit |
| A03 | Bear |
| A04 | Fox |
| A05 | Panda |
| A06 | Pig |
| A07 | Frog |
| A08 | Monkey |
| A09 | Tiger cub |
| A10 | Koala |

### 2.3 Twin（困难/地狱）

| Twin | 基于 | 唯一差异 |
|------|------|----------|
| C01b | C01 | 脖子挂 **金色小铃铛** |
| C03b | C03 | 戴 **红色小项圈** |
| C05b | C05 | 耳朵旁 **粉色蝴蝶结** |
| C02b | C02 | 毛色偏奶油黄 / 眼睛异色 |

提示词见 `docs/CAT_PROMPTS.md`。

---

## 3. 关卡数据

- JSON：`packages/level_data/cat/levels_cat_120.json`  
- 生成器：`tools/gen_cat_levels_120.mjs`  
- 一览表：`docs/levels/CAT_PAIRS_120.md`  

每关 `base` / `odd` 为：

```json
{ "render": "image", "catId": "C01", "transform": "none" }
// 异类可以是另一只猫或动物，如 "A01"
```

变换键复用怪兽主题：`flipX` / `rot45` / `scale75` / `hue40` / `darker` / `rot180` 等。  
地狱偶数关：`odd: "teleport"`。

---

## 4. 路由与进度

- Hub 卡片 → `/cat`  
- `ThemeId` 增加 `"cat"`，进度写入 `spot_odd_one_v2.themes.cat`
