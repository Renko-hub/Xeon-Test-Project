const pciData = [
  {
    icon: '💎',
    text: 'Разблокирует адресацию видеопамяти выше 4 ГБ. Нужно для Re-Size BAR и новых GPU (RTX 30+).',
  },
  {
    icon: '🔍',
    text: 'Появится только после активации «4G Decoding» в настройках PCIe.',
  },
  {
    icon: '🚫',
    text: 'Недоступно на Xeon E5 v1/v2. Re-Size BAR требует GPT-разметку и отключение CSM.',
  },
  {
    icon: '🛠️',
    text: 'Проверьте статус «Enabled» в GPU-Z после настройки BIOS.',
  },
];

const PCIInfo = ({ styles }: { styles: Record<string, string> }) => (
  <ul className={styles.info_container}>
    {pciData.map((item, index) => (
      <li key={index} className={styles.info_item}>
        <span className={styles.info_icon}>{item.icon}</span>
        <span className={styles.info_text}>{item.text}</span>
      </li>
    ))}
  </ul>
);

export default PCIInfo;
