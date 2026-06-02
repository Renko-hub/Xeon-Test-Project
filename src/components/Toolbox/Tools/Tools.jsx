import s from "./Tools.module.css";

const Tools = ({ renderTools, cardClass }) => (
  <div className={cardClass}>{renderTools?.({ styles: s })}</div>
);

export default Tools;
