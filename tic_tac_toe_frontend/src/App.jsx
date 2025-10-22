/* eslint-disable react/prop-types */
import React, { useMemo, useState, useEffect, useCallback } from 'react';
import Board from './components/Board';
import Controls from './components/Controls';
import Scoreboard from './components/Scoreboard';
import History from './components/History';
import './styles/theme.css';

// PUBLIC_INTERFACE
export default function App() {
  /**
   * This is the main application component rendering a playable Tic Tac Toe game.
   * Features:
   * - Two modes: vs Computer (AI) and Two Players
   * - Simple AI: win, block, center, corner, side priority
   * - Score tracking and per-round history
   * - Accessibility: ARIA roles, keyboard navigation, focus management
   * - Ocean Professional theme with retro accents (pixel heading, subtle noise overlay)
   */
  const EMPTY_BOARD = useMemo(() => Array(9).fill(null), []);
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [xIsNext, setXIsNext] = useState(true);
  const [mode, setMode] = useState('computer'); // 'computer' | 'two'
  const [scores, setScores] = useState({ X: 0, O: 0, draws: 0 });
  const [history, setHistory] = useState([]);
  const [status, setStatus] = useState('X to move');
  const [round, setRound] = useState(1);
  const [gameActive, setGameActive] = useState(true);

  // Determine winner or draw
  const winnerInfo = useMemo(() => calculateWinner(board), [board]);
  const movesLeft = useMemo(() => board.filter((b) => !b).length, [board]);

  // Update status on changes
  useEffect(() => {
    if (winnerInfo.winner) {
      setStatus(`${winnerInfo.winner} wins!`);
      setGameActive(false);
    } else if (movesLeft === 0) {
      setStatus('Draw!');
      setGameActive(false);
    } else {
      setStatus(`${xIsNext ? 'X' : 'O'} to move`);
    }
  }, [winnerInfo, movesLeft, xIsNext]);

  // Record end of round into history and update scores
  useEffect(() => {
    if (!gameActive && (winnerInfo.winner || movesLeft === 0)) {
      const entry = {
        round,
        board: [...board],
        winner: winnerInfo.winner,
        line: winnerInfo.line,
      };
      setHistory((h) => [entry, ...h]);
      setScores((s) => {
        if (winnerInfo.winner === 'X') return { ...s, X: s.X + 1 };
        if (winnerInfo.winner === 'O') return { ...s, O: s.O + 1 };
        return { ...s, draws: s.draws + 1 };
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameActive]);

  // Make computer move if needed
  useEffect(() => {
    if (!gameActive) return;
    if (mode === 'computer' && !winnerInfo.winner && movesLeft > 0 && !xIsNext) {
      const timer = setTimeout(() => {
        const move = computeBestMove(board, 'O', 'X');
        if (move !== null) {
          handleSquareClick(move);
        }
      }, 450); // slight delay for UX
      return () => clearTimeout(timer);
    }
  }, [mode, gameActive, winnerInfo, movesLeft, xIsNext, board]);

  // PUBLIC_INTERFACE
  const handleSquareClick = (index) => {
    /** Handle click or keyboard activation on a square. */
    if (!gameActive) return;
    if (board[index]) return;
    if (mode === 'computer' && !xIsNext) return; // prevent user stepping for AI

    const newBoard = board.slice();
    newBoard[index] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  // PUBLIC_INTERFACE
  const resetBoard = () => {
    /** Resets the current board without changing scores or round. */
    setBoard(EMPTY_BOARD);
    setXIsNext(true);
    setGameActive(true);
  };

  // PUBLIC_INTERFACE
  const newRound = () => {
    /** Starts a new round, incrementing the round counter. */
    setRound((r) => r + 1);
    resetBoard();
  };

  // PUBLIC_INTERFACE
  const resetAll = () => {
    /** Resets everything: scores, history, board, and round. */
    setScores({ X: 0, O: 0, draws: 0 });
    setHistory([]);
    setRound(1);
    resetBoard();
  };

  // PUBLIC_INTERFACE
  const changeMode = (value) => {
    /** Switch between computer and two players mode. Resets only current board. */
    setMode(value);
    resetBoard();
  };

  const onKeyActivate = useCallback(
    (index, e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleSquareClick(index);
      }
    },
    [handleSquareClick]
  );

  return (
    <div className="app-root noise-overlay">
      <div className="container">
        <header className="app-header">
          <h1 className="title pixel-heading" aria-label="Tic Tac Toe">
            Tic Tac Toe
          </h1>
          <p className="subtitle">Ocean Professional · Retro Accents</p>
        </header>

        <main className="layout">
          <section className="game-card" aria-label="Game Area">
            <div className="status-row" aria-live="polite">
              <span className="badge">{mode === 'computer' ? 'Vs Computer' : 'Two Players'}</span>
              <span className="turn">
                {status}
              </span>
            </div>

            <Board
              board={board}
              onSquareClick={handleSquareClick}
              onSquareKey={onKeyActivate}
              winningLine={winnerInfo.line}
              disabled={!gameActive || (mode === 'computer' && !xIsNext)}
              nextPlayer={xIsNext ? 'X' : 'O'}
            />

            <Controls
              mode={mode}
              onModeChange={changeMode}
              onResetBoard={resetBoard}
              onNewRound={newRound}
              onResetAll={resetAll}
              isBoardActive={gameActive}
            />
          </section>

          <aside className="side-panel" aria-label="Score and History">
            <Scoreboard scores={scores} round={round} />
            <History items={history} onReplay={(entry) => {
              setBoard(entry.board);
              setXIsNext(true);
              setGameActive(false);
            }} />
          </aside>
        </main>

        <footer className="footer">
          <span>Built with React • Theme: Ocean Professional</span>
        </footer>
      </div>
    </div>
  );
}

/**
 * Calculates the winner of the current board state.
 * Returns { winner: 'X' | 'O' | null, line: number[] | null }
 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i += 1) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return { winner: null, line: null };
}

/**
 * Simple AI:
 * 1. Take winning move if available
 * 2. Block opponent winning move
 * 3. Take center
 * 4. Take a corner
 * 5. Take a side
 */
function computeBestMove(board, ai = 'O', human = 'X') {
  const available = board.map((v, i) => (v ? null : i)).filter((v) => v !== null);
  if (available.length === 0) return null;

  const tryWin = findImmediateWin(board, ai);
  if (tryWin !== null) return tryWin;

  const block = findImmediateWin(board, human);
  if (block !== null) return block;

  if (!board[4]) return 4;

  const corners = [0, 2, 6, 8].filter((i) => !board[i]);
  if (corners.length) return corners[Math.floor(Math.random() * corners.length)];

  const sides = [1, 3, 5, 7].filter((i) => !board[i]);
  if (sides.length) return sides[Math.floor(Math.random() * sides.length)];

  return available[0];
}

function findImmediateWin(board, player) {
  const test = board.slice();
  for (let i = 0; i < test.length; i += 1) {
    if (!test[i]) {
      test[i] = player;
      const res = calculateWinner(test);
      if (res.winner === player) return i;
      test[i] = null;
    }
  }
  return null;
}
