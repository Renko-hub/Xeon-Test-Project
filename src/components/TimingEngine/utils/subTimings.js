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
    userFrequency,
    frequency: baseFrequency,
  } = state;

  const currentFrequency = Number(
    userFrequency || frequency || baseFrequency || 1866,
  );
  const slotsCount = Number(slot?.replace("slots", "")) || 2;
  const isHighCapacity =
    ramSize / Math.max(1, slotsCount) >= 12 || ramSize >= 32;

  const freqPreset =
    MEMORY_PRESETS?.[currentFrequency]?.safe || MEMORY_PRESETS?.safe;
  const base = PROFILE_SUBTIMINGS?.[preset]?.[typeKey] || {};
  const highCapacityPenalty = PENALTIES?.highCapacity?.[typeKey] || {};
  const eccPenalty = PENALTIES?.ecc?.[typeKey] || {};

  const autoFAW = toEven(
    (base.tFAW ?? freqPreset?.tFAW ?? 24) +
      (isHighCapacity ? (highCapacityPenalty.tFAW ?? 0) : 0) +
      (isEcc ? (eccPenalty.tFAW ?? 0) : 0),
  );
  const tFAW = autoFAW;

  const autoWR = toEven(
    (base.tWR ?? freqPreset?.tWR ?? 12) +
      (isHighCapacity ? (highCapacityPenalty.tWR ?? 0) : 0) +
      (isEcc ? (eccPenalty.tWR ?? 0) : 0),
  );
  const tWR =
    preset === "custom" && sWR !== undefined && sWR !== ""
      ? Number(sWR)
      : autoWR;

  const autoRRD =
    (base.tRRD ?? freqPreset?.tRRD ?? 4) +
    (isHighCapacity ? (highCapacityPenalty.tRRD ?? 0) : 0) +
    (isEcc ? (eccPenalty.tRRD ?? 0) : 0);
  const tRRD =
    preset === "custom" && sRRD !== undefined && sRRD !== ""
      ? Number(sRRD)
      : autoRRD;

  const autoWTR =
    (base.tWTR ?? freqPreset?.tWTR ?? 6) +
    (isHighCapacity ? (highCapacityPenalty.tWTR ?? 0) : 0);
  const tWTR =
    preset === "custom" && sWTR !== undefined && sWTR !== ""
      ? Number(sWTR)
      : autoWTR;

  const autoRTP =
    (base.tRTP ?? freqPreset?.tRTP ?? 6) + (isEcc ? (eccPenalty.tRTP ?? 0) : 0);
  const tRTP =
    preset === "custom" && sRTP !== undefined && sRTP !== ""
      ? Number(sRTP)
      : autoRTP;

  const profileKey =
    preset === "custom" || preset === "ultra" ? "safe" : preset;

  const autoREFI =
    TREFI_TABLE?.[preset === "ultra" ? "ultra" : profileKey]?.[gen] ??
    TREFI_TABLE?.safe?.[gen] ??
    7800;
  const tREFI =
    preset === "custom" && sREFI !== undefined && sREFI !== ""
      ? Number(sREFI)
      : autoREFI;

  const stabilityBonus =
    (Math.floor((ramSize - 8) / 8) * 10 +
      slotsCount * 12 -
      12 +
      (density === "yes" ? 48 : 0) +
      (isEcc ? (isDdr4 ? 24 : 40) : -12) +
      (board === "matx" ? 16 : 0)) *
    (isDdr4 ? 1 : 1.35);

  const autoRFC =
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
              (MEMORY_PRESETS?.[currentFrequency]?.[profileKey]?.tRFC ||
                MEMORY_PRESETS?.[currentFrequency]?.safe?.tRFC ||
                (isDdr4 ? 312 : 240)) + stabilityBonus,
            );

  const tRFC =
    preset === "custom" && sRFC !== undefined && sRFC !== ""
      ? Number(sRFC)
      : autoRFC;

  const limitValue =
    isSpecialConfig && preset !== "ultra"
      ? (SPECIAL_LIMITS?.[profileKey] ?? toEven(tRFC * 0.92))
      : toEven(tRFC * (preset === "ultra" ? 0.9 : 0.92));

  const currentCL =
    state.tCL !== undefined && state.tCL !== ""
      ? Number(state.tCL)
      : (primaries?.tCL ?? (isDdr4 ? 16 : 40));
  const option1 = currentCL;
  const option2 = isDdr4 ? currentCL - 2 : currentCL - 4;
  const option3 = isDdr4
    ? Math.max(9, Math.floor(currentFrequency / 400))
    : Math.max(20, Math.floor(currentFrequency / 150));

  const sortedCwlOptions = [option1, option2, option3].sort((a, b) => a - b);
  const medianCwlValue = sortedCwlOptions[1];
  const autoCWL = toEven(base.tCWL ?? freqPreset?.tCWL ?? medianCwlValue);

  const tCWL =
    preset === "custom" && sCWL !== undefined && sCWL !== ""
      ? Number(sCWL)
      : autoCWL;

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
