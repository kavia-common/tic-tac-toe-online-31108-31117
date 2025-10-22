import React from 'react';
import { toCoords } from '../game/utils';

/**
 * PUBLIC_INTERFACE
 * History renders the move list and lets users jump to a move.
 * @param {object} props
 * @param {Array<Array<string|null>>} props.history
 * @param {(idx:number)=>void} props.onJump
 * @param {number} props.currentStep
 */
export default function History({ history, onJump, currentStep }) {
  return (
    <div>
      <h3 style={{ margin: '0 0 10px', color: 'var(--tc-text)' }}>History</h3>
      <ul className="history-list">
        {history.map((board, idx) => {
          let label = idx === 0 ? 'Game start' : `Move #${idx}`;
          // Try to infer last move coordinates compared to previous board
          if (idx > 0) {
            const prev = history[idx - 1];
            const changed = board
              .map((v, i) => (v !== prev[i] ? i : null))
              .filter((i) => i !== null)[0];
            if (changed != null) {
              const [r, c] = toCoords(changed);
              const player = board[changed];
              label = `#${idx} ${player} to (${r + 1}, ${c + 1})`;
            }
          }

          return (
            <li key={idx} className="history-item">
              <span>
                <span className="step-label">{label}</span>
                {idx === currentStep ? <span className="meta"> • current</span> : null}
              </span>
              <button
                className="btn btn-ghost jump-btn"
                onClick={() => onJump(idx)}
                aria-current={idx === currentStep ? 'step' : undefined}
              >
                {idx === currentStep ? 'View' : 'Jump'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
