import Button from "../Button/Button";

const PowerTools = ({ styles: s, param, setParam }) => {
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
        <span className={s.tools_icon}>🔊</span>
        <p className={s.tools_text}>
          Настройки <b>C-States</b> могут снизить писк дросселей, но повысят
          потребление в простое на <b>10–20%</b>.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>⚙️</span>
        <p className={s.tools_text}>
          Для V2: <b>C0/C1 limit</b> и <b>Disabled</b> отчеты.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>💡</span>
        <p className={s.tools_text}>
          Для <b>Unlock Turbo Boost</b>: C3 [Enabled], C6 [Disabled].
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🚀</span>
        <p className={s.tools_text}>
          Для V4 рекомендуется полностью <b>выключить</b> энергосбережение.
        </p>
      </div>
    </div>
  );
};

export default PowerTools;
