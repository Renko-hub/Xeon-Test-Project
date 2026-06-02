export const RAM_SIZES = [4, 6, 8, 12, 16, 20, 24, 32, 40, 48, 64];

export const RAM_CONFIGS = {
  DDR3: {
    desktop: [2, 4, 8],
    ecc: [4, 8, 16, 32],
  },
  DDR4: {
    desktop: [4, 8, 16, 32],
    ecc: [4, 8, 16, 32],
  },
};

export const formatRamLabel = (val) => `${val} GB`;
