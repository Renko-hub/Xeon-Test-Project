import React from 'react';
import InfoBlock from '../../InfoBlock/InfoBlock';
import s from './FanTools.module.css';

const FanTools = () => (
  <div className={s.container}>
    <div className={s.fanList}>
      <div className={s.fanBtn}>
        <span className={s.icon}>❄️</span>
        <span className={s.label}>PWM 75</span> 
        <strong className={s.value}>29%</strong>
      </div>
      
      <div className={s.fanBtn}>
        <span className={s.icon}>🍃</span>
        <span className={s.label}>PWM 130</span> 
        <strong className={s.value}>51%</strong>
      </div>
      
      <div className={s.fanBtn}>
        <span className={s.icon}>🚀</span>
        <span className={s.label}>PWM 185</span> 
        <strong className={s.value}>73%</strong>
      </div>
      
      <div className={s.fanBtn}>
        <span className={s.icon}>🌪️</span>
        <span className={s.label}>PWM 255</span> 
        <strong className={s.value}>100%</strong>
      </div>
    </div>

    <InfoBlock.Row icon="💡">
      Настройте эти точки в BIOS для оптимального баланса шума и температур.
    </InfoBlock.Row>
  </div>
);

export default FanTools;
