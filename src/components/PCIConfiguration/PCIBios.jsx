const PCIBios = () => ({
  title: "PCI SUBSYSTEM SETTINGS",
  path: "ADVANCED > PCI SUBSYSTEM SETTING",
  content: [
    { text_left: "CSM Support", text_right: "Disabled", isDisabled: true },
    { text_left: "Above 4G Decoding", text_right: "Enabled" },
    { text_left: "Re-Size BAR Support", text_right: "Enabled" },
  ],
});

export default PCIBios;
