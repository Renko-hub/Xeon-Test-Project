import {
  MEMORY_PRESETS,
  ULTRA_PRESET,
} from "../../RamConfiguration/data/memoryPresets";
import { toEven } from "./ramFrequency";

const DEFAULT_TIMING = 15;

const calculateLoadScore = (state) => {
  const { ramSize, slot, density, board, isEcc } = state;
  const slotsCount = Number(slot?.replace("slots", "")) || 2;
  const sizeFactor = ramSize <= 8 ? 0 : ramSize <= 32 ? 1 : 4;

  return (
    sizeFactor +
    (slotsCount > 2 ? 1 : 0) +
    (density === "yes" || density === true ? 2 : 0) +
    (board === "matx" ? 1 : 0) +
    (isEcc ? 1 : 0)
  );
};

const getV3V4PresetData = (preset, isV4, frequency) => {
  const targetPreset = preset === "custom" ? "safe" : preset;
  const frequencyPreset = MEMORY_PRESETS?.[Number(frequency)]?.[targetPreset];

  if (frequencyPreset) {
    return frequencyPreset;
  }

  switch (preset) {
    case "balanced":
    case "optimal":
      return { tCL: 13, tRCD: 13, tRP: 13 };
    case "aggressive":
      return { tCL: 12, tRCD: 12, tRP: 12 };
    case "safe":
    default: {
      const safeTiming = isV4 ? 16 : 15;
      return { tCL: safeTiming, tRCD: safeTiming, tRP: safeTiming };
    }
  }
};

const PrimaryTimings = (state, frequency) => {
  const { preset, board, isDdr4, isV4, isV3, isV2, tCL, tRCD, tRP, tRAS, tRC } =
    state;

  const loadScore = calculateLoadScore(state);
  const totalDivider = isV4 ? 4 : isDdr4 ? 2 : 3;
  const isPlatformV3V4 = isV3 || isV4;

  if (preset === "ultra") {
    const baseUltraValue = isDdr4
      ? frequency >= 2400
        ? 14
        : 12
      : (ULTRA_PRESET?.tCL ?? 11);
    const ultraTimingValue =
      baseUltraValue + Math.floor(loadScore / totalDivider);
    const ultraTrasValue = toEven(ultraTimingValue * 2 + 2);
    const ultraTrcValue = ultraTrasValue + ultraTimingValue;

    return {
      tCL: ultraTimingValue,
      tRCD: ultraTimingValue,
      tRP: ultraTimingValue,
      tRAS: ultraTrasValue,
      tRC: ultraTrcValue,
      loadScore,
    };
  }

  const currentPresetData = isPlatformV3V4
    ? getV3V4PresetData(preset, isV4, frequency)
    : (MEMORY_PRESETS?.[Number(frequency)]?.[
        preset === "custom" ? "safe" : preset
      ] ??
      MEMORY_PRESETS?.[Number(frequency)]?.safe ??
      MEMORY_PRESETS?.safe ??
      {});

  const getTimingValue = (userInput, presetDefault) =>
    preset === "custom" &&
    userInput !== undefined &&
    String(userInput).trim() !== ""
      ? Number(userInput)
      : (presetDefault ?? DEFAULT_TIMING);

  const calculatedCL = getTimingValue(tCL, currentPresetData.tCL);
  const calculatedRCD = getTimingValue(tRCD, currentPresetData.tRCD);
  const calculatedRP = getTimingValue(tRP, currentPresetData.tRP);

  const baseArchitectureRTP =
    preset === "aggressive" || preset === "ultra" ? 6 : 8;
  const automaticTras = toEven(
    calculatedRCD + baseArchitectureRTP + (isV2 ? 4 : 2),
  );
  const finalTras =
    preset === "custom" && tRAS !== undefined && String(tRAS).trim() !== ""
      ? Number(tRAS)
      : automaticTras;

  const automaticTrc = finalTras + calculatedRP;
  const finalTrc =
    preset === "custom" && tRC !== undefined && String(tRC).trim() !== ""
      ? Number(tRC)
      : automaticTrc;

  return {
    tCL: calculatedCL,
    tRCD: calculatedRCD,
    tRP: calculatedRP,
    tRAS: finalTras,
    tRC: finalTrc,
    loadScore,
  };
};

export default PrimaryTimings;
