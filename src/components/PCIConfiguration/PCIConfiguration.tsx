import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import BiosData from "./PCIBios";
import Info from "./PCIInfo";
import Tools from "./PCITools";

const PCIConfiguration = () => (
  <Toolbox
    title="PCI SUBSYSTEM SETTINGS"
    toolsLabel="ГАЙД И GPU-Z ПРОВЕРКА"
    renderInfo={Info}
    renderTools={Tools}
  >
    {() => <BiosWindow {...BiosData()} />}
  </Toolbox>
);

export default PCIConfiguration;
