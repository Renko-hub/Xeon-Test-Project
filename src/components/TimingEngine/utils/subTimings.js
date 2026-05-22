import { 
  MEMORY_PRESETS, 
  SPECIAL_PRESETS, 
  ULTRA_PRESET,
  TREFI_TABLE 
} from "../../RamConfiguration/data/memoryPresets";
import { toEven } from "./ramFrequency";

const SPECIAL_LIMITS = {
  safe: SPECIAL_PRESETS.balanced.tRFC,
  balanced: SPECIAL_PRESETS.aggressive.tRFC,
  aggressive: SPECIAL_PRESETS.ultraLimit.tRFC,
};

const SubTimings = (state, primaries, frequencyKey) => {
  const {
    profile, ramSize, slotsCount, isDensityHigh, 
    memoryType, boardType, ramType, isSpecialConfig, gen
  } = state;

  const { tRCD, tRP } = primaries;
  const isDdr4 = ramType === "DDR4";
  const isCustom = profile === "custom";
  const profileKey = isCustom ? "safe" : profile;
  const generation = gen || "V3";

  // ТОЧНОЕ ОПРЕДЕЛЕНИЕ ТЯЖЕЛЫХ ПЛАШЕК И ECC
  // Защита: если slotsCount передан неверно или равен 0, берем минимум 1 слот
  const activeSlots = Math.max(1, slotsCount);
  const estimatedStickSize = ramSize / activeSlots;
  
  // Модуль считается тяжелым (16 ГБ+), если расчетный размер планки >= 12 ГБ 
  // (с учетом нетипичных конфигураций вроде 3 планок или трехканального режима)
  const isHighCapacity = estimatedStickSize >= 12 || ramSize >= 32;
  const isEcc = memoryType === "ecc";

  // 1. БАЗОВЫЙ РАСЧЕТ ТАЙМИНГОВ ПО ПРОФИЛЯМ (Включая tRRD, tRTP, tWTR)
  let tFAW = 24;
  let tWR = 16; 
  let tRRD = isDdr4 ? 4 : 5;
  let tRTP = 6;
  let tWTR = isDdr4 ? 8 : 7;

  if (profile === "ultra") {
    tFAW = isDdr4 ? 16 : 20; 
    tWR = 10;
    tRRD = isDdr4 ? 4 : 4;
    tRTP = 5;
    tWTR = isDdr4 ? 6 : 5;
  } else if (profile === "aggressive") {
    tFAW = isDdr4 ? 20 : 24;
    tWR = 12;
    tRRD = isDdr4 ? 4 : 5;
    tRTP = 6;
    tWTR = isDdr4 ? 7 : 6;
  } else if (profile === "balanced") {
    tFAW = isDdr4 ? 24 : 26;
    tWR = 14;
    tRRD = isDdr4 ? 5 : 5;
    tRTP = 7;
    tWTR = isDdr4 ? 8 : 7;
  } else {
    // Режимы safe и custom
    const freq = Number(frequencyKey);
    if (isDdr4) {
      tFAW = freq >= 2400 ? 28 : freq >= 2133 ? 24 : 20;
      tWR = freq >= 2400 ? 18 : 16; 
    } else {
      tFAW = freq >= 1866 ? 32 : freq >= 1600 ? 26 : 24;
      tWR = freq >= 1866 ? 16 : 14;
    }
  }

  // 2. ДИНАМИЧЕСКИЕ ШТРАФЫ ДЛЯ ВСЕХ ВТОРИЧНЫХ ТАЙМИНГОВ (ECC + Модули 16GB+)
  if (isHighCapacity) {
    tFAW += isDdr4 ? 4 : 6;  // Двухранговые емкие чипы требуют больших пауз
    tWR += 2;                // Увеличение времени восстановления записи
    tRRD += 1;               // Штраф на задержку между активацией разных банков (Row-to-Row)
    tWTR += 1;               // Штраф на переключение с записи на чтение
  }
  
  if (isEcc) {
    tFAW += 2;               // Накладные расходы на логику контроля четности
    tWR += isDdr4 ? 2 : 0;
    tRRD += isDdr4 ? 0 : 1;  // DDR3 ECC ощутимо медленнее на шине адреса
    tRTP += 1;               // Дополнительный такт на чтение перед отправкой команды предзаряда
  }

  // Обеспечиваем четность для tFAW и tWR согласно стандартам стабильного разгона
  tFAW = toEven(tFAW);
  tWR = toEven(tWR);

  // 3. ДИНАМИЧЕСКИЙ РАСЧЕТ tREFI
  const tRefiProfile = profile === "ultra" ? "ultra" : profileKey;
  const tREFI = TREFI_TABLE[tRefiProfile]?.[generation] ?? TREFI_TABLE.safe[generation];

  // 4. РАСЧЕТ stabilityBonus ДЛЯ tRFC
  const stabilityBonus = (
    Math.floor((ramSize - 8) / 8) * 10 +
    activeSlots * 12 - 12 + 
    (isDensityHigh ? 48 : 0) +
    (isEcc ? (isDdr4 ? 24 : 40) : -12) +
    (boardType === "matx" ? 16 : 0)
  ) * (isDdr4 ? 1 : 1.35);

  // Ветка профиля "ultra"
  if (profile === "ultra") {
    const tRFC = toEven((isDdr4 ? 264 : ULTRA_PRESET.tRFC) + stabilityBonus * (isDdr4 ? 0.8 : 0.6));
    return { tRFC, tFAW, tWR, tRRD, tRTP, tWTR, tREFI, tRFC_Values: { current: tRFC, limitValue: toEven(tRFC * 0.9) } };
  }

  // Ветка специальной конфигурации "isSpecialConfig"
  if (isSpecialConfig) {
    const tRFC = (SPECIAL_PRESETS[profileKey] || SPECIAL_PRESETS.safe).tRFC;
    const limitValue = SPECIAL_LIMITS[profileKey] || toEven(tRFC * 0.92);
    return { tRFC, tFAW, tWR, tRRD, tRTP, tWTR, tREFI, tRFC_Values: { current: tRFC, limitValue } };
  }

  // Базовая ветка стандартных пресетов памяти
  const basePreset = MEMORY_PRESETS[frequencyKey]?.[profileKey] || MEMORY_PRESETS[frequencyKey]?.safe;
  const fallbackPresetRfc = isDdr4 ? 312 : 240;
  const defaultBaseRfc = isCustom 
    ? (tRCD + tRP) * (isDdr4 ? 10 : 8) 
    : (basePreset?.tRFC ?? fallbackPresetRfc);

  const tRFC = toEven(defaultBaseRfc + stabilityBonus);

  return { 
    tRFC, 
    tFAW, 
    tWR, 
    tRRD, 
    tRTP, 
    tWTR, 
    tREFI, 
    tRFC_Values: { current: tRFC, limitValue: toEven(tRFC * 0.92) } 
  };
};

export default SubTimings;
