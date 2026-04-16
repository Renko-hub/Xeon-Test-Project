import React, { useState, useEffect } from 'react';
import { CPU_MODELS } from './data/configData';
import { calculateRamFullLogic } from '../TimingEngine/TimingEngine'; 
import Toolbox from '../Toolbox/Toolbox'; 
import BiosWindow from '../BiosWindow/BiosWindow';
import RamTools from './RamTools'; 
import RamInfo from './RamInfo';
import RamBios from './RamBios'; 
import UltraAlert from '../UltraAlert/UltraAlert';

const RamConfiguration = () => {
  const [unlocked, setUnlocked] = useState(false);
  const [temp, setTemp] = useState(false);
  
  // Начальное состояние
  const [value, setValue] = useState({ 
    generation: 'V3', 
    cpu: CPU_MODELS['V3'][0], 
    isEcc: false, 
    ramSize: 16, 
    has16gbSticks: false, 
    slotsCount: 2, 
    profile: 'safe', 
    boardType: 'atx',
    tCL: '', tRP: '', tRCD: '' 
  });

  // Вызов оркестратора TimingEngine (внутри него Hardware, SlotConfiguration и т.д.)
  const engine = calculateRamFullLogic(value, unlocked || temp);

  // Синхронизация: если логика движка изменила слоты или применила force16, обновляем форму
  useEffect(() => {
    const s = engine.sanitized;
    const hasChanged = 
      s.slotsCount !== value.slotsCount || 
      s.cpu.name !== value.cpu.name || 
      s.has16gbSticks !== value.has16gbSticks;

    if (hasChanged) {
      setValue(prev => ({ ...prev, ...s }));
    }
  }, [engine.sanitized]);

  // Обработка ввода в BIOS (только цифры, макс 2 знака)
  const handleBiosChange = (id: string, newVal: string) => {
    const numericVal = newVal.replace(/\D/g, '').slice(0, 2);
    setValue(prev => ({ ...prev, [id]: numericVal }));
  };

  // Подготовка данных для окна BIOS
  const biosRaw = RamBios(engine.timings);
  const biosData = {
    ...biosRaw,
    content: biosRaw.content.map(item => ({
      ...item,
      // Делаем поля редактируемыми только в режиме Custom
      id: value.profile === 'custom' ? item.id : undefined
    }))
  };

  return (
    <>
      <Toolbox 
        title={<UltraAlert isUnlocked={unlocked} onUnlock={setUnlocked} onSetTempUltra={setTemp} />}
        renderInfo={(s) => (
          <RamInfo 
            styles={s} 
            value={engine.sanitized} 
            timings={engine.timings} 
          />
        )}
        renderTools={(s) => (
          <RamTools 
            styles={s} 
            value={value} 
            setValue={setValue} 
            isUnlocked={unlocked || temp} 
            availableSlots={engine.sanitized.availableSlots}
            currentCpuList={engine.sanitized.currentCpuList}
            show16gbToggle={engine.sanitized.show16gbToggle}
          />
        )}
        toolsLabel="НАСТРОЙКА ПАМЯТИ"
      />
      
      <BiosWindow 
        {...biosData} 
        type="ram" 
        value={engine.sanitized} 
        onBiosChange={handleBiosChange} 
      />
    </>
  );
};

export default RamConfiguration;
