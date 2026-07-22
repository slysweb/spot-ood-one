# Web SEO 规范（标题 · Description · Canonical）

> 适用于 Spot Odd One 站点（Hub + 主题包落地页）  
> 与实现代码保持一致；新开游戏 / 主题包时按本文 checklist 补齐文案与入口  
> **文案以 `apps/web/src/seo/pageMeta.ts` 为准**

---

## 1. 实现入口（找代码从这里进）

| 职责 | 路径 |
|------|------|
| 各页 title / description / canonical path | `apps/web/src/seo/pageMeta.ts` |
| 站点域名 `SITE_ORIGIN`、`absoluteUrl()` | `apps/web/src/game/site.ts` |
| 运行时写入 `<title>` / meta description / canonical | `apps/web/src/hooks/usePageMeta.ts` |
| Hub 调用 | `apps/web/src/pages/HubPage.tsx` |
| 主题页调用（含 Play / Settings） | `apps/web/src/pages/ThemeGamePage.tsx` |
| 主题 path（如 `/dog`） | `apps/web/src/game/themeMeta.ts`（`ThemeMeta.path`） |
| 路由 | `apps/web/src/App.tsx`（`/`、`/:themeId`） |
| 首屏 HTML fallback（爬虫 / JS 未跑前） | `apps/web/index.html` |

运行时逻辑：`usePageMeta(meta)` 根据当前路由的 `PageMeta` 设置：

- `document.title` ← `meta.title`
- `<meta name="description">` ← `meta.description`
- `<link rel="canonical">` ← `absoluteUrl(meta.path)`

---

## 2. 站点域名与 Canonical

### 2.1 `SITE_ORIGIN`

定义在 `apps/web/src/game/site.ts`：

- **默认**：`https://spotoddone.com`
- **可覆盖**：环境变量 `VITE_SITE_ORIGIN`（会去掉末尾 `/`）

### 2.2 Canonical 规则

- Canonical 为**绝对 URL**：`SITE_ORIGIN` + 站点相对 `path`
- Hub：`path: "/"` → `https://spotoddone.com/`
- 主题：`path` 取自 `getThemeMeta(themeId).path`（如 `/dog`）→ `https://spotoddone.com/dog`
- **Play / Settings 不是独立路由**，仍挂在 `/:themeId` 下；页面状态切换时 **不改** title / description / canonical，canonical **始终指向该主题规范 URL**

---

## 3. Hub（`/`）

常量：`HUB_META`（`pageMeta.ts`）。

| 字段 | 要求 | 当前真实文案 |
|------|------|----------------|
| **title** | 品牌 + 玩法一句话；与 `index.html` fallback 一致 | `Spot Odd One — Find the Odd One Out` |
| **description** | 须含关键词 **`free find the difference game`**、**`spot the difference picture`**；语句通顺，可带主题包枚举 | 见下方原文 |
| **path / canonical** | `"/"` → `https://spotoddone.com/` | 同左 |

**Description 原文（与代码 / `index.html` 一致）：**

```text
Play a free find the difference game — spot the difference picture among look-alike photos and pick the odd one out. Quick packs with emoji, monsters, cats, dogs, and fairies.
```

Hub 页在 `HubPage` 中调用 `usePageMeta(HUB_META)`。

---

## 4. 主题页（`/:themeId`）

由 `getThemePageMeta(themeId)` 组装：title / description 来自 `THEME_SEO`，`path` 来自 `themeMeta`。

### 4.1 Title 统一格式

```text
Spot the different {xx} picture — Spot Odd One
```

- `{xx}` 为主题英文名（小写单数，与包名一致）：`emoji` / `monster` / `cat` / `dog` / `fairy` / `color` / `fruit` 等
- **进入 Play（或 Settings）后不改 title**——只在挂载主题页时设一次 `landingMeta`

**示例（真实文案）：**

| 主题 | title |
|------|--------|
| dog | `Spot the different dog picture — Spot Odd One` |
| fairy | `Spot the different fairy picture — Spot Odd One` |
| color | `Spot the different color picture — Spot Odd One` |
| fruit | `Spot the different fruit picture — Spot Odd One` |

### 4.2 Description

- **必须**包含短语：`spot the different {xx} picture`（与 title 中的 `{xx}` 一致）
- 语句通顺；可补充 look-alike / 难度 / 包特色，但不要为了堆词牺牲可读性

**示例（真实文案）：**

| 主题 | description |
|------|-------------|
| dog | `Spot the different dog picture among look-alike pups. An easy Spot Odd One pack with timed levels.` |
| fairy | `Spot the different fairy picture — watch hair, dress, props, and tiny details. A medium Spot Odd One pack.` |
| color | `Spot the different color picture among look-alike swatches — watch hue, brightness, and gradients. A medium Spot Odd One pack.` |
| fruit | `Spot the different fruit picture among cute look-alikes — watch shape and type. A medium Spot Odd One pack.` |

### 4.3 Canonical

- `path` = 该主题在 `THEMES` 中的规范 path（如 `/dog`、`/fairy`）
- Play / Settings **不**单独设 canonical

主题页在 `ThemeGame` 中调用：`usePageMeta(getThemePageMeta(theme))`。

---

## 5. `index.html` Fallback

`apps/web/index.html` 提供 **Hub 级** 默认 meta（JS 未执行或爬虫只看静态 HTML 时）：

- `<title>`、`<meta name="description">` 与 `HUB_META` **保持一致**
- `<link rel="canonical" href="https://spotoddone.com/" />`（生产默认域名；若长期改域名，需同步改此处写死的 href，或改为构建注入）

**新主题包一般不必改 `index.html`**——主题 SEO 由客户端按路由写入。仅当 Hub 文案（标题 / 总站 description / 包枚举列表）变更时，同步改 `HUB_META` 与 `index.html`。

---

## 6. 新开主题包 · SEO Checklist

按顺序勾选：

1. **主题注册**  
   - 在 `themeMeta.ts` 增加 `ThemeMeta`（含规范 `path`，如 `/newt heme`）  
   - 扩展 `ThemeId` / `isThemeId` 等类型与校验  
   - 路由已是 `/:themeId`，通常无需新 Route；确保 Hub 入口能进该 path

2. **SEO 文案**（`pageMeta.ts` → `THEME_SEO`）  
   - [ ] `title`：`Spot the different {xx} picture — Spot Odd One`  
   - [ ] `description`：含 `spot the different {xx} picture`，语句通顺  
   - [ ] `getThemePageMeta` 能读到新主题（`Record<ThemeId, …>` 补全）

3. **页面接入**  
   - [ ] 主题页继续用 `usePageMeta(getThemePageMeta(theme))`  
   - [ ] **不要**在 Play / Settings 状态里改 title / description / path

4. **Canonical**  
   - [ ] `path` 指向主题规范 URL（与 `themeMeta.path` 一致）  
   - [ ] 确认 `absoluteUrl(path)` 结果正确（本地可用 `VITE_SITE_ORIGIN` 测）

5. **Hub / fallback（按需）**  
   - [ ] 若 Hub description 列举了主题包，把新包装进枚举句  
   - [ ] 同步 `HUB_META` 与 `index.html` 的 description（及必要时 title）  
   - [ ] **不必**为每个主题单独改 `index.html` 的 canonical

6. **自检**  
   - [ ] 打开 Hub：title / description / canonical = Hub  
   - [ ] 打开 `/{themeId}`：title / description / canonical = 该主题  
   - [ ] 点 Play：三者**不变**

---

## 7. 文案维护约定

- 英文 title / description **以代码为准**；改 SEO 只改 `pageMeta.ts`（Hub 时再同步 `index.html`）
- 主题展示文案（headline、tagline、教程）在 `themeMeta.ts`，**不等于** SEO title/description；两者可相关但勿混用同一字段
- 新增关键词或改格式时，先改本文再改代码，避免文档与实现漂移

---

## 8. 相关文档

- 主题包难度与资产：`docs/DIFFICULTY_AND_ASSETS.md`
- 品类设计（示例）：`docs/DOG_THEME.md`、`docs/FAIRY_THEME.md` 等
- 部署：`docs/DEPLOY_CLOUDFLARE.md`
