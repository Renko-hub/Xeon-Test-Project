import { useState } from "react";
import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import BiosData from "./IIOBios";
import Info from "./IIOInfo.jsx";
import Tools from "./IIOTools";

const IIOConfiguration = ({ selectedButton = "gen_2" }) => {
  const [param, setParam] = useState({ pciGen: selectedButton });

  return (
    <>
      <Toolbox
        title="IIO CONFIGURATOR"
        toolsLabel="PCI-E PORTS"
        renderInfo={Info}
        renderTools={(props) => (
          <Tools {...props} param={param} setParam={setParam} />
        )}
      />

      <BiosWindow {...BiosData(param)} />
    </>
  );
};

export default IIOConfiguration;
