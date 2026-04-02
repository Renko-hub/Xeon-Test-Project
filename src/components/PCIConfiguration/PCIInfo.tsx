import React from 'react';
import InfoBlock from '../InfoBlock/InfoBlock';

const PCIInfo = () => (
  <>
    <InfoBlock.Row icon="💎">
      Позволяет системе адресовать видеопамять выше 4 ГБ. Критично для Re-Size BAR и современных ускорителей (Tesla/Quadro/RTX 30+).
    </InfoBlock.Row>
    <InfoBlock.Row icon="🔍">
      Появляется только ПОСЛЕ включения 4G Decoding в этом же разделе или в Advanced → PCIe Configuration.
    </InfoBlock.Row>
    <InfoBlock.Row icon="🚫">
      На старых процессорах (Xeon E5 v1/v2) пункта не будет — это лимит архитектуры. Re-Size BAR также требует GPT-разметку диска.
    </InfoBlock.Row>
    <InfoBlock.Row icon="🛠️">
      После настройки в BIOS убедитесь, что в GPU-Z статус Resizable BAR сменился на «Enabled». CSM при этом должен быть выключен.
    </InfoBlock.Row>
  </>
);

export default PCIInfo;
