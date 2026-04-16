import React from 'react';
import s from './BiosWindow.module.css';
import useBiosLogic from './hooks/useBiosLogic';
import BiosInput from './BiosInput/BiosInput';

const BiosWindow = ({ title, content = [], path, type, value, onBiosChange }: any) => {
  const getRightText = useBiosLogic(type, value);

  return (
    <div className={s.bios_container}>
      <header className={s.bios__header}>{title}</header>
      
      <ul className={s.bios__list} data-input-group>
        {content.map((item: any, index: number) => {
          const rightText = getRightText(item);
          const isDisabled = rightText === "Disabled" || rightText === "Disable";

          return (
            <li key={index} className={s.bios__item}>
              <span className={s.text_left}>{item.text_left}</span>
              
              {item.id && onBiosChange ? (
                <span className={s.text_right}>
                  [<BiosInput 
                    value={rightText} 
                    onChange={(val: string) => onBiosChange(item.id, val)}
                    isFirst={item.id === 'tCL'}
                  />]
                </span>
              ) : (
                <span className={isDisabled ? s.state_disabled : s.text_right}>
                  [{rightText}]
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <footer className={s.bios__footer}>PATH: {path}</footer>
    </div>
  );
};

export default BiosWindow;
