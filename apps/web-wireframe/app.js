/**
 * Spot Odd One — clickable web wireframe
 * Phase A: Fail = Share / Start Over (no ads)
 * Demo: levels 1–5 only
 */

const DEMO_LEVELS = [
  { index: 1, cols: 3, rows: 3, base: "🐶", odd: "🐱", seed: 1001 },
  { index: 2, cols: 3, rows: 3, base: "🍎", odd: "🍌", seed: 1002 },
  { index: 3, cols: 3, rows: 3, base: "🐰", odd: "🦊", seed: 1003 },
  { index: 4, cols: 3, rows: 3, base: "👍", odd: "👎", seed: 1004 },
  { index: 5, cols: 3, rows: 3, base: "🍕", odd: "🍔", seed: 1005 },
];

const TIME_LIMIT_MS = 10_000;
const STORAGE_KEY = "soo_wireframe_v1";
const ADS_ENABLED = false; // Phase A

const state = {
  screen: "home",
  overlay: null,
  currentLevel: 1,
  bestLevel: 1,
  tutorialSeen: false,
  sound: true,
  colorblind: false,
  // play
  endsAt: 0,
  remainingMs: TIME_LIMIT_MS,
  raf: 0,
  locked: false,
  oddIndex: 0,
  cells: [],
  retryCount: 0,
  failSessionId: null,
  failReason: "wrong",
  paused: false,
  pauseRemaining: 0,
  sharing: false,
};

function loadSave() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw);
    state.currentLevel = clampLevel(data.currentLevel ?? 1);
    state.bestLevel = clampLevel(data.bestLevel ?? 1);
    state.tutorialSeen = !!data.tutorialSeen;
  } catch {
    /* ignore */
  }
}

function save() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      currentLevel: state.currentLevel,
      bestLevel: state.bestLevel,
      tutorialSeen: state.tutorialSeen,
    }),
  );
}

function clampLevel(n) {
  return Math.min(Math.max(1, Number(n) || 1), DEMO_LEVELS.length);
}

function levelData(index = state.currentLevel) {
  return DEMO_LEVELS[clampLevel(index) - 1];
}

/** Deterministic-ish shuffle for odd position */
function pickOddIndex(total, seed, retry) {
  const x = (seed * 9301 + retry * 49297 + 233280) % 233280;
  return x % total;
}

function sharePayload() {
  const n = state.currentLevel;
  const url = `${location.origin}${location.pathname}?utm_source=share&utm_medium=continue&utm_campaign=fail_continue&lv=${n}`;
  const text = `I’m on Level ${n} in Spot Odd One — find the emoji that doesn’t belong!`;
  return { title: "Spot Odd One", text, url, combined: `${text}\n${url}` };
}

function $(sel) {
  return document.querySelector(sel);
}

function $all(sel) {
  return [...document.querySelectorAll(sel)];
}

function showScreen(name) {
  state.screen = name;
  $all(".screen[data-screen]").forEach((el) => {
    const isOverlay = el.classList.contains("screen-overlay");
    if (isOverlay) return;
    el.hidden = el.dataset.screen !== name;
  });
  bindText();
}

function showOverlay(name) {
  state.overlay = name;
  $all(".screen-overlay").forEach((el) => {
    el.hidden = el.dataset.screen !== name;
  });
  bindText();
}

function hideOverlay() {
  state.overlay = null;
  $all(".screen-overlay").forEach((el) => {
    el.hidden = true;
  });
}

function bindText() {
  $all("[data-bind]").forEach((el) => {
    const key = el.dataset.bind;
    if (key === "currentLevel") el.textContent = String(state.currentLevel);
    if (key === "bestLevel") el.textContent = String(state.bestLevel);
    if (key === "timerSec") el.textContent = String(Math.max(0, Math.ceil(state.remainingMs / 1000)));
    if (key === "failReason") {
      el.textContent = state.failReason === "timeout" ? "Time’s up!" : "Not that one!";
    }
    if (key === "shareText") el.textContent = sharePayload().combined;
    if (key === "playHint") {
      el.textContent = state.locked ? "…" : "Tap the odd one.";
    }
  });

  const continueBtn = $('[data-action="continue"]');
  if (continueBtn) {
    continueBtn.hidden = !(state.currentLevel > 1 || state.bestLevel > 1);
  }

  const timer = $('[data-bind-class="timer"]');
  if (timer) {
    timer.classList.toggle("is-urgent", state.remainingMs <= 3000 && state.screen === "play" && !state.locked);
  }
}

function goHome() {
  stopTimer();
  hideOverlay();
  showScreen("home");
  bindText();
}

function startPlay({ fromContinue = false } = {}) {
  hideOverlay();
  showScreen("play");
  if (!state.tutorialSeen) {
    showOverlay("tutorial");
    return;
  }
  beginLevel({ keepRetry: fromContinue });
}

function beginLevel({ keepRetry = false } = {}) {
  if (!keepRetry) state.retryCount = 0;
  state.locked = false;
  state.failSessionId = null;
  state.paused = false;
  buildBoard();
  startTimer(TIME_LIMIT_MS);
  bindText();
}

function buildBoard() {
  const level = levelData();
  const total = level.cols * level.rows;
  state.oddIndex = pickOddIndex(total, level.seed, state.retryCount);
  state.cells = Array.from({ length: total }, (_, i) =>
    i === state.oddIndex ? level.odd : level.base,
  );

  const board = $("#board");
  board.style.gridTemplateColumns = `repeat(${level.cols}, 1fr)`;
  board.classList.remove("is-locked");
  board.innerHTML = "";

  state.cells.forEach((emoji, index) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "cell";
    btn.textContent = emoji;
    btn.setAttribute("role", "gridcell");
    btn.addEventListener("click", () => onCellTap(index, btn));
    board.appendChild(btn);
  });
}

function onCellTap(index, btn) {
  if (state.locked || state.overlay) return;
  if (index === state.oddIndex) {
    onCorrect(btn);
  } else {
    onWrong(btn);
  }
}

function onCorrect(btn) {
  state.locked = true;
  stopTimer();
  $("#board").classList.add("is-locked");
  btn.classList.add("is-correct");

  const next = state.currentLevel + 1;
  if (next > DEMO_LEVELS.length) {
    state.bestLevel = Math.max(state.bestLevel, DEMO_LEVELS.length);
    state.currentLevel = 1;
    save();
    setTimeout(() => {
      hideOverlay();
      showScreen("clear");
      bindText();
    }, 350);
    return;
  }

  state.currentLevel = next;
  state.bestLevel = Math.max(state.bestLevel, next);
  save();
  setTimeout(() => beginLevel({ keepRetry: false }), 350);
}

function onWrong(btn) {
  state.locked = true;
  stopTimer();
  $("#board").classList.add("is-locked");
  btn.classList.add("is-wrong");
  state.failReason = "wrong";
  setTimeout(() => openFail(), 280);
}

function openFail() {
  state.failSessionId = `fail_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
  // currentLevel unchanged on fail (spec §9.1)
  save();
  showOverlay("fail");
}

function startTimer(ms) {
  stopTimer();
  state.remainingMs = ms;
  state.endsAt = performance.now() + ms;
  bindText();

  const tick = (now) => {
    if (state.paused || state.overlay === "pause") {
      state.raf = requestAnimationFrame(tick);
      return;
    }
    state.remainingMs = Math.max(0, state.endsAt - now);
    bindText();
    if (state.remainingMs <= 0) {
      onTimeout();
      return;
    }
    state.raf = requestAnimationFrame(tick);
  };
  state.raf = requestAnimationFrame(tick);
}

function stopTimer() {
  if (state.raf) cancelAnimationFrame(state.raf);
  state.raf = 0;
}

function onTimeout() {
  if (state.locked) return;
  state.locked = true;
  stopTimer();
  $("#board")?.classList.add("is-locked");
  state.failReason = "timeout";
  openFail();
}

function pauseGame() {
  if (state.screen !== "play" || state.locked) return;
  state.paused = true;
  state.pauseRemaining = state.remainingMs;
  stopTimer();
  showOverlay("pause");
}

function resumeGame() {
  hideOverlay();
  state.paused = false;
  startTimer(state.pauseRemaining || state.remainingMs);
}

async function handleShare() {
  if (state.sharing || !state.failSessionId) return;
  state.sharing = true;
  const payload = sharePayload();

  try {
    if (navigator.share) {
      await navigator.share({
        title: payload.title,
        text: payload.text,
        url: payload.url,
      });
      grantContinue("share_native");
      return;
    }
    showOverlay("share-fallback");
  } catch (err) {
    if (err && err.name === "AbortError") {
      // cancelled — stay on fail
      showOverlay("fail");
    } else {
      showOverlay("share-fallback");
    }
  } finally {
    state.sharing = false;
  }
}

function grantContinue(_via) {
  if (!state.failSessionId) return;
  state.failSessionId = null;
  state.retryCount += 1;
  // keep currentLevel N
  save();
  hideOverlay();
  beginLevel({ keepRetry: true });
}

async function copyShare() {
  const text = sharePayload().combined;
  const toast = $('[data-bind="toast"]');
  try {
    await navigator.clipboard.writeText(text);
    if (toast) {
      toast.hidden = false;
      toast.textContent = "Copied!";
      setTimeout(() => {
        toast.hidden = true;
      }, 1200);
    }
  } catch {
    if (toast) {
      toast.hidden = false;
      toast.textContent = "Couldn’t copy. Select the text manually.";
    }
  }
}

function confirmStartOver() {
  state.currentLevel = 1;
  state.retryCount = 0;
  state.failSessionId = null;
  // bestLevel retained
  save();
  hideOverlay();
  beginLevel({ keepRetry: false });
}

function onAction(action) {
  switch (action) {
    case "play":
      state.currentLevel = 1;
      save();
      startPlay();
      break;
    case "continue":
      startPlay();
      break;
    case "tutorial-ok":
      state.tutorialSeen = true;
      save();
      hideOverlay();
      beginLevel();
      break;
    case "pause":
      pauseGame();
      break;
    case "resume":
      resumeGame();
      break;
    case "quit-home":
      goHome();
      break;
    case "share":
      handleShare();
      break;
    case "copy-share":
      copyShare();
      break;
    case "confirm-shared":
      grantContinue("share_fallback");
      break;
    case "share-back":
      showOverlay("fail");
      break;
    case "start-over-ask":
      showOverlay("start-over");
      break;
    case "start-over-cancel":
      showOverlay("fail");
      break;
    case "start-over-confirm":
      confirmStartOver();
      break;
    case "open-settings":
      showOverlay("settings");
      break;
    case "close-settings":
      hideOverlay();
      break;
    default:
      break;
  }
}

function wireEvents() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-action]");
    if (!btn) return;
    onAction(btn.dataset.action);
  });

  // Visibility: freeze timer when tab hidden during play
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state.screen === "play" && !state.locked && !state.overlay) {
      pauseGame();
    }
  });
}

function boot() {
  loadSave();
  wireEvents();
  showScreen("home");
  hideOverlay();
  bindText();

  // Annotate ads flag for debugging
  console.info("[wireframe] adsEnabled =", ADS_ENABLED);
}

boot();
