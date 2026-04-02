import React from 'react';
import Button from '../Button/Button';
import InfoBlock from '../InfoBlock/InfoBlock';

const IIOTools = ({ pciGen, setPciGen }: any) => {
  return (
    <>
      <InfoBlock.Section>
        <InfoBlock.Label>РЕЖИМ ШИНЫ PCI-E:</InfoBlock.Label>
        <InfoBlock.Grid>
          <Button type="Gen 2" isActive={pciGen === 'Gen 2'} onClick={() => setPciGen('Gen 2')} />
          <Button type="Gen 3" isActive={pciGen === 'Gen 3'} onClick={() => setPciGen('Gen 3')} />
        </InfoBlock.Grid>
      </InfoBlock.Section>
      
      {pciGen === 'Gen 3' ? (
        <InfoBlock.Row icon="🚀">
          <b>Gen 3</b> рекомендуется для современных видеокарт и NVMe.
        </InfoBlock.Row>
      ) : (
        <InfoBlock.Row icon="⚠️">
          <b>Gen 2</b> может потребоваться для старых устройств.
        </InfoBlock.Row>
      )}

      <InfoBlock.Row icon="💡">
        Настройка <b>PCI-E Gen</b> напрямую влияет на скорость обмена данными.
      </InfoBlock.Row>
    </>
  );
};

export default IIOTools;
