export const toEven = (value) => Math.round(value / 2) * 2;

const ramFrequency = (state) => {
  const { cpu, cpuModels, isDdr4, userFrequency } = state;

  if (userFrequency !== undefined && userFrequency !== "") {
    return { frequency: Number(userFrequency) };
  }

  const currentCpuModel =
    cpuModels?.find((model) => model.name === cpu) ?? cpuModels?.[0];

  return {
    frequency: currentCpuModel?.maxFreq ?? (isDdr4 ? 2133 : 1866),
  };
};

export default ramFrequency;
