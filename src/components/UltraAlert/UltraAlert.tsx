import React from 'react';
import Button from '../Button/Button';
import s from './UltraAlert.module.css';
import useUltraLogic from './hooks/useUltraLogic';

const UltraAlert = ({ onUnlock, onSetTempUltra, isUnlocked }: any) => {
  const { isOpen, close, handleTrigger } = useUltraLogic(onUnlock, onSetTempUltra, isUnlocked);

  const onTriggerDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleTrigger();
  };

  return (
    <div className={s.alert_wrap}>
      <span 
        className={`${s.alert_trigger} ${isUnlocked ? s.alert_unlocked : ''}`}
        onMouseDown={onTriggerDown}
      >
        {isUnlocked ? 'EXTREME RAM TOOL 🛠️' : 'XEON RAM TOOL'}
      </span>

      {isOpen && (
        <div className={s.alert_overlay}>
          <div className={s.alert_modal}>
            <div className={s.alert_hazard} />
            <div className={s.alert_body}>
              <div className={s.alert_triangle}>
                <span className={s.alert_excl}>!</span>
              </div>
              <h2 className={s.alert_title}>⚠️ ВНИМАНИЕ: ULTRA РЕЖИМ</h2>
              <div className={s.alert_text}>
                <p className={s.alert_notice}>Данный режим поддерживается не всеми процессорами.</p>
                <p>Экстремальные настройки. Только для удачных чипов + обдув.</p>
                <p>Напряжение: <span className={s.alert_gold}>1.45V-1.55V</span>.</p>
                <p className={s.alert_danger}>Нажмите "ОТМЕНА", если вы прочли текст.</p>
              </div>
              <div className={s.alert_actions}>
                <Button type="activate" onClick={() => close(false)} isActive />
                <Button type="cancel" onClick={() => close(true)} />
              </div>
            </div>
            <div className={s.alert_hazard} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UltraAlert;
