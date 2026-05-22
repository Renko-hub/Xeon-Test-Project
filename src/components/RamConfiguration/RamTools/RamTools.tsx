import React from "react";
import timingEngine from "../../TimingEngine/timingEngine";
import RamButtons from "./RamButtons";
import RamSelects from "./RamSelects";

const RamTools = ({ state: initialState, setParam, styles: s }) => {
  const { state } = timingEngine(initialState, initialState.lastChangedKey);

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ТИП ПЛАТЫ:</div>
      <RamButtons.Board state={state} setParam={setParam} styles={s} />

      <div className={s.tools_label}>ПОКОЛЕНИЕ:</div>
      <RamButtons.Gen state={state} setParam={setParam} styles={s} />

      <div className={s.tools_label}>ПРОЦЕССОР:</div>
      <RamSelects.Cpu state={state} setParam={setParam} />

      <div className={s.tools_label}>ТИП ПАМЯТИ:</div>
      <RamButtons.Memory state={state} setParam={setParam} styles={s} />

      <div className={s.tools_label}>ОБЪЕМ ПАМЯТИ:</div>
      <RamSelects.RamSize state={state} setParam={setParam} />

      {state.isSelectionRequired && (
        <>
          <div className={s.tools_label}>ЕСТЬ ПЛАНКИ ПО 16GB И ВЫШЕ?</div>
          <RamButtons.Density state={state} setParam={setParam} styles={s} />
        </>
      )}

      <div className={s.tools_label}>ЗАНЯТО СЛОТОВ:</div>
      <RamButtons.Slot state={state} setParam={setParam} styles={s} />

      <div className={s.tools_label}>ПРЕСЕТ:</div>
      <RamButtons.Preset state={state} setParam={setParam} styles={s} />
    </div>
  );
};

export default RamTools;
