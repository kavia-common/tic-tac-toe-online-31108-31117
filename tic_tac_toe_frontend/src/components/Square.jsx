import React from 'react';

// PUBLIC_INTERFACE
export default function Square({
  value,
  index,
  onClick,
  onKeyDown,
  disabled,
  isWinning,
  nextPlayer,
}) {
  /** A single square cell in the grid. Uses a button for accessibility and keyboard control. */
  const ariaLabel = value
    ? `Square ${index + 1}, ${value}`
    : `Square ${index + 1}, empty${nextPlayer ? `, ${nextPlayer} to move` : ''}`;

  return (
    <button
      className={`square ${value ? 'filled' : ''} ${isWinning ? 'winning' : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={disabled}
      role="gridcell"
      aria-label={ariaLabel}
      aria-disabled={disabled ? 'true' : 'false'}
      tabIndex={0}
    >
      <span className={`mark ${value === 'X' ? 'mark-x' : value === 'O' ? 'mark-o' : ''}`}>
        {value}
      </span>
    </button>
  );
}
