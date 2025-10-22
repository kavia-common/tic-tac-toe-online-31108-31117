const LINES = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6],         // diagonals
];

/**
 * PUBLIC_INTERFACE
 * calculateWinner returns { winner, line } or null if no winner
 * @param {Array<string|null>} squares
 */
export function calculateWinner(squares) {
  for (const line of LINES) {
    const [a,b,c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line };
    }
  }
  return null;
}

/**
 * PUBLIC_INTERFACE
 * isDraw returns true when no cells are empty and no winner.
 * @param {Array<string|null>} squares
 */
export function isDraw(squares) {
  return squares.every(Boolean) && !calculateWinner(squares);
}

/**
 * PUBLIC_INTERFACE
 * nextPlayer returns 'X' or 'O' based on move count (X always starts).
 * @param {Array<string|null>} squares
 */
export function nextPlayer(squares) {
  const count = squares.filter(Boolean).length;
  return count % 2 === 0 ? 'X' : 'O';
}

/**
 * PUBLIC_INTERFACE
 * emptyIndices returns indices of empty cells.
 * @param {Array<string|null>} board
 */
export function emptyIndices(board) {
  const res = [];
  for (let i = 0; i < board.length; i++) if (!board[i]) res.push(i);
  return res;
}

/**
 * PUBLIC_INTERFACE
 * toCoords maps a cell index to [row, col]
 * @param {number} index
 */
export function toCoords(index) {
  return [Math.floor(index / 3), index % 3];
}
