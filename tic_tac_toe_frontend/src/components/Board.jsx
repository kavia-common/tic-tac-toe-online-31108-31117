import React from 'react';
import Square from './Square';

// PUBLIC_INTERFACE
export default function Board({
  board,
  onSquareClick,
  onSquareKey,
  winningLine,
  disabled,
  nextPlayer,
}) {
  /** Renders the 3x3 board with accessible, focusable squares. */
  const renderSquare = (i) => {
    const isWinning = winningLine ? winningLine.includes(i) : false;
    return (
      <Square
        key={i}
        value={board[i]}
        index={i}
        onClick={() => onSquareClick(i)}
        onKeyDown={(e) => onSquareKey(i, e)}
        disabled={disabled || !!board[i]}
        isWinning={isWinning}
        nextPlayer={nextPlayer}
      />
    );
  };

  return (
    <div
      className="board"
      role="grid"
      aria-label="Tic Tac Toe Board"
      aria-disabled={disabled ? 'true' : 'false'}
    >
      {[0, 1, 2].map((r) => (
        <div key={r} className="board-row" role="row">
          {[0, 1, 2].map((c) => {
            const idx = r * 3 + c;
            return renderSquare(idx);
          })}
        </div>
      ))}
    </div>
  );
}
