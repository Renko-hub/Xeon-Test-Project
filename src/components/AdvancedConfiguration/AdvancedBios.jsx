const AdvancedBios = ({ cpuGen = "V3" }) => {
  // Определяем значение для Uncore Max CLR Freq на основе выбранного поколения CPU
  let uncoreLimit = "26";
  if (cpuGen === "V2") {
    uncoreLimit = "24";
  } // Стабильное базовое значение из диапазона 24-28
  if (cpuGen === "V4") {
    uncoreLimit = "56";
  }

  return {
    title: "Advanced Power Management Configuration",
    path: "IntelRCSetup > Advanced Power Management Configuration",
    content: [
      {
        text_left: "Power Technology",
        text_right: "Custom",
      },
      {
        text_left: "Config TDP",
        text_right: "Disable",
      },
      {
        text_left: "IOTG Setting",
        text_right: "Disable",
      },
      {
        text_left: "Uncore CLR Freq OVRD",
        text_right: "MANUAL",
      },
      {
        text_left: "Uncore Max CLR Freq",
        text_right: uncoreLimit, // Динамически меняется: 24, 26 или 56
        isEditable: true,
      },
      {
        text_left: "CPU P State Control",
        text_right: "",
        isEditable: true,
      },
      {
        text_left: "CPU HWPM State Control",
        text_right: "",
        isEditable: true,
      },
      {
        text_left: "CPU C State Control",
        text_right: "",
        isEditable: true,
      },
      {
        text_left: "CPU T State Control",
        text_right: "",
        isEditable: true,
      },
      {
        text_left: "CPU - Advanced PM Tuning",
        text_right: "",
        isEditable: true,
      },
      {
        text_left: "SOCKET RAPL Config",
        text_right: "",
        isEditable: true,
      },
      {
        text_left: "DRAM RAPL Configuration",
        text_right: "",
        isEditable: true,
      },
    ],
  };
};

export default AdvancedBios;
