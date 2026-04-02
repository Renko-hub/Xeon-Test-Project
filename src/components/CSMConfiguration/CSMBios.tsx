import React from 'react';
import BiosWindow from '../BiosWindow/BiosWindow';

const CSMBios = ({ config }: any) => {
  const rows = [
    { label: "CSM Support", value: config.csm, highlight: true },
    { label: "Boot option filter", value: config.bootFilter, highlight: true },
    { label: "Network", value: "Do not launch", highlight: false }, 
    { label: "Storage", value: config.storage, highlight: true },
    { label: "Video", value: config.video, highlight: true },
    { label: "Other PCI devices", value: "UEFI", highlight: true },
  ];

  return (
    <BiosWindow 
      title="CSM CONFIGURATION" 
      path="Advanced → CSM Configuration" 
      rows={rows} 
    />
  );
};

export default CSMBios;
