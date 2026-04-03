import React, { useEffect, useRef } from 'react';
import Button from '../Button/Button';
import InfoBlock from '../InfoBlock/InfoBlock';
import { CPU_MODELS } from './data/cpuData';
import { GEN_OPTIONS, RAM_SIZE_OPTIONS, SLOT_COUNT_OPTIONS, BOARD_TYPE_OPTIONS, Gen } from './data/timingsData';
import { useTimingEngine } from './data/timingEngine'; 

const RamTools = () => {
  const { config, update, unlocked } = useTimingEngine();
  const prevUnlocked = useRef(unlocked);

  useEffect(() => {
    if (!prevUnlocked.current && unlocked) update({ profile: 'ultra' });
    if (prevUnlocked.current && !unlocked && config.profile === 'ultra') update({ profile: 'balanced' });
    prevUnlocked.current = unlocked;
  }, [unlocked, config.profile, update]);

  const profiles = ['safe', 'balanced', 'aggressive', 'custom', ...(unlocked ? ['ultra'] : [])];

  const renderGroup = (label: string, options: any[], field: string, prefix = "", formatValue?: (v: any) => any) => {
    // ФИКС: Скрываем 3 слота для неподходящих объемов
    let visibleOptions = options;
    if (field === 'slotsCount') {
      const tripleValidSizes = [12, 24, 48];
      if (!tripleValidSizes.includes(config.ramSize)) {
        visibleOptions = options.filter(opt => opt !== 3);
      }
    }

    return (
      <InfoBlock.Section>
        <InfoBlock.Label>{label}</InfoBlock.Label>
        <InfoBlock.Grid>
          {visibleOptions.map((v) => {
            const val = formatValue ? formatValue(v) : v;
            return (
              <Button 
                key={field + v.toString()} 
                type={prefix + v} 
                isActive={config[field] === val} 
                onClick={() => update({ [field]: val })} 
              />
            );
          })}
        </InfoBlock.Grid>
      </InfoBlock.Section>
    );
  };

  return (
    <div className="ram-tools">
      {renderGroup("ПОКОЛЕНИЕ:", GEN_OPTIONS, "gen")}

      <InfoBlock.Section>
        <InfoBlock.Label>МОДЕЛЬ ПРОЦЕССОРА:</InfoBlock.Label>
        <InfoBlock.Select 
          value={config.cpu?.name} 
          onChange={(e: any) => update({ 
            cpu: CPU_MODELS[config.gen as Gen].find(m => m.name === e.target.value) 
          })}
        >
          {CPU_MODELS[config.gen as Gen].map(m => (
            <option key={m.name} value={m.name}>{m.name}</option>
          ))}
        </InfoBlock.Select>
      </InfoBlock.Section>

      {renderGroup("ТИП ПАМЯТИ:", ['desktop', 'ecc'], "isEcc", "", (v) => v === 'ecc')}
      {renderGroup("ВСЕГО ПАМЯТИ УСТАНОВЛЕНО:", RAM_SIZE_OPTIONS, "ramSize", "size_")}
      {renderGroup("ЗАНЯТО СЛОТОВ:", SLOT_COUNT_OPTIONS, "slotsCount", "slots_")}
      {renderGroup("МАТЕРИНСКАЯ ПЛАТА:", BOARD_TYPE_OPTIONS, "boardType")}
      {renderGroup("ПРЕСЕТЫ:", profiles, "profile")}
    </div>
  );
};

export default RamTools;
