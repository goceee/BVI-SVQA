const remote = require('@electron/remote');
const fs = require('fs');
const { default: swal } = require('sweetalert2');
const {
  checkConvertedFiles,
} = require('../utils/window/selectConfigurationUtils');
const {
  experimentsFolderMissingMessage,
  experimentConfigMissingMessage,
  experimentNameMissingMessage,
  convertedFilesMissingMessage,
  convertedTrainingFilesMissingMessage,
} = require('../utils/alert/alertMessages');
const { addTitleBarFunctionality } = require('../utils/commonUtils');
const openWindow = remote.require('./controllers/windowController');

const { app } = remote;
const appPath = app.getAppPath();

const latestButton = document.querySelector('#latest');
const savedButton = document.querySelector('#saved');
const newButton = document.querySelector('#new');
const cancelButton = document.querySelector('#cancel');
const currentWindow = remote.getCurrentWindow();

addTitleBarFunctionality();

cancelButton.onclick = () => {
  openWindow.mainWindow();
  currentWindow.close();
};

latestButton.onclick = () => {
  if (!fs.existsSync(`${appPath}/../Experiments`)) {
    swal.fire(experimentsFolderMissingMessage);
  } else if (!fs.existsSync(`${appPath}/../Experiments/Experiment.last`)) {
    swal.fire(experimentConfigMissingMessage);
  } else {
    const experimentName = fs.readFileSync(
      `${appPath}/../Experiments/Experiment.last`,
      'utf8',
    );
    if (experimentName === '') {
      swal.fire(experimentNameMissingMessage);
    } else {
      const check = checkConvertedFiles(experimentName);
      if (!check.regular) {
        swal.fire(convertedFilesMissingMessage);
      } else if (!check.training) {
        swal.fire(convertedTrainingFilesMissingMessage);
      } else {
        openWindow.open('createParticipantWindow');
        currentWindow.close();
      }
    }
  }
};

savedButton.onclick = () => {
  const browseConfig = document.getElementById('savedConfig');
  browseConfig.click();
  browseConfig.onchange = () => {
    const dataPath = document.getElementById('savedConfig').files[0];
    const experimentName = fs.readFileSync(
      `${appPath}/../Experiments/Saved/${dataPath.name}`,
      'utf8',
    ); // CHANGE THIS TO THE PATH FROM dataPath.path IT MIGHT BE BETTER!!!

    const check = checkConvertedFiles(experimentName);

    if (!check.regular) {
      swal.fire(convertedFilesMissingMessage);
    } else if (!check.training) {
      swal.fire(convertedTrainingFilesMissingMessage);
    } else {
      fs.writeFileSync(
        `${appPath}/../Experiments/Experiment.last`,
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
