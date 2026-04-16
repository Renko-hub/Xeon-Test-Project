const CSMBios = () => ({
  type: 'csm',
  title: "CSM CONFIGURATION",
  path: "Advanced > CSM Configuration",
  content: [
    { text_left: "CSM Support", highlight: true },
    { text_left: "Boot option filter", highlight: true },
    { text_left: "Network", text_right: "Do not launch" }, 
    { text_left: "Storage", highlight: true },
    { text_left: "Video", highlight: true },
    { text_left: "Other PCI devices", text_right: "UEFI", highlight: true },
  ]
});

export default CSMBios;
