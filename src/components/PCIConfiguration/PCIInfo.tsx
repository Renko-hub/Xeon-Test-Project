const PCIInfo = ({ styles }: any) => (
  <ul className={styles.info_container}>
    <li className={styles.info_item}>
      <span className={styles.info_icon}>💎</span>
      <span className={styles.info_text}>
        Разблокирует адресацию видеопамяти выше 4 ГБ. Нужно для Re-Size BAR и новых GPU (RTX 30+).
      </span>
    </li>
    
    <li className={styles.info_item}>
      <span className={styles.info_icon}>🔍</span>
      <span className={styles.info_text}>
        Появится только после активации «4G Decoding» в настройках PCIe.
      </span>
    </li>
    
    <li className={styles.info_item}>
      <span className={styles.info_icon}>🚫</span>
      <span className={styles.info_text}>
        Недоступно на Xeon E5 v1/v2. Re-Size BAR требует GPT-разметку и отключение CSM.
      </span>
    </li>
    
    <li className={styles.info_item}>
      <span className={styles.info_icon}>🛠️</span>
      <span className={styles.info_text}>
        Проверьте статус «Enabled» в GPU-Z после настройки BIOS.
      </span>
    </li>
  </ul>
);

export default PCIInfo;
