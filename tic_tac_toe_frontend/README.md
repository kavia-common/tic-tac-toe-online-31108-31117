# Tic Tac Toe · Ocean Professional

A web-based Tic Tac Toe game built with React. Play vs Computer or Two Players. Modern, ocean-inspired UI with retro accents.

## Features

- Two Modes: Vs Computer (heuristic AI) and Two Players
- AI priority: win > block > center > corner > side
- Round-based play with score tracking and local history
- Accessible: ARIA roles, keyboard navigation, visible focus
- Responsive layout: centered game card, controls below; side panel shows scoreboard and history on desktop
- Ocean Professional theme: subtle gradients, rounded corners, smooth transitions, blue and amber accents

## Getting Started

Install dependencies and run development server:

```bash
npm install
npm start
```

Open http://localhost:3000 in your browser.

## Scripts

- `npm start` - start development server
- `npm run build` - production build
- `npm test` - run tests (if any)

## Accessibility

- Squares are buttons with role="gridcell", keyboard-activatable via Enter/Space
- Live region updates status (whose turn, win, draw)
- Focus styles provide strong visual indication

## Code Structure

- `src/App.jsx`: main app, state management, AI, layout
- `src/components/Board.jsx`: board grid
- `src/components/Square.jsx`: square cell (accessible button)
- `src/components/Controls.jsx`: game controls and mode switch
- `src/components/Scoreboard.jsx`: scores and round
- `src/components/History.jsx`: history list and replay
- `src/styles/theme.css`: theme, layout, and component styles

## Theme

Using styleThemeData:
- primary: `#2563EB`
- secondary/success: `#F59E0B`
- error: `#EF4444`
- gradient: `from-blue-500/10 to-gray-50`
- background: `#f9fafb`
- surface: `#ffffff`
- text: `#111827`

Retro accent via a pixel-like heading font and a subtle noise overlay.
