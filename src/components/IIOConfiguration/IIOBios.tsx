import React from 'react';
import BiosWindow from '../BiosWindow/BiosWindow';

const IIOBios = ({ pciGen }: any) => {
  const rows = [
    { label: "IOU2 (PCIE PORT X16)", value: pciGen, highlight: true },
    { label: "IOU0 (PCIE PORT X8)", value: pciGen, highlight: true },
    { label: "IOU1 (PCIE PORT X4)", value: pciGen, highlight: true },
  ];

  return <BiosWindow 
  title="IIO0 CONFIGURATION" 
  path="IntelRCSetup > IIO Configuration > IIO0 Configuration" 
  rows={rows} />;
};

export default IIOBios;
