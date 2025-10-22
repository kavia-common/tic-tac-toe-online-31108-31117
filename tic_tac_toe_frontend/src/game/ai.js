import { calculateWinner, emptyIndices } from './utils';

/**
 * PUBLIC_INTERFACE
 * bestMove returns an index for the computer move using a simple strategy:
 * 1) If AI can win now, play winning move
 * 2) If opponent can win next, block
 * 3) Play center if available
 * 4) Play a corner if available
 * 5) Otherwise play a random available move
 * @param {Array<string|null>} board
 * @param {'X'|'O'} ai
 * @param {'X'|'O'} opponent
 * @returns {number|null}
 */
export function bestMove(board, ai = 'O', opponent = 'X') {
  const empties = emptyIndices(board);
  if (empties.length === 0) return null;

  // 1) Win if possible
  for (const idx of empties) {
    const copy = board.slice();
    copy[idx] = ai;
    const res = calculateWinner(copy);
    if (res?.winner === ai) return idx;
  }

  // 2) Block opponent
  for (const idx of empties) {
    const copy = board.slice();
    copy[idx] = opponent;
    const res = calculateWinner(copy);
    if (res?.winner === opponent) return idx;
  }

  // 3) Center
  if (empties.includes(4)) return 4;

  // 4) Corners
  const corners = [0, 2, 6, 8].filter((i) => empties.includes(i));
  if (corners.length > 0) return corners[Math.floor(Math.random() * corners.length)];

  // 5) Random
  return empties[Math.floor(Math.random() * empties.length)];
}
