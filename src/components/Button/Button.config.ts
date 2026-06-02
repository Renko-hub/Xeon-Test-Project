import s from "./Button.module.css";

export const BUTTONS = {
  // PRESET_BUTTONS
  safe: { label: "БЕЗОПАСНЫЙ", normal: s.button, active: s.safe_active },
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
  ultra: { label: "УЛЬТРА", normal: s.button, active: s.lava_active },
  custom: {
    label: "РУЧНЫЕ НАСТРОЙКИ",
    normal: s.button,
    active: s.custom_active,
  },

  // GEN_BUTTONS
  V2: { label: "V2", normal: s.button, active: s.v2_active },
  V3: { label: "V3", normal: s.button, active: s.v3_active },
  V4: { label: "V4", normal: s.button, active: s.v4_active },

  // PCI_BUTTONS
  gen_2: { label: "GEN 2", normal: s.button, active: s.gen_active },
  gen_3: { label: "GEN 3", normal: s.button, active: s.gen_active },

  // DISK_BUTTONS
  mbr: { label: "MBR", normal: s.button, active: s.partition_active },
  gpt: { label: "GPT", normal: s.button, active: s.partition_active },

  // MEMORY_BUTTONS
  ecc: { label: "ECC REG", normal: s.button, active: s.ecc_active },
  desktop: { label: "DESKTOP", normal: s.button, active: s.desktop_active },

  // SLOTS_BUTTONS
  slots1: { label: "1 СЛОТ", normal: s.button, active: s.slots_active },
  slots2: { label: "2 СЛОТА", normal: s.button, active: s.slots_active },
  slots3: { label: "3 СЛОТА", normal: s.button, active: s.slots_active },
  slots4: { label: "4 СЛОТА", normal: s.button, active: s.slots_active },

  // BOARD_BUTTONS
  atx: { label: "ATX", normal: s.button, active: s.board_active },
  matx: { label: "MATX", normal: s.button, active: s.board_active },

  // TOOLS_BUTTONS
  warning: { label: "ВНИМАНИЕ", normal: s.warning, active: s.warning_active },
  tools: { label: "ИНСТРУМЕНТЫ", normal: s.tools, active: s.tools_active },

  // ACTION_BUTTONS
  activate: {
    label: "АКТИВИРОВАТЬ",
    normal: s.button,
    active: s.danger_active,
  },
  cancel: { label: "ОТМЕНА", normal: s.safe_active, active: s.safe_active },
  yes: { label: "ДА", normal: s.button, active: s.yes_active },
  no: { label: "НЕТ", normal: s.button, active: s.no_active },
} as const;
