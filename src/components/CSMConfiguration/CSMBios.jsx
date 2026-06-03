const CSMBios = ({ partition }) => {
  const isGpt = partition === "gpt";

  return {
    title: "CSM CONFIGURATION",
    path: "ADVANCED > CSM CONFIGURATION",
    content: [
      {
        text_left: "CSM Support",
        text_right: isGpt ? "Disabled" : "Enabled",
        isDisabled: isGpt,
      },
      {
        text_left: "Boot option filter",
        text_right: isGpt ? "UEFI only" : "Legacy only",
      },
      { text_left: "Network", text_right: "Do not launch", isDisabled: true },
      { text_left: "Storage", text_right: isGpt ? "UEFI" : "Legacy" },
      { text_left: "Video", text_right: isGpt ? "UEFI" : "Legacy" },
      { text_left: "Other PCI devices", text_right: "UEFI" },
    ],
  };
};

export default CSMBios;
