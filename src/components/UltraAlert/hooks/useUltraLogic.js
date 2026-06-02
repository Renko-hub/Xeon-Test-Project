import { useCallback, useEffect, useRef, useState } from "react";

const useUltraLogic = (state, update) => {
  const [isOpen, setIsOpen] = useState(false);
  const clicks = useRef(0);
  const lastClickTime = useRef(0);
  const timeoutRef = useRef(null);

  const close = useCallback(
    (shouldUnlock = false) => {
      setIsOpen(false);
      if (timeoutRef.current) {
        globalThis.clearTimeout(timeoutRef.current);
      }

      update((prev) => ({
        ...prev,
        active: false,
        unlocked: shouldUnlock || prev.unlocked,
        ...(shouldUnlock && { profile: "ultra", lastChangedKey: "profile" }),
      }));
    },
    [update],
  );

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    timeoutRef.current = globalThis.setTimeout(() => close(false), 7000);
    return () => {
      if (timeoutRef.current) {
        globalThis.clearTimeout(timeoutRef.current);
      }
    };
  }, [isOpen, close]);

  const handleTrigger = useCallback(
    (e) => {
      e.stopPropagation();
      if (state.unlocked || isOpen) {
        return;
      }

      const now = Date.now();
      if (now - lastClickTime.current > 2000) {
        clicks.current = 0;
      }
      lastClickTime.current = now;

      clicks.current++;
      if (clicks.current >= 10) {
        if (typeof window !== "undefined") {
          window.navigator?.vibrate?.(200);
        }
        setIsOpen(true);
        update((prev) => ({ ...prev, active: true }));
        clicks.current = 0;
      }
    },
    [state.unlocked, isOpen, update],
  );

  return { isOpen, close, handleTrigger };
};

export default useUltraLogic;
