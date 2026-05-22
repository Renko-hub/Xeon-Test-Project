import Button from "../Button/Button";
import { DiskButtonType } from "../Button/Button.config";

const CSMTools = ({ state, setParam, styles: s }: any) => {
  const { diskMode } = state;

  const renderButton = (type: DiskButtonType) => (
    <Button
      type={type}
      isActive={diskMode === type}
      onClick={() => setParam("diskMode", type)}
      className={s.tools_button}
    />
  );

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ТИП РАЗМЕТКИ ДИСКА:</div>

      <div className={s.btn_group}>
        {renderButton("mbr")}
        {renderButton("gpt")}
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🛠️</span>
        <p className={s.tools_text}>
          При смене стиля не забудьте переключить режим <b>CSM</b> в BIOS.
        </p>
      </div>

      {diskMode === "mbr" && (
        <div className={s.tools_item}>
          <span className={s.tools_icon}>⚠️</span>
          <p className={s.tools_text}>
            <b>MBR</b> ограничен 2ТБ и требует <b>CSM Support</b> [Enabled].
          </p>
        </div>
      )}

      {diskMode === "gpt" && (
        <div className={s.tools_item}>
          <span className={s.tools_icon}>⚙️</span>
          <p className={s.tools_text}>
            <b>GPT</b> необходим для <b>UEFI</b> и <b>Re-Size BAR</b>.
          </p>
        </div>
      )}
    </div>
  );
};

export default CSMTools;
