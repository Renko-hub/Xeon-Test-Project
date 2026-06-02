import s from "./Select.module.css";

const Select = ({ value, items, renderLabel, onChange }) => (
  <div className={s.wrapper}>
    {/* Добавили событие onChange, которое ловит клик пользователя */}
    <select 
      className={s.select} 
      value={value} 
      onChange={(e) => onChange?.(e.target.value)}
    >
      {items.map((val) => (
        <option key={val} value={val}>
          {renderLabel?.(val) ?? val}
        </option>
      ))}
    </select>
    <span className={s.arrow}>▼</span>
  </div>
);

export default Select;
