const MemoryBios = ({ memoryType = "desktop" }) => {
  const isEcc = memoryType === "ecc";

  return {
    title: "Integrated Memory Controller (IMC) Configuration",
    path: "IntelRCSetup > Integrated Memory Controller (IMC)",
    content: [
      {
        text_left: "Enforce POR",
        text_right: "Disabled",
        isDisabled: true, // Становится серым на интерфейсе
      },
      {
        text_left: "PPR Type",
        text_right: "PPR Disabled",
        isDisabled: true, // Становится серым на интерфейсе
      },
      {
        text_left: "Dram Maintenance Test Inversion",
        text_right: "Disabled",
        isDisabled: true, // Становится серым на интерфейсе
      },
      {
        text_left: "BCIT",
        text_right: "Disabled",
        isDisabled: true, // Становится серым на интерфейсе
      },
      {
        text_left: "Data Scrambling",
        text_right: isEcc ? "Enabled" : "Disabled",
        // Если выбран desktop — пункт выключен и заблокирован (серый). Если ecc — активен (белый)
        isDisabled: !isEcc,
      },
      {
        text_left: "Attempt Fast Boot",
        text_right: "Enable",
        isDisabled: false, // Горит активным, так как эта опция включена для оптимизации
      },
      {
        text_left: "Attempt Fast Cold Boot",
        text_right: "Enable",
        isDisabled: false, // Горит активным, так как эта опция включена для оптимизации
      },
      {
        text_left: "PSMI Support",
        text_right: "Disabled",
        isDisabled: true, // Становится серым на интерфейсе
      },
    ],
  };
};

export default MemoryBios;
