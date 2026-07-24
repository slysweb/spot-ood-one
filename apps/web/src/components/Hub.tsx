import { Link } from "react-router-dom";
import { difficultyLabel, THEMES } from "@/game/themeMeta";
import { getContinueLevel, getTotalLevels } from "@/game/campaign";
import type { AppSave } from "@/game/types";

interface HubProps {
  save: AppSave;
  onSettings: () => void;
}

export function Hub({ save, onSettings }: HubProps) {
  return (
    <section className="home hub">
      <div className="panel home-hero">
        <p className="eyebrow">Odd one out</p>
        <h1 className="display">
          Spot Odd <span style={{ color: "var(--orange-deep)" }}>One</span>
        </h1>
        <p className="body-text tagline">
          Pick a pack. Find the one that doesn’t belong.
        </p>
      </div>

      <div className="pack-grid pack-grid-tile">
        {THEMES.map((theme) => {
          const progress = save.themes[theme.id];
          const total = getTotalLevels(theme.id);
          const continueLevel = getContinueLevel(theme.id, progress);
          const hasProgress = progress.bestLevel > 1 || continueLevel > 1;

          return (
            <Link
              key={theme.id}
              to={theme.path}
              className={`pack-card pack-${theme.id}`}
            >
              <div className="pack-preview" aria-hidden="true">
                {theme.id === "monster" ? (
                  <>
                    <span className="pack-cell">
                      <img src="/monsters/monster_m01.webp" alt="" />
                    </span>
                    <span className="pack-cell">
                      <img src="/monsters/monster_m01.webp" alt="" />
                    </span>
                    <span className="pack-cell is-odd">
                      <img src="/monsters/monster_m03.webp" alt="" />
                    </span>
                    <span className="pack-cell">
                      <img src="/monsters/monster_m01.webp" alt="" />
                    </span>
                  </>
                ) : theme.id === "cat" ? (
                  <>
                    <span className="pack-cell">
                      <img src="/cats/cat_c01.webp" alt="" />
                    </span>
                    <span className="pack-cell">
                      <img src="/cats/cat_c01.webp" alt="" />
                    </span>
                    <span className="pack-cell is-odd">
                      <img src="/cats/cat_a01.webp" alt="" />
                    </span>
                    <span className="pack-cell">
                      <img src="/cats/cat_c01.webp" alt="" />
                    </span>
                  </>
                ) : theme.id === "dog" ? (
                  <>
                    <span className="pack-cell">
                      <img src="/dogs/dog_d01.webp" alt="" />
                    </span>
                    <span className="pack-cell">
                      <img src="/dogs/dog_d01.webp" alt="" />
                    </span>
                    <span className="pack-cell is-odd">
                      <img src="/cats/cat_c01.webp" alt="" />
                    </span>
                    <span className="pack-cell">
                      <img src="/dogs/dog_d01.webp" alt="" />
                    </span>
                  </>
                ) : theme.id === "fairy" ? (
                  <>
                    <span className="pack-cell">
                      <img src="/fairies/fairy_f01.webp" alt="" />
                    </span>
                    <span className="pack-cell">
                      <img src="/fairies/fairy_f01.webp" alt="" />
                    </span>
                    <span className="pack-cell is-odd">
                      <img src="/fairies/fairy_f02.webp" alt="" />
                    </span>
                    <span className="pack-cell">
                      <img src="/fairies/fairy_f01.webp" alt="" />
                    </span>
                  </>
                ) : theme.id === "color" ? (
                  <>
                    <span className="pack-cell swatch">
                      <span
                        className="cell-swatch"
                        style={{ background: "#E53935" }}
                      />
                    </span>
                    <span className="pack-cell swatch">
                      <span
                        className="cell-swatch"
                        style={{ background: "#E53935" }}
                      />
                    </span>
                    <span className="pack-cell swatch is-odd">
                      <span
                        className="cell-swatch"
                        style={{ background: "#1E88E5" }}
                      />
                    </span>
                    <span className="pack-cell swatch">
                      <span
                        className="cell-swatch"
                        style={{ background: "#E53935" }}
                      />
                    </span>
                  </>
                ) : theme.id === "fruit" ? (
                  <>
                    <span className="pack-cell">
                      <img src="/fruits/fruit_r01.webp" alt="" />
                    </span>
                    <span className="pack-cell">
                      <img src="/fruits/fruit_r01.webp" alt="" />
                    </span>
                    <span className="pack-cell is-odd">
                      <img src="/fruits/fruit_r09.webp" alt="" />
                    </span>
                    <span className="pack-cell">
                      <img src="/fruits/fruit_r01.webp" alt="" />
                    </span>
                  </>
                ) : (
                  <>
                    <span className="pack-cell emoji">🐶</span>
                    <span className="pack-cell emoji">🐶</span>
                    <span className="pack-cell emoji is-odd">🐱</span>
                    <span className="pack-cell emoji">🐶</span>
                  </>
                )}
              </div>
              <div className="pack-copy">
                <h2 className="pack-title">{theme.label}</h2>
                <p className="pack-diff">{difficultyLabel(theme.difficulty)}</p>
                <p className="pack-tag">{theme.findLine}</p>
                <p className="pack-meta">
                  {hasProgress
                    ? `Best ${progress.bestLevel}/${total}`
                    : `${total} levels`}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="home-links">
        <button type="button" className="link-btn" onClick={onSettings}>
          Settings
        </button>
        <Link to="/about" className="link-btn">
          About
        </Link>
      </div>
    </section>
  );
}
