import React from "react";

const AdvancedInfo = (s) => (
  <ul className={s.info_container}>
    <li className={s.info_item}>
      <span className={s.info_icon}>🧠</span>
      <span className={s.info_text}>
        Частота <b>Uncore (Cache)</b> напрямую влияет на скорость обмена данными
        между ядрами процессора, L3-кэшем и оперативной памятью.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🔄</span>
      <span className={s.info_text}>
        В режиме <b>MANUAL</b> частота кэша фиксируется на одном значении. Это
        предотвращает её сброс в простое, снижает общие задержки (latency) и
        убирает статтеры в играх.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🛡️</span>
      <span className={s.info_text}>
        Фиксация частоты кольцевой шины безопасна для процессора, но при
        появлении синих экранов (BSOD) в тяжелых задачах этот параметр стоит
        вернуть в значение <b>AUTO</b>.
      </span>
    </li>
  </ul>
);

export default AdvancedInfo;
