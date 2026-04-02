import React, { useState } from 'react';
// Импортируем переименованный компонент
import InfoBlock from '../InfoBlock/InfoBlock'; 
import IIOTools from './IIOTools';
import IIOBios from './IIOBios';
import IIOInfo from './IIOInfo';

const IIOConfiguration = () => {
  // Строгая типизация стейта для PCI Gen
  const [pciGen, setPciGen] = useState<'Gen 2' | 'Gen 3'>('Gen 3');

  return (
    <main className="manager-layout">
      <InfoBlock
        title="IIO Configuration"
        toolsLabel="PCI-E PORTS"
        infoNode={<IIOInfo />}
        toolsNode={<IIOTools pciGen={pciGen} setPciGen={setPciGen} />}
      />
      
      {/* Окно БИОСа, которое зависит от выбранного поколения */}
      <IIOBios pciGen={pciGen} />
    </main>
  );
};

export default IIOConfiguration;
