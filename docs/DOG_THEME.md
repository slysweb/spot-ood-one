# Dogs 主题 — 资产与 120 关设计（v1）

> 第四类别主题：**小狗（Dogs）** · **难度：简单（Easy）**  
> 总规：`docs/DIFFICULTY_AND_ASSETS.md`  
> 结构对齐 Cats：全关精致插画、无 emoji  
> 出图规格：**1024×1024**，白底，角色居中留边

---

## 难度曲线

| 档位 | 关卡 | 网格 | 规则 |
|------|------|------|------|
| 简单 | 1–30 | 3×3 | 一群狗里夹 **一只其他动物** |
| 简单+ | 31–50 | 3×3→4×4 | 仍是狗 vs 其他动物 |
| 中等 | 51–80 | 4×4 | **同类狗**里夹 **另一类狗** |
| 困难 | 81–100 | 5×5 | 同一只狗：肤色/装饰 twin |
| 地狱 | 101–120 | 5×5 | 微差 + 偶数关 `teleport` |

---

## 资产

路径：`apps/web/public/dogs/dog_d01.png` …

| ID | 造型 |
|----|------|
| D01 | Golden Retriever |
| D02 | Corgi |
| D03 | Dalmatian |
| D04 | Husky |
| D05 | Poodle |
| D06 | Beagle |
| D07 | Shiba |
| D08 | Bulldog |

Twin：D01b 蓝项圈 / D02b 围巾 / D05b 蝴蝶结 / D07b 小铃铛  

简单关其他动物：复用 Cats 包 `A02–A10` 与部分猫图（路径 `/cats/…`），避免再画一套。

中等分组：`fluffy` D01+D05 · `short` D02+D08 · `spotted` D03+D06 · `northern` D04+D07  

提示词：`docs/DOG_PROMPTS.md`
