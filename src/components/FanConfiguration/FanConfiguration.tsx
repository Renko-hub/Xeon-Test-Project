import React from 'react';
import Toolbox from '../Toolbox/Toolbox'; 
import BiosWindow from '../BiosWindow/BiosWindow';
import FanInfo from './FanInfo';
import FanBios from './FanBios';
import FanTools from './FanTools';

const FanConfiguration = () => {
  const { title, path, content } = FanBios();

  return (
    <>
      <Toolbox 
        title="SMART FAN FUNCTION"
        toolsLabel="ОБОРОТЫ %"
        renderInfo={(styles) => <FanInfo styles={styles} />}
        renderTools={(styles) => <FanTools styles={styles} />}
      />

      <BiosWindow 
        title={title} 
        path={path} 
        content={content} 
      />
    </>
  );
};

export default FanConfiguration;
