import memoryConfiguration from "./memoryConfiguration";
import ramFrequency from "./utils/ramFrequency";
import PrimaryTimings from "./utils/primaryTimings";
import SubTimings from "./utils/subTimings";
import ramPerformance from "./utils/ramPerformance";

const timingEngine = (state, changedKey) => {
  const config = memoryConfiguration(state, changedKey);
  const baseData = { ...state, ...config };

  // 1. Линейное приведение таймингов к числу без использования мутирующего forEach
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

  // 2. Сбор данных из утилит (частота и первичные тайминги)
  const { frequency } = ramFrequency(dataWithParsedTimings);
  const primaries = PrimaryTimings(dataWithParsedTimings, frequency);

  // 3. Вычисление финальных первичных таймингов (избавляемся от мутаций data.tCL)
  const isCustom = dataWithParsedTimings.preset === "custom";
  const finalPrimaries = {
    ...primaries,
    tCL: Number((isCustom && userCL) || primaries.tCL),
    tRP: Number((isCustom && userRP) || primaries.tRP),
    tRCD: Number((isCustom && userRCD) || primaries.tRCD),
  };

  // Полный объект данных для передачи в subTimings и performance
  const fullData = { ...dataWithParsedTimings, ...finalPrimaries };

  const subTimings = SubTimings(fullData, finalPrimaries, frequency);
  const performance = ramPerformance(fullData, frequency, finalPrimaries);

  // 4. Форматирование строки tRFC в одну строку кода
  const tRfcFormatted = subTimings.tRFC_Values
    ? `${subTimings.tRFC_Values.current} (${["aggressive", "custom", "ultra"].includes(fullData.preset) ? "LIMIT" : "IDEAL"}: ${subTimings.tRFC_Values.limitValue})`
    : String(subTimings.tRFC ?? "");

  // 5. Чистый стейт на выход без промежуточного создания переменных
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
      tCL: fullData.tCL,
      tRP: fullData.tRP,
      tRCD: fullData.tRCD,
    },
    config,
    timings: {
      ...finalPrimaries,
      ...subTimings,
      ...performance,
      freqClean: String(performance.freq ?? "").replace(" MHz", ""),
      tRfcFormatted,
    },
    // Теперь метод принимает setParam и использует функциональное обновление стейта
    updateParam: (setParam) => (key, value) => {
      setParam((prev) => timingEngine({ ...prev, [key]: value }, key).state);
    },
  };
};

export default timingEngine;
