import Button from "../Button/Button";

const IIOTools = ({ styles: s, param, setParam }) => {
  const { pciGen } = param;

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ПОРТЫ PCI-E:</div>

      <div className={s.btn_group}>
        {["gen_2", "gen_3"].map((type) => (
          <Button
            key={type}
            type={type}
            isActive={pciGen === type}
            className={s.tools_button}
            onClick={() => setParam((p) => ({ ...p, pciGen: type }))}
          />
        ))}
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>💡</span>
        <p className={s.tools_text}>
          Настройка влияет на пропускную способность шины.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>⚠️</span>
        <p className={s.tools_text}>
          <b>Gen 2</b> может потребоваться для стабильности старых устройств.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🚀</span>
        <p className={s.tools_text}>
          <b>Gen 3</b> рекомендуется для современных видеокарт и NVMe.
        </p>
      </div>
    </div>
  );
};

export default IIOTools;
