import Button from "../Button/Button";
import Select from "../Select/Select";
import timingEngine from "../TimingEngine/timingEngine.js";
import { formatRamLabel } from "./data/ramData";

const RamTools = ({ styles: s, param, setParam }) => {
  const { config, updateParam } = timingEngine(param);
  const change = updateParam(setParam);
  const cpuItems = config.cpuModels.map((item) => item.name);

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ТИП ПЛАТЫ:</div>
      <div className={s.btn_group}>
        {["atx", "matx"].map((type) => (
          <Button
            key={type}
            type={type}
            isActive={param.board === type}
            className={s.tools_button}
            onClick={() => change("board", type)}
          />
        ))}
      </div>

      <div className={s.tools_label}>ПОКОЛЕНИЕ:</div>
      <div className={s.btn_group}>
        {["V2", "V3", "V4"].map((type) => (
          <Button
            key={type}
            type={type}
            isActive={param.gen === type}
            className={s.tools_button}
            onClick={() => change("gen", type)}
          />
        ))}
      </div>

      <div className={s.tools_label}>ПРОЦЕССОР:</div>
      <Select
        value={param.cpu}
        items={cpuItems}
        onChange={(val) => change("cpu", val)}
      />

      {["desktop", "ecc"].filter((type) => config.memoryTypes?.[type]).length >
        0 && (
        <>
          <div className={s.tools_label}>ТИП ПАМЯТИ:</div>
          <div className={s.btn_group}>
            {["desktop", "ecc"]
              .filter((type) => config.memoryTypes?.[type])
              .map((type) => (
                <Button
                  key={type}
                  type={type}
                  isActive={param.memory === type}
                  className={s.tools_button}
                  onClick={() => change("memory", type)}
                />
              ))}
          </div>
        </>
      )}

      <div className={s.tools_label}>ОБЪЕМ ПАМЯТИ:</div>
      <Select
        value={param.ramSize}
        items={config.ramSizes}
        renderLabel={formatRamLabel}
        onChange={(val) => change("ramSize", Number(val))}
      />

      {config.isSelectionRequired && (
        <>
          <div className={s.tools_label}>ЕСТЬ ПЛАНКИ ПО 16GB И ВЫШЕ?</div>
          <div className={s.btn_group}>
            {["no", "yes"].map((type) => (
              <Button
                key={type}
                type={type}
                isActive={param.density === type}
                className={s.tools_button}
                onClick={() => change("density", type)}
              />
            ))}
          </div>
        </>
      )}

      {["slots1", "slots2", "slots3", "slots4"].filter(
        (key) => config.visibleSlots?.[key],
      ).length > 0 && (
        <>
          <div className={s.tools_label}>ЗАНЯТО СЛОТОВ:</div>
          <div className={s.btn_group}>
            {["slots1", "slots2", "slots3", "slots4"]
              .filter((key) => config.visibleSlots?.[key])
              .map((type) => (
                <Button
                  key={type}
                  type={type}
                  isActive={param.slot === type}
                  className={s.tools_button}
                  onClick={() => change("slot", type)}
                />
              ))}
          </div>
        </>
      )}

      <div className={s.tools_label}>ПРЕСЕТ:</div>
      <div className={s.btn_group}>
        {[
          "safe",
          "balanced",
          "aggressive",
          "custom",
          ...(param.unlocked ? ["ultra"] : []),
        ].map((type) => (
          <Button
            key={type}
            type={type}
            isActive={param.preset === type}
            className={s.tools_button}
            onClick={() => change("preset", type)}
          />
        ))}
      </div>
    </div>
  );
};

export default RamTools;
