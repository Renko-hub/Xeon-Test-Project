import InfoWidget from '../InfoBlock/InfoBlock';
import PCITools from './PCITools/PCITools';
import PCIBios from './PCIBios';
import PCIInfo from './PCIInfo';

const PCIConfiguration = () => {
  return (
    <main className="manager-layout">
      <InfoWidget
        title="PCI SETTINGS"
        toolsLabel="GPU-Z ПРОВЕРКА"
        infoNode={<PCIInfo />}
        toolsNode={<PCITools />}
      />

      <PCIBios />
    </main>
  );
};

export default PCIConfiguration;
