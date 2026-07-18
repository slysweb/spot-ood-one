# Fail / Share / Ad 交互细则（v1.0）

> 适用：Spot Odd One Web MVP  
> 原则：**续关奖励只有一种效果**——保留当前关卡进度，重开本关（新的 10s）  
> **前期未接广告：失败面板不展示 Watch Ad，只保留 Share + Start Over**

---

## 1. 阶段开关

用配置控制广告是否出现，避免后期改 UI 结构。

```ts
// 概念配置（实现时可放 env / feature flag）
{
  adsEnabled: false,   // MVP 前期 = false
  shareEnabled: true,  // 始终 true
  continueReward: "retry_same_level" // 唯一奖励语义
}
```

| 阶段 | `adsEnabled` | 失败面板按钮 |
|------|--------------|--------------|
| **Phase A（当前）** | `false` | **Share to Continue** · **Start Over** |
| Phase B（接入激励广告后） | `true` | **Watch Ad to Continue** · **Share to Continue** · **Start Over** |

规则：

- `adsEnabled === false` 时：**不渲染** Watch Ad 按钮（不是灰掉，直接没有）。  
- 不因广告未接入而阻断游玩或强制分享。  
- Start Over 始终可用。

---

## 2. 何时进入失败面板

| 触发 | `fail_reason` | 行为 |
|------|---------------|------|
| 点到非 Odd 格 | `wrong` | 立即停表 → 短错误反馈（≤300ms）→ Fail Sheet |
| 倒计时到 0 | `timeout` | 停表 → 超时文案 → Fail Sheet |

进入 Fail Sheet 后：

- 网格不可再点  
- 计时器保持 0 或隐藏  
- 暂停按钮不可用（或 Pause 入口关闭）  
- 本次失败生成一个 `failSessionId`（内存级即可），用于防重复领奖

---

## 3. 续关奖励（Continue）语义

**唯一奖励：`retry_same_level`**

成功领取后续关后：

1. **保留** `currentLevel = N`（失败时所在关）  
2. **不扣、不加** 其它进度字段（`bestLevel` 不变，除非之后 innovate）  
3. 关闭 Fail Sheet  
4. 重新加载 Level N：新 `shuffle`（可用 `shuffleSeed + retryCount`）、计时重置为 **10s**  
5. `retryCount`（本关连续续关次数）+1，供分析用

**明确不是：**

- 不是跳过本关  
- 不是加时 / 加命  
- 不是回上一关  
- 不是清空错误记录后「接着当前剩余时间」

Ad 与 Share 在 Phase B **奖励完全等价**，只是获取途径不同。

---

## 4. Phase A：仅分享续关（当前要实现）

### 4.1 Fail Sheet UI

```
┌─────────────────────────────┐
│        Level failed         │
│   Not that one! / Time’s up!│
│                             │
│   [ Share to Continue ]     │  ← Primary
│   [ Start Over ]            │  ← Secondary / destructive
└─────────────────────────────┘
```

- 标题：`Level failed`  
- 副文案：`wrong` → `Not that one!`；`timeout` → `Time’s up!`  
- 可选一行说明：`Share to keep your progress on Level {n}.`  
- **无** Watch Ad

### 4.2 Share 主路径（Web Share API）

**可分享条件（建议）：**

```
canNativeShare =
  typeof navigator !== "undefined"
  && !!navigator.share
  && (!navigator.canShare || navigator.canShare({ url, text, title }))
```

**分享 payload（英文）：**

| 字段 | 内容 |
|------|------|
| `title` | `Spot Odd One` |
| `text` | `I’m on Level {n} in Spot Odd One — find the emoji that doesn’t belong!` |
| `url` | 带 UTM 的站点 URL，如 `https://{domain}/?utm_source=share&utm_medium=continue&utm_campaign=fail_continue&lv={n}` |

**流程：**

```
Tap Share
 → set sharing=true（防连点）
 → try navigator.share(payload)
     ├─ resolve（用户完成或系统返回成功）→ grantContinue("share_native")
     ├─ reject AbortError（用户取消）→ 不发奖；sharing=false；停留 Fail Sheet
     └─ reject 其它错误 → 走 Fallback（§4.3）
 → finally: sharing=false（若未立刻切关）
```

### 4.3 Share Fallback（无 Web Share / 分享失败）

不弹「不支持分享」死胡同，改为：

```
┌─────────────────────────────┐
│     Share to continue       │
│                             │
│  Copy this message and      │
│  send it to a friend:       │
│                             │
│  ┌───────────────────────┐  │
│  │ I’m on Level 12 in …  │  │
│  └───────────────────────┘  │
│                             │
│  [ Copy Link ]              │
│  [ I’ve shared it ]         │  ← 确认后发奖
│  [ Back ]                   │
└─────────────────────────────┘
```

| 控件 | 行为 |
|------|------|
| Copy Link | `clipboard.writeText(shareText + " " + url)`；成功 toast：`Copied!` |
| I’ve shared it | **信任点击发奖** → `grantContinue("share_fallback")` |
| Back | 回到 Fail Sheet，不发奖 |

**为何 fallback 用「自认已分享」：**  
Web 无法可靠验证用户是否真的发到社交平台。MVP 优先保进度体验；用事件监控滥用即可（§8）。

**可选防刷（Phase A 建议做最小集）：**

- 同一 `failSessionId` 只能 `grantContinue` **一次**  
- 「I’ve shared it」在 Copy 成功前可点，但文案鼓励先 Copy（不强制）  
- 不在本地做跨失败的冷却（避免误伤正常玩家）；若后期滥用明显再加「每分钟最多 N 次续关」

### 4.4 Start Over

```
Tap Start Over
 → Confirm dialog
     Title: Start over from Level 1?
     Body:  Your current progress on Level {n} will be lost.
     [ Cancel ]  [ Start Over ]
 → Confirm
     → currentLevel = 1
     → 可选：保留 bestLevelReached（推荐保留，用于 Home 炫耀）
     → 关闭弹层 → 进入 Level 1
```

| 字段 | Start Over 后 |
|------|----------------|
| `currentLevel` | `1` |
| `bestLevelReached` | **保留**（推荐） |
| `campaignCleared` | 不变 |
| 本关 `retryCount` | 清零 |

Cancel：回到 Fail Sheet，进度不动。

---

## 5. Phase B：接入广告后（预留，现在不实现 UI）

当 `adsEnabled === true`：

```
┌─────────────────────────────┐
│        Level failed         │
│                             │
│  [ Watch Ad to Continue ]   │  ← Primary
│  [ Share to Continue ]      │  ← Secondary
│  [ Start Over ]             │
└─────────────────────────────┘
```

### 5.1 Watch Ad 流程（预留）

```
Tap Watch Ad
 → 若广告未就绪 → toast “Ad unavailable, try Share”；不发奖
 → 展示激励视频
     ├─ 完整观看回调 → grantContinue("ad")
     ├─ 中途关闭 → 不发奖
     └─ 加载失败 → 不发奖，提示改用 Share
```

### 5.2 与 Share 的关系

- 同一 `failSessionId`：Ad **或** Share **只领一次**（先成功者生效）。  
- 领奖后两按钮都不可再点。  
- 广告填充失败时：**不隐藏 Share**；可将 Ad 按钮改为 disabled + `Ad unavailable`。

### 5.3 适配层（现在就可定接口，实现空壳）

```ts
interface ContinueAdsAdapter {
  isEnabled(): boolean;
  isReady(): boolean;
  showRewarded(): Promise<"completed" | "dismissed" | "error" | "unavailable">;
}

// Phase A
class NoopAdsAdapter implements ContinueAdsAdapter {
  isEnabled() { return false; }
  isReady() { return false; }
  async showRewarded() { return "unavailable"; }
}
```

UI 只依赖 `adsEnabled` / adapter，不写死 SDK。

---

## 6. 状态机（失败子系统）

```
Playing
  → (wrong | timeout) → FailEnter
       → FailSheet
            ├─ share_flow
            │     ├─ native_share_ok → GrantContinue → LoadingLevel(N)
            │     ├─ native_share_cancel → FailSheet
            │     └─ fallback_sheet
            │           ├─ confirm_shared → GrantContinue → LoadingLevel(N)
            │           └─ back → FailSheet
            ├─ ad_flow (仅 adsEnabled)
            │     ├─ completed → GrantContinue → LoadingLevel(N)
            │     └─ fail/dismiss → FailSheet
            └─ start_over
                  ├─ confirm → LoadingLevel(1)
                  └─ cancel → FailSheet
```

**GrantContinue 不变量：**

- 同一 `failSessionId` 至多进入一次 `GrantContinue`  
- Grant 后忽略一切重复点击  

---

## 7. 文案（英文，可直接进字符串表）

### Phase A（无广告）

| Key | Copy |
|-----|------|
| `fail.title` | Level failed |
| `fail.wrong` | Not that one! |
| `fail.timeout` | Time’s up! |
| `fail.share_hint` | Share to keep your progress on Level {n}. |
| `fail.share` | Share to Continue |
| `fail.start_over` | Start Over |
| `fail.start_over_title` | Start over from Level 1? |
| `fail.start_over_body` | Your current progress on Level {n} will be lost. |
| `fail.start_over_confirm` | Start Over |
| `fail.start_over_cancel` | Cancel |
| `share.fallback_title` | Share to continue |
| `share.fallback_body` | Copy this message and send it to a friend: |
| `share.copy` | Copy Link |
| `share.copied` | Copied! |
| `share.confirm` | I’ve shared it |
| `share.back` | Back |
| `share.text` | I’m on Level {n} in Spot Odd One — find the emoji that doesn’t belong! |

### Phase B 追加

| Key | Copy |
|-----|------|
| `fail.watch_ad` | Watch Ad to Continue |
| `fail.ad_unavailable` | Ad unavailable. Try sharing instead. |

---

## 8. 埋点

| Event | 何时 | 属性 |
|-------|------|------|
| `level_fail` | 进入 Fail Sheet | `level`, `reason` |
| `fail_sheet_show` | 面板展示 | `level`, `ads_enabled` |
| `continue_share_tap` | 点 Share | `level`, `fail_session_id` |
| `continue_share_result` | 分享结束 | `result`: `native_ok` \| `native_cancel` \| `fallback_open` \| `fallback_confirm` \| `error` |
| `continue_granted` | 发奖成功 | `level`, `via`: `share_native` \| `share_fallback` \| `ad` |
| `continue_ad_tap` | 点 Ad（B） | `level` |
| `continue_ad_result` | 广告结束（B） | `result`: `completed` \| `dismissed` \| `error` \| `unavailable` |
| `restart_tap` | 点 Start Over | `level` |
| `restart_confirm` | 确认重来 | `from_level` |
| `restart_cancel` | 取消重来 | `level` |

监控关注：

- `fallback_confirm / fail_sheet_show` 过高 → 可能在刷续关（可接受，除非极端）  
- `native_cancel` 高 → 文案或分享时机问题  
- Phase B：`unavailable` 高 → 广告填充差，依赖 Share

---

## 9. 边界与异常

| 场景 | 处理 |
|------|------|
| 连点 Share | `sharing` 锁；Grant 后按钮禁用 |
| 分享中杀进程 | 不发奖；下次进游戏仍在 Level N 的失败前进度？→ 以存档为准：失败时**先不改** `currentLevel`，仅 Continue/StartOver 改存档 |
| 失败瞬间切后台 | 已停表；回前台仍停在 Fail Sheet |
| Clipboard 权限拒绝 | toast：`Couldn’t copy. Select the text manually.`；仍可点 I’ve shared it |
| 无网络 | Share / Start Over 仍可用（本地）；Ad 在 B 阶段走 unavailable |
| Campaign 已通关后失败 | MVP 无此路径；通关后走 Clear 页，不再进 Fail |
| Level 1 就失败 | Share 续关仍重开 Level 1；Start Over 等同重开 Level 1（可跳过确认或仍确认） |

### 9.1 进度写入时机（重要）

| 时机 | `currentLevel` |
|------|----------------|
| 过关 | 写成 `N+1`（或 Clear） |
| 失败进入面板 | **不改**（仍为 N） |
| Continue 成功 | 保持 N，重开 N |
| Start Over 确认 | 写成 `1` |

这样中途关页也不丢关。

---

## 10. 验收清单（Phase A）

- [ ] 失败面板只有 **Share** + **Start Over**，无 Ad 入口  
- [ ] 点错 / 超时都能进入面板，且网格锁定  
- [ ] 支持 `navigator.share` 的设备：完成分享后重开本关、10s 重置  
- [ ] 用户取消系统分享：不发奖、留在面板  
- [ ] 不支持 Share API：出现 Copy fallback；I’ve shared it 可续关  
- [ ] 同一失败只能续关一次  
- [ ] Start Over 有确认；确认后回 Level 1；Cancel 无副作用  
- [ ] `bestLevelReached` 在 Start Over 后仍保留  
- [ ] 关键事件可打出 `level_fail` / `continue_granted` / `restart_confirm`  
- [ ] `adsEnabled` 改 `true` 时无需重构面板结构即可加 Ad 按钮  

---

## 11. 实现优先级

| 优先级 | 项 | Phase |
|--------|----|-------|
| P0 | Fail Sheet + Start Over 确认 | A |
| P0 | Share native + fallback + grantContinue | A |
| P0 | failSessionId 防重复领奖 | A |
| P0 | 进度写入时机（§9.1） | A |
| P1 | 完整埋点 | A |
| P2 | NoopAdsAdapter 接口占位 | A（可选，10 分钟） |
| P3 | 真广告 SDK + Watch Ad UI | B |

---

## 12. 与主文档的关系

- 主文档 `PROJECT_DEV_DOC.md` §2.4 以本细则为准。  
- 前期文案以 **无 Ad** 为准；ASO/隐私政策在接广告前可不提激励视频，接入后再补。

---

## 附录 — 版本

| 版本 | 日期 | 说明 |
|------|------|------|
| v1.0 | 2026-07-18 | 首版；明确 Phase A 仅分享，Ad 用开关预留 |
