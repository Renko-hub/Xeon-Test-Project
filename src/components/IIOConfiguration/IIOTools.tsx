import Button from "../Button/Button";
import { PciButtonType } from "../Button/Button.config";

const IIOTools = ({ state, setParam, styles: s }: any) => {
  const { pcieGen } = state;

  const renderButton = (type: PciButtonType) => (
    <Button
      type={type}
      isActive={pcieGen === type}
      onClick={() => setParam("pcieGen", type)}
      className={s.tools_button}
    />
  );

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ПОРТЫ PCI-E:</div>

      <div className={s.btn_group}>
        {renderButton("gen_2")}
        {renderButton("gen_3")}
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>💡</span>
        <p className={s.tools_text}>
          Настройка влияет на пропускную способность шины.
        </p>
      </div>

      {pcieGen === "gen_2" && (
        <div className={s.tools_item}>
          <span className={s.tools_icon}>⚠️</span>
          <p className={s.tools_text}>
            <b>Gen 2</b> может потребоваться для стабильности старых устройств.
          </p>
        </div>
      )}

      {pcieGen === "gen_3" && (
        <div className={s.tools_item}>
          <span className={s.tools_icon}>🚀</span>
          <p className={s.tools_text}>
            <b>Gen 3</b> рекомендуется для современных видеокарт и NVMe.
          </p>
        </div>
      )}
    </div>
  );
};

export default IIOTools;
