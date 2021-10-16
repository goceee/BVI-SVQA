import fs from 'fs';
import { BrowserWindow } from '@electron/remote';
import { ipcRenderer as ipc } from 'electron';
import Swal from 'sweetalert2';

import {
  openPopup,
  hidePopup,
  prepareFields,
  resetBrowseFiles,
  checkSelectedVideos,
} from '../utils/window/createExperimentUtils';
import { prepareExperimentForm } from '../Forms/experimentForm';
import {
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
} from '../utils/alert/alertMessages';
import { addTitleBarFunctionality } from '../utils/commonUtils';

addTitleBarFunctionality();

const createExperimentWindow = document.getElementById(
  'createExperimentWindowContainer',
) as HTMLDivElement;
const setScaleWindow = document.getElementById(
  'setScaleContainer',
) as HTMLDivElement;
const setSettingsWindow = document.getElementById(
  'setSettingsContainer',
) as HTMLDivElement;
const settingsOpen = document.getElementById(
  'openSettingsButton',
) as HTMLDivElement;
const settingsConfirm = document.getElementById(
  'confirmSettings',
) as HTMLButtonElement;
const presentationMethods = document.querySelectorAll(
  'input[name=presentationMethod]',
) as NodeListOf<HTMLInputElement>;
const browseDistortedVideos = document.getElementById(
  'browseDistortedField',
) as HTMLInputElement;
const browseOriginalVideos = document.getElementById(
  'browseOriginalField',
) as HTMLInputElement;
const scaleButtons = document.querySelectorAll(
  '.selectScaleButtons',
) as NodeListOf<HTMLLabelElement>;
const submitExperiment = document.getElementById(
  'submitExperiment',
) as HTMLButtonElement;
const minimisePopup = document.querySelectorAll(
  '.minimise',
) as NodeListOf<HTMLDivElement>;
const closePopup = document.getElementById('closeSettings') as HTMLDivElement;

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
      Swal.fire(videoFormatMessage);
      browseDistortedVideos.files = resetBrowseFiles();
      break;
    } else if (file.name.includes('R0')) {
      Swal.fire(missplacedOriginalVideoMessage);
      browseDistortedVideos.files = resetBrowseFiles();
      break;
    } else if (file.name.split('_').length < 8) {
      Swal.fire(distortedFilenameInstructionsMessage);
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
  for (const file of e?.target?.files) {
    if (!file.name.includes('.yuv')) {
      Swal.fire(videoFormatMessage);
      browseOriginalVideos.files = resetBrowseFiles();
      break;
    } else if (!file.name.includes('R0')) {
      Swal.fire(missplacedDistortedVideoMessage);
      browseOriginalVideos.files = resetBrowseFiles();
      break;
    } else if (file.name.split('_').length < 7) {
      Swal.fire(originalFilenameInstructionsMessage);
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
  if (!fs.existsSync('../../Experiments')) {
    fs.mkdirSync('../../Experiments');
  }
  if (!fs.existsSync('../../Experiments/Saved')) {
    fs.mkdirSync('../../Experiments/Saved');
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
  Swal.fire(videoSettingsMessage).then((result) => {
    if (result.value) {
      openPopup('settings', setSettingsWindow, createExperimentWindow, null);
    }
  });
};

settingsConfirm.onclick = () => {
  const selectedFormat = document.querySelector('#fileformat').value;
  const selectedCodec = document.querySelector('#videocodec').value;
  if (selectedFormat === '') {
    Swal.fire(selectFormatMessage);
  } else if (selectedCodec === '') {
    Swal.fire(selectCodecMessage);
  } else {
    Swal.fire({
      ...settingsConfirmMessage,
      willClose: () => {
        hidePopup(setSettingsWindow, createExperimentWindow);
      },
    });
  }
};

ipc.on('alert', () => {
  Swal.fire(pleaseWaitMessage);
});
