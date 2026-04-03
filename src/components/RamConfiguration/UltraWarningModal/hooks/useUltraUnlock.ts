import { useState, useEffect, useRef } from 'react';
import { useTimingEngine } from '../../data/timingEngine';

export const useUltraUnlock = (onStateChange: (isOpen: boolean) => void) => {
  const [isOpen, setIsOpen] = useState(false);
  const [clicks, setClicks] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { unlocked, setUnlocked } = useTimingEngine();

  const close = (success: boolean) => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (success) setUnlocked(true);
    setIsOpen(false);
    onStateChange(false);
    setClicks(0);
  };

  const handleTrigger = (detail: number) => {
    if (unlocked) return;
    const nextClicks = clicks + 1;
    if (nextClicks >= 10) {
      setIsOpen(true);
      onStateChange(true);
    } else {
      setClicks(nextClicks);
    }
  };

  useEffect(() => {
    if (isOpen) {
      timerRef.current = setTimeout(() => close(false), 5000);
    }
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [isOpen]);

  return { isOpen, unlocked, handleTrigger, close };
};
