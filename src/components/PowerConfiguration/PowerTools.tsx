import React from 'react';
import Button from '../Button/Button';

const PowerTools = ({ value, setValue, styles }: any) => {
  const renderBtn = (type: 'v_2' | 'v_3' | 'v_4') => (
    <Button 
      className={styles.tools_button} 
      type={type} 
      isActive={value === type} 
      onClick={() => setValue(type)} 
    />
  );

  return (
    <div className={styles.tools_container}>
      
      <div className={styles.tools_label}>ПОКОЛЕНИЕ CPU:</div>

      <div className={styles.btn_group}>
        {renderBtn('v_2')}
        {renderBtn('v_3')}
        {renderBtn('v_4')}
      </div>

      <div className={styles.tools_item}>
        <span className={styles.tools_icon}>🔊</span>
        <p className={styles.tools_text}>
          Настройки <b>C-States</b> могут влиять на акустический писк дросселей.
        </p>
      </div>

      <div className={styles.tools_item}>
        <span className={styles.tools_icon}>
          {value === 'v_2' && '⚙️'}
          {value === 'v_3' && '💡'}
          {value === 'v_4' && '🚀'}
        </span>
        <p className={styles.tools_text}>
          {value === 'v_2' && <>Для V2: <b>C0/C1 limit</b> и <b>Disabled</b> отчеты для лучшего отклика.</>}
          {value === 'v_3' && <>Для <b>Unlock Turbo Boost</b>: C3 [Enabled], C6 [Disabled] для стабильности.</>}
          {value === 'v_4' && <>Для V4 рекомендуется полностью <b>выключить</b> энергосбережение (Disabled).</>}
        </p>
      </div>
    </div>
  );
};

export default PowerTools;
