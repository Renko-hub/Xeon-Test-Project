import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import UltraAlert from "../UltraAlert/UltraAlert";
import BiosData from "./RamBios";
import Info from "./RamInfo";
import Tools from "./RamTools/RamTools";

const INITIAL_STATE = {
  gen: "V2",
  boardType: "atx",
  cpu: "",
  ramSize: 4,
  slotsCount: 1,
  memoryType: "desktop",
  profile: "safe",
  isDensityHigh: false,
  lastChangedKey: "",
};

const RamConfiguration = () => (
  <Toolbox
    initialState={INITIAL_STATE}
    title={UltraAlert}
    toolsLabel="КАЛЬКУЛЯТОР ТАЙМИНГОВ"
    renderInfo={Info}
    renderTools={Tools}
  >
    {(p) => <BiosWindow {...BiosData(p)} />}
  </Toolbox>
);

export default RamConfiguration;
