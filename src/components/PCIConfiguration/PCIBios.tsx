import React from 'react';
import BiosWindow from '../BiosWindow/BiosWindow';

const PCIBios = () => {
  const rows = [
    { label: "Above 4G Decoding", value: "Enabled", highlight: true },
    { label: "Re-Size BAR Support", value: "Enabled", highlight: true },
  ];

  return (
    <BiosWindow 
      title="PCI SUBSYSTEM SETTINGS" 
      path="Advanced → PCI Subsystem Setting" 
      rows={rows} 
    />
  );
};

export default PCIBios;
