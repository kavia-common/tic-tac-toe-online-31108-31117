import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Square renders a single playable cell.
 * @param {object} props
 * @param {'X'|'O'|null} props.value
 * @param {() => void} props.onClick
 * @param {boolean} props.disabled
 * @param {boolean} props.isWinning
 * @param {(el:HTMLButtonElement)=>void} props.buttonRef
 * @param {(e:KeyboardEvent)=>void} props.onKeyDown
 */
export default function Square({ value, onClick, disabled, isWinning, buttonRef, onKeyDown, ...rest }) {
  const classes = ['square'];
  if (disabled && !value) classes.push('disabled');
  if (isWinning) classes.push('win');

  const accentClass = value === 'X' ? 'x-accent' : value === 'O' ? 'o-accent' : '';

  return (
    <button
      type="button"
      className={classes.join(' ')}
      onClick={onClick}
      disabled={disabled}
      ref={buttonRef}
      onKeyDown={onKeyDown}
      role="gridcell"
      {...rest}
    >
      <span className={accentClass}>{value ?? ''}</span>
    </button>
  );
}
