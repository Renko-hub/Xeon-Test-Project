import memoryConfiguration from "./memoryConfiguration";
import ramFrequency from "./utils/ramFrequency";
import PrimaryTimings from "./utils/primaryTimings";
import SubTimings from "./utils/subTimings";
import ramPerformance from "./utils/ramPerformance";

const timingEngine = (state, changedKey) => {
  const config = memoryConfiguration(state, changedKey);
  const baseData = { ...state, ...config };

  const userCL =
    baseData.tCL !== undefined && baseData.tCL !== ""
      ? Number(baseData.tCL)
      : undefined;
  const userRP =
    baseData.tRP !== undefined && baseData.tRP !== ""
      ? Number(baseData.tRP)
      : undefined;
  const userRCD =
    baseData.tRCD !== undefined && baseData.tRCD !== ""
      ? Number(baseData.tRCD)
      : undefined;

  const dataWithParsedTimings = {
    ...baseData,
    tCL: userCL,
    tRP: userRP,
    tRCD: userRCD,
  };

  const { frequency } = ramFrequency(dataWithParsedTimings);
  const primaries = PrimaryTimings(dataWithParsedTimings, frequency);

  const isCustom = dataWithParsedTimings.preset === "custom";
  const finalPrimaries = {
    ...primaries,
    tCL: isCustom && userCL !== undefined ? userCL : primaries.tCL,
    tRP: isCustom && userRP !== undefined ? userRP : primaries.tRP,
    tRCD: isCustom && userRCD !== undefined ? userRCD : primaries.tRCD,
  };

  const fullData = { ...dataWithParsedTimings, ...finalPrimaries };

  const subTimings = SubTimings(fullData, finalPrimaries, frequency);
  const performance = ramPerformance(fullData, frequency, finalPrimaries);

  const tRfcFormatted = subTimings.tRFC_Values
    ? `${subTimings.tRFC_Values.current} (${fullData.preset === "ultra" ? "LIMIT" : "IDEAL"}: ${subTimings.tRFC_Values.limitValue})`
    : String(subTimings.tRFC ?? "");

  return {
    state: {
      board: fullData.board,
      gen: fullData.gen,
      cpu: fullData.cpu,
      memory: fullData.memory,
      ramSize: fullData.ramSize,
      density: fullData.density,
      slot: fullData.slot,
      preset: fullData.preset,
      unlocked: fullData.unlocked,
      history: fullData.history,
      userFrequency: fullData.userFrequency,
      tCL: fullData.tCL,
      tRP: fullData.tRP,
      tRCD: fullData.tRCD,
      tRAS: fullData.tRAS,
      tRC: fullData.tRC,
      tWR: fullData.tWR,
      tREFI: fullData.tREFI,
      tRRD: fullData.tRRD,
      tRTP: fullData.tRTP,
      tWTR: fullData.tWTR,
      tCR: fullData.tCR || fullData.tCP,
    },
    config,
    timings: {
      ...finalPrimaries,
      ...subTimings,
      ...performance,
      freqClean: String(performance.freq ?? "").replace(" MHz", ""),
      tRfcFormatted,
    },
    updateParam: (setParam) => (key, value) => {
      setParam((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
  };
};

export default timingEngine;
