import clsx from 'clsx';
import Button from '../Button/Button';
import s from './UltraAlert.module.css';
import useUltraLogic from './hooks/useUltraLogic';

const ALERT_CONTENT = [
  {
    text: 'Данный режим поддерживается не всеми процессорами.',
    className: s.alert_notice,
  },
  { text: 'Экстремальные настройки. Только для удачных чипов + обдув.' },
  {
    text: (
      <>
        Напряжение:{' '}
        <span className={s.alert_gold}>1.30V (D4) / 1.55V (D3)</span>.
      </>
    ),
  },
  {
    text: 'Нажмите "ОТМЕНА", если вы прочли текст.',
    className: s.alert_danger,
  },
];

const UltraAlert = ({ state, update }: { state: any; update: any }) => {
  const { isOpen, close, handleTrigger } = useUltraLogic(state, update);

  return (
    <div className={s.alert_wrap}>
      <span
        className={clsx(s.alert_trigger, state.unlocked && s.alert_unlocked)}
        onMouseDown={(e) => e.preventDefault()}
        onClick={handleTrigger}
      >
        {state.unlocked ? 'EXTREME RAM TOOL 🛠️' : 'XEON RAM TOOL'}
      </span>

      {isOpen && (
        <div className={s.alert_overlay}>
          <div className={s.alert_modal}>
            <div className={s.alert_hazard} />
            <div className={s.alert_body}>
              <div className={s.alert_triangle}>
                <span className={s.alert_excl}>!</span>
              </div>
              <h2 className={s.alert_title}>⚠️ ВНИМАНИЕ: ULTRA РЕЖИМ</h2>

              <div className={s.alert_text}>
                {ALERT_CONTENT.map((item, index) => (
                  <p key={index} className={item.className}>
                    {item.text}
                  </p>
                ))}
              </div>

              <div className={s.alert_actions}>
                <Button type="activate" isActive onClick={() => close(false)} />
                <Button type="cancel" isActive onClick={() => close(true)} />
              </div>
            </div>
            <div className={s.alert_hazard} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UltraAlert;
