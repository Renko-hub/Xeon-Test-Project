import { clsx } from "clsx";
import { ReactNode } from "react";
import s from "./BiosWindow.module.css";

const BiosWindow = ({
  title,
  content = [],
  path,
}: {
  title: string;
  path: string;
  content?: { text_left: string; text_right?: ReactNode }[];
}) => (
  <div className={s.bios_container}>
    <div className={s.bios__header}>{title}</div>
    <ul className={s.bios__list}>
      {content.map(({ text_left, text_right }, index) => (
        <li key={index} className={s.bios__item}>
          <span className={s.text_left}>{text_left}</span>
          <span
            className={clsx(
              s.text_right,
              (text_right === "Disabled" || text_right === "Disable") &&
                s.state_disabled
            )}
          >
            [{text_right ?? "N/A"}]
          </span>
        </li>
      ))}
    </ul>
    <div className={s.bios__footer}>PATH: {path}</div>
  </div>
);

export default BiosWindow;
