import clsx from "clsx";
import PWMList from "./PWMList/PWMList";

const FanTools = ({ styles: mainStyles }) => (
  <div className={clsx(mainStyles.tools_container, mainStyles.comboStyle)}>
    <PWMList />

    <div className={mainStyles.tools_item}>
      <span className={mainStyles.tools_icon}>💡</span>
      <p className={mainStyles.tools_text}>
        Настройте эти точки в BIOS для оптимального баланса шума и температур.
      </p>
    </div>
  </div>
);

export default FanTools;
