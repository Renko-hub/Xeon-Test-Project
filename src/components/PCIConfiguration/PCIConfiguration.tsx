import React from 'react';
import Toolbox from '../Toolbox/Toolbox'; 
import BiosWindow from '../BiosWindow/BiosWindow';
import PCITools from './PCITools/PCITools';
import PCIInfo from './PCIInfo';
import PCIBios from './PCIBios'; 

const PCIConfiguration = () => {
  const { title, path, content } = PCIBios();

  return (
    <>
      <Toolbox 
        title="PCI SETTINGS"
        toolsLabel="GPU-Z ПРОВЕРКА"
        renderInfo={(styles) => <PCIInfo styles={styles} />}
        renderTools={(styles) => <PCITools styles={styles} />}
      />

      <BiosWindow 
        title={title} 
        path={path} 
        content={content} 
      />
    </>
  );
};

export default PCIConfiguration;
