const CSMInfo = (s) => (
  <ul className={s.info_container}>
    <li className={s.info_item}>
      <span className={s.info_icon}>💾</span>
      <span className={s.info_text}>
        Если система не видит диск, включите CSM (Legacy). Это вернет видимость
        старых MBR-разделов.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>⚡</span>
      <span className={s.info_text}>
        Режим UEFI дает Fast Boot, поддержку дисков 2ТБ+, работу Re-Size BAR и
        совместимость с Windows 11.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🛠️</span>
      <span className={s.info_text}>
        Для UEFI нужна GPT-разметка. При смене режима Windows в MBR не
        загрузится без конвертации или переустановки.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🔄</span>
      <span className={s.info_text}>
        Перейти с MBR на GPT без потери данных можно через «mbr2gpt». После
        этого CSM можно отключать.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🔊</span>
      <span className={s.info_text}>
        Перевод всей системы на UEFI может убрать писк бипера в прошивках с
        вырезанным бипером, если этот писк есть при старте системы после
        прошивки BIOS.
      </span>
    </li>
  </ul>
);

export default CSMInfo;
