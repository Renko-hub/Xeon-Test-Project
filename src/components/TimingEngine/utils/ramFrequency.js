export const toEven = (value) => Math.round(value / 2) * 2;

const ramFrequency = (state) => {
  const { cpu, cpuModels, isDdr4 } = state;

  const currentModel = cpuModels?.find((m) => m.name === cpu) ?? cpuModels?.[0];

  return {
    frequency: currentModel?.maxFreq ?? (isDdr4 ? 2133 : 1866),
  };
};

export default ramFrequency;
