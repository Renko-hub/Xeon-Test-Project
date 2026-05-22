import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import BiosData from "./CSMBios";
import Info from "./CSMInfo";
import Tools from "./CSMTools";

const INITIAL_STATE = { diskMode: "mbr" };

const CSMConfiguration = () => (
  <Toolbox
    initialState={INITIAL_STATE}
    title="BOOT & RECOVERY"
    toolsLabel="DISK MODE"
    renderInfo={Info}
    renderTools={Tools}
  >
    {(p) => <BiosWindow {...BiosData(p.state)} />}
  </Toolbox>
);

export default CSMConfiguration;
