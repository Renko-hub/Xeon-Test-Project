import React from 'react';
import PWMList from './PWMList/PWMList';

const FanTools = ({ styles }: any) => (
  <div className={styles.tools_container}>
    
    <PWMList />

    <div className={styles.tools_item}>
      <span className={styles.tools_icon}>💡</span>
      <p className={styles.tools_text}>
        Настройте эти точки в BIOS для оптимального баланса шума и температур.
      </p>
    </div>
    
  </div>
);

export default FanTools;
