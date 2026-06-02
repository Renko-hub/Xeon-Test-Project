const PCIInfo = (s) => (
  <ul className={s.info_container}>
    <li className={s.info_item}>
      <span className={s.info_icon}>🚀</span>
      <span className={s.info_text}>
        <strong>Суть технологии:</strong> Снимает лимит адресации в 256 МБ и
        открывает процессору прямой доступ ко всему объёму видеопамяти,
        увеличивая кадровую частоту в играх до 12-16%.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>⚙️</span>
      <span className={s.info_text}>
        <strong>Аппаратная база:</strong> Официально технология поддерживается
        графическими процессорами NVIDIA GeForce RTX 3000 / 4000 (а также Turing
        GTX 1660 / RTX 2000 через специальный драйвер NvStrapsReBar) и AMD
        Radeon RX 6000 / 7000.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>⚠️</span>
      <span className={s.info_text}>
        <strong>Процессорные лимиты:</strong> Старые серверные платформы вроде
        Intel Xeon E5 v1 и v2 аппаратно не поддерживают адресацию выше 4 ГБ на
        уровне микрокода чипа. Модификация возможна только на поколениях Xeon v3
        и v4.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>🛠️</span>
      <span className={s.info_text}>
        <strong>Условие интеграции:</strong> Если на китайской плате отсутствует
        поддержка на уровне UEFI-драйверов материнки, в дамп прошивки
        предварительно внедряют сторонний драйвер <code>ReBarDxe.ffs</code> с
        помощью утилиты <code>UEFITool</code>. Многие кастомные прошивки уже
        содержат необходимые микрокоды.
      </span>
    </li>
  </ul>
);

export default PCIInfo;
