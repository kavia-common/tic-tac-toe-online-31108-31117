import React, { useCallback, useRef } from 'react';
import Square from './Square';

/**
 * PUBLIC_INTERFACE
 * Board renders a 3x3 grid of squares and supports keyboard navigation.
 * @param {object} props
 * @param {Array<string|null>} props.squares - current board state length 9
 * @param {Function} props.onPlay - handler called with index when a move is made
 * @param {boolean} props.disabled - whether the board is disabled
 * @param {number[]} props.winningLine - indices of winning squares
 */
export default function Board({ squares, onPlay, disabled, winningLine = [] }) {
  const buttonsRef = useRef([]);

  const onKeyDown = useCallback(
    (e, idx) => {
      const row = Math.floor(idx / 3);
      const col = idx % 3;

      const focusAt = (r, c) => {
        const i = r * 3 + c;
        const btn = buttonsRef.current[i];
        if (btn) btn.focus();
      };

      switch (e.key) {
        case 'ArrowUp':
          e.preventDefault();
          focusAt((row + 2) % 3, col);
          break;
        case 'ArrowDown':
          e.preventDefault();
          focusAt((row + 1) % 3, col);
          break;
        case 'ArrowLeft':
          e.preventDefault();
          focusAt(row, (col + 2) % 3);
          break;
        case 'ArrowRight':
          e.preventDefault();
          focusAt(row, (col + 1) % 3);
          break;
        case 'Enter':
        case ' ':
          e.preventDefault();
          if (!disabled && !squares[idx]) onPlay(idx);
          break;
        default:
          break;
      }
    },
    [disabled, onPlay, squares]
  );

  return (
    <div className="board" role="grid" aria-label="Tic Tac Toe board">
      {squares.map((val, i) => (
        <Square
          key={i}
          value={val}
          onClick={() => onPlay(i)}
          disabled={disabled || Boolean(val)}
          isWinning={winningLine.includes(i)}
          buttonRef={(el) => (buttonsRef.current[i] = el)}
          onKeyDown={(e) => onKeyDown(e, i)}
          aria-label={`Cell ${i + 1} ${val ? `with ${val}` : 'empty'}`}
        />
      ))}
    </div>
  );
}
