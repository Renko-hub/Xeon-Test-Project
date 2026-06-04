import React from "react";
import timingEngine from "../TimingEngine/timingEngine.js";
import BiosInput from "../BiosInput/BiosInput";

const RamBios = (param = {}, state = {}, update) => {
  const { state: cfg = {}, timings: t = {} } = timingEngine({
    ...param,
    ...state,
  });
  const isCustom = cfg.preset === "custom";
  const slots = Number(cfg.slot?.replace("slots", "")) || 2;
  const channels =
    ["SINGLE", "DUAL", "TRIPLE", "QUAD"][Math.min(slots - 1, 3)] ?? "SINGLE";

  const getVal = (f) =>
    state[f] !== undefined
      ? String(state[f])
      : t[f] !== undefined && t[f] !== null
        ? String(t[f])
        : "";

  const rRfc = t.tRfcFormatted ?? getVal("tRFC");

  const fRfc = isCustom
    ? rRfc.match(/^\d+/)
      ? rRfc.match(/^\d+/)[0]
      : getVal("tRFC")
    : rRfc.replace(/IDEAL|LIMIT/g, cfg.preset === "ultra" ? "LIMIT" : "IDEAL");

  const fld = (label, field, isEditable = isCustom, isFirst = false) => ({
    text_left: label,
    text_right: isEditable ? (
      <BiosInput
        field={field}
        state={state}
        update={update}
        isFirst={isFirst}
      />
    ) : field === "tRFC" ? (
      fRfc
    ) : (
      getVal(field)
    ),
  });

  return {
    title:
      `${t.freqClean ?? ""} MHZ - ${t.bandwidth ?? "0 GB/s"} (${channels})`.toUpperCase(),
    path: "INTELRCSETUP > MEMORY CONFIGURATION > MEMORY TIMINGS",
    content: [
      { text_left: "DIMM PROFILE", text_right: "MANUAL" },
      { text_left: "MEMORY FREQUENCY", text_right: t.freqClean ?? "" },
      { text_left: "MEMORY VOLTAGE", text_right: getVal("voltage") },
      {
        text_left: "COMMAND TIMING",
        text_right:
          (getVal("tCR") !== "" ? getVal("tCR") : null) ?? getVal("tCP"),
      },
      { text_left: "REFRESH RATE", text_right: getVal("tREFI") },
      fld("CAS LATENCY", "tCL", isCustom, true),
      fld("TRP", "tRP"),
      fld("TRCD", "tRCD"),
      { text_left: "TRAS", text_right: getVal("tRAS") },
      { text_left: "TWR", text_right: getVal("tWR") },
      fld("TRFC", "tRFC", false),
      { text_left: "TRRD", text_right: getVal("tRRD") },
      { text_left: "TRTP", text_right: getVal("tRTP") },
      { text_left: "TWTR", text_right: getVal("tWTR") },
      { text_left: "TFAW", text_right: getVal("tFAW") },
      { text_left: "TRC", text_right: getVal("tRC") },
      { text_left: "TCWL", text_right: getVal("tCWL") },
    ],
  };
};

export default RamBios;
