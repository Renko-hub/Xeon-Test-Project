import Button from '../Button/Button';

const IIO_CONFIG = {
  gen_2: {
    icon: '⚠️',
    text: <><b>Gen 2</b> может потребоваться для стабильности старых устройств.</>,
  },
  gen_3: {
    icon: '🚀',
    text: <><b>Gen 3</b> рекомендуется для современных видеокарт и NVMe.</>,
  },
} as const;

const GENS = ['gen_2', 'gen_3'] as const;

const IIOTools = ({ state, update, styles: s }: any) => {
  const { pcieGen } = state;
  const currentInfo = IIO_CONFIG[pcieGen as keyof typeof IIO_CONFIG];

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ПОРТЫ PCI-E:</div>
      
      <div className={s.btn_group}>
        {GENS.map((gen) => (
          <Button
            key={gen}
            type={gen}
            isActive={pcieGen === gen}
            onClick={() => update({ pcieGen: gen })}
            className={s.tools_button}
          />
        ))}
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>💡</span>
        <p className={s.tools_text}>
          Настройка влияет на пропускную способность шины.
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

export default IIOTools;
