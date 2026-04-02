import React from 'react';
import BiosWindow from '../BiosWindow/BiosWindow';

const PowerBios = ({ gen }: any) => {
  const rows = [
    { label: "C2C3TT", value: "0" },
    { label: "Package C State limit", value: gen === 'V2' ? 'No Limit' : 'C2 state', highlight: gen !== 'V2' },
    { label: "CPU C3 report", value: gen === 'V4' ? 'Disable' : 'Enable', highlight: gen === 'V4' },
    { label: "CPU C6 report", value: gen === 'V2' ? 'Enable' : 'Disable', highlight: gen !== 'V2' },
  ];

  return <BiosWindow title="CPU C STATE CONTROL" path="Advanced → Power Management → CPU C State" rows={rows} />;
};

export default PowerBios;
