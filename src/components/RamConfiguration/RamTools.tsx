import Button from '../Button/Button';
import timingEngine from '../TimingEngine/timingEngine';

const RamTools = ({ state: initialState, update, styles: s }: any) => {
  const { state } = timingEngine(initialState, initialState.lastChangedKey);

  const commit = (key: string, val: any) =>
    update({ [key]: val, lastChangedKey: key });

  const boardTypes = ['atx', 'matx'] as const;
  const generations = ['V2', 'V3', 'V4'] as const;
  const profiles = ['safe', 'balanced', 'aggressive', 'custom'] as const;

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ТИП ПЛАТЫ:</div>
      <div className={s.btn_group}>
        {boardTypes.map((type) => (
          <Button
            key={type}
            type={type}
            isActive={state.boardType === type}
            onClick={() => commit('boardType', type)}
            className={s.tools_button}
          />
        ))}
      </div>

      <div className={s.tools_label}>ПОКОЛЕНИЕ:</div>
      <div className={s.btn_group}>
        {generations.map((gen) => (
          <Button
            key={gen}
            type={gen}
            isActive={state.gen === gen}
            onClick={() => commit('gen', gen)}
            className={s.tools_button}
          />
        ))}
      </div>

      <div className={s.tools_label}>ПРОЦЕССОР:</div>
      <div className={s.tools_select_wrapper}>
        <select
          className={s.tools_select}
          value={state.cpu}
          onChange={(e) => commit('cpu', e.target.value)}
        >
          {state.cpuModels.map(({ name }: any) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </select>
      </div>

      <div className={s.tools_label}>ТИП ПАМЯТИ:</div>
      <div className={s.btn_group}>
        {(state.memoryTypes as string[]).map((type) => (
          <Button
            key={type}
            type={type as any}
            isActive={state.memoryType === type}
            onClick={() => commit('memoryType', type)}
            className={s.tools_button}
          />
        ))}
      </div>

      <div className={s.tools_label}>ОБЪЕМ ПАМЯТИ:</div>
      <div className={s.tools_select_wrapper}>
        <select
          className={s.tools_select}
          value={state.ramSize}
          onChange={(e) => commit('ramSize', Number(e.target.value))}
        >
          {state.ramSizes.map((size: number) => (
            <option key={size} value={size}>
              {size} GB
            </option>
          ))}
        </select>
      </div>

      {state.isSelectionRequired && (
        <>
          <div className={s.tools_label}>ЕСТЬ ПЛАНКИ ПО 16GB И ВЫШЕ?</div>
          <div className={s.btn_group}>
            <Button
              type="no"
              isActive={!state.isDensityHigh}
              onClick={() => commit('isDensityHigh', false)}
              className={s.tools_button}
            />
            <Button
              type="yes"
              isActive={state.isDensityHigh}
              onClick={() => commit('isDensityHigh', true)}
              className={s.tools_button}
            />
          </div>
        </>
      )}

      <div className={s.tools_label}>ЗАНЯТО СЛОТОВ:</div>
      <div className={s.btn_group}>
        {[1, 2, 3, 4]
          .filter((n) => state.visibleSlots.includes(n))
          .map((n) => (
            <Button
              key={n}
              type={`slots${n}` as any}
              isActive={state.slotsCount === n}
              onClick={() => commit('slotsCount', n)}
              className={s.tools_button}
            />
          ))}
      </div>

      <div className={s.tools_label}>ПРЕСЕТ:</div>
      <div className={s.btn_group}>
        {profiles.map((p) => (
          <Button
            key={p}
            type={p}
            isActive={state.profile === p}
            onClick={() => commit('profile', p)}
            className={s.tools_button}
          />
        ))}
        {state.profile === 'ultra' && (
          <Button
            type="ultra"
            isActive={true}
            onClick={() => commit('profile', 'ultra')}
            className={s.tools_button}
          />
        )}
      </div>
    </div>
  );
};

export default RamTools;
