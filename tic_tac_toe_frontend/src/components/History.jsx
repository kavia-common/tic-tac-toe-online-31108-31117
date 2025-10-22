import React from 'react';

// PUBLIC_INTERFACE
export default function History({ items, onReplay }) {
  /** Lists prior rounds with ability to replay the board state. */
  return (
    <div className="card history" aria-label="Game History">
      <h2 className="card-title">History</h2>
      {items.length === 0 && <p className="muted">No rounds yet. Play a game!</p>}
      <ul className="history-list">
        {items.map((h) => (
          <li key={h.round} className="history-item">
            <div className="history-summary">
              <span className="chip">R{h.round}</span>
              <span className="result">
                {h.winner ? (
                  <>
                    Winner: <strong className={h.winner === 'X' ? 'text-primary' : 'text-amber'}>{h.winner}</strong>
                  </>
                ) : (
                  'Draw'
                )}
              </span>
            </div>
            <button
              className="btn btn-surface btn-small"
              onClick={() => onReplay(h)}
              aria-label={`Replay round ${h.round}`}
            >
              Replay
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
