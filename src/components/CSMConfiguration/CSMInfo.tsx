import React from 'react';
import InfoBlock from '../InfoBlock/InfoBlock';

const CSMInfo = () => (
  <>
    <InfoBlock.Row icon="🔧">
      Если после сброса BIOS система не видит диск, включите режим CSM (Legacy). Это вернет видимость старых MBR-записей.
    </InfoBlock.Row>
    <InfoBlock.Row icon="🚀">
      Быстрая загрузка (Fast Boot), поддержка дисков 2ТБ+, работа Re-Size BAR и официальная поддержка Windows 11.
    </InfoBlock.Row>
    <InfoBlock.Row icon="⚠️">
      Нельзя просто переключить режим. Если Windows в MBR — работаем в Legacy. Для UEFI нужна конвертация в GPT или переустановка.
    </InfoBlock.Row>
    <InfoBlock.Row icon="💿">
      Перейти с MBR на GPT без потери данных можно через утилиту «mbr2gpt». После этого CSM в BIOS можно (и нужно) выключить.
    </InfoBlock.Row>
  </>
);

export default CSMInfo;
