import React from 'react';
import InfoBlock from '../InfoBlock/InfoBlock';

const PowerInfo = () => (
  <>
    <InfoBlock.Row icon="🚀">
      Для стабильного Анлока Турбобуста обязательно отключаем состояние C6 (C6 Offline / Un-demote) в настройках питания CPU!
    </InfoBlock.Row>
    <InfoBlock.Row icon="🕹️">
      На процессорах V4 отключение C3 дополнительно снижает микрозадержки в играх. Это делает график Frame Time ровнее.
    </InfoBlock.Row>
    <InfoBlock.Row icon="📜">
      Для V2 лучше оставить всё в стоке (No Limit), чтобы не потерять частоту на одно ядро при высокой нагрузке.
    </InfoBlock.Row>
    <InfoBlock.Row icon="⚡">
      Если частоты «замерли» на максимуме, проверьте схему питания в Windows. Для разгона ставьте «Высокая производительность».
    </InfoBlock.Row>
  </>
);

export default PowerInfo;
