import { Link } from "react-router-dom";
import type { ThemeMeta } from "@/game/themeMeta";

interface ThemeHomeProps {
  meta: ThemeMeta;
  currentLevel: number;
  bestLevel: number;
  totalLevels: number;
  onPlay: () => void;
  onContinue: () => void;
  onSettings: () => void;
}

export function ThemeHome({
  meta,
  currentLevel,
  bestLevel,
  totalLevels,
  onPlay,
  onContinue,
  onSettings,
}: ThemeHomeProps) {
  const showContinue = currentLevel > 1 || bestLevel > 1;

  return (
    <section className="home">
      <div className="panel home-hero">
        <p className="eyebrow">{meta.eyebrow}</p>
        <h1 className="display">
          Spot{" "}
          <span style={{ color: "var(--orange-deep)" }}>{meta.headline}</span>
        </h1>
        <p className="body-text tagline">{meta.findLine}</p>

        <div className="preview-board" aria-hidden="true">
          {meta.id === "monster" ? (
            <>
              <span className="cell preview-monster">
                <img src="/monsters/monster_m01.png" alt="" />
              </span>
              <span className="cell preview-monster">
                <img src="/monsters/monster_m01.png" alt="" />
              </span>
              <span className="cell preview-monster is-odd">
                <img src="/monsters/monster_m03.png" alt="" />
              </span>
              <span className="cell preview-monster">
                <img src="/monsters/monster_m01.png" alt="" />
              </span>
              <span className="cell preview-monster">
                <img src="/monsters/monster_m01.png" alt="" />
              </span>
              <span className="cell preview-monster">
                <img src="/monsters/monster_m01.png" alt="" />
              </span>
              <span className="cell preview-monster">
                <img src="/monsters/monster_m01.png" alt="" />
              </span>
              <span className="cell preview-monster">
                <img src="/monsters/monster_m01.png" alt="" />
              </span>
              <span className="cell preview-monster">
                <img src="/monsters/monster_m01.png" alt="" />
              </span>
            </>
          ) : (
            <>
              <span className="cell">🐶</span>
              <span className="cell">🐶</span>
              <span className="cell is-odd">🐱</span>
              <span className="cell">🐶</span>
              <span className="cell">🐶</span>
              <span className="cell">🐶</span>
              <span className="cell">🐶</span>
              <span className="cell">🐶</span>
              <span className="cell">🐶</span>
            </>
          )}
        </div>
      </div>

      <div className="stack">
        <button type="button" className="btn btn-primary" onClick={onPlay}>
          Play
        </button>
        {showContinue && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onContinue}
          >
            Continue · Level {currentLevel}
          </button>
        )}
      </div>

      <p className="meta">
        Best: Level {bestLevel} / {totalLevels}
      </p>
      <div className="home-links">
        <Link to="/" className="link-btn">
          All packs
        </Link>
        <button type="button" className="link-btn" onClick={onSettings}>
          Settings
        </button>
      </div>
    </section>
  );
}
