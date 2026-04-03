import React from 'react';
import s from './UltraWarningModal.module.css';

interface ViewProps {
  onClose: (success: boolean) => void;
}

const UltraModalView = ({ onClose }: ViewProps) => (
  <div className={s.modalOverlay}>
    <div className={s.modalContent}>
      <div className={s.hazardLine} />
      <div className={s.modalBody}>
        <div className={s.hazardTriangle}><span className={s.exclamation}>!</span></div>
        <h2 className={s.modalTitle}>⚠️ ВНИМАНИЕ: ULTRA РЕЖИМ</h2>
        <div className={s.modalText}>
          <p>Вы активируете экстремальные настройки. Подходит только для удачных чипов и требует обдува.</p>
          <p>Напряжение: <span className={s.voltage}>1.45V</span>.</p>
          <p className={s.warningAlert}>Нажмите "ОТМЕНА", если вы прочли сообщение.</p>
        </div>
        <div className={s.modalActions}>
          <button className={s.btnConfirm} onClick={() => onClose(false)}>АКТИВИРОВАТЬ</button>
          <button className={s.btnCancel} onClick={() => onClose(true)}>ОТМЕНА</button>
        </div>
      </div>
      <div className={s.hazardLine} />
    </div>
  </div>
);

export default UltraModalView;
