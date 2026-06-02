const USBBios = () => {
  return {
    title: "USB Configuration",
    path: "Advanced > USB Configuration",
    content: [
      {
        text_left: "Legacy USB Support",
        text_right: "Enabled",
      },
      {
        text_left: "XHCI Hand-off",
        text_right: "Enabled",
      },
      {
        text_left: "EHCI Hand-off",
        text_right: "Disabled",
      },
      {
        text_left: "USB Mass Storage Driver Support",
        text_right: "Enabled",
      },
      {
        text_left: "Port 60/64 Emulation",
        text_right: "Disabled",
      },
      {
        text_left: "USB transfer time-out",
        text_right: "10 sec",
      },
      {
        text_left: "Device reset time-out",
        text_right: "10 sec",
      },
      {
        text_left: "Device power-up delay",
        text_right: "Auto",
      },
    ],
  };
};

export default USBBios;
