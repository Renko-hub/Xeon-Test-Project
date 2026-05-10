import clsx from 'clsx';
import { ReactNode, useState } from 'react';
import Button from '../Button/Button';

import s from './Toolbox.module.css';
import infoS from './styles/Info.module.css';
import toolsS from './styles/Tools.module.css';

interface ToolboxProps {
  initialState?: any;
  title: ReactNode | ((p: any) => ReactNode);
  toolsLabel: string;
  renderInfo?: (styles: any) => ReactNode;
  renderTools?: (p: any) => ReactNode;
  children?: ReactNode | ((p: any) => ReactNode);
}

const Toolbox = ({
  initialState,
  title,
  toolsLabel,
  renderInfo,
  renderTools,
  children,
}: ToolboxProps) => {
  const [state, setState] = useState(initialState);
  const [tab, setTab] = useState<'info' | 'tools'>('info');

  const p = {
    state,
    setState,
    update: (patch: any) => setState((prev: any) => ({ ...prev, ...patch })),
    styles: { ...infoS, ...toolsS },
  };

  return (
    <>
      <div className={s.toolbox_container}>
        <h1 className={clsx(s.toolbox_title, s[`${tab}_active`])}>
          {typeof title === 'function' ? title(p) : title}
        </h1>

        <div className={s.toolbox_tabs}>
          <Button
            type="warning"
            isActive={tab === 'info'}
            onClick={() => setTab('info')}
          />
          <Button
            type="tools"
            label={toolsLabel}
            isActive={tab === 'tools'}
            onClick={() => setTab('tools')}
          />
        </div>

        <div className={clsx(s.toolbox_card, s[`${tab}_border`])}>
          {tab === 'info' ? renderInfo?.(p.styles) : renderTools?.(p)}
        </div>
      </div>

      {typeof children === 'function' ? children(p) : children}
    </>
  );
};

export default Toolbox;
