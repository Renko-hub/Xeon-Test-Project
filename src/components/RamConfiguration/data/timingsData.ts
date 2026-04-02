import { CPU_MODELS } from './cpuData';

export type Profile = 'safe' | 'balanced' | 'aggressive' | 'ultra' | 'custom';
export type Gen = 'V2' | 'V3' | 'V4';
export type BoardType = 'atx' | 'matx';

export interface ITimings {
  tCL: number; tRCD: number; tRP: number; tRAS: number; 
  tWR: number; tRRD: number; tRTP: number; tWTR: number; 
  tFAW: number; tCWL: number; tREFI: number;
}

export interface IRfcValues {
  safe: number; balanced: number; aggressive: number; min: number;
}

export interface IBoardRfc {
  atx: IRfcValues; matx: IRfcValues;
}

const DDR4_RFC: Record<string, IBoardRfc> = {
  gb64: { atx: { safe: 980, balanced: 880, aggressive: 820, min: 780 }, matx: { safe: 1050, balanced: 950, aggressive: 880, min: 840 } },
  gb32: { atx: { safe: 680, balanced: 620, aggressive: 580, min: 540 }, matx: { safe: 720, balanced: 660, aggressive: 620, min: 580 } },
  gb16: { atx: { safe: 416, balanced: 344, aggressive: 328, min: 312 }, matx: { safe: 440, balanced: 380, aggressive: 350, min: 330 } },
  gb8:  { atx: { safe: 312, balanced: 280, aggressive: 264, min: 240 }, matx: { safe: 344, balanced: 328, aggressive: 280, min: 264 } },
  gb4:  { atx: { safe: 240, balanced: 210, aggressive: 190, min: 170 }, matx: { safe: 264, balanced: 240, aggressive: 210, min: 190 } }
};

export const RFC_MODIFIERS: Record<Gen, Record<string, IRfcValues | IBoardRfc>> = {
  V2: {
    gb64: { safe: 900, balanced: 820, aggressive: 760, min: 700 },
    gb32: { safe: 650, balanced: 580, aggressive: 520, min: 480 },
    gb16: { safe: 344, balanced: 312, aggressive: 280, min: 240 },
    gb8:  { safe: 210, balanced: 180, aggressive: 172, min: 160 },
    gb4:  { safe: 160, balanced: 128, aggressive: 114, min: 96 }
  },
  V3: DDR4_RFC,
  V4: DDR4_RFC
};

export const INITIAL_CONFIG = {
  gen: 'V4' as Gen,
  profile: 'balanced' as Profile,
  boardType: 'atx' as BoardType,
  ramSize: 8,
  slotsCount: 2,
  cpu: CPU_MODELS['V4'][0], 
  custom: { CL: '15', RCD: '15', RP: '15' }
};

export const GEN_OPTIONS: Gen[] = ['V2', 'V3', 'V4'];
export const RAM_SIZE_OPTIONS = [4, 8, 16, 32, 64];
export const SLOT_COUNT_OPTIONS = [1, 2, 4];
export const BOARD_TYPE_OPTIONS: BoardType[] = ['atx', 'matx'];

export const TIMINGS_BY_FREQ: Record<number, Record<string, ITimings>> = {
  1333: {
    safe: { tCL: 9, tRCD: 9, tRP: 9, tRAS: 24, tWR: 10, tRRD: 4, tRTP: 6, tWTR: 6, tFAW: 20, tCWL: 9, tREFI: 15600 },
    balanced: { tCL: 7, tRCD: 7, tRP: 7, tRAS: 20, tWR: 10, tRRD: 4, tRTP: 4, tWTR: 4, tFAW: 16, tCWL: 7, tREFI: 32767 },
    aggressive: { tCL: 6, tRCD: 6, tRP: 6, tRAS: 16, tWR: 8, tRRD: 4, tRTP: 4, tWTR: 4, tFAW: 16, tCWL: 6, tREFI: 32767 }
  },
  1600: {
    safe: { tCL: 11, tRCD: 11, tRP: 11, tRAS: 28, tWR: 12, tRRD: 5, tRTP: 7, tWTR: 7, tFAW: 20, tCWL: 10, tREFI: 15600 },
    balanced: { tCL: 9, tRCD: 9, tRP: 9, tRAS: 24, tWR: 10, tRRD: 4, tRTP: 6, tWTR: 6, tFAW: 16, tCWL: 9, tREFI: 32767 },
    aggressive: { tCL: 8, tRCD: 8, tRP: 8, tRAS: 20, tWR: 10, tRRD: 4, tRTP: 5, tWTR: 4, tFAW: 16, tCWL: 8, tREFI: 32767 }
  },
  1866: {
    safe: { tCL: 13, tRCD: 13, tRP: 13, tRAS: 30, tWR: 12, tRRD: 5, tRTP: 8, tWTR: 8, tFAW: 24, tCWL: 11, tREFI: 15600 },
    balanced: { tCL: 11, tRCD: 11, tRP: 11, tRAS: 26, tWR: 12, tRRD: 4, tRTP: 7, tWTR: 7, tFAW: 20, tCWL: 10, tREFI: 32767 },
    aggressive: { tCL: 10, tRCD: 10, tRP: 10, tRAS: 22, tWR: 10, tRRD: 4, tRTP: 6, tWTR: 5, tFAW: 16, tCWL: 9, tREFI: 32767 }
  },
  2133: {
    safe: { tCL: 14, tRCD: 14, tRP: 14, tRAS: 32, tWR: 14, tRRD: 6, tRTP: 10, tWTR: 10, tFAW: 28, tCWL: 13, tREFI: 15600 },
    balanced: { tCL: 13, tRCD: 13, tRP: 13, tRAS: 30, tWR: 14, tRRD: 5, tRTP: 8, tWTR: 8, tFAW: 24, tCWL: 13, tREFI: 32767 },
    aggressive: { tCL: 12, tRCD: 12, tRP: 12, tRAS: 28, tWR: 12, tRRD: 4, tRTP: 7, tWTR: 7, tFAW: 20, tCWL: 12, tREFI: 32767 }
  },
  2400: {
    safe: { tCL: 15, tRCD: 15, tRP: 15, tRAS: 34, tWR: 16, tRRD: 6, tRTP: 10, tWTR: 10, tFAW: 28, tCWL: 14, tREFI: 15600 },
    balanced: { tCL: 13, tRCD: 13, tRP: 13, tRAS: 30, tWR: 12, tRRD: 5, tRTP: 8, tWTR: 8, tFAW: 24, tCWL: 13, tREFI: 32767 },
    aggressive: { tCL: 12, tRCD: 12, tRP: 12, tRAS: 28, tWR: 10, tRRD: 4, tRTP: 6, tWTR: 6, tFAW: 16, tCWL: 12, tREFI: 32767 }
  }
};
