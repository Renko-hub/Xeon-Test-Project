export const toEven = (value) => Math.round(value / 2) * 2;

const ramFrequency = (state) => {
  const { cpu, cpuModels, isDdr4 } = state;

  // Находим нужную модель или берем первую из списка
  const currentModel = cpuModels?.find((m) => m.name === cpu) ?? cpuModels?.[0];

  // Возвращаем частоту: из модели, либо дефолт для DDR4 (2133), либо дефолт для DDR3 (1866)
  return {
    frequency: currentModel?.maxFreq ?? (isDdr4 ? 2133 : 1866),
  };
};

export default ramFrequency;
