export const BUTTONS = {
  safe: { label: 'БЕЗОПАСНЫЙ', theme: 'safe' },
  balanced: { label: 'ОПТИМАЛЬНЫЙ', theme: 'optimal' },
  aggressive: { label: 'АГРЕССИВНЫЙ', theme: 'danger' },
  ultra: { label: 'УЛЬТРА', theme: 'lava' },
  custom: { label: 'РУЧНЫЕ НАСТРОЙКИ', theme: 'custom' },
  warning: { label: 'ВНИМАНИЕ', theme: 'warning' },
  info: { label: 'ИНФО', theme: 'info' },
  v_2: { label: 'V2', theme: 'v2' },
  v_3: { label: 'V3', theme: 'v3' },
  v_4: { label: 'V4', theme: 'v4' },
  gen_2: { label: 'GEN 2', theme: 'gen' },
  gen_3: { label: 'GEN 3', theme: 'gen' },
  mbr: { label: 'MBR', theme: 'partition' },
  gpt: { label: 'GPT', theme: 'partition' },
  ecc: { label: 'ECC REG', theme: 'server' },
  desktop: { label: 'DESKTOP', theme: 'desktop' },
  slots1: { label: '1 СЛОТ', theme: 'slots' },
  slots2: { label: '2 СЛОТА', theme: 'slots' },
  slots3: { label: '3 СЛОТА', theme: 'slots' },
  slots4: { label: '4 СЛОТА', theme: 'slots' },
  atx: { label: 'ATX', theme: 'board' },
  matx: { label: 'MATX', theme: 'board' },
  activate: { label: 'АКТИВИРОВАТЬ', theme: 'danger' },
  cancel: { label: 'ОТМЕНА', theme: 'safe' },
  yes: { label: 'ДА', theme: 'yes' },   // Своя тема 'yes'
  no: { label: 'НЕТ', theme: 'no' },    // Своя тема 'no'
} as const;

export type ButtonType = keyof typeof BUTTONS;
