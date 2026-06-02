import { useState } from "react";
import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import DRAMBiosData from "./DRAMBios";
import Info from "./DRAMInfo";
import Tools from "./DRAMTools";

const DRAMConfiguration = () => {
  // Устанавливаем дефолтный тип памяти ECC, чтобы при первой загрузке открывалось полное меню
  const [param, setParam] = useState({ ramType: "ecc" });

  return (
    <>
      <Toolbox
        title="DRAM RAPL CONFIGURATION"
        toolsLabel="НАСТРОЙКА ПАМЯТИ"
        renderInfo={Info}
        renderTools={(props) => (
          <Tools {...props} param={param} setParam={setParam} />
        )}
      />

      <BiosWindow {...DRAMBiosData(param)} />
    </>
  );
};

export default DRAMConfiguration;
