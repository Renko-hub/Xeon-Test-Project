import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import BiosData from "./IIOBios";
import Info from "./IIOInfo";
import Tools from "./IIOTools";

const INITIAL_STATE = { pcieGen: "gen_2" };

const IIOConfiguration = () => (
  <Toolbox
    initialState={INITIAL_STATE}
    title="IIO Configuration"
    toolsLabel="PCI-E PORTS"
    renderInfo={Info}
    renderTools={Tools}
  >
    {(p) => <BiosWindow {...BiosData(p.state)} />}
  </Toolbox>
);

export default IIOConfiguration;
