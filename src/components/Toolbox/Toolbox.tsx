import clsx from "clsx";
import { ReactNode, useState } from "react";
import Button from "../Button/Button";

import s from "./Toolbox.module.css";
import infoS from "./styles/Info.module.css";
import toolsS from "./styles/Tools.module.css";

interface ToolboxProps {
  initialState?: any;
  title: ReactNode | ((p: any) => ReactNode);
  toolsLabel: string;
  renderInfo?: (styles: Record<string, string>) => ReactNode;
  renderTools?: (p: any) => ReactNode;
  children?: ReactNode | ((p: any) => ReactNode);
}

const styles = { ...infoS, ...toolsS };

const Toolbox = ({
  initialState,
  title,
  toolsLabel,
  renderInfo,
  renderTools,
  children,
}: ToolboxProps) => {
  const [state, setState] = useState(initialState);
  const [tab, setTab] = useState<"info" | "tools">("info");

  const update = (patch: any) =>
    setState((prev: any) => ({ ...prev, ...patch }));

  const p = {
    state,
    setState,
    update,
    setParam: (key: string, val: any) =>
      update({ [key]: val, lastChangedKey: key }),
    styles,
  };

  return (
    <>
      <div className={s.toolbox_container}>
        <h1 className={clsx(s.toolbox_title, s[`${tab}_active`])}>
          {typeof title === "function" ? title(p) : title}
        </h1>

        <div className={s.toolbox_tabs}>
          <Button
            type="warning"
            isActive={tab === "info"}
            onClick={() => setTab("info")}
          />
          <Button
            type="tools"
            isActive={tab === "tools"}
            onClick={() => setTab("tools")}
            label={toolsLabel}
          />
        </div>

        <div className={clsx(s.toolbox_card, s[`${tab}_border`])}>
          {tab === "info" ? renderInfo?.(styles) : renderTools?.(p)}
        </div>
      </div>

      {typeof children === "function" ? children(p) : children}
    </>
  );
};

export default Toolbox;
