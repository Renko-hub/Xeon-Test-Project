const CSMBios = ({ partition }) => {
  const isGpt = partition === "gpt";

  return {
    title: "CSM CONFIGURATION",
    path: "Advanced > CSM Configuration",
    content: [
      {
        text_left: "CSM Support",
        text_right: isGpt ? "Disabled" : "Enabled",
        isDisabled: isGpt,
      },
      {
        text_left: "Boot option filter",
        text_right: isGpt ? "UEFI only" : "Legacy only",
        isDisabled: false,
      },
      {
        text_left: "Network",
        text_right: "Do not launch",
        isDisabled: true,
      },
      {
        text_left: "Storage",
        text_right: isGpt ? "UEFI" : "Legacy",
        isDisabled: false,
      },
      {
        text_left: "Video",
        text_right: isGpt ? "UEFI" : "Legacy",
        isDisabled: false,
      },
      {
        text_left: "Other PCI devices",
        text_right: "UEFI",
        isDisabled: false,
      },
    ],
  };
};

export default CSMBios;
