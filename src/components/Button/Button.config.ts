import s from "./Button.module.css";

export const PRESET_BUTTONS = {
  safe: {
    label: "БЕЗОПАСНЫЙ",
    normal: s.button,
    active: s.safe_active,
  },
  balanced: {
    label: "ОПТИМАЛЬНЫЙ",
    normal: s.button,
    active: s.optimal_active,
  },
  aggressive: {
    label: "АГРЕССИВНЫЙ",
    normal: s.button,
    active: s.danger_active,
  },
  ultra: {
    label: "УЛЬТРА",
    normal: s.button,
    active: s.lava_active,
  },
  custom: {
    label: "РУЧНЫЕ НАСТРОЙКИ",
    normal: s.button,
    active: s.custom_active,
  },
} as const;

export const GEN_BUTTONS = {
  V2: {
    label: "V2",
    normal: s.button,
    active: s.v2_active,
  },
  V3: {
    label: "V3",
    normal: s.button,
    active: s.v3_active,
  },
  V4: {
    label: "V4",
    normal: s.button,
    active: s.v4_active,
  },
} as const;

export const PCI_BUTTONS = {
  gen_2: {
    label: "GEN 2",
    normal: s.button,
    active: s.gen_active,
  },
  gen_3: {
    label: "GEN 3",
    normal: s.button,
    active: s.gen_active,
  },
} as const;

export const DISK_BUTTONS = {
  mbr: {
    label: "MBR",
    normal: s.button,
    active: s.partition_active,
  },
  gpt: {
    label: "GPT",
    normal: s.button,
    active: s.partition_active,
  },
} as const;

export const MEMORY_BUTTONS = {
  ecc: {
    label: "ECC REG",
    normal: s.button,
    active: s.ecc_active,
  },
  desktop: {
    label: "DESKTOP",
    normal: s.button,
    active: s.desktop_active,
  },
} as const;

export const SLOTS_BUTTONS = {
  slots1: {
    label: "1 СЛОТ",
    normal: s.button,
    active: s.slots_active,
  },
  slots2: {
    label: "2 СЛОТА",
    normal: s.button,
    active: s.slots_active,
  },
  slots3: {
    label: "3 СЛОТА",
    normal: s.button,
    active: s.slots_active,
  },
  slots4: {
    label: "4 СЛОТА",
    normal: s.button,
    active: s.slots_active,
  },
} as const;

export const BOARD_BUTTONS = {
  atx: {
    label: "ATX",
    normal: s.button,
    active: s.board_active,
  },
  matx: {
    label: "MATX",
    normal: s.button,
    active: s.board_active,
  },
} as const;

export const TOOLS_BUTTONS = {
  warning: {
    label: "ВНИМАНИЕ",
    normal: s.warning,
    active: s.warning_active,
  },
  tools: {
    label: "ИНСТРУМЕНТЫ",
    normal: s.tools,
    active: s.tools_active,
  },
} as const;

export const ACTION_BUTTONS = {
  activate: {
    label: "АКТИВИРОВАТЬ",
    normal: s.button,
    active: s.danger_active,
  },
  cancel: {
    label: "ОТМЕНА",
    normal: s.safe_active,
    active: s.safe_active,
  },
  yes: {
    label: "ДА",
    normal: s.button,
    active: s.yes_active,
  },
  no: {
    label: "НЕТ",
    normal: s.button,
    active: s.no_active,
  },
} as const;

export const BUTTONS = {
  ...PRESET_BUTTONS,
  ...GEN_BUTTONS,
  ...PCI_BUTTONS,
  ...DISK_BUTTONS,
  ...MEMORY_BUTTONS,
  ...SLOTS_BUTTONS,
  ...BOARD_BUTTONS,
  ...TOOLS_BUTTONS,
  ...ACTION_BUTTONS,
} as const;

export type ButtonType = keyof typeof BUTTONS;
export type PresetButtonType = keyof typeof PRESET_BUTTONS;
export type GenButtonType = keyof typeof GEN_BUTTONS;
export type PciButtonType = keyof typeof PCI_BUTTONS;
export type DiskButtonType = keyof typeof DISK_BUTTONS;
export type MemoryButtonType = keyof typeof MEMORY_BUTTONS;
export type SlotsButtonType = keyof typeof SLOTS_BUTTONS;
export type BoardButtonType = keyof typeof BOARD_BUTTONS;
export type ToolsButtonType = keyof typeof TOOLS_BUTTONS;
export type ActionButtonType = keyof typeof ACTION_BUTTONS;
