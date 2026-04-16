import { getHardware } from './Hardware';
import { getSlotConfiguration } from './SlotConfiguration';
import { getPrimaryTiming } from './PrimaryTiming';
import { getAdvancedTiming } from './AdvancedTiming';

export const calculateRamFullLogic = (config: any, isUnlocked: boolean) => {
  // 1. Получаем параметры железа
  const hw = getHardware(config, isUnlocked);
  
  // 2. Рассчитываем конфигурацию слотов
  const slot = getSlotConfiguration(config, hw);
  
  // 3. Рассчитываем основные тайминги (CL, RCD, RP, RAS)
  const primary = getPrimaryTiming(hw, slot, config);
  
  // 4. Рассчитываем вторичные параметры и вольтаж
  const advanced = getAdvancedTiming(hw, slot, primary, config);

  return {
    // Данные для интерфейса и валидации
    sanitized: { 
      ...config, 
      cpu: hw.cpu, 
      slotsCount: slot.slotsCount, 
      has16gbSticks: slot.force16, 
      availableSlots: slot.availableSlots, 
      currentCpuList: hw.cpus, 
      show16gbToggle: slot.ramSize >= 16 && slot.ramSize < 64 
    },
    // Итоговая таблица таймингов
    timings: {
      ...advanced,
      tCL: primary.fCL,
      tRP: primary.fRP,
      tRCD: primary.fRCD,
      tRAS: primary.fRAS,
      tRC: primary.fRAS + primary.fCL,
      profile: hw.profile,
      isUltra: hw.isUltra
    }
  };
};
