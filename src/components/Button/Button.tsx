import clsx from "clsx";
import {
  BUTTONS,
  PresetButtonType,
  GenButtonType,
  PciButtonType,
  DiskButtonType,
  MemoryButtonType,
  SlotsButtonType,
  BoardButtonType,
  ToolsButtonType,
  ActionButtonType,
} from "./Button.config";
import s from "./Button.module.css";

interface ButtonProps {
  type:
    | PresetButtonType
    | GenButtonType
    | PciButtonType
    | DiskButtonType
    | MemoryButtonType
    | SlotsButtonType
    | BoardButtonType
    | ToolsButtonType
    | ActionButtonType;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  label?: string;
}

const Button = ({ type, isActive, onClick, className, label }: ButtonProps) => {
  const config = BUTTONS[type as keyof typeof BUTTONS];

  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        s.button,
        isActive ? config.active : config.normal,
        className,
      )}
    >
      {label || config.label}
    </button>
  );
};

export default Button;
