import React, { useEffect, useRef } from "react";
import s from "./BiosInput.module.css";

const BiosInput = ({ field, state = {}, update, isFirst }) => {
  const inputRef = useRef(null);
  const rawValue = state[field] !== undefined ? String(state[field]) : "";
  const numericValue = parseInt(rawValue, 10) || 0;

  useEffect(() => {
    if (isFirst) {
      inputRef.current?.focus();
    }
  }, [isFirst]);

  const setParamValue = (v) => update?.(field, String(v));

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      setParamValue(numericValue + 1);
    }
    if (e.key === "ArrowDown") {
      setParamValue(Math.max(numericValue - 1, 6));
    }
    if (e.key === "Enter") {
      const inputs = Array.from(document.querySelectorAll(`.${s.bios_input}`));
      const next = inputs[inputs.indexOf(e.currentTarget) + 1];
      if (next) {
        next.focus();
      } else {
        e.currentTarget.blur();
      }
    }
  };

  return (
    <span className={s.input_wrapper}>
      [
      <input
        ref={inputRef}
        className={s.bios_input}
        value={rawValue}
        placeholder="--"
        onFocus={(e) => e.target.select()}
        onBlur={() =>
          rawValue === "" || numericValue < 6 ? setParamValue(6) : null
        }
        onChange={(e) => {
          const val = e.target.value;
          if (val === "" || /^\d*$/.test(val)) {
            setParamValue(val);
          }
        }}
        onKeyDown={handleKeyDown}
      />
      ]
    </span>
  );
};

export default BiosInput;
