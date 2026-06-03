const AdvancedBios = ({ cpuGen = "V3" } = {}) => {
  let uncoreLimit = "26";
  if (cpuGen === "V2") {
    uncoreLimit = "24";
  }
  if (cpuGen === "V4") {
    uncoreLimit = "56";
  }

  return {
    title: "ADVANCED POWER MANAGEMENT CONFIGURATION",
    path: "INTELRCSETUP > ADVANCED POWER MANAGEMENT CONFIGURATION",
    content: [
      { text_left: "Power Technology", text_right: "Custom" },
      { text_left: "Config TDP", text_right: "Disable" },
      { text_left: "IOTG Setting", text_right: "Disable" },
      { text_left: "Uncore CLR Freq OVRD", text_right: "MANUAL" },
      { text_left: "Uncore Max CLR Freq", text_right: uncoreLimit },
      { text_left: "CPU P State Control", text_right: "" },
      { text_left: "CPU HWPM State Control", text_right: "" },
      { text_left: "CPU C State Control", text_right: "" },
      { text_left: "CPU T State Control", text_right: "" },
      { text_left: "CPU - Advanced PM Tuning", text_right: "" },
      { text_left: "SOCKET RAPL Config", text_right: "" },
      { text_left: "DRAM RAPL Configuration", text_right: "" },
    ],
  };
};

export default AdvancedBios;
