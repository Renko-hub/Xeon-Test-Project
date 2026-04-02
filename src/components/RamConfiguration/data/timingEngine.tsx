import React, { createContext, useState, useMemo, useCallback, ReactNode } from 'react';
import { INITIAL_CONFIG, TIMINGS_BY_FREQ, RFC_MODIFIERS, Gen } from './timingsData';
import { CPU_MODELS } from './cpuData';

export const RamContext = createContext<any>(null);

const calculate = (conf: typeof INITIAL_CONFIG) => {
  const { cpu, gen, profile, boardType, ramSize, slotsCount, custom } = conf;
  if (!cpu || !TIMINGS_BY_FREQ[cpu.max]) return null;

  const isU = profile === 'ultra', isC = profile === 'custom';
  const baseKey = (isU || isC) ? 'aggressive' : profile;
  const src = (TIMINGS_BY_FREQ[cpu.max] as any)[baseKey] || TIMINGS_BY_FREQ[cpu.max].balanced;

  let tCL = isC ? +custom.CL : (isU ? src.tCL - 1 : src.tCL);
  let tRCD = isC ? +custom.RCD : (isU ? src.tRCD - 1 : src.tRCD);
  let tRP = isC ? +custom.RP : (isU ? src.tRP - 1 : src.tRP);
  
  if (gen === 'V4' && cpu.max >= 2400 && !isU && cpu.name.match(/2667|2690/)) {
    tRCD = Math.max(tRCD, 13);
  }

  const tRAS = tCL + tRCD + 4;
  const channels = Math.min(slotsCount, 4);

  const rfcSet = (RFC_MODIFIERS[gen as Gen] as any)[`gb${ramSize / slotsCount}`] || (RFC_MODIFIERS[gen as Gen] as any).gb16;
  const rfcVals = rfcSet[boardType] || rfcSet; 
  const ratio = cpu.max / ({ V2: 1866, V3: 2133, V4: 2400 }[gen as Gen] || 2400);
  
  const getRfc = (p: string) => Math.floor((rfcVals[p] || rfcVals.min || 328) * ratio);
  const next = ({ safe: 'balanced', balanced: 'aggressive', aggressive: 'min' } as any)[profile] || 'min';

  const bandwidth = (cpu.max * 8 * channels / 1000).toFixed(1) + ' GB/s';

  return {
    ...src,
    tCL, tRCD, tRP, tRAS,
    totalRam: ramSize,
    bandwidth,
    tRFC: isU ? `${Math.floor(getRfc('aggressive') * 0.9)} (ULTRA)` : 
          isC ? `${getRfc('aggressive')}` : `${getRfc(baseKey)} (IDEAL: ${getRfc(next)})`,
    voltage: isU ? '1.45v' : (profile === 'safe' ? '1.20v' : '1.35v'),
    tREFI: isU ? 65535 : (ramSize >= 64 ? 15600 : 32767),
    latency: `${((tCL * 2000) / cpu.max).toFixed(1)} ns`,
    channelMode: channels === 4 ? 'QUAD' : (channels === 2 ? 'DUAL' : 'SINGLE'),
    tCR: (channels === 4 || ramSize >= 64 || profile === 'safe') ? '2N' : '1N',
    tCWL: gen === 'V2' ? tCL : (tCL % 2 === 0 ? tCL : tCL - 1),
    tRTP: isU ? 5 : Math.max(6, Math.floor(tCL / 2)),
    tRC: tRAS + tRP, 
    tFAW: (src.tRRD || 4) * 4
  };
};

const TimingEngine = ({ children }: { children: ReactNode }) => {
  const [config, setConfig] = useState(INITIAL_CONFIG);
  const [unlocked, setUnlocked] = useState(false);

  const update = useCallback((patch: any) => {
    setConfig(prev => {
      const next = { ...prev, ...patch };
      if (patch.gen && patch.gen !== prev.gen) {
        next.cpu = (CPU_MODELS as any)[patch.gen][0];
      }
      return next;
    });
  }, []);

  const updateCustomTiming = useCallback((key: string, val: string) => {
    setConfig(prev => ({ 
      ...prev, 
      custom: { ...prev.custom, [key]: val.replace(/\D/g, '') } 
    }));
  }, []);

  const res = useMemo(() => calculate(config), [config]);

  return (
    <RamContext.Provider value={{ config, res, unlocked, setUnlocked, update, updateCustomTiming }}>
      {children}
    </RamContext.Provider>
  );
};

export default TimingEngine;
