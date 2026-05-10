import Button from '../Button/Button';

const CSM_CONFIG = {
  mbr: {
    icon: '⚠️',
    text: <><b>MBR</b> ограничен 2ТБ и требует <b>CSM Support</b> [Enabled].</>,
  },
  gpt: {
    icon: '⚙️',
    text: <><b>GPT</b> необходим для <b>UEFI</b> и <b>Re-Size BAR</b>.</>,
  },
} as const;

const MODES = ['mbr', 'gpt'] as const;

const CSMTools = ({ state, update, styles: s }: any) => {
  const { diskMode } = state;
  const currentInfo = CSM_CONFIG[diskMode as keyof typeof CSM_CONFIG];

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ТИП РАЗМЕТКИ ДИСКА:</div>

      <div className={s.btn_group}>
        {MODES.map((mode) => (
          <Button
            key={mode}
            type={mode}
            isActive={diskMode === mode}
            onClick={() => update({ diskMode: mode })}
            className={s.tools_button}
          />
        ))}
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🛠️</span>
        <p className={s.tools_text}>
          При смене стиля не забудьте переключить режим <b>CSM</b> в BIOS.
        </p>
      </div>

      {currentInfo && (
        <div className={s.tools_item}>
          <span className={s.tools_icon}>{currentInfo.icon}</span>
          <p className={s.tools_text}>{currentInfo.text}</p>
        </div>
      )}
    </div>
  );
};

export default CSMTools;
