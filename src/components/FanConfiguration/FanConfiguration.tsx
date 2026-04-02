import InfoWidget from '../InfoBlock/InfoBlock'; 
import FanInfo from './FanInfo';
import FanBios from './FanBios';
import FanTools from './FanTools/FanTools';

const FanConfiguration = () => {
  return (
    <main className="manager-layout">
      <InfoWidget 
        title="SMART FAN FUNCTION"
        toolsLabel="ОБОРОТЫ %"
        infoNode={<FanInfo />}
        toolsNode={<FanTools />}
      />
      <FanBios />
    </main>
  );
};

export default FanConfiguration;
