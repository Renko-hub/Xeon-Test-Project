const useBiosLogic = (type: string, value: string) => (item: any) => {
  if (item.text_right) return item.text_right;

  const biosMapper: any = {
    csm: { 
      "CSM Support": value === 'gpt' ? "Disabled" : "Enabled", 
      "Boot option filter": value === 'gpt' ? "UEFI only" : "Legacy only", 
      def: value === 'gpt' ? "UEFI" : "Legacy" 
    },
    power: { 
      // V2 в макс. перфоманс (C0/C1), V3/V4 оставляем базу для стабильности (C2)
      "Package C State limit": value === 'v_2' ? "C0/C1 state" : "C2 state", 
      // Только V3 требует C3 [Enable] для стабильного анлока. V2 и V4 — Disable.
      "CPU C3 report": (value === 'v_3') ? "Enable" : "Disable", 
      // C6 всегда Disable для всех (форумный стандарт для стабильности и скорости)
      "CPU C6 report": "Disable",
      // Для V3 дефолт Enable (чтобы подхватить остальные отчеты), для V2/V4 — Disable
      def: value === 'v_3' ? "Enable" : "Disable" 
    },
    iio: { 
      def: value === 'gen_3' ? 'GEN 3' : 'GEN 2' 
    }
  };

  return biosMapper[type]?.[item.text_left] ?? biosMapper[type]?.def ?? 'N/A';
};

export default useBiosLogic;
