import {
  MEMORY_PRESETS,
  SPECIAL_PRESETS,
  SPECIAL_LIMITS,
  ULTRA_PRESET,
  TREFI_TABLE,
  PROFILE_SUBTIMINGS,
  PENALTIES,
} from "../../RamConfiguration/data/memoryPresets";
import { toEven } from "./ramFrequency";

const SubTimings = (
  {
    preset,
    ramSize,
    slot,
    density,
    board,
    isSpecialConfig,
    gen,
    isDdr4,
    typeKey,
    isEcc,
  },
  primaries,
  frequency,
) => {
  const slotsCount = Number(slot?.replace("slots", "")) || 2;
  const isHighCap = ramSize / Math.max(1, slotsCount) >= 12 || ramSize >= 32;

  // 1. Линейный сбор базовых таймингов и штрафов (без if-else)
  const freqPreset = MEMORY_PRESETS?.[frequency]?.safe || MEMORY_PRESETS?.safe;
  const base = PROFILE_SUBTIMINGS?.[preset]?.[typeKey] || {};
  const hPen = PENALTIES?.highCapacity?.[typeKey] || {};
  const ePen = PENALTIES?.ecc?.[typeKey] || {};

  const tFAW = toEven(
    (base.tFAW ?? freqPreset?.tFAW ?? 24) +
      (isHighCap ? (hPen.tFAW ?? 0) : 0) +
      (isEcc ? (ePen.tFAW ?? 0) : 0),
  );
  const tWR = toEven(
    (base.tWR ?? freqPreset?.tWR ?? 12) +
      (isHighCap ? (hPen.tWR ?? 0) : 0) +
      (isEcc ? (ePen.tWR ?? 0) : 0),
  );
  const tRRD =
    (base.tRRD ?? freqPreset?.tRRD ?? 4) +
    (isHighCap ? (hPen.tRRD ?? 0) : 0) +
    (isEcc ? (ePen.tRRD ?? 0) : 0);
  const tWTR =
    (base.tWTR ?? freqPreset?.tWTR ?? 6) + (isHighCap ? (hPen.tWTR ?? 0) : 0);
  const tRTP =
    (base.tRTP ?? freqPreset?.tRTP ?? 6) + (isEcc ? (ePen.tRTP ?? 0) : 0);

  // 2. Линейный расчет констант
  const profileKey =
    preset === "custom" || preset === "ultra" ? "safe" : preset;
  const tREFI =
    TREFI_TABLE?.[preset === "ultra" ? "ultra" : profileKey]?.[gen] ??
    TREFI_TABLE?.safe?.[gen] ??
    7800;

  const stabilityBonus =
    (Math.floor((ramSize - 8) / 8) * 10 +
      slotsCount * 12 -
      12 +
      (density === "yes" ? 48 : 0) +
      (isEcc ? (isDdr4 ? 24 : 40) : -12) +
      (board === "matx" ? 16 : 0)) *
    (isDdr4 ? 1 : 1.35);

  // 3. Расчет tRFC через тернарное выражение (вместо if-else дерева)
  const tRFC =
    preset === "ultra"
      ? toEven(
          (isDdr4 ? 264 : (ULTRA_PRESET?.tRFC ?? 180)) +
            stabilityBonus * (isDdr4 ? 0.8 : 0.6),
        )
      : isSpecialConfig
        ? (SPECIAL_PRESETS?.[profileKey]?.tRFC ??
          SPECIAL_PRESETS?.safe?.tRFC ??
          260)
        : preset === "custom" && primaries
          ? toEven(
              (primaries.tRCD + primaries.tRP) * (isDdr4 ? 10 : 8) +
                stabilityBonus,
            )
          : toEven(
              (MEMORY_PRESETS?.[frequency]?.[profileKey]?.tRFC ||
                MEMORY_PRESETS?.[frequency]?.safe?.tRFC ||
                (isDdr4 ? 312 : 240)) + stabilityBonus,
            );

  // 4. Определение лимита в одну строку
  const limitValue =
    isSpecialConfig && preset !== "ultra"
      ? (SPECIAL_LIMITS?.[profileKey] ?? toEven(tRFC * 0.92))
      : toEven(tRFC * (preset === "ultra" ? 0.9 : 0.92));

  return {
    tRFC,
    tFAW,
    tWR,
    tRRD,
    tRTP,
    tWTR,
    tREFI,
    tRFC_Values: { current: tRFC, limitValue },
  };
};

export default SubTimings;
