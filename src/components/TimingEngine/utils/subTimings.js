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

const SubTimings = (state, primaries, frequencyKey) => {
  const {
    profile = "default",
    ramSize = 16,
    slotsCount = 2,
    isDensityHigh = false,
    boardType = "atx",
    isSpecialConfig = false,
    gen = "V3",
    isDdr4 = true,
    typeKey = "ddr4",
    isEcc = false,
  } = state;

  const profileKey =
    profile === "custom" || profile === "ultra" ? "safe" : profile;

  let base = PROFILE_SUBTIMINGS?.[profile]?.[typeKey];
  if (!base) {
    const freqPreset =
      MEMORY_PRESETS?.[frequencyKey]?.safe || MEMORY_PRESETS?.safe;
    base = {
      tFAW: freqPreset?.tFAW ?? 24,
      tWR: freqPreset?.tWR ?? 12,
      tRRD: freqPreset?.tRRD ?? 4,
      tRTP: freqPreset?.tRTP ?? 6,
      tWTR: freqPreset?.tWTR ?? 6,
    };
  }

  let { tFAW, tWR, tRRD, tRTP, tWTR } = base;

  const hPen = PENALTIES?.highCapacity?.[typeKey];
  const ePen = PENALTIES?.ecc?.[typeKey];

  if (ramSize / Math.max(1, slotsCount) >= 12 || ramSize >= 32) {
    tFAW += hPen?.tFAW ?? 0;
    tWR += hPen?.tWR ?? 0;
    tRRD += hPen?.tRRD ?? 0;
    tWTR += hPen?.tWTR ?? 0;
  }

  if (isEcc) {
    tFAW += ePen?.tFAW ?? 0;
    tWR += ePen?.tWR ?? 0;
    tRRD += ePen?.tRRD ?? 0;
    tRTP += ePen?.tRTP ?? 0;
  }

  tFAW = toEven(tFAW);
  tWR = toEven(tWR);

  const tRefiProfile = profile === "ultra" ? "ultra" : profileKey;
  const tREFI =
    TREFI_TABLE?.[tRefiProfile]?.[gen] ?? TREFI_TABLE?.safe?.[gen] ?? 7800;

  const stabilityBonus =
    (Math.floor((ramSize - 8) / 8) * 10 +
      slotsCount * 12 -
      12 +
      (isDensityHigh ? 48 : 0) +
      (isEcc ? (isDdr4 ? 24 : 40) : -12) +
      (boardType === "matx" ? 16 : 0)) *
    (isDdr4 ? 1 : 1.35);

  let tRFC;
  let limitMultiplier = 0.92;

  if (profile === "ultra") {
    const baseRfc = isDdr4 ? 264 : (ULTRA_PRESET?.tRFC ?? 180);
    tRFC = toEven(baseRfc + stabilityBonus * (isDdr4 ? 0.8 : 0.6));
    limitMultiplier = 0.9;
  } else if (isSpecialConfig) {
    tRFC =
      SPECIAL_PRESETS?.[profileKey]?.tRFC ?? SPECIAL_PRESETS?.safe?.tRFC ?? 260;
  } else {
    const basePreset =
      MEMORY_PRESETS?.[frequencyKey]?.[profileKey] ||
      MEMORY_PRESETS?.[frequencyKey]?.safe;
    const defaultBaseRfc =
      profile === "custom" && primaries
        ? (primaries.tRCD + primaries.tRP) * (isDdr4 ? 10 : 8)
        : (basePreset?.tRFC ?? (isDdr4 ? 312 : 240));
    tRFC = toEven(defaultBaseRfc + stabilityBonus);
  }

  const limitValue =
    isSpecialConfig && profile !== "ultra"
      ? (SPECIAL_LIMITS?.[profileKey] ?? toEven(tRFC * 0.92))
      : toEven(tRFC * limitMultiplier);

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
