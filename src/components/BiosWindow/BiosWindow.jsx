import React from "react";
import { clsx } from "clsx";
import s from "./BiosWindow.module.css";

const BiosWindow = ({ title, content = [], path }) => (
  <div className={s.bios_container}>
    <div className={s.bios__header}>{title}</div>
    <ul className={s.bios__list}>
      {content.map(({ text_left, text_right, isDisabled }, i) => {
        const hasRightText =
          text_right !== undefined &&
          text_right !== null &&
          String(text_right).trim() !== "";
        const rightStr =
          typeof text_right === "string" ? text_right.toLowerCase() : "";
        const isRowDisabled =
          isDisabled || rightStr === "disabled" || rightStr === "disable";

        return (
          <li
            key={`${text_left || "item"}-${i}`}
            className={clsx(s.bios__item, isRowDisabled && s.row_disabled)}
          >
            <span className={s.text_left}>{text_left}</span>
            {hasRightText && (
              <span
                className={clsx(
                  s.text_right,
                  isRowDisabled && s.state_disabled,
                )}
              >
                {React.isValidElement(text_right)
                  ? text_right
                  : `[${text_right}]`}
              </span>
            )}
          </li>
        );
      })}
    </ul>
    <div className={s.bios__footer}>PATH: {path}</div>
  </div>
);

export default BiosWindow;
