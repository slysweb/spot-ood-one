import type { CellView } from "@/game/types";

interface BoardProps {
  cols: number;
  cells: CellView[];
  locked: boolean;
  colorblind: boolean;
  boardFx: string;
  flashIndex: number | null;
  flashKind: "correct" | "wrong" | null;
  onTap: (index: number) => void;
  /** Freeze teleport before click so the odd cell can't move mid-tap */
  onPointerDownCell?: () => void;
}

export function Board({
  cols,
  cells,
  locked,
  colorblind,
  boardFx,
  flashIndex,
  flashKind,
  onTap,
  onPointerDownCell,
}: BoardProps) {
  return (
    <div
      className={`board${locked ? " is-locked" : ""}${colorblind ? " colorblind" : ""}${boardFx === "wobble" ? " board-wobble" : ""}`}
      style={{
        ["--cols" as string]: String(cols),
        gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
      }}
      role="grid"
      aria-label="Odd one grid"
    >
      {cells.map((cell, index) => {
        const flash =
          flashIndex === index && flashKind ? ` is-${flashKind}` : "";
        return (
          <button
            key={cell.key}
            type="button"
            className={`cell${flash}`}
            role="gridcell"
            onPointerDown={() => onPointerDownCell?.()}
            onClick={() => onTap(index)}
            aria-label={`Cell ${index + 1}`}
          >
            <span className="cell-art-wrap">
              {cell.kind === "color" && cell.fill ? (
                <span
                  className="cell-swatch"
                  style={{
                    background: cell.fill,
                    transform: cell.cssTransform,
                    filter: cell.cssFilter,
                  }}
                />
              ) : cell.kind === "glyph" && cell.glyph ? (
                <span
                  className="cell-glyph"
                  style={{
                    transform: cell.cssTransform,
                    filter: cell.cssFilter,
                  }}
                >
                  {cell.glyph}
                </span>
              ) : (cell.kind === "monster" || cell.kind === "image") &&
                cell.src ? (
                <img
                  className="cell-art"
                  src={cell.src}
                  alt=""
                  draggable={false}
                  style={{
                    transform: cell.cssTransform,
                    filter: cell.cssFilter,
                  }}
                />
              ) : (
                <span
                  className="cell-emoji"
                  style={{
                    transform: cell.cssTransform,
                    filter: cell.cssFilter,
                  }}
                >
                  {cell.emoji}
                </span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  );
}
