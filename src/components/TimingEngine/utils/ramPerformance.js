const ramPerformance = (state, frequency) => {
  const { ramSize, slot, isDdr4, preset, tCR: userCommandRate } = state;

  const slotsCount = Number(slot?.replace("slots", "")) || 2;
  const memoryChannels = Math.min(slotsCount, 4);
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
  const finalCommandRate =
    preset === "custom" &&
    userCommandRate !== undefined &&
    userCommandRate !== ""
      ? userCommandRate
      : automaticCommandRate;

  return {
    voltage: operationalVoltage,
    tCP: finalCommandRate,
    bandwidth: `${bandwidthGbps} GB/s`,
    freq: `${frequency} MHz`,
  };
};

export default ramPerformance;
