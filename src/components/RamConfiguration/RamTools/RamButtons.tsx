import React from "react";
import Button from "../../Button/Button";
import { PROFILE_PRESETS } from "../data/memoryPresets";
import { AVAILABLE_SLOTS } from "../data/ramData";

const RamButtons = {
  Board: ({ state, setParam, styles: s }) => {
    const { boardType } = state;

    const renderButton = (type) => (
      <Button
        key={type}
        type={type}
        isActive={boardType === type}
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

  Gen: ({ state, setParam, styles: s }) => {
    const { gen } = state;

    const renderButton = (type) => (
      <Button
        key={type}
        type={type}
        isActive={gen === type}
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

  Memory: ({ state, setParam, styles: s }) => {
    const { memoryType, memoryTypes } = state;

    const renderButton = (type) => (
      <Button
        key={type}
        type={type}
        isActive={memoryType === type}
        onClick={() => setParam("memoryType", type)}
        className={s.tools_button}
      />
    );

    return (
      <div className={s.btn_group}>
        {memoryTypes?.desktop && renderButton("desktop")}
        {memoryTypes?.ecc && renderButton("ecc")}
      </div>
    );
  },

  Density: ({ state, setParam, styles: s }) => {
    const { isDensityHigh } = state;

    const renderButton = (type, targetValue) => (
      <Button
        key={type}
        type={type}
        isActive={isDensityHigh === targetValue}
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

  Slot: ({ state, setParam, styles: s }) => {
    const { slotsCount, visibleSlots } = state;

    const renderButton = (num) => (
      <Button
        key={num}
        type={`slots${num}`}
        isActive={slotsCount === num}
        onClick={() => setParam("slotsCount", num)}
        className={s.tools_button}
      />
    );

    return (
      <div className={s.btn_group}>
        {AVAILABLE_SLOTS.map((num) => visibleSlots?.[num] && renderButton(num))}
      </div>
    );
  },

  Preset: ({ state, setParam, styles: s }) => {
    const { profile } = state;

    const renderButton = (type) => (
      <Button
        key={type}
        type={type}
        isActive={profile === type}
        onClick={() => setParam("profile", type)}
        className={s.tools_button}
      />
    );

    return (
      <div className={s.btn_group}>
        {PROFILE_PRESETS.map((p) => renderButton(p))}
      </div>
    );
  },
};

export default RamButtons;
