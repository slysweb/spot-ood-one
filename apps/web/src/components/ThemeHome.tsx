import { Link } from "react-router-dom";
import type { ThemeMeta } from "@/game/themeMeta";

interface ThemeHomeProps {
  meta: ThemeMeta;
  currentLevel: number;
  bestLevel: number;
  totalLevels: number;
  campaignCleared?: boolean;
  onPlay: () => void;
  onContinue: () => void;
  onSettings: () => void;
}

export function ThemeHome({
  meta,
  currentLevel,
  bestLevel,
  totalLevels,
  campaignCleared = false,
  onPlay,
  onContinue,
  onSettings,
}: ThemeHomeProps) {
  const cleared = campaignCleared || bestLevel >= totalLevels;
  /** Mid-run resume only — hide after campaign clear */
  const showContinue =
    !cleared && (currentLevel > 1 || bestLevel > 1);

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
              <span className="cell preview-art">
                <img src="/monsters/monster_m01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/monsters/monster_m01.webp" alt="" />
              </span>
              <span className="cell preview-art is-odd">
                <img src="/monsters/monster_m03.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/monsters/monster_m01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/monsters/monster_m01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/monsters/monster_m01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/monsters/monster_m01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/monsters/monster_m01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/monsters/monster_m01.webp" alt="" />
              </span>
            </>
          ) : meta.id === "cat" ? (
            <>
              <span className="cell preview-art">
                <img src="/cats/cat_c01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/cats/cat_c01.webp" alt="" />
              </span>
              <span className="cell preview-art is-odd">
                <img src="/cats/cat_a01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/cats/cat_c01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/cats/cat_c01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/cats/cat_c01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/cats/cat_c01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/cats/cat_c01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/cats/cat_c01.webp" alt="" />
              </span>
            </>
          ) : meta.id === "dog" ? (
            <>
              <span className="cell preview-art">
                <img src="/dogs/dog_d01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/dogs/dog_d01.webp" alt="" />
              </span>
              <span className="cell preview-art is-odd">
                <img src="/cats/cat_c01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/dogs/dog_d01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/dogs/dog_d01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/dogs/dog_d01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/dogs/dog_d01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/dogs/dog_d01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/dogs/dog_d01.webp" alt="" />
              </span>
            </>
          ) : meta.id === "fairy" ? (
            <>
              <span className="cell preview-art">
                <img src="/fairies/fairy_f01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fairies/fairy_f01.webp" alt="" />
              </span>
              <span className="cell preview-art is-odd">
                <img src="/fairies/fairy_f02.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fairies/fairy_f01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fairies/fairy_f01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fairies/fairy_f01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fairies/fairy_f01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fairies/fairy_f01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fairies/fairy_f01.webp" alt="" />
              </span>
            </>
          ) : meta.id === "color" ? (
            <>
              <span className="cell preview-art swatch">
                <span className="cell-swatch" style={{ background: "#E53935" }} />
              </span>
              <span className="cell preview-art swatch">
                <span className="cell-swatch" style={{ background: "#E53935" }} />
              </span>
              <span className="cell preview-art swatch is-odd">
                <span className="cell-swatch" style={{ background: "#1E88E5" }} />
              </span>
              <span className="cell preview-art swatch">
                <span className="cell-swatch" style={{ background: "#E53935" }} />
              </span>
              <span className="cell preview-art swatch">
                <span className="cell-swatch" style={{ background: "#E53935" }} />
              </span>
              <span className="cell preview-art swatch">
                <span className="cell-swatch" style={{ background: "#E53935" }} />
              </span>
              <span className="cell preview-art swatch">
                <span className="cell-swatch" style={{ background: "#E53935" }} />
              </span>
              <span className="cell preview-art swatch">
                <span className="cell-swatch" style={{ background: "#E53935" }} />
              </span>
              <span className="cell preview-art swatch">
                <span className="cell-swatch" style={{ background: "#E53935" }} />
              </span>
            </>
          ) : meta.id === "fruit" ? (
            <>
              <span className="cell preview-art">
                <img src="/fruits/fruit_r01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fruits/fruit_r01.webp" alt="" />
              </span>
              <span className="cell preview-art is-odd">
                <img src="/fruits/fruit_r09.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fruits/fruit_r01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fruits/fruit_r01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fruits/fruit_r01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fruits/fruit_r01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fruits/fruit_r01.webp" alt="" />
              </span>
              <span className="cell preview-art">
                <img src="/fruits/fruit_r01.webp" alt="" />
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
