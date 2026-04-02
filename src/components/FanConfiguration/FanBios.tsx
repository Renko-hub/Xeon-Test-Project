import React from 'react';
import BiosWindow from '../BiosWindow/BiosWindow';

const FanBios = () => {
  const rows = [
    { label: "Smart Fan 1 Mode", value: "Automatic Mode" },
    { label: "Smart Fan Temperature 1", value: "40" },
    { label: "Smart Fan Temperature 2", value: "55" },
    { label: "Smart Fan Temperature 3", value: "65" },
    { label: "Smart Fan Temperature 4", value: "75" },
    { label: "Smart Fan Critical Temperature", value: "80" },
    { label: "Smart Fan PWM 1", value: "75" },
    { label: "Smart Fan PWM 2", value: "130" },
    { label: "Smart Fan PWM 3", value: "185" },
    { label: "Smart Fan PWM 4", value: "255" },
    { label: "Fan work mode with critical", value: "Full Mode" },
    { label: "Temperature Tolerance", value: "5" },
  ];

  return (
    <BiosWindow 
      title="SMART FAN FUNCTION" 
      path="Advanced → Smart Fan Function" 
      rows={rows} 
    />
  );
};

export default FanBios;
