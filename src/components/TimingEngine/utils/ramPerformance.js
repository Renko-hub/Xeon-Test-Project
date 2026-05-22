import { toEven } from "./ramFrequency";

const ramPerformance = (state, frequency, primaries) => {
  const { ramSize, slotsCount, ramType, profile, boardType, gen } = state;
  const { tCL, tRCD, tRP, tRAS } = primaries; 
  
  const isDdr4 = ramType === "DDR4";
  const isHighPower = profile === "ultra" || profile === "aggressive";

  const channels = Math.min(slotsCount, boardType === "matx" ? 2 : 4);
  const bandwidthGbps = Math.round((frequency * 8 * channels) / 1024) || 0;

  const calculatedTRC = gen === "V3" || gen === "V4" ? toEven(tRAS + 4) : tCL + tRCD + tRP;
  const tRC = isDdr4 ? Math.max(calculatedTRC, 34) : calculatedTRC;

  return {
    voltage: isDdr4
      ? profile === "ultra" ? "1.30V" : profile === "aggressive" ? "1.25V" : "1.20V"
      : isHighPower ? "1.55V" : "1.50V",
    tCP: ramSize >= 128 || slotsCount >= 4 ? "2N" : "1N",
    tRC,
    tCWL: isDdr4 && tCL % 2 === 0 ? tCL : tCL - 1,
    bandwidth: `${bandwidthGbps} GB/s`,
    freq: `${frequency} MHz`,
  };
};

export default ramPerformance;
