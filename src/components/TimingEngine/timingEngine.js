import memoryConfiguration from "./memoryConfiguration";
import ramFrequency from "./utils/ramFrequency";
import PrimaryTimings from "./utils/primaryTimings";
import SubTimings from "./utils/subTimings";
import ramPerformance from "./utils/ramPerformance";

const timingEngine = (state, changedKey) => {
  const config = memoryConfiguration(state, changedKey);
  const baseData = { ...state, ...config };

  const hasUserCL = baseData.tCL !== undefined && baseData.tCL !== "";
  const hasUserRP = baseData.tRP !== undefined && baseData.tRP !== "";
  const hasUserRCD = baseData.tRCD !== undefined && baseData.tRCD !== "";
  const hasUserRFC = baseData.tRFC !== undefined && baseData.tRFC !== "";

  const userCL = hasUserCL ? Number(baseData.tCL) : undefined;
  const userRP = hasUserRP ? Number(baseData.tRP) : undefined;
  const userRCD = hasUserRCD ? Number(baseData.tRCD) : undefined;
  const userRFC = hasUserRFC ? Number(baseData.tRFC) : undefined;

  const dataWithParsedTimings = {
    ...baseData,
    ...(hasUserCL && { tCL: userCL }),
    ...(hasUserRP && { tRP: userRP }),
    ...(hasUserRCD && { tRCD: userRCD }),
    ...(hasUserRFC && { tRFC: userRFC }),
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
      tRFC: fullData.tRFC,
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
