# 部署到 Cloudflare Pages

仓库：https://github.com/slysweb/spot-ood-one  
应用目录：`apps/web`（Vite + React）  
产物目录：`apps/web/dist`

---

## 方式一：Dashboard 连接 GitHub（推荐）

1. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**
2. 授权并选择仓库 `slysweb/spot-ood-one`
3. 构建设置：

| 项 | 值 |
|----|-----|
| Production branch | `main`（若默认仍是 `master` 则填 `master`） |
| Root directory | `apps/web` |
| Framework preset | `Vite`（或 None） |
| Build command | `npm ci && npm run build` |
| Build output directory | `dist` |
| Node.js version | `20`（Settings → Environment variables → `NODE_VERSION=20`） |

4. **Save and Deploy**
5. 部署成功后会得到 `*.pages.dev` 域名；可在 **Custom domains** 绑定自己的域名

> 说明：Pages 会克隆整个仓库，Root 设为 `apps/web` 后，构建仍能通过相对路径读取 `packages/level_data`。

### 环境变量（可选）

在 Pages 项目 → **Settings** → **Environment variables** 添加：

- `NODE_VERSION` = `20`

---

## 方式二：Wrangler CLI 手动上传

适合本地先验证产物，或不想立刻接 Git。

```bash
# 1) 构建
cd apps/web
npm ci
npm run build

# 2) 登录 Cloudflare（首次）
npx wrangler login

# 3) 创建项目并上传（项目名可自定）
npx wrangler pages project create spot-ood-one
npx wrangler pages deploy dist --project-name=spot-ood-one
```

之后可用 Git 集成做持续部署，或继续用 CLI 上传。

---

## 方式三：GitHub 推送后自动部署

接好方式一之后：

```bash
git add .
git commit -m "your message"
git push origin main
```

每次推送到生产分支会自动触发 Pages 构建。

---

## SPA 路由

`apps/web/public/_redirects` 已包含：

```
/*    /index.html   200
```

保证刷新深链时仍回到应用（当前以单页状态机为主，预留即可）。

---

## 常见问题

| 问题 | 处理 |
|------|------|
| Build 找不到依赖 | Root 确认是 `apps/web`，命令用 `npm ci && npm run build` |
| 找不到关卡 JSON | 确认仓库含 `packages/level_data/levels_80.json`，且未把 `packages/` 写进 `.gitignore` |
| 页面空白 | 打开浏览器控制台；检查构建是否成功、`dist/index.html` 是否存在 |
| 旧缓存 | Pages → Deployments 里 Retry deployment，或浏览器强刷 |

---

## 本地预览生产构建

```bash
cd apps/web
npm run build
npm run preview
```
