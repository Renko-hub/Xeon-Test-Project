import React from 'react';
import Button from '../Button/Button';
import InfoBlock from '../InfoBlock/InfoBlock';

const PowerTools = ({ gen, setGen }: any) => {
  const options = ['V2', 'V3', 'V4'];

  return (
    <>
      <InfoBlock.Section>
        <InfoBlock.Label>ПОКОЛЕНИЕ ПРОЦЕССОРА:</InfoBlock.Label>
        <InfoBlock.Grid>
          {options.map((opt: any) => (
            <Button key={opt} type={opt} isActive={gen === opt} onClick={() => setGen(opt)} />
          ))}
        </InfoBlock.Grid>
      </InfoBlock.Section>

      {gen === 'V2' && (
        <InfoBlock.Row icon="⚙️">
          Для V2 разгон ограничен множителем (16xx) или шиной. Опция <b>Package C State limit [No Limit]</b> помогает удерживать частоту под нагрузкой.
        </InfoBlock.Row>
      )}

      {gen === 'V3' && (
        <InfoBlock.Row icon="💡">
          Для работы <b>Unlock Turbo Boost</b> на V3 необходимо оставить <b>CPU C3 Report [Enabled]</b>.
        </InfoBlock.Row>
      )}

      {gen === 'V4' && (
        <InfoBlock.Row icon="🚀">
          На архитектуре V4 рекомендуется выставлять <b>CPU C3 Report [Disabled]</b> для минимизации задержек.
        </InfoBlock.Row>
      )}

      {gen !== 'V2' && (
        <InfoBlock.Row icon="🛠️">
          Если частоты «прыгают» — попробуйте отключить <b>C1E</b> через <b>ThrottleStop</b>.
        </InfoBlock.Row>
      )}

      <InfoBlock.Row icon="🔊">
        Изменение настроек <b>C-States</b> может повлиять на писк дросселей (<b>Coil Whine</b>).
      </InfoBlock.Row>
    </>
  );
};

export default PowerTools;
