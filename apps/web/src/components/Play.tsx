import { Board } from "./Board";
import type { CellView } from "@/game/types";

interface PlayProps {
  levelIndex: number;
  totalLevels: number;
  cols: number;
  cells: CellView[];
  boardFx: string;
  timerSec: number;
  urgent: boolean;
  locked: boolean;
  colorblind: boolean;
  flashIndex: number | null;
  flashKind: "correct" | "wrong" | null;
  onPause: () => void;
  onTap: (index: number) => void;
  onPointerDownCell?: () => void;
}

export function Play({
  levelIndex,
  totalLevels,
  cols,
  cells,
  boardFx,
  timerSec,
  urgent,
  locked,
  colorblind,
  flashIndex,
  flashKind,
  onPause,
  onTap,
  onPointerDownCell,
}: PlayProps) {
  return (
    <section className="play">
      <div className="play-hud">
        <button
          type="button"
          className="icon-btn"
          onClick={onPause}
          aria-label="Pause"
          disabled={locked}
        >
          Ⅱ
        </button>
        <div className="level-chip">
          Level {levelIndex} / {totalLevels}
        </div>
        <div className={`timer${urgent ? " is-urgent" : ""}`} aria-live="polite">
          <strong>{timerSec}</strong>
          <small>s</small>
        </div>
      </div>

      <div className="board-stage">
        <Board
          cols={cols}
          cells={cells}
          locked={locked}
          colorblind={colorblind}
          boardFx={boardFx}
          flashIndex={flashIndex}
          flashKind={flashKind}
          onTap={onTap}
          onPointerDownCell={onPointerDownCell}
        />
      </div>

      <p className="play-hint">Tap the odd one.</p>
    </section>
  );
}
