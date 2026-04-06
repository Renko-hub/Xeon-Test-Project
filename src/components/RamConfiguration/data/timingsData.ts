import { CPU_MODELS } from './cpuData';

export type Gen = 'V2' | 'V3' | 'V4';
export type Profile = 'safe' | 'balanced' | 'aggressive' | 'ultra' | 'custom';
export type BoardType = 'atx' | 'matx';

export interface RamConfig {
  gen: Gen;
  profile: Profile;
  boardType: BoardType;
  ramSize: number;
  slotsCount: number;
  isEcc: boolean;
  cpu: any;
  custom: { CL: string; RCD: string; RP: string };
}

export interface TimingResult {
  tCL: number; tRCD: number; tRP: number; tRAS: number; tRC: number;
  tWR: number; tRRD: number; tFAW: number; tRFC: string;
  tREFI: number; tCR: string; tCWL: number; tRTP: number; tWTR: number;
  totalRam: number; bandwidth: string; channelMode: string;
  voltage: string; latency: string; biosTitle: string;
}

export const GEN_OPTIONS: Gen[] = ['V2', 'V3', 'V4'];
export const RAM_SIZE_OPTIONS = [4, 8, 12, 16, 24, 32, 48, 64]; 
export const SLOT_COUNT_OPTIONS = [1, 2, 3, 4]; 
export const BOARD_TYPE_OPTIONS: BoardType[] = ['atx', 'matx'];
export const TRIPLE_SIZES = [12, 24, 48];
export const ULTRA_MODIFIERS = { RFC_SMALL: 0.90, RFC_MED: 0.93, RFC_BIG: 0.97 };

export const isOptionValid = (field: keyof RamConfig, val: any, conf: RamConfig) => {
  const min = conf.gen === 'V2' ? 2 : 4;
  if (field === 'ramSize') return val >= min;
  if (field === 'slotsCount') {
    if (TRIPLE_SIZES.includes(conf.ramSize) && val === 1) return false;
    const isV2Special = conf.gen === 'V2' && conf.ramSize === 12 && val === 4;
    return (conf.ramSize / val) >= min || isV2Special;
  }
  return true;
};

const DDR4_RFC = {
  gb64: { atx: { safe: 980, balanced: 880, aggressive: 820, min: 780 }, matx: { safe: 1050, balanced: 950, aggressive: 880, min: 840 } },
  gb32: { atx: { safe: 680, balanced: 620, aggressive: 580, min: 540 }, matx: { safe: 720, balanced: 660, aggressive: 620, min: 580 } },
  gb16: { atx: { safe: 416, balanced: 344, aggressive: 328, min: 312 }, matx: { safe: 440, balanced: 380, aggressive: 350, min: 330 } },
  gb8:  { atx: { safe: 312, balanced: 280, aggressive: 264, min: 240 }, matx: { safe: 344, balanced: 328, aggressive: 280, min: 264 } },
  gb4:  { atx: { safe: 240, balanced: 210, aggressive: 190, min: 170 }, matx: { safe: 264, balanced: 240, aggressive: 210, min: 190 } }
};

export const RFC_MODIFIERS: Record<Gen, any> = {
  V2: {
    gb16: { safe: 344, balanced: 312, aggressive: 280, min: 240 },
    gb8:  { safe: 210, balanced: 180, aggressive: 172, min: 160 },
    gb4:  { safe: 160, balanced: 128, aggressive: 114, min: 96 }
  },
  V3: DDR4_RFC,
  V4: DDR4_RFC
};

export const INITIAL_CONFIG: RamConfig = {
  gen: 'V2', profile: 'safe', boardType: 'atx', ramSize: 8, slotsCount: 2, isEcc: false,
  cpu: CPU_MODELS['V2'][0], custom: { CL: '9', RCD: '9', RP: '9' }
};

export const TIMINGS_BY_FREQ: any = {
  1333: { safe: { tCL: 9, tRCD: 9, tRP: 9, tRAS: 24, tWR: 10, tRRD: 4, tRTP: 6, tWTR: 6, tFAW: 20, tCWL: 9 }, balanced: { tCL: 7, tRCD: 7, tRP: 7, tRAS: 20, tWR: 10, tRRD: 4, tRTP: 4, tWTR: 4, tFAW: 16, tCWL: 7 }, aggressive: { tCL: 6, tRCD: 6, tRP: 6, tRAS: 16, tWR: 8, tRRD: 4, tRTP: 4, tWTR: 4, tFAW: 16, tCWL: 6 } },
  1600: { safe: { tCL: 11, tRCD: 11, tRP: 11, tRAS: 28, tWR: 12, tRRD: 5, tRTP: 7, tWTR: 7, tFAW: 20, tCWL: 10 }, balanced: { tCL: 9, tRCD: 9, tRP: 9, tRAS: 24, tWR: 10, tRRD: 4, tRTP: 6, tWTR: 6, tFAW: 16, tCWL: 9 }, aggressive: { tCL: 8, tRCD: 8, tRP: 8, tRAS: 20, tWR: 10, tRRD: 4, tRTP: 5, tWTR: 4, tFAW: 16, tCWL: 8 } },
  1866: { safe: { tCL: 13, tRCD: 13, tRP: 13, tRAS: 30, tWR: 12, tRRD: 5, tRTP: 8, tWTR: 8, tFAW: 24, tCWL: 11 }, balanced: { tCL: 11, tRCD: 11, tRP: 11, tRAS: 26, tWR: 12, tRRD: 4, tRTP: 7, tWTR: 7, tFAW: 20, tCWL: 10 }, aggressive: { tCL: 10, tRCD: 10, tRP: 10, tRAS: 22, tWR: 10, tRRD: 4, tRTP: 6, tWTR: 5, tFAW: 16, tCWL: 9 } },
  2133: { safe: { tCL: 14, tRCD: 14, tRP: 14, tRAS: 32, tWR: 14, tRRD: 6, tRTP: 10, tWTR: 10, tFAW: 28, tCWL: 13 }, balanced: { tCL: 13, tRCD: 13, tRP: 13, tRAS: 30, tWR: 14, tRRD: 5, tRTP: 8, tWTR: 8, tFAW: 24, tCWL: 13 }, aggressive: { tCL: 12, tRCD: 12, tRP: 12, tRAS: 28, tWR: 12, tRRD: 4, tRTP: 7, tWTR: 7, tFAW: 20, tCWL: 12 } },
  2400: { safe: { tCL: 15, tRCD: 15, tRP: 15, tRAS: 34, tWR: 16, tRRD: 6, tRTP: 10, tWTR: 10, tFAW: 28, tCWL: 14 }, balanced: { tCL: 13, tRCD: 13, tRP: 13, tRAS: 30, tWR: 12, tRRD: 5, tRTP: 8, tWTR: 8, tFAW: 24, tCWL: 13 }, aggressive: { tCL: 12, tRCD: 12, tRP: 12, tRAS: 28, tWR: 10, tRRD: 4, tRTP: 6, tWTR: 6, tFAW: 16, tCWL: 12 } }
};
