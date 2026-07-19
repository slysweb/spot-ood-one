import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ThemeHome } from "@/components/ThemeHome";
import { Play } from "@/components/Play";
import { Clear } from "@/components/Clear";
import { Shell } from "@/components/Shell";
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
  buildThemeLevel,
  clampLevel,
  getContinueLevel,
  getTotalLevels,
} from "@/game/campaign";
import { getThemeProgress, loadSave, saveSave } from "@/game/storage";
import {
  buildSharePayload,
  copyText,
  tryNativeShare,
  waitUntilPageActive,
} from "@/game/share";
import { getThemeMeta, isThemeId } from "@/game/themeMeta";
import type {
  AppSave,
  CellView,
  FailReason,
  Overlay,
  Screen,
  ThemeId,
} from "@/game/types";
import { usePageMeta } from "@/hooks/usePageMeta";
import { getThemePageMeta } from "@/seo/pageMeta";

export function ThemeGamePage() {
  const { themeId } = useParams();
  if (!isThemeId(themeId)) {
    return <Navigate to="/" replace />;
  }
  // Remount on theme change so in-progress play/timer/overlays don't linger
  // across Other packs navigation (same route, different param).
  return <ThemeGame key={themeId} theme={themeId} />;
}

function ThemeGame({ theme }: { theme: ThemeId }) {
  const meta = getThemeMeta(theme);
  const landingMeta = getThemePageMeta(theme);
  const [save, setSave] = useState<AppSave>(() => {
    const s = loadSave();
    return s.theme === theme ? s : { ...s, theme };
  });
  const [screen, setScreen] = useState<Screen>("home");
  const [overlay, setOverlay] = useState<Overlay>(null);

  usePageMeta(landingMeta);

  const [cells, setCells] = useState<CellView[]>([]);
  const [cols, setCols] = useState(3);
  const [boardFx, setBoardFx] = useState("none");
  const [oddFx, setOddFx] = useState("none");
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
  const cellsRef = useRef<CellView[]>([]);
  const teleportFreezeUntilRef = useRef(0);
  const tapOddIndexRef = useRef<number | null>(null);
  const lockedRef = useRef(false);
  const retryRef = useRef(0);
  const overlayRef = useRef<Overlay>(null);
  const sharingRef = useRef(false);
  const saveRef = useRef(save);
  saveRef.current = save;
  overlayRef.current = overlay;
  sharingRef.current = sharing;
  cellsRef.current = cells;

  const themeProgress = getThemeProgress(save, theme);
  const totalLevels = getTotalLevels(theme);

  useEffect(() => {
    const s = loadSave();
    if (s.theme !== theme) {
      const next = { ...s, theme };
      setSave(next);
      saveSave(next);
    }
  }, [theme]);

  const persist = useCallback((next: AppSave) => {
    setSave(next);
    saveSave(next);
  }, []);

  const patchTheme = useCallback(
    (patch: Partial<typeof themeProgress>) => {
      const prev = saveRef.current;
      persist({
        ...prev,
        theme,
        themes: {
          ...prev.themes,
          [theme]: { ...prev.themes[theme], ...patch },
        },
      });
    },
    [persist, theme],
  );

  const stopTimer = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = 0;
    frozenRemainRef.current = null;
  }, []);

  const openFail = useCallback(
    (reason: FailReason) => {
      stopTimer();
      setRemainingMs(0);
      setFailReason(reason);
      setFailSessionId(
        `fail_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      );
      setOverlay("fail");
    },
    [stopTimer],
  );

  const startTimer = useCallback(
    (ms: number) => {
      stopTimer();
      const capped = Math.max(0, ms);
      setRemainingMs(capped);
      endsAtRef.current = performance.now() + capped;
      frozenRemainRef.current = null;

      const tick = (now: number) => {
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
    (levelIndex: number, retry: number) => {
      const built = buildThemeLevel(theme, clampLevel(theme, levelIndex), retry);
      setCols(built.cols);
      setCells(built.cells);
      cellsRef.current = built.cells;
      setBoardFx(built.fx.board);
      setOddFx(built.fx.odd);
      oddIndexRef.current = built.oddIndex;
      teleportFreezeUntilRef.current = 0;
      tapOddIndexRef.current = null;
      retryRef.current = retry;
      setRetryCount(retry);
      setLocked(false);
      lockedRef.current = false;
      setFlashIndex(null);
      setFlashKind(null);
      setFailSessionId(null);
      setRemainingMs(built.timeLimitMs || TIME_LIMIT_MS);
      startTimer(built.timeLimitMs || TIME_LIMIT_MS);
    },
    [startTimer, theme],
  );

  const enterPlay = (levelIndex: number) => {
    const level = clampLevel(theme, levelIndex);
    const prev = saveRef.current;
    const tp = prev.themes[theme];
    persist({
      ...prev,
      theme,
      themes: {
        ...prev.themes,
        [theme]: {
          ...tp,
          currentLevel: level,
          bestLevel: Math.max(tp.bestLevel, level),
        },
      },
    });
    setScreen("play");
    retryRef.current = 0;
    setRetryCount(0);

    if (!tp.tutorialSeen) {
      stopTimer();
      setOverlay("tutorial");
      return;
    }

    setOverlay(null);
    loadLevel(level, 0);
  };

  const beginAfterTutorial = () => {
    const tp = saveRef.current.themes[theme];
    patchTheme({ tutorialSeen: true });
    setOverlay(null);
    loadLevel(tp.currentLevel, 0);
  };

  const onCorrect = () => {
    lockedRef.current = true;
    setLocked(true);
    stopTimer();
    const oddFlash = cellsRef.current.findIndex((c) => c.isOdd);
    setFlashIndex(oddFlash >= 0 ? oddFlash : oddIndexRef.current);
    setFlashKind("correct");

    const tp = saveRef.current.themes[theme];
    const cleared = tp.currentLevel;
    const total = getTotalLevels(theme);

    if (cleared >= total) {
      patchTheme({
        currentLevel: 1,
        bestLevel: total,
        campaignCleared: true,
      });
      window.setTimeout(() => {
        setScreen("clear");
        setOverlay(null);
      }, 320);
      return;
    }

    const nextLevel = cleared + 1;
    patchTheme({
      currentLevel: nextLevel,
      bestLevel: Math.max(tp.bestLevel, nextLevel),
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

  const resolveOddIndex = () => {
    const fromCells = cellsRef.current.findIndex((c) => c.isOdd);
    return fromCells >= 0 ? fromCells : oddIndexRef.current;
  };

  const onPointerDownCell = () => {
    if (lockedRef.current || overlayRef.current) return;
    // Lock the odd position for this tap; freeze teleport so it can't move mid-click
    tapOddIndexRef.current = resolveOddIndex();
    teleportFreezeUntilRef.current = performance.now() + 2500;
  };

  const onCellTap = (index: number) => {
    if (lockedRef.current || overlayRef.current) return;
    const odd = tapOddIndexRef.current ?? resolveOddIndex();
    tapOddIndexRef.current = null;
    if (index === odd) onCorrect();
    else onWrong(index);
  };

  const pause = () => {
    if (screen !== "play" || lockedRef.current) return;
    pauseRemainRef.current =
      frozenRemainRef.current ??
      Math.max(0, endsAtRef.current - performance.now());
    stopTimer();
    setRemainingMs(pauseRemainRef.current);
    setOverlay("pause");
  };

  const resume = () => {
    setOverlay(null);
    startTimer(pauseRemainRef.current);
  };

  const goThemeHome = () => {
    stopTimer();
    setOverlay(null);
    setScreen("home");
  };

  const grantContinue = async () => {
    if (!failSessionId) return;
    const nextRetry = retryRef.current + 1;
    const level = saveRef.current.themes[theme].currentLevel;
    setFailSessionId(null);
    stopTimer();
    setRemainingMs(TIME_LIMIT_MS);
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

    const level = saveRef.current.themes[theme].currentLevel;
    const payload = buildSharePayload(level);
    const result = await tryNativeShare(payload);

    if (result === "shared") {
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
    const level = saveRef.current.themes[theme].currentLevel;
    const ok = await copyText(buildSharePayload(level).combined);
    setShareToast(ok ? "Copied!" : "Couldn’t copy. Select the text manually.");
    window.setTimeout(() => setShareToast(null), 1400);
  };

  const confirmStartOver = () => {
    patchTheme({ currentLevel: 1 });
    setFailSessionId(null);
    setSharing(false);
    sharingRef.current = false;
    setOverlay(null);
    loadLevel(1, 0);
  };

  useEffect(() => {
    if (screen !== "play" || oddFx !== "teleport" || locked || overlay) return;
    const id = window.setInterval(() => {
      if (lockedRef.current || overlayRef.current) return;
      if (performance.now() < teleportFreezeUntilRef.current) return;
      setCells((prev) => {
        if (prev.length < 2) return prev;
        const from = prev.findIndex((c) => c.isOdd);
        if (from < 0) return prev;
        let to = from;
        let guard = 0;
        while (to === from && guard < 8) {
          to = Math.floor(Math.random() * prev.length);
          guard += 1;
        }
        if (to === from) return prev;
        const next = [...prev];
        const tmp = next[from];
        next[from] = next[to];
        next[to] = tmp;
        // Keep stable keys — remounting restarted wobble on only 2 cells and looked like a fake odd
        oddIndexRef.current = to;
        cellsRef.current = next;
        // Give the player time to tap after each hop
        teleportFreezeUntilRef.current = performance.now() + 900;
        return next;
      });
    }, 2200);
    return () => window.clearInterval(id);
  }, [screen, oddFx, locked, overlay, cells.length]);

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
    () => buildSharePayload(themeProgress.currentLevel).combined,
    [themeProgress.currentLevel],
  );

  const timerFrozen =
    locked ||
    sharing ||
    overlay === "fail" ||
    overlay === "share-fallback" ||
    overlay === "start-over" ||
    overlay === "pause";

  const subtitle =
    screen === "play" ? "Find it!" : meta.label;

  return (
    <Shell subtitle={subtitle} showHomeLink>
      {screen === "home" && (
        <ThemeHome
          meta={meta}
          currentLevel={getContinueLevel(theme, themeProgress)}
          bestLevel={themeProgress.bestLevel}
          totalLevels={totalLevels}
          onPlay={() => enterPlay(1)}
          onContinue={() =>
            enterPlay(getContinueLevel(theme, themeProgress))
          }
          onSettings={() => setOverlay("settings")}
        />
      )}

      {screen === "play" && cells.length > 0 && (
        <Play
          themeId={theme}
          levelIndex={themeProgress.currentLevel}
          totalLevels={totalLevels}
          cols={cols}
          cells={cells}
          boardFx={boardFx}
          timerSec={timerSec}
          urgent={remainingMs <= 3000 && !timerFrozen}
          locked={locked || Boolean(overlay)}
          colorblind={save.colorblind}
          flashIndex={flashIndex}
          flashKind={flashKind}
          onPause={pause}
          onTap={onCellTap}
          onPointerDownCell={onPointerDownCell}
        />
      )}

      {screen === "play" && cells.length === 0 && overlay === "tutorial" && (
        <div className="play" />
      )}

      {screen === "clear" && (
        <Clear totalLevels={totalLevels} onHome={goThemeHome} />
      )}

      {overlay === "tutorial" && (
        <TutorialOverlay onOk={beginAfterTutorial} body={meta.tutorialBody} />
      )}
      {overlay === "fail" && (
        <FailOverlay
          reason={failReason}
          level={themeProgress.currentLevel}
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
          level={themeProgress.currentLevel}
          onCancel={() => setOverlay("fail")}
          onConfirm={confirmStartOver}
        />
      )}
      {overlay === "pause" && (
        <PauseOverlay onResume={resume} onQuit={goThemeHome} />
      )}
      {overlay === "settings" && (
        <SettingsOverlay
          sound={save.sound}
          colorblind={save.colorblind}
          onSound={(sound) => persist({ ...save, sound })}
          onColorblind={(colorblind) => persist({ ...save, colorblind })}
          onClose={() => setOverlay(null)}
        />
      )}

      <span hidden data-retry={retryCount} />
    </Shell>
  );
}
