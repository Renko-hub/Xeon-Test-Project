import timingEngine from "../TimingEngine/timingEngine.js";

const RamBios = (param = {}) => {
  const { state: config = {}, timings = {} } = timingEngine(param);
  const isCustomMode = config.preset === "custom";

  const ddrSpeed = config.isDdr4 ? "17000" : "14900";
  const titleText = `${timings.freq ?? ""} ${config.ramType ?? ""}-${ddrSpeed} (${config.channelsName ?? ""}-Channel)`;

  const getValue = (field) => {
    const val = timings[field];
    return val !== undefined && val !== null ? String(val) : "";
  };

  // Вычисляем чистое значение tRFC без скобок для ручного ввода
  const rawRfcFormatted = timings.tRfcFormatted ?? getValue("tRFC");
  let formattedRfc = rawRfcFormatted;

  if (isCustomMode) {
    // Для ручного ввода оставляем только первое число, отсекая всё, что идет после пробела или скобки
    formattedRfc = rawRfcFormatted.split(/[ (\s]/)[0];
  } else {
    // Для остальных пресетов подменяем LIMIT или IDEAL в зависимости от ultra
    const labelType = config.preset === "ultra" ? "LIMIT" : "IDEAL";
    formattedRfc =
      rawRfcFormatted.includes("IDEAL") || rawRfcFormatted.includes("LIMIT")
        ? rawRfcFormatted.replace(/IDEAL|LIMIT/g, labelType)
        : rawRfcFormatted;
  }

  const fieldsConfig = [
    { label: "DIMM PROFILE", value: "MANUAL" },
    { label: "MEMORY FREQUENCY", value: timings.freqClean ?? "" },
    { label: "MEMORY VOLTAGE", value: getValue("voltage") },
    { label: "COMMAND TIMING", value: getValue("tCR") || getValue("tCP") },
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
    { label: "TRFC", value: formattedRfc },
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
        field,
        isFirst,
      }),
    ),
  };
};

export default RamBios;
