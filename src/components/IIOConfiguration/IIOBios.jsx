const IIOBios = ({ pciGen }) => {
  const isGen3 = pciGen === "gen_3";
  const speedText = isGen3 ? "Gen 3 (8 GT/s)" : "Gen 2 (5 GT/s)";

  return {
    title: "IIO0 CONFIGURATION",
    path: "IntelRCSetup > IIO Configuration > IIO0 Configuration",
    content: [
      // Port 0/DMI
      { text_left: "Socket 0 PcieD00F0 - Port 0/DMI", text_right: "" },
      { text_left: "Link Speed", text_right: speedText },

      // Port 1A
      { text_left: "Socket 0 PcieD01F0 - Port 1A", text_right: "" },
      { text_left: "Link Speed", text_right: speedText },

      // Port 1B
      { text_left: "Socket 0 PcieD01F1 - Port 1B", text_right: "" },
      { text_left: "Link Speed", text_right: speedText },

      // Port 2A
      { text_left: "Socket 0 PcieD02F0 - Port 2A", text_right: "" },
      { text_left: "Link Speed", text_right: speedText },

      // Port 3A
      { text_left: "Socket 0 PcieD03F0 - Port 3A", text_right: "" },
      { text_left: "Link Speed", text_right: speedText },
    ],
  };
};

export default IIOBios;
