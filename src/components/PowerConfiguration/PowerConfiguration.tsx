import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import BiosData from "./PowerBios";
import Info from "./PowerInfo";
import Tools from "./PowerTools";

const INITIAL_STATE = { powerLevel: "V2" };

const PowerConfiguration = () => (
  <Toolbox
    initialState={INITIAL_STATE}
    title="Power Management"
    toolsLabel="ПРЕСЕТ CPU"
    renderInfo={Info}
    renderTools={Tools}
  >
    {(p) => <BiosWindow {...BiosData(p.state)} />}
  </Toolbox>
);

export default PowerConfiguration;
