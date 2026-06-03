import React, { useEffect, useRef } from "react";
import s from "./BiosInput.module.css";

const BiosInput = ({ field, state = {}, update, isFirst }) => {
  const inputRef = useRef(null);
  const isFrequencyField = field === "userFrequency";

  const getMinimumLimitValue = () => {
    if (isFrequencyField) {
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

  const minimumLimit = getMinimumLimitValue();
  const rawValue = state[field] !== undefined ? String(state[field]) : "";
  const numericValue = parseInt(rawValue, 10) || 0;

  useEffect(() => {
    if (isFirst) {
      inputRef.current?.focus();
    }
  }, [isFirst]);

  const setParamValue = (newValue) => update?.(field, String(newValue));

  const handleKeyDown = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setParamValue(
        numericValue + (isFrequencyField ? 133 : field === "tRFC" ? 8 : 1),
      );
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setParamValue(
        Math.max(
          numericValue - (isFrequencyField ? 133 : field === "tRFC" ? 8 : 1),
          minimumLimit,
        ),
      );
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const container = e.currentTarget.closest("ul") || document;
      const inputs = Array.from(container.querySelectorAll(`.${s.bios_input}`));
      const nextInput = inputs[inputs.indexOf(e.currentTarget) + 1];
      if (nextInput) {
        nextInput.focus();
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
          if (rawValue === "" || numericValue < minimumLimit) {
            setParamValue(minimumLimit);
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
