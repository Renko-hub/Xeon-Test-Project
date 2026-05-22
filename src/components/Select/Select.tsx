import s from "./Select.module.css";

interface SelectProps {
  value: string | number;
  onChange: (value: string | number) => void;
  items: readonly (string | number)[] | (string | number)[];
  renderLabel?: (val: string | number) => string;
}

const Select = ({ value, onChange, items, renderLabel }: SelectProps) => (
  <div className={s.wrapper}>
    <select
      className={s.select}
      value={value}
      onChange={(e) => {
        const val = e.target.value;
        onChange(typeof value === "number" ? Number(val) : val);
      }}
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
