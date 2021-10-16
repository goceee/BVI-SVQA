import remote from '@electron/remote';
import fs from 'fs';
import Swal from 'sweetalert2';
import { checkConvertedFiles } from '../utils/window/selectConfigurationUtils';
import {
  experimentsFolderMissingMessage,
  experimentConfigMissingMessage,
  experimentNameMissingMessage,
  convertedFilesMissingMessage,
  convertedTrainingFilesMissingMessage,
} from '../utils/alert/alertMessages';
import { addTitleBarFunctionality } from '../utils/commonUtils';

const openWindow = remote.require('./controllers/windowController');

const latestButton = document.querySelector('#latest') as HTMLButtonElement;
const savedButton = document.querySelector('#saved') as HTMLButtonElement;
const newButton = document.querySelector('#new') as HTMLButtonElement;
const cancelButton = document.querySelector('#cancel') as HTMLButtonElement;
const currentWindow = remote.getCurrentWindow();

addTitleBarFunctionality();

cancelButton.onclick = () => {
  openWindow.mainWindow();
  currentWindow.close();
};

latestButton.onclick = () => {
  if (!fs.existsSync('../../Experiments')) {
    Swal.fire(experimentsFolderMissingMessage);
  } else if (!fs.existsSync('../../Experiments/Experiment.last')) {
    Swal.fire(experimentConfigMissingMessage);
  } else {
    const experimentName = fs.readFileSync(
      '../../Experiments/Experiment.last',
      'utf8',
    );
    if (experimentName === '') {
      Swal.fire(experimentNameMissingMessage);
    } else {
      const check = checkConvertedFiles(experimentName);
      if (!check.regular) {
        Swal.fire(convertedFilesMissingMessage);
      } else if (!check.training) {
        Swal.fire(convertedTrainingFilesMissingMessage);
      } else {
        openWindow.open('createParticipantWindow');
        currentWindow.close();
      }
    }
  }
};

savedButton.onclick = () => {
  const browseConfig = document.getElementById(
    'savedConfig',
  ) as HTMLInputElement;
  browseConfig.click();
  browseConfig.onchange = () => {
    const dataPath = browseConfig.files;
    const experimentName = fs.readFileSync(
      `../../Experiments/Saved/${dataPath?.[0].name}`,
      'utf8',
    ); // CHANGE THIS TO THE PATH FROM dataPath.path IT MIGHT BE BETTER!!!

    const check = checkConvertedFiles(experimentName);

    if (!check.regular) {
      Swal.fire(convertedFilesMissingMessage);
    } else if (!check.training) {
      Swal.fire(convertedTrainingFilesMissingMessage);
    } else {
      fs.writeFileSync(
        '../../Experiments/Experiment.last',
        experimentName,
        'utf8',
      );
      openWindow.open('createParticipantWindow');
      currentWindow.close();
    }
  };
};

newButton.onclick = () => {
  openWindow.open('createExperimentWindow');
  currentWindow.close();
};
