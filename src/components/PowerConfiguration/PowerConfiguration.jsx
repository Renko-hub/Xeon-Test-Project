import { useState } from "react";
import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import BiosData from "./PowerBios";
import Info from "./PowerInfo";
import Tools from "./PowerTools";

const PowerConfiguration = ({ selectedButton = "V2" }) => {
  const [param, setParam] = useState({ cpuGen: selectedButton });

  return (
    <>
      <Toolbox
        title="POWER MANAGMENT"
        toolsLabel="ПРЕСЕТ CPU"
        renderInfo={Info}
        renderTools={(props) => (
          <Tools {...props} param={param} setParam={setParam} />
        )}
      />

      <BiosWindow {...BiosData(param)} />
    </>
  );
};

export default PowerConfiguration;
