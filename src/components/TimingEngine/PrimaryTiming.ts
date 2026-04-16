export const getPrimaryTiming = (hw: any, slot: any, config: any) => {
  const { isV2, isUltra, isCustom, profile, frequencyBonus: FB } = hw;
  const { slotsCount: vS, force16, isEcc: ECC, ramSize: SZ } = slot;

  // Маппинг базового CL
  const clMap: any = isV2 
    ? { safe: 11, balanced: 10, aggressive: 9, ultra: 8 } 
    : { safe: 15, balanced: 13, aggressive: 12, ultra: 11 };
  
  let cl = clMap[profile] || clMap.safe; 
  if (isUltra) cl = clMap.ultra;

  // Расчет штрафных баллов (pnl)
  let pnl = (ECC ? 1 : 0) + (vS === 3 ? 1 : 0);
  if (vS === 4 && !isV2 && (SZ >= 32 || force16)) pnl += 1;

  // Результирующий CL с учетом бонуса частоты и штрафов
  let resCL = cl - FB + pnl;
  if (isUltra) { 
    if (!hw.isMatx) resCL -= 1; 
    resCL += (vS === 1) ? (force16 ? 0 : -1) : 0; 
  }
  
  const aCL = Math.max(resCL, isV2 ? 7 : 9);
  const aRCD = (force16 || ECC || vS === 4) ? aCL + 1 : aCL;

  // Хелпер для парсинга кастомных значений
  const parse = (v: any, d: number) => (!v || String(v).trim() === '' ? d : Math.max(parseInt(v) || 0, 6));

  const fCL = isCustom ? parse(config.tCL, aCL) : aCL;
  const fRP = isCustom ? parse(config.tRP, aCL) : aCL;
  const fRCD = isCustom ? parse(config.tRCD, aRCD) : aRCD;
  const fRAS = isUltra ? fCL * 2 : fCL * 2 + 4;

  return { fCL, fRP, fRCD, fRAS, aCL, aRCD };
};
