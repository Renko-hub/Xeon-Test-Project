const ramPerformance = (state, frequency, primaries) => {
  const { ramSize, slot, isDdr4, preset, board } = state;
  const { tCL, tRC } = primaries || {};

  const slotsCount = Number(slot?.replace("slots", "")) || 2;
  const channels = Math.min(slotsCount, board === "matx" ? 2 : 4);
  const bandwidthGbps = Math.round((frequency * 8 * channels) / 1024) || 0;

  // Линейный расчет вольтажа через тернарную карту без if-else
  const voltage = isDdr4
    ? preset === "ultra"
      ? "1.30V"
      : preset === "aggressive"
        ? "1.25V"
        : "1.20V"
    : preset === "ultra" || preset === "aggressive"
      ? "1.55V"
      : "1.50V";

  return {
    voltage,
    tCP: ramSize >= 128 || slotsCount >= 4 ? "2N" : "1N",
    tRC,
    tCWL: isDdr4 && tCL % 2 === 0 ? tCL : tCL - 1,
    bandwidth: `${bandwidthGbps} GB/s`,
    freq: `${frequency} MHz`,
  };
};

export default ramPerformance;
