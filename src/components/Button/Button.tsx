import clsx from 'clsx';
import { BUTTONS, ButtonType } from './Button.config';
import s from './Button.module.css';

interface ButtonProps {
  type: ButtonType;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
  label?: string;
}

const Button = ({ type, isActive, onClick, className, label }: ButtonProps) => {
  const conf = BUTTONS[type];

  return conf ? (
    <button
      type="button"
      onClick={onClick}
      className={clsx(s.button, s[conf.theme], isActive && s.active, className)}
    >
      {label || conf.label}
    </button>
  ) : null;
};

export default Button;
