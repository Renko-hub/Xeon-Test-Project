import PCIGuide from "./PCIGuide/PCIGuide";

const PCITools = ({ styles: s }) => (
  <div className={`${s.tools_container} ${s.comboStyle}`}>
    <PCIGuide />

    <div className={`${s.tools_label} ${s.pci_label_spacing}`}>
      ВАЖНЫЕ ПРИМЕЧАНИЯ:
    </div>

    <div className={s.tools_item}>
      <span className={s.tools_icon}>💎</span>
      <span className={s.tools_text}>
        <b>СУТЬ ТЕХНОЛОГИИ:</b> Снимает лимит адресации в 256 МБ и открывает
        процессору прямой доступ ко всему объёму видеопамяти, увеличивая
        кадровую частоту в играх.
      </span>
    </div>

    <div className={s.tools_item}>
      <span className={s.tools_icon}>🚫</span>
      <span className={s.tools_text}>
        На процессорах <b>Xeon v1/v2 (LGA2011)</b> Re-Size BAR НЕ РАБОТАЕТ на
        уровне микрокода чипа.
      </span>
    </div>
  </div>
);

export default PCITools;
