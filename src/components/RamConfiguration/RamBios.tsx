import BiosInput from '../BiosInput/BiosInput';
import timingEngine from '../TimingEngine/timingEngine';

const RamBios = ({
  state,
  update,
}: {
  state: any;
  update: (c: any) => void;
}) => {
  const { state: s, timings: t } = timingEngine(state, state.lastChangedKey);
  const isCustom = s.profile === 'custom';

  const val = (f: string, isFirst = false) =>
    isCustom ? (
      <BiosInput field={f} state={s} update={update} isFirst={isFirst} />
    ) : (
      t[f]
    );

  const rfcInfo =
    !isCustom && t.tRFC_Values?.limitValue
      ? ` (${s.profile === 'ultra' ? 'LIMIT' : 'IDEAL'}: ${t.tRFC_Values.limitValue})`
      : '';

  return {
    title: `MEMORY CONFIG - ${t.freq} ${t.bandwidth} (${s.channelsName})`,
    path: 'INTELRCSETUP > MEMORY CONFIGURATION > MEMORY TIMINGS',
    content: [
      { text_left: 'DIMM profile', text_right: 'MANUAL' },
      { text_left: 'Memory Frequency', text_right: t.freq.split(' ')[0] },
      { text_left: 'Memory Voltage', text_right: t.voltage },
      { text_left: 'Command Timing', text_right: t.tCP },
      { text_left: 'Refresh Rate', text_right: t.tREFI },
      { text_left: 'CAS Latency', text_right: val('tCL', true) },
      { text_left: 'tRP', text_right: val('tRP') },
      { text_left: 'tRCD', text_right: val('tRCD') },
      { text_left: 'tRAS', text_right: t.tRAS },
      { text_left: 'tWR', text_right: t.tWR },
      { text_left: 'tRFC', text_right: `${t.tRFC_Values?.current}${rfcInfo}` },
      { text_left: 'tRRD', text_right: t.tRRD },
      { text_left: 'tRTP', text_right: t.tRTP },
      { text_left: 'tWTR', text_right: t.tWTR },
      { text_left: 'tFAW', text_right: t.tFAW },
      { text_left: 'tRC', text_right: t.tRC },
      { text_left: 'tCWL', text_right: t.tCWL },
    ],
  };
};

export default RamBios;
