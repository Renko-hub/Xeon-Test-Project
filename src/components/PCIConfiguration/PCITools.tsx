import clsx from 'clsx';
import PCIGuide from './PCIGuide/PCIGuide';

const PCITools = ({
  styles,
  externalStyles = {},
}: {
  styles: any;
  externalStyles?: any;
}) => (
  <div className={clsx(styles.tools_container, externalStyles.tools_container)}>
    <PCIGuide externalStyles={externalStyles} />

    <div
      className={clsx(
        styles.tools_label,
        styles.pci_label_spacing,
        externalStyles.tools_label,
      )}
    >
      ВАЖНЫЕ ПРИМЕЧАНИЯ:
    </div>

    {[
      [
        '💡',
        <>
          <b>ПОРЯДОК ДЕЙСТВИЙ:</b> GPT → Off CSM → 64B ADDR → BAR.
        </>,
      ],
      [
        '⚠️',
        <>
          На процессорах <b>v1/v2 (LGA2011)</b> Re-Size BAR не работает!
        </>,
      ],
    ].map(([icon, text], index) => (
      <div
        key={index}
        className={clsx(styles.tools_item, externalStyles.tools_item)}
      >
        <span className={styles.tools_icon}>{icon}</span>
        <span className={styles.tools_text}>{text}</span>
      </div>
    ))}
  </div>
);

export default PCITools;
