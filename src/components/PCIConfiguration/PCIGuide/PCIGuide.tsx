import clsx from "clsx";
import s from "./PCIGuide.module.css";

const PCIGuide = () => (
  <div className={s.pci_container}>
    <section className={s.pci_section}>
      <h2 className={s.pci_title}>
        ИНСТРУКЦИЯ ПО БЕЗОПАСНОМУ ВКЛЮЧЕНИЮ RE-SIZE BAR
      </h2>

      <ol className={s.pci_step_list}>
        <li>
          <strong>Включение 4G Decoding:</strong>
          <span>
            Сначала перейдите в <code>Advanced → PCI Subsystem Settings</code>{" "}
            (или в скрытый раздел <code>IntelRCSetup → IIO Configuration</code>
            ).
          </span>
          <span>
            Включите <code>Above 4G Decoding</code>. Сохраните настройки и
            перезагрузите ПК.
          </span>
        </li>
        <li>
          <strong>Настройка UEFI режима для устройств:</strong>
          <span>
            Перейдите в <code>Advanced → CSM Configuration</code>.
          </span>
          <span>
            Переведите видеокарту (Video) и все остальные физические устройства
            в режим <code>UEFI</code>.
          </span>
          <span>
            Сохраните изменения и выполните промежуточную перезагрузку BIOS,
            чтобы настройки применились.
          </span>
        </li>
        <li>
          <strong>Отключение CSM Support:</strong>
          <span>
            Если система стартует и появляется изображение, то снова зайдите в
            меню <code>Advanced → CSM Configuration</code>.
          </span>
          <span>
            Теперь можно перевести <code>CSM Support</code> в положение{" "}
            <code>Disabled</code>.
          </span>
          <span className={s.pci_accent_text}>
            Внимание: Прямое отключение CSM без предварительного перевода
            устройств в UEFI и перезагрузки либо заблокировано и выдаёт
            предупреждение о необходимости вкоючить UEFI для Video даже если вы
            уже включили UEFI, либо приводит к черному экрану.
          </span>
          <span>Сохраните изменения и перезагрузите ПК.</span>
        </li>
        <li>
          <strong>Проверка разметки диска:</strong>
          <span>
            Убедитесь, что Windows установлена на диск с разметкой{" "}
            <code>GPT</code> Если Windows изначально установить в GPT и в
            настройках включено UEFI, то UEFI можно высталвять сразу для других
            параметров.
          </span>
          <span>
            При использовании MBR обязательно конвертируйте диск через утилиту{" "}
            <code>mbr2gpt</code>, иначе система перестанет загружаться после
            деактивации CSM.
          </span>
        </li>
        <li>
          <strong>
            Активация Re-Size BAR (Обязательно для не брендовых плат):
          </strong>
          <span className={s.pci_accent_text}>
            Внимание: На 90% китайских и не брендовых плат (X99, X79 и др.)
            пункт «Re-Size BAR» отсутствует в меню BIOS даже после успешного
            включения 4G Decoding!
          </span>
          <span>
            В этом случае необходимо скачать утилиту{" "}
            <code>ReBarState/NvStrapsReBar</code> с GitHub, запустить её от
            имени администратора, ввести значение <code>32</code> для
            бесконечного размера буфера и нажать Enter.
          </span>
        </li>
        <li>
          <strong>Проверка и обновление vBIOS карты:</strong>
          <span>
            Запустите GPU-Z и проверьте статус технологии во вкладке Re-Size
            BAR.
          </span>
          <span>
            Если функция недоступна, обновите прошивку (vBIOS) самой видеокарты.
            При ручной модификации дампа BIOS или прошивке vBIOS видеокарты
            присутствует риск окирпичить устройство — восстановить его получится
            только программатором. Сохраните дамп на случай проблем после
            прошивки. Прошивку можно сделать через CMD. Инструкцию для Вашей
            карты можно найти в интернете (спросить на формумах). Многие
            фирменные утилиты от производителя карты показывают состояние
            «Re-Size BAR» и версию прошивки vBIOS.
          </span>
          <span>
            Если GPU-Z всё равно рапортует об ошибке, принудительно активируйте
            поддержку в драйвере через утилиту{" "}
            <code>NVIDIA Profile Inspector</code> (параметр{" "}
            <code>rBAR - Feature</code> в секции Common).
          </span>
        </li>
      </ol>
    </section>

    <section className={s.pci_section}>
      <h2 className={s.pci_title}>УСТРАНЕНИЕ ОШИБОК ИЗ GPU-Z</h2>
      <ul className={s.pci_error_list}>
        <li>
          <strong>UEFI BOOT REQUIRED / CSM ENABLED:</strong>
          <span>
            BIOS работает в устаревшем режиме Legacy. Отключите CSM Support в
            меню Boot или Advanced.
          </span>
        </li>
        <li>
          <strong>BOOT FROM GPT: NO:</strong>
          <span>
            ОС установлена на MBR-диске. Срочно переведите накопитель в GPT без
            потери данных через mbr2gpt.
          </span>
        </li>
      </ul>
    </section>
  </div>
);

export default PCIGuide;
