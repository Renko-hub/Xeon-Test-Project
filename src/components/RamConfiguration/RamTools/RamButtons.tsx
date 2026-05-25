import Button from "../../Button/Button";
import { PROFILE_PRESETS } from "../data/memoryPresets";
import { AVAILABLE_SLOTS } from "../data/ramData";

const RamButtons = {
  Board: ({ state, setParam, styles: s }: any) => {
    const renderButton = (type: string) => (
      <Button
        key={type}
        type={type}
        isActive={state.boardType === type}
        onClick={() => setParam("boardType", type)}
        className={s.tools_button}
      />
    );

    return (
      <div className={s.btn_group}>
        {renderButton("atx")}
        {renderButton("matx")}
      </div>
    );
  },

  Gen: ({ state, setParam, styles: s }: any) => {
    const renderButton = (type: string) => (
      <Button
        key={type}
        type={type}
        isActive={state.gen === type}
        onClick={() => setParam("gen", type)}
        className={s.tools_button}
      />
    );

    return (
      <div className={s.btn_group}>
        {renderButton("V2")}
        {renderButton("V3")}
        {renderButton("V4")}
      </div>
    );
  },

  Memory: ({ state, setParam, styles: s }: any) => {
    const renderButton = (type: string) => (
      <Button
        key={type}
        type={type}
        isActive={state.memoryType === type}
        onClick={() => setParam("memoryType", type)}
        className={s.tools_button}
      />
    );

    return (
      <div className={s.btn_group}>
        {state.memoryTypes?.desktop && renderButton("desktop")}
        {state.memoryTypes?.ecc && renderButton("ecc")}
      </div>
    );
  },

  Density: ({ state, setParam, styles: s }: any) => {
    const renderButton = (type: string, targetValue: boolean) => (
      <Button
        key={type}
        type={type}
        isActive={state.isDensityHigh === targetValue}
        onClick={() => setParam("isDensityHigh", targetValue)}
        className={s.tools_button}
      />
    );

    return (
      <div className={s.btn_group}>
        {renderButton("no", false)}
        {renderButton("yes", true)}
      </div>
    );
  },

  Slot: ({ state, setParam, styles: s }: any) => {
    const renderButton = (num: number) => (
      <Button
        key={num}
        type={`slots${num}`}
        isActive={state.slotsCount === num}
        onClick={() => setParam("slotsCount", num)}
        className={s.tools_button}
      />
    );

    return (
      <div className={s.btn_group}>
        {AVAILABLE_SLOTS.map(
          (num) => state.visibleSlots?.[num] && renderButton(num),
        )}
      </div>
    );
  },

  Preset: ({ state, setParam, styles: s }: any) => {
    const renderButton = (type: string) => (
      <Button
        key={type}
        type={type}
        isActive={state.profile === type}
        onClick={() => setParam("profile", type)}
        className={s.tools_button}
      />
    );

    return (
      <div className={s.btn_group}>
        {PROFILE_PRESETS.filter((p) => p !== "ultra" || state.unlocked).map(
          (p) => renderButton(p),
        )}
      </div>
    );
  },
};

export default RamButtons;
