require('electron-reload')(__dirname);
require('@electron/remote/main').initialize();
const { app, BrowserWindow } = require('electron');
const fs = require('fs');
const { spawn } = require('child_process');
const diskspace = require('diskspace');
const createNativeImage = require('./utils/createNativeImage');
const createAppFolders = require('./utils/createAppFolders');
const { defaultWindowOptions } = require('./utils/window/defaultWindowOptions');
const requirementsCheck = require('./utils/requirementsCheck');
const appIcon = createNativeImage(`${__dirname}/img`, 'icon_white.png');

const day = 24 * 60 * 60 * 1000;

spawn('chmod', ['+x', '../externalUtils/vmaf/vmafossexec_linux']);
spawn('chmod', ['+x', '../externalUtils/vmaf/vmafossexec_mac']);

const mainWindow = () => {
  let win = new BrowserWindow({
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
      if (Math.round(Math.abs((lastCheckDate - today) / day)) > 30) {
        requirementsCheck(win, app);
      } else {
        win.show();
      }
    } else {
      requirementsCheck(win, app);
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
