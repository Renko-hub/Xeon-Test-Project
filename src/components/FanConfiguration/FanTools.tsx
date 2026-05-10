import clsx from 'clsx';
import PWMList from './PWMList/PWMList';

const FanTools = ({
  styles,
  externalStyles = {},
}: {
  styles: any;
  externalStyles?: any;
}) => (
  <div className={clsx(styles.tools_container, externalStyles.tools_container)}>
    <PWMList />
    <div className={clsx(styles.tools_item, externalStyles.tools_item)}>
      <span className={styles.tools_icon}>💡</span>
      <p className={styles.tools_text}>
        Настройте эти точки в BIOS для оптимального баланса шума и температур.
      </p>
    </div>
  </div>
);

export default FanTools;
