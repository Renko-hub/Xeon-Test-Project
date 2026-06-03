import React from "react";

const MemoryInfo = (s) => (
  <ul className={s.info_container}>
    <li className={s.info_item}>
      <span className={s.info_icon}>🚀</span>
      <span className={s.info_text}>
        Параметры <b>Attempt Fast Boot</b> и <b>Cold Boot</b> принудительно
        включены. Они пропускают долгую 15-минутную тренировку контактов при
        каждом перезапуске платформ X99.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🧠</span>
      <span className={s.info_text}>
        В режиме <b>DESKTOP</b> функция <b>Data Scrambling</b> переводится в
        состояние <b>Disabled</b>. Это убирает лишние циклы шифрования бит и
        напрямую снижает общие задержки (latency) памяти.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🛡️</span>
      <span className={s.info_text}>
        В режиме <b>ECC REG</b> скремблирование переключается в <b>Enabled</b>.
        Это гасит перекрестные электромагнитные наводки между рангами тяжелых
        многочиповых серверных модулей под нагрузкой.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🔄</span>
      <span className={s.info_text}>
        Если ВСЕ параметры в вашем BIOS изначально стоят в режиме <b>AUTO</b>,
        то принципиально важные опции из таблицы необходимо вручную перевести в{" "}
        <b>Enable</b> или <b>Disable</b>.
      </span>
    </li>
  </ul>
);

export default MemoryInfo;
