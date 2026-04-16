import { CPU_MODELS } from "../RamConfiguration/data/configData";

export const getHardware = (config: any, isUnlocked: boolean) => {
  const { generation: GEN, boardType: BT, profile: PR } = config;

  const isV2 = GEN === 'V2';
  const isMatx = BT === 'matx';
  const isCustom = PR === 'custom';
  const isUltra = PR === 'ultra' && isUnlocked;

  // Поиск подходящего списка процессоров и конкретной модели
  const cpus = CPU_MODELS[GEN as keyof typeof CPU_MODELS] || [];
  const cpu = (cpus.find((c: any) => c.name === config.cpu?.name) || 
               cpus[0] || 
               { name: 'Standard', maxFrequency: 1600 }) as { name: string, maxFrequency: number };
  
  const baseMhz = isV2 ? 1866 : 2133;
  const curMhz = cpu.maxFrequency || baseMhz;
  
  // Расчет штрафа/бонуса частоты (FB в оригинале)
  const frequencyBonus = curMhz < baseMhz ? (baseMhz - curMhz >= 400 ? 2 : 1) : 0;

  return {
    isV2,
    isMatx,
    isCustom,
    isUltra,
    cpu,
    cpus,
    curMhz,
    frequencyBonus,
    profile: PR
  };
};
