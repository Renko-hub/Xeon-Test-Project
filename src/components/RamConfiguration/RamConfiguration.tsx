import React, { useState } from 'react';
import InfoBlock from '../InfoBlock/InfoBlock';
import RamTools from './RamTools'; 
import RamInfo from './RamInfo';
import RamBios from './RamBios'; 
import UltraWarningModal from './UltraWarningModal/UltraWarningModal';

const RamConfiguration = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main className="manager-layout">
      <InfoBlock
        title={<UltraWarningModal onModalOpen={setIsModalOpen} />}
        toolsLabel="НАСТРОЙКА ПАМЯТИ" 
        infoNode={<RamInfo />}
        toolsNode={<RamTools showUltraTeaser={isModalOpen} />}
      />
      <RamBios />
    </main>
  );
};

export default RamConfiguration;
