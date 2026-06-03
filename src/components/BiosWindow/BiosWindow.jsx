import React from "react";
import { clsx } from "clsx";
import BiosInput from "../BiosInput/BiosInput";
import s from "./BiosWindow.module.css";

const BiosWindow = ({ title, content, path, state, update }) => {
  const items = content ?? [];

  return (
    <div className={s.bios_container}>
      <div className={s.bios__header}>{title}</div>
      <ul className={s.bios__list}>
        {items.map(
          (
            { text_left, text_right, isEditable, isDisabled, field, isFirst },
            index,
          ) => {
            // Инпут рендерится только если элемент редактируемый и у него задано целевое поле state
            const shouldRenderInput = isEditable && !!field;

            // Проверяем наличие текста справа
            const rightValueClean = String(text_right ?? "").trim();
            const hasRightText = rightValueClean !== "";

            // Ловим и "Disable", и "Disabled" для окрашивания в серый цвет
            const isRowDisabled =
              isDisabled ||
              rightValueClean.toLowerCase() === "disabled" ||
              rightValueClean.toLowerCase() === "disable";

            const uniqueKey = `${field || text_left || "item"}-${index}`;

            return (
              <li key={uniqueKey} className={s.bios__item}>
                <span className={s.text_left}>{text_left}</span>

                {shouldRenderInput ? (
                  <BiosInput
                    field={field}
                    state={state}
                    update={update}
                    isFirst={isFirst}
                  />
                ) : (
                  /* Пустые строки (ссылки на подменю) просто не выводят правую часть и скобки */
                  hasRightText && (
                    <span
                      className={clsx(
                        s.text_right,
                        isRowDisabled && s.state_disabled,
                      )}
                    >
                      {`[${text_right}]`}
                    </span>
                  )
                )}
              </li>
            );
          },
        )}
      </ul>
      <div className={s.bios__footer}>PATH: {path}</div>
    </div>
  );
};

export default BiosWindow;
