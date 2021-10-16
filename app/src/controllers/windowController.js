const { BrowserWindow, shell, ipcMain, app } = require('electron');

const createNativeImage = require('../utils/createNativeImage');
const {
  defaultWindowOptions,
} = require('../utils/window/defaultWindowOptions');

const appPath = app.getAppPath();
const appIcon = createNativeImage(`${appPath}/src/img`, 'icon_white.png');
let stopClose = false;

ipcMain.on('info', (event, args) => {
  if (args === 'stop-closing') {
    stopClose = true;
  } else {
    stopClose = false;
  }
});
exports.open = (windowName) => {
  let win = new BrowserWindow({
    ...defaultWindowOptions,
    width: 350,
    height: 500,
    icon: appIcon,
  });
  win.on('close', (e) => {
    if (stopClose) {
      e.preventDefault();
      BrowserWindow.getAllWindows()[0].webContents.send('alert');
      shell.beep();
      win.flashFrame(true);
    } else win = null;
  });
  win.loadURL(`file://${appPath}/src/windows/${windowName}.html`);
  win.once('ready-to-show', () => {
    win.show();
  });
};

exports.mainWindow = () => {
  let win = new BrowserWindow({
    ...defaultWindowOptions,
    icon: appIcon,
  });
  win.on('close', () => {
    win = null;
  });
  win.loadURL(`file://${appPath}/src/windows/mainWindow.html`);
  win.once('ready-to-show', () => {
    win.show();
  });
};

exports.resWindow = () => {
  let win = new BrowserWindow({
    ...defaultWindowOptions,
    width: 350,
    height: 600,
    icon: appIcon,
  });
  win.on('close', () => {
    win = null;
  });
  win.loadURL(`file://${appPath}/src/windows/dataAnalysisWindow.html`);
  win.once('ready-to-show', () => {
    win.show();
  });
};

exports.popUp = () => {
  let win = new BrowserWindow({
    ...defaultWindowOptions,
    width: 350,
    height: 380,
    icon: appIcon,
  });
  win.on('close', () => {
    win = null;
  });
  win.loadURL(`file://${appPath}/src/windows/selectConfigurationWindow.html`);
  win.once('ready-to-show', () => {
    win.show();
  });
};

exports.presWindow = () => {
  const { webPreferences } = defaultWindowOptions;
  let win = new BrowserWindow({
    ...defaultWindowOptions,
    fullscreen: true,
    simpleFullscreen: true,
    webPreferences: {
      ...webPreferences,
      backgroundThrottling: false,
    },
    icon: appIcon,
  });
  win.on('close', () => {
    win = null;
  });
  win.loadURL(`file://${appPath}/src/windows/presentationWindow.html`);
  win.once('ready-to-show', () => {
    // win.setAlwaysOnTop(true, 'screen-saver', '1');
    win.show();
  });
};
