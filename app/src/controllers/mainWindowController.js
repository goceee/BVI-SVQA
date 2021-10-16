const { default: swal } = require('sweetalert2');
const remote = require('@electron/remote');

const openWindow = remote.require('./controllers/windowController');
const { addTitleBarFunctionality } = require('../utils/commonUtils');
const {
  lowDiskSpaceMessage,
  errorMessage,
} = require('../utils/alert/alertMessages');

const buttons = document.querySelectorAll('.menuBtn');
setTimeout(() => {
  /* Initial window show focuses on the first button, 
     this is fixed by initially making them unfocusable 
     and then we allow buttons to be focusable again
  */
  buttons.forEach((b) => b.setAttribute('tabindex', ''));
}, 500);

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
  openWindow.resWindow();
  currentWindow.close();
};

exit.onclick = () => currentWindow.close();
