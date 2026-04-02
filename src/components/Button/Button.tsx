import React, { ReactNode } from 'react';
import styles from './Button.module.css';
import { BUTTONS } from './Button.config';

interface ButtonProps {
  type: string;
  isActive?: boolean;
  onClick?: () => void;
  children?: ReactNode;
}

const Button = ({ type, isActive, onClick, children }: ButtonProps) => {
  const lowType = type?.toLowerCase();
  const config = BUTTONS.find(b => b.type === lowType);
  const theme = config?.theme;
  const isOutline = (config as any)?.variant === 'outline';

  const classes = [
    styles.baseButton,
    isActive && styles.isActive,
    isActive && isOutline && styles.infoOutline,
    isActive && theme === 'info' && !isOutline && styles.infoTheme,
    isActive && theme === 'metallic' && styles.metallicActive,
    isActive && theme && !['info', 'metallic', 'warning', 'lava'].includes(theme) && styles[`${theme}Theme`],
    isActive && theme === 'lava' && styles.lavaEffect,
    theme === 'warning' && (isActive ? styles.warningActive : styles.warningInactive)
  ].filter(Boolean).join(' ');

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children || config?.label || type?.toUpperCase()}
    </button>
  );
};

export default Button;
