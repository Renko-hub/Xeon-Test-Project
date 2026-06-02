import s from "./Info.module.css";

const Info = ({ renderInfo, cardClass }) => (
  <div className={cardClass}>{renderInfo?.(s)}</div>
);

export default Info;
