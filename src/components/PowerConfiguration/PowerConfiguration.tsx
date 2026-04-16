import React, { useState } from 'react';
import Toolbox from '../Toolbox/Toolbox'; 
import BiosWindow from '../BiosWindow/BiosWindow';
import PowerTools from './PowerTools';
import PowerBios from './PowerBios'; 
import PowerInfo from './PowerInfo';

const PowerConfiguration = () => {
  // Состояние для пресетов CPU
  const [value, setValue] = useState<'v_2' | 'v_3' | 'v_4'>('v_2');

  const { title, path, content } = PowerBios();

  return (
    <>
      <Toolbox 
        title="Power Management"
        toolsLabel="ПРЕСЕТ CPU"
        renderInfo={(styles) => <PowerInfo styles={styles} />}
        renderTools={(styles) => (
          <PowerTools 
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
        type="power"   // Передаем тип для хука внутри BiosWindow
        value={value}   // Передаем текущий пресет (v2/v3/v4)
      />
    </>
  );
};

export default PowerConfiguration;
