import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Controls renders mode selection and reset action.
 * @param {object} props
 * @param {'pvp'|'pvc'} props.mode
 * @param {(mode:string)=>void} props.onModeChange
 * @param {()=>void} props.onReset
 * @param {'X'|'O'} props.currentPlayer
 */
export default function Controls({ mode, onModeChange, onReset, currentPlayer }) {
  return (
    <div className="controls" aria-label="Controls">
      <div className="controls-row" role="group" aria-label="Game mode">
        <div className="segmented" aria-label="Mode selector">
          <button
            className={mode === 'pvp' ? 'active' : ''}
            onClick={() => onModeChange('pvp')}
            aria-pressed={mode === 'pvp'}
          >
            Player vs Player
          </button>
          <button
            className={mode === 'pvc' ? 'active' : ''}
            onClick={() => onModeChange('pvc')}
            aria-pressed={mode === 'pvc'}
          >
            Player vs Computer
          </button>
        </div>
        <button className="btn btn-danger" onClick={onReset} aria-label="Reset game">
          Reset
        </button>
      </div>
      <div className="controls-row">
        <span className="badge">
          Turn:
          {' '}
          <strong className={currentPlayer === 'X' ? 'x-accent' : 'o-accent'}>
            {currentPlayer}
          </strong>
        </span>
      </div>
    </div>
  );
}
