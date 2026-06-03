import React from "react";
import Button from "../Button/Button";

const MemoryTools = ({ styles: s, param, setParam }) => {
  const { memoryType } = param;

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ТИП ОПЕРАТИВНОЙ ПАМЯТИ:</div>

      <div className={s.btn_group}>
        {["desktop", "ecc"].map((type) => (
          <Button
            key={type}
            type={type}
            isActive={memoryType === type}
            className={s.tools_button}
            onClick={() => setParam((p) => ({ ...p, memoryType: type }))}
          />
        ))}
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>⚠️</span>
        <p className={s.tools_text}>
          Для <b>DESKTOP</b> (UDIMM) модулей функция <b>Data Scrambling</b>{" "}
          выключается. Это снижает общие задержки (latency) шины памяти.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🛡️</span>
        <p className={s.tools_text}>
          Для <b>ECC REG</b> серверной памяти скремблирование строго необходимо{" "}
          <b>включить</b> для гашения перекрестных помех под нагрузкой.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🚀</span>
        <p className={s.tools_text}>
          Опции <b>Attempt Fast Boot / Cold Boot</b> активны для обоих режимов.
          Они сокращают время инициализации X99 с 15 минут до пары секунд.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🛑</span>
        <p className={s.tools_text}>
          Отладочный интерфейс <b>BCIT</b> и мониторинг <b>PSMI</b> полностью
          отключены, чтобы исключить случайные микрофризы (статтеры) в системе.
        </p>
      </div>
    </div>
  );
};

export default MemoryTools;
