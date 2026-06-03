import { useState } from "react";
import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import BiosData from "./MemoryBios";
import Info from "./MemoryInfo";
import Tools from "./MemoryTools";

const MemoryConfiguration = () => {
  const [param, setParam] = useState({ memoryType: "desktop" });

  return (
    <>
      <Toolbox
        title="INTEGRATED MEMORY CONTROLLER"
        toolsLabel="НАСТРОЙКА ПАМЯТИ"
        renderInfo={Info}
        // Принимаем { styles } от талбокса и пробрасываем их дальше вместе со стейтами
        renderTools={({ styles }) => (
          <Tools styles={styles} param={param} setParam={setParam} />
        )}
      />

      <BiosWindow {...BiosData(param)} />
    </>
  );
};

export default MemoryConfiguration;
