import React from "react";
import { clsx } from "clsx";
import BiosInput from "../BiosInput/BiosInput";
import s from "./BiosWindow.module.css";

const BiosWindow = ({ title, content = [], path, state, update }) => (
  <div className={s.bios_container}>
    <div className={s.bios__header}>{title}</div>
    <ul className={s.bios__list}>
      {content.map(
        (
          { text_left, text_right, isEditable, isDisabled, field, isFirst },
          index,
        ) => (
          <li key={index} className={s.bios__item}>
            <span className={s.text_left}>{text_left}</span>
            {isEditable ? (
              <BiosInput
                field={field}
                state={state}
                update={update}
                isFirst={isFirst}
              />
            ) : (
              <span
                className={clsx(s.text_right, isDisabled && s.state_disabled)}
              >
                {`[${text_right ?? "N/A"}]`}
              </span>
            )}
          </li>
        ),
      )}
    </ul>
    <div className={s.bios__footer}>PATH: {path}</div>
  </div>
);

export default BiosWindow;
