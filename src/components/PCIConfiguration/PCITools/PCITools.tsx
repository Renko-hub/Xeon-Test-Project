import React from 'react';
import s from './PCITools.module.css';
import { ToolboxStyles } from '@/components/Toolbox/Toolbox';


interface PCIToolsProps {
  styles: ToolboxStyles;
}

const PCITools = ({ styles }: PCIToolsProps) => (
  <div className={s.pci_container}>
    <label className={s.pci_section_label}>РАЗБОР ОШИБОК ИЗ GPU-Z:</label>
    
    <div className={s.pci_item}>
      <span className={s.pci_icon}>🚫</span>
      <div className={s.pci_item_description}>
        <strong className={s.pci_item_title}>UEFI BOOT REQUIRED / CSM ENABLED</strong>
        BIOS в режиме Legacy. Re-Size BAR требует чистый <strong className={s.pci_highlight}>UEFI</strong>. <br/>
        <span className={s.pci_status_accent}>РЕШЕНИЕ:</span> В BIOS (раздел Boot) поставьте <strong className={s.pci_highlight}>CSM Support: Disabled</strong>.
      </div>
    </div>

    <div className={s.pci_item}>
      <span className={s.pci_icon}>💾</span>
      <div className={s.pci_item_description}>
        <strong className={s.pci_item_title}>BOOT FROM GPT: NO</strong>
        Диск в MBR. Нужно конвертировать в <strong className={s.pci_highlight}>GPT (через MBR2GPT)</strong>, иначе после выключения CSM Windows не загрузится.
      </div>
    </div>

    <label className={s.pci_section_label}>ГДЕ ИСКАТЬ ПУНКТЫ В BIOS:</label>

    <div className={s.pci_item}>
      <span className={s.pci_icon}>📂</span>
      <div className={s.pci_item_description}>
        <strong className={s.pci_item_title}>СКРЫТОЕ МЕНЮ (X99/X79)</strong>
        Путь: <strong className={s.pci_highlight}>IntelRCSetup → IIO Configuration</strong>. <br/>
        Включите <strong className={s.pci_highlight}>PCI 64B ADDR</strong>. Если пункт Re-Size BAR не появился — см. блок ниже.
      </div>
    </div>

    <div className={s.pci_item}>
      <span className={s.pci_icon}>❓</span>
      <div className={s.pci_item_description}>
        <strong className={s.pci_item_title}>4G ЕСТЬ, А RE-SIZE BAR НЕТ</strong>
        китайцы: 4G Decoding включен, а пункта в меню нет. <br/>
        <span className={s.pci_status_accent}>РЕШЕНИЕ:</span> Используйте утилиту <strong className={s.pci_highlight}>ReBarState</strong>.
      </div>
    </div>

    <label className={s.pci_section_label}>ВАЖНЫЕ ПРИМЕЧАНИЯ:</label>

    <div className={s.pci_item}>
      <span className={s.pci_icon}>💡</span>
      <div className={s.pci_item_description}>
        <strong className={s.pci_item_title}>ПОРЯДОК ДЕЙСТВИЙ</strong>
        GPT → Off CSM → 64B ADDR → BAR.
      </div>
    </div>

    <div className={s.pci_item}>
      <span className={s.pci_icon}>⚠️</span>
      <div className={s.pci_item_description}>
        <strong className={s.pci_item_title}>ОГРАНИЧЕНИЕ ПЛАТФОРМЫ</strong>
        На процессорах <strong className={s.pci_highlight}>v1/v2 (LGA2011)</strong> Re-Size BAR не работает!
      </div>
    </div>
  </div>
);

export default PCITools;
