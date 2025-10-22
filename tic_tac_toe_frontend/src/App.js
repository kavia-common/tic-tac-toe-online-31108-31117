import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import Board from './components/Board';
import Controls from './components/Controls';
import History from './components/History';
import { calculateWinner, isDraw, nextPlayer, toCoords } from './game/utils';
import { bestMove } from './game/ai';

// Game modes
const MODES = {
  PVP: 'pvp',
  PVC: 'pvc',
};

// Accessible announcer for live status updates
function LiveRegion({ message }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      className="sr-only"
    >
      {message}
    </div>
  );
}

// PUBLIC_INTERFACE
export default function App() {
  /** Root game state */
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState(MODES.PVP);
  const [xIsNext, setXIsNext] = useState(true);
  const [statusMsg, setStatusMsg] = useState('');
  const [retroNoiseLoaded, setRetroNoiseLoaded] = useState(false);

  const current = history[step];
  const winnerInfo = useMemo(() => calculateWinner(current), [current]);
  const winner = winnerInfo?.winner ?? null;
  const draw = !winner && isDraw(current);
  const currentPlayer = xIsNext ? 'X' : 'O';

  useEffect(() => {
    const img = new Image();
    img.onload = () => setRetroNoiseLoaded(true);
    img.src = process.env.PUBLIC_URL + '/retro-noise.png';
  }, []);

  useEffect(() => {
    // Update live region and title
    if (winner) {
      setStatusMsg(`Winner: ${winner}`);
      document.title = `Tic Tac Toe - ${winner} wins!`;
    } else if (draw) {
      setStatusMsg('Draw game.');
      document.title = 'Tic Tac Toe - Draw';
    } else {
      setStatusMsg(`Turn: ${currentPlayer}`);
      document.title = `Tic Tac Toe - ${currentPlayer}'s turn`;
    }
  }, [winner, draw, currentPlayer]);

  // CPU move effect
  useEffect(() => {
    if (mode !== MODES.PVC) return;
    if (winner || draw) return;
    if (currentPlayer === 'O') {
      // Simulate slight thinking delay
      const t = setTimeout(() => {
        const move = bestMove(current, 'O', 'X');
        if (move != null) {
          handlePlay(move);
        }
      }, 350);
      return () => clearTimeout(t);
    }
  }, [mode, current, currentPlayer, winner, draw]);

  // PUBLIC_INTERFACE
  function handlePlay(index) {
    // Ignore if game over or square taken
    if (winner || draw || current[index]) return;

    const newBoard = current.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';

    const nextHistory = history.slice(0, step + 1).concat([newBoard]);
    setHistory(nextHistory);
    setStep(nextHistory.length - 1);
    setXIsNext(!xIsNext);
  }

  // PUBLIC_INTERFACE
  function jumpTo(moveIndex) {
    setStep(moveIndex);
    // X starts at move 0, even steps => X next
    setXIsNext(moveIndex % 2 === 0);
  }

  // PUBLIC_INTERFACE
  function resetGame() {
    setHistory([Array(9).fill(null)]);
    setStep(0);
    setXIsNext(true);
  }

  // PUBLIC_INTERFACE
  function changeMode(nextMode) {
    setMode(nextMode);
    resetGame();
  }

  const accentColor = winner ? 'var(--tc-error)' : draw ? 'var(--tc-secondary)' : 'var(--tc-primary)';

  return (
    <div className="app-root" style={{ backgroundImage: retroNoiseLoaded ? 'url(/retro-noise.png)' : 'none' }}>
      <div className="container">
        <header className="app-header">
          <h1 className="title">Retro Tic Tac Toe</h1>
          <p className="subtitle">Ocean Professional Edition</p>
        </header>

        <main className="game-layout" role="main">
          <section className="game-card" aria-label="Game card">
            <div className="status-bar" style={{ borderColor: accentColor }}>
              <span className="status-pill" style={{ backgroundColor: accentColor }}>
                {winner ? 'Game Over' : draw ? 'Draw' : 'Playing'}
              </span>
              <span className="status-text" aria-live="polite">
                {winner ? `Winner: ${winner}` : draw ? 'It’s a draw!' : `Turn: ${currentPlayer}`}
              </span>
            </div>

            <Board
              squares={current}
              onPlay={handlePlay}
              disabled={!!winner || draw || (mode === MODES.PVC && currentPlayer === 'O')}
              winningLine={winnerInfo?.line ?? []}
            />

            <Controls
              mode={mode}
              onModeChange={changeMode}
              onReset={resetGame}
              currentPlayer={currentPlayer}
            />
          </section>

          <aside className="history-panel" aria-label="Move history">
            <History
              history={history}
              onJump={jumpTo}
              currentStep={step}
            />
          </aside>
        </main>

        <footer className="app-footer">
          <span>Made with ♡ • Ocean Professional theme</span>
        </footer>

        <LiveRegion message={statusMsg} />
      </div>
    </div>
  );
}
