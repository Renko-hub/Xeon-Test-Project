import React, { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import InfoBlock from '../InfoBlock/InfoBlock';
import { CPU_MODELS } from './data/cpuData';
import { 
  GEN_OPTIONS, RAM_SIZE_OPTIONS, SLOT_COUNT_OPTIONS, BOARD_TYPE_OPTIONS, 
  RamConfig, Gen, isOptionValid 
} from './data/timingsData';
import { useTimingEngine } from './data/timingEngine';

const RamTools = ({ showUltraTeaser }: { showUltraTeaser: boolean }) => {
  const { config, update, unlocked } = useTimingEngine();
  const prevUnlocked = useRef(unlocked);
  const currentGen = config.gen as Gen;

  useEffect(() => {
    if (!prevUnlocked.current && unlocked) update({ profile: 'ultra' });
    if (prevUnlocked.current && !unlocked && config.profile === 'ultra') update({ profile: 'balanced' });
    prevUnlocked.current = unlocked;
  }, [unlocked, config.profile, update]);

  const renderGroup = (label: string, field: keyof RamConfig, options: any[], prefix = "", format = (v: any) => v) => {
    const visible = options.filter(v => isOptionValid(field, v, config));
    return (
      <InfoBlock.Section>
        <InfoBlock.Label>{label}</InfoBlock.Label>
        <InfoBlock.Grid>
          {visible.map(v => (
            <Button 
              key={field + String(v)} 
              type={prefix + String(v)} 
              isActive={config[field] === format(v)} 
              onClick={() => update({ [field]: format(v) })} 
            />
          ))}
        </InfoBlock.Grid>
      </InfoBlock.Section>
    );
  };

  return (
    <div className="ram-tools">
      {renderGroup("ПОКОЛЕНИЕ:", "gen", GEN_OPTIONS)}

      <InfoBlock.Section>
        <InfoBlock.Label>МОДЕЛЬ ПРОЦЕССОРА:</InfoBlock.Label>
        <InfoBlock.Select 
          value={config.cpu?.name} 
          onChange={(e: any) => {
            const model = CPU_MODELS[currentGen].find((m: any) => m.name === e.target.value);
            if (model) update({ cpu: model });
          }}
        >
          {CPU_MODELS[currentGen].map((m: any) => (
            <option key={m.name} value={m.name}>{m.name}</option>
          ))}
        </InfoBlock.Select>
      </InfoBlock.Section>

      {renderGroup("ТИП ПАМЯТИ:", "isEcc", ['desktop', 'ecc'], "", v => v === 'ecc')}
      {renderGroup("ВСЕГО ПАМЯТИ:", "ramSize", RAM_SIZE_OPTIONS, "size_")}
      {renderGroup("ЗАНЯТО СЛОТОВ:", "slotsCount", SLOT_COUNT_OPTIONS, "slots_")}
      {renderGroup("МАТЕРИНСКАЯ ПЛАТА:", "boardType", BOARD_TYPE_OPTIONS)}
      {renderGroup("ПРЕСЕТЫ:", "profile", ['safe', 'balanced', 'aggressive', 'custom', ...(unlocked || showUltraTeaser ? ['ultra'] : [])])}
    </div>
  );
};

export default RamTools;
