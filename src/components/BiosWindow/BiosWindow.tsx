import React from 'react';
import s from './BiosWindow.module.css';

const BiosWindow = ({ title, path, rows = [], config = {}, onUpdate, promo }: any) => {
  const isManual = config?.profile === 'custom';
  const vals = config?.custom || {};

  return (
    <div className={s.screenWrapper}>
      <div className={s.mainWindow}>
        <div className={s.windowTitle}>{title}</div>
        <div className={s.rowsList}>
          {rows.map((r: any, i: number) => (
            r === 'hr' ? <div key={i} className={s.rowSeparator} /> :
            <div key={i} className={`${s.itemRow} ${r.highlight ? s.isHighlighted : ''} ${r.disabled ? s.isDisabled : ''}`}>
              <span className={s.rowLabel}>{r.label}</span>
              <span className={s.rowValue}>
                [{r.manualKey && isManual ? 
                  <input 
                    className={`${s.valueInput} ${s.editableInput}`} 
                    value={vals[r.manualKey] ?? ''} 
                    maxLength={2}
                    onChange={e => onUpdate(r.manualKey, e.target.value)} 
                    onFocus={(e: any) => e.target.select()} 
                  /> 
                  : r.value}]
              </span>
            </div>
          ))}
        </div>
        <div className={s.pathFooter}>PATH: {path}</div>
      </div>
      {promo && <div className={s.promoBanner}>{promo}</div>}
    </div>
  );
};

export default BiosWindow;
