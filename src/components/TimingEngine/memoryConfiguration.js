import { CPU_MODELS } from "../RamConfiguration/data/cpuData.js";
import { RAM_CONFIGS, RAM_SIZES } from "../RamConfiguration/data/ramData.js";

const memoryConfiguration = (state, changedKey) => {
  const {
    gen,
    memory: userMemory,
    density: userDensity,
    slot: userSlot,
    cpu: userCpu,
    board,
  } = state;

  // 1. Определение платформы и типов данных
  const isV2 = gen === "V2";
  const isV3 = gen === "V3";
  const isV4 = gen === "V4";
  const ramType = isV2 ? "DDR3" : "DDR4";
  const isDdr4 = ramType === "DDR4";
  const typeKey = isDdr4 ? "ddr4" : "ddr3";
  const cpuList = CPU_MODELS[gen] ?? [];

  // 2. Валидация объема памяти (ramSize) без мутаций и без жесткого сброса DESKTOP до 32GB
  const rawRamSize = Number(state.ramSize) || 8;
  const step1Size = changedKey === "gen" && rawRamSize === 6 ? 4 : rawRamSize;

  const currentRamSizes = RAM_SIZES.filter((size) => size !== 6 || isV2);
  const finalRamSize = currentRamSizes.includes(step1Size)
    ? step1Size
    : currentRamSizes[0];

  // Вспомогательная функция для симуляции расчета слотов (используется для автоопределения типа памяти)
  const getValidSlotsForType = (memType) => {
    if (finalRamSize === 6 && isV2) {
      return [2, 3];
    }
    const availableModules = RAM_CONFIGS[ramType]?.[memType] ?? [];

    const slotOverrides = {
      20: { standard: [3, 4], high: [2] },
      24: { standard: [3, 4], high: [2, 3] },
      40: { standard: [], high: [2, 3, 4] },
      48: { standard: [], high: [2, 3, 4] },
    };

    const override = slotOverrides[finalRamSize];
    if (override) {
      return [...override.standard, ...override.high];
    }

    return [1, 2, 3, 4].filter((slots) => {
      const moduleSize = finalRamSize / slots;
      return (
        Number.isInteger(moduleSize) && availableModules.includes(moduleSize)
      );
    });
  };

  // 3. Валидация типа памяти (memory) с автопереключением на ECC для больших объемов
  const isV2Special = finalRamSize === 6 && isV2;
  const isDesktopPossible = getValidSlotsForType("desktop").length > 0;

  // Исключаем desktop, если на десктопных планках физически невозможно собрать выбранный объем
  const memoryTypesArray = ["desktop", "ecc"].filter((type) => {
    if (isV2Special && type === "ecc") {
      return false;
    }
    if (!isDesktopPossible && type === "desktop") {
      return false;
    }
    return true;
  });

  const memory = memoryTypesArray.includes(userMemory)
    ? userMemory
    : memoryTypesArray[0];
  const isEcc = memory === "ecc";

  // 4. Определение доступных конфигураций слотов для уже валидного типа памяти
  const modules = RAM_CONFIGS[ramType]?.[memory] ?? [];

  const getValidSlots = (availableModules) =>
    isV2Special
      ? [2, 3]
      : [1, 2, 3, 4].filter((slots) => {
          const moduleSize = finalRamSize / slots;
          return (
            Number.isInteger(moduleSize) &&
            availableModules.includes(moduleSize)
          );
        });

  const slotOverrides = {
    20: { standard: [3, 4], high: [2] },
    24: { standard: [3, 4], high: [2, 3] },
    40: { standard: [], high: [2, 3, 4] },
    48: { standard: [], high: [2, 3, 4] },
  };

  const override = slotOverrides[finalRamSize];
  const standardSlots = override
    ? override.standard
    : getValidSlots(modules.filter((m) => m <= 8));
  const highDensitySlots = override
    ? override.high
    : getValidSlots(modules.filter((m) => m >= 16));

  // 5. Определение плотности чипов (density) через линейный тернарник
  const density =
    isV2 && memory === "desktop"
      ? "no"
      : standardSlots.length === 0 && highDensitySlots.length > 0
        ? "yes"
        : highDensitySlots.length === 0 && standardSlots.length > 0
          ? "no"
          : userDensity;

  // 6. Выбор валидного слота
  const baseSlotsArray = density === "yes" ? highDensitySlots : standardSlots;
  const visibleSlotsArray =
    baseSlotsArray.length > 0
      ? baseSlotsArray
      : standardSlots.length
        ? standardSlots
        : [2];

  const currentSlotNum = Number(userSlot?.replace("slots", "")) || 2;
  const validSlotNum = visibleSlotsArray.includes(currentSlotNum)
    ? currentSlotNum
    : visibleSlotsArray[0];
  const slot = `slots${validSlotNum}`;

  // 7. Проверка процессора и спец-конфигураций
  const currentCpu = cpuList.some((m) => m.name === userCpu)
    ? userCpu
    : (cpuList[0]?.name ?? "");

  const isSpecialConfig =
    board === "matx" &&
    (isV3 || isV4) &&
    memory === "desktop" &&
    density === "no" &&
    ((finalRamSize === 16 && validSlotNum === 2) ||
      (finalRamSize === 32 && validSlotNum === 4));

  return {
    ...state,
    ramSize: finalRamSize,
    memory,
    density,
    slot,
    isSpecialConfig,
    ramType,
    isDdr4,
    isV2,
    isV3,
    isV4,
    isEcc,
    typeKey,
    cpu: currentCpu,
    // Скрываем вопрос высокой плотности на V2, если выбрана обычная десктопная память
    isSelectionRequired:
      finalRamSize >= 16 &&
      finalRamSize <= 32 &&
      !(isV2 && memory === "desktop"),
    cpuModels: cpuList,
    visibleSlots: visibleSlotsArray.reduce(
      (acc, num) => ({ ...acc, [`slots${num}`]: true }),
      {},
    ),
    memoryTypes: memoryTypesArray.reduce(
      (acc, type) => ({ ...acc, [type]: true }),
      {},
    ),
    channelsName:
      ["Single", "Dual", "Triple", "Quad"][Math.min(validSlotNum - 1, 3)] ??
      "Single",
    ramSizes: currentRamSizes,
  };
};

export default memoryConfiguration;
