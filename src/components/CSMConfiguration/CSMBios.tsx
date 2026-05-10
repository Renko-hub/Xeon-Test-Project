const CSMBios = ({ state }: { state: { diskMode: string } }) => ({
  title: 'CSM CONFIGURATION',
  path: 'Advanced > CSM Configuration',
  content: [
    {
      text_left: 'CSM Support',
      text_right: state.diskMode === 'mbr' ? 'Enabled' : 'Disabled',
    },
    {
      text_left: 'Boot option filter',
      text_right: state.diskMode === 'mbr' ? 'Legacy only' : 'UEFI only',
    },
    { text_left: 'Network', text_right: 'Do not launch' },
    {
      text_left: 'Storage',
      text_right: state.diskMode === 'mbr' ? 'Legacy' : 'UEFI',
    },
    {
      text_left: 'Video',
      text_right: state.diskMode === 'mbr' ? 'Legacy' : 'UEFI',
    },
    { text_left: 'Other PCI devices', text_right: 'UEFI' },
  ],
});

export default CSMBios;
