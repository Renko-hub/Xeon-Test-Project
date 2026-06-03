import React, { useState } from "react";
import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import timingEngine from "../TimingEngine/timingEngine.js";
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
    history: {
      V2: { cpu: "", ramSize: 4 },
      V3: { cpu: "", ramSize: 16 },
      V4: { cpu: "", ramSize: 16 },
    },
    ...selectedButton,
  });

  const { updateParam } = timingEngine(param);
  const change = updateParam(setParam);

  const biosData = RamBios(param, param, change);

  return (
    <>
      <Toolbox
        title={<UltraAlert state={param} update={setParam} />}
        toolsLabel="КАЛЬКУЛЯТОР ТАЙМИНГОВ"
        renderInfo={Info}
        renderTools={(props) => (
          <Tools {...props} param={param} setParam={setParam} change={change} />
        )}
      />

      <BiosWindow
        title={biosData.title}
        path={biosData.path}
        content={biosData.content}
        state={param}
        update={change}
      />
    </>
  );
};

export default RamConfiguration;
