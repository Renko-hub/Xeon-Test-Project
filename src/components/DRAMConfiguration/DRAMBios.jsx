const DRAMBios = ({ ramType = "ecc" } = {}) => {
  const isDesktop = ramType === "desktop";

  return {
    title: "DRAM RAPL CONFIGURATION",
    path: "INTELRCSETUP > ADVANCED POWER MANAGEMENT CONFIGURATION > DRAM RAPL CONFIGURATION",
    content: isDesktop
      ? [
          {
            text_left: "DRAM RAPL Baseline",
            text_right: "Disable",
          },
        ]
      : [
          {
            text_left: "DRAM RAPL Baseline",
            text_right: "DRAM RAPL Mode 0",
          },
          {
            text_left: "Override BW_LIMIT_TF",
            text_right: "1",
          },
          {
            text_left: "DRAM RAPL Extended Range",
            text_right: "Enable",
          },
        ],
  };
};

export default DRAMBios;
