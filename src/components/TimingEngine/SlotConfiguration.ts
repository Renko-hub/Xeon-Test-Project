export const getSlotConfiguration = (config: any, hw: any) => {
  const { ramSize: SZ, has16gbSticks: H16, slotsCount: SC } = config;
  const { isV2, isMatx } = hw;

  // Решаем, используем ли 16ГБ планки
  // Если памяти 64+ ГБ — всегда true, если меньше 16 — всегда false, иначе берем из конфига
  let force16 = SZ >= 64 ? true : (SZ < 16 ? false : H16);

  // Логика подбора доступных слотов (availableSlots)
  const availableSlots = (() => {
    const lock = isV2 && isMatx; // Ограничение для мелких плат на V2
    
    if (force16) {
      if (SZ === 16) return [1]; 
      if (SZ === 32) return [1, 2]; 
      if (SZ === 48) return [3];
      return lock ? [] : [4];
    }

    if (isV2) {
      if (SZ === 4) return [1, 2]; 
      if (SZ === 6) return [3]; 
      if (SZ === 8) return [1, 2, 4]; 
      if (SZ === 12) return [3];
    } else {
      if (SZ === 4) return [1]; 
      if (SZ === 8) return [1, 2]; 
      if (SZ === 12) return [3];
    }

    if (SZ === 16) return lock ? [2] : [2, 4]; 
    if (SZ === 32) return lock ? [] : [4];
    
    // Дефолтный сценарий
    let r = [1, 2];
    if (!lock) { 
      if (SZ >= (isV2 ? 6 : 12)) r.push(3); 
      if (SZ >= (isV2 ? 8 : 16)) r.push(4); 
    }
    return r;
  })();

  // Определяем итоговое количество слотов (vS)
  // Если текущее значение недоступно для данной конфигурации, берем последний доступный вариант
  const finalSlotsCount = availableSlots.includes(SC) ? SC : (availableSlots[availableSlots.length - 1] || 2);
  
  // Если выбрали 32ГБ, но слотов меньше 4 — значит это две планки по 16ГБ
  if (SZ === 32 && finalSlotsCount < 4) force16 = true; 

  return {
    force16,
    availableSlots,
    slotsCount: finalSlotsCount,
    ramSize: SZ,
    isEcc: config.isEcc
  };
};
