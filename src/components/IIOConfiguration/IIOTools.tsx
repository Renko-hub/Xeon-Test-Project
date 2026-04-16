import React from 'react';
import Button from '../Button/Button';

interface IIOToolsProps {
  value: 'gen_2' | 'gen_3';
  setValue: (val: 'gen_2' | 'gen_3') => void;
  styles: Record<string, string>;
}

const IIOTools = ({ value, setValue, styles }: IIOToolsProps) => {
  const renderBtn = (type: 'gen_2' | 'gen_3') => (
    <Button 
      className={styles.tools_button} 
      type={type} 
      isActive={value === type} 
      onClick={() => setValue(type)} 
    />
  );

  return (
    <div className={styles.tools_container}>

      <div className={styles.tools_label}>ПОРТЫ PCI-E:</div>

      <div className={styles.btn_group}>
        {renderBtn('gen_2')}
        {renderBtn('gen_3')}
      </div>

      <div className={styles.tools_item}>
        <span className={styles.tools_icon}>💡</span>
        <p className={styles.tools_text}>
          Настройка влияет на пропускную способность шины.
        </p>
      </div>

      <div className={styles.tools_item}>
        <span className={styles.tools_icon}>
          {value === 'gen_2' && '⚠️'}
          {value === 'gen_3' && '🚀'}
        </span>
        <p className={styles.tools_text}>
          {value === 'gen_2' && <><b>Gen 2</b> может потребоваться для стабильной работы старых устройств.</>}
          {value === 'gen_3' && <><b>Gen 3</b> рекомендуется для современных видеокарт и NVMe.</>}
        </p>
      </div>
    </div>
  );
};

export default IIOTools;
