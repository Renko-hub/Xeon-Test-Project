import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import USBBios from "./USBBios";
// Исправленные пути импорта к новым файлам
import Info from "./USBInfo";
import Tools from "./USBTools";

const USBConfiguration = () => {
  return (
    <>
      <Toolbox
        title="USB CONFIGURATION"
        toolsLabel="НАСТРОЙКА USB"
        renderInfo={Info}
        renderTools={Tools}
      />

      <BiosWindow {...USBBios()} />
    </>
  );
};

export default USBConfiguration;
