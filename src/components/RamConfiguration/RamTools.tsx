import React, { useEffect, useRef, useContext } from 'react';
import Button from '../Button/Button';
import InfoBlock from '../InfoBlock/InfoBlock';
import { CPU_MODELS } from './data/cpuData';
import { GEN_OPTIONS, RAM_SIZE_OPTIONS, SLOT_COUNT_OPTIONS, BOARD_TYPE_OPTIONS, Gen } from './data/timingsData';
import { RamContext } from './data/timingEngine'; 

const RamTools = () => {
  const context = useContext(RamContext);

  if (!context) return null; 

  const { config, update, unlocked: isUnlocked } = context;
  const prevUnlocked = useRef(isUnlocked);

  useEffect(() => {
    if (!prevUnlocked.current && isUnlocked) {
      update({ profile: 'ultra' });
    }
    if (!isUnlocked && config.profile === 'ultra') {
      update({ profile: 'balanced' });
    }
    prevUnlocked.current = isUnlocked;
  }, [isUnlocked, config.profile, update]);

  const profiles = ['safe', 'balanced', 'aggressive', 'custom', ...(isUnlocked ? ['ultra'] : [])];

  const Group = ({ label, options, field, prefix = '' }: any) => (
    <InfoBlock.Section>
      <InfoBlock.Label>{label}</InfoBlock.Label>
      <InfoBlock.Grid>
        {options.map((v: any) => (
          <Button 
            key={v} 
            type={prefix + v} 
            isActive={config[field as keyof typeof config] === v} 
            onClick={() => update({ [field]: v })} 
          />
        ))}
      </InfoBlock.Grid>
    </InfoBlock.Section>
  );

  return (
    <div className="ram-tools">
      <Group label="ПОКОЛЕНИЕ ПРОЦЕССОРА:" options={GEN_OPTIONS} field="gen" />

      <InfoBlock.Section>
        <InfoBlock.Label>МОДЕЛЬ:</InfoBlock.Label>
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

      <Group label="ОБЩИЙ ОБЪЕМ (ГБ):" options={RAM_SIZE_OPTIONS} field="ramSize" prefix="size_" />
      <Group label="ЗАНЯТО СЛОТОВ:" options={SLOT_COUNT_OPTIONS} field="slotsCount" prefix="slots_" />
      <Group label="ФОРМ-ФАКТОР МАТЕРИНКИ:" options={BOARD_TYPE_OPTIONS} field="boardType" />
      <Group label="ПРЕСЕТЫ:" options={profiles} field="profile" />
    </div>
  );
};

export default RamTools;
