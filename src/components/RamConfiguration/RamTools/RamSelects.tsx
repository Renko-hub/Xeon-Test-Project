import React from "react";
import Select from "../../Select/Select";
import { formatRamLabel } from "../data/ramData";

const RamSelects = {
  Cpu: ({ state, setParam }) => (
    <Select
      value={state.cpu}
      onChange={(val) => setParam("cpu", val)}
      items={state.cpuModels.map((val) => val.name)}
    />
  ),

  RamSize: ({ state, setParam }) => (
    <Select
      value={state.ramSize}
      onChange={(val) => setParam("ramSize", val)}
      items={state.ramSizes}
      renderLabel={formatRamLabel}
    />
  ),
};

export default RamSelects;
