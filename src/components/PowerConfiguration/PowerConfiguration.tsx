import BiosWindow from '../BiosWindow/BiosWindow';
import Toolbox from '../Toolbox/Toolbox';
import BiosData from './PowerBios';
import Info from './PowerInfo';
import Tools from './PowerTools';

const INITIAL_STATE = { powerLevel: 'V2' };

const PowerConfiguration = () => (
  <Toolbox
    initialState={INITIAL_STATE}
    title="Power Management"
    toolsLabel="ПРЕСЕТ CPU"
    renderInfo={(s) => <Info styles={s} />}
    renderTools={(p) => <Tools {...p} />}
  >
    {(p) => <BiosWindow {...BiosData(p)} />}
  </Toolbox>
);

export default PowerConfiguration;
