import { useState } from "react";
import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import BiosData from "./AdvancedBios";
import Info from "./AdvancedInfo";
import Tools from "./AdvancedTools";

const AdvancedConfiguration = ({ selectedButton = "V3" }) => {
  const [param, setParam] = useState({ cpuGen: selectedButton });

  return (
    <>
      <Toolbox
        title="ADVANCED POWER CONFIGURATION"
        toolsLabel="НАСТРОЙКА ПИТАНИЯ"
        renderInfo={Info}
        renderTools={(props) => (
          <Tools {...props} param={param} setParam={setParam} />
        )}
      />

      <BiosWindow {...BiosData(param)} />
    </>
  );
};

export default AdvancedConfiguration;
