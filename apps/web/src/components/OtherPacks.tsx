import { Link } from "react-router-dom";
import { difficultyLabel, THEMES } from "@/game/themeMeta";
import type { ThemeId } from "@/game/types";

const THUMBS: Record<
  ThemeId,
  {
    main: string;
    odd: string;
    emoji?: boolean;
    swatch?: boolean;
    glyph?: boolean;
  }
> = {
  emoji: { main: "🐶", odd: "🐱", emoji: true },
  monster: {
    main: "/monsters/monster_m01.webp",
    odd: "/monsters/monster_m03.webp",
  },
  cat: { main: "/cats/cat_c01.webp", odd: "/cats/cat_a01.webp" },
  dog: { main: "/dogs/dog_d01.webp", odd: "/cats/cat_c01.webp" },
  fairy: { main: "/fairies/fairy_f01.webp", odd: "/fairies/fairy_f02.webp" },
  color: { main: "#E53935", odd: "#1E88E5", swatch: true },
  fruit: { main: "/fruits/fruit_r01.webp", odd: "/fruits/fruit_r09.webp" },
  letter: { main: "b", odd: "d", glyph: true },
  number: { main: "0", odd: "O", glyph: true },
};

interface OtherPacksProps {
  excludeId: ThemeId;
  title?: string;
}

export function OtherPacks({
  excludeId,
  title = "More packs",
}: OtherPacksProps) {
  const others = THEMES.filter((t) => t.id !== excludeId);
  if (others.length === 0) return null;

  return (
    <section className="other-packs" aria-label={title}>
      <h2 className="other-packs-title">{title}</h2>
      <div className="pack-grid pack-grid-tile">
        {others.map((theme) => {
          const thumb = THUMBS[theme.id];
          return (
            <Link
              key={theme.id}
              to={theme.path}
              className={`pack-card pack-card-compact pack-${theme.id}`}
            >
              <div className="pack-preview" aria-hidden="true">
                {thumb.emoji ? (
                  <>
                    <span className="pack-cell emoji">{thumb.main}</span>
                    <span className="pack-cell emoji is-odd">{thumb.odd}</span>
                    <span className="pack-cell emoji">{thumb.main}</span>
                    <span className="pack-cell emoji">{thumb.main}</span>
                  </>
                ) : thumb.swatch ? (
                  <>
                    <span className="pack-cell swatch">
                      <span
                        className="cell-swatch"
                        style={{ background: thumb.main }}
                      />
                    </span>
                    <span className="pack-cell swatch is-odd">
                      <span
                        className="cell-swatch"
                        style={{ background: thumb.odd }}
                      />
                    </span>
                    <span className="pack-cell swatch">
                      <span
                        className="cell-swatch"
                        style={{ background: thumb.main }}
                      />
                    </span>
                    <span className="pack-cell swatch">
                      <span
                        className="cell-swatch"
                        style={{ background: thumb.main }}
                      />
                    </span>
                  </>
                ) : thumb.glyph ? (
                  <>
                    <span className="pack-cell glyph">{thumb.main}</span>
                    <span className="pack-cell glyph is-odd">{thumb.odd}</span>
                    <span className="pack-cell glyph">{thumb.main}</span>
                    <span className="pack-cell glyph">{thumb.main}</span>
                  </>
                ) : (
                  <>
                    <span className="pack-cell">
                      <img src={thumb.main} alt="" />
                    </span>
                    <span className="pack-cell is-odd">
                      <img src={thumb.odd} alt="" />
                    </span>
                    <span className="pack-cell">
                      <img src={thumb.main} alt="" />
                    </span>
                    <span className="pack-cell">
                      <img src={thumb.main} alt="" />
                    </span>
                  </>
                )}
              </div>
              <div className="pack-copy">
                <h3 className="pack-title">{theme.label}</h3>
                <p className={`pack-diff pack-diff-${theme.difficulty}`}>
                  {difficultyLabel(theme.difficulty)}
                </p>
                <p className="pack-tag">{theme.findLine}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
