import { CPU_MODELS } from "../RamConfiguration/data/cpuData.js";
import { RAM_CONFIGS, RAM_SIZES } from "../RamConfiguration/data/ramData.js";

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
    userFrequency,
    tCL,
    tRP,
    tRCD,
    tRAS,
    tRC,
    tWR,
    tREFI,
    tRRD,
    tRTP,
    tWTR,
    tCR,
    tRFC,
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

  const checkValidSlotsForMemoryType = (memoryTypeToCheck) => {
    if (isV2SpecialSize) {
      return [];
    }

    const availableModules =
      RAM_CONFIGS[ramTypeLabel]?.[memoryTypeToCheck] ?? [];
    const capacitySlotOverrides = {
      20: { standard: [3, 4], high: [2] },
      24: { standard: [3, 4], high: [2, 3] },
      40: { standard: [], high: [2, 3, 4] },
      48: { standard: [], high: [2, 3, 4] },
    };

    const currentOverride = capacitySlotOverrides[validatedRamSize];
    if (currentOverride) {
      return [...currentOverride.standard, ...currentOverride.high];
    }

    return [1, 2, 3, 4].filter((slots) => {
      const singleModuleSize = validatedRamSize / slots;
      return (
        Number.isInteger(singleModuleSize) &&
        availableModules.includes(singleModuleSize)
      );
    });
  };

  const isDesktopTypePossible =
    checkValidSlotsForMemoryType("desktop").length > 0;
  const isEccTypePossible =
    checkValidSlotsForMemoryType("ecc").length > 0 && !isV2SpecialSize;

  const validMemoryTypes = ["desktop", "ecc"].filter((type) => {
    if (type === "ecc" && !isEccTypePossible) {
      return false;
    }
    if (type === "desktop" && !isDesktopTypePossible) {
      return false;
    }
    return true;
  });

  const selectedMemoryType = isV2SpecialSize
    ? "desktop"
    : validMemoryTypes.includes(userMemory)
      ? userMemory
      : (validMemoryTypes[0] ?? "desktop");

  const isEccEnabled = selectedMemoryType === "ecc";
  const configurationModules =
    RAM_CONFIGS[ramTypeLabel]?.[selectedMemoryType] ?? [];

  const filterSlotsByModuleAvailability = (allowedModules) => {
    if (isV2SpecialSize) {
      return [];
    }

    return [1, 2, 3, 4].filter((slots) => {
      const moduleSize = validatedRamSize / slots;
      return (
        Number.isInteger(moduleSize) && allowedModules.includes(moduleSize)
      );
    });
  };

  const genericSlotOverrides = {
    20: { standard: [3, 4], high: [2] },
    24: { standard: [3, 4], high: [2, 3] },
    40: { standard: [], high: [2, 3, 4] },
    48: { standard: [], high: [2, 3, 4] },
  };

  const totalOverrideConfig = genericSlotOverrides[validatedRamSize];
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
    [gen]: {
      cpu: validatedCpu,
      ramSize: validatedRamSize,
    },
  };

  const formattedMemoryTypesUi = {
    desktop: true,
    ecc: validatedRamSize !== 6,
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
    visibleSlots: finalVisibleSlots.reduce(
      (acc, num) => ({ ...acc, [`slots${num}`]: true }),
      {},
    ),
    memoryTypes: formattedMemoryTypesUi,
    channelsName:
      ["Single", "Dual", "Triple", "Quad"][
        Math.min(verifiedSlotNumber - 1, 3)
      ] ?? "Single",
    ramSizes: supportedRamSizes,
    history: updatedPlatformHistory,
    userFrequency,
    tCL,
    tRP,
    tRCD,
    tRAS,
    tRC,
    tWR,
    tREFI,
    tRRD,
    tRTP,
    tWTR,
    tCR,
    tRFC,
  };
};

export default memoryConfiguration;
