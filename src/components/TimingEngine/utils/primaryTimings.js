import {
  MEMORY_PRESETS,
  ULTRA_PRESET,
} from "../../RamConfiguration/data/memoryPresets";
import { toEven } from "./ramFrequency";

const PrimaryTimings = (state, frequency) => {
  const {
    preset,
    ramSize,
    slot,
    density,
    board,
    isEcc,
    isDdr4,
    isV4,
    isV3,
    isV2,
    tCL,
    tRCD,
    tRP,
    tRAS,
    tRC,
  } = state;

  const slotsCount = Number(slot?.replace("slots", "")) || 2;
  const loadScore =
    Math.floor(ramSize / 32) * 2 +
    (slotsCount > 2 ? 1 : 0) +
    (density === "yes" ? 2 : 0) +
    (board === "matx" ? 1 : 0) +
    (isEcc ? 1 : 0);

  const totalDivider = isV4 ? 4 : isDdr4 ? 2 : 3;
  const baseUltraValue = isV4 ? 11 : isDdr4 ? 12 : (ULTRA_PRESET?.tCL ?? 11);
  const ultraTimingValue =
    baseUltraValue + Math.floor(loadScore / totalDivider);
  const ultraTrasValue = toEven(ultraTimingValue * 2);

  const currentPresetData =
    MEMORY_PRESETS?.[frequency]?.[preset === "custom" ? "safe" : preset] ??
    MEMORY_PRESETS?.[frequency]?.safe ??
    MEMORY_PRESETS?.safe ??
    {};
  const v4OffsetModifier = isV4 && frequency >= 2133 ? 2 : 0;

  const calculatePrimaryValue = (userInputValue, presetDefaultValue) =>
    preset === "custom" && userInputValue !== undefined && userInputValue !== ""
      ? Number(userInputValue)
      : isDdr4
        ? Math.max((presetDefaultValue ?? 15) - v4OffsetModifier, 11)
        : (presetDefaultValue ?? 15) - v4OffsetModifier;

  const calculatedCL = calculatePrimaryValue(tCL, currentPresetData.tCL);
  const calculatedRCD = calculatePrimaryValue(tRCD, currentPresetData.tRCD);
  const calculatedRP = calculatePrimaryValue(tRP, currentPresetData.tRP);

  const automaticTras = toEven(calculatedCL + calculatedRCD + (isV2 ? 4 : 2));
  const finalTras =
    preset === "custom" && tRAS !== undefined && tRAS !== ""
      ? Number(tRAS)
      : automaticTras;

  const automaticTrc = isDdr4
    ? Math.max(
        isV3 || isV4
          ? toEven(finalTras + 4)
          : calculatedCL + calculatedRCD + calculatedRP,
        34,
      )
    : isV3 || isV4
      ? toEven(finalTras + 4)
      : calculatedCL + calculatedRCD + calculatedRP;
  const finalTrc =
    preset === "custom" && tRC !== undefined && tRC !== ""
      ? Number(tRC)
      : automaticTrc;

  return preset === "ultra"
    ? {
        tCL: ultraTimingValue,
        tRCD: ultraTimingValue,
        tRP: ultraTimingValue,
        tRAS: ultraTrasValue,
        loadScore,
        tRC: isV3 || isV4 ? toEven(ultraTrasValue + 4) : ultraTimingValue * 3,
      }
    : {
        tCL: calculatedCL,
        tRCD: calculatedRCD,
        tRP: calculatedRP,
        tRAS: finalTras,
        tRC: finalTrc,
        loadScore,
      };
};

export default PrimaryTimings;
