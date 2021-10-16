const { spawnSync } = require('child_process');
const Alert = require('electron-alert');
const fs = require('fs');
const { app } = require('electron');

const appPath = app.getAppPath();
const alert = new Alert();
const date = new Date();

const swalOptions = {
  html: '<span style="font-family:Roboto!important">The Software will now close.</span>',
  type: 'error',
  confirmButtonColor: '#3085d6',
  confirmButtonText: 'OK',
};

const testVmaf = () => {
  if (process.platform === 'win32') {
    return fs.existsSync(`${appPath}/externalUtils/vmaf/vmafossexec.exe`);
  }
  if (process.platform === 'darwin') {
    const vmafMac = spawnSync(`${appPath}/externalUtils/vmaf/vmafossexec_mac`);
    if (String(vmafMac.stderr) === 'null') {
      return false;
    }
    return true;
  }
  const vmaf = spawnSync(`${appPath}/externalUtils/vmaf/vmafossexec_linux`);
  if (String(vmaf.stderr) === 'null') {
    return false;
  }
  return true;
};

const testFFmpeg = () => {
  if (process.platform === 'win32') {
    return fs.existsSync(`${appPath}/externalUtils/ffmpeg/bin/ffmpeg.exe`);
  }
  const ffmpeg = spawnSync('ffmpeg', ['-version']);
  if (String(ffmpeg.stderr)) {
    return false;
  }
  return true;
};

const testPython = () => {
  const python = spawnSync('python', ['--version']);
  if (String(python.stderr)) {
    const python3 = spawnSync('python3', ['--version']);
    if (String(python3.stderr)) {
      return undefined;
    }
    return 'python3';
  }
  return 'python';
};

const testPythonRequirements = () => {
  const python = testPython();
  if (python !== undefined) {
    const numpy = spawnSync(python, ['-c', 'import numpy']);
    if (String(numpy.stderr)) {
      return false;
    }

    const matplotlib = spawnSync(python, ['-c', 'import matplotlib']);
    if (String(matplotlib.stderr)) {
      return false;
    }

    const scipy = spawnSync(python, ['-c', 'import scipy']);
    if (String(scipy.stderr)) {
      return false;
    }
    return true;
  }
  return false;
};

module.exports = (win, app) => {
  let title = '';
  if (testPythonRequirements()) {
    title = 'Python or its requirements have not been properly installed!';
  } else if (!testVmaf()) {
    title = 'VMAF cannot be found or has not been properly built!';
  } else if (!testFFmpeg()) {
    title = 'FFMPEG cannot be found or has not been properly installed!';
  } else {
    win.show();
    fs.writeFileSync(
      `${appPath}/../last_requirements_check`,
      `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`,
      'utf8',
    );
    return;
  }
  swalOptions.title = `<h3 style="font-family:BlinkMacSystemFont,Roboto,Arial,sans-serif!important;margin:0;">${title}</h3>`;
  alert.fireFrameless(swalOptions, null, true, true).then((result) => {
    if (result.value) {
      app.quit();
    }
  });
};
