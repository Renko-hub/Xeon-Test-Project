const IIOInfo = (s: Record<string, string>) => (
  <ul className={s.info_container}>
    <li className={s.info_item}>
      <span className={s.info_icon}>⚡</span>
      <span className={s.info_text}>
        Фиксация режима GEN 3 помогает избежать ошибок Link Training Error.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🛠️</span>
      <span className={s.info_text}>
        Для старых карт (HD 7000, GTX 600 и старше) принудительно ставьте GEN 2.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>⚠️</span>
      <span className={s.info_text}>
        Если устройства «отваливаются» — протрите контакты разъемов ластиком.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🧬</span>
      <span className={s.info_text}>
        Для нескольких NVMe используйте разделение линий (Bifurcation x4x4x4x4).
      </span>
    </li>
  </ul>
);

export default IIOInfo;
