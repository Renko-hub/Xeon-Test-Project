import s from './PWMList.module.css';

const pwmData = [
  { icon: '❄️', text: 'PWM 75', percent: '29%' },
  { icon: '🍃', text: 'PWM 130', percent: '51%' },
  { icon: '🚀', text: 'PWM 185', percent: '73%' },
  { icon: '🌪️', text: 'PWM 255', percent: '100%' },
];

const PWMList = () => {
  return (
    <ul className={s.fan_container}>
      {pwmData.map(({ icon, text, percent }, index) => (
        <li key={index} className={s.fan_item}>
          <span className={s.fan_icon}>{icon}</span>
          <span className={s.fan_text}>{text}</span>
          <strong className={s.fan_percent}>{percent}</strong>
        </li>
      ))}
    </ul>
  );
};

export default PWMList;
