const powerData = [
  {
    icon: '🚀',
    text: 'Для стабильного Анлока Турбобуста обязательно отключайте состояние C6 (C6 Offline / Un-demote).',
  },
  {
    icon: '🕹️',
    text: 'На процессорах V4 отключение C3 снижает микрозадержки и делает график Frame Time ровнее.',
  },
  {
    icon: '📜',
    text: 'Для V2 лучше оставить сток (No Limit), чтобы сохранить высокую частоту на одно ядро.',
  },
  {
    icon: '⚡',
    text: 'Если частоты не падают в простое, проверьте схему питания Windows (рекомендуется «Высокая производительность»).',
  },
];

const PowerInfo = ({ styles }: { styles: Record<string, string> }) => (
  <ul className={styles.info_container}>
    {powerData.map((item, index) => (
      <li key={index} className={styles.info_item}>
        <span className={styles.info_icon}>{item.icon}</span>
        <span className={styles.info_text}>{item.text}</span>
      </li>
    ))}
  </ul>
);

export default PowerInfo;
