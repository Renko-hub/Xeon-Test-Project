export const RAM_SIZES = [4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64] as const;

export const RAM_CONFIGS = {
  DDR3: {
    desktop: [2, 4, 8],
    ecc: [4, 8, 16, 32],
  },
  DDR4: {
    desktop: [4, 8, 16, 32],
    ecc: [4, 8, 16, 32],
  },
} as const;

export const AVAILABLE_SLOTS = [1, 2, 3, 4] as const;

export const formatRamLabel = (val: string | number) => `${val} GB`;
