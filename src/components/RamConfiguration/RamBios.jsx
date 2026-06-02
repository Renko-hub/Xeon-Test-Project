import timingEngine from "../TimingEngine/timingEngine.js";

const RamBios = (param = {}) => {
  const { state: config = {}, timings = {} } = timingEngine(param);
  const isCustomMode = config.preset === "custom";

  const ddrSpeed = config.isDdr4 ? "17000" : "14900";
  const titleText = `${timings.freq ?? ""} ${config.ramType ?? ""}-${ddrSpeed} (${config.channelsName ?? ""}-Channel)`;

  // Вспомогательная функция для безопасного вывода строк
  const getValue = (field) => {
    const val = timings[field];
    return val !== undefined && val !== null ? String(val) : "";
  };

  const fieldsConfig = [
    { label: "DIMM PROFILE", value: "MANUAL" },
    { label: "MEMORY FREQUENCY", value: timings.freqClean ?? "" },
    { label: "MEMORY VOLTAGE", value: getValue("voltage") },
    { label: "COMMAND TIMING", value: getValue("tCP") },
    { label: "REFRESH RATE", value: getValue("tREFI") },
    {
      label: "CAS LATENCY (TCL)",
      value: getValue("tCL"),
      isEditable: isCustomMode,
      field: "tCL",
      isFirst: true,
    },
    {
      label: "TRP",
      value: getValue("tRP"),
      isEditable: isCustomMode,
      field: "tRP",
    },
    {
      label: "TRCD",
      value: getValue("tRCD"),
      isEditable: isCustomMode,
      field: "tRCD",
    },
    { label: "TRAS", value: getValue("tRAS") },
    { label: "TWR", value: getValue("tWR") },
    { label: "TRFC", value: timings.tRfcFormatted ?? "" },
    { label: "TRRD", value: getValue("tRRD") },
    { label: "TRTP", value: getValue("tRTP") },
    { label: "TWTR", value: getValue("tWTR") },
    { label: "TFAW", value: getValue("tFAW") },
    { label: "TRC", value: getValue("tRC") },
    { label: "TCWL", value: getValue("tCWL") },
  ];

  return {
    title: titleText.toUpperCase(),
    path: "INTELRCSETUP > MEMORY CONFIGURATION > MEMORY TIMINGS",
    content: fieldsConfig.map(
      ({ label, value, isEditable = false, field, isFirst }) => ({
        text_left: label,
        text_right: value,
        isEditable,
        field, // Передаем ключ поля, чтобы BiosWindow знал, что обновлять
        isFirst, // Передаем флаг первого инпута для фокуса
      }),
    ),
  };
};

export default RamBios;
