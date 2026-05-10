import { CPU_MODELS } from '../RamConfiguration/data/cpuData.js';
import { RAM_CONFIGS, RAM_SIZES } from '../RamConfiguration/data/ramData.js';

const memoryConfiguration = (state: any, changedKey?: string): any => {
  const {
    gen,
    boardType,
    cpu,
    memoryType: selectedMemoryType,
    slotsCount: selectedSlotsCount,
  } = state;

  const isV2Generation = gen === 'V2';
  const isV3V4Generation = gen === 'V3' || gen === 'V4';
  const ramType = isV2Generation ? 'DDR3' : 'DDR4';
  const cpuList = (CPU_MODELS as any)[gen] ?? [];
  const ramData = (RAM_CONFIGS as any)[ramType];

  let ramSize = Number(state.ramSize) || 8;
  if (changedKey === 'gen' && !isV2Generation && ramSize === 6) {
    ramSize = 4;
  }

  const memoryTypes = ['desktop', 'ecc'].filter(
    (type) => !(ramSize === 6 && isV2Generation && type === 'ecc'),
  );

  const memoryType = memoryTypes.includes(selectedMemoryType)
    ? selectedMemoryType
    : memoryTypes[0];

  const getVisibleSlots = (isHighDensity: boolean) => {
    const modules = ramData[memoryType] ?? [];
    const allowedModules = isHighDensity
      ? modules
      : modules.filter((m: number) => m <= 8);
    const requiredModules = isHighDensity
      ? modules.filter((m: number) => m >= 16)
      : allowedModules;

    if (!allowedModules.length) return [];

    return [1, 2, 3, 4].filter((slots: number) => {
      if (ramSize === 6 && isV2Generation) return slots === 2 || slots === 3;
      return requiredModules.some((m1: number) => {
        if (slots === 1) return m1 === ramSize;
        return allowedModules.some((m2: number) => {
          if (slots === 2) return m1 + m2 === ramSize;
          return allowedModules.some((m3: number) => {
            if (slots === 3) return m1 + m2 + m3 === ramSize;
            return allowedModules.some(
              (m4: number) => m1 + m2 + m3 + m4 === ramSize,
            );
          });
        });
      });
    });
  };

  const standardSlots = getVisibleSlots(false);
  const highDensitySlots = getVisibleSlots(true);
  const isSelectionRequired =
    standardSlots.length > 0 && highDensitySlots.length > 0 && ramSize >= 16;
  const isDensityHigh =
    standardSlots.length === 0 ? true : !!state.isDensityHigh;

  const visibleSlots = isDensityHigh
    ? highDensitySlots
    : standardSlots.length
      ? standardSlots
      : [1];
  const currentSlotsCount = Number(selectedSlotsCount);
  const slotsCount = visibleSlots.includes(currentSlotsCount)
    ? currentSlotsCount
    : visibleSlots[0];

  const cpuExists = cpuList.some((model: any) => model.name === cpu);
  const currentCpu = cpuExists ? cpu : (cpuList[0]?.name ?? '');

  const isSpecialConfig =
    boardType === 'matx' &&
    isV3V4Generation &&
    memoryType === 'desktop' &&
    !isDensityHigh &&
    ((ramSize === 16 && slotsCount === 2) ||
      (ramSize === 32 && slotsCount === 4));

  const channelsMap = ['Single', 'Dual', 'Triple', 'Quad'];

  return {
    ...state,
    ramSize,
    memoryType,
    isDensityHigh,
    slotsCount,
    isSpecialConfig,
    boardType,
    ramType,
    cpu: currentCpu,
    visibleSlots,
    memoryTypes,
    cpuModels: cpuList,
    isSelectionRequired,
    channelsName: channelsMap[Math.min(slotsCount - 1, 3)] ?? 'Single',
    ramSizes: RAM_SIZES.filter((size: number) => size !== 6 || isV2Generation),
  };
};

export default memoryConfiguration;
