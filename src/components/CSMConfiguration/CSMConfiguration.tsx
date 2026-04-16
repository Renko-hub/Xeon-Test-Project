import React, { useState } from 'react';
import Toolbox from '../Toolbox/Toolbox'; 
import BiosWindow from '../BiosWindow/BiosWindow'; 

// Меняем только эти импорты
import Tools from './CSMTools';
import Info from './CSMInfo';
import BiosData from './CSMBios'; 

const CSMConfiguration = () => {
  const [value, setValue] = useState<'mbr' | 'gpt'>('mbr');

  const { title, path, content } = BiosData();

  return (
    <>
      <Toolbox 
        title="BOOT & RECOVERY"
        toolsLabel="DISK MODE"
        renderInfo={(styles) => <Info styles={styles} />}
        renderTools={(styles) => (
          <Tools 
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
        type="csm"   // Идентификатор для хука внутри BiosWindow
        value={value} // Текущий стейт
      />
    </>
  );
};

export default CSMConfiguration;
