import React, { useState } from 'react';
import Toolbox from '../Toolbox/Toolbox'; 
import BiosWindow from '../BiosWindow/BiosWindow';
import IIOTools from './IIOTools';
import IIOInfo from './IIOInfo';
import IIOBios from './IIOBios'; 

const IIOConfiguration = () => {
  // Используем универсальные имена и стейт
  const [value, setValue] = useState<'gen_2' | 'gen_3'>('gen_2');

  const { title, path, content } = IIOBios();

  return (
    <>
      <Toolbox 
        title="IIO Configuration"
        toolsLabel="PCI-E PORTS"
        renderInfo={(styles) => <IIOInfo styles={styles} />}
        renderTools={(styles) => (
          <IIOTools 
            value={value} 
            setValue={setValue} 
            styles={styles} 
          />
        )}
      />

      <BiosWindow 
        title={title} 
        path={path} 
        content={content} 
        type="iio"    // Передаем тип для хука внутри BiosWindow
        value={value} // Передаем текущее значение (gen2/gen3)
      />
    </>
  );
};

export default IIOConfiguration;
