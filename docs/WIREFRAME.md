# Web 线框说明

路径：`apps/web-wireframe/`

## 打开方式

在项目根目录执行：

```bash
npx --yes serve apps/web-wireframe -p 5173
```

浏览器打开：http://localhost:5173

（也可直接用任意静态服务器指向该目录；`file://` 下部分分享/剪贴板 API 可能受限。）

## 覆盖页面

| 页面 | 说明 |
|------|------|
| Home | 品牌 + Play / Continue |
| Tutorial | 首局引导 |
| Play | 网格 + 10s 计时 + Pause |
| Fail | Share to Continue / Start Over（无 Ad） |
| Share fallback | Copy + I’ve shared it |
| Start Over confirm | 二次确认 |
| Settings | 占位开关 |
| Demo Clear | 打完线框 5 关 |

## 范围

- Demo **仅 1–5 关**（数据来自 Pair 表前 5 条）
- 进度存 `localStorage` key：`soo_wireframe_v1`
- `adsEnabled = false`，失败面板无 Watch Ad
