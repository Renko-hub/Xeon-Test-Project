import React from 'react';
import Button from '../Button/Button';

interface CSMToolsProps {
  value: 'mbr' | 'gpt';
  setValue: (val: 'mbr' | 'gpt') => void;
  styles: Record<string, string>;
}

const CSMTools = ({ value, setValue, styles }: CSMToolsProps) => {
  const renderBtn = (type: 'mbr' | 'gpt') => (
    <Button 
      className={styles.tools_button} 
      type={type} 
      isActive={value === type} 
      onClick={() => setValue(type)} 
    />
  );

  return (
    <div className={styles.tools_container}>

      <div className={styles.tools_label}>ТИП РАЗМЕТКИ ДИСКА:</div>

      <div className={styles.btn_group}>
        {renderBtn('mbr')}
        {renderBtn('gpt')}
      </div>

      <div className={styles.tools_item}>
        <span className={styles.tools_icon}>🛠️</span>
        <p className={styles.tools_text}>
          При смене стиля не забудьте переключить режим <b>CSM</b> в BIOS.
        </p>
      </div>

      <div className={styles.tools_item}>
        <span className={styles.tools_icon}>
          {value === 'mbr' && '⚠️'}
          {value === 'gpt' && '⚙️'}
        </span>
        <p className={styles.tools_text}>
          {value === 'mbr' && <><b>MBR</b> ограничен 2ТБ и требует <b>CSM Support</b>.</>}
          {value === 'gpt' && <><b>GPT</b> необходим для <b>UEFI</b> и <b>Re-Size BAR</b>.</>}
        </p>
      </div>
    </div>
  );
};

export default CSMTools;
