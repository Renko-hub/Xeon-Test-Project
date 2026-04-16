import React from 'react';
import s from './PWMList.module.css';

const PWMList = () => (
  <ul className={s.fan_container}>
    <li className={s.fan_item}>
      <span className={s.fan_icon}>❄️</span>
      <span className={s.fan_text}>PWM 75</span> 
      <strong className={s.fan_percent}>29%</strong>
    </li>
    <li className={s.fan_item}>
      <span className={s.fan_icon}>🍃</span>
      <span className={s.fan_text}>PWM 130</span> 
      <strong className={s.fan_percent}>51%</strong>
    </li>
    <li className={s.fan_item}>
      <span className={s.fan_icon}>🚀</span>
      <span className={s.fan_text}>PWM 185</span> 
      <strong className={s.fan_percent}>73%</strong>
    </li>
    <li className={s.fan_item}>
      <span className={s.fan_icon}>🌪️</span>
      <span className={s.fan_text}>PWM 255</span> 
      <strong className={s.fan_percent}>100%</strong>
    </li>
  </ul>
);

export default PWMList;
