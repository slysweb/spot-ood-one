import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { FailReason } from "@/game/types";
import { ADS_ENABLED } from "@/game/config";

interface OverlayShellProps {
  children: ReactNode;
}

function OverlayShell({ children }: OverlayShellProps) {
  return <div className="overlay">{children}</div>;
}

export function TutorialOverlay({
  onOk,
  body = "Tap the emoji that doesn’t match the rest. You have 10 seconds.",
}: {
  onOk: () => void;
  body?: string;
}) {
  return (
    <OverlayShell>
      <div className="sheet center">
        <p className="kicker">How to play</p>
        <h2>Spot the odd one</h2>
        <p>{body}</p>
        <button type="button" className="btn btn-primary" onClick={onOk}>
          Got it
        </button>
      </div>
    </OverlayShell>
  );
}

export function FailOverlay({
  reason,
  level,
  sharing,
  onShare,
  onStartOverAsk,
}: {
  reason: FailReason;
  level: number;
  sharing: boolean;
  onShare: () => void;
  onStartOverAsk: () => void;
}) {
  return (
    <OverlayShell>
      <div className="sheet">
        <p className="kicker">Level failed</p>
        <h2>{reason === "timeout" ? "Time’s up!" : "Not that one!"}</h2>
        <p>Share to keep your progress on Level {level}.</p>
        <div className="stack">
          {ADS_ENABLED && (
            <button type="button" className="btn btn-primary" disabled>
              Watch Ad to Continue
            </button>
          )}
          <button
            type="button"
            className="btn btn-primary"
            onClick={onShare}
            disabled={sharing}
          >
            Share to Continue
          </button>
          <button
            type="button"
            className="btn btn-danger-ghost"
            onClick={onStartOverAsk}
          >
            Start Over
          </button>
        </div>
      </div>
    </OverlayShell>
  );
}

export function ShareFallbackOverlay({
  shareText,
  toast,
  onCopy,
  onConfirm,
  onBack,
}: {
  shareText: string;
  toast: string | null;
  onCopy: () => void;
  onConfirm: () => void;
  onBack: () => void;
}) {
  return (
    <OverlayShell>
      <div className="sheet">
        <p className="kicker">Share to continue</p>
        <h2>Copy &amp; send</h2>
        <p>Copy this message and send it to a friend:</p>
        <div className="share-box">{shareText}</div>
        <div className="stack">
          <button type="button" className="btn btn-primary" onClick={onCopy}>
            Copy Link
          </button>
          <button type="button" className="btn btn-secondary" onClick={onConfirm}>
            I’ve shared it
          </button>
          <button type="button" className="btn btn-ghost" onClick={onBack}>
            Back
          </button>
        </div>
        {toast && <p className="toast">{toast}</p>}
      </div>
    </OverlayShell>
  );
}

export function StartOverOverlay({
  level,
  onCancel,
  onConfirm,
}: {
  level: number;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <OverlayShell>
      <div className="sheet center">
        <h2>Start over from Level 1?</h2>
        <p>Your current progress on Level {level} will be lost.</p>
        <div className="btn-row">
          <button type="button" className="btn btn-ghost" onClick={onCancel}>
            Cancel
          </button>
          <button type="button" className="btn btn-danger" onClick={onConfirm}>
            Start Over
          </button>
        </div>
      </div>
    </OverlayShell>
  );
}

export function PauseOverlay({
  onResume,
  onQuit,
}: {
  onResume: () => void;
  onQuit: () => void;
}) {
  return (
    <OverlayShell>
      <div className="sheet center">
        <h2>Paused</h2>
        <div className="stack">
          <button type="button" className="btn btn-primary" onClick={onResume}>
            Resume
          </button>
          <button type="button" className="btn btn-ghost" onClick={onQuit}>
            Quit to Home
          </button>
        </div>
      </div>
    </OverlayShell>
  );
}

export function SettingsOverlay({
  sound,
  colorblind,
  onSound,
  onColorblind,
  onClose,
}: {
  sound: boolean;
  colorblind: boolean;
  onSound: (v: boolean) => void;
  onColorblind: (v: boolean) => void;
  onClose: () => void;
}) {
  return (
    <OverlayShell>
      <div className="sheet">
        <h2>Settings</h2>
        <label className="toggle">
          <span>Sound</span>
          <input
            type="checkbox"
            checked={sound}
            onChange={(e) => onSound(e.target.checked)}
          />
        </label>
        <label className="toggle">
          <span>Color-blind assist</span>
          <input
            type="checkbox"
            checked={colorblind}
            onChange={(e) => onColorblind(e.target.checked)}
          />
        </label>
        <p style={{ marginTop: 14 }}>No account needed. Progress stays on this device.</p>
        <p className="settings-about">
          <Link to="/about" className="link-btn" onClick={onClose}>
            About &amp; privacy
          </Link>
        </p>
        <button type="button" className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </div>
    </OverlayShell>
  );
}
