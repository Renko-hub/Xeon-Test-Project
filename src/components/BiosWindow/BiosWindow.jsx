import React from "react";
import { clsx } from "clsx";
import s from "./BiosWindow.module.css";

const BiosWindow = ({ title, content = [], path }) => (
  <div className={s.bios_container}>
    <div className={s.bios__header}>{title}</div>
    <ul className={s.bios__list}>
      {content.map(
        ({ text_left, text_right, isEditable, isDisabled }, index) => (
          <li key={index} className={s.bios__item}>
            <span className={s.text_left}>{text_left}</span>
            {/* Класс disabled добавляется ТОЛЬКО если поле явно заблокировано (isDisabled: true) */}
            <span
              className={clsx(s.text_right, isDisabled && s.state_disabled)}
            >
              {isEditable ? text_right : `[${text_right ?? "N/A"}]`}
            </span>
          </li>
        ),
      )}
    </ul>
    <div className={s.bios__footer}>PATH: {path}</div>
  </div>
);

export default BiosWindow;
