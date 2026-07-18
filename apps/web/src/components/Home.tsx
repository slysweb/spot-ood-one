interface HomeProps {
  currentLevel: number;
  bestLevel: number;
  totalLevels: number;
  onPlay: () => void;
  onContinue: () => void;
  onSettings: () => void;
}

export function Home({
  currentLevel,
  bestLevel,
  totalLevels,
  onPlay,
  onContinue,
  onSettings,
}: HomeProps) {
  const showContinue = currentLevel > 1 || bestLevel > 1;

  return (
    <section className="home">
      <div className="panel home-hero">
        <p className="eyebrow">Odd one out</p>
        <h1 className="display">
          Spot Odd <span style={{ color: "var(--orange-deep)" }}>One</span>
        </h1>
        <p className="body-text tagline">Find the one that doesn’t belong.</p>
        <div className="preview-board" aria-hidden="true">
          <span className="cell">🐶</span>
          <span className="cell">🐶</span>
          <span className="cell is-odd">🐱</span>
          <span className="cell">🐶</span>
          <span className="cell">🐶</span>
          <span className="cell">🐶</span>
          <span className="cell">🐶</span>
          <span className="cell">🐶</span>
          <span className="cell">🐶</span>
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
      <button type="button" className="link-btn" onClick={onSettings}>
        Settings
      </button>
    </section>
  );
}
