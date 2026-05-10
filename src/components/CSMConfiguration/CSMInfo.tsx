const csmData = [
  {
    icon: '🔧',
    text: 'Если система не видит диск, включите CSM (Legacy). Это вернет видимость старых MBR-разделов.',
  },
  {
    icon: '🚀',
    text: 'Режим UEFI дает Fast Boot, поддержку дисков 2ТБ+, работу Re-Size BAR и совместимость с Windows 11.',
  },
  {
    icon: '⚠️',
    text: 'Для UEFI нужна GPT-разметка. При смене режима Windows в MBR не загрузится без конвертации или переустановки.',
  },
  {
    icon: '💿',
    text: 'Перейти с MBR на GPT без потери данных можно через «mbr2gpt». После этого CSM можно отключать.',
  },
];

const CSMInfo = ({ styles }: { styles: Record<string, string> }) => (
  <ul className={styles.info_container}>
    {csmData.map((item, index) => (
      <li key={index} className={styles.info_item}>
        <span className={styles.info_icon}>{item.icon}</span>
        <span className={styles.info_text}>{item.text}</span>
      </li>
    ))}
  </ul>
);

export default CSMInfo;
