import React, { useEffect, useRef } from "react";
import s from "./BiosInput.module.css";

const BiosInput = ({ field, state = {}, update, isFirst }) => {
  const inputRef = useRef(null);
  const isFreq = field === "userFrequency";

  const getMinLimit = () => {
    if (isFreq) {
      return 800;
    }
    if (field === "tRFC") {
      return 60;
    }
    if (field === "tCL") {
      return 8;
    }
    return 4;
  };

  const minLimit = getMinLimit();

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
      e.preventDefault();
      setParamValue(numericValue + (isFreq ? 133 : field === "tRFC" ? 8 : 1));
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setParamValue(
        Math.max(
          numericValue - (isFreq ? 133 : field === "tRFC" ? 8 : 1),
          minLimit,
        ),
      );
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const container = e.currentTarget.closest("ul") || document;
      const inputs = Array.from(container.querySelectorAll(`.${s.bios_input}`));
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
