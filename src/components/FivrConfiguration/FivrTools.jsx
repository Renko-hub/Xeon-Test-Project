import Button from "../Button/Button";

const FivrTools = ({ styles: s, param, setParam }) => {
  const { cpuGen = "V3" } = param;

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ПОКОЛЕНИЕ CPU:</div>

      <div className={s.btn_group}>
        {["V3", "V4"].map((type) => (
          <Button
            key={type}
            type={type}
            isActive={cpuGen === type}
            className={s.tools_button}
            onClick={() => setParam((p) => ({ ...p, cpuGen: type }))}
          />
        ))}
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🚀</span>
        <p className={s.tools_text}>
          Параметр <b>FIVR Efficiency Management</b> в режиме <b>Disabled</b>{" "}
          отключает энергосбережение внутреннего регулятора, стабилизируя
          напряжение ядер под резкими скачками игровой нагрузки.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>📉</span>
        <p className={s.tools_text}>
          Для <b>V3 (Haswell-EP)</b>: шина SVID остается включенной для
          точечного управления смещением напряжения (андервольтинга) через
          модифицированный драйвер или BIOS при анлоке турбобуста.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>⚡</span>
        <p className={s.tools_text}>
          Для <b>V4 (Broadwell-EP)</b>: перевод <b>SVID Support</b> в{" "}
          <b>Disabled</b> полностью отключает внешнюю телеметрию питания. Это
          убирает строку переопределения вольтажа, фиксируя стабильный VCCin.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>⚠️</span>
        <p className={s.tools_text}>
          Отключение SVID на процессорах V4 — стандартная практика для обхода
          жестких лимитов тока (Power Limit), встроенных в микрокод архитектуры
          Broadwell-EP китайскими производителями плат.
        </p>
      </div>
    </div>
  );
};

export default FivrTools;
