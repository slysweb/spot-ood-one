import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Home } from "@/components/Home";
import { Play } from "@/components/Play";
import { Clear } from "@/components/Clear";
import {
  FailOverlay,
  PauseOverlay,
  SettingsOverlay,
  ShareFallbackOverlay,
  StartOverOverlay,
  TutorialOverlay,
} from "@/components/Overlays";
import {
  TIME_LIMIT_MS,
  TOTAL_LEVELS,
  buildCells,
  clampLevel,
  getContinueLevel,
  getLevel,
} from "@/game/levels";
import { loadProgress, saveProgress } from "@/game/storage";
import {
  buildSharePayload,
  copyText,
  tryNativeShare,
  waitUntilPageActive,
} from "@/game/share";
import type { FailReason, Overlay, ProgressSave, Screen } from "@/game/types";

export default function App() {
  const [progress, setProgress] = useState<ProgressSave>(() => loadProgress());
  const [screen, setScreen] = useState<Screen>("home");
  const [overlay, setOverlay] = useState<Overlay>(null);

  const [cells, setCells] = useState<string[]>([]);
  const [cols, setCols] = useState(3);
  const [retryCount, setRetryCount] = useState(0);
  const [locked, setLocked] = useState(false);
  const [remainingMs, setRemainingMs] = useState(TIME_LIMIT_MS);
  const [failReason, setFailReason] = useState<FailReason>("wrong");
  const [failSessionId, setFailSessionId] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);
  const [shareToast, setShareToast] = useState<string | null>(null);
  const [flashIndex, setFlashIndex] = useState<number | null>(null);
  const [flashKind, setFlashKind] = useState<"correct" | "wrong" | null>(null);

  const endsAtRef = useRef(0);
  const rafRef = useRef(0);
  const pauseRemainRef = useRef(TIME_LIMIT_MS);
  const frozenRemainRef = useRef<number | null>(null);
  const oddIndexRef = useRef(0);
  const lockedRef = useRef(false);
  const retryRef = useRef(0);
  const overlayRef = useRef<Overlay>(null);
  const sharingRef = useRef(false);
  const progressRef = useRef(progress);
  progressRef.current = progress;
  overlayRef.current = overlay;
  sharingRef.current = sharing;

  const persist = useCallback((next: ProgressSave) => {
    setProgress(next);
    saveProgress(next);
  }, []);

  const stopTimer = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    frozenRemainRef.current = null;
  }, []);

  const openFail = useCallback((reason: FailReason) => {
    stopTimer();
    setRemainingMs(0);
    setFailReason(reason);
    setFailSessionId(
      `fail_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    );
    setOverlay("fail");
  }, [stopTimer]);

  const startTimer = useCallback(
    (ms: number) => {
      stopTimer();
      const capped = Math.max(0, ms);
      setRemainingMs(capped);
      endsAtRef.current = performance.now() + capped;
      frozenRemainRef.current = null;

      const tick = (now: number) => {
        // Never run countdown under fail/share overlays or while native share is open.
        if (
          sharingRef.current ||
          overlayRef.current === "fail" ||
          overlayRef.current === "share-fallback" ||
          overlayRef.current === "start-over" ||
          overlayRef.current === "tutorial" ||
          overlayRef.current === "settings"
        ) {
          rafRef.current = 0;
          return;
        }

        if (document.hidden || overlayRef.current === "pause") {
          if (frozenRemainRef.current == null) {
            frozenRemainRef.current = Math.max(0, endsAtRef.current - now);
            setRemainingMs(frozenRemainRef.current);
          }
          rafRef.current = requestAnimationFrame(tick);
          return;
        }

        if (frozenRemainRef.current != null) {
          endsAtRef.current = now + frozenRemainRef.current;
          frozenRemainRef.current = null;
        }

        const left = Math.max(0, endsAtRef.current - now);
        setRemainingMs(left);
        if (left <= 0) {
          if (!lockedRef.current) {
            lockedRef.current = true;
            setLocked(true);
            stopTimer();
            openFail("timeout");
          }
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      rafRef.current = requestAnimationFrame(tick);
    },
    [openFail, stopTimer],
  );

  const loadLevel = useCallback(
    (levelIndex: number, retry: number, opts?: { startTimer?: boolean }) => {
      const level = getLevel(clampLevel(levelIndex));
      const built = buildCells(level, retry);
      setCols(level.grid.cols);
      setCells(built.cells);
      oddIndexRef.current = built.oddIndex;
      retryRef.current = retry;
      setRetryCount(retry);
      setLocked(false);
      lockedRef.current = false;
      setFlashIndex(null);
      setFlashKind(null);
      setFailSessionId(null);
      setRemainingMs(TIME_LIMIT_MS);
      if (opts?.startTimer === false) {
        stopTimer();
        return;
      }
      startTimer(TIME_LIMIT_MS);
    },
    [startTimer, stopTimer],
  );

  const enterPlay = (levelIndex: number) => {
    const level = clampLevel(levelIndex);
    const prev = progressRef.current;
    persist({
      ...prev,
      currentLevel: level,
      bestLevel: Math.max(prev.bestLevel, level),
    });
    setScreen("play");
    retryRef.current = 0;
    setRetryCount(0);

    if (!prev.tutorialSeen) {
      stopTimer();
      setOverlay("tutorial");
      return;
    }

    setOverlay(null);
    loadLevel(level, 0);
  };

  const beginAfterTutorial = () => {
    const prev = progressRef.current;
    persist({ ...prev, tutorialSeen: true });
    setOverlay(null);
    loadLevel(prev.currentLevel, 0);
  };

  const onCorrect = () => {
    lockedRef.current = true;
    setLocked(true);
    stopTimer();
    setFlashIndex(oddIndexRef.current);
    setFlashKind("correct");

    const prev = progressRef.current;
    const cleared = prev.currentLevel;

    if (cleared >= TOTAL_LEVELS) {
      persist({
        ...prev,
        currentLevel: 1,
        bestLevel: TOTAL_LEVELS,
        campaignCleared: true,
      });
      window.setTimeout(() => {
        setScreen("clear");
        setOverlay(null);
      }, 320);
      return;
    }

    const nextLevel = cleared + 1;
    persist({
      ...prev,
      currentLevel: nextLevel,
      bestLevel: Math.max(prev.bestLevel, nextLevel),
    });

    window.setTimeout(() => {
      loadLevel(nextLevel, 0);
    }, 320);
  };

  const onWrong = (index: number) => {
    lockedRef.current = true;
    setLocked(true);
    stopTimer();
    setFlashIndex(index);
    setFlashKind("wrong");
    window.setTimeout(() => openFail("wrong"), 260);
  };

  const onCellTap = (index: number) => {
    if (lockedRef.current || overlayRef.current) return;
    if (index === oddIndexRef.current) onCorrect();
    else onWrong(index);
  };

  const pause = () => {
    if (screen !== "play" || lockedRef.current) return;
    pauseRemainRef.current =
      frozenRemainRef.current ?? Math.max(0, endsAtRef.current - performance.now());
    stopTimer();
    setRemainingMs(pauseRemainRef.current);
    setOverlay("pause");
  };

  const resume = () => {
    setOverlay(null);
    startTimer(pauseRemainRef.current);
  };

  const goHome = () => {
    stopTimer();
    setOverlay(null);
    setScreen("home");
  };

  /** Resume the failed level only after share UI is fully gone; always full 10s. */
  const grantContinue = async () => {
    if (!failSessionId) return;
    const nextRetry = retryRef.current + 1;
    const level = progressRef.current.currentLevel;
    // Claim this fail session immediately to prevent double continue.
    setFailSessionId(null);
    stopTimer();
    setRemainingMs(TIME_LIMIT_MS);

    // Keep fail sheet up until the native share sheet is dismissed.
    await waitUntilPageActive();

    setSharing(false);
    sharingRef.current = false;
    setOverlay(null);
    loadLevel(level, nextRetry);
  };

  const handleShare = async () => {
    if (sharing || !failSessionId) return;
    setSharing(true);
    sharingRef.current = true;
    stopTimer();
    setRemainingMs(0);

    const payload = buildSharePayload(progressRef.current.currentLevel);
    const result = await tryNativeShare(payload);

    if (result === "shared") {
      // Do NOT start the clock until the native sheet is closed.
      await grantContinue();
      return;
    }

    setSharing(false);
    sharingRef.current = false;

    if (result === "cancelled") {
      setOverlay("fail");
      return;
    }
    setShareToast(null);
    setOverlay("share-fallback");
  };

  const handleCopy = async () => {
    const ok = await copyText(
      buildSharePayload(progressRef.current.currentLevel).combined,
    );
    setShareToast(ok ? "Copied!" : "Couldn’t copy. Select the text manually.");
    window.setTimeout(() => setShareToast(null), 1400);
  };

  const confirmStartOver = () => {
    const prev = progressRef.current;
    persist({ ...prev, currentLevel: 1 });
    setFailSessionId(null);
    setSharing(false);
    sharingRef.current = false;
    setOverlay(null);
    loadLevel(1, 0);
  };

  useEffect(() => {
    const onVis = () => {
      if (
        document.hidden &&
        screen === "play" &&
        !lockedRef.current &&
        !sharingRef.current &&
        overlayRef.current === null
      ) {
        pauseRemainRef.current = Math.max(
          0,
          endsAtRef.current - performance.now(),
        );
        stopTimer();
        setRemainingMs(pauseRemainRef.current);
        setOverlay("pause");
      }
    };
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, [screen, stopTimer]);

  useEffect(() => () => stopTimer(), [stopTimer]);

  const timerSec = Math.max(0, Math.ceil(remainingMs / 1000));
  const shareText = useMemo(
    () => buildSharePayload(progress.currentLevel).combined,
    [progress.currentLevel],
  );

  const timerFrozen =
    locked ||
    sharing ||
    overlay === "fail" ||
    overlay === "share-fallback" ||
    overlay === "start-over" ||
    overlay === "pause";

  return (
    <div className="app-shell">
      <header className="top-bar">
        <div className="brand-mark">
          Spot Odd <span>One</span>
        </div>
        <div style={{ fontWeight: 800, fontSize: "0.85rem" }}>
          {screen === "play" ? "Find it!" : "Free puzzle"}
        </div>
      </header>

      {screen === "home" && (
        <Home
          currentLevel={getContinueLevel(progress)}
          bestLevel={progress.bestLevel}
          totalLevels={TOTAL_LEVELS}
          onPlay={() => enterPlay(1)}
          onContinue={() => enterPlay(getContinueLevel(progress))}
          onSettings={() => setOverlay("settings")}
        />
      )}

      {screen === "play" && cells.length > 0 && (
        <Play
          levelIndex={progress.currentLevel}
          totalLevels={TOTAL_LEVELS}
          cols={cols}
          cells={cells}
          timerSec={timerSec}
          urgent={remainingMs <= 3000 && !timerFrozen}
          locked={locked || Boolean(overlay)}
          colorblind={progress.colorblind}
          flashIndex={flashIndex}
          flashKind={flashKind}
          onPause={pause}
          onTap={onCellTap}
        />
      )}

      {screen === "play" && cells.length === 0 && overlay === "tutorial" && (
        <div className="play" />
      )}

      {screen === "clear" && (
        <Clear totalLevels={TOTAL_LEVELS} onHome={goHome} />
      )}

      {overlay === "tutorial" && (
        <TutorialOverlay onOk={beginAfterTutorial} />
      )}
      {overlay === "fail" && (
        <FailOverlay
          reason={failReason}
          level={progress.currentLevel}
          sharing={sharing}
          onShare={handleShare}
          onStartOverAsk={() => setOverlay("start-over")}
        />
      )}
      {overlay === "share-fallback" && (
        <ShareFallbackOverlay
          shareText={shareText}
          toast={shareToast}
          onCopy={handleCopy}
          onConfirm={() => {
            void grantContinue();
          }}
          onBack={() => setOverlay("fail")}
        />
      )}
      {overlay === "start-over" && (
        <StartOverOverlay
          level={progress.currentLevel}
          onCancel={() => setOverlay("fail")}
          onConfirm={confirmStartOver}
        />
      )}
      {overlay === "pause" && (
        <PauseOverlay onResume={resume} onQuit={goHome} />
      )}
      {overlay === "settings" && (
        <SettingsOverlay
          sound={progress.sound}
          colorblind={progress.colorblind}
          onSound={(sound) => persist({ ...progress, sound })}
          onColorblind={(colorblind) => persist({ ...progress, colorblind })}
          onClose={() => setOverlay(null)}
        />
      )}

      <span hidden data-retry={retryCount} />
    </div>
  );
}
