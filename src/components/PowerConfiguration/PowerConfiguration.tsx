import { useState } from 'react';
import InfoWidget from '../InfoBlock/InfoBlock';
import PowerTools from './PowerTools';
import PowerBios from './PowerBios';
import PowerInfo from './PowerInfo';

const PowerConfiguration = () => {
  const [gen, setGen] = useState<'V2' | 'V3' | 'V4'>('V3');

  return (
    <main className="manager-layout">
      <InfoWidget
        title="Power Management"
        toolsLabel="ПРЕСЕТ CPU"
        infoNode={<PowerInfo />}
        toolsNode={<PowerTools gen={gen} setGen={setGen} />}
      />

      <PowerBios gen={gen} />
    </main>
  );
};

export default PowerConfiguration;
