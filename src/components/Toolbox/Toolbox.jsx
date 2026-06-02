import clsx from "clsx";
import Button from "../Button/Button";
import useTab from "./hooks/useTab";
import Info from "./Info/Info";
import Tools from "./Tools/Tools";
import s from "./Toolbox.module.css";

const Toolbox = ({ title, toolsLabel, renderInfo, renderTools }) => {
  const { isInfo, isTools, setInfo, setTools } = useTab();

  return (
    <div className={s.toolbox_container}>
      <h1
        className={clsx(
          s.toolbox_title,
          isInfo ? s.info_active : s.tools_active,
        )}
      >
        {title}
      </h1>

      <div className={s.toolbox_tabs}>
        <Button type="warning" isActive={isInfo} onClick={setInfo} />
        <Button
          type="tools"
          isActive={isTools}
          onClick={setTools}
          label={toolsLabel}
        />
      </div>

      {isInfo ? (
        <Info
          cardClass={clsx(s.toolbox_card, s.info_border)}
          renderInfo={renderInfo}
        />
      ) : (
        <Tools
          cardClass={clsx(s.toolbox_card, s.tools_border)}
          renderTools={renderTools}
        />
      )}
    </div>
  );
};

export default Toolbox;
