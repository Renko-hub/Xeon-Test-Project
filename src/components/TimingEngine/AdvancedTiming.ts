export const getAdvancedTiming = (hw: any, slot: any, primary: any, config: any) => {
  const { isV2, isUltra, isMatx, profile: PR, frequencyBonus: FB, curMhz } = hw;
  const { slotsCount: vS, force16, isEcc: ECC, ramSize: SZ } = slot;
  const { fCL, fRP, fRCD, aCL, aRCD } = primary;

  const isCustom = PR === 'custom';
  const heavy = force16 || ECC || vS === 4;

  // 1. Расчет коэффициента коррекции для Custom профиля
  let cR = 1;
  if (isCustom) {
    const diffs = [(aCL - fCL), (aCL - fRP), (aRCD - fRCD)].filter(x => x > 0);
    if (diffs.length >= 2) {
      cR = Math.max(0.82, 1 - ((diffs.reduce((a, b) => a + b) / diffs.length) * 0.04));
    }
  }

  // 2. Внутренняя логика RFC
  const getRFCValues = () => {
    if (isV2) {
      const d = (ECC ? 30 : 0) + (force16 ? 24 : 0);
      const b: any = { 
        safe: { m: isMatx ? 128 : 120, o: isMatx ? 114 : 108 }, 
        balanced: { m: 114, o: 104 }, 
        aggressive: { m: 104, o: 94 }, 
        ultra: { m: isMatx ? 94 : 84, o: isMatx ? 84 : 74 } 
      };
      const s = b[PR] || b.safe;
      return { 
        m: Math.round((s.m + d - (FB * 8) - (vS === 1 ? 10 : 0)) * cR), 
        o: Math.round(s.o + d - (FB * 4) - (vS === 1 ? 6 : 0)) 
      };
    }

    const isT = isMatx && !force16 && ((SZ === 16 && vS === 2) || (SZ === 32 && vS === 4));
    const scn: any = [
      { c: ECC, safe: {m:380, o:350}, balanced: {m:350, o:312}, aggressive: {m:312, o:280}, ultra: {m: isMatx?280:270, o: isMatx?264:256} },
      { c: isT, safe: {m:344, o:328}, balanced: {m:328, o:280}, aggressive: {m:280, o:264}, ultra: {m:264, o:208} },
      { c: force16, safe: {m:312, o:280}, balanced: {m:280, o:260}, aggressive: {m:260, o:240}, ultra: {m: isMatx?240:212, o: vS===4?200:180} },
      { c: true, safe: {m:260, o:240}, balanced: {m:240, o:220}, aggressive: {m:220, o:190}, ultra: {m: (isMatx?190:170)-(vS===1?30:vS===2?15:0), o: (isMatx?156:140)-(vS===1?15:vS===2?7:0)} }
    ].find((s: any) => s.c);

    const st = isUltra ? scn.ultra : (scn[PR] || scn.safe);
    const defB = (!ECC && !isT && !force16) ? { m: FB * 20, o: FB * 15 } : { m: 0, o: 0 };
    
    return { 
      m: Math.round((st.m - defB.m) * cR), 
      o: Math.round(st.o - defB.o) 
    };
  };

  const t = getRFCValues();

  // 3. Напряжение
  const voltage = isV2 
    ? (isUltra ? "1.55V" : "1.50V") 
    : (isUltra ? "1.45V" : (force16 || (vS === 4 && SZ >= 64) ? "1.25V" : "1.20V"));

  return {
    tRFC: t.m,
    tRFC_ideal: t.o,
    voltage,
    refreshRate: (() => {
      if (isV2) return isUltra ? "32767" : (['aggressive', 'balanced'].includes(PR) ? "25000" : "12000");
      return isUltra ? "65535" : (['aggressive', 'balanced'].includes(PR) ? "32767" : "15600");
    })(),
    commandRate: ECC ? "1N" : (vS === 4 || (isMatx && force16) ? "2N" : "1N"),
    tWR: isV2 ? (isUltra ? 10 : 12) : (isUltra ? 10 : 16),
    tRRD: isV2 ? (isUltra ? 4 : 5) : (isUltra ? 4 : (heavy ? 6 : 5)),
    tRTP: isUltra ? 4 : 6,
    tWTR: isUltra ? 4 : 6,
    tFAW: isV2 ? (isUltra ? 16 : 20) : (isUltra ? 16 : (heavy ? 32 : 24)),
    tCWL: isV2 ? (isUltra ? 7 : 8) : (isUltra ? Math.max(fCL - 2, 9) : fCL - 1),
    psp: `${Math.round((curMhz * 8 * (vS === 3 ? 2.5 : vS)) / 1000)} GB/s`
  };
};
