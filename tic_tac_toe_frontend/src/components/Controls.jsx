import React from 'react';

// PUBLIC_INTERFACE
export default function Controls({
  mode,
  onModeChange,
  onResetBoard,
  onNewRound,
  onResetAll,
  isBoardActive,
}) {
  /** Renders control buttons and mode selector below the board. */
  return (
    <div className="controls">
      <div className="mode-toggle" role="group" aria-label="Game Mode">
        <button
          className={`btn ${mode === 'computer' ? 'btn-primary' : 'btn-surface'}`}
          onClick={() => onModeChange('computer')}
          aria-pressed={mode === 'computer'}
        >
          Vs Computer
        </button>
        <button
          className={`btn ${mode === 'two' ? 'btn-primary' : 'btn-surface'}`}
          onClick={() => onModeChange('two')}
          aria-pressed={mode === 'two'}
        >
          Two Players
        </button>
      </div>

      <div className="actions" role="group" aria-label="Game Controls">
        <button className="btn btn-surface" onClick={onResetBoard} disabled={!isBoardActive}>
          Reset Board
        </button>
        <button className="btn btn-accent" onClick={onNewRound}>
          New Round
        </button>
        <button className="btn btn-danger" onClick={onResetAll}>
          Reset All
        </button>
      </div>
    </div>
  );
}
