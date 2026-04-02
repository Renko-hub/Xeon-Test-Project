import React from 'react';
import InfoBlock from '../../InfoBlock/InfoBlock';
import s from './PCITools.module.css';

const PCITools = () => (
  <div className={s.container}>
    <span className={s.sectionLabel}>РАЗБОР ОШИБОК ИЗ GPU-Z:</span>
    
    <InfoBlock.Row icon="🚫">
      <strong className={s.title}>UEFI BOOT REQUIRED / CSM ENABLED</strong>
      <p className={s.text}>
        BIOS в режиме Legacy. Re-Size BAR требует чистый <strong>UEFI</strong>. <br/>
        <strong>РЕШЕНИЕ:</strong> В BIOS (раздел Boot) поставьте <strong>CSM Support: Disabled</strong>.
      </p>
    </InfoBlock.Row>

    <InfoBlock.Row icon="💾">
      <strong className={s.title}>BOOT FROM GPT: NO</strong>
      <p className={s.text}>
        Диск в MBR. Нужно конвертировать в <strong>GPT</strong> (через MBR2GPT), иначе после выключения CSM Windows не загрузится.
      </p>
    </InfoBlock.Row>

    <span className={s.sectionLabel}>ГДЕ ИСКАТЬ ПУНКТЫ В BIOS:</span>

    <InfoBlock.Row icon="📂">
      <strong className={s.title}>СКРЫТОЕ МЕНЮ (X99/X79)</strong>
      <p className={s.text}>
        Путь: <strong>IntelRCSetup → IIO Configuration</strong>. <br/>
        Включите <strong>PCI 64B ADDR</strong>. Если пункт <strong>Re-Size BAR</strong> не появился — см. блок ниже.
      </p>
    </InfoBlock.Row>

    <InfoBlock.Row icon="❓">
      <strong className={s.title}>4G ЕСТЬ, А RE-SIZE BAR НЕТ</strong>
      <p className={s.text}>
        Частая проблема китайцев: 4G Decoding включен, а пункта в меню нет. <br/>
        <strong>РЕШЕНИЕ:</strong> Используйте утилиту <strong>ReBarState</strong> для принудительной активации через EFI-shell.
      </p>
    </InfoBlock.Row>

    <div className={s.importantBox}>
      <InfoBlock.Row icon="💡">
        <span className={s.footerText}>
          <strong>ПОРЯДОК:</strong> GPT → Off CSM → 64B ADDR → BAR (меню или ReBarState).
        </span>
      </InfoBlock.Row>

      <InfoBlock.Row icon="⚠️">
        <span className={s.footerText}>
          На процессорах <strong>v1/v2 (LGA2011)</strong> технология не работает!
        </span>
      </InfoBlock.Row>
    </div>
  </div>
);

export default PCITools;
