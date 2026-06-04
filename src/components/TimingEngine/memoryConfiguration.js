import { CPU_MODELS } from "../RamConfiguration/data/cpuData.js";
import { RAM_CONFIGS, RAM_SIZES } from "../RamConfiguration/data/ramData.js";

const SLOT_COMBINATIONS = {
  DDR3: {
    desktop: {
      6: { standard: [2, 3], high: [] },
      12: { standard: [2, 3], high: [] },
      20: { standard: [3, 4], high: [] },
      24: { standard: [3, 4], high: [] },
    },
    ecc: {
      12: { standard: [2, 3], high: [] },
      20: { standard: [2, 3, 4], high: [2, 3, 4] },
      24: { standard: [3, 4], high: [3, 4] },
      40: { standard: [], high: [2, 3, 4] },
      48: { standard: [], high: [2, 3, 4] },
    },
  },
  DDR4: {
    desktop: {
      12: { standard: [2, 3], high: [] },
      20: { standard: [2, 3, 4], high: [2, 3, 4] },
      24: { standard: [2, 3, 4], high: [2, 3, 4] },
      40: { standard: [4], high: [2, 3, 4] },
      48: { standard: [4], high: [2, 3, 4] },
    },
    ecc: {
      12: { standard: [2, 3], high: [] },
      20: { standard: [2, 3, 4], high: [2, 3, 4] },
      24: { standard: [2, 3, 4], high: [2, 3, 4] },
      40: { standard: [4], high: [2, 3, 4] },
      48: { standard: [4], high: [2, 3, 4] },
    },
  },
};

const CHANNELS_MAP = ["Single", "Dual", "Triple", "Quad"];

const memoryConfiguration = (state, changedKey) => {
  const {
    gen,
    memory: userMemory,
    density: userDensity,
    slot: userSlot,
    cpu,
    board,
    ramSize,
    history = { V2: {}, V3: {}, V4: {} },
  } = state;

  const cpuList = CPU_MODELS[gen] ?? [];
  let activeCpu = cpu;
  let activeRamSize = ramSize;

  if (changedKey === "gen") {
    const savedHistory = history[gen] || {};
    activeCpu =
      savedHistory.cpu !== undefined
        ? savedHistory.cpu
        : (cpuList[0]?.name ?? "");
    activeRamSize =
      savedHistory.ramSize !== undefined
        ? savedHistory.ramSize
        : gen === "V2"
          ? 4
          : 16;
  } else if (changedKey === "cpu") {
    activeCpu = cpu;
  }

  const isPlatformV2 = gen === "V2";
  const isPlatformV3 = gen === "V3";
  const isPlatformV4 = gen === "V4";
  const ramTypeLabel = isPlatformV2 ? "DDR3" : "DDR4";
  const isDdr4Type = ramTypeLabel === "DDR4";
  const ramTypeKey = isDdr4Type ? "ddr4" : "ddr3";

  const rawRamSizeValue = Number(activeRamSize) || 8;
  const filteredRamSizeStep =
    changedKey === "gen" && rawRamSizeValue === 6 ? 4 : rawRamSizeValue;
  const supportedRamSizes = RAM_SIZES.filter(
    (size) => size !== 6 || isPlatformV2,
  );
  const validatedRamSize = supportedRamSizes.includes(filteredRamSizeStep)
    ? filteredRamSizeStep
    : (supportedRamSizes[0] ?? 8);

  const isV2SpecialSize = validatedRamSize === 6 && isPlatformV2;

  const getOverrideForCurrentConfig = (typeToCheck) =>
    SLOT_COMBINATIONS[ramTypeLabel]?.[typeToCheck]?.[validatedRamSize];

  const filterSlotsByModuleAvailability = (allowedModules) => {
    if (isV2SpecialSize || !allowedModules.length) {
      return [];
    }
    return [1, 2, 3, 4].filter((slots) => {
      const moduleSize = validatedRamSize / slots;
      return (
        Number.isInteger(moduleSize) && allowedModules.includes(moduleSize)
      );
    });
  };

  const checkValidSlotsForMemoryType = (memoryTypeToCheck) => {
    if (isV2SpecialSize) {
      return [];
    }
    const currentOverride = getOverrideForCurrentConfig(memoryTypeToCheck);
    if (currentOverride) {
      return Array.from(
        new Set([...currentOverride.standard, ...currentOverride.high]),
      );
    }
    const availableModules =
      RAM_CONFIGS[ramTypeLabel]?.[memoryTypeToCheck] ?? [];
    return filterSlotsByModuleAvailability(availableModules);
  };

  const isDesktopTypePossible =
    checkValidSlotsForMemoryType("desktop").length > 0;
  const isEccTypePossible =
    !isV2SpecialSize && checkValidSlotsForMemoryType("ecc").length > 0;

  const validMemoryTypes = [];
  if (isDesktopTypePossible) {
    validMemoryTypes.push("desktop");
  }
  if (isEccTypePossible) {
    validMemoryTypes.push("ecc");
  }

  const selectedMemoryType = isV2SpecialSize
    ? "desktop"
    : validMemoryTypes.includes(userMemory)
      ? userMemory
      : (validMemoryTypes[0] ?? "desktop");
  const isEccEnabled = selectedMemoryType === "ecc";
  const configurationModules =
    RAM_CONFIGS[ramTypeLabel]?.[selectedMemoryType] ?? [];

  const totalOverrideConfig = getOverrideForCurrentConfig(selectedMemoryType);
  const lowDensitySlots = totalOverrideConfig
    ? totalOverrideConfig.standard
    : filterSlotsByModuleAvailability(
        configurationModules.filter((m) => m <= 8),
      );
  const highDensitySlots = totalOverrideConfig
    ? totalOverrideConfig.high
    : filterSlotsByModuleAvailability(
        configurationModules.filter((m) => m >= 16),
      );

  const calculatedDensity =
    isPlatformV2 && selectedMemoryType === "desktop"
      ? "no"
      : lowDensitySlots.length === 0 && highDensitySlots.length > 0
        ? "yes"
        : highDensitySlots.length === 0 && lowDensitySlots.length > 0
          ? "no"
          : (userDensity ?? "no");

  const densityFilteredSlots =
    calculatedDensity === "yes" ? highDensitySlots : lowDensitySlots;

  const finalVisibleSlots = isV2SpecialSize
    ? [2, 3]
    : densityFilteredSlots.length > 0
      ? densityFilteredSlots
      : lowDensitySlots.length > 0
        ? lowDensitySlots
        : [2];

  const currentSlotNumber = Number(userSlot?.replace("slots", "")) || 2;
  const verifiedSlotNumber = finalVisibleSlots.includes(currentSlotNumber)
    ? currentSlotNumber
    : (finalVisibleSlots[0] ?? 2);
  const verifiedSlotKey = `slots${verifiedSlotNumber}`;

  const validatedCpu = cpuList.some((m) => m.name === activeCpu)
    ? activeCpu
    : (cpuList[0]?.name ?? "");

  const isSpecialMotherboardConfig =
    board === "matx" &&
    (isPlatformV3 || isPlatformV4) &&
    selectedMemoryType === "desktop" &&
    calculatedDensity === "no" &&
    ((validatedRamSize === 16 && verifiedSlotNumber === 2) ||
      (validatedRamSize === 32 && verifiedSlotNumber === 4));

  const updatedPlatformHistory = {
    ...history,
    [gen]: { cpu: validatedCpu, ramSize: validatedRamSize },
  };

  const formattedMemoryTypesUi = {
    desktop: isDesktopTypePossible,
    ecc: isEccTypePossible,
  };

  return {
    ...state,
    ramSize: validatedRamSize,
    memory: selectedMemoryType,
    density: calculatedDensity,
    slot: verifiedSlotKey,
    isSpecialConfig: isSpecialMotherboardConfig,
    ramType: ramTypeLabel,
    isDdr4: isDdr4Type,
    isV2: isPlatformV2,
    isV3: isPlatformV3,
    isV4: isPlatformV4,
    isEcc: isEccEnabled,
    typeKey: ramTypeKey,
    cpu: validatedCpu,
    isSelectionRequired:
      validatedRamSize >= 16 &&
      validatedRamSize <= 32 &&
      !(isPlatformV2 && selectedMemoryType === "desktop"),
    cpuModels: cpuList,
    visibleSlots: Object.fromEntries(
      finalVisibleSlots.map((num) => [`slots${num}`, true]),
    ),
    memoryTypes: formattedMemoryTypesUi,
    channelsName: CHANNELS_MAP[Math.min(verifiedSlotNumber - 1, 3)] ?? "Single",
    ramSizes: supportedRamSizes,
    history: updatedPlatformHistory,
  };
};

export default memoryConfiguration;
