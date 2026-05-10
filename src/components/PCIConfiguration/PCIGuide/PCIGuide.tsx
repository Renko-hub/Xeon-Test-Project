import clsx from 'clsx';
import s from './PCIGuide.module.css';

const guideSections = [
  {
    label: 'РАЗБОР ОШИБОК ИЗ GPU-Z:',
    items: [
      {
        icon: '🚫',
        title: 'UEFI BOOT REQUIRED / CSM ENABLED',
        text: (
          <>
            BIOS в режиме Legacy. Re-Size BAR требует чистый{' '}
            <strong className={s.pci_highlight}>UEFI</strong>. <br />{' '}
            <span className={s.pci_status_accent}>РЕШЕНИЕ:</span> В BIOS (раздел
            Boot) поставьте{' '}
            <strong className={s.pci_highlight}>CSM Support: Disabled</strong>.
          </>
        ),
      },
      {
        icon: '💾',
        title: 'BOOT FROM GPT: NO',
        text: (
          <>
            Диск в MBR. Нужно конвертировать в{' '}
            <strong className={s.pci_highlight}>GPT</strong>, иначе Windows не
            загрузится.
          </>
        ),
      },
    ],
  },
  {
    label: 'ГДЕ ИСКАТЬ ПУНКТЫ В BIOS:',
    items: [
      {
        icon: '📂',
        title: 'СКРЫТОЕ МЕНЮ (X99/X79)',
        text: (
          <>
            Путь:{' '}
            <strong className={s.pci_highlight}>
              IntelRCSetup → IIO Configuration
            </strong>
            . <br /> Включите{' '}
            <strong className={s.pci_highlight}>PCI 64B ADDR</strong>.
          </>
        ),
      },
      {
        icon: '❓',
        title: '4G ЕСТЬ, А RE-SIZE BAR НЕТ',
        text: (
          <>
            Китайцы часто скрывают пункт меню. <br />{' '}
            <span className={s.pci_status_accent}>РЕШЕНИЕ:</span> Используйте
            утилиту <strong className={s.pci_highlight}>ReBarState</strong>.
          </>
        ),
      },
    ],
  },
];

const PCIGuide = ({ externalStyles = {} }: { externalStyles?: any }) => (
  <div
    className={clsx(s.pci_guide_container, externalStyles?.pci_guide_container)}
  >
    {guideSections.map(({ label, items }, sIdx) => (
      <div key={sIdx} className={s.pci_guide_section}>
        <label className={s.pci_section_label}>{label}</label>
        {items.map(({ icon, title, text }, iIdx) => (
          <div key={iIdx} className={s.pci_item}>
            <span className={s.pci_icon}>{icon}</span>
            <div className={s.pci_item_description}>
              <strong className={s.pci_item_title}>{title}</strong>
              <div className={s.pci_item_text}>{text}</div>
            </div>
          </div>
        ))}
      </div>
    ))}
  </div>
);

export default PCIGuide;
