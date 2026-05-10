import BiosWindow from '../BiosWindow/BiosWindow';
import Toolbox from '../Toolbox/Toolbox';
import BiosData from './FanBios';
import Info from './FanInfo';
import Tools from './FanTools';

const FanConfiguration = () => (
  <Toolbox
    title="SMART FAN FUNCTION"
    toolsLabel="ОБОРОТЫ %"
    renderInfo={(s) => <Info styles={s} />}
    renderTools={(p) => <Tools {...p} />}
  >
    {() => <BiosWindow {...BiosData()} />}
  </Toolbox>
);

export default FanConfiguration;
