import React from 'react';
import s from './UltraWarningModal.module.css';
import { useUltraUnlock } from './hooks/useUltraUnlock';
import UltraModalView from './UltraModalView';

interface Props {
  onModalOpen: (val: boolean) => void;
}

const UltraWarningModal = ({ onModalOpen }: Props) => {
  const { isOpen, unlocked, handleTrigger, close } = useUltraUnlock(onModalOpen);

  return (
    <div className={s.wrapper}>
      <span 
        onMouseDown={(e) => {
          if (e.detail > 1) e.preventDefault();
          handleTrigger(e.detail);
        }} 
        className={`${s.title} ${unlocked ? s.unlocked : ''}`}
      >
        {unlocked ? 'EXTREME RAM TOOL 🛠️' : 'XEON RAM TOOL'}
      </span>

      {isOpen && <UltraModalView onClose={close} />}
    </div>
  );
};

export default UltraWarningModal;
