import { useState } from 'react';
import InfoWidget from '../InfoBlock/InfoBlock'; 
import CSMTools from './CSMTools';
import CSMInfo from './CSMInfo';
import CSMBios from './CSMBios';

const CSMConfiguration = () => {
  const [disk, setDisk] = useState<'mbr' | 'gpt'>('mbr');
  const isLegacy = disk === 'mbr';

  const config = {
    csm: isLegacy ? 'Enabled' : 'Disabled',
    bootFilter: isLegacy ? 'Legacy only' : 'UEFI only',
    storage: isLegacy ? 'Legacy' : 'UEFI',
    video: isLegacy ? 'Legacy' : 'UEFI'
  };

  return (
    <main className="manager-layout">
      <InfoWidget 
        title="BOOT & RECOVERY"
        toolsLabel="DISK MODE"
        infoNode={<CSMInfo />}
        toolsNode={<CSMTools disk={disk} setDisk={setDisk} />}
      />

      <CSMBios isLegacy={isLegacy} config={config} />
    </main>
  );
};

export default CSMConfiguration;
