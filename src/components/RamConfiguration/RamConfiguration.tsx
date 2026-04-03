import React from 'react';
import InfoBlock from '../InfoBlock/InfoBlock';
import RamTools from './RamTools'; 
import RamInfo from './RamInfo';
import RamBios from './RamBios'; 
import UltraWarningModal from './UltraWarningModal/UltraWarningModal';

const RamConfiguration = () => (
  <main className="manager-layout">
    <InfoBlock
      title={<UltraWarningModal />}
      toolsLabel="НАСТРОЙКА ПАМЯТИ" 
      infoNode={<RamInfo />}
      toolsNode={<RamTools />}
    />
    <RamBios />
  </main>
);

export default RamConfiguration;
