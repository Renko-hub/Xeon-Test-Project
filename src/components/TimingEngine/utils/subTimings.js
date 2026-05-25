import { MEMORY_PRESETS, SPECIAL_PRESETS, ULTRA_PRESET, TREFI_TABLE } from "../../RamConfiguration/data/memoryPresets";
import { toEven } from "./ramFrequency";

const SPECIAL_LIMITS = {
  safe: SPECIAL_PRESETS.balanced.tRFC,
  balanced: SPECIAL_PRESETS.aggressive.tRFC,
  aggressive: SPECIAL_PRESETS.ultraLimit.tRFC,
};

const SubTimings = (state, primaries, frequencyKey) => {
  const {
    profile, ramSize, slotsCount, isDensityHigh, 
    memoryType, boardType, ramType, isSpecialConfig, gen = "V3"
  } = state;

  const isDdr4 = ramType === "DDR4";
  const profileKey = profile === "custom" ? "safe" : profile;
  
  // 1. ОПРЕДЕЛЕНИЕ ТЯЖЕЛЫХ ПЛАШЕК И ECC
  const activeSlots = Math.max(1, slotsCount);
  const isHighCapacity = (ramSize / activeSlots) >= 12 || ramSize >= 32;
  const isEcc = memoryType === "ecc";

  // 2. БАЗОВЫЙ РАСЧЕТ ТАЙМИНГОВ ПО ПРОФИЛЯМ
  const freq = Number(frequencyKey);
  const profileConfigs = {
    ultra:      { tFAW: isDdr4 ? 16 : 20, tWR: 10, tRRD: 4,               tRTP: 5, tWTR: isDdr4 ? 6 : 5 },
    aggressive: { tFAW: isDdr4 ? 20 : 24, tWR: 12, tRRD: isDdr4 ? 4 : 5, tRTP: 6, tWTR: isDdr4 ? 7 : 6 },
    balanced:   { tFAW: isDdr4 ? 24 : 26, tWR: 14, tRRD: 5,               tRTP: 7, tWTR: isDdr4 ? 8 : 7 },
    default:    { 
      tFAW: isDdr4 ? (freq >= 2400 ? 28 : freq >= 2133 ? 24 : 20) : (freq >= 1866 ? 32 : freq >= 1600 ? 26 : 24),
      tWR:  isDdr4 ? (freq >= 2400 ? 18 : 16) : (freq >= 1866 ? 16 : 14),
      tRRD: isDdr4 ? 4 : 5,
      tRTP: 6,
      tWTR: isDdr4 ? 8 : 7
    }
  };

  let { tFAW, tWR, tRRD, tRTP, tWTR } = profileConfigs[profile] || profileConfigs.default;

  // 3. ДИНАМИЧЕСКИЕ ШТРАФЫ
  if (isHighCapacity) {
    tFAW += isDdr4 ? 4 : 6;
    tWR += 2;
    tRRD += 1;
    tWTR += 1;
  }
  
  if (isEcc) {
    tFAW += 2;
    tWR += isDdr4 ? 2 : 0;
    tRRD += isDdr4 ? 0 : 1;
    tRTP += 1;
  }

  tFAW = toEven(tFAW);
  tWR = toEven(tWR);

  // 4. ДИНАМИЧЕСКИЙ РАСЧЕТ tREFI И stabilityBonus
  const tRefiProfile = profile === "ultra" ? "ultra" : profileKey;
  const tREFI = TREFI_TABLE[tRefiProfile]?.[gen] ?? TREFI_TABLE.safe[gen];

  const stabilityBonus = (
    Math.floor((ramSize - 8) / 8) * 10 +
    activeSlots * 12 - 12 + 
    (isDensityHigh ? 48 : 0) +
    (isEcc ? (isDdr4 ? 24 : 40) : -12) +
    (boardType === "matx" ? 16 : 0)
  ) * (isDdr4 ? 1 : 1.35);

  // 5. РАСЧЕТ tRFC И МНОЖИТЕЛЕЙ ГРАНИЦЫ
  let tRFC, limitMultiplier = 0.92;

  if (profile === "ultra") {
    tRFC = toEven((isDdr4 ? 264 : ULTRA_PRESET.tRFC) + stabilityBonus * (isDdr4 ? 0.8 : 0.6));
    limitMultiplier = 0.9;
  } else if (isSpecialConfig) {
    tRFC = (SPECIAL_PRESETS[profileKey] || SPECIAL_PRESETS.safe).tRFC;
  } else {
    const basePreset = MEMORY_PRESETS[frequencyKey]?.[profileKey] || MEMORY_PRESETS[frequencyKey]?.safe;
    const defaultBaseRfc = profile === "custom" 
      ? (primaries.tRCD + primaries.tRP) * (isDdr4 ? 10 : 8) 
      : (basePreset?.tRFC ?? (isDdr4 ? 312 : 240));
    
    tRFC = toEven(defaultBaseRfc + stabilityBonus);
  }

  const limitValue = isSpecialConfig && profile !== "ultra"
    ? (SPECIAL_LIMITS[profileKey] || toEven(tRFC * 0.92))
    : toEven(tRFC * limitMultiplier);

  return { 
    tRFC, tFAW, tWR, tRRD, tRTP, tWTR, tREFI, 
    tRFC_Values: { current: tRFC, limitValue } 
  };
};

export default SubTimings;
