// src/components/Button/Button.tsx
import clsx from "clsx";
import { BUTTONS } from "./Button.config";
import s from "./Button.module.css";

interface ButtonProps {
  type: keyof typeof BUTTONS;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  label?: string;
}

const Button = ({ type, isActive, onClick, className, label }: ButtonProps) => {
  const config = BUTTONS[type];

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        s.button,
        // Вернули ?. и добавили || "" на случай, если конфиг не нашелся
        isActive ? config?.active : config?.normal || "",
        className,
      )}
    >
      {label || config?.label}
    </button>
  );
};

export default Button;
