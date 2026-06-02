import React from "react";

const USBTools = ({ styles: s }) => {
  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>РАЗБОР КАЖДОГО ПУНКТА:</div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🔹</span>
        <p className={s.tools_text}>
          <b>Legacy USB Support</b> — принудительное включение (<b>Enabled</b>)
          гарантирует, что клавиатура и мышь будут работать всегда. В режиме{" "}
          <i>Auto</i> BIOS отключает поддержку, если при старте не обнаружит
          USB-флешку, из-за чего в процессе установки Windows или в меню
          загрузки (Boot Menu) могут отказать порты.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🔹</span>
        <p className={s.tools_text}>
          <b>XHCI / EHCI Hand-off</b> — передает управление современными (USB
          3.0) и классическими (USB 2.0) контроллерами от BIOS к ОС. Избавляет
          от фризов периферии при старте системы.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🔹</span>
        <p className={s.tools_text}>
          <b>USB Mass Storage Driver Support</b> — включает базовый драйвер для
          работы с внешними жесткими дисками и флешками большого объема прямо в
          BIOS.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🔹</span>
        <p className={s.tools_text}>
          <b>Port 60/64 Emulation</b> — по умолчанию эта функция <b>включена</b>{" "}
          для совместимости со старыми PS/2-устройствами в MS-DOS. Но если у вас
          обычная современная USB-мышь и клавиатура, опцию можно смело перевести
          в <b>Disabled</b> - для эстетики, чистоты конфигурации и освобождения
          лишних ресурсов прерываний.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🔹</span>
        <p className={s.tools_text}>
          <b>USB hardware delays & time-outs</b> — определяет время ожидания
          ответа от устройств. По умолчанию стоит 20 сек, но уменьшение значения
          до <b>5–10 сек</b> позволяет заметно ускорить общую загрузку
          компьютера и быстрее проходить POST-коды.
        </p>
      </div>
    </div>
  );
};

export default USBTools;
