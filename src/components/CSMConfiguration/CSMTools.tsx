import React from 'react';
import Button from '../Button/Button';
import InfoBlock from '../InfoBlock/InfoBlock';

const CSMTools = ({ disk, setDisk }: any) => {
  const options = ['mbr', 'gpt'];

  return (
    <>
      <InfoBlock.Section>
        <InfoBlock.Label>СТИЛЬ РАЗМЕТКИ ДИСКА:</InfoBlock.Label>
        <InfoBlock.Grid>
          {options.map((opt: any) => (
            <Button 
              key={opt} 
              type={opt} 
              isActive={disk === opt} 
              onClick={() => setDisk(opt)} 
            />
          ))}
        </InfoBlock.Grid>
      </InfoBlock.Section>

      {disk === 'gpt' && (
        <InfoBlock.Row icon="⚙️">
          <b>GPT</b> необходим для нативной работы <b>UEFI</b> и включения <b>Re-Size BAR</b>.
        </InfoBlock.Row>
      )}

      {disk === 'mbr' && (
        <InfoBlock.Row icon="⚠️">
          <b>MBR</b> ограничен дисками до 2ТБ и требует включенного <b>CSM</b>.
        </InfoBlock.Row>
      )}

      <InfoBlock.Row icon="🛠️">
        При смене стиля (MBR ↔ GPT) не забудьте переключить режим <b>CSM</b> в BIOS.
      </InfoBlock.Row>
    </>
  );
};

export default CSMTools;
