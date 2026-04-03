export const BUTTONS = [
  // Пресеты
  { type: 'safe', label: 'БЕЗОПАСНЫЙ', theme: 'safe' },
  { type: 'balanced', label: 'ОПТИМАЛЬНЫЙ', theme: 'optimal' },
  { type: 'aggressive', label: 'АГРЕССИВНЫЙ', theme: 'danger' },
  { type: 'ultra', label: 'УЛЬТРА', theme: 'lava' }, 
  { type: 'custom', label: 'РУЧНЫЕ НАСТРОЙКИ', theme: 'custom' },
  { type: 'warning', label: 'ВНИМАНИЕ', theme: 'warning' },
  { type: 'info', label: 'ИНФО', theme: 'info', variant: 'outline' },

  // Поколения (DDR / Прочие)
  { type: 'v2', label: 'V2', theme: 'v2' },
  { type: 'v3', label: 'V3', theme: 'v3' },
  { type: 'v4', label: 'V4', theme: 'metallic' },
  
  // РЕЖИМ ШИНЫ PCI-E (Те самые кнопки с твоего скрина)
  { type: 'gen 2', label: 'GEN 2', theme: 'info' },
  { type: 'gen 3', label: 'GEN 3', theme: 'info' },
  { type: 'gen 4', label: 'GEN 4', theme: 'info' },

  // Алгоритмы / Системные (Тоже синие)
  { type: 'mbr', label: 'MBR', theme: 'info' },
  { type: 'gpt', label: 'GPT', theme: 'info' },
  
  // Тип памяти
  { type: 'ecc', label: 'ECC REG', theme: 'optimal' },
  { type: 'desktop', label: 'DESKTOP', theme: 'optimal' },
  
  // ОБЪЕМ
  { type: 'size_4', label: '4ГБ', theme: 'safe' },
  { type: 'size_8', label: '8ГБ', theme: 'safe' },
  { type: 'size_12', label: '12ГБ', theme: 'safe' },
  { type: 'size_16', label: '16ГБ', theme: 'safe' },
  { type: 'size_24', label: '24ГБ', theme: 'safe' }, 
  { type: 'size_32', label: '32ГБ', theme: 'safe' },
  { type: 'size_48', label: '48ГБ', theme: 'safe' },
  { type: 'size_64', label: '64ГБ', theme: 'safe' },
  
  // СЛОТЫ
  { type: 'slots_1', label: '1', theme: 'info' },
  { type: 'slots_2', label: '2', theme: 'info' },
  { type: 'slots_3', label: '3', theme: 'info' }, 
  { type: 'slots_4', label: '4', theme: 'info' },

  // Материнка
  { type: 'atx', label: 'ATX', theme: 'info' },
  { type: 'matx', label: 'mATX', theme: 'info' },
] as const;
