const RamInfo = ({ styles }: any) => (
  <ul className={styles.info_container}>
    
    <li className={styles.info_item}>
      <span className={styles.info_icon}>⚡</span>
      <span className={styles.info_text}>
        На X99 управление вольтажом как правило заблокировано (за исключением топовых плат)! 
        Но если всё же прошивка позволяет применять значения через BIOS, то запись делается целым числом: 
        120/135/145 — это 1.2 / 1.35 / 1.45 v. Значение 0 = Auto (1.2 v).
      </span>
    </li>

    <li className={styles.info_item}>
      <span className={styles.info_icon}>🧊</span>
      <span className={styles.info_text}>
        ПОМНИТЕ! Настройки вольтажа требуют наличие какого-либо охлаждения ОЗУ (радиаторы, Top-Flow кулер)! 
        Без этого плашки могут быстро деградировать.
      </span>
    </li>

    <li className={styles.info_item}>
      <span className={styles.info_icon}>⚠️</span>
      <span className={styles.info_text}>
        Специфика разводки mATX-плат часто искусственно ограничивает tRFC некоторых модулей ОЗУ. 
        Значение 328 является наиболее вероятным порогом, ниже которого такие модули попросту не стартуют.
      </span>
    </li>

    <li className={styles.info_item}>
      <span className={styles.info_icon}>📊</span>
      <span className={styles.info_text}>
        В 4-канале значение tRFC выше и ставится по самой медленной плашке. 
        Если нет старта — поднимите tRFC на 20-40 пунктов. 
        Режим 2N/2T чаще выбирается для стабильности (если система не стартует в 1N/1T).
      </span>
    </li>

    <li className={styles.info_item}>
      <span className={styles.info_icon}>🔋</span>
      <span className={styles.info_text}>
        Если ПК не стартует: выключите БП из розетки, вытащите батарейку 2032 
        или замкните контакты CLR_CMOS на 10 сек. перемычкой (отвёрткой).
      </span>
    </li>
    
  </ul>
);

export default RamInfo;
