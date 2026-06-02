import {
  MEMORY_PRESETS,
  ULTRA_PRESET,
} from "../../RamConfiguration/data/memoryPresets";
import { toEven } from "./ramFrequency";

const PrimaryTimings = (state, frequency) => {
  const {
    preset,
    ramSize,
    slot,
    density,
    board,
    isEcc,
    isDdr4,
    isV4,
    isV3,
    isV2,
    tCL: sCL,
    tRCD: sRCD,
    tRP: sRP,
  } = state;

  const slotsCount = Number(slot?.replace("slots", "")) || 2;
  const loadScore =
    Math.floor(ramSize / 32) * 2 +
    (slotsCount > 2 ? 1 : 0) +
    (density === "yes" ? 2 : 0) +
    (board === "matx" ? 1 : 0) +
    (isEcc ? 1 : 0);

  // 1. Ветка ULTRA (вычисляется в линейном стиле)
  const divider = isV4 ? 4 : isDdr4 ? 2 : 3;
  const baseUltra = isV4 ? 11 : isDdr4 ? 12 : (ULTRA_PRESET?.tCL ?? 11);
  const ultraTiming = baseUltra + Math.floor(loadScore / divider);
  const ultraTras = toEven(ultraTiming * 2);

  // 2. Ветка STANDART / CUSTOM
  const currentPreset =
    MEMORY_PRESETS?.[frequency]?.[preset === "custom" ? "safe" : preset] ??
    MEMORY_PRESETS?.[frequency]?.safe ??
    MEMORY_PRESETS?.safe ??
    {};
  const v4Offset = isV4 && frequency >= 2133 ? 2 : 0;

  // Хелпер расчета тайминга (в одну строку, без if)
  const calc = (userVal, presetVal) =>
    preset === "custom" && userVal !== undefined && userVal !== ""
      ? Number(userVal)
      : isDdr4
        ? Math.max((presetVal ?? 15) - v4Offset, 11)
        : (presetVal ?? 15) - v4Offset;

  const stdCL = calc(sCL, currentPreset.tCL);
  const stdRCD = calc(sRCD, currentPreset.tRCD);
  const stdRP = calc(sRP, currentPreset.tRP);
  const stdTras = toEven(stdCL + stdRCD + (isV2 ? 4 : 2));
  const stdTrc = isDdr4
    ? Math.max(isV3 || isV4 ? toEven(stdTras + 4) : stdCL + stdRCD + stdRP, 34)
    : isV3 || isV4
      ? toEven(stdTras + 4)
      : stdCL + stdRCD + stdRP;

  // 3. Финальный маппинг результата через один тернарный оператор
  return preset === "ultra"
    ? {
        tCL: ultraTiming,
        tRCD: ultraTiming,
        tRP: ultraTiming,
        tRAS: ultraTras,
        loadScore,
        tRC: isV3 || isV4 ? toEven(ultraTras + 4) : ultraTiming * 3,
      }
    : {
        tCL: stdCL,
        tRCD: stdRCD,
        tRP: stdRP,
        tRAS: stdTras,
        tRC: stdTrc,
        loadScore,
      };
};

export default PrimaryTimings;
