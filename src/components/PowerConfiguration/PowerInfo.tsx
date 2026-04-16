const PowerInfo = ({ styles }: any) => (
  <ul className={styles.info_container}>
    <li className={styles.info_item}>
      <span className={styles.info_icon}>🚀</span>
      <span className={styles.info_text}>
        Для стабильного Анлока Турбобуста обязательно отключайте состояние C6 (C6 Offline / Un-demote).
      </span>
    </li>
    
    <li className={styles.info_item}>
      <span className={styles.info_icon}>🕹️</span>
      <span className={styles.info_text}>
        На процессорах V4 отключение C3 снижает микрозадержки и делает график Frame Time ровнее.
      </span>
    </li>
    
    <li className={styles.info_item}>
      <span className={styles.info_icon}>📜</span>
      <span className={styles.info_text}>
        Для V2 лучше оставить сток (No Limit), чтобы сохранить высокую частоту на одно ядро.
      </span>
    </li>
    
    <li className={styles.info_item}>
      <span className={styles.info_icon}>⚡</span>
      <span className={styles.info_text}>
        Если частоты не падают в простое, проверьте схему питания Windows (рекомендуется «Высокая производительность»).
      </span>
    </li>
  </ul>
);

export default PowerInfo;
