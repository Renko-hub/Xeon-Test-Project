const fanData = [
  {
    icon: '🌡️',
    text: 'Temperature Tolerance (Гистерезис): ставьте 5-8. Это создаст «буфер», чтобы обороты не прыгали при каждом скачке на 1-2°.',
  },
  {
    icon: '📢',
    text: 'Полноценно управляются только 4-pin вентиляторы. 4-pin вертушка в 3-pin разъеме на китайцах всегда крутит на 100%.',
  },
  {
    icon: '🌀',
    text: 'На платах с активным охлаждением VRM их обороты настраиваются в BIOS по такой же схеме (если есть поддержка).',
  },
  {
    icon: '⚙️',
    text: 'Если нет реакции на настройки, убедитесь, что выбран режим «Smart Fan Control» или «Manual» вместо «Full Speed».',
  },
];

const FanInfo = ({ styles }: { styles: Record<string, string> }) => (
  <ul className={styles.info_container}>
    {fanData.map((item, index) => (
      <li key={index} className={styles.info_item}>
        <span className={styles.info_icon}>{item.icon}</span>
        <span className={styles.info_text}>{item.text}</span>
      </li>
    ))}
  </ul>
);

export default FanInfo;
