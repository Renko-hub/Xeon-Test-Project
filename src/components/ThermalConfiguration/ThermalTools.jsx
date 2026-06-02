const ThermalTools = ({ styles: s }) => {
  return (
    <div className={s.tools_container}>
      <div className={s.tools_item}>
        <span className={s.tools_icon}>🚀</span>
        <p className={s.tools_text}>
          Пункт <b>Memory Power Savings Mode</b> переведен в <b>Disabled</b>,
          чтобы запретить контроллеру памяти снижать напряжение и «усыплять»
          фазы питания в простое. Это убирает микрофризы и стабилизирует
          фреймрейт.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>⏱️</span>
        <p className={s.tools_text}>
          Отключение энергосбережения удерживает линии передачи данных в
          постоянной готовности. Это существенно снижает общую задержку памяти (
          <b>Latency</b>) при обращении процессора к кэшу.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🌡️</span>
        <p className={s.tools_text}>
          Остальные параметры оставлены в <b>Auto / CLTT</b>. Аппаратный
          троттлинг по датчикам безопасности продолжает работать в штатном
          режиме, защищая плашки от случайного перегрева под нагрузкой.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>⚠️</span>
        <p className={s.tools_text}>
          Если оставить этот режим включенным, серверные алгоритмы экономии
          электричества будут постоянно дергать частоты шины памяти, создавая
          статтеры в играх и рабочих приложениях.
        </p>
      </div>
    </div>
  );
};

export default ThermalTools;
