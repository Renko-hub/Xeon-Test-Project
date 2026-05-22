import Button from "../Button/Button";
import { GenButtonType } from "../Button/Button.config";

const PowerTools = ({ state, setParam, styles: s }: any) => {
  const { powerLevel } = state;

  const renderButton = (type: GenButtonType) => (
    <Button
      type={type}
      isActive={powerLevel === type}
      onClick={() => setParam("powerLevel", type)}
      className={s.tools_button}
    />
  );

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ПОКОЛЕНИЕ CPU:</div>

      <div className={s.btn_group}>
        {renderButton("V2")}
        {renderButton("V3")}
        {renderButton("V4")}
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🔊</span>
        <p className={s.tools_text}>
          Настройки <b>C-States</b> могут снизить писк дросселей, но повысят
          потребление в простое на <b>10–20%</b>.
        </p>
      </div>

      {powerLevel === "V2" && (
        <div className={s.tools_item}>
          <span className={s.tools_icon}>⚙️</span>
          <p className={s.tools_text}>
            Для V2: <b>C0/C1 limit</b> и <b>Disabled</b> отчеты.
          </p>
        </div>
      )}

      {powerLevel === "V3" && (
        <div className={s.tools_item}>
          <span className={s.tools_icon}>💡</span>
          <p className={s.tools_text}>
            Для <b>Unlock Turbo Boost</b>: C3 [Enabled], C6 [Disabled].
          </p>
        </div>
      )}

      {powerLevel === "V4" && (
        <div className={s.tools_item}>
          <span className={s.tools_icon}>🚀</span>
          <p className={s.tools_text}>
            Для V4 рекомендуется полностью <b>выключить</b> энергосбережение.
          </p>
        </div>
      )}
    </div>
  );
};

export default PowerTools;
