const FivrBios = ({ cpuGen = "V3" } = {}) => {
  const isV4 = cpuGen === "V4";

  return {
    title: "FIVR CONFIGURATION",
    path: "INTELRCSETUP > OVERCLOCKING FEATURE > SVID/FIVR",
    content: isV4
      ? [
          { text_left: "SVID Support", text_right: "Disabled" },
          { text_left: "CPU VCCin Voltage Level", text_right: "359" },
          { text_left: "FIVR Faults", text_right: "Enabled" },
          { text_left: "FIVR Efficiency Management", text_right: "Disabled" },
        ]
      : [
          { text_left: "SVID Support", text_right: "Enabled" },
          { text_left: "SVID Voltage Override", text_right: "0" },
          { text_left: "CPU VCCin Voltage Level", text_right: "359" },
          { text_left: "FIVR Faults", text_right: "Enabled" },
          { text_left: "FIVR Efficiency Management", text_right: "Disabled" },
        ],
  };
};

export default FivrBios;
