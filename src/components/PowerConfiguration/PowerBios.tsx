const PowerBios = () => ({
  type: 'power',
  title: "CPU C STATE CONTROL",
  path: "Advanced > Power Management Configuration > CPU C State Control",
  content: [
    { text_left: "C2C3TT", text_right: "0" },
    { text_left: "Package C State limit", highlight: true },
    { text_left: "CPU C3 report", highlight: true },
    { text_left: "CPU C6 report", highlight: true },
  ]
});

export default PowerBios;
