const PowerBios = (state: { powerLevel: string }) => ({
  title: "CPU C STATE CONTROL",
  path: "Advanced > Power Management Configuration > CPU C State Control",
  content: [
    { text_left: "C2C3TT", text_right: "0" },
    {
      text_left: "Package C State limit",
      text_right: state.powerLevel === "V2" ? "C0/C1 state" : "C2 state",
    },
    {
      text_left: "CPU C3 report",
      text_right: state.powerLevel === "V3" ? "Enable" : "Disable",
    },
    { text_left: "CPU C6 report", text_right: "Disable" },
  ],
});

export default PowerBios;
