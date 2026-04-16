import { ReactNode, useState } from 'react';
import Button from '../Button/Button';
import s from './Toolbox.module.css';
import infoS from './styles/Info.module.css';
import toolsS from './styles/Tools.module.css';

interface ToolboxProps {
  title: ReactNode;
  toolsLabel: string;
  renderInfo: (styles: typeof infoS) => ReactNode;
  renderTools: (styles: typeof toolsS) => ReactNode;
}

const Toolbox = ({ title, toolsLabel, renderInfo, renderTools }: ToolboxProps) => {
  const [activeTab, setActiveTab] = useState<'info' | 'tools'>('info');
  const isInfo = activeTab === 'info';

  return (
    <div className={s.toolbox_container}>
      <h1 className={`${s.toolbox_title} ${isInfo ? s.info_active : s.tools_active}`}>
        {title}
      </h1>
      
      <div className={s.toolbox_tabs}>
        <Button 
          type="warning" 
          isActive={isInfo} 
          onClick={() => setActiveTab('info')} 
          className={s.tab_button}
        />
        <Button 
          type="info" 
          label={toolsLabel} 
          isActive={!isInfo} 
          onClick={() => setActiveTab('tools')} 
          className={s.tab_button}
        />
      </div>

      <div className={`${s.toolbox_card} ${isInfo ? s.info_border : s.tools_border}`}>
        {isInfo ? renderInfo(infoS) : renderTools(toolsS)}
      </div>
    </div>
  );
};

export default Toolbox;
