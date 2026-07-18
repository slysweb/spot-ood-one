interface BoardProps {
  cols: number;
  cells: string[];
  locked: boolean;
  colorblind: boolean;
  flashIndex: number | null;
  flashKind: "correct" | "wrong" | null;
  onTap: (index: number) => void;
}

export function Board({
  cols,
  cells,
  locked,
  colorblind,
  flashIndex,
  flashKind,
  onTap,
}: BoardProps) {
  return (
    <div
      className={`board${locked ? " is-locked" : ""}${colorblind ? " colorblind" : ""}`}
      style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}
      role="grid"
      aria-label="Emoji grid"
    >
      {cells.map((emoji, index) => {
        const flash =
          flashIndex === index && flashKind ? ` is-${flashKind}` : "";
        return (
          <button
            key={`${index}-${emoji}`}
            type="button"
            className={`cell${flash}`}
            role="gridcell"
            onClick={() => onTap(index)}
            aria-label={`Cell ${index + 1}`}
          >
            {emoji}
          </button>
        );
      })}
    </div>
  );
}
