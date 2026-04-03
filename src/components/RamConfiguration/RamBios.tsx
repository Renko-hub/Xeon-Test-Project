import React from 'react';
import BiosWindow from '../BiosWindow/BiosWindow';
import { useTimingEngine } from './data/timingEngine'; 

const RamBios = () => {
  const { config, res, updateCustomTiming } = useTimingEngine();
  
  if (!res) return null;

  const isUltra = config.profile === 'ultra';

  const rows = [
    { label: "DIMM profile", value: "MANUAL", highlight: isUltra },
    { label: "Memory Voltage", value: res.voltage, highlight: isUltra },
    { label: "Command Timing", value: res.tCR },
    { label: "Refresh Rate (tREFI)", value: res.tREFI },
    { label: "CAS Latency (tCL)", value: res.tCL, manualKey: "CL" },
    { label: "tRP", value: res.tRP, manualKey: "RP" },
    { label: "tRCD", value: res.tRCD, manualKey: "RCD" },
    { label: "tRAS", value: res.tRAS },
    { label: "tWR", value: res.tWR },
    { label: "tRFC", value: res.tRFC, highlight: isUltra }, 
    { label: "tRRD", value: res.tRRD },
    { label: "tRTP", value: res.tRTP },
    { label: "tWTR", value: res.tWTR },
    { label: "tFAW", value: res.tFAW },
    { label: "tRC", value: res.tRC },
    { label: "tCWL", value: res.tCWL },
  ];

  const biosTitle = `BIOS: ${config.cpu?.max || 2400}MHZ — ${res.totalRam}GB ${res.channelMode} [${res.bandwidth}]`;

  return (
    <BiosWindow 
      title={biosTitle}
      path="IntelRCSetup > Memory Configuration"
      config={config}
      onUpdate={updateCustomTiming}
      rows={rows}
      isUltra={isUltra} 
    />
  );
};

export default RamBios;
