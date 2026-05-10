const IIOBios = ({ state }: { state: { pcieGen: string } }) => ({
  title: 'IIO0 CONFIGURATION',
  path: 'IntelRCSetup > IIO Configuration > IIO0 Configuration',
  content: [
    {
      text_left: 'IOU2 (PCIE PORT X16)',
      text_right: state.pcieGen === 'gen_3' ? 'GEN 3' : 'GEN 2',
    },
    {
      text_left: 'IOU0 (PCIE PORT X8)',
      text_right: state.pcieGen === 'gen_3' ? 'GEN 3' : 'GEN 2',
    },
    {
      text_left: 'IOU1 (PCIE PORT X4)',
      text_right: state.pcieGen === 'gen_3' ? 'GEN 3' : 'GEN 2',
    },
  ],
});

export default IIOBios;
