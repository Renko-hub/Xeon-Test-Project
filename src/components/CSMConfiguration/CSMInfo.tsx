const CSMInfo = ({ styles }: any) => (
  <ul className={styles.info_container}>
    <li className={styles.info_item}>
      <span className={styles.info_icon}>🔧</span>
      <span className={styles.info_text}>
        Если система не видит диск, включите CSM (Legacy). Это вернет видимость старых MBR-разделов.
      </span>
    </li>
    
    <li className={styles.info_item}>
      <span className={styles.info_icon}>🚀</span>
      <span className={styles.info_text}>
        Режим UEFI дает Fast Boot, поддержку дисков 2ТБ+, работу Re-Size BAR и совместимость с Windows 11.
      </span>
    </li>
    
    <li className={styles.info_item}>
      <span className={styles.info_icon}>⚠️</span>
      <span className={styles.info_text}>
        Для UEFI нужна GPT-разметка. При смене режима Windows в MBR не загрузится без конвертации или переустановки.
      </span>
    </li>
    
    <li className={styles.info_item}>
      <span className={styles.info_icon}>💿</span>
      <span className={styles.info_text}>
        Перейти с MBR на GPT без потери данных можно через «mbr2gpt». После этого CSM можно отключать.
      </span>
    </li>
  </ul>
);

export default CSMInfo;
