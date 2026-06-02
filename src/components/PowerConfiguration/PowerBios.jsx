const PowerBios = ({ cpuGen }) => {
  const isV2 = cpuGen === "V2";
  const isV3 = cpuGen === "V3";
  const isV4 = cpuGen === "V4";

  return {
    title: "CPU C STATE CONTROL",
    path: "Advanced > Power Management Configuration > CPU C State Control",
    content: [
      {
        text_left: "C2C3TT",
        text_right: "0",
        isDisabled: true,
      },
      {
        text_left: "Package C State limit",
        text_right: isV3 ? "C2 State" : "C0/C1 state",
        isDisabled: false,
      },
      {
        text_left: "CPU C3 report",
        text_right: isV3 ? "Enable" : "Disable",
        isDisabled: isV2 || isV4,
      },
      {
        text_left: "CPU C6 report",
        text_right: "Disable",
        isDisabled: isV2 || isV3 || isV4,
      },
    ],
  };
};

export default PowerBios;
