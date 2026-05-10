import { TREFI_TABLE } from '../RamConfiguration/data/memoryPresets';
import memoryConfiguration from './memoryConfiguration';
import {
  PrimaryTimings,
  SubTimings,
  formatOutputData,
  resolveFrequency,
} from './timingUtils';

const timingEngine = (state: any, changedKey?: string): any => {
  const config = memoryConfiguration({ ...state }, changedKey);
  const data = { ...state, ...config };

  const { frequency, frequencyKey } = resolveFrequency(data);
  const primaries = PrimaryTimings(data, frequencyKey);
  const subTimings = SubTimings(data, primaries, frequencyKey);
  const outputData = formatOutputData(data, frequency, primaries);

  const timings: any = {
    ...primaries,
    ...subTimings,
    ...outputData,
    tWR: 12,
    tRRD: data.ramType === 'DDR4' ? 4 : 5,
    tRTP: 6,
    tWTR: data.ramType === 'DDR4' ? 8 : 7,
    tFAW: data.ramType === 'DDR4' ? (frequency >= 2400 ? 24 : 16) : 28,
    tREFI: ((TREFI_TABLE as any)[data.profile] ?? TREFI_TABLE.safe)[data.gen],
    tRFC_Values: subTimings.tRFC_Values,
  };

  return { state: data, config, timings };
};

export default timingEngine;
