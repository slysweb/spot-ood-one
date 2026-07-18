# 部署到 Cloudflare（Workers 统一入口）

仓库：https://github.com/slysweb/spot-ood-one  
应用目录：`apps/web`  
产物目录：`apps/web/dist`

> 2025–2026 起，Dashboard 里 **Pages 已并入 Workers**。  
> 静态站用 **Workers + Static Assets**（`wrangler.jsonc` 里的 `assets.directory`），不再找单独的 “Pages” 入口。

---

## Dashboard：Import a repository（你现在的界面）

路径大致是：

**Workers & Pages → Create → Import a repository → 选 `slysweb/spot-ood-one`**

### 必填项

| 项 | 填什么 |
|----|--------|
| Project name | `spot-ood-one`（需与 `apps/web/wrangler.jsonc` 里 `name` 一致） |
| Build command | `npm ci && npm run build` |
| Deploy command | `npx wrangler deploy` |
| Builds for non-production branches | 可勾选（预览用） |

### Advanced settings（很重要）

展开 **Advanced settings**，设置：

| 项 | 值 |
|----|-----|
| **Root directory** | `apps/web` |
| **Node version** / 环境变量 | `NODE_VERSION` = `20` |

不设 Root directory 的话，根目录跑 `npm run build` 会失败（根 `package.json` 只是转发脚本，且没有 `wrangler.jsonc`）。

然后点 **Deploy / Create and deploy**。

---

## 仓库里已准备的配置

`apps/web/wrangler.jsonc`：

```jsonc
{
  "name": "spot-ood-one",
  "compatibility_date": "2026-07-18",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

含义：

- 构建出 `dist` 后，由 Wrangler 把静态文件挂到 Worker 上  
- `single-page-application`：未匹配文件时回退 `index.html`（SPA）

---

## 本地验证（可选）

```bash
cd apps/web
npm ci
npm run build
npx wrangler login
npx wrangler deploy
```

或：

```bash
npm run deploy
```

---

## 和旧「Pages」的对应关系

| 以前 Pages | 现在 Workers |
|------------|--------------|
| Build output directory = `dist` | `wrangler.jsonc` → `assets.directory: "./dist"` |
| SPA `_redirects` | `not_found_handling: "single-page-application"` |
| 无 Deploy command | Deploy command = `npx wrangler deploy` |
| Root directory = `apps/web` | Advanced → Root directory = `apps/web` |

---

## 常见问题

| 问题 | 处理 |
|------|------|
| `Missing entry-point to Worker script or to assets directory` | 确认 Root 是 `apps/web`，且已推送含 `wrangler.jsonc` 的提交 |
| Build 失败 / 找不到 vite | Root 必须是 `apps/web`；命令用 `npm ci && npm run build` |
| 找不到关卡 JSON | 完整仓库需含 `packages/level_data`（构建时相对路径会读到） |
| 域名 | 部署后是 `*.workers.dev`；可在项目 Settings 绑自定义域名 |
