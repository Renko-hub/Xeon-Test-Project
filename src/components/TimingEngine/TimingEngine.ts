import memoryConfiguration from "./memoryConfiguration";
import ramFrequency from "./utils/ramFrequency";
import PrimaryTimings from "./utils/primaryTimings";
import SubTimings from "./utils/subTimings";
import ramPerformance from "./utils/ramPerformance";

const timingEngine = (state, changedKey) => {
  const config = memoryConfiguration({ ...state }, changedKey);
  const data = { ...state, ...config };
  const { frequency, frequencyKey } = ramFrequency(data);
  const primaries = PrimaryTimings(data, frequencyKey);
  const subTimings = SubTimings(data, primaries, frequencyKey);

  return {
    state: data,
    config,
    timings: {
      ...primaries,
      ...subTimings,
      ...ramPerformance(data, frequency, primaries),
    },
  };
};

export default timingEngine;
