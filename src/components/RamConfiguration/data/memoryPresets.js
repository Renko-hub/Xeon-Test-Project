export const ULTRA_PRESET = {
  tCL: 11,
  tRCD: 11,
  tRP: 11,
  tRAS: 28,
  tRFC: 264,
};

export const SPECIAL_PRESETS = {
  safe: { tRFC: 344 },
  balanced: { tRFC: 328 },
  aggressive: { tRFC: 280 },
  ultraLimit: { tRFC: 264 },
};

export const SPECIAL_LIMITS = {
  safe: SPECIAL_PRESETS.balanced.tRFC,
  balanced: SPECIAL_PRESETS.aggressive.tRFC,
  aggressive: SPECIAL_PRESETS.ultraLimit.tRFC,
};

export const TREFI_TABLE = {
  safe: { V2: 11700, V3: 15600, V4: 15600 },
  balanced: { V2: 15600, V3: 32767, V4: 32767 },
  aggressive: { V2: 32767, V3: 45000, V4: 45000 },
  ultra: { V2: 32767, V3: 65535, V4: 65535 },
};

export const PROFILE_SUBTIMINGS = {
  ultra: {
    ddr4: { tFAW: 16, tWR: 10, tRRD: 4, tRTP: 5, tWTR: 6 },
    ddr3: { tFAW: 20, tWR: 10, tRRD: 4, tRTP: 5, tWTR: 5 },
  },
  aggressive: {
    ddr4: { tFAW: 20, tWR: 12, tRRD: 4, tRTP: 6, tWTR: 7 },
    ddr3: { tFAW: 24, tWR: 12, tRRD: 5, tRTP: 6, tWTR: 6 },
  },
  balanced: {
    ddr4: { tFAW: 24, tWR: 14, tRRD: 5, tRTP: 7, tWTR: 8 },
    ddr3: { tFAW: 26, tWR: 14, tRRD: 5, tRTP: 7, tWTR: 7 },
  },
};

export const PENALTIES = {
  highCapacity: {
    ddr4: { tFAW: 4, tWR: 2, tRRD: 1, tRTP: 0, tWTR: 1 },
    ddr3: { tFAW: 6, tWR: 2, tRRD: 1, tRTP: 0, tWTR: 1 },
  },
  ecc: {
    ddr4: { tFAW: 2, tWR: 2, tRRD: 0, tRTP: 1, tWTR: 0 },
    ddr3: { tFAW: 2, tWR: 0, tRRD: 1, tRTP: 1, tWTR: 0 },
  },
};

export const MEMORY_PRESETS = {
  1333: {
    safe: {
      tCL: 9,
      tRCD: 9,
      tRP: 9,
      tRFC: 174,
      tFAW: 24,
      tWR: 14,
      tRRD: 5,
      tRTP: 6,
      tWTR: 7,
    },
    balanced: { tCL: 8, tRCD: 8, tRP: 8, tRFC: 160 },
    aggressive: { tCL: 7, tRCD: 7, tRP: 7, tRFC: 144 },
  },
  1600: {
    safe: {
      tCL: 11,
      tRCD: 11,
      tRP: 11,
      tRFC: 208,
      tFAW: 26,
      tWR: 14,
      tRRD: 5,
      tRTP: 6,
      tWTR: 7,
    },
    balanced: { tCL: 10, tRCD: 10, tRP: 10, tRFC: 184 },
    aggressive: { tCL: 9, tRCD: 9, tRP: 9, tRFC: 160 },
  },
  1866: {
    safe: {
      tCL: 12,
      tRCD: 12,
      tRP: 12,
      tRFC: 240,
      tFAW: 32,
      tWR: 16,
      tRRD: 5,
      tRTP: 6,
      tWTR: 7,
    },
    balanced: { tCL: 11, tRCD: 11, tRP: 11, tRFC: 208 },
    aggressive: { tCL: 10, tRCD: 10, tRP: 10, tRFC: 184 },
  },
  2133: {
    safe: {
      tCL: 15,
      tRCD: 15,
      tRP: 15,
      tRFC: 312,
      tFAW: 24,
      tWR: 16,
      tRRD: 4,
      tRTP: 6,
      tWTR: 8,
    },
    balanced: { tCL: 14, tRCD: 14, tRP: 14, tRFC: 278 },
    aggressive: { tCL: 13, tRCD: 13, tRP: 13, tRFC: 260 },
  },
  2400: {
    safe: {
      tCL: 17,
      tRCD: 17,
      tRP: 17,
      tRFC: 350,
      tFAW: 28,
      tWR: 18,
      tRRD: 4,
      tRTP: 6,
      tWTR: 8,
    },
    balanced: { tCL: 16, tRCD: 16, tRP: 16, tRFC: 312 },
    aggressive: { tCL: 15, tRCD: 15, tRP: 15, tRFC: 280 },
  },
};

export const PROFILE_PRESETS = [
  "safe",
  "balanced",
  "aggressive",
  "custom",
  "ultra",
];
