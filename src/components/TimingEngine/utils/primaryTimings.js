import { MEMORY_PRESETS, ULTRA_PRESET } from "../../RamConfiguration/data/memoryPresets";
import { toEven } from "./ramFrequency";

const PrimaryTimings = (state, frequencyKey) => {
  const {
    profile, ramSize, slotsCount, isDensityHigh, boardType,
    memoryType, ramType, gen, tCL: sCL, tRCD: sRCD, tRP: sRP,
  } = state;

  const isDdr4 = ramType === "DDR4";
  const isV4 = gen === "V4";

  // Расчет нагрузки на контроллер памяти через быстрые битовые сдвиги
  const loadScore =
    (Math.floor(ramSize / 32) << 1) +
    (slotsCount > 2 ? 1 : 0) +
    (isDensityHigh ? 2 : 0) +
    (boardType === "matx" ? 1 : 0) +
    (memoryType === "ecc" ? 1 : 0);

  // Ветка Ультра-профиля
  if (profile === "ultra") {
    const divider = isV4 ? 4 : isDdr4 ? 2 : 3;
    const baseUltra = isV4 ? 11 : isDdr4 ? 12 : ULTRA_PRESET.tCL;
    const timing = baseUltra + Math.floor(loadScore / divider);

    return { 
      tCL: timing, 
      tRCD: timing, 
      tRP: timing, 
      // tRAS для ультра поджимается жестче: tCL + tRCD (классический разгон)
      tRAS: toEven(timing * 2), 
      loadScore 
    };
  }

  // Ветка стандартных и кастомных профилей
  const isCustom = profile === "custom";
  const preset = MEMORY_PRESETS[frequencyKey][isCustom ? "safe" : profile] || MEMORY_PRESETS[frequencyKey].safe;
  const v4Offset = isV4 && frequencyKey >= 2133 ? 2 : 0;

  const calcTiming = (customVal, presetVal) => {
    if (isCustom && customVal) return Number(customVal);
    const val = Number(presetVal) - v4Offset;
    return isDdr4 ? Math.max(val, 11) : val;
  };

  const tCL = calcTiming(sCL, preset.tCL);
  const tRCD = calcTiming(sRCD, preset.tRCD);
  const tRP = calcTiming(sRP, preset.tRP);

  // Классическая безопасная формула JEDEC для tRAS: tCL + tRCD + запас
  const tRAS = toEven(tCL + tRCD + (gen === "V2" ? 4 : 2));

  return { tCL, tRCD, tRP, tRAS, loadScore };
};

export default PrimaryTimings;
