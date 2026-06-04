import { useState } from "react";
import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import BiosData from "./CSMBios";
import Info from "./CSMInfo";
import Tools from "./CSMTools";

const CSMConfiguration = ({ selectedButton = "mbr" }) => {
  const [param, setParam] = useState({ partition: selectedButton });

  return (
    <>
      <Toolbox
        title="CSM CONFIGURATION"
        toolsLabel="DISK MODE"
        renderInfo={Info}
        renderTools={(props) => (
          <Tools {...props} param={param} setParam={setParam} />
        )}
      />

      <BiosWindow {...BiosData(param)} />
    </>
  );
};

export default CSMConfiguration;
