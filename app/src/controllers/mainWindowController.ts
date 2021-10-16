import Swal from 'sweetalert2';
import remote from '@electron/remote';

const openWindow = remote.require('./controllers/windowController');
import { addTitleBarFunctionality } from '../utils/commonUtils';
import {
  lowDiskSpaceMessage,
  errorMessage,
} from '../utils/alert/alertMessages';
import { AppWithDiskSpace } from '../main';

const buttons = document.querySelectorAll('.menuBtn');
setTimeout(() => {
  /* Initial window show focuses on the first button, 
     this is fixed by initially making them unfocusable 
     and then we allow buttons to be focusable again
  */
  buttons.forEach((b) => b.setAttribute('tabindex', ''));
}, 0);

const { app: electronApp } = remote;

const app: AppWithDiskSpace = electronApp;

const currentWindow = remote.getCurrentWindow();

const createExperiment = document.getElementById(
  'createExp',
) as HTMLButtonElement;
const startExperiment = document.getElementById(
  'startExp',
) as HTMLButtonElement;
const dataAnalysis = document.getElementById(
  'dataAnalysis',
) as HTMLButtonElement;
const exit = document.getElementById('exit') as HTMLButtonElement;
addTitleBarFunctionality();

createExperiment.onclick = async () => {
  const diskSpace = app.diskSpace;
  if (diskSpace?.error) {
    Swal.fire(errorMessage(diskSpace.error));
    return;
  }
  const freeDiskSpaceGB =
    diskSpace?.result && parseInt(diskSpace.result?.free, 10) / 1073741824;
  if (freeDiskSpaceGB! < 15) {
    await Swal.fire({
      ...lowDiskSpaceMessage,
      text: `${freeDiskSpaceGB} GB Available`,
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
