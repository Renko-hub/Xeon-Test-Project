export const ULTRA_PRESET = {
  tCL: 11,
  tRCD: 11,
  tRP: 11,
  tRAS: 28,
  tRFC: 264,
} as const;

export const SPECIAL_PRESETS = {
  safe: { tRFC: 344 },
  balanced: { tRFC: 328 },
  aggressive: { tRFC: 280 },
  ultraLimit: { tRFC: 264 },
} as const;

export const TREFI_TABLE = {
  safe: { V2: 11700, V3: 15600, V4: 15600 },
  balanced: { V2: 15600, V3: 32767, V4: 32767 },
  aggressive: { V2: 32767, V3: 45000, V4: 45000 },
  ultra: { V2: 32767, V3: 65535, V4: 65535 },
} as const;

export const MEMORY_PRESETS = {
  1333: {
    safe: { tCL: 9, tRCD: 9, tRP: 9, tRFC: 174 },
    balanced: { tCL: 8, tRCD: 8, tRP: 8, tRFC: 160 },
    aggressive: { tCL: 7, tRCD: 7, tRP: 7, tRFC: 144 },
  },
  1600: {
    safe: { tCL: 11, tRCD: 11, tRP: 11, tRFC: 208 },
    balanced: { tCL: 10, tRCD: 10, tRP: 10, tRFC: 184 },
    aggressive: { tCL: 9, tRCD: 9, tRP: 9, tRFC: 160 },
  },
  1866: {
    safe: { tCL: 12, tRCD: 12, tRP: 12, tRFC: 240 },
    balanced: { tCL: 11, tRCD: 11, tRP: 11, tRFC: 208 },
    aggressive: { tCL: 10, tRCD: 10, tRP: 10, tRFC: 184 },
  },
  2133: {
    safe: { tCL: 15, tRCD: 15, tRP: 15, tRFC: 312 },
    balanced: { tCL: 14, tRCD: 14, tRP: 14, tRFC: 278 },
    aggressive: { tCL: 13, tRCD: 13, tRP: 13, tRFC: 260 },
  },
  2400: {
    safe: { tCL: 17, tRCD: 17, tRP: 17, tRFC: 350 },
    balanced: { tCL: 16, tRCD: 16, tRP: 16, tRFC: 312 },
    aggressive: { tCL: 15, tRCD: 15, tRP: 15, tRFC: 280 },
  },
} as const;

export const PROFILE_PRESETS = [
  "safe",
  "balanced",
  "aggressive",
  "custom",
] as const;
