import React from 'react';

// PUBLIC_INTERFACE
export default function Scoreboard({ scores, round }) {
  /** Displays the current scores and round number. */
  return (
    <div className="card scoreboard" aria-label="Scoreboard">
      <h2 className="card-title">Scoreboard</h2>
      <div className="score-row">
        <span className="score-label">Round</span>
        <span className="score-value">{round}</span>
      </div>
      <div className="score-row">
        <span className="score-label">X</span>
        <span className="score-value text-primary">{scores.X}</span>
      </div>
      <div className="score-row">
        <span className="score-label">O</span>
        <span className="score-value text-amber">{scores.O}</span>
      </div>
      <div className="score-row">
        <span className="score-label">Draws</span>
        <span className="score-value">{scores.draws}</span>
      </div>
    </div>
  );
}
