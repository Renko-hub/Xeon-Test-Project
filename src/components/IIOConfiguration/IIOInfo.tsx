const IIOInfo = ({ styles }: any) => (
  <ul className={styles.info_container}>
    <li className={styles.info_item}>
      <span className={styles.info_icon}>⚡</span>
      <span className={styles.info_text}>
        Фиксация режима GEN 3 помогает избежать ошибок Link Training Error.
      </span>
    </li>
    
    <li className={styles.info_item}>
      <span className={styles.info_icon}>🛠️</span>
      <span className={styles.info_text}>
        Для старых карт (HD 7000, GTX 600 и старше) принудительно ставьте GEN 2.
      </span>
    </li>
    
    <li className={styles.info_item}>
      <span className={styles.info_icon}>✨</span>
      <span className={styles.info_text}>
        Если устройства «отваливаются» — протрите контакты разъемов ластиком.
      </span>
    </li>
    
    <li className={styles.info_item}>
      <span className={styles.info_icon}>🧬</span>
      <span className={styles.info_text}>
        Для нескольких NVMe используйте разделение линий (Bifurcation x4x4x4x4).
      </span>
    </li>
  </ul>
);

export default IIOInfo;
