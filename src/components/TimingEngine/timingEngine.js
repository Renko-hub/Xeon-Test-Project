import memoryConfiguration from "./memoryConfiguration";
import ramFrequency from "./utils/ramFrequency";
import PrimaryTimings from "./utils/primaryTimings";
import SubTimings from "./utils/subTimings";
import ramPerformance from "./utils/ramPerformance";

const timingEngine = (state, changedKey) => {
  const config = memoryConfiguration(state, changedKey);
  const baseData = { ...state, ...config };

  if (changedKey === "cpu" || changedKey === "gen" || changedKey === "preset") {
    delete baseData.userFrequency;
    if (baseData.preset !== "custom") {
      delete baseData.tCL;
      delete baseData.tRP;
      delete baseData.tRCD;
      delete baseData.tRAS;
      delete baseData.tRC;
      delete baseData.tWR;
      delete baseData.tREFI;
      delete baseData.tRRD;
      delete baseData.tRTP;
      delete baseData.tWTR;
      delete baseData.tCR;
      delete baseData.tRFC;
    }
  }

  const { frequency } = ramFrequency(baseData);
  const primaries = PrimaryTimings(baseData, frequency);

  const dataWithPrimaries = { ...baseData, ...primaries };
  const subTimings = SubTimings(dataWithPrimaries, primaries, frequency);
  const performance = ramPerformance(dataWithPrimaries, frequency);

  const allCalculatedTimings = {
    ...primaries,
    ...subTimings,
    ...performance,
  };

  const isUltra = baseData.preset === "ultra";
  const tRfcFormatted = subTimings.tRFC_Values
    ? `${subTimings.tRFC_Values.current} (${isUltra ? "LIMIT" : "IDEAL"}: ${subTimings.tRFC_Values.limitValue})`
    : String(subTimings.tRFC ?? "");

  const isCustom = baseData.preset === "custom";

  return {
    state: {
      ...baseData,
      tCL: isCustom ? baseData.tCL : allCalculatedTimings.tCL,
      tRP: isCustom ? baseData.tRP : allCalculatedTimings.tRP,
      tRCD: isCustom ? baseData.tRCD : allCalculatedTimings.tRCD,
      tRAS: isCustom ? baseData.tRAS : allCalculatedTimings.tRAS,
      tRC: isCustom ? baseData.tRC : allCalculatedTimings.tRC,
      tWR: isCustom ? baseData.tWR : allCalculatedTimings.tWR,
      tREFI: isCustom ? baseData.tREFI : allCalculatedTimings.tREFI,
      tRRD: isCustom ? baseData.tRRD : allCalculatedTimings.tRRD,
      tRTP: isCustom ? baseData.tRTP : allCalculatedTimings.tRTP,
      tWTR: isCustom ? baseData.tWTR : allCalculatedTimings.tWTR,
      tCR: isCustom ? baseData.tCR : allCalculatedTimings.tCR,
      tRFC: isCustom ? baseData.tRFC : allCalculatedTimings.tRFC,
    },
    config,
    timings: {
      ...allCalculatedTimings,
      freqClean: String(performance.freq ?? "").replace(" MHz", ""),
      tRfcFormatted,
    },
    updateParam: (setParam) => (key, value) => {
      setParam((prev) => ({ ...prev, [key]: value }));
    },
  };
};

export default timingEngine;
