import React from "react";

const AboutInfo = (s) => (
  <ul className={s.info_container}>
    <li className={s.info_item}>
      <span className={s.info_icon}>👤</span>
      <span className={s.info_text}>
        <b>О проекте:</b> Полностью сольная разработка. При помощи AI и в
        соавторстве с нейросетями я проектировал сложную внутреннюю логику
        приложения, упаковывая её в простые и чистые модульные компоненты. Через
        GitHub Actions настроена автоматическая сборка Android APK.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>⚙️</span>
      <span className={s.info_text}>
        <b>Стек:</b> HTML5, CSS3 (Modules), JavaScript (ES6+), TypeScript, React
        (Hooks), Redux Toolkit, Router v6, Vite, CI/CD (GitHub Actions, сборка
        Android APK).
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>💼</span>
      <span className={s.info_text}>
        <b>Открыт к предложениям:</b> Также на данный момент по сложившимся
        жизненным обстоятельствам ищу удалённый формат работы на full-time. Есть
        опыт коммерческой разработки (контрактная разработка).
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🧠</span>
      <span className={s.info_text}>
        <b>Бэкграунд:</b> Высшее образование и большой практический опыт работы
        с компьютерными системами, низкоуровневым софтом и архитектурами.
        Структурное мышление и умение читать чужой код.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>💬</span>
      <span className={s.info_text}>
        <b>Контакты:</b>{" "}
        <a
          href="https://github.com/Renko-hub"
          target="_blank"
          rel="noreferrer"
          className={s.info_link}
        >
          GitHub
        </a>{" "}
        | whiterockdi@gmail.com
      </span>
    </li>
  </ul>
);

export default AboutInfo;
