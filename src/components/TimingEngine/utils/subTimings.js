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

const getCustomOrAuto = (preset, userInput, autoValue) =>
  preset === "custom" &&
  userInput !== undefined &&
  String(userInput).trim() !== ""
    ? Number(userInput)
    : autoValue;

const calculateAutoRFC = (params) => {
  const {
    preset,
    profileKey,
    isSpecialConfig,
    isDdr4,
    currentFrequency,
    primaries,
    stabilityBonus,
  } = params;

  if (preset === "ultra") {
    const baseUltraRFC = isDdr4 ? 264 : (ULTRA_PRESET?.tRFC ?? 180);
    return toEven(baseUltraRFC + stabilityBonus * (isDdr4 ? 0.8 : 0.6));
  }

  if (isSpecialConfig) {
    return (
      SPECIAL_PRESETS?.[profileKey]?.tRFC ?? SPECIAL_PRESETS?.safe?.tRFC ?? 260
    );
  }

  if (preset === "custom" && primaries) {
    return toEven(
      (primaries.tRCD + primaries.tRP) * (isDdr4 ? 10 : 8) + stabilityBonus,
    );
  }

  const freqPresetRFC =
    MEMORY_PRESETS?.[currentFrequency]?.[profileKey]?.tRFC ||
    MEMORY_PRESETS?.[currentFrequency]?.safe?.tRFC ||
    (isDdr4 ? 312 : 240);

  return toEven(freqPresetRFC + stabilityBonus);
};

const SubTimings = (state, primaries, frequency) => {
  const {
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
    tWR: sWR,
    tREFI: sREFI,
    tRRD: sRRD,
    tRTP: sRTP,
    tWTR: sWTR,
    tCWL: sCWL,
    tRFC: sRFC,
    tFAW: sFAW,
    userFrequency,
    frequency: baseFrequency,
  } = state;

  const currentFrequency = Number(
    userFrequency || frequency || baseFrequency || 1866,
  );
  const slotsCount = Number(slot?.replace("slots", "")) || 2;
  const isHighCapacity =
    ramSize >= 20 || ramSize / Math.max(1, slotsCount) >= 8;

  const activePresetKey = preset === "optimal" ? "balanced" : preset;
  const profileKey =
    preset === "custom" || preset === "ultra" ? "safe" : activePresetKey;

  const freqPreset =
    MEMORY_PRESETS?.[currentFrequency]?.safe || MEMORY_PRESETS?.safe;
  const base = PROFILE_SUBTIMINGS?.[profileKey]?.[typeKey] || {};
  const highCapacityPenalty = PENALTIES?.highCapacity?.[typeKey] || {};
  const eccPenalty = PENALTIES?.ecc?.[typeKey] || {};

  const ensureSafeEven = (value) => (value % 2 !== 0 ? value + 1 : value);

  const autoFAW = toEven(
    (base.tFAW ?? freqPreset?.tFAW ?? 24) +
      (isHighCapacity ? (highCapacityPenalty.tFAW ?? 0) : 0) +
      (isEcc ? (eccPenalty.tFAW ?? 0) : 0),
  );
  const tFAW = getCustomOrAuto(preset, sFAW, autoFAW);

  const autoWR = ensureSafeEven(
    toEven(
      (base.tWR ?? freqPreset?.tWR ?? 12) +
        (isHighCapacity ? (highCapacityPenalty.tWR ?? 0) : 0) +
        (isEcc ? (eccPenalty.tWR ?? 0) : 0),
    ),
  );
  const tWR = getCustomOrAuto(preset, sWR, autoWR);

  const autoRRD = ensureSafeEven(
    (base.tRRD ?? freqPreset?.tRRD ?? 4) +
      (isHighCapacity ? (highCapacityPenalty.tRRD ?? 0) : 0) +
      (isEcc ? (eccPenalty.tRRD ?? 0) : 0),
  );
  const tRRD = getCustomOrAuto(preset, sRRD, autoRRD);

  let baseArchitectureWTR = 8;

  if (gen === "V3") {
    if (preset === "aggressive" || preset === "ultra") {
      baseArchitectureWTR = 6;
    } else {
      baseArchitectureWTR = 8;
    }
  } else if (gen === "V4") {
    if (
      preset === "optimal" ||
      preset === "balanced" ||
      preset === "aggressive" ||
      preset === "ultra"
    ) {
      baseArchitectureWTR = 6;
    } else {
      baseArchitectureWTR = 8;
    }
  } else {
    baseArchitectureWTR = ensureSafeEven(
      (base.tWTR ?? freqPreset?.tWTR ?? 6) +
        (isHighCapacity ? (highCapacityPenalty.tWTR ?? 0) : 0),
    );
  }

  const tWTR = getCustomOrAuto(preset, sWTR, baseArchitectureWTR);

  const autoRTP = ensureSafeEven(
    (base.tRTP ?? freqPreset?.tRTP ?? 6) + (isEcc ? (eccPenalty.tRTP ?? 0) : 0),
  );
  const tRTP = getCustomOrAuto(preset, sRTP, autoRTP);

  const autoREFI =
    TREFI_TABLE?.[preset === "ultra" ? "ultra" : profileKey]?.[gen] ??
    TREFI_TABLE?.safe?.[gen] ??
    7800;
  const tREFI = getCustomOrAuto(preset, sREFI, autoREFI);

  const boundedSizeBonus = Math.min(Math.floor((ramSize - 8) / 8) * 8, 32);
  const genMultiplier = gen === "V4" ? 0.85 : isDdr4 ? 1 : 1.35;
  const stabilityBonus =
    (boundedSizeBonus +
      slotsCount * 12 -
      12 +
      (density === "yes" ? 48 : 0) +
      (isEcc ? (isDdr4 ? 24 : 40) : -12) +
      (board === "matx" ? 16 : 0)) *
    genMultiplier;

  const autoRFC = calculateAutoRFC({
    preset,
    profileKey,
    isSpecialConfig,
    isDdr4,
    currentFrequency,
    primaries,
    stabilityBonus,
  });
  const tRFC = getCustomOrAuto(preset, sRFC, autoRFC);

  const limitMultiplier = preset === "ultra" ? 0.9 : 0.92;
  const limitValue =
    isSpecialConfig && preset !== "ultra"
      ? (SPECIAL_LIMITS?.[profileKey] ?? toEven((tRFC || 260) * 0.92))
      : toEven((tRFC || 260) * limitMultiplier);

  const currentCL = primaries?.tCL ?? (isDdr4 ? 16 : 11);
  let calculatedAutoCWL = currentCL;

  if (isDdr4) {
    if (preset === "aggressive" || preset === "ultra") {
      calculatedAutoCWL = currentCL - 2;
    } else if (preset === "optimal" || preset === "balanced") {
      calculatedAutoCWL = currentCL - 1;
    }
  } else {
    calculatedAutoCWL =
      preset === "aggressive" || preset === "ultra" ? currentCL - 1 : currentCL;
  }

  const autoCWL = ensureSafeEven(toEven(base.tCWL ?? calculatedAutoCWL));
  const tCWL = getCustomOrAuto(preset, sCWL, autoCWL);

  return {
    tRFC,
    tFAW,
    tWR,
    tRRD,
    tRTP,
    tWTR,
    tREFI,
    tCWL,
    tRFC_Values: { current: tRFC, limitValue },
  };
};

export default SubTimings;
