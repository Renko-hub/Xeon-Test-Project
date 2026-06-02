import Button from "../Button/Button";

const DRAMTools = ({ styles: s, param, setParam }) => {
  // Используем дефолтный ключ в нижнем регистре, как в объекте BUTTONS
  const { ramType = "ecc" } = param;

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ТИП ПАМЯТИ:</div>

      <div className={s.btn_group}>
        {/* Ключи "ecc" и "desktop" теперь точно совпадают с MEMORY_BUTTONS */}
        {["ecc", "desktop"].map((type) => (
          <Button
            key={type}
            type={type}
            isActive={ramType === type}
            className={s.tools_button}
            onClick={() => setParam((p) => ({ ...p, ramType: type }))}
          />
        ))}
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🛡️</span>
        <p className={s.tools_text}>
          Для <b>ECC REG</b>: активируется режим <b>Mode 0</b>. Это включает
          аппаратное управление лимитами мощности (RAPL), необходимое для
          стабильной работы многоранговой серверной памяти.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🖥️</span>
        <p className={s.tools_text}>
          Для <b>DESKTOP</b>: параметры переводятся в режим <b>Disable</b>.
          Обычная десктопная память не всегда корректно отдает данные о
          телеметрии, поэтому лимиты лучше полностью отключить.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>⚙️</span>
        <p className={s.tools_text}>
          Включение <b>Mode 0</b> открывает скрытые подпункты: фиксацию
          временного окна пропускной способности (BW_LIMIT_TF) и расширение
          диапазонов питания памяти.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>⚠️</span>
        <p className={s.tools_text}>
          При выборе десктопной памяти скрытые опции автоматически отключаются,
          предотвращая случайные зависания системы и синие экраны (BSOD) из-за
          несовместимости контроллера.
        </p>
      </div>
    </div>
  );
};

export default DRAMTools;
