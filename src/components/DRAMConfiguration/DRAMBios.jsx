const DRAMBios = (param) => {
  const { ramType = "ecc" } = param; // Значение по умолчанию в нижнем регистре

  if (ramType === "desktop") {
    // Проверка строки в нижнем регистре
    return {
      title: "DRAM RAPL Configuration",
      path: "IntelRCSetup > DRAM RAPL Configuration",
      content: [
        {
          text_left: "DRAM RAPL Baseline",
          text_right: "Disable",
        },
      ],
    };
  }

  return {
    title: "DRAM RAPL Configuration",
    path: "IntelRCSetup > DRAM RAPL Configuration",
    content: [
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
