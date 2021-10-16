require('electron-reload')(__dirname);
require('@electron/remote/main').initialize();
import { App, app as electronApp, BrowserWindow } from 'electron';
import fs from 'fs';
import { spawn } from 'child_process';
import diskspace from 'diskspace';
import createNativeImage from './utils/createNativeImage';
import createAppFolders from './utils/createAppFolders';
import defaultWindowOptions from './utils/window/defaultWindowOptions';
import requirementsCheck from './utils/requirementsCheck';
const appIcon = createNativeImage(`${__dirname}/img`, 'icon_white.png');

const day = 24 * 60 * 60 * 1000;

spawn('chmod', ['+x', '../externalUtils/vmaf/vmafossexec_linux']);
spawn('chmod', ['+x', '../externalUtils/vmaf/vmafossexec_mac']);

export interface AppWithDiskSpace extends App {
  diskSpace?: { error: Error | null; result: diskspace.Result };
}

const app: AppWithDiskSpace = electronApp;

const mainWindow = () => {
  let win: BrowserWindow | null = new BrowserWindow({
    ...defaultWindowOptions,
    icon: appIcon,
  });
  win.on('close', () => {
    win = null;
  });
  win.loadURL(`file://${__dirname}/windows/mainWindow.html`);
  win.once('ready-to-show', () => {
    if (fs.existsSync('../../last_requirements_check')) {
      const readDateFile = fs.readFileSync(
        '../../last_requirements_check',
        'utf8',
      );
      const lastCheckDate = new Date(`${readDateFile}`);
      const today = new Date();
      if (
        Math.round(
          Math.abs((lastCheckDate.getTime() - today.getTime()) / day),
        ) > 30
      ) {
        requirementsCheck(win as BrowserWindow, app);
      } else {
        win?.show();
      }
    } else {
      requirementsCheck(win as BrowserWindow, app);
    }
  });
};

app.whenReady().then(() => {
  mainWindow();
  createAppFolders();
  diskspace.check(app.getAppPath()[0], (error, result) => {
    app.diskSpace = {
      error,
      result,
    };
  });
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) mainWindow();
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS applications stay active
  // until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit();
});
