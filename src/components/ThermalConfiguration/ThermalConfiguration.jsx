import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import ThermalBiosData from "./ThermalBios";
import Info from "./ThermalInfo";
import Tools from "./ThermalTools";

const ThermalConfiguration = () => {
  return (
    <>
      <Toolbox
        title="MEMORY THERMAL CONFIGURATION"
        toolsLabel="ТЕРМОКОНТРОЛЬ ПАМЯТИ"
        renderInfo={Info}
        renderTools={(props) => <Tools {...props} />}
      />

      <BiosWindow {...ThermalBiosData()} />
    </>
  );
};

export default ThermalConfiguration;
