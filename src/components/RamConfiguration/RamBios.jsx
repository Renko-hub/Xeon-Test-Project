import React from "react";
import timingEngine from "../TimingEngine/timingEngine.js";
import BiosInput from "../BiosInput/BiosInput";

const RamBios = (param = {}, state = {}, update) => {
  const { state: config = {}, timings = {} } = timingEngine({
    ...param,
    ...state,
  });
  const isCustom = config.preset === "custom";

  const slots = Number(config.slot?.replace("slots", "")) || 2;
  const channels =
    ["SINGLE", "DUAL", "TRIPLE", "QUAD"][Math.min(slots - 1, 3)] ?? "SINGLE";
  const titleText = `${timings.freqClean ?? ""} MHZ - ${timings.bandwidth ?? "0 GB/s"} (${channels})`;

  const getVal = (f) =>
    state[f] !== undefined
      ? String(state[f])
      : timings[f] !== undefined && timings[f] !== null
        ? String(timings[f])
        : "";

  const rawRfc = timings.tRfcFormatted ?? getVal("tRFC");
  const formattedRfc = isCustom
    ? rawRfc.match(/^\d+/)
      ? rawRfc
      : getVal("tRFC")
    : rawRfc.replace(
        /IDEAL|LIMIT/g,
        config.preset === "ultra" ? "LIMIT" : "IDEAL",
      );

  const createField = (
    label,
    field,
    isEditable = isCustom,
    isFirst = false,
  ) => ({
    label,
    value: getVal(field),
    field,
    isEditable,
    isFirst,
  });

  const fields = [
    { label: "DIMM PROFILE", value: "MANUAL" },
    { label: "MEMORY FREQUENCY", value: timings.freqClean ?? "" },
    { label: "MEMORY VOLTAGE", value: getVal("voltage") },
    {
      label: "COMMAND TIMING",
      value: (getVal("tCR") !== "" ? getVal("tCR") : null) ?? getVal("tCP"),
    },
    { label: "REFRESH RATE", value: getVal("tREFI") },
    createField("CAS LATENCY", "tCL", isCustom, true),
    createField("TRP", "tRP"),
    createField("TRCD", "tRCD"),
    { label: "TRAS", value: getVal("tRAS") },
    { label: "TWR", value: getVal("tWR") },
    createField("TRFC", "tRFC", false),
    { label: "TRRD", value: getVal("tRRD") },
    { label: "TRTP", value: getVal("tRTP") },
    { label: "TWTR", value: getVal("tWTR") },
    { label: "TFAW", value: getVal("tFAW") },
    { label: "TRC", value: getVal("tRC") },
    { label: "TCWL", value: getVal("tCWL") },
  ];

  return {
    title: titleText.toUpperCase(),
    path: "INTELRCSETUP > MEMORY CONFIGURATION > MEMORY TIMINGS",
    content: fields.map(({ label, value, isEditable, field, isFirst }) => ({
      text_left: label,
      text_right:
        isEditable && field ? (
          <BiosInput
            field={field}
            state={state}
            update={update}
            isFirst={isFirst}
          />
        ) : field === "tRFC" ? (
          formattedRfc
        ) : (
          value
        ),
    })),
  };
};

export default RamBios;
