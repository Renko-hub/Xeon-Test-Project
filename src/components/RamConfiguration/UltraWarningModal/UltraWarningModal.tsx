import React, { useState, useContext } from 'react';
import s from './UltraWarningModal.module.css';
// Импортируем контекст из твоего инженера
import { RamContext } from '../data/timingEngine'; 

const UltraWarningModal = () => {
  const [open, setOpen] = useState(false);
  const [clicks, setClicks] = useState(0);

  // Подключаемся к общему состоянию
  const context = useContext(RamContext);

  // Защита от пустых данных
  if (!context) return null;

  const { unlocked, setUnlocked } = context;

  const handleMouseDown = (e: React.MouseEvent) => {
    // Если уже разблокировано — ничего не делаем при клике на заголовок
    if (unlocked) return;
    
    // Защита от выделения текста при быстрой долбежке
    if (e.detail > 1) e.preventDefault();
    
    if (clicks + 1 >= 10) { 
      setUnlocked(true);
      setOpen(true);
      setClicks(0);
    } else {
      setClicks(v => v + 1);
    }
  };

  return (
    <>
      <span 
        onMouseDown={handleMouseDown} 
        className={`${s.title} ${unlocked ? s.unlocked : ''}`}
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
                <button 
                  className={s.btnConfirm} 
                  onClick={() => { 
                    // Твоя логика: нажатие АКТИВИРОВАТЬ забирает доступ и сбрасывает профиль на Balanced
                    setUnlocked(false); 
                    setOpen(false); 
                  }}
                >
                  АКТИВИРОВАТЬ
                </button>
                <button 
                  className={s.btnCancel} 
                  onClick={() => setOpen(false)}
                >
                  ОТМЕНА
                </button>
              </div>
            </div>

            <div className={s.hazardLine} />
          </div>
        </div>
      )}
    </>
  );
};

export default UltraWarningModal;
