import { useState } from "react";
import BiosWindow from "../BiosWindow/BiosWindow";
import Toolbox from "../Toolbox/Toolbox";
import AboutBios from "./AboutBios";
import Info from "./AboutInfo";
import Tools from "./AboutTools";

const AboutConfiguration = ({ selectedButton = "about" }) => {
  const [param, setParam] = useState({ aboutTab: selectedButton });

  return (
    <>
      <Toolbox
        title="ABOUT THE XEON TUNING PROJECT"
        toolsLabel="ИНФОРМАЦИЯ О СИСТЕМЕ"
        renderInfo={Info}
        renderTools={(props) => (
          <Tools {...props} param={param} setParam={setParam} />
        )}
      />

      <BiosWindow {...AboutBios(param)} />
    </>
  );
};

export default AboutConfiguration;
