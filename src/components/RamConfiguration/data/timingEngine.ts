import { create } from 'zustand';
import { 
  INITIAL_CONFIG, 
  TIMINGS_BY_FREQ, 
  RFC_MODIFIERS, 
  Gen, 
  RamConfig, 
  Profile, 
  TimingResult 
} from './timingsData';
import { CPU_MODELS } from './cpuData';

const TRIPLE_SIZES = [12, 24, 48];

/**
 * Валидатор конфигурации: управляет логикой слотов и объемов
 */
const validateConfig = (conf: RamConfig, lastFieldUpdated?: string): RamConfig => {
  const next = { ...conf };
  const field = lastFieldUpdated || "";

  // 1. Запрет 1 слота для 12, 24, 48 ГБ (таких плашек нет)
  if (TRIPLE_SIZES.includes(next.ramSize) && next.slotsCount === 1) {
    next.slotsCount = 3;
  }

  // 2. 12 ГБ не может быть в 4 слота (минимум 4+4+4)
  if (next.ramSize === 12 && next.slotsCount === 4) {
    next.slotsCount = 3;
  }

  // 3. Если вручную выбрали 3 слота, но объем "обычный" (16, 32 и т.д.)
  if (field.includes('slotsCount') && next.slotsCount === 3) {
    if (!TRIPLE_SIZES.includes(next.ramSize)) {
      next.ramSize = 24; 
    }
  }

  // 4. Сброс с 3 слотов, если объем стал обычным (например, переключили с 24 на 16)
  if (next.slotsCount === 3 && !TRIPLE_SIZES.includes(next.ramSize)) {
    next.slotsCount = next.ramSize >= 32 ? 4 : 2;
  }

  return next;
};

/**
 * Основной движок расчета таймингов
 */
const calculate = (conf: RamConfig): TimingResult => {
  const { cpu, gen, profile, boardType, ramSize, slotsCount, isEcc, custom } = conf;
  const freq = cpu?.max || 1866;
  const freqData = TIMINGS_BY_FREQ[freq] || TIMINGS_BY_FREQ[1866];
  
  const isU = profile === 'ultra', isC = profile === 'custom';
  const baseKey = (isU || isC) ? 'aggressive' : (profile as Exclude<Profile, 'ultra' | 'custom'>);
  const src = freqData[baseKey] || freqData.balanced;

  // 1. ПЕРВИЧНЫЕ ТАЙМИНГИ
  let tCL = isC ? Math.max(6, Number(custom.CL)) : (isU ? src.tCL - 1 : src.tCL);
  let tRCD = isC ? Math.max(6, Number(custom.RCD)) : (isU ? src.tRCD - 1 : src.tRCD);
  let tRP = isC ? Math.max(6, Number(custom.RP)) : (isU ? src.tRP - 1 : src.tRP);

  if (isEcc && !isC && profile !== 'safe') { 
    tRCD += 1; 
    tRP += 1; 
  }

  // 2. ВТОРИЧНЫЕ (mATX Guard)
  const isMatx = boardType === 'matx';
  const tRRD = isMatx ? Math.max(src.tRRD || 4, 6) : (src.tRRD || 4);
  const tFAW = isMatx ? Math.max(src.tFAW || 16, 24) : (src.tFAW || 16);
  let tWR = src.tWR || (gen === 'V2' ? 10 : 12);
  if (isMatx || profile === 'safe') tWR += 2;

  // 3. tRFC + Штрафы за канальность
  const perStickSize = Math.max(4, Math.floor(ramSize / slotsCount));
  const rfcGenData = RFC_MODIFIERS[gen] || RFC_MODIFIERS.V4;
  const sizeKey = perStickSize >= 64 ? 'gb64' : (perStickSize >= 32 ? 'gb32' : (perStickSize >= 16 ? 'gb16' : (perStickSize >= 8 ? 'gb8' : 'gb4')));
  
  const rfcSet = rfcGenData[sizeKey] || rfcGenData.gb16;
  const rfcVals = rfcSet[boardType] || rfcSet.atx || rfcSet; 
  
  const baseFreq = { V2: 1866, V3: 2133, V4: 2400 }[gen] || 2400;
  const ratio = freq / baseFreq;
  
  // Штрафы: Quad (4%) и Triple (2%)
  const quadPenalty = (slotsCount === 4 && !isMatx) ? 1.04 : 1.0;
  const triplePenalty = (slotsCount === 3) ? 1.02 : 1.0;

  const calcRFCValue = (k: string) => {
    const val = rfcVals[k] || rfcVals.balanced || 312;
    return Math.floor(val * ratio * (isEcc ? 1.08 : 1.0) * quadPenalty * triplePenalty);
  };

  const mainRfc = isU ? Math.floor(calcRFCValue('aggressive') * 0.92) : calcRFCValue(baseKey);

  // Формирование строки tRFC с подсказкой IDEAL
  let tRFC_Result = `${mainRfc}`;
  if (!isC) {
    if (isU) {
      tRFC_Result = `${mainRfc} (ULTRA)`;
    } else {
      const nextK = ({ safe: 'balanced', balanced: 'aggressive', aggressive: 'min' } as any)[profile] || 'min';
      const best = calcRFCValue(nextK);
      if (best < mainRfc) {
        tRFC_Result = `${mainRfc} (IDEAL: ${best})`;
      }
    }
  }

  // 4. КАНАЛЬНОСТЬ И ПРОПУСКНАЯ СПОСОБНОСТЬ
  const channels = isMatx ? Math.min(slotsCount, 2) : Math.min(slotsCount, 4);
  
  // Штраф за смешанные модули (например, 24 ГБ в 4 слотах = 8+8+4+4)
  const isMixed = TRIPLE_SIZES.includes(ramSize) && slotsCount === 4;
  const mixedPenalty = isMixed ? 0.96 : 1.0;

  return {
    tCL, tRCD, tRP,
    tRAS: tCL + tRCD + 4,
    tRC: tCL + tRCD + 4 + tRP,
    tWR, tRRD, tFAW,
    tRFC: tRFC_Result,
    tREFI: (ramSize >= 64 || profile === 'safe') ? 15600 : 32767,
    tCR: (profile === 'safe' || (boardType === 'atx' && (slotsCount >= 3 || ramSize >= 64 || isEcc))) ? '2N' : '1N',
    tCWL: gen === 'V2' ? tCL : (tCL % 2 === 0 ? tCL : tCL - 1),
    totalRam: ramSize,
    bandwidth: `${(freq * 8 * channels / 1000 * mixedPenalty).toFixed(1)} GB/s`,
    channelMode: channels === 4 ? 'QUAD' : (channels === 3 ? 'TRIPLE' : (channels === 2 ? 'DUAL' : 'SINGLE')),
    voltage: isU ? '1.45v' : (profile === 'safe' ? '1.20v' : '1.35v'),
    latency: `${((tCL * 2000) / freq).toFixed(1)} ns`,
    tRTP: isU ? 5 : Math.max(6, Math.floor(tCL / 2)),
    tWTR: isU ? 4 : (src.tWTR || 6),
  };
};

/**
 * Store управления состоянием
 */
interface TimingStore {
  config: RamConfig;
  unlocked: boolean;
  res: TimingResult;
  setUnlocked: (unlocked: boolean) => void;
  update: (patch: Partial<RamConfig>) => void;
  updateCustomTiming: (key: keyof RamConfig['custom'], val: string) => void;
}

export const useTimingEngine = create<TimingStore>((set) => ({
  config: INITIAL_CONFIG,
  unlocked: false,
  res: calculate(INITIAL_CONFIG),
  
  setUnlocked: (unlocked) => set({ unlocked }),
  
  update: (patch) => set((state) => {
    const firstKey = Object.keys(patch)[0];
    let nextConfig = { ...state.config, ...patch };
    
    // Автоматическая смена процессора при смене поколения
    if (patch.gen) {
      nextConfig.cpu = CPU_MODELS[patch.gen as Gen][0];
    }
    
    nextConfig = validateConfig(nextConfig, firstKey);
    
    return { 
      config: nextConfig, 
      res: calculate(nextConfig) 
    };
  }),

  updateCustomTiming: (key, val) => set((state) => {
    const nextConfig = { 
      ...state.config, 
      custom: { ...state.config.custom, [key]: val.replace(/\D/g, '') } 
    };
    return { 
      config: nextConfig, 
      res: calculate(nextConfig) 
    };
  }),
}));
