import clsx from "clsx";
import PCIGuide from "./PCIGuide/PCIGuide";

const PCITools = ({
  styles: mainStyles,
}: {
  styles: Record<string, string>;
}) => (
  <div className={clsx(mainStyles.tools_container, mainStyles.comboStyle)}>
    <PCIGuide />

    <div className={clsx(mainStyles.tools_label, mainStyles.pci_label_spacing)}>
      ВАЖНЫЕ ПРИМЕЧАНИЯ:
    </div>

    <div className={mainStyles.tools_item}>
      <span className={mainStyles.tools_icon}>💎</span>
      <span className={mainStyles.tools_text}>
        <b>СУТЬ ТЕХНОЛОГИИ:</b> Снимает лимит адресации в 256 МБ и открывает
        процессору прямой доступ ко всему объёму видеопамяти, увеличивая
        кадровую частоту в играх.
      </span>
    </div>

    <div className={mainStyles.tools_item}>
      <span className={mainStyles.tools_icon}>🚫</span>
      <span className={mainStyles.tools_text}>
        На процессорах <b>Xeon v1/v2 (LGA2011)</b> Re-Size BAR не работает на
        уровне микрокода чипа.
      </span>
    </div>
  </div>
);

export default PCITools;
