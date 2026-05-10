const iioData = [
  {
    icon: '⚡',
    text: 'Фиксация режима GEN 3 помогает избежать ошибок Link Training Error.',
  },
  {
    icon: '🛠️',
    text: 'Для старых карт (HD 7000, GTX 600 и старше) принудительно ставьте GEN 2.',
  },
  {
    icon: '✨',
    text: 'Если устройства «отваливаются» — протрите контакты разъемов ластиком.',
  },
  {
    icon: '🧬',
    text: 'Для нескольких NVMe используйте разделение линий (Bifurcation x4x4x4x4).',
  },
];

const IIOInfo = ({ styles }: { styles: Record<string, string> }) => (
  <ul className={styles.info_container}>
    {iioData.map((item, index) => (
      <li key={index} className={styles.info_item}>
        <span className={styles.info_icon}>{item.icon}</span>
        <span className={styles.info_text}>{item.text}</span>
      </li>
    ))}
  </ul>
);

export default IIOInfo;
