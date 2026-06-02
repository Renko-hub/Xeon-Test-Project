const PCIBios = () => ({
  title: "PCI SUBSYSTEM SETTINGS",
  path: "Advanced > PCI Subsystem Setting",
  content: [
    { text_left: "CSM Support", text_right: "Disabled", isDisabled: true },
    {
      text_left: "Above 4G Decoding",
      text_right: "Enabled",
      isDisabled: false,
    },
    {
      text_left: "Re-Size BAR Support",
      text_right: "Enabled",
      isDisabled: false,
    },
  ],
});

export default PCIBios;
