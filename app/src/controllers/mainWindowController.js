const { default: swal } = require('sweetalert2');
const remote = require('@electron/remote');

const openWindow = remote.require('./controllers/windowController');
const { addTitleBarFunctionality } = require('../utils/commonUtils');
const {
  lowDiskSpaceMessage,
  errorMessage,
} = require('../utils/alert/alertMessages');

const { app } = remote;
const currentWindow = remote.getCurrentWindow();

const createExperiment = document.getElementById('createExp');
const startExperiment = document.getElementById('startExp');
const dataAnalysis = document.getElementById('dataAnalysis');
const exit = document.getElementById('exit');
addTitleBarFunctionality();

createExperiment.onclick = async () => {
  if (app.diskSpace.error) {
    swal.fire(errorMessage(app.diskSpace.error));
    return;
  }
  const freeDiskSpaceGB = app.diskSpace.result.free / 1073741824;
  if (freeDiskSpaceGB < 15) {
    await swal.fire({
      ...lowDiskSpaceMessage,
      text: `${parseInt(freeDiskSpaceGB, 10)} GB Available`,
    });
  }
  openWindow.open('createExperimentWindow');
  currentWindow.close();
};

startExperiment.onclick = () => {
  openWindow.popUp();
  currentWindow.close();
};

dataAnalysis.onclick = () => {
  // openWindow.resWindow();
  openWindow.presWindow();
  currentWindow.close();
};

exit.onclick = () => currentWindow.close();
