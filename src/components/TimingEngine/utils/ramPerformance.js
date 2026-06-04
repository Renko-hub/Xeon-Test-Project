const CHANNEL_MAPPING = { Single: 1, Dual: 2, Triple: 3, Quad: 4 };

const ramPerformance = (state, frequency) => {
  const {
    ramSize,
    slot,
    isDdr4,
    preset,
    tCR: userCommandRate,
    channelsName,
  } = state;

  const slotsCount = Number(slot?.replace("slots", "")) || 2;
  const memoryChannels =
    CHANNEL_MAPPING[channelsName] ?? Math.min(slotsCount, 2);
  const bandwidthGbps =
    Math.round((frequency * 8 * memoryChannels) / 1024) || 0;

  const operationalVoltage = isDdr4
    ? preset === "ultra"
      ? "1.30V"
      : preset === "aggressive"
        ? "1.25V"
        : "1.20V"
    : preset === "ultra" || preset === "aggressive"
      ? "1.55V"
      : "1.50V";

  const automaticCommandRate = ramSize >= 128 || slotsCount >= 4 ? "2N" : "1N";
  const hasUserValue =
    userCommandRate !== undefined && String(userCommandRate).trim() !== "";
  const finalCommandRate =
    preset === "custom" && hasUserValue
      ? userCommandRate
      : automaticCommandRate;

  return {
    voltage: operationalVoltage,
    tCR: finalCommandRate,
    tCP: finalCommandRate,
    bandwidth: `${bandwidthGbps} GB/s`,
    freq: `${frequency} MHz`,
  };
};

export default ramPerformance;
