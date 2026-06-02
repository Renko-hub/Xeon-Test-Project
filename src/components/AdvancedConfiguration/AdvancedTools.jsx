import Button from "../Button/Button";

const AdvancedTools = ({ styles: s, param, setParam }) => {
  const { cpuGen } = param;

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ПОКОЛЕНИЕ CPU:</div>

      <div className={s.btn_group}>
        {["V2", "V3", "V4"].map((type) => (
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
        <span className={s.tools_icon}>⚙️</span>
        <p className={s.tools_text}>
          Для <b>V2</b>: максимальный множитель Uncore ограничен на уровне{" "}
          <b>24–28</b>. Выше этого предела частота кэша физически не поднимется.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>📈</span>
        <p className={s.tools_text}>
          Для <b>V3</b>: оптимальное и стабильное значение — <b>26</b> (2.6
          ГГц). Это стандартный рабочий лимит для большинства процессоров
          Haswell-EP.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>⚡</span>
        <p className={s.tools_text}>
          Для <b>V4</b> (Broadwell-EP): архитектура позволяет выставлять лимит
          до <b>56</b>. Это дает максимальную пропускную способность кольцевой
          шины.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>⚠️</span>
        <p className={s.tools_text}>
          Фиксация частоты в режиме <b>MANUAL</b> убирает микрофризы, но
          завышенные значения приведут к синему экрану (BSOD).
        </p>
      </div>
    </div>
  );
};

export default AdvancedTools;
