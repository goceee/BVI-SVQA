const fs = require('fs');
const { BrowserWindow } = require('@electron/remote');
const { ipcRenderer: ipc, app } = require('electron');
const { default: swal } = require('sweetalert2');

const {
  openPopup,
  hidePopup,
  prepareFields,
  resetBrowseFiles,
  checkSelectedVideos,
} = require('../utils/window/createExperimentUtils');
const { prepareExperimentForm } = require('../Forms/experimentForm');
const {
  videoSettingsMessage,
  settingsConfirmMessage,
  selectCodecMessage,
  selectFormatMessage,
  pleaseWaitMessage,
  videoFormatMessage,
  missplacedDistortedVideoMessage,
  originalFilenameInstructionsMessage,
  missplacedOriginalVideoMessage,
  distortedFilenameInstructionsMessage,
} = require('../utils/alert/alertMessages');
const { addTitleBarFunctionality } = require('../utils/commonUtils');

const appPath = app.getAppPath();
addTitleBarFunctionality();

const createExperimentWindow = document.getElementById(
  'createExperimentWindowContainer',
);
const setScaleWindow = document.getElementById('setScaleContainer');
const setSettingsWindow = document.getElementById('setSettingsContainer');
const settingsOpen = document.getElementById('openSettingsButton');
const settingsConfirm = document.getElementById('confirmSettings');
const presentationMethods = document.querySelectorAll(
  'input[name=presentationMethod]',
);
const browseDistortedVideos = document.getElementById('browseDistortedField');
const browseOriginalVideos = document.getElementById('browseOriginalField');
const scaleButtons = document.querySelectorAll('.selectScaleButtons');
const submitExperiment = document.getElementById('submitExperiment');
const minimisePopup = document.querySelectorAll('.minimise');
const closePopup = document.getElementById('closeSettings');

presentationMethods.forEach((method) => {
  method.onclick = () => {
    if (method.value === 'ACR' || method.value === 'ACR-HR') {
      openPopup(
        'setScale',
        setScaleWindow,
        createExperimentWindow,
        method.value,
      );
    } else {
      prepareFields(method.value);
    }
  };
});

browseDistortedVideos.onchange = (e) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const file of e.target.files) {
    if (!file.name.includes('.yuv')) {
      swal.fire(videoFormatMessage);
      browseDistortedVideos.files = resetBrowseFiles();
      break;
    } else if (file.name.includes('R0')) {
      swal.fire(missplacedOriginalVideoMessage);
      browseDistortedVideos.files = resetBrowseFiles();
      break;
    } else if (file.name.split('_').length < 8) {
      swal.fire(distortedFilenameInstructionsMessage);
      browseDistortedVideos.files = resetBrowseFiles();
      break;
    }
  }
  const selectedFiles = e.target.files;
  if (selectedFiles.length > 0) {
    document.getElementById('browseTextDistorted').value = `${
      selectedFiles.length
    } ${selectedFiles.length > 1 ? 'files' : 'file'} selected`;
    if (browseOriginalVideos.files.length > 0) {
      const arrayDistortedFileNames = Array.from(selectedFiles).map(
        (file) => file.name,
      );
      const arrayOriginalFileNames = Array.from(browseOriginalVideos.files).map(
        (file) => file.name,
      );
      if (
        !checkSelectedVideos(arrayDistortedFileNames, arrayOriginalFileNames)
      ) {
        browseOriginalVideos.files = resetBrowseFiles();
        document.getElementById('browseTextOriginal').value = '';
        browseDistortedVideos.files = resetBrowseFiles();
        document.getElementById('browseTextDistorted').value = '';
      }
    }
  } else {
    document.getElementById('browseTextDistorted').value = '';
  }
};

browseOriginalVideos.onchange = (e) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const file of e.target.files) {
    if (!file.name.includes('.yuv')) {
      swal.fire(videoFormatMessage);
      browseOriginalVideos.files = resetBrowseFiles();
      break;
    } else if (!file.name.includes('R0')) {
      swal.fire(missplacedDistortedVideoMessage);
      browseOriginalVideos.files = resetBrowseFiles();
      break;
    } else if (file.name.split('_').length < 7) {
      swal.fire(originalFilenameInstructionsMessage);
      browseOriginalVideos.files = resetBrowseFiles();
      break;
    }
  }

  const selectedFiles = e.target.files;
  if (selectedFiles.length > 0) {
    document.getElementById('browseTextOriginal').value = `${
      selectedFiles.length
    } ${selectedFiles.length > 1 ? 'files' : 'file'} selected`;
    if (browseDistortedVideos.files.length > 0) {
      const arrayDistortedFileNames = Array.from(
        browseDistortedVideos.files,
      ).map((file) => file.name);
      const arrayOriginalFileNames = Array.from(selectedFiles).map(
        (file) => file.name,
      );
      if (
        !checkSelectedVideos(arrayDistortedFileNames, arrayOriginalFileNames)
      ) {
        browseOriginalVideos.files = resetBrowseFiles();
        document.getElementById('browseTextOriginal').value = '';
        browseDistortedVideos.files = resetBrowseFiles();
        document.getElementById('browseTextDistorted').value = '';
      }
    }
  } else {
    document.getElementById('browseTextOriginal').value = '';
  }
};

submitExperiment.onclick = () => {
  if (!fs.existsSync(`${appPath}/../Experiments`)) {
    fs.mkdirSync(`${appPath}/../Experiments`);
  }
  if (!fs.existsSync(`${appPath}/../Experiments/Saved`)) {
    fs.mkdirSync(`${appPath}/../Experiments/Saved`);
  }
  prepareExperimentForm();
};

minimisePopup.forEach((element) => {
  element.onclick = () => BrowserWindow.getAllWindows()[0].minimize();
});

closePopup.onclick = () => hidePopup(setSettingsWindow, createExperimentWindow);

scaleButtons.forEach((button) => {
  button.onclick = () => {
    hidePopup(setScaleWindow, createExperimentWindow);
    prepareFields(
      document.querySelector('input[name="presentationMethod"]:checked').value,
    );
  };
});

settingsOpen.onclick = () => {
  document.getElementById('fileformat').selectedIndex = 0;
  document.getElementById('videocodec').selectedIndex = 0;
  swal.fire(videoSettingsMessage).then((result) => {
    if (result.value) {
      openPopup('settings', setSettingsWindow, createExperimentWindow);
    }
  });
};

settingsConfirm.onclick = () => {
  const selectedFormat = document.querySelector('#fileformat').value;
  const selectedCodec = document.querySelector('#videocodec').value;
  if (selectedFormat === '') {
    swal.fire(selectFormatMessage);
  } else if (selectedCodec === '') {
    swal.fire(selectCodecMessage);
  } else {
    swal.fire({
      ...settingsConfirmMessage,
      willClose: () => {
        hidePopup(setSettingsWindow, createExperimentWindow);
      },
    });
  }
};

ipc.on('alert', () => {
  swal.fire(pleaseWaitMessage);
});
