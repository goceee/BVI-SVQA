import { BrowserWindow, shell, ipcMain } from 'electron';
import path from 'path';

import createNativeImage from '../utils/createNativeImage';
import defaultWindowOptions from '../utils/window/defaultWindowOptions';

const parentFolder = path.join(__dirname, '..');
const appIcon = createNativeImage(`${parentFolder}/img`, 'icon_white.png');
let stopClose = false;

ipcMain.on('info', (event, args) => {
  if (args === 'stop-closing') {
    stopClose = true;
  } else {
    stopClose = false;
  }
});
export const open = (windowName: string) => {
  let win: BrowserWindow | null = new BrowserWindow({
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
      win?.flashFrame(true);
    } else win = null;
  });
  win.loadURL(`file://${parentFolder}/windows/${windowName}.html`);
  win.once('ready-to-show', () => {
    win?.show();
  });
};

export const mainWindow = () => {
  let win: BrowserWindow | null = new BrowserWindow({
    ...defaultWindowOptions,
    icon: appIcon,
  });
  win.on('close', () => {
    win = null;
  });
  win.loadURL(`file://${parentFolder}/windows/mainWindow.html`);
  win.once('ready-to-show', () => {
    win?.show();
  });
};

export const resWindow = () => {
  let win: BrowserWindow | null = new BrowserWindow({
    ...defaultWindowOptions,
    width: 350,
    height: 600,
    icon: appIcon,
  });
  win.on('close', () => {
    win = null;
  });
  win.loadURL(`file://${parentFolder}/windows/dataAnalysisWindow.html`);
  win.once('ready-to-show', () => {
    win?.show();
  });
};

export const popUp = () => {
  let win: BrowserWindow | null = new BrowserWindow({
    ...defaultWindowOptions,
    width: 350,
    height: 380,
    icon: appIcon,
  });
  win.on('close', () => {
    win = null;
  });
  win.loadURL(`file://${parentFolder}/windows/selectConfigurationWindow.html`);
  win.once('ready-to-show', () => {
    win?.show();
  });
};

export const presWindow = () => {
  const { webPreferences } = defaultWindowOptions;
  let win: BrowserWindow | null = new BrowserWindow({
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
  win.loadURL(`file://${parentFolder}/windows/presentationWindow.html`);
  win.once('ready-to-show', () => {
    win?.setAlwaysOnTop(true, 'screen-saver', 1);
    win?.show();
  });
};
