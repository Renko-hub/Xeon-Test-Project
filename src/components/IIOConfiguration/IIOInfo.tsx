import React from 'react';
import InfoBlock from '../InfoBlock/InfoBlock';

const IIOInfo = () => (
  <>
    <InfoBlock.Row icon="🔌">
      Фиксация режима GEN 3 помогает избежать ошибок Link Training Error, из-за которых видеокарта или NVMe могут не определиться.
    </InfoBlock.Row>
    <InfoBlock.Row icon="🛠️">
      Для карт до 2013 года (HD 7000, GTX 600) ставьте GEN 2. Старые контроллеры часто нестабильны с шиной 3.0 на этой платформе.
    </InfoBlock.Row>
    <InfoBlock.Row icon="✨">
      Если устройства ведут себя странно — протрите контакты процессора и видеокарты ластиком до блеска. Окислы — причина 90% проблем!
    </InfoBlock.Row>
    <InfoBlock.Row icon="🧬">
      Если используете переходник на несколько NVMe в один слот, ищите настройку разделения линий (x4x4x4x4) в IIO Configuration.
    </InfoBlock.Row>
  </>
);

export default IIOInfo;
