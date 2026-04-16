const RamBios = (t: any) => {
  let trfcVal = String(t.tRFC);
  if (t.profile !== 'custom') {
    const label = t.isUltra ? 'Ultra' : 'Ideal';
    trfcVal = `${t.tRFC} (${label}: ${t.tRFC_ideal})`;
  }

  return {
    title: `MEMORY CONFIGURATION - SPEED: ${t.psp}`, 
    path: "INTELRCSETUP > MEMORY CONFIGURATION > MEMORY TIMINGS & VOLTAGE",
    content: [
      { text_left: "DIMM PROFILE", text_right: "MANUAL" },
      { text_left: "MEMORY VOLTAGE", text_right: t.voltage },
      { text_left: "COMMAND TIMING", text_right: t.commandRate },
      { text_left: "REFRESH RATE", text_right: t.refreshRate },
      { text_left: "CAS LATENCY", text_right: t.tCL, id: "tCL" },
      { text_left: "TRP", text_right: t.tRP, id: "tRP" },
      { text_left: "TRCD", text_right: t.tRCD, id: "tRCD" },
      { text_left: "TRAS", text_right: t.tRAS },
      { text_left: "TWR", text_right: t.tWR },
      { text_left: "TRFC", text_right: trfcVal },
      { text_left: "TRRD", text_right: t.tRRD },
      { text_left: "TRTP", text_right: t.tRTP },
      { text_left: "TWTR", text_right: t.tWTR },
      { text_left: "TFAW", text_right: t.tFAW },
      { text_left: "TRC", text_right: t.tRC },
      { text_left: "TCWL", text_right: t.tCWL },
    ]
  };
};

export default RamBios;
