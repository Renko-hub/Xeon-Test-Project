import { useState } from "react";
import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import FivrBiosData from "./FivrBios";
import Info from "./FivrInfo";
import Tools from "./FivrTools";

const FivrConfiguration = () => {
  // Инициализируем стейт поколения процессора по умолчанию на V3
  const [param, setParam] = useState({ cpuGen: "V3" });

  return (
    <>
      <Toolbox
        title="CPU FIVR CONFIGURATION"
        toolsLabel="УПРАВЛЕНИЕ ПИТАНИЕМ FIVR"
        renderInfo={Info}
        renderTools={(props) => (
          <Tools {...props} param={param} setParam={setParam} />
        )}
      />

      <BiosWindow {...FivrBiosData(param)} />
    </>
  );
};

export default FivrConfiguration;
