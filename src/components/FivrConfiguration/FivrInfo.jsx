import React from "react";

const FivrInfo = (s) => (
  <ul className={s.info_container}>
    <li className={s.info_item}>
      <span className={s.info_icon}>🧠</span>
      <span className={s.info_text}>
        <b>FIVR</b> самостоятельно распределяет точные токи внутри процессора.
        Значение <b>CPU VCCin Voltage Level [359]</b> — это заводской индекс,
        который задает базовое входное напряжение около <b>1.8–1.9 В</b>,
        поступающее от VRM материнской платы.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>📡</span>
      <span className={s.info_text}>
        Протокол <b>SVID</b> (Serial Voltage Identification) — это цифровая
        шина, по которой процессор запрашивает у внешней схемы питания платы
        изменение вольтажа в зависимости от текущей частоты.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>⚙️</span>
      <span className={s.info_text}>
        Отключение SVID на архитектуре V4 изолирует внутренний регулятор FIVR от
        внешних ограничений теплопакета платы, позволяя удерживать максимальные
        частоты без сброса под нагрузкой.
      </span>
    </li>
  </ul>
);

export default FivrInfo;
