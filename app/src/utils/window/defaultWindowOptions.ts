const defaultWindowOptions = {
  width: 500,
  height: 500,
  frame: false,
  resizable: false,
  maximizable: false,
  transparent: true,
  show: false,
  webPreferences: {
    nodeIntegration: true,
    devTools: true,
    contextIsolation: false,
    enableRemoteModule: true,
  },
};

export default defaultWindowOptions;
