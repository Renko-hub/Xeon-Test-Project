import React, { useState } from "react";
import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import RamBios from "./RamBios";
import Info from "./RamInfo";
import Tools from "./RamTools";
import UltraAlert from "../UltraAlert/UltraAlert";

const RamConfiguration = ({ selectedButton }) => {
  const [param, setParam] = useState({
    board: "atx",
    gen: "V2",
    memory: "desktop",
    density: "no",
    slot: "slots1",
    preset: "safe",
    ramSize: 4,
    ...selectedButton,
  });

  return (
    <>
      <Toolbox
        title={<UltraAlert state={param} update={setParam} />}
        toolsLabel="КАЛЬКУЛЯТОР ТАЙМИНГОВ"
        renderInfo={Info}
        renderTools={(props) => (
          <Tools {...props} param={param} setParam={setParam} />
        )}
      />

      <BiosWindow {...RamBios(param, setParam)} />
    </>
  );
};

export default RamConfiguration;
