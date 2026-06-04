import Button from "../Button/Button";

const AboutTools = ({ styles: s }) => {
  const handleDonateClick = () => {
    window.open(
      "https://yoomoney.ru/to/4100119545912515",
      "_blank",
      "noreferrer",
    );
  };

  return (
    <div className={s.tools_container}>
      <div className={s.tools_label}>ПОДДЕРЖКА ПРОЕКТА:</div>

      <div className={s.btn_group}>
        <Button
          type="donate"
          isActive={true}
          className={s.tools_button}
          onClick={handleDonateClick}
        />
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>☕</span>
        <p className={s.tools_text}>
          Этот инструмент полностью <b>бесплатный</b> и создан на чистом
          энтузиазме с целью оптимизировать BIOS на платформах <b>X79 и X99</b>.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>🔬</span>
        <p className={s.tools_text}>
          Вся база знаний собиралась вручную из сотен источников. Каждое
          значение, тайминг и скрытый параметр BIOS я{" "}
          <b>лично проверял на практике</b> ценой десятков сбросов биоса через
          батарейку и замыкание CMOS.
        </p>
      </div>

      <div className={s.tools_item}>
        <span className={s.tools_icon}>❤️</span>
        <p className={s.tools_text}>
          Если проект вам понравился и его использование помогло решить проблемы
          с платформой или выжать из неё максимум производительности, вы можете
          добровольно поддержать автора, нажав на кнопку вверху.
        </p>
      </div>
    </div>
  );
};

export default AboutTools;
