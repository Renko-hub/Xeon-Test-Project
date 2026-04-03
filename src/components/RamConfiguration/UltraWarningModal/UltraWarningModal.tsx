import React, { useState } from 'react';
import s from './UltraWarningModal.module.css';
import { useTimingEngine } from '../data/timingEngine'; 

const UltraWarningModal = () => {
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);

  // Используем наш кастомный стор
  const { unlocked, setUnlocked } = useTimingEngine();

  const handleMouseDown = (e: React.MouseEvent) => {
    // Если уже разблокировано, больше не реагируем на клики
    if (unlocked) return;
    
    // Чтобы текст не выделялся синим при быстрой долбежке
    if (e.detail > 1) e.preventDefault();
    
    const nextClicks = clicks + 1;
    
    if (nextClicks >= 10) { 
      setOpen(true); // Открываем модалку ПЕРЕД разблокировкой
      setClicks(0);
    } else {
      setClicks(nextClicks);
    }
  };

  return (
    <div className={s.wrapper}>
      <span 
        onMouseDown={handleMouseDown} 
        className={`${s.title} ${unlocked ? s.unlocked : ''}`}
        style={{ 
          opacity: !unlocked && clicks > 0 ? 0.7 + (clicks * 0.03) : 1,
          transform: !unlocked && clicks > 0 ? `scale(${1 + (clicks * 0.01)})` : 'none'
        }}
      >
        {unlocked ? 'EXTREME RAM TOOL 🛠️' : 'XEON RAM TOOL'}
      </span>

      {open && (
        <div className={s.modalOverlay}>
          <div className={s.modalContent}>
            <div className={s.hazardLine} />
            
            <div className={s.modalBody}>
              <div className={s.hazardTriangle}>
                <span className={s.exclamation}>!</span>
              </div>

              <h2 className={s.modalTitle}>⚠️ ВНИМАНИЕ: ULTRA РЕЖИМ</h2>
              
              <div className={s.modalText}>
                <p>Вы активируете экстремальные настройки. Они подходят только для удачных чипов памяти и требуют активного обдува.</p>
                <p>Напряжение будет поднято до <span className={s.voltage}>1.45V</span>.</p>
                <p className={s.warningAlert}>Нажмите "ОТМЕНА", если вы прочли сообщение.</p>
              </div>

              <div className={s.modalActions}>
                {/* ТРОЛЛЬ-КНОПКА: Юзер жмет "Активировать", но режим НЕ включается */}
                <button 
                  className={s.btnConfirm} 
                  onClick={() => { 
                    setUnlocked(false); 
                    setOpen(false); 
                  }}
                >
                  АКТИВИРОВАТЬ
                </button>

                {/* ПРАВИЛЬНАЯ КНОПКА: Только "Отмена" включает Extreme режим */}
                <button 
                  className={s.btnCancel} 
                  onClick={() => {
                    setUnlocked(true);
                    setOpen(false);
                  }}
                >
                  ОТМЕНА
                </button>
              </div>
            </div>

            <div className={s.hazardLine} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UltraWarningModal;
