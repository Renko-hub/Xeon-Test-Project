import { BUTTONS, ButtonType } from './Button.config';
import s from './Button.module.css';

const Button = ({ type, isActive, className, label, ...rest }: any) => {
  const item = BUTTONS[type as ButtonType];
  
  // Если типа нет в конфиге — не мусорим в DOM
  if (!item) return null;

  // Определяем тему: активная или обычная
  const themeClass = isActive ? s[`${item.theme}_active`] : s[item.theme];
  
  // Базовые классы (всегда есть)
  let cls = `${s.button} ${themeClass}`;
  
  // Если прокинули кастомный className — приклеиваем его в конец
  if (className) cls += ` ${className}`;

  return (
    <button className={cls} {...rest}>
      {label ?? item.label}
    </button>
  );
};

export default Button;
