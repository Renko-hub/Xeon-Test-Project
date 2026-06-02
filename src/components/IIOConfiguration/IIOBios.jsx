const IIOBios = ({ pciGen }) => {
  const isGen3 = pciGen === "gen_3";

  return {
    title: "IIO0 CONFIGURATION",
    path: "IntelRCSetup > IIO Configuration > IIO0 Configuration",
    content: [
      // Блок для Port 0/DMI
      {
        text_left: "Socket 0 PcieD00F0 - Port 0/DMI",
        text_right: "",
        isEditable: true, // Передаем true, чтобы BiosWindow не рисовал пустые скобки []
      },
      {
        text_left: "Link Speed",
        text_right: isGen3 ? "Gen 3 (8 GT/s)" : "Gen 2 (5 GT/s)",
        isEditable: true, // Отключаем скобки, так как текст уже отформатирован
      },

      // Блок для Port 1A
      {
        text_left: "Socket 0 PcieD01F0 - Port 1A",
        text_right: "",
        isEditable: true,
      },
      {
        text_left: "Link Speed",
        text_right: isGen3 ? "Gen 3 (8 GT/s)" : "Gen 2 (5 GT/s)",
        isEditable: true,
      },

      // Блок для Port 1B
      {
        text_left: "Socket 0 PcieD01F1 - Port 1B",
        text_right: "",
        isEditable: true,
      },
      {
        text_left: "Link Speed",
        text_right: isGen3 ? "Gen 3 (8 GT/s)" : "Gen 2 (5 GT/s)",
        isEditable: true,
      },

      // Блок для Port 2A
      {
        text_left: "Socket 0 PcieD02F0 - Port 2A",
        text_right: "",
        isEditable: true,
      },
      {
        text_left: "Link Speed",
        text_right: isGen3 ? "Gen 3 (8 GT/s)" : "Gen 2 (5 GT/s)",
        isEditable: true,
      },

      // Блок для Port 3A
      {
        text_left: "Socket 0 PcieD03F0 - Port 3A",
        text_right: "",
        isEditable: true,
      },
      {
        text_left: "Link Speed",
        text_right: isGen3 ? "Gen 3 (8 GT/s)" : "Gen 2 (5 GT/s)",
        isEditable: true,
      },
    ],
  };
};

export default IIOBios;
