import React, { useRef, useEffect } from 'react';
import s from './BiosInput.module.css';

interface BiosInputProps {
  value: string | number;
  onChange: (val: string) => void;
  isFirst?: boolean; 
}

const BiosInput = ({ value, onChange, isFirst }: BiosInputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isFirst && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isFirst]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const parent = e.currentTarget.closest('[data-input-group]');
      if (!parent) return;

      const allInputs = Array.from(
        parent.querySelectorAll<HTMLInputElement>(`.${s.bios_input}`)
      );
      
      const currentIndex = allInputs.indexOf(e.currentTarget);
      const nextInput = allInputs[currentIndex + 1];

      if (nextInput) {
        nextInput.focus();
      } else {
        e.currentTarget.blur(); 
      }
    }
  };

  return (
    <input 
      ref={inputRef}
      className={s.bios_input}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      onKeyDown={handleKeyDown}
      type="text"
    />
  );
};

export default BiosInput;
