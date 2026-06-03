const MemoryBios = ({ memoryType = "desktop" } = {}) => {
  const isEcc = memoryType === "ecc";

  return {
    title: "MEMORY CONFIGURATION",
    path: "INTELRCSETUP > MEMORY CONFIGURATION",
    content: [
      { text_left: "Enforce POR", text_right: "Disabled", isDisabled: true },
      { text_left: "PPR Type", text_right: "PPR Disabled", isDisabled: true },
      {
        text_left: "Dram Maintenance Test Inversion",
        text_right: "Disabled",
        isDisabled: true,
      },
      { text_left: "BCIT", text_right: "Disabled", isDisabled: true },
      {
        text_left: "Data Scrambling",
        text_right: isEcc ? "Enabled" : "Disabled",
        isDisabled: !isEcc,
      },
      { text_left: "Attempt Fast Boot", text_right: "Enable" },
      { text_left: "Attempt Fast Cold Boot", text_right: "Enable" },
      { text_left: "PSMI Support", text_right: "Disabled", isDisabled: true },
    ],
  };
};

export default MemoryBios;
