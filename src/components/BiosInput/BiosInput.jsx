import React, { useEffect, useRef } from "react";
import s from "./BiosInput.module.css";

const BiosInput = ({ field, state = {}, update, isFirst }) => {
  const inputRef = useRef(null);
  const isFreq = field === "userFrequency";

  let rawValue = state[field] !== undefined ? String(state[field]) : "";
  if (isFreq && rawValue === "") {
    rawValue = String(state["frequency"] || 1866);
  }

  const numericValue = parseInt(rawValue, 10) || 0;

  useEffect(() => {
    if (isFirst) {
      inputRef.current?.focus();
    }
  }, [isFirst]);

  const setParamValue = (v) => update?.(field, String(v));

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      setParamValue(numericValue + (isFreq ? 133 : 1));
    }
    if (e.key === "ArrowDown") {
      const minLimit = isFreq ? 800 : 6;
      setParamValue(Math.max(numericValue - (isFreq ? 133 : 1), minLimit));
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
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        className={s.bios_input}
        value={rawValue}
        placeholder="--"
        onFocus={(e) => e.target.select()}
        onBlur={() => {
          const minLimit = isFreq ? 800 : 6;
          if (rawValue === "" || numericValue < minLimit) {
            setParamValue(minLimit);
          }
        }}
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
