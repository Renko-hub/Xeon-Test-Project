const FanInfo = (s) => (
  <ul className={s.info_container}>
    <li className={s.info_item}>
      <span className={s.info_icon}>🌡️</span>
      <span className={s.info_text}>
        Temperature Tolerance (Гистерезис): ставьте 5-8. Это создаст «буфер»,
        чтобы обороты не прыгали при каждом скачке на 1-2°.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>📢</span>
      <span className={s.info_text}>
        Полноценно управляются только 4-pin вентиляторы. 4-pin вертушка в 3-pin
        разъеме на китайцах всегда крутит на 100%.
      </span>
    </li>

    <li className={s.info_item}>
      <span className={s.info_icon}>💨</span>
      <span className={s.info_text}>
        На платы с активным охлаждением VRM их обороты настраиваются в BIOS по
        такой же схеме (если есть поддержка).
      </span>
    </li>
  </ul>
);

export default FanInfo;
