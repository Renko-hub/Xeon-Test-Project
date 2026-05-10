import { useEffect, useRef } from 'react';
import s from './BiosInput.module.css';

const BiosInput = ({ field, state, update, isFirst }: any) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const value = state[field] || '';
  const numericValue = parseInt(value) || 0;

  useEffect(() => {
    if (isFirst) inputRef.current?.focus();
  }, [isFirst]);

  const commit = (v: string | number) => update({ [field]: String(v) });

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') commit(numericValue + 1);
    if (e.key === 'ArrowDown') commit(Math.max(numericValue - 1, 5));
    if (e.key === 'Enter') {
      const inputs = Array.from(
        document.querySelectorAll(`.${s.bios_input}`),
      ) as HTMLElement[];
      const next = inputs[inputs.indexOf(e.currentTarget) + 1];
      next ? next.focus() : e.currentTarget.blur();
    }
  };

  return (
    <input
      ref={inputRef}
      className={s.bios_input}
      value={value}
      placeholder="--"
      onFocus={(e) => e.target.select()}
      onBlur={() => (value === '' || numericValue < 5) && commit(5)}
      onChange={(e) => /^\d*$/.test(e.target.value) && commit(e.target.value)}
      onKeyDown={handleKeyDown}
    />
  );
};

export default BiosInput;
