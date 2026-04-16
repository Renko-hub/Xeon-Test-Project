import React, { useEffect } from 'react';
import { RAM_SIZES } from './data/configData';
import Button from '../Button/Button';

interface RamToolsProps {
  value: any;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  styles: any;
  isUnlocked: boolean;
  availableSlots?: number[];
  currentCpuList?: any[];
  show16gbToggle?: boolean;
}

const RamTools = ({ 
  value, 
  setValue, 
  styles, 
  isUnlocked, 
  availableSlots = [], 
  currentCpuList = [], 
  show16gbToggle 
}: RamToolsProps) => {
  
  const onChange = (upd: any) => {
    setValue((p: any) => ({ 
      ...p, 
      ...upd 
    }));
  };

  // Автопереключение на ultra при разблокировке
  useEffect(() => {
    if (isUnlocked) {
      onChange({ profile: 'ultra', tCL: '', tRP: '', tRCD: '' });
    }
  }, [isUnlocked]);

  const L = ({ t }: { t: string }) => <div className={styles.tools_label}>{t}</div>;

  return (
    <div className={styles.tools_container}>
      <L t="ПОКОЛЕНИЕ:" />
      <div className={styles.btn_group}>
        {['V2', 'V3', 'V4'].map(v => (
          <Button 
            key={v} 
            className={styles.tools_button} 
            type={v.toLowerCase().replace('v','v_')} 
            isActive={value.generation === v} 
            onClick={() => onChange({ generation: v })} 
          />
        ))}
      </div>

      <L t="ПРОЦЕССОР:" />
      <select 
        className={styles.tools_select} 
        value={value.cpu?.name || ''} 
        onChange={e => onChange({ cpu: currentCpuList.find((c: any) => c.name === e.target.value) })}
      >
        {currentCpuList.length > 0 ? (
          currentCpuList.map((c: any) => (
            <option key={c.name} value={c.name}>{c.name}</option>
          ))
        ) : (
          <option>Загрузка...</option>
        )}
      </select>

      <L t="ТИП ПАМЯТИ:" />
      <div className={styles.btn_group}>
        <Button 
          className={styles.tools_button} 
          type="desktop" 
          isActive={!value.isEcc} 
          onClick={() => onChange({ isEcc: false })} 
        />
        <Button 
          className={styles.tools_button} 
          type="ecc" 
          isActive={value.isEcc} 
          onClick={() => onChange({ isEcc: true })} 
        />
      </div>

      <L t="ОБЪЕМ:" />
      <select 
        className={styles.tools_select} 
        value={value.ramSize} 
        onChange={e => onChange({ ramSize: +e.target.value })}
      >
        {RAM_SIZES.map(sz => (
          <option key={sz} value={sz}>{sz} GB</option>
        ))}
      </select>

      {show16gbToggle && (
        <>
          <L t="16 ГБ ПЛАШКИ:" />
          <div className={styles.btn_group}>
            <Button 
              className={styles.tools_button} 
              type="no" 
              isActive={!value.has16gbSticks} 
              onClick={() => onChange({ has16gbSticks: false })} 
            />
            <Button 
              className={styles.tools_button} 
              type="yes" 
              isActive={value.has16gbSticks} 
              onClick={() => onChange({ has16gbSticks: true })} 
            />
          </div>
        </>
      )}

      <L t="СЛОТОВ:" />
      <div className={styles.btn_group}>
        {availableSlots.length > 0 ? (
          availableSlots.map((n: number) => (
            <Button 
              key={n} 
              className={styles.tools_button} 
              type={`slots${n}`} 
              isActive={value.slotsCount === n} 
              onClick={() => onChange({ slotsCount: n })} 
            />
          ))
        ) : (
          <div className={styles.no_slots}>Нет вариантов</div>
        )}
      </div>

      <L t="ТИП ПЛАТЫ:" />
      <div className={styles.btn_group}>
        {['atx', 'matx'].map(b => (
          <Button 
            key={b} 
            className={styles.tools_button} 
            type={b} 
            isActive={value.boardType === b} 
            onClick={() => onChange({ boardType: b })} 
          />
        ))}
      </div>

      <L t="ПРЕСЕТ:" />
      <div className={styles.btn_group}>
        {['safe', 'balanced', 'aggressive'].map(p => (
          <Button 
            key={p} 
            className={styles.tools_button} 
            type={p} 
            isActive={value.profile === p} 
            onClick={() => onChange({ profile: p, tCL: '', tRP: '', tRCD: '' })} 
          />
        ))}
        
        <Button 
          className={styles.tools_button} 
          type="custom" 
          isActive={value.profile === 'custom'} 
          onClick={() => onChange({ profile: 'custom' })} 
        />

        {isUnlocked && (
          <Button 
            className={styles.tools_button} 
            type="ultra" 
            isActive={value.profile === 'ultra'} 
            onClick={() => onChange({ profile: 'ultra', tCL: '', tRP: '', tRCD: '' })} 
          />
        )}
      </div>
    </div>
  );
};

export default RamTools;
