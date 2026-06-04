export const toEven = (value) => {
  const num = Number(value);
  return isNaN(num) ? 0 : Math.round(num / 2) * 2;
};

const DEFAULT_DDR4_FREQ = 2133;
const DEFAULT_DDR3_FREQ = 1866;

const ramFrequency = (state) => {
  const { cpu, cpuModels, isDdr4, userFrequency } = state;

  if (userFrequency !== undefined && String(userFrequency).trim() !== "") {
    const parsedFreq = Number(userFrequency);
    if (!isNaN(parsedFreq)) {
      return { frequency: parsedFreq };
    }
  }

  const fallbackFrequency = isDdr4 ? DEFAULT_DDR4_FREQ : DEFAULT_DDR3_FREQ;

  if (!Array.isArray(cpuModels) || cpuModels.length === 0) {
    return { frequency: fallbackFrequency };
  }

  const currentCpuModel =
    cpuModels.find((model) => model?.name === cpu) || cpuModels[0];

  return {
    frequency: currentCpuModel?.maxFreq ?? fallbackFrequency,
  };
};

export default ramFrequency;
