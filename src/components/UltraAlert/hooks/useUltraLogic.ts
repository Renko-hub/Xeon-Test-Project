import {
  useCallback,
  useEffect,
  useRef,
  useState,
  MouseEvent,
  TouchEvent,
} from "react";

const useUltraLogic = (state: any, update: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const clicks = useRef(0);
  const lastClickTime = useRef(0);
  const timeoutRef = useRef<number | null>(null); // Возвращаем number для браузерного window.setTimeout

  const close = useCallback(
    (shouldUnlock = false) => {
      clicks.current = 0;
      setIsOpen(false);
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }

      update({
        active: false,
        unlocked: shouldUnlock || state.unlocked,
        ...(shouldUnlock && { profile: "ultra", lastChangedKey: "profile" }),
      });
    },
    [state.unlocked, update],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    timeoutRef.current = window.setTimeout(() => close(false), 7000);
    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, close]);

  const handleTrigger = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.stopPropagation();
      window.getSelection()?.removeAllRanges();

      if (state.unlocked || isOpen) {
        return;
      }

      const now = Date.now();
      if (now - lastClickTime.current > 2000) {
        clicks.current = 0;
      }

      lastClickTime.current = now;

      if (++clicks.current >= 10) {
        window.navigator?.vibrate?.(200);
        setIsOpen(true);
        update({ active: true });
        clicks.current = 0;
      }
    },
    [state.unlocked, isOpen, update],
  );

  return { isOpen, close, handleTrigger };
};

export default useUltraLogic;
