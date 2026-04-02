import React, { useState } from 'react';
import Button from '../Button/Button';
import styles from './InfoBlock.module.css';

const InfoBlock = ({ title, toolsLabel, infoNode, toolsNode }: any) => {
  const [isInfo, setIsInfo] = useState(false);
  const cls = isInfo ? styles.modeInfo : styles.modeTools;

  return (
    <div className={`${styles.panel} ${cls}`}>
      <h1>{title}</h1>
      <div className={styles.tabs}>
        <Button type="warning" isActive={isInfo} onClick={() => setIsInfo(true)}>ВНИМАНИЕ</Button>
        <Button type="info" isActive={!isInfo} onClick={() => setIsInfo(false)}>{toolsLabel}</Button>
      </div>
      <div className={styles.content} key={+isInfo}>{isInfo ? infoNode : toolsNode}</div>
    </div>
  );
};

// Хелпер для сокращения однотипных div-оберток
const Div = (name: string) => ({ children }: any) => <div className={styles[name]}>{children}</div>;

InfoBlock.Section   = Div('section');
InfoBlock.Label     = ({ children }: any) => <span className={styles.label}>{children}</span>;
InfoBlock.Grid      = Div('grid');
InfoBlock.RowLayout = Div('rowLayout');
InfoBlock.Row       = ({ icon, children }: any) => (
  <div className={styles.row}>
    {icon && <span className={styles.icon}>{icon}</span>}
    <div className={styles.text}>{children}</div>
  </div>
);
InfoBlock.Select    = (p: any) => (
  <div className={styles.selectWrapper}><select className={styles.toolSelect} {...p} /></div>
);

export default InfoBlock;
