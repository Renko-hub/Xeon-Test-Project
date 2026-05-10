import Button from '../Button/Button';

const TOOLS_CONFIG = {
  V2: { icon: '⚙️', text: <>Для V2: <b>C0/C1 limit</b> и <b>Disabled</b> отчеты.</> },
  V3: { icon: '💡', text: <>Для <b>Unlock Turbo Boost</b>: C3 [Enabled], C6 [Disabled].</> },
  V4: { icon: '🚀', text: <>Для V4 рекомендуется полностью <b>выключить</b> энергосбережение.</> },
} as const;

const LEVELS = ['V2', 'V3', 'V4'] as const;

const PowerTools = ({ state, update, styles: s }: any) => {
  const { powerLevel } = state;
  const currentInfo = TOOLS_CONFIG[powerLevel as keyof typeof TOOLS_CONFIG];

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ПОКОЛЕНИЕ CPU:</div>
      
      <div className={s.btn_group}>
        {LEVELS.map((level) => (
          <Button
            key={level}
            type={level}
            isActive={powerLevel === level}
            onClick={() => update({ powerLevel: level })}
            className={s.tools_button}
          />
        ))}
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🔊</span>
        <p className={s.tools_text}>
          Настройки <b>C-States</b> могут снизить писк дросселей, но повысят потребление в простое на <b>10–20%</b>.
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

export default PowerTools;
