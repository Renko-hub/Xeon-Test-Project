import s from "./PCIGuide.module.css";

const PCIGuide = () => (
  <div className={s.pci_container}>
    <section className={s.pci_section}>
      <h2 className={s.pci_title}>
        ИНСТРУКЦИЯ ПО БЕЗОПАСНОМУ ВКЛЮЧЕНИЮ RE-SIZE BAR
      </h2>

      <ul className={s.pci_list}>
        <li className={s.pci_item}>
          <strong className={s.pci_step_title}>
            1. Включение 4G Decoding:
          </strong>
          <p>
            Сначала перейдите в меню{" "}
            <code>Advanced → PCI Subsystem Settings</code>. Включите параметр{" "}
            <code>Above 4G Decoding</code>. Обязательно сохраните настройки и
            перезагрузите ПК, чтобы изменения применились.
          </p>
        </li>

        <li className={s.pci_item}>
          <strong className={s.pci_step_title}>
            2. Настройка UEFI режима для устройств:
          </strong>
          <p>
            Перейдите в меню <code>Advanced → CSM Configuration</code>.
            Переведите видеокарту (Video) и все остальные physical-устройства в
            режим <code>UEFI</code>. Сохраните изменения и выполните
            промежуточную перезагрузку, чтобы настройки применились.
          </p>
        </li>

        <li className={s.pci_item}>
          <strong className={s.pci_step_title}>
            3. Отключение CSM Support:
          </strong>
          <p>
            Если система стартует и появляется изображение, то снова зайдите в
            меню <code>Advanced → CSM Configuration</code>. Теперь можно
            полностью перевести <code>CSM Support</code> в положение
            <code>Disabled</code>. Сохраните изменения и перезагрузите ПК.
          </p>
          <p className={s.pci_accent_text}>
            Внимание: Прямое отключение CSM без предварительного перевода
            устройств в UEFI и перезагрузки либо заблокировано системой и выдаёт
            предупреждение о необходимости включить UEFI для Video (даже если вы
            уже включили UEFI), либо приводит к черному экрану.
          </p>
        </li>

        <li className={s.pci_item}>
          <strong className={s.pci_step_title}>
            4. Проверка разметки диска:
          </strong>
          <p>
            Убедитесь, что Windows установлена на диск с разметкой{" "}
            <code>GPT</code>. Если Windows изначально установить в GPT и в
            настройках включено UEFI, то UEFI можно выставлять сразу для других
            параметров.
          </p>
          <p>
            При использовании MBR конвертируйте диск через утилиту
            <code>mbr2gpt</code>, иначе система перестанет загружаться после
            деактивации CSM.
          </p>
        </li>

        <li className={s.pci_item}>
          <strong className={s.pci_step_title}>
            5. Активация Re-Size BAR (Обязательно для небрендовых плат):
          </strong>
          <p className={s.pci_accent_text}>
            Внимание: На 90% китайских и небрендовых плат (X99, X79 и др.) пункт
            «Re-Size BAR» отсутствует в меню BIOS даже после успешного включения
            4G Decoding! В этом случае необходимо скачать утилиту
            <code>ReBarState/NvStrapsReBar</code> с GitHub, запустить её от
            имени администратора, ввести значение <code>32</code> для
            бесконечного размера буфера и нажать Enter.
          </p>
        </li>

        <li className={s.pci_item}>
          <strong className={s.pci_step_title}>
            6. Проверка и обновление vBIOS карты:
          </strong>
          <p>
            Запустите GPU-Z и проверьте статус технологии во вкладке Re-Size
            BAR. Если функция недоступна, обновите прошивку (vBIOS) самой
            видеокарты.
          </p>
          <p>
            При ручной модификации дампа BIOS или прошивке vBIOS видеокарты
            присутствует риск окирпичить устройство — восстановить его получится
            только программатором. Сохраните дамп на случай проблем после
            прошивки.
          </p>
          <p>
            Прошивку можно сделать через CMD. Инструкцию для Вашей карты можно
            найти в интернете (спросить на форумах). Многие фирменные утилиты от
            производителя карты показывают состояние «Re-Size BAR» и версию
            прошивки vBIOS.
          </p>
          <p>
            Если GPU-Z всё равно рапортует об ошибке, принудительно активируйте
            поддержку в драйвере через утилиту{" "}
            <code>NVIDIA Profile Inspector</code>
            (параметр <code>rBAR - Feature</code> в секции Common).
          </p>
        </li>
      </ul>
    </section>

    <section className={s.pci_section}>
      <h2 className={s.pci_title}>УСТРАНЕНИЕ ОШИБОК ИЗ GPU-Z</h2>
      <ul className={s.pci_list}>
        <li className={s.pci_item}>
          <strong className={s.pci_error_title}>
            UEFI BOOT REQUIRED / CSM ENABLED:
          </strong>
          <p>
            BIOS работает в устаревшем режиме Legacy. Отключите CSM Support в
            меню Boot или Advanced.
          </p>
        </li>
        <li className={s.pci_item}>
          <strong className={s.pci_error_title}>BOOT FROM GPT: NO:</strong>
          <p>
            ОС установлена на MBR-диске. Срочно переведите накопитель в GPT без
            потери данных через mbr2gpt.
          </p>
        </li>
      </ul>
    </section>
  </div>
);

export default PCIGuide;
