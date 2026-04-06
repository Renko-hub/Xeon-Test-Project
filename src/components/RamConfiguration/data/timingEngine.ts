import { create } from 'zustand';
import { 
  INITIAL_CONFIG, TIMINGS_BY_FREQ, RFC_MODIFIERS, TRIPLE_SIZES, ULTRA_MODIFIERS, isOptionValid,
  Gen, RamConfig, TimingResult 
} from './timingsData';
import { CPU_MODELS } from './cpuData';

/** 
 * ВАЛИДАЦИЯ: Контроль плотности и слотов.
 */
const validate = (conf: RamConfig): RamConfig => {
  const next = { ...conf };
  if (!isOptionValid('slotsCount', next.slotsCount, next)) {
    const minStick = next.gen === 'V2' ? 2 : 4;
    next.slotsCount = Math.max(1, Math.floor(next.ramSize / minStick));
  }
  return next;
};

/**
 * ЯДРО РАСЧЕТОВ
 */
const calculate = (conf: RamConfig): TimingResult => {
  const { cpu, gen, profile, boardType, ramSize, slotsCount, isEcc, custom } = conf;
  
  const freq = Math.min(cpu?.max || 1866, 2400);
  const freqData = TIMINGS_BY_FREQ[freq] || TIMINGS_BY_FREQ;
  
  const isU = profile === 'ultra', isC = profile === 'custom', isMatx = boardType === 'matx';
  const baseKey = (isU || isC) ? 'aggressive' : profile;
  const src = freqData[baseKey] || freqData.balanced;

  // Тайминги
  const tCL = isC ? Number(custom.CL) : (isU && ramSize < 48 ? src.tCL - 1 : src.tCL);
  let tRCD = isC ? Number(custom.RCD) : (isU && ramSize <= 16 ? src.tRCD - 1 : src.tRCD);
  let tRP = isC ? Number(custom.RP) : (isU && ramSize <= 16 ? src.tRP - 1 : src.tRP);
  if (isEcc && !isC && profile !== 'safe') { tRCD += 1; tRP += 1; }

  // tRFC ЛОГИКА (Твоя формула: mATX + Нагрузка слотов)
  const perStick = Math.max(2, Math.floor(ramSize / slotsCount));
  const rfcGenData = RFC_MODIFIERS[gen as Gen];
  const sizeKey = perStick >= 64 ? 'gb64' : (perStick >= 32 ? 'gb32' : (perStick >= 16 ? 'gb16' : (perStick >= 8 ? 'gb8' : 'gb4')));
  const rfcSet = rfcGenData[sizeKey] || rfcGenData.gb16;
  
  // Берем базовые значения из таблицы (для mATX они выше в timingsData)
  const rfcVals = (isMatx && rfcSet.matx) ? rfcSet.matx : (rfcSet.atx || rfcSet); 

  const ratio = freq / ({ V2: 1866, V3: 2133, V4: 2400 }[gen as Gen] || 2400);
  // Штраф matxPenalty применяется только если в таблице нет готового значения matx
  const matxPenalty = (isMatx && !rfcSet.matx) ? 1.15 : 1.0; 
  // loadMod 1.04 дает тот самый прирост при 4 планках
  const loadMod = (slotsCount === 4 && !isMatx) ? 1.04 : 1.0;

  const calcRFCValue = (k: string) => {
    const base = rfcVals[k] || 312;
    return Math.floor(base * ratio * (isEcc ? 1.08 : 1.0) * loadMod * matxPenalty);
  };

  const ultraMod = ramSize >= 48 ? ULTRA_MODIFIERS.RFC_BIG : (ramSize >= 24 ? ULTRA_MODIFIERS.RFC_MED : ULTRA_MODIFIERS.RFC_SMALL);
  const mainRfc = isU ? Math.floor(calcRFCValue('aggressive') * ultraMod) : calcRFCValue(baseKey);

  let tRFC_Str = `${mainRfc}`;
  if (!isC) {
    if (isU) tRFC_Str += " (ULTRA)";
    else {
      const nextLevelMap: any = { safe: 'balanced', balanced: 'aggressive', aggressive: 'min' };
      const nextKey = nextLevelMap[profile] || 'min';
      const best = calcRFCValue(nextKey);
      if (best < mainRfc) tRFC_Str += ` (IDEAL: ${best})`;
    }
  }

  const channels = isMatx ? Math.min(slotsCount, 2) : Math.min(slotsCount, 4);
  const bandwidth = `${(freq * 8 * channels / 1000 * (slotsCount === 3 ? 0.88 : 1.0)).toFixed(1)} GB/s`;
  const channelMode = channels === 4 ? 'QUAD' : (slotsCount === 3 ? 'TRIPLE' : (channels === 2 ? 'DUAL' : 'SINGLE'));

  return {
    tCL, tRCD, tRP, tRAS: tCL + tRCD + 4, tRC: tCL + tRCD + 4 + tRP,
    tWR: src.tWR + (isMatx ? 2 : 0),
    tRRD: isMatx ? 6 : (src.tRRD || 4), tFAW: isMatx ? 24 : (src.tFAW || 16),
    tRFC: tRFC_Str,
    tREFI: (ramSize >= 64 || profile === 'safe' || isMatx) ? 15600 : (isU && ramSize <= 32 ? 65535 : 32767),
    tCR: (profile === 'safe' || (boardType === 'atx' && (slotsCount >= 3 || ramSize >= 64 || isEcc))) ? '2N' : '1N',
    tCWL: gen === 'V2' ? tCL : (tCL % 2 === 0 ? tCL : tCL - 1),
    totalRam: ramSize, bandwidth, channelMode,
    voltage: isU ? '1.45v' : '1.35v',
    latency: `${((tCL * 2000) / freq).toFixed(1)} ns`,
    tRTP: isU ? 5 : Math.max(6, Math.floor(tCL / 2)),
    tWTR: isU ? 4 : (src.tWTR || 6),
    biosTitle: `BIOS: ${freq}MHZ — ${ramSize}GB ${channelMode} [${bandwidth}]`
  };
};

/**
 * STORE
 */
export const useTimingEngine = create<any>((set) => ({
  config: INITIAL_CONFIG, 
  unlocked: false, 
  res: calculate(INITIAL_CONFIG),

  update: (patch: any) => set((s: any) => {
    let next = { ...s.config, ...patch };
    if (patch.gen) {
        // Берем первый объект проца
        next.cpu = CPU_MODELS[patch.gen as Gen][0];
    }
    next = validate(next);
    return { config: next, res: calculate(next) };
  }),

  updateCustomTiming: (k: string, v: string) => set((s: any) => {
    let val = v.replace(/\D/g, '');
    // Защита от 0 и пустых строк
    if (!val || val === '0') val = '6'; 
    const next = { ...s.config, custom: { ...s.config.custom, [k]: val } };
    return { config: next, res: calculate(next) };
  }),

  setUnlocked: (u: boolean) => set((s: any) => {
    const next = (!u && s.config.profile === 'ultra') ? { ...s.config, profile: 'balanced' } : s.config;
    return { unlocked: u, config: next, res: calculate(next) };
  })
}));
