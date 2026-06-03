import timingEngine from "../TimingEngine/timingEngine.js";

const RamBios = (param = {}) => {
  const { state: config = {}, timings = {} } = timingEngine(param);
  const isCustomMode = config.preset === "custom";

  const slotsCount = Number(config.slot?.replace("slots", "")) || 2;
  const channelLabels = ["SINGLE", "DUAL", "TRIPLE", "QUAD"];
  const channels = channelLabels[Math.min(slotsCount - 1, 3)] ?? "SINGLE";

  const bandwidth = timings.bandwidth ?? "0 GB/s";
  const titleText = `${timings.freqClean ?? ""} MHZ - ${bandwidth} (${channels})`;

  const getValue = (field) => {
    const val = timings[field];
    return val !== undefined && val !== null ? String(val) : "";
  };

  const rawRfcFormatted = timings.tRfcFormatted ?? getValue("tRFC");
  let formattedRfc = rawRfcFormatted;

  if (isCustomMode) {
    const match = rawRfcFormatted.match(/^\d+/);
    formattedRfc = match ? match[0] : getValue("tRFC");
  } else {
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
        isEditable: !!isEditable,
        field,
        isFirst,
      }),
    ),
  };
};

export default RamBios;
