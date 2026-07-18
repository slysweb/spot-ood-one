# Spot Odd One

Find the emoji that doesn’t belong. Web-first odd-one-out puzzle for the English market.

**GitHub:** https://github.com/slysweb/spot-ood-one

## Quick start

```bash
cd apps/web
npm install
npm run dev
```

Open http://localhost:5174

## Scripts (repo root)

```bash
npm run dev      # start web
npm run build    # production build
npm run preview  # preview build
```

## Deploy to Cloudflare (Workers)

Pages 已并入 Workers 入口。详见 **[docs/DEPLOY_CLOUDFLARE.md](docs/DEPLOY_CLOUDFLARE.md)**。

Dashboard → **Import a repository** 时：

| Setting | Value |
|---------|--------|
| Project name | `spot-ood-one` |
| Root directory（Advanced） | `apps/web` |
| Build command | `npm ci && npm run build` |
| Deploy command | `npx wrangler deploy` |
| Node | `NODE_VERSION=20` |

## Structure

| Path | Purpose |
|------|---------|
| `apps/web` | Production web app (Vite + React + TS) |
| `apps/web-wireframe` | Early clickable wireframe |
| `packages/level_data` | 120-level pair JSON |
| `docs` | Product / fail-share / deploy docs |

## Product rules (MVP)

- 120 levels, 10s each
- Categories beyond animals / food / hands (faces, vehicles, sports, weather, objects, …)
- Wrong tap or timeout → fail
- Continue via **Share** (no ads yet) or **Start Over** from Level 1
- System emoji, free to play
