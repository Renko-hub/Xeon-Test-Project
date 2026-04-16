import { useState, useEffect } from 'react';

const useUltraLogic = (
  onUnlock: (val: boolean) => void, 
  onSetTempUltra: (val: boolean) => void, 
  isUnlocked: boolean
) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clicks, setClicks] = useState(0);

  const closeAlert = (shouldUnlock: boolean) => {
    onUnlock(shouldUnlock);
    setIsOpen(false);
    onSetTempUltra(false);
    setClicks(0);
  };

  useEffect(() => {
    return () => onSetTempUltra(false);
  }, [onSetTempUltra]);

  useEffect(() => {
    if (clicks > 0 && clicks < 10) {
      const timer = setTimeout(() => setClicks(0), 2000);
      return () => clearTimeout(timer);
    }
  }, [clicks]);

  const handleUnlockAttempt = () => {
    if (isUnlocked) {
      setIsOpen(true);
      return;
    }
    
    const nextCount = clicks + 1;
    if (nextCount >= 10) {
      setIsOpen(true);
      setClicks(0);
    } else {
      setClicks(nextCount);
    }
  };

  return { isOpen, close: closeAlert, handleTrigger: handleUnlockAttempt };
};

export default useUltraLogic;
