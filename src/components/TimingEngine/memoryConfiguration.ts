import { CPU_MODELS } from "../RamConfiguration/data/cpuData.js";
import { RAM_CONFIGS, RAM_SIZES } from "../RamConfiguration/data/ramData.js";

const memoryConfiguration = (state: any, changedKey?: string): any => {
  const isV2 = state.gen === "V2";
  const ramType = isV2 ? "DDR3" : "DDR4";
  const cpuList = (CPU_MODELS as any)[state.gen] ?? [];

  let ramSize = Number(state.ramSize) || 8;
  if (changedKey === "gen" && ramSize === 6) {
    ramSize = 4;
  }

  const memoryTypesArray = ["desktop", "ecc"].filter(
    (type) => !(ramSize === 6 && isV2 && type === "ecc"),
  );
  const memoryType = memoryTypesArray.includes(state.memoryType)
    ? state.memoryType
    : memoryTypesArray[0];

  const modules = (RAM_CONFIGS as any)[ramType]?.[memoryType] ?? [];
  let isDensityHigh = !!state.isDensityHigh;

  if (isV2 && memoryType === "desktop") {
    isDensityHigh = false;
    if (ramSize > 32) {
      ramSize = 32;
    }
  }

  const calculateSlots = (allowed: number[], required: number[]) => {
    if (!allowed.length || !required.length) {
      return [];
    }
    return [1, 2, 3, 4].filter((slots) => {
      if (ramSize === 6 && isV2) {
        return slots === 2 || slots === 3;
      }
      return required.some((m1) => {
        if (slots === 1) {
          return m1 === ramSize;
        }
        return allowed.some((m2) => {
          if (slots === 2) {
            return m1 + m2 === ramSize;
          }
          return allowed.some((m3) => {
            if (slots === 3) {
              return m1 + m2 + m3 === ramSize;
            }
            return allowed.some((m4) => m1 + m2 + m3 + m4 === ramSize);
          });
        });
      });
    });
  };

  const standardSlots = calculateSlots(
    modules.filter((m: number) => m <= 8),
    modules.filter((m: number) => m <= 8),
  );
  const highDensitySlots = calculateSlots(
    modules,
    modules.filter((m: number) => m >= 16),
  );

  const isSelectionRequired =
    standardSlots.length > 0 && highDensitySlots.length > 0 && ramSize >= 16;

  if (standardSlots.length === 0) {
    isDensityHigh = true;
  } else if (highDensitySlots.length === 0) {
    isDensityHigh = false;
  }

  let visibleSlotsArray = isDensityHigh ? highDensitySlots : standardSlots;
  if (!visibleSlotsArray || visibleSlotsArray.length === 0) {
    visibleSlotsArray = standardSlots.length ? standardSlots : [1];
  }

  const currentSlotsCount = Number(state.slotsCount);
  const slotsCount = visibleSlotsArray.includes(currentSlotsCount)
    ? currentSlotsCount
    : visibleSlotsArray[0] || 1;

  const cpuExists = cpuList.some((model: any) => model.name === state.cpu);
  const currentCpu = cpuExists ? state.cpu : (cpuList[0]?.name ?? "");

  const isSpecialConfig =
    state.boardType === "matx" &&
    (state.gen === "V3" || state.gen === "V4") &&
    memoryType === "desktop" &&
    !isDensityHigh &&
    ((ramSize === 16 && slotsCount === 2) ||
      (ramSize === 32 && slotsCount === 4));

  const visibleSlotsObj = visibleSlotsArray.reduce(
    (acc: any, num) => ({ ...acc, [num]: true }),
    {},
  );
  const memoryTypesObj = memoryTypesArray.reduce(
    (acc: any, type) => ({ ...acc, [type]: true }),
    {},
  );

  return {
    ...state,
    ramSize,
    memoryType,
    isDensityHigh,
    slotsCount,
    isSpecialConfig,
    ramType,
    cpu: currentCpu,
    isSelectionRequired,
    cpuModels: cpuList,
    visibleSlots: visibleSlotsObj,
    memoryTypes: memoryTypesObj,
    channelsName:
      ["Single", "Dual", "Triple", "Quad"][Math.min(slotsCount - 1, 3)] ??
      "Single",
    ramSizes: RAM_SIZES.filter((size: number) => size !== 6 || isV2),
  };
};

export default memoryConfiguration;
