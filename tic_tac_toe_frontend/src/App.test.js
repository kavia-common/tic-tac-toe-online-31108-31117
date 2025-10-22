import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Retro Tic Tac Toe title', () => {
  render(<App />);
  const title = screen.getByText(/Retro Tic Tac Toe/i);
  expect(title).toBeInTheDocument();
});
