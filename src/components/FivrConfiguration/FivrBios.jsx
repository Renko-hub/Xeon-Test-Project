const FivrBios = (param) => {
  const { cpuGen = "V3" } = param;

  // Если выбран процессор поколения V4 (Broadwell-EP)
  if (cpuGen === "V4") {
    return {
      title: "FIVR Configuration",
      path: "IntelRCSetup > Overclocking Features",
      content: [
        {
          text_left: "SVID Support",
          text_right: "Disabled", // На V4 отключаем SVID
        },
        {
          text_left: "CPU VCCin Voltage Level",
          text_right: "359",
        },
        {
          text_left: "FIVR Faults",
          text_right: "Enabled",
        },
        {
          text_left: "FIVR Efficiency Management",
          text_right: "Disabled",
        },
      ],
    };
  }

  // Если выбран процессор поколения V3 (Haswell-EP) — отдаем конфигурацию с SVID Voltage Override
  return {
    title: "FIVR Configuration",
    path: "IntelRCSetup > Overclocking Features",
    content: [
      {
        text_left: "SVID Support",
        text_right: "Enabled",
      },
      {
        text_left: "SVID Voltage Override",
        text_right: "0", // Присутствует только на V3
      },
      {
        text_left: "CPU VCCin Voltage Level",
        text_right: "359",
      },
      {
        text_left: "FIVR Faults",
        text_right: "Enabled",
      },
      {
        text_left: "FIVR Efficiency Management",
        text_right: "Disabled",
      },
    ],
  };
};

export default FivrBios;
