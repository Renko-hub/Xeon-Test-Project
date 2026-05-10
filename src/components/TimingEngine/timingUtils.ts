import {
  MEMORY_PRESETS,
  SPECIAL_PRESETS,
  ULTRA_PRESET,
} from '../RamConfiguration/data/memoryPresets';

export const toEven = (value: number) => Math.round(value / 2) * 2;

export const resolveFrequency = (state: any) => {
  const { cpu, cpuModels, ramType } = state;
  const isDdr4 = ramType === 'DDR4';
  const frequencyData = cpuModels?.find((m: any) => m.name === cpu) ??
    cpuModels[0] ?? { maxFreq: isDdr4 ? 2133 : 1866 };
  const frequency = frequencyData.maxFreq;
  const frequencyKey = (MEMORY_PRESETS as any)[frequency]
    ? frequency
    : isDdr4
      ? 2133
      : 1866;
  return { frequency, frequencyKey };
};

export const PrimaryTimings = (state: any, frequencyKey: number) => {
  const {
    profile,
    ramSize,
    slotsCount,
    isDensityHigh,
    boardType,
    memoryType,
    ramType,
    gen,
    tCL: sCL,
    tRCD: sRCD,
    tRP: sRP,
  } = state;
  const isDdr4 = ramType === 'DDR4';
  const isV2 = gen === 'V2';
  const presets = MEMORY_PRESETS as any;
  const basePreset =
    presets[frequencyKey][profile === 'ultra' ? 'aggressive' : profile] ??
    presets[frequencyKey].safe;

  const loadScore =
    Math.floor(ramSize / 32) * 2 +
    (slotsCount > 2 ? 1 : 0) +
    (isDensityHigh ? 2 : 0) +
    (boardType === 'matx' ? 1 : 0) +
    (memoryType === 'ecc' ? 1 : 0);

  let tCL: number, tRCD: number, tRP: number, tRAS: number;

  if (profile === 'ultra') {
    const penalty = Math.floor(loadScore / (isDdr4 ? 2 : 3));
    tCL = (isDdr4 ? 12 : ULTRA_PRESET.tCL) + penalty;
    tRCD = (isDdr4 ? 12 : ULTRA_PRESET.tRCD) + penalty;
    tRP = (isDdr4 ? 12 : ULTRA_PRESET.tRP) + penalty;
    tRAS = toEven(tCL + tRCD + tRP);
  } else {
    tCL = Number(sCL ?? basePreset.tCL);
    tRCD = Number(sRCD ?? basePreset.tRCD);
    tRP = Number(sRP ?? basePreset.tRP);
    tRAS = toEven(tCL + tRCD + (isV2 ? tRP + 2 : tRP));
  }

  return { tCL, tRCD, tRP, tRAS, loadScore };
};

export const SubTimings = (
  state: any,
  primaries: any,
  frequencyKey: number,
) => {
  const {
    profile,
    ramSize,
    slotsCount,
    isDensityHigh,
    memoryType,
    boardType,
    ramType,
    isSpecialConfig,
  } = state;
  const { tRCD, tRP } = primaries;
  const isDdr4 = ramType === 'DDR4';
  const presets = MEMORY_PRESETS as any;
  const basePreset =
    presets[frequencyKey][profile === 'ultra' ? 'aggressive' : profile] ??
    presets[frequencyKey].safe;

  const multiplier = isDdr4 ? 1 : 1.35;
  const stabilityBonus =
    (Math.floor((ramSize - 8) / 8) * 10 +
      (slotsCount - 1) * 12 +
      (isDensityHigh ? 48 : 0) +
      (memoryType === 'ecc' ? (isDdr4 ? 24 : 40) : -12) +
      (boardType === 'matx' ? 16 : 0)) *
    multiplier;

  let tRFC: number, limitValue: number;

  if (profile === 'ultra') {
    const ultraBaseRfc = isDdr4 ? 264 : ULTRA_PRESET.tRFC;
    tRFC = toEven(ultraBaseRfc + stabilityBonus * (isDdr4 ? 0.8 : 0.6));
    limitValue = toEven(tRFC * 0.9);
  } else if (isSpecialConfig) {
    const profileKey =
      profile === 'custom' || profile === 'ultra' ? 'safe' : profile;
    const currentSpecial =
      SPECIAL_PRESETS[profileKey as keyof typeof SPECIAL_PRESETS] ??
      SPECIAL_PRESETS.safe;
    tRFC = currentSpecial.tRFC;
    const specialLimits: any = {
      safe: SPECIAL_PRESETS.balanced.tRFC,
      balanced: SPECIAL_PRESETS.aggressive.tRFC,
      aggressive: (SPECIAL_PRESETS as any).ultraLimit?.tRFC ?? 264,
    };
    limitValue = specialLimits[profileKey] ?? toEven(tRFC * 0.92);
  } else {
    const defaultBaseRfc =
      profile === 'custom' ? (tRCD + tRP) * (isDdr4 ? 10 : 8) : basePreset.tRFC;
    tRFC = toEven(defaultBaseRfc + stabilityBonus);
    limitValue = toEven(tRFC * 0.92);
  }

  return { tRFC, tRFC_Values: { current: tRFC, limitValue } };
};

export const formatOutputData = (
  state: any,
  frequency: number,
  primaries: any,
) => {
  const { ramSize, slotsCount, ramType, profile } = state;
  const { tCL, tRAS, tRP } = primaries;
  const isDdr4 = ramType === 'DDR4';

  return {
    voltage: isDdr4
      ? profile === 'ultra'
        ? '1.30V'
        : profile === 'aggressive'
          ? '1.25V'
          : '1.20V'
      : profile === 'ultra' || profile === 'aggressive'
        ? '1.55V'
        : '1.50V',
    tCP: ramSize >= 128 || slotsCount >= 4 ? '2N' : '1N',
    tRC: tRAS + tRP,
    tCWL: isDdr4 ? (tCL % 2 === 0 ? tCL : tCL - 1) : tCL - 1,
    bandwidth: `${Math.round((frequency * Math.min(slotsCount, 4) * 8) / 1024)} GB/s`,
    freq: `${frequency} MHz`,
  };
};
