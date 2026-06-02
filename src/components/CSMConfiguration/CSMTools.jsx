import Button from "../Button/Button";

const CSMTools = ({ styles: s, param, setParam }) => {
  const { partition } = param;

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ТИП РАЗМЕТКИ ДИСКА:</div>

      <div className={s.btn_group}>
        {["mbr", "gpt"].map((type) => (
          <Button
            key={type}
            type={type}
            isActive={partition === type}
            className={s.tools_button}
            onClick={() => setParam((p) => ({ ...p, partition: type }))}
          />
        ))}
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🛠️</span>
        <p className={s.tools_text}>
          При смене стиля не забудьте переключить режим <b>CSM</b> в BIOS.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>⚠️</span>
        <p className={s.tools_text}>
          <b>MBR</b> ограничен 2 ТБ и требует <b>CSM Support Enabled</b>.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>⚙️</span>
        <p className={s.tools_text}>
          <b>GPT</b> необходим для <b>UEFI</b> и <b>Re-Size BAR</b>.
        </p>
      </div>
    </div>
  );
};

export default CSMTools;
