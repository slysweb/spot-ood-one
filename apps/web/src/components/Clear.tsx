interface ClearProps {
  totalLevels: number;
  onHome: () => void;
}

export function Clear({ totalLevels, onHome }: ClearProps) {
  return (
    <section className="clear-screen">
      <div className="panel">
        <span className="clear-burst" aria-hidden="true">
          ★ ✓ ★
        </span>
        <p className="eyebrow">Campaign clear</p>
        <h1 className="display">You did it!</h1>
        <p className="body-text">
          You cleared all {totalLevels} levels. Sharp eye!
        </p>
      </div>
      <button type="button" className="btn btn-primary" onClick={onHome}>
        Back to Home
      </button>
    </section>
  );
}
