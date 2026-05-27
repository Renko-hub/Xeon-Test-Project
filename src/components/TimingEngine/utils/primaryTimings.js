import {
  MEMORY_PRESETS,
  ULTRA_PRESET,
} from "../../RamConfiguration/data/memoryPresets";
import { toEven } from "./ramFrequency";

const PrimaryTimings = (state, frequencyKey) => {
  const {
    profile,
    ramSize = 16,
    slotsCount = 2,
    isDensityHigh = false,
    boardType = "atx",
    isEcc = false,
    isDdr4 = true,
    isV4 = false,
    isV3 = false,
    isV2 = false,
    tCL: sCL,
    tRCD: sRCD,
    tRP: sRP,
  } = state || {};

  const loadScore =
    Math.floor(ramSize / 32) * 2 +
    (slotsCount > 2 ? 1 : 0) +
    (isDensityHigh ? 2 : 0) +
    (boardType === "matx" ? 1 : 0) +
    (isEcc ? 1 : 0);

  if (profile === "ultra") {
    const divider = isV4 ? 4 : isDdr4 ? 2 : 3;
    const baseUltra = isV4 ? 11 : isDdr4 ? 12 : (ULTRA_PRESET?.tCL ?? 11);
    const timing = baseUltra + Math.floor(loadScore / divider);
    const tRAS = toEven(timing * 2);

    return {
      tCL: timing,
      tRCD: timing,
      tRP: timing,
      tRAS,
      loadScore,
      tRC: isV3 || isV4 ? toEven(tRAS + 4) : timing * 3,
    };
  }

  const isCustom = profile === "custom";
  const preset =
    MEMORY_PRESETS?.[frequencyKey]?.[isCustom ? "safe" : profile] ||
    MEMORY_PRESETS?.[frequencyKey]?.safe ||
    MEMORY_PRESETS?.safe;
  const v4Offset = isV4 && frequencyKey >= 2133 ? 2 : 0;

  const calc = (userVal, presetVal) => {
    if (isCustom && userVal) return +userVal;
    const val = +(presetVal ?? 15) - v4Offset;
    return isDdr4 ? Math.max(val, 11) : val;
  };

  const tCL = calc(sCL, preset?.tCL);
  const tRCD = calc(sRCD, preset?.tRCD);
  const tRP = calc(sRP, preset?.tRP);
  const tRAS = toEven(tCL + tRCD + (isV2 ? 4 : 2));

  const calcTRC = isV3 || isV4 ? toEven(tRAS + 4) : tCL + tRCD + tRP;
  const tRC = isDdr4 ? Math.max(calcTRC, 34) : calcTRC;

  return { tCL, tRCD, tRP, tRAS, tRC, loadScore };
};

export default PrimaryTimings;
