import React from 'react';
import InfoBlock from '../InfoBlock/InfoBlock';

const FanInfo = () => (
  <>
    <InfoBlock.Row icon="🌡️">
      Temperature Tolerance - установите значение 5-8 (Гистерезис). Это создаст «буфер», чтобы вентиляторы не выли при каждом скачке температуры на 1-2 градуса.
    </InfoBlock.Row>
    <InfoBlock.Row icon="📢">
      Полноценно управляются только 4-pin вентиляторы. 4-pin вертушка в 3-pin разъеме на китайских платах всегда работает на 100%. При подключение 2х 4-pin вертушек - меню настроек может отличаться. Такое меню доступно при наличие охлаждения на VRM.
    </InfoBlock.Row>
    <InfoBlock.Row icon="🌀">
      На платых с активным охлаждением зоны питания их обороты настраиваются в BIOS по такой же схеме (если доступно управление).
    </InfoBlock.Row>
    <InfoBlock.Row icon="⚙️">
      Если вентилятор не реагирует на настройки, проверьте, включен ли режим «Smart Fan Control» или «Manual» вместо «Full Speed».
    </InfoBlock.Row>
  </>
);

export default FanInfo;
