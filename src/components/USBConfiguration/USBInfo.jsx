import React from "react";

const USBInfo = (s) => (
  <ul className={s.info_container}>
    <li className={s.info_item}>
      <span className={s.info_icon}>🖥️</span>
      <span className={s.info_text}>
        <b>Специфика платформ X79 / X99:</b> Данный раздел BIOS управляет
        логикой работы встроенных контроллеров USB от Intel и сторонних чипов
        (ASMedia). Настройка одинаково актуальна как для сокета LGA2011, так и
        для LGA2011-3.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🔌</span>
      <span className={s.info_text}>
        <b>Инициализация и совместимость:</b> Раздел отвечает за корректное
        определение флешек и клавиатур до старта ОС (в самом BIOS или в
        загрузчиках). Это критически важно на китайских материнских платах для
        беспроблемной установки Windows.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🤝</span>
      <span className={s.info_text}>
        <b>Решение проблем:</b> На X79/X99 часто возникают конфликты таймингов
        при инициализации старых USB-устройств. Тонкая настройка параметров
        Hand-off и задержек предотвращает зависание системы на этапе POST-кодов.
      </span>
    </li>
  </ul>
);

export default USBInfo;
