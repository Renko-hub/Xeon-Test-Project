import { MEMORY_PRESETS } from "../../RamConfiguration/data/memoryPresets";

export const toEven = (value) => Math.round(value / 2) * 2;

const ramFrequency = (state) => {
  const { cpu, cpuModels, isDdr4 = true } = state || {};
  const defFreq = isDdr4 ? 2133 : 1866;

  const model = cpuModels?.find((m) => m.name === cpu) || cpuModels?.[0];
  const frequency = model?.maxFreq ?? defFreq;

  return {
    frequency,
    frequencyKey:
      MEMORY_PRESETS?.[frequency] !== undefined ? frequency : defFreq,
  };
};

export default ramFrequency;
