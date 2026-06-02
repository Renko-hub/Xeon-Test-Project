import React from "react";

const ThermalInfo = (s) => (
  <ul className={s.info_container}>
    <li className={s.info_item}>
      <span className={s.info_icon}>⚡</span>
      <span className={s.info_text}>
        Серверные платформы по умолчанию агрессивно экономят энергию. Функции{" "}
        <b>Power Savings</b> динамически отключают неиспользуемые блоки памяти,
        что критично для дата-центров, но вредно для домашнего ПК.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>📉</span>
      <span className={s.info_text}>
        Включение любых режимов энергосбережения памяти заставляет систему
        тратить драгоценные наносекунды на «пробуждение» контроллера, из-за чего
        резко падает плавность картинки в задачах реального времени.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🛡️</span>
      <span className={s.info_text}>
        Полное отключение сбережения питания при сохранении заводских лимитов
        троттлинга (<b>CLTT</b>) — это самый грамотный способ выжать из памяти
        максимум скорости без риска её перегреть или испортить.
      </span>
    </li>
  </ul>
);

export default ThermalInfo;
