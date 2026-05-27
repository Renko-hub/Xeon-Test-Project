import { CPU_MODELS } from "../RamConfiguration/data/cpuData.js";
import { RAM_CONFIGS, RAM_SIZES } from "../RamConfiguration/data/ramData.js";

const memoryConfiguration = (
  state: {
    gen: string;
    ramSize: string | number;
    memoryType: string;
    isDensityHigh?: boolean;
    slotsCount: string | number;
    cpu: string;
    boardType: string;
    [key: string]: any;
  },
  changedKey?: string,
): any => {
  const isV2 = state.gen === "V2";
  const isV3 = state.gen === "V3";
  const isV4 = state.gen === "V4";
  const ramType = isV2 ? "DDR3" : "DDR4";
  const isDdr4 = ramType === "DDR4";
  const typeKey = isDdr4 ? "ddr4" : "ddr3";

  const cpuList =
    (CPU_MODELS as Record<string, Array<{ name: string; maxFreq: number }>>)[
      state.gen
    ] ?? [];

  let ramSize = Number(state.ramSize) || 8;
  if (changedKey === "gen" && ramSize === 6) {
    ramSize = 4;
  }

  if (isV2 && state.memoryType === "desktop" && ramSize > 32) {
    ramSize = 32;
  }

  const isV2Special = ramSize === 6 && isV2;
  const memoryTypesArray = ["desktop", "ecc"].filter(
    (type) => !(isV2Special && type === "ecc"),
  );
  const memoryType = memoryTypesArray.includes(state.memoryType)
    ? state.memoryType
    : memoryTypesArray[0];
  const isEcc = memoryType === "ecc";

  const modules: readonly number[] = (
    RAM_CONFIGS as Record<string, Record<string, readonly number[]>>
  )[ramType]?.[memoryType] ?? [4, 8, 16, 32];
  let isDensityHigh = !!state.isDensityHigh;

  if (isV2 && memoryType === "desktop") {
    isDensityHigh = false;
  }

  const getValidSlots = (availableModules: readonly number[]) => {
    if (ramSize === 6 && isV2) {
      return [2, 3];
    }

    return [1, 2, 3, 4].filter((slots) => {
      const moduleSize = ramSize / slots;
      return (
        Number.isInteger(moduleSize) && availableModules.includes(moduleSize)
      );
    });
  };

  const standardModules = modules.filter((m) => m <= 8);
  const highDensityModules = modules.filter((m) => m >= 16);

  const standardSlots = getValidSlots(standardModules);
  const highDensitySlots = getValidSlots(highDensityModules);

  if (standardSlots.length === 0) {
    isDensityHigh = true;
  } else if (highDensitySlots.length === 0) {
    isDensityHigh = false;
  }

  const isSelectionRequired =
    standardSlots.length > 0 && highDensitySlots.length > 0 && ramSize >= 16;

  let visibleSlotsArray = isDensityHigh ? highDensitySlots : standardSlots;
  if (visibleSlotsArray.length === 0) {
    visibleSlotsArray = standardSlots.length ? standardSlots : [1];
  }

  const currentSlotsCount = Number(state.slotsCount);
  const slotsCount = visibleSlotsArray.includes(currentSlotsCount)
    ? currentSlotsCount
    : visibleSlotsArray[0];

  const cpuExists = cpuList.some((model) => model.name === state.cpu);
  const currentCpu = cpuExists ? state.cpu : (cpuList[0]?.name ?? "");

  const isSpecialConfig =
    state.boardType === "matx" &&
    (isV3 || isV4) &&
    memoryType === "desktop" &&
    !isDensityHigh &&
    ((ramSize === 16 && slotsCount === 2) ||
      (ramSize === 32 && slotsCount === 4));

  return {
    ...state,
    ramSize,
    memoryType,
    isDensityHigh,
    slotsCount,
    isSpecialConfig,
    ramType,
    isDdr4,
    isV2,
    isV3,
    isV4,
    isEcc,
    typeKey,
    cpu: currentCpu,
    isSelectionRequired,
    cpuModels: cpuList,
    visibleSlots: Object.fromEntries(
      visibleSlotsArray.map((num) => [num, true]),
    ),
    memoryTypes: Object.fromEntries(
      memoryTypesArray.map((type) => [type, true]),
    ),
    channelsName:
      ["Single", "Dual", "Triple", "Quad"][Math.min(slotsCount - 1, 3)] ??
      "Single",
    ramSizes: RAM_SIZES.filter((size: number) => size !== 6 || isV2),
  };
};

export default memoryConfiguration;
