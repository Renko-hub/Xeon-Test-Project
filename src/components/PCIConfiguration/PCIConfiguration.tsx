import BiosWindow from '../BiosWindow/BiosWindow';
import Toolbox from '../Toolbox/Toolbox';
import BiosData from './PCIBios';
import Info from './PCIInfo';
import Tools from './PCITools';

const PCIConfiguration = () => (
  <Toolbox
    title="PCI SETTINGS"
    toolsLabel="GPU-Z ПРОВЕРКА"
    renderInfo={(s) => <Info styles={s} />}
    renderTools={(p) => <Tools {...p} />}
  >
    {() => <BiosWindow {...BiosData()} />}
  </Toolbox>
);

export default PCIConfiguration;
