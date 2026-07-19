# Spot Odd One — 项目开发文档（v0.5）

> 面向英文市场的「找不同」（Odd One Out）休闲益智游戏  
> 玩法：从一组**外观相近**的图片中，找出**唯一不一样**的那个  
> 注意：不是「两张图找 N 处差异」玩法  
> **发布策略：Web 优先 → 正反馈后再用 Capacitor 包 iOS / Android**  
> **内容形态：多主题包（Pack）**；包级难度分 **简单 / 中等 / 困难**（见 `docs/DIFFICULTY_AND_ASSETS.md`）  
> 每关 10s · 免费 · **前期失败续关仅分享（未接广告）**

---

## 0. 已确认决策（v0.2）

| # | 议题 | 决策 |
|---|------|------|
| 1 | 平台 | **先做 Web**；有正反馈后再用 **Capacitor** 包装上架 iOS / Android |
| 2 | 关卡量 | 按主题包：简单包约 **120** 关；中等包约 **85** 关；见难度文档 |
| 3 | 失败与限时 | **每关固定 10s**；失败续关见 `docs/FAIL_SHARE_AD_SPEC.md` |
| 4 | Emoji | Emoji 包用**系统字体**；插画包用 **1024×1024** 自研/生成卡通图 |
| 5 | 商业化 | **免费**；前期无广告；接广告后仅用于失败续关；无 IAP |
| 6 | 难度 | Hub 上包级标注 **Easy / Medium / Hard**；细则见 `DIFFICULTY_AND_ASSETS.md` |

---

## 1. 产品定位

### 1.1 一句话

**Spot Odd One** — Tap the one that doesn’t belong.

### 1.2 核心体验

- 一眼扫过网格，找到「看起来一样、其实不一样」的那个。
- **每关限时 10 秒**，节奏紧、反馈快。
- 失败成本高（重来要从第 1 关），广告/分享提供「保进度」出口。
- 多主题包扩展内容；简单包练手，中等/困难包靠细节与动效拉长寿命。

### 1.3 目标用户

| 维度 | 描述 |
|------|------|
| 主市场 | 英语国家（US / UK / CA / AU 优先） |
| 年龄 | 全年龄友好；核心 8–45 |
| 动机 | 放松、挑战、短时刷关、分享成绩 |
| 竞品参照 | Spot the Odd One / Odd One Out 类小游戏 |

### 1.4 非目标（刻意不做）

- 两图对照找差异（spot the difference）
- MVP 阶段原生三端齐发
- 生命制、无尽模式（可放到有正反馈之后）
- 账号体系、实时联机、IAP
- 账号体系与跨端同步（暂无）

---

## 1.5 难度模式与主题包（摘要）

完整规范：**`docs/DIFFICULTY_AND_ASSETS.md`**（关卡模板 + **1024×1024** 出图规则）。

| 模式 | 代表品类 | 差异重心 |
|------|----------|----------|
| 简单 Easy | Emoji · Monsters · Cats · Dogs | 不同角色 / 品种 → 后期明显装饰差 |
| 中等 Medium | **Fairy（仙女）**（设计中） | 明显不同 → **部件差** → 过渡放松 → 微差 + 换位 |
| 困难 Hard | （后续） | 微差为主，动效更早更密 |

仙女品类设计：**`docs/FAIRY_THEME.md`**（85 关曲线已锁定，待出图与开发）。

---

## 2. 玩法与规则

### 2.1 基础规则

1. 屏幕展示一个 **N×N 网格**（3×3 → 4×4 → 5×5 随关卡推进）。
2. 绝大多数格子显示 **同一「基准 Emoji」**。
3. 恰好有 **1 个「Odd One」**。
4. 玩家在 **10 秒内**点击 Odd One → 过关，进入下一关。
5. **点错**或**超时** → 本关失败，进入失败面板。

### 2.2 「不一样」的设计维度（难度来源）

| 等级 | 差异类型 | 示例 | 认知负担 |
|------|----------|------|----------|
| L1 | 不同物种/品类 | 一堆 🐶 里有一只 🐱 | 低 |
| L2 | 同主题不同成员 | 一堆 🍎 里有一个 🍏 | 低–中 |
| L3 | 相近形态 | 一堆 🐼 里有一只 🐨 | 中 |
| L4 | 同物品不同状态 | 一堆 ✋ 里有一个 🤚 | 中 |
| L5 | 颜色/变体近似 | 一堆 🍊 里有一个 🍑 | 中–高 |
| L6 | 方向/镜像 | 一堆 👈 里有一个 👉 | 高 |
| L7 | 干扰密集 | 5×5 + 相近对 + 满限时压迫 | 高 |

> 差异必须可解释；系统 Emoji 跨浏览器/OS 渲染差异要纳入 Web 验收（见 §6）。

### 2.3 胜利 / 失败（已定）

| 条件 | 结果 |
|------|------|
| 10s 内点中 Odd One | 过关；进度 +1；计时重置进下一关 |
| 点错任意非 Odd 格 | **立即失败** |
| 倒计时归零 | **失败** |
| 通关第 80 关 | Campaign Clear |

**无生命值。** 容错依赖失败面板出口。

### 2.4 失败面板（详见 `docs/FAIL_SHARE_AD_SPEC.md`）

**续关奖励唯一语义：** 保留 Level N，重开本关（新 10s）。

**Phase A（当前 / 未接广告）：**

```
Level Failed
 ├─ Share to Continue  → 分享成功（或 fallback 确认）→ 重开 Level N
 └─ Start Over         → 确认后 currentLevel=1（保留 best）
```

**Phase B（`adsEnabled=true` 后）：** 增加 Watch Ad，与 Share 奖励等价；同一失败只能领一次。

| 项 | 锁定规则 |
|----|----------|
| 前期无广告 | **不展示** Watch Ad，不是灰掉 |
| 分享 | Web Share API；不支持则 Copy + “I’ve shared it” |
| 防刷 | 同一 `failSessionId` 只发奖一次 |
| Start Over | 二次确认；`bestLevelReached` 保留 |
| 进度 | 失败进面板时不改 `currentLevel`；Continue/StartOver 才写存档 |

### 2.5 单局流程

```
Home → Play
  → Level N start (timer = 10s)
  → Show Grid
  → Player Tap / Timer
     ├─ Correct → FX → Level N+1（或 Clear）
     └─ Wrong / Timeout → Fail Sheet
           ├─ Share success → Retry Level N
           └─ Start Over → Level 1
```

---

## 3. 信息架构与页面结构

### 3.1 页面地图（Web MVP）

```
Landing / Home
 ├─ Play（从存档关卡继续；无存档则 Level 1）
 │    └─ Level → (Clear FX) → Next Level
 │            → Fail Sheet（Ad / Share / Start Over）
 │            → Campaign Clear
 ├─ Settings
 │    ├─ Sound
 │    ├─ Color Blind Assist
 │    └─ Privacy / About
 └─（可选）How to Play
```

MVP **不做**：Endless、Shop、账号、日挑战。  
Capacitor 阶段再补：原生分享增强、商店页、状态栏安全区精细适配。

### 3.2 核心 UI 模块

| 模块 | 职责 |
|------|------|
| Top Bar | 关卡号（如 12 / 80）、倒计时、暂停 |
| Timer | 10s 可视化（环或条）；最后 3s 强调 |
| Grid Board | 可点击格子；触控友好 |
| Feedback Layer | 正确高亮、错误抖动 |
| Fail Sheet | Phase A：Share / Start Over；Phase B 再加 Watch Ad |
| Clear Overlay | 短庆祝 → 自动进下一关或通关页 |
| Tutorial | 仅首局：说明点不同的那个 + 有限时 |

### 3.3 状态机（逻辑层）

```
Idle → LoadingLevel → Playing
  → Correct → LevelComplete → (Next | CampaignClear)
  → Wrong | Timeout → Failed
       → ContinueGranted (ad|share) → LoadingLevel (same N)
       → RestartConfirmed → LoadingLevel (N=1)
Pause 可从 Playing 切入（暂停时冻结计时）
```

`game_core`（纯逻辑）与 UI 解耦，便于日后 Capacitor 复用同一套规则。

---

## 4. 技术方案

### 4.1 选型（Web 优先 → Capacitor）

| 层级 | 选型 | 理由 |
|------|------|------|
| 构建 | **Vite + TypeScript** | 快、轻、适合游戏向 SPA |
| UI | **React**（或 Vue；团队熟哪个用哪个） | 生态熟；与 Capacitor 官方路径契合 |
| 路由 | 轻量（甚至可单页状态机） | 页面极少 |
| 样式 | CSS Modules / Tailwind（择一） | 快速出视觉 |
| 关卡数据 | 静态 JSON 打包 | 无后端即可上线 |
| 存档 | `localStorage` | 当前关、最高关、设置 |
| 分析 | PostHog 或 GA4 | Web 漏斗、关卡流失、续关率 |
| 错误监控 | Sentry（浏览器） | |
| 激励广告（Web） | 如 Google AdSense Rewarded / 第三方激励位（需评估地区与政策） | 仅失败续关 |
| 分享 | Navigator.share + fallback | |
| 后期壳 | **Capacitor 6+** | 同一 Web 产物包 iOS / Android |
| 后端 | MVP **无** | |

> **不选 Flutter / RN 作为主线**：当前目标是 Web 验证；Capacitor 让「正反馈后再上架」成本最低。

### 4.2 Capacitor 预留原则（现在就遵守，减少返工）

1. 避免依赖仅桌面才有的 API；触摸与点击统一处理。  
2. 布局用安全区 CSS 变量（`env(safe-area-inset-*)`）。  
3. 音频用用户手势解锁（移动端自动播放限制）。  
4. 广告 / 分享做成 **adapter 接口**：Web 一套实现，原生再换插件。  
5. 不要用只能 SSR 的架构；导出可静态托管的 SPA（或等价）。

### 4.3 仓库结构（建议）

```
spot-odd-one/
├── apps/
│   └── web/                    # Vite 主应用（唯一 MVP 交付物）
├── packages/
│   ├── game_core/              # 关卡、判定、计时、进度规则
│   └── level_data/             # 80 关 JSON + pair 库
├── docs/
│   └── PROJECT_DEV_DOC.md
├── tools/
│   └── level_validator/
└── store/                      # 后期 Capacitor / ASO 素材
    ├── aso/
    └── legal/
```

### 4.4 关卡数据模型（逻辑示意）

```json
{
  "id": "L-012",
  "index": 12,
  "grid": { "cols": 4, "rows": 4 },
  "base": { "emoji": "🐶", "tags": ["animal", "dog"] },
  "odd":  { "emoji": "🐱", "tags": ["animal", "cat"] },
  "rules": {
    "timeLimitMs": 10000,
    "failOnWrongTap": true,
    "shuffleSeed": 9012
  },
  "meta": {
    "difficulty": 2,
    "diffType": "category_swap",
    "category": "animals"
  }
}
```

- 全关 `timeLimitMs = 10000`（若个别关要微调，须单独评审；MVP 默认统一）。  
- `odd` 位置由 seed 在运行时打乱，降低背板答案。

### 4.5 托管与上线（Web MVP）

| 项 | 建议 |
|----|------|
| 托管 | Cloudflare Pages / Vercel / Netlify |
| 域名 | 短好记，如 `spotoddone.com` |
| SEO | 简单落地文案 + OG 图（可玩优先） |
| PWA | 可选；非 MVP 必做 |
| HTTPS | 必须（Share / 部分广告要求） |

### 4.6 性能与体验基线

- 首屏可玩 < 2s（4G / 中端安卓 Chrome）。  
- 点击到反馈 < 50ms 感知延迟。  
- 计时器与真时间对齐（`requestAnimationFrame` 或单调时钟，避免后台节流误伤——后台应暂停）。  
- 色盲辅助：对错不只靠红绿。  
- 系统 Emoji：验收 Chrome / Safari / Firefox × Win / macOS / iOS / Android。

---

## 5. 关卡设计

### 5.1 内容支柱（MVP）

1. **Animals** — 前段主力，教学友好  
2. **Food** — 中段，颜色/形态干扰  
3. **Gestures / Hands** — 后段，方向与细微差  

### 5.2 难度曲线（Campaign：80 关）

全关 **10s 限时**；难度主要靠网格变大 + pair 变难，不靠改时间。

| 关卡段 | 网格 | 主要差异 | 设计目标 |
|--------|------|----------|----------|
| 1–10 | 3×3 | L1 | 教会玩法；建立「我能行」 |
| 11–25 | 3×3→4×4 | L2 | 巩固；开始吃满时间压力 |
| 26–45 | 4×4 | L3–L4 | 观察力爬升 |
| 46–65 | 4×4→5×5 | L4–L5 | 失误与超时明显增加 |
| 66–80 | 5×5 | L5–L6 + 混合 | 收束高潮；第 80 关可稍「Boss」 |

**内容量：** 至少准备 **80 条可用 pair**（建议池 100+，便于替换高风险 pair）。

### 5.3 Pair 设计规范

必填：`base` / `odd` / `diffType` / `intendedDifficulty` / `notes` / `platformRisk`

**合格标准：**

- 目标设备上多数人能在约 **1–4s** 内找出（剩余时间作缓冲）。  
- 系统字体下不会「几乎一样」。  
- 无敏感、歧视、不当手势。  
- 手势白名单审核（跨文化）。

### 5.4 示例 Pair 库（种子）

**Animals**

| Base | Odd | Diff | DiffType |
|------|-----|------|----------|
| 🐶 | 🐱 | 1 | category |
| 🐭 | 🐹 | 3 | lookalike |
| 🐰 | 🦊 | 2 | category |
| 🐸 | 🐢 | 2 | category |
| 🐼 | 🐨 | 4 | lookalike |
| 🦁 | 🐯 | 3 | lookalike |
| 🐔 | 🐣 | 2 | state/variant |
| 🦄 | 🐴 | 3 | category |

**Food**

| Base | Odd | Diff | DiffType |
|------|-----|------|----------|
| 🍎 | 🍏 | 2 | color_variant |
| 🍊 | 🍋 | 2 | category |
| 🍇 | 🍉 | 1 | category |
| 🍩 | 🍪 | 3 | lookalike |
| 🍕 | 🍔 | 1 | category |
| 🥐 | 🍞 | 3 | lookalike |
| 🍓 | 🍒 | 4 | lookalike |
| 🥑 | 🥒 | 4 | lookalike |

**Gestures**

| Base | Odd | Diff | DiffType |
|------|-----|------|----------|
| 👍 | 👎 | 2 | opposite |
| 👏 | 🤝 | 3 | category |
| ✌️ | 🤞 | 4 | lookalike |
| 👈 | 👉 | 5 | direction |
| 🖐️ | 🖖 | 5 | lookalike |
| 👌 | 🤏 | 4 | lookalike |
| ✊ | 👊 | 3 | lookalike |
| 👋 | ✋ | 3 | lookalike |

### 5.5 手感参数（MVP 锁定）

| 参数 | 值 | 说明 |
|------|-----|------|
| 每关时限 | **10s** | 全关统一 |
| 点错 | **立即失败** | 无生命 |
| 正确基础表现 | 短 FX 后进下一关 | 250–400ms |
| 后台 / 暂停 | 冻结计时 | 防切走偷亏 |
| Hint | MVP 可不做 | 续关已有 Ad/Share |
| Combo / 分数 | 可选；非核心 | 可用「最高到达关」作主炫耀点 |

---

## 6. 美术与视觉方向

### 6.1 视觉目标

- 网格与倒计时是第一视觉焦点。  
- 轻快、干净、有游戏感。  
- 英文市场友好；避免紫科技风 / 沉重暗黑风 / 默认 Inter 工具感。

### 6.2 关键词

`Playful · Crisp · Soft contrast · Confident color blocks · Quick delight`

### 6.3 设计 Token（草案）

| Token | 建议 | 用途 |
|------|------|------|
| `--bg` | 柔和渐变或轻氛围底 | 全局 |
| `--surface` | 浅色面板 | 失败/设置 |
| `--ink` | 深灰蓝 | 字 |
| `--accent` | 珊瑚或柠檬绿（择一） | CTA、正确 |
| `--danger` | 偏橙红 | 超时/错误强调 |
| `--timer-warn` | 最后 3s 色 | 紧迫感 |
| `--grid-gap` | 8–12px | 防误触 |

字体：Display 用有个性的圆润无衬线；Body 清晰搭配。  
**Emoji：系统 UI 字体栈，不嵌入彩色 Emoji 字体。**

### 6.4 Emoji 策略（已定：系统字体）

1. 同屏字号一致；格子可点区域足够大。  
2. 不在 Emoji 上叠遮挡物。  
3. **验收矩阵必做**（系统字体差异是主风险）：  
   - iOS Safari、Android Chrome、Desktop Chrome/Safari/Edge  
4. 高风险 pair（某平台太像）→ 降级或替换，而不是打包自定义 Emoji。  
5. 后期若 Capacitor 上架后投诉「不一致」，再评估 Twemoji（当前不做）。

### 6.5 动效（至少 2–3 个有意图）

| 动效 | 时机 | 意图 |
|------|------|------|
| Pop-in | 网格出现 | 开局 |
| Correct pulse | 点对 | 奖励 |
| Wrong shake → Fail sheet | 点错/超时 | 惩罚清晰 |
| Timer urge（最后 3s） | 倒计时 | 紧迫，勿过度闪烁 |

### 6.6 声音

- SFX：正确 / 错误 / 超时 / 过关  
- BGM：可选，默认关  
- Capacitor 阶段再加 Haptics

### 6.7 传播视觉（Web + 日后商店）

- OG 图：标题 + 一眼能懂的 3×3 网格  
- Favicon / App icon：网格中一格高亮或放大镜意象  
- 分享文案配图可后期做「到达 Level N」卡片

---

## 7. 文案（英文市场）

### 7.1 语气

Friendly, sharp, playful。短句。不嘲讽失败。

### 7.2 核心命名

| 用途 | 文案 |
|------|------|
| Name | Spot Odd One |
| Tagline | Find the one that doesn’t belong |
| Pitch | One of these things is not like the others. You have 10 seconds. |

### 7.3 应用内文案（MVP）

| 位置 | Copy |
|------|------|
| Home CTA | Play |
| Continue | Continue · Level {n} |
| Tutorial title | Spot the odd one |
| Tutorial body | Tap the emoji that doesn’t match. You have 10 seconds. |
| Correct | Spot on! / Nice! / Nailed it! |
| Wrong | Not that one! |
| Timeout | Time’s up! |
| Fail title | Level failed |
| Fail · Share | Share to Continue |
| Fail · Restart | Start Over |
| Restart confirm | Start over from Level 1? |
| Share fallback confirm | I’ve shared it |
| Clear | You cleared all 80 levels! |
| Settings | Sound, Color-blind assist |
| Fail · Ad（仅 Phase B） | Watch Ad to Continue |

成功语气池：Spot on! / Sharp eye! / There it is! / Clean find! / You saw it!

### 7.4 Web / 日后商店描述要点

- 钩子：Find the odd emoji. 10 seconds. 80 levels.  
- 强调 **odd one out**，避免被理解成两图找茬。  
- 免费、无需账号。

### 7.5 合规

- Privacy Policy：分析工具、广告（激励视频）、无账号。  
- 分享与广告行为需在政策中说明。  
- Start Over 为本地进度，无需服务器删除流程（仍建议政策写清本地存储）。

---

## 8. 进度、经济与变现

### 8.1 MVP（已定：免费）

- 完整 80 关免费可玩。  
- **无 IAP、无付费去广告、无关卡内购。**  
- **Phase A：不接广告**；失败只能 Share 续关或 Start Over。  
- Phase B：激励视频仅失败续关；与 Share 奖励等价。  
- **不强制广告 / 分享才能开玩**（开玩零门槛；仅失败后保进度需要出口）。

### 8.2 正反馈后的可选加项

- 接入激励广告（`adsEnabled=true`）  
- Capacitor 上架  
- Daily Challenge / Endless  
- 主题外观（仍建议保持可免费通关）

---

## 9. 数据分析与成功指标

### 9.1 「正反馈」如何定义（建议门槛）

用于决定是否做 Capacitor 上架，可量化例如：

| 指标 | 建议观察 |
|------|----------|
| 周活跃 / 回流 | D1、D7 留存 |
| 深度 | 中位最高关卡 ≥ 20–30 |
| 传播 | Share 点击率、回流 UTM |
| 体验 | 失败率分布；是否大量卡在前 10 关 |
| 口碑 | 自愿反馈、社交提及 |

具体数值上线后按一周数据再定阈值。

### 9.2 关键事件

| Event | 属性 |
|-------|------|
| `level_start` | level_index |
| `level_clear` | level_index, time_ms_left |
| `level_fail` | level_index, reason=`wrong`\|`timeout` |
| `continue_ad` | level_index, result=success\|fail\|unavailable |
| `continue_share` | level_index, result=shared\|cancel\|fallback |
| `restart_from_level_1` | from_level |
| `campaign_clear` | total_time_optional |
| `session_start` / `session_end` | |

### 9.3 关卡质量

- 某关 `fail_rate` 过高 → 换更易 pair 或缩小网格  
- 某关几乎从不失败且剩余时间 > 6s → 可加难  
- 按浏览器/OS 拆看系统 Emoji 误伤

---

## 10. 里程碑计划

### Phase 0 — 文档与原型（当前）

- 本文档 v0.3  
- 80 关 Pair 表  
- Fail/Share/Ad 细则（Phase A 仅分享）  
- 可点击 Web 线框（含 10s + Fail：Share / Start Over）

### Phase 1 — Web MVP

- 80 关 Campaign  
- 10s 限时、点错即败  
- Fail：Share / Start Over（`adsEnabled=false`）  
- 本地进度、音效、教程、基础动效  
- Analytics + 隐私页  
- 部署到生产域名  

### Phase 2 — 验证与打磨

- 按数据替换毒关  
- 分享文案 / OG 优化  
- （可选）打开 `adsEnabled` 接激励广告  
- （可选）PWA  

### Phase 3 — Capacitor 上架（仅正反馈后）

- Capacitor 工程、签名、商店物料  
- 原生分享 / 广告 adapter  
- iOS + Android 提审  

---

## 11. 风险与对策

| 风险 | 影响 | 对策 |
|------|------|------|
| 系统 Emoji 跨平台不一致 | 难度不公平 | 验收矩阵；替换高风险 pair |
| 每关 10s + 点错即败过狠 | 前段流失 | 1–10 关 pair 极简单；教程明确 |
| 重来回第 1 关挫败 | 弃玩 | Ad/Share 续关要稳定好用 |
| Web 激励广告填充率低 | Phase B 续关压力到分享 | Phase A 先把 Share fallback 做稳 |
| 分享被滥用刷续关 | 进度失真 | 单次失败一次奖励；可加冷却 |
| 被当成两图找茬 | ASO/SEO 误会 | 文案与 OG 图强调单网格 |
| 过早做原生壳 | 浪费 | 严格等正反馈指标 |

---

## 12. MVP 范围清单

### Do

- [x] Web SPA 可玩  
- [x] 80 关 Campaign  
- [x] 每关 10s；点错/超时失败  
- [x] 失败：分享续关 / 回第 1 关（细则见 FAIL_SHARE_AD_SPEC）  
- [x] 系统 Emoji（动物 / 食物 / 手势）  
- [x] 免费；英文文案  
- [x] 本地进度 + 基础分析  

### Don’t（MVP / Phase A 不做）

- [ ] Watch Ad UI 与广告 SDK（`adsEnabled=false`）  
- [ ] iOS / Android 上架（留待 Capacitor 阶段）  
- [ ] 生命制 / Endless  
- [ ] 打包自定义 Emoji 字体  
- [ ] IAP / 付费去广告  
- [ ] 账号 / 排行榜 / 两图找茬  
- [ ] 自研插画  

---

## 13. 下一步

决策已锁定。建议执行顺序：

1. ~~产出 **80 关 Pair 表**~~ → `docs/levels/PAIRS_80.md`  
2. ~~定 **Fail / Share / Ad** 细则~~ → `docs/FAIL_SHARE_AD_SPEC.md`（Phase A 仅分享）  
3. ~~出 Web 线框~~ → `apps/web-wireframe/`  
4. ~~搭正式 Web 工程~~ → `apps/web/`（Vite + React + TS，80 关可玩）  
5. 真机验收高风险 pair、打磨动效/音效  
6. 部署生产域名 → 收数据  

---

## 附录 A — 英文 UI 字符串表

```
app.name=Spot Odd One
app.tagline=Find the one that doesn’t belong
home.play=Play
home.continue=Continue · Level {n}
home.settings=Settings
tutorial.title=Spot the odd one
tutorial.body=Tap the emoji that doesn’t match. You have 10 seconds.
hud.level=Level {n} / 80
hud.time={s}s
feedback.nice=Nice!
feedback.spot_on=Spot on!
feedback.wrong=Not that one!
feedback.timeout=Time’s up!
fail.title=Level failed
fail.share=Share to Continue
fail.share_hint=Share to keep your progress on Level {n}.
fail.start_over=Start Over
fail.start_over_title=Start over from Level 1?
fail.start_over_body=Your current progress on Level {n} will be lost.
fail.start_over_confirm=Start Over
fail.start_over_cancel=Cancel
share.fallback_title=Share to continue
share.copy=Copy Link
share.copied=Copied!
share.confirm=I’ve shared it
share.back=Back
result.campaign_clear=You cleared all 80 levels!
pause.title=Paused
pause.resume=Resume
pause.quit=Quit to Home
settings.sound=Sound
settings.colorblind=Color-blind assist
# Phase B only:
# fail.watch_ad=Watch Ad to Continue
```

## 附录 B — 版本记录

| 版本 | 日期 | 说明 |
|------|------|------|
| v0.1 | 2026-07-18 | 首版：结构 / 技术 / 文案 / 关卡 / 美术 |
| v0.2 | 2026-07-18 | Web 优先 + Capacitor 后置；80 关；每关 10s；失败三出口；系统 Emoji；免费 |
| v0.2.1 | 2026-07-18 | 产出 80 关 Pair 表：`packages/level_data/levels_80.json` / `docs/levels/PAIRS_80.md` |
| v0.3 | 2026-07-18 | Fail/Share/Ad 细则；Phase A 仅分享续关；Ad 用 `adsEnabled` 预留 |
| v0.3.1 | 2026-07-18 | 可点击 Web 线框：`apps/web-wireframe/` |
| v0.4 | 2026-07-18 | 正式 Web 工程 `apps/web`：暖色休闲站风格 UI + 80 关可玩 |
| v0.5 | 2026-07-19 | 多主题包；新增 `DIFFICULTY_AND_ASSETS.md`（三模式+出图规范）；`FAIRY_THEME.md` 中等仙女设计 |

---

*本文档用于指导立项与开发；细则以 `docs/` 下专题文档为准。*
