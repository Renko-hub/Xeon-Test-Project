const FanInfo = ({ styles }: any) => (
  <ul className={styles.info_container}>
    <li className={styles.info_item}>
      <span className={styles.info_icon}>🌡️</span>
      <span className={styles.info_text}>
        Temperature Tolerance (Гистерезис): ставьте 5-8. Это создаст «буфер», чтобы обороты не прыгали при каждом скачке на 1-2°.
      </span>
    </li>

    <li className={styles.info_item}>
      <span className={styles.info_icon}>📢</span>
      <span className={styles.info_text}>
        Полноценно управляются только 4-pin вентиляторы. 4-pin вертушка в 3-pin разъеме на китайцах всегда крутит на 100%.
      </span>
    </li>

    <li className={styles.info_item}>
      <span className={styles.info_icon}>🌀</span>
      <span className={styles.info_text}>
        На платах с активным охлаждением VRM их обороты настраиваются в BIOS по такой же схеме (если есть поддержка).
      </span>
    </li>

    <li className={styles.info_item}>
      <span className={styles.info_icon}>⚙️</span>
      <span className={styles.info_text}>
        Если нет реакции на настройки, убедитесь, что выбран режим «Smart Fan Control» или «Manual» вместо «Full Speed».
      </span>
    </li>
  </ul>
);

export default FanInfo;
